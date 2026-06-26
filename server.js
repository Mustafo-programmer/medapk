const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const { GoogleGenAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure upload directories exist
const uploadDirs = [
  path.join(__dirname, 'uploads'),
  path.join(__dirname, 'uploads', 'manuals'),
  path.join(__dirname, 'uploads', 'programs')
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure Multer for uploads
const manualStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads', 'manuals')),
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, fileExt).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    cb(null, `${fileName}_${Date.now()}${fileExt}`);
  }
});

const programStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads', 'programs')),
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, fileExt).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    cb(null, `${fileName}_${Date.now()}${fileExt}`);
  }
});

const uploadManual = multer({ storage: manualStorage });
const uploadProgram = multer({ storage: programStorage });

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database helper
let db;

async function initDatabase() {
  db = await open({
    filename: path.join(__dirname, 'database.db'),
    driver: sqlite3.Database
  });

  // Enable foreign keys
  await db.run('PRAGMA foreign_keys = ON');

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      login TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('admin','editor','viewer')) NOT NULL DEFAULT 'viewer'
    );

    CREATE TABLE IF NOT EXISTS devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      model TEXT NOT NULL,
      manufacturer TEXT NOT NULL,
      category TEXT NOT NULL,
      serial_number TEXT UNIQUE,
      description TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS errors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_model TEXT NOT NULL,
      error_code TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      cause TEXT,
      solution TEXT,
      severity TEXT CHECK(severity IN ('low','medium','high','critical')) NOT NULL DEFAULT 'medium',
      category TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS manuals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_model TEXT NOT NULL,
      title TEXT NOT NULL,
      file_path TEXT NOT NULL,
      type TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS repairs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id INTEGER REFERENCES devices(id) ON DELETE SET NULL,
      error_code TEXT,
      problem TEXT NOT NULL,
      cause TEXT,
      solution TEXT,
      date TEXT DEFAULT CURRENT_TIMESTAMP,
      result TEXT CHECK(result IN ('solved','unresolved','in_progress','pending_parts')) NOT NULL DEFAULT 'solved'
    );

    CREATE TABLE IF NOT EXISTS device_programs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id INTEGER REFERENCES devices(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      version TEXT NOT NULL,
      description TEXT,
      file_path TEXT,
      parameters TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS search_index (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      ref_id INTEGER NOT NULL,
      content TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      icon TEXT,
      description TEXT
    );
  `);

  // Indexes for performance
  await db.exec(`
    CREATE INDEX IF NOT EXISTS idx_errors_code ON errors(error_code);
    CREATE INDEX IF NOT EXISTS idx_errors_model ON errors(device_model);
    CREATE INDEX IF NOT EXISTS idx_devices_model ON devices(model);
    CREATE INDEX IF NOT EXISTS idx_repairs_device ON repairs(device_id);
  `);

  // Seed data if empty
  const deviceCount = await db.get('SELECT COUNT(*) as count FROM devices');
  if (deviceCount.count === 0) {
    console.log('Database empty. Loading high-quality biomedical seed data...');

    // Seed Categories
    await db.run("INSERT INTO categories (name, icon, description) VALUES ('Infusion Pump', '🧬', 'Volumat, syringe pumps, dosing configurations')");
    await db.run("INSERT INTO categories (name, icon, description) VALUES ('Ultrasound', '📡', 'GE Voluson, probes, acoustic boards, imaging')");
    await db.run("INSERT INTO categories (name, icon, description) VALUES ('Laboratory Analyzer', '🔬', 'Mindray analyzers, fluidics, photometers')");
    await db.run("INSERT INTO categories (name, icon, description) VALUES ('X-Ray', '⚡', 'High voltage tubes, digital detectors, cooling')");

    // Users
    await db.run(
      "INSERT INTO users (name, login, password, role) VALUES ('Senior Engineer', 'admin', 'admin123', 'admin')"
    );
    await db.run(
      "INSERT INTO users (name, login, password, role) VALUES ('Technician', 'editor', 'edit123', 'editor')"
    );

    // Devices
    const d1 = await db.run(
      "INSERT INTO devices (name, model, manufacturer, category, serial_number, description) VALUES ('Volumat MC Agilia', 'Volumat MC', 'Fresenius Kabi', 'Infusion Pump', 'VOL-720394', 'Volumetric infusion pump for administrative delivery of fluids and medications.')"
    );
    const d2 = await db.run(
      "INSERT INTO devices (name, model, manufacturer, category, serial_number, description) VALUES ('Voluson E8', 'Voluson E8', 'GE Healthcare', 'Ultrasound', 'VOL-E8-84729', 'Premium high-end diagnostic ultrasound system for OB/GYN and cardiovascular applications.')"
    );
    const d3 = await db.run(
      "INSERT INTO devices (name, model, manufacturer, category, serial_number, description) VALUES ('BS-200 Chemistry Analyzer', 'BS-200', 'Mindray', 'Laboratory Analyzer', 'BS2-094821', 'Bench-top, discrete and random access clinical chemistry analyzer with 200 tests per hour.')"
    );
    const d4 = await db.run(
      "INSERT INTO devices (name, model, manufacturer, category, serial_number, description) VALUES ('DuraDiagnostic X-Ray', 'DuraDiagnostic', 'Philips', 'X-Ray', 'PH-DURA-3382', 'Digital radiography X-ray system for high-throughput general examinations.')"
    );

    // Errors
    await db.run(`
      INSERT INTO errors (device_model, error_code, title, description, cause, solution, severity, category)
      VALUES (
        'Volumat MC', 
        'Err 102', 
        'Air in Line Sensor Calibration Error', 
        'The air-in-line ultrasonic sensor reports values outside the acceptable calibration range during self-test.',
        'Dust, dried medication residues on the sensor face, or piezo-electric element degradation.',
        '1. Clean the tubing slot with an isopropyl alcohol swab.\\n2. Run sensor calibration protocol in Service Mode.\\n3. If calibration fails, replace the air-in-line sensor assembly.',
        'high',
        'Sensors'
      )
    `);

    await db.run(`
      INSERT INTO errors (device_model, error_code, title, description, cause, solution, severity, category)
      VALUES (
        'Volumat MC', 
        'Err 304', 
        'Door Mechanism Jammed', 
        'The safety door lock mechanism failed to engage or disengage within the timeout period.',
        'Mechanical obstruction, worn plastic latch gears, or faulty microswitch detector.',
        '1. Check for tubing or foreign object obstructions.\\n2. Inspect locking latch gear teeth for wear.\\n3. Verify microswitch continuity using a multimeter when closed.\\n4. Lubricate mechanical tracks with high-viscosity silicone grease.',
        'high',
        'Mechanical'
      )
    `);

    await db.run(`
      INSERT INTO errors (device_model, error_code, title, description, cause, solution, severity, category)
      VALUES (
        'Voluson E8', 
        'E12', 
        'No Probe Detected', 
        'The ultrasound system fails to identify any connected active probe in probe port 1 or 2.',
        'Dirty connector pins on the probe, damaged connector locking mechanism, or failure of the probe select board.',
        '1. Turn off the system, disconnect the probe and clean probe connector gold pins with contact cleaner.\\n2. Inspect pins for bending or physical damage.\\n3. Connect probe to a different port to isolate the port vs probe issue.\\n4. If probe works in port 2, replace the probe select board for port 1.',
        'medium',
        'Hardware'
      )
    `);

    await db.run(`
      INSERT INTO errors (device_model, error_code, title, description, cause, solution, severity, category)
      VALUES (
        'BS-200', 
        'E12', 
        'Lamp Energy Low', 
        'The photometric optical unit reports absorbance energy levels below the minimum threshold at 340nm.',
        'Halogen lamp aging (surpassed 2000 operational hours), dirty optical windows, or faulty power supply to the lamp assembly.',
        '1. Check lamp operational hours in software utility.\\n2. Replace halogen lamp (12V/20W) if hours exceed 1500.\\n3. Wipe cuvette optical windows and fiber optic head with lint-free cloth.\\n4. Re-calibrate optical offset in service software.',
        'medium',
        'Optics'
      )
    `);

    await db.run(`
      INSERT INTO errors (device_model, error_code, title, description, cause, solution, severity, category)
      VALUES (
        'DuraDiagnostic', 
        'Err 20', 
        'X-Ray Tube Overheat Warning', 
        'Thermal sensor in the oil-filled tube housing indicates temperature has exceeded 75 degrees Celsius.',
        'Continuous high-dose exposures without adequate cooling intervals, failure of the housing cooling fan, or oil leaks causing low thermal capacity.',
        '1. Suspend exposures immediately and allow tube to cool for 20 minutes.\\n2. Verify that the external cooling fans are running during idle.\\n3. Inspect the tube housing housing for signs of yellow oil leakage.\\n4. Check thermal switch resistance (should be close to 0 ohms when cool).',
        'critical',
        'Thermal'
      )
    `);

    // Manuals
    await db.run(`
      INSERT INTO manuals (device_model, title, file_path, type, notes)
      VALUES (
        'Volumat MC',
        'Volumat Agilia Service & Repair Manual v3.2',
        '/uploads/manuals/sample_volumat_manual.pdf',
        'PDF',
        'Includes complete circuit schematics, calibration procedures, and full error code list.'
      )
    `);
    await db.run(`
      INSERT INTO manuals (device_model, title, file_path, type, notes)
      VALUES (
        'BS-200',
        'Mindray BS-200 Service Manual and Fluidic Diagram',
        '/uploads/manuals/mindray_bs200_service.pdf',
        'PDF',
        'Contains details on the syringe pump assembly, sample probe washing, and optical alignment.'
      )
    `);

    // Repairs (Logs)
    await db.run(`
      INSERT INTO repairs (device_id, error_code, problem, cause, solution, result)
      VALUES (
        1, 
        'Err 102', 
        'Pump alarms immediately with Err 102 on startup.', 
        'Sensor face was coated with dried saline solution residue.', 
        'Cleaned sensor face thoroughly with isopropyl alcohol. Ran calibration in Service Mode. Test run of 500ml saline passed successfully.',
        'solved'
      )
    `);
    await db.run(`
      INSERT INTO repairs (device_id, error_code, problem, cause, solution, result)
      VALUES (
        3, 
        'E12', 
        'Chemistry analyzer reports low light energy, calibration failing at 340nm.', 
        'Halogen light source aged. Total operating time recorded as 2420 hours.', 
        'Installed new halogen bulb. Cleaned collimating lenses. Ran absorbance gain calibration in service program. Successful calibration.',
        'solved'
      )
    `);

    // Device Programs (Software/Firmware)
    await db.run(`
      INSERT INTO device_programs (device_id, name, version, description, file_path, parameters, notes)
      VALUES (
        1,
        'Agilia Main Firmware Binary',
        'v3.5.2',
        'Main micro-controller firmware for Agilia series pumps. Addresses battery discharge warning threshold issues.',
        '/uploads/programs/agilia_main_v3.5.2.bin',
        '{"baud_rate": 19200, "calibration_offset_air": 240, "battery_cutoff_v": 6.8}',
        'Must use the Agilia Service Tool v2.0 software via RS232-to-USB cable to upload.'
      )
    `);
    await db.run(`
      INSERT INTO device_programs (device_id, name, version, description, file_path, parameters, notes)
      VALUES (
        3,
        'BS-200 Calibration Parameters Profile',
        '2026_Q2_Ref',
        'Standard optical and syringe step motor calibration offsets config.',
        '/uploads/programs/bs200_q2_cal.json',
        '{"pump_w_steps": 12800, "syringe_stroke_ul": 100, "lamp_gain_340nm": 1.25}',
        'Restored after syringe assembly replacement.'
      )
    `);

    console.log('Seed data successfully inserted.');
  }
}

// Start database
initDatabase().catch(err => {
  console.error('Failed to initialize SQLite database:', err);
});

// API Routes

// --- 0. CATEGORIES ---
app.get('/api/categories', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM categories ORDER BY name ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/categories', async (req, res) => {
  const { name, icon, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Missing required field: name' });
  }
  try {
    const result = await db.run(
      'INSERT INTO categories (name, icon, description) VALUES (?, ?, ?)',
      [name, icon || '📦', description]
    );
    const newCategory = await db.get('SELECT * FROM categories WHERE id = ?', result.lastID);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM categories WHERE id = ?', req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 1. DEVICES ---
app.get('/api/devices', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM devices ORDER BY name ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/devices/:id', async (req, res) => {
  try {
    const device = await db.get('SELECT * FROM devices WHERE id = ?', req.params.id);
    if (!device) return res.status(404).json({ error: 'Device not found' });
    
    // Get repairs and programs related to this device
    const repairs = await db.all('SELECT * FROM repairs WHERE device_id = ? ORDER BY date DESC', req.params.id);
    const programs = await db.all('SELECT * FROM device_programs WHERE device_id = ? ORDER BY created_at DESC', req.params.id);
    
    res.json({ ...device, repairs, programs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/devices', async (req, res) => {
  const { name, model, manufacturer, category, serial_number, description } = req.body;
  if (!name || !model || !manufacturer || !category) {
    return res.status(400).json({ error: 'Missing required fields: name, model, manufacturer, category' });
  }
  try {
    const result = await db.run(
      'INSERT INTO devices (name, model, manufacturer, category, serial_number, description) VALUES (?, ?, ?, ?, ?, ?)',
      [name, model, manufacturer, category, serial_number, description]
    );
    const newDevice = await db.get('SELECT * FROM devices WHERE id = ?', result.lastID);
    res.status(201).json(newDevice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/devices/:id', async (req, res) => {
  const { name, model, manufacturer, category, serial_number, description } = req.body;
  try {
    await db.run(
      'UPDATE devices SET name = ?, model = ?, manufacturer = ?, category = ?, serial_number = ?, description = ? WHERE id = ?',
      [name, model, manufacturer, category, serial_number, description, req.params.id]
    );
    const updated = await db.get('SELECT * FROM devices WHERE id = ?', req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/devices/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM devices WHERE id = ?', req.params.id);
    res.json({ success: true, message: 'Device deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- 2. ERRORS ---
app.get('/api/errors', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM errors ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/errors', async (req, res) => {
  const { device_model, error_code, title, description, cause, solution, severity, category } = req.body;
  if (!device_model || !error_code || !title) {
    return res.status(400).json({ error: 'Missing required fields: device_model, error_code, title' });
  }
  try {
    const result = await db.run(
      'INSERT INTO errors (device_model, error_code, title, description, cause, solution, severity, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [device_model, error_code, title, description, cause, solution, severity || 'medium', category]
    );
    const newError = await db.get('SELECT * FROM errors WHERE id = ?', result.lastID);
    res.status(201).json(newError);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/errors/:id', async (req, res) => {
  const { device_model, error_code, title, description, cause, solution, severity, category } = req.body;
  try {
    await db.run(
      'UPDATE errors SET device_model = ?, error_code = ?, title = ?, description = ?, cause = ?, solution = ?, severity = ?, category = ? WHERE id = ?',
      [device_model, error_code, title, description, cause, solution, severity, category, req.params.id]
    );
    const updated = await db.get('SELECT * FROM errors WHERE id = ?', req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/errors/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM errors WHERE id = ?', req.params.id);
    res.json({ success: true, message: 'Error reference entry deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- 3. MANUALS ---
app.get('/api/manuals', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM manuals ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/manuals', uploadManual.single('file'), async (req, res) => {
  const { device_model, title, type, notes } = req.body;
  if (!device_model || !title) {
    return res.status(400).json({ error: 'Missing required fields: device_model, title' });
  }
  
  const filePath = req.file ? `/uploads/manuals/${req.file.filename}` : '';
  if (!filePath && !req.body.file_path) {
    return res.status(400).json({ error: 'Manual file must be uploaded' });
  }

  const finalPath = filePath || req.body.file_path;

  try {
    const result = await db.run(
      'INSERT INTO manuals (device_model, title, file_path, type, notes) VALUES (?, ?, ?, ?, ?)',
      [device_model, title, finalPath, type || 'PDF', notes]
    );
    const newManual = await db.get('SELECT * FROM manuals WHERE id = ?', result.lastID);
    res.status(201).json(newManual);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/manuals/:id', async (req, res) => {
  try {
    // Delete local file if it exists
    const manual = await db.get('SELECT file_path FROM manuals WHERE id = ?', req.params.id);
    if (manual && manual.file_path) {
      const fullPath = path.join(__dirname, manual.file_path);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
    await db.run('DELETE FROM manuals WHERE id = ?', req.params.id);
    res.json({ success: true, message: 'Manual deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- 4. REPAIRS ---
app.get('/api/repairs', async (req, res) => {
  try {
    const rows = await db.all(`
      SELECT r.*, d.name as device_name, d.model as device_model, d.manufacturer as device_manufacturer 
      FROM repairs r
      LEFT JOIN devices d ON r.device_id = d.id
      ORDER BY r.date DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/repairs', async (req, res) => {
  const { device_id, error_code, problem, cause, solution, result, date } = req.body;
  if (!problem) {
    return res.status(400).json({ error: 'Missing required field: problem' });
  }
  try {
    const repairDate = date || new Date().toISOString();
    const insertResult = await db.run(
      'INSERT INTO repairs (device_id, error_code, problem, cause, solution, date, result) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [device_id || null, error_code, problem, cause, solution, repairDate, result || 'solved']
    );
    const newRepair = await db.get('SELECT * FROM repairs WHERE id = ?', insertResult.lastID);
    res.status(201).json(newRepair);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/repairs/:id', async (req, res) => {
  const { device_id, error_code, problem, cause, solution, result, date } = req.body;
  try {
    await db.run(
      'UPDATE repairs SET device_id = ?, error_code = ?, problem = ?, cause = ?, solution = ?, result = ?, date = ? WHERE id = ?',
      [device_id || null, error_code, problem, cause, solution, result, date, req.params.id]
    );
    const updated = await db.get('SELECT * FROM repairs WHERE id = ?', req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/repairs/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM repairs WHERE id = ?', req.params.id);
    res.json({ success: true, message: 'Repair log deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- 5. DEVICE PROGRAMS ---
app.get('/api/programs', async (req, res) => {
  try {
    const rows = await db.all(`
      SELECT p.*, d.name as device_name, d.model as device_model, d.manufacturer as device_manufacturer
      FROM device_programs p
      LEFT JOIN devices d ON p.device_id = d.id
      ORDER BY p.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/programs', uploadProgram.single('file'), async (req, res) => {
  const { device_id, name, version, description, parameters, notes } = req.body;
  if (!device_id || !name || !version) {
    return res.status(400).json({ error: 'Missing required fields: device_id, name, version' });
  }

  const filePath = req.file ? `/uploads/programs/${req.file.filename}` : '';

  try {
    const result = await db.run(
      'INSERT INTO device_programs (device_id, name, version, description, file_path, parameters, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [device_id, name, version, description, filePath || req.body.file_path || '', parameters, notes]
    );
    const newProgram = await db.get('SELECT * FROM device_programs WHERE id = ?', result.lastID);
    res.status(201).json(newProgram);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/programs/:id', async (req, res) => {
  try {
    // Delete file from storage
    const prog = await db.get('SELECT file_path FROM device_programs WHERE id = ?', req.params.id);
    if (prog && prog.file_path) {
      const fullPath = path.join(__dirname, prog.file_path);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
    await db.run('DELETE FROM device_programs WHERE id = ?', req.params.id);
    res.json({ success: true, message: 'Program deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- 6. SMART SEARCH ---
app.get('/api/search', async (req, res) => {
  const query = req.query.q || '';
  if (!query.trim()) {
    return res.json({ errors: [], devices: [], manuals: [], repairs: [], programs: [] });
  }

  // Split query into keywords
  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
  
  try {
    // Build SQL condition
    const buildLikeCondition = (fields) => {
      return terms.map(term => {
        return '(' + fields.map(field => `${field} LIKE ?`).join(' OR ') + ')';
      }).join(' AND ');
    };

    const getParams = (fieldsCount) => {
      const params = [];
      terms.forEach(term => {
        for (let i = 0; i < fieldsCount; i++) {
          params.push(`%${term}%`);
        }
      });
      return params;
    };

    // 1. Search in Errors
    const errorFields = ['error_code', 'device_model', 'title', 'description', 'cause', 'solution', 'category'];
    const errorCond = buildLikeCondition(errorFields);
    const errorParams = getParams(errorFields.length);
    const matchedErrors = await db.all(
      `SELECT * FROM errors WHERE ${errorCond} LIMIT 15`,
      errorParams
    );

    // 2. Search in Devices
    const deviceFields = ['name', 'model', 'manufacturer', 'category', 'serial_number', 'description'];
    const deviceCond = buildLikeCondition(deviceFields);
    const deviceParams = getParams(deviceFields.length);
    const matchedDevices = await db.all(
      `SELECT * FROM devices WHERE ${deviceCond} LIMIT 15`,
      deviceParams
    );

    // 3. Search in Manuals
    const manualFields = ['device_model', 'title', 'type', 'notes'];
    const manualCond = buildLikeCondition(manualFields);
    const manualParams = getParams(manualFields.length);
    const matchedManuals = await db.all(
      `SELECT * FROM manuals WHERE ${manualCond} LIMIT 15`,
      manualParams
    );

    // 4. Search in Repairs
    const repairFields = ['error_code', 'problem', 'cause', 'solution'];
    const repairCond = buildLikeCondition(repairFields);
    const repairParams = getParams(repairFields.length);
    const matchedRepairs = await db.all(
      `SELECT r.*, d.name as device_name, d.model as device_model, d.manufacturer as device_manufacturer 
       FROM repairs r 
       LEFT JOIN devices d ON r.device_id = d.id 
       WHERE ${repairCond.replace(/error_code/g, 'r.error_code')} LIMIT 15`,
      repairParams
    );

    // 5. Search in Programs
    const programFields = ['p.name', 'p.version', 'p.description', 'p.parameters', 'p.notes'];
    const programCond = terms.map(term => {
      return `(p.name LIKE ? OR p.version LIKE ? OR p.description LIKE ? OR p.parameters LIKE ? OR p.notes LIKE ? OR d.name LIKE ? OR d.model LIKE ?)`;
    }).join(' AND ');
    
    const programParams = [];
    terms.forEach(term => {
      programParams.push(`%${term}%`, `%${term}%`, `%${term}%`, `%${term}%`, `%${term}%`, `%${term}%`, `%${term}%`);
    });
    const matchedPrograms = await db.all(
      `SELECT p.*, d.name as device_name, d.model as device_model, d.manufacturer as device_manufacturer
       FROM device_programs p
       LEFT JOIN devices d ON p.device_id = d.id
       WHERE ${programCond} LIMIT 15`,
      programParams
    );

    res.json({
      errors: matchedErrors,
      devices: matchedDevices,
      manuals: matchedManuals,
      repairs: matchedRepairs,
      programs: matchedPrograms
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- 7. AI SERVICE ASSISTANT ---
app.post('/api/ai/chat', async (req, res) => {
  const { message, contextEnabled } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  let harvestedContext = '';
  let dbHits = { errors: [], repairs: [], manuals: [], devices: [] };

  if (contextEnabled) {
    // Perform keyword extraction and database search to harvest context
    const keywords = message.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g," ")
      .split(/\s+/)
      .filter(w => w.length > 2 && !['and', 'the', 'for', 'with', 'not', 'this', 'how', 'what', 'why', 'are', 'was', 'were'].includes(w));
    
    if (keywords.length > 0) {
      try {
        const buildOrLike = (fields) => {
          return '(' + keywords.map(kw => fields.map(f => `${f} LIKE ?`).join(' OR ')).join(' OR ') + ')';
        };

        const getOrParams = (fieldsCount) => {
          const params = [];
          keywords.forEach(kw => {
            for (let i = 0; i < fieldsCount; i++) {
              params.push(`%${kw}%`);
            }
          });
          return params;
        };

        // Fetch errors matching terms
        const errFields = ['error_code', 'device_model', 'title', 'description', 'cause', 'solution'];
        dbHits.errors = await db.all(
          `SELECT * FROM errors WHERE ${buildOrLike(errFields)} LIMIT 3`,
          getOrParams(errFields.length)
        );

        // Fetch past repairs
        const repFields = ['error_code', 'problem', 'cause', 'solution'];
        dbHits.repairs = await db.all(
          `SELECT r.*, d.model as device_model, d.name as device_name FROM repairs r
           LEFT JOIN devices d ON r.device_id = d.id 
           WHERE ${buildOrLike(repFields).replace(/error_code/g, 'r.error_code')} LIMIT 2`,
          getOrParams(repFields.length)
        );

        // Fetch manuals
        const manFields = ['device_model', 'title', 'notes'];
        dbHits.manuals = await db.all(
          `SELECT * FROM manuals WHERE ${buildOrLike(manFields)} LIMIT 2`,
          getOrParams(manFields.length)
        );

        // Format harvested database content
        let contextParts = [];
        if (dbHits.errors.length > 0) {
          contextParts.push("=== RELEVANT DATABASE ERROR REFERENCE ===");
          dbHits.errors.forEach(e => {
            contextParts.push(`Device Model: ${e.device_model}\nError Code: ${e.error_code}\nTitle: ${e.title}\nDescription: ${e.description}\nKnown Cause: ${e.cause}\nKnown Solution: ${e.solution}\n---`);
          });
        }
        if (dbHits.repairs.length > 0) {
          contextParts.push("=== RELEVANT PAST REPAIR RECORDS ===");
          dbHits.repairs.forEach(r => {
            contextParts.push(`Device: ${r.device_name || ''} (${r.device_model || ''})\nError Code: ${r.error_code || 'N/A'}\nProblem: ${r.problem}\nRoot Cause: ${r.cause || 'Unknown'}\nApplied Solution: ${r.solution}\nResult: ${r.result}\n---`);
          });
        }
        if (dbHits.manuals.length > 0) {
          contextParts.push("=== RELEVANT TECHNICAL DOCUMENTATION ===");
          dbHits.manuals.forEach(m => {
            contextParts.push(`Device Model: ${m.device_model}\nManual Title: ${m.title}\nType: ${m.type}\nNotes: ${m.notes || ''}\n---`);
          });
        }

        harvestedContext = contextParts.join('\n');
      } catch (err) {
        console.error('Error harvesting context:', err);
      }
    }
  }

  const systemPrompt = `You are a senior biomedical service engineer with 15 years of experience.
You specialize in X-ray, ultrasound, hematology analyzers, infusion pumps, and lab devices.

You work with a private offline technical database containing:
- medical device errors
- repair logs
- service manuals
- device software/program configurations

Your troubleshooting logic hierarchy is:
1. Electrical/power failure
2. Sensor/calibration failure
3. Software/firmware issue
4. Mechanical failure

Below is the context from our private offline technical database, which contains exact technical reference documents, manuals, and past service logs matching the user's issue. Use this context as your primary source of truth, and match its terms when possible:

<PRIVATE_DATABASE_CONTEXT>
${harvestedContext || 'No matching local database context was found for this specific query. Rely on your general expertise.'}
</PRIVATE_DATABASE_CONTEXT>

Your task:
1. Analyze the user's error or question.
2. Identify possible device category and error type.
3. Suggest likely causes based on the troubleshooting hierarchy and context.
4. Provide step-by-step repair and diagnostics instructions.
5. If the user's information is incomplete, ask them to provide the device model and error code.

Rules:
- Be technical, highly precise, and extremely practical.
- Do not give medical advice for patients. Focus solely on equipment engineering and servicing.
- Always provide a fast diagnosis path (minimal steps first), and clear risk warnings or safety notes.
- Respond in the same language as the user's message (Russian or English).
- Use the following structured output format:

### Problem Analysis
[Explain what is happening and identify the probable device/subsystem affected]

### Likely Cause
[Provide the primary root cause based on the hierarchy, detailing why it happens]

### Fast Diagnosis Path
[1-2 quick checks that take under 2 minutes to narrow down the issue]

### Detailed Troubleshooting & Repair Steps
[Numbered step-by-step instructions. Reference specific pinouts, multimeter checks, cleaning, calibration, or firmware replacement steps]

### Safety Notes & Risk Warnings
[Critical warnings regarding high voltage, radiation, biohazard, or laser safety, plus hardware damage prevention advice]`;

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    // Gemini API key is missing or is the default placeholder.
    // Provide a beautiful mock response illustrating what would happen, and outputting the exact context harvested.
    // This allows offline/unconfigured usage to show off the system's database crawling capabilities!
    const isRussian = /[а-яА-Я]/.test(message);
    const responseText = isRussian 
      ? `### ⚠️ API Ключ Не Настроен (Режим Демонстрации Контекста)

Для работы искусственного интеллекта в реальном времени вам необходимо указать ваш **GEMINI_API_KEY** в файле \`.env\` в корне проекта и перезагрузить сервер.

Тем не менее, система **успешно выполнила умный поиск по вашей локальной базе данных** и собрала следующий контекст для отправки в Gemini:

#### 🔍 Собранный локальный контекст для AI:
\`\`\`text
${harvestedContext ? harvestedContext : 'Локальный контекст не найден для вашего запроса. Пожалуйста, попробуйте запросы со словами "E12", "Volumat", "lamp", "Air in Line" или "overheat".'}
\`\`\`

#### 🤖 Системная инструкция для инженера:
Ниже представлен пример анализа, который сгенерирует Gemini при наличии ключа:
- **Анализ проблемы**: Обнаружены соответствующие коды ошибок в локальной базе данных.
- **Быстрая диагностика**: Проверка напряжения питания, проверка датчиков, очистка контактов.
- **Инструкции**: Очистите оптику/датчики изопропиловым спиртом, проведите калибровку в сервисном режиме.
- **Безопасность**: Обесточьте прибор перед разборкой. Остерегайтесь высокого напряжения или биологических жидкостей.`
      : `### ⚠️ Gemini API Key Not Configured (Context Demo Mode)

To enable real-time AI assistance, please specify your **GEMINI_API_KEY** in the \`.env\` file in the project root and restart the server.

However, the system has **successfully queried your local database** and assembled the following context for the AI model:

#### 🔍 Harvested Local Context:
\`\`\`text
${harvestedContext ? harvestedContext : 'No local context was harvested for your query. Try querying terms like "E12", "Volumat", "lamp", "Air in Line", or "overheat".'}
\`\`\`

#### 🤖 System Instruction Draft:
Below is a demonstration of the response structure Gemini will generate once your API key is provided:
- **Problem Analysis**: Matched error codes found in local database.
- **Fast Diagnosis**: Power supply check, sensor check, connector cleaning.
- **Steps**: Clean sensors with isopropyl alcohol, run service mode calibration, replace worn parts.
- **Safety**: Unplug equipment before disassembly. Beware of high voltage or biohazards.`;

    return res.json({
      text: responseText,
      harvestedContext: harvestedContext,
      dbHits: dbHits,
      demoMode: true
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    // Use gemini-1.5-flash or gemini-2.5-flash as default, since we want fast responsive chat
    // Note: in the newer @google/generative-ai package, we get the model and generate content
    const model = ai.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.2, // low temperature for precise technical facts
      }
    });

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + `\n\nUser Question/Issue: ${message}` }] }
      ]
    });

    const response = await result.response;
    res.json({
      text: response.text(),
      harvestedContext: harvestedContext,
      dbHits: dbHits,
      demoMode: false
    });
  } catch (err) {
    console.error('Gemini API Error:', err);
    res.status(500).json({ 
      error: 'Failed to communicate with Gemini API. Check your key and network connection.',
      details: err.message,
      harvestedContext: harvestedContext,
      dbHits: dbHits
    });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`===========================================================`);
  console.log(`🚀 BIOMEDICAL SERVICE SYSTEM RUNNING AT: http://localhost:${PORT}`);
  console.log(`📂 Database: SQLite database.db (auto-seeded)`);
  console.log(`🤖 AI Engine: Gemini-1.5-Flash (Uses API key in .env)`);
  console.log(`===========================================================`);
});
