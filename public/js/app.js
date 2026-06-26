// ==========================================================================
// BIOMEDICAL ENGINEERING SYSTEM - DUAL-MODE & MULTI-LINGUAL CONTROLLER
// Supports: SQLite (Node.js Server) / Standalone LocalStorage (Browser Only)
// Languages: Russian (RU), Uzbek (UZ), English (EN)
// Dynamic Categories & Custom Equipment Groups
// ==========================================================================

// 1. Language Translation Dictionary (RU, UZ, EN)
const i18n = {
  ru: {
    dashboard: "Панель управления",
    knowledge: "База ошибок",
    devices: "Оборудование",
    manuals: "Мануалы и схемы",
    repairs: "Журнал ремонтов",
    programs: "Программы аппаратов",
    'ai-assistant': "ИИ Ассистент",
    settings: "Системные настройки",
    
    brand_title: "БИОМЕД",
    brand_sub: "СЕРВИСНЫЙ МОЗГ",
    
    status_server: "SQLite Сервер подключен",
    status_browser: "Локальная БД браузера",
    
    search_title: "Поиск по технической базе",
    search_sub: "Мгновенный поиск ошибок, инструкций, деталей оборудования и прошивок",
    search_placeholder: "Введите код ошибки, модель аппарата, симптом... (например, E12 no signal)",
    
    stat_devices: "Активные аппараты",
    stat_errors: "Коды ошибок в базе",
    stat_repairs: "Выполненные ремонты",
    stat_programs: "Программы и софт",
    
    device_categories: "Категории оборудования",
    btn_create_category: "+ Создать категорию",
    recent_errors_title: "⚡ Недавние ошибки и решения",
    btn_view_all: "Показать все",
    
    ai_title: "ИИ Со-Инженер Gemini",
    ai_sub: "Специализированная языковая модель для медтехники",
    ai_rag_label: "Контекст базы данных (RAG)",
    ai_welcome_header: "🤖 СЕРВИСНЫЙ СО-ИНЖЕНЕР",
    ai_welcome: "Приветствую. Я ваш цифровой ассистент по обслуживанию медицинского оборудования, обладающий 15-летним опытом работы с УЗИ, рентгенами, анализаторами и инфузионными насосами. Я подключен к вашей базе данных и готов составить инструкцию по ремонту на основе ваших же записей. Как я могу помочь вам сегодня?",
    ai_input_placeholder: "Опишите неисправность, модель аппарата или код ошибки...",
    
    btn_cancel: "Отмена",
    btn_save: "Сохранить",
    btn_upload: "Загрузить",
    
    // Modals
    modal_add_device: "Добавить новый аппарат",
    modal_add_error: "Создать карту ошибки",
    modal_add_repair: "Зарегистрировать ремонт",
    modal_add_manual: "Загрузить руководство",
    modal_add_program: "Сохранить программу/софт",
    modal_add_category: "Создать категорию оборудования"
  },
  uz: {
    dashboard: "Boshqaruv paneli",
    knowledge: "Xatolar bazasi",
    devices: "Uskunalar",
    manuals: "Qo'llanmalar va sxemalar",
    repairs: "Ta'mirlash jurnali",
    programs: "Apparat dasturlari",
    'ai-assistant': "AI Yordamchi",
    settings: "Tizim sozlamalari",
    
    brand_title: "BIOMED",
    brand_sub: "XIZMAT KO'RSATISH",
    
    status_server: "SQLite Server ulangan",
    status_browser: "Brauzer lokal bazasi",
    
    search_title: "Texnik bazadan qidirish",
    search_sub: "Xatoliklar, qo'llanmalar, ta'mirlash jurnallari va proshivkalarni tezkor qidirish",
    search_placeholder: "Xato kodi, apparat modeli yoki nosozlik belgisini yozing... (masalan, E12 no signal)",
    
    stat_devices: "Faol uskunalar",
    stat_errors: "Tizimdagi xatoliklar",
    stat_repairs: "Bajarilgan ta'mirlar",
    stat_programs: "Dasturlar va sozlamalar",
    
    device_categories: "Uskuna toifalari",
    btn_create_category: "+ Toifa yaratish",
    recent_errors_title: "⚡ Oxirgi xatoliklar va yechimlar",
    btn_view_all: "Barchasini ko'rsatish",
    
    ai_title: "Gemini AI Hammuhandisi",
    ai_sub: "Tibbiy texnika bo'yicha ixtisoslashgan model",
    ai_rag_label: "Ma'lumotlar bazasi konteksti (RAG)",
    ai_welcome_header: "🤖 HAMMUHANDIS AI",
    ai_welcome: "Assalomu alaykum. Men tibbiy asbob-uskunalarga xizmat ko'rsatish bo'yicha raqamli yordamchiman. UZI, rentgen, analizatorlar bo'yicha 15 yillik tajribam bor. So'rovingizga ko'ra, lokal ma'lumotlar bazangizni qidirib, aniq muhandislik yechimlarini ishlab chiqaman. Bugun qanday yordam bera olaman?",
    ai_input_placeholder: "Uskunadagi nosozlikni, modelni yoki xato kodini yozing...",
    
    btn_cancel: "Bekor qilish",
    btn_save: "Saqlash",
    btn_upload: "Yuklash",
    
    modal_add_device: "Yangi apparat qo'shish",
    modal_add_error: "Xatolik varaqasini yaratish",
    modal_add_repair: "Ta'mirlashni ro'yxatga olish",
    modal_add_manual: "Qo'llanmani yuklash",
    modal_add_program: "Dastur/sozlamani saqlash",
    modal_add_category: "Yangi toifa yaratish"
  },
  en: {
    dashboard: "Dashboard",
    knowledge: "Error Knowledge",
    devices: "Equipment List",
    manuals: "Manuals & Docs",
    repairs: "Service Log",
    programs: "Device Programs",
    'ai-assistant': "AI Assistant",
    settings: "System Settings",
    
    brand_title: "BIOMED",
    brand_sub: "SERVICE HUB",
    
    status_server: "SQLite Server Connected",
    status_browser: "Standalone Browser DB",
    
    search_title: "Search Technical Database",
    search_sub: "Instantly search errors, manuals, repairs, devices and firmware files",
    search_placeholder: "Enter error code, symptoms, device model... (e.g., E12 no signal)",
    
    stat_devices: "Active Devices",
    stat_errors: "Known Error Codes",
    stat_repairs: "Repairs Logged",
    stat_programs: "Software Profiles",
    
    device_categories: "Device Categories",
    btn_create_category: "+ Create Category",
    recent_errors_title: "⚡ Recent Error Codes & Solutions",
    btn_view_all: "View All",
    
    ai_title: "Gemini Service Co-Engineer",
    ai_sub: "Specialized Technical Reasoning Model",
    ai_rag_label: "Database Context (RAG)",
    ai_welcome_header: "🤖 SERVICE CO-ENGINEER",
    ai_welcome: "Greetings. I am your biomedical engineering service assistant, loaded with 15 years of technical troubleshooting expertise. I am connected directly to your database to formulate repair roadmaps based on your records. How can I assist you in servicing today?",
    ai_input_placeholder: "Describe the device error, model, and symptoms...",
    
    btn_cancel: "Cancel",
    btn_save: "Save",
    btn_upload: "Upload",
    
    modal_add_device: "Add New Equipment Card",
    modal_add_error: "Add Error Reference Card",
    modal_add_repair: "Log Service/Repair Operation",
    modal_add_manual: "Upload Service Manual",
    modal_add_program: "Store Firmware or Parameters",
    modal_add_category: "Create New Device Category"
  }
};

// Global Application State
const state = {
  activeTab: 'dashboard',
  dbMode: 'server', // 'server' or 'browser'
  lang: 'ru', // 'ru', 'uz', or 'en'
  categories: [],
  devices: [],
  errors: [],
  manuals: [],
  repairs: [],
  programs: [],
  activeDevice: null
};

// API Endpoints
const API = {
  categories: '/api/categories',
  devices: '/api/devices',
  errors: '/api/errors',
  manuals: '/api/manuals',
  repairs: '/api/repairs',
  programs: '/api/programs',
  search: '/api/search',
  aiChat: '/api/ai/chat'
};

// Initialize Application on DOM Load
document.addEventListener('DOMContentLoaded', async () => {
  setupNavigation();
  setupEventListeners();
  
  // Set active language from localStorage
  state.lang = localStorage.getItem('biomed_lang') || 'ru';
  
  // Detect server connection
  await detectDatabaseMode();
  
  // Load and render all data
  await refreshAllData();
  
  // Apply initial translations
  applyLanguageTranslations();

  // Set default date for repair log input to current local time
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const dateInput = document.getElementById('form-repair-date');
  if (dateInput) {
    dateInput.value = now.toISOString().slice(0, 16);
  }
});

// 2. Dual-Mode Database Detection
async function detectDatabaseMode() {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 1200);
    
    const res = await fetch(API.devices, { signal: controller.signal });
    clearTimeout(id);
    
    if (res.ok) {
      state.dbMode = 'server';
      console.log('🚀 Running in Server Mode: SQLite database connected.');
    } else {
      throw new Error();
    }
  } catch (err) {
    state.dbMode = 'browser';
    console.warn('⚠️ Server not reachable. Switching to Standalone Browser Mode (LocalStorage DB).');
    
    // Initialize browser mode localStorage database if empty
    if (!localStorage.getItem('biomed_devices')) {
      seedBrowserDatabase();
    }
  }
  
  // Set up connection status badge
  updateConnectionStatusBadge();
}

function updateConnectionStatusBadge() {
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.querySelector('.status-text');
  
  if (statusDot && statusText) {
    if (state.dbMode === 'server') {
      statusDot.className = 'status-dot online';
      statusText.textContent = i18n[state.lang].status_server;
    } else {
      statusDot.className = 'status-dot warning';
      statusText.textContent = i18n[state.lang].status_browser;
    }
  }
}

// 3. Navigation SPA Router
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-menu .nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      if (targetTab) switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  state.activeTab = tabId;
  
  // Update Navigation Active classes
  document.querySelectorAll('.nav-menu .nav-item').forEach(item => {
    if (item.getAttribute('data-tab') === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update Tab View panel visibility
  document.querySelectorAll('.tab-view').forEach(view => {
    if (view.id === `tab-${tabId}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  // Update main header title
  const pageTitle = document.getElementById('page-title');
  if (pageTitle) {
    pageTitle.textContent = i18n[state.lang][tabId] || 'BIOMED';
  }

  // Refresh tab content
  if (tabId === 'dashboard') {
    renderDashboard();
  }
}

// 4. Internationalization (Language Switcher)
function changeLanguage(langCode) {
  state.lang = langCode;
  localStorage.setItem('biomed_lang', langCode);
  
  // Apply UI Translations
  applyLanguageTranslations();
  
  // Re-render lists containing static language items
  updateConnectionStatusBadge();
  renderDashboard();
  renderErrors();
  renderDevices();
  renderManuals();
  renderRepairs();
  renderPrograms();
  
  // Update selected language button in header
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === langCode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  showToast(langCode === 'ru' ? 'Язык изменен на Русский' : langCode === 'uz' ? "Til O'zbekchaga o'zgartirildi" : "Language changed to English", 'success');
}

function applyLanguageTranslations() {
  const dict = i18n[state.lang];
  
  // Update sidebar elements
  const sidebarBrand = document.querySelector('.brand-text h1');
  if (sidebarBrand) sidebarBrand.textContent = dict.brand_title;
  const sidebarBrandSub = document.querySelector('.brand-text span');
  if (sidebarBrandSub) sidebarBrandSub.textContent = dict.brand_sub;

  // Sidebar navigation labels
  document.querySelectorAll('.nav-menu .nav-item').forEach(item => {
    const tabName = item.getAttribute('data-tab');
    const labelSpan = item.querySelector('span');
    if (labelSpan && dict[tabName]) {
      labelSpan.textContent = dict[tabName];
    }
  });

  // Main page title
  const pageTitle = document.getElementById('page-title');
  if (pageTitle && dict[state.activeTab]) {
    pageTitle.textContent = dict[state.activeTab];
  }

  // Translate static UI elements with data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      // Check if it is a button with SVG icon inside
      const svg = el.querySelector('svg');
      if (svg) {
        // Keep the SVG and replace only the text node
        const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (textNode) {
          textNode.textContent = ' ' + dict[key];
        } else {
          el.appendChild(document.createTextNode(' ' + dict[key]));
        }
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Translate Input Placeholders
  const searchInput = document.getElementById('main-search-input');
  if (searchInput) searchInput.placeholder = dict.search_placeholder;

  const quickAiInput = document.getElementById('quick-ai-input');
  if (quickAiInput) quickAiInput.placeholder = dict.ai_input_placeholder;

  const aiChatInput = document.getElementById('ai-chat-textarea');
  if (aiChatInput) aiChatInput.placeholder = dict.ai_input_placeholder;
}

// 5. API Data Fetchers & Sync
async function refreshAllData() {
  try {
    if (state.dbMode === 'server') {
      // Pull data from Node backend
      const [cats, devs, errs, docs, reps, progs] = await Promise.all([
        fetchData(API.categories),
        fetchData(API.devices),
        fetchData(API.errors),
        fetchData(API.manuals),
        fetchData(API.repairs),
        fetchData(API.programs)
      ]);

      state.categories = cats || [];
      state.devices = devs || [];
      state.errors = errs || [];
      state.manuals = docs || [];
      state.repairs = reps || [];
      state.programs = progs || [];
    } else {
      // Standalone mode: Pull from browser LocalStorage
      state.categories = JSON.parse(localStorage.getItem('biomed_categories')) || [];
      state.devices = JSON.parse(localStorage.getItem('biomed_devices')) || [];
      state.errors = JSON.parse(localStorage.getItem('biomed_errors')) || [];
      state.manuals = JSON.parse(localStorage.getItem('biomed_manuals')) || [];
      state.repairs = JSON.parse(localStorage.getItem('biomed_repairs')) || [];
      state.programs = JSON.parse(localStorage.getItem('biomed_programs')) || [];
    }

    // Refresh dynamically populated components
    populateDropdowns();
    renderDashboard();
    renderErrors();
    renderDevices();
    renderManuals();
    renderRepairs();
    renderPrograms();

  } catch (err) {
    showToast(state.lang === 'ru' ? 'Ошибка загрузки базы.' : 'Baza yuklashda xatolik.', 'danger');
    console.error(err);
  }
}

async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
  return await res.json();
}

function populateDropdowns() {
  const repairSelect = document.getElementById('form-repair-device-select');
  const programSelect = document.getElementById('form-program-device-select');
  const deviceCatSelect = document.querySelector('#modal-add-device select[name="category"]');

  // Fill device selects
  const deviceOptions = state.devices.map(d => 
    `<option value="${d.id}">${d.name} (${d.manufacturer} ${d.model})</option>`
  ).join('');
  const selectLabel = state.lang === 'ru' ? 'Выберите аппарат...' : state.lang === 'uz' ? 'Apparatni tanlang...' : 'Select Equipment...';
  const defaultDeviceOption = `<option value="">${selectLabel}</option>`;
  
  if (repairSelect) repairSelect.innerHTML = defaultDeviceOption + deviceOptions;
  if (programSelect) programSelect.innerHTML = defaultDeviceOption + deviceOptions;

  // Fill category selection in Add Device Form
  if (deviceCatSelect) {
    const catLabel = state.lang === 'ru' ? 'Выберите категорию...' : state.lang === 'uz' ? 'Toifani tanlang...' : 'Select Category...';
    const defaultCatOption = `<option value="">${catLabel}</option>`;
    const catOptions = state.categories.map(c => 
      `<option value="${c.name}">${c.name}</option>`
    ).join('');
    deviceCatSelect.innerHTML = defaultCatOption + catOptions;
  }
}

// 6. Dynamic Views Rendering

// --- 6a. DASHBOARD ---
function renderDashboard() {
  const dict = i18n[state.lang];
  
  // Dashboard stats counts
  document.getElementById('stat-devices-count').textContent = state.devices.length;
  document.getElementById('stat-errors-count').textContent = state.errors.length;
  document.getElementById('stat-repairs-count').textContent = state.repairs.length;
  document.getElementById('stat-programs-count').textContent = state.programs.length;

  // Render dynamic category cards
  const categoriesGrid = document.getElementById('categories-list-container');
  if (categoriesGrid) {
    if (state.categories.length === 0) {
      categoriesGrid.innerHTML = `<div class="empty-state-card" style="grid-column: 1/-1; padding: 20px;">No categories created.</div>`;
    } else {
      categoriesGrid.innerHTML = state.categories.map(c => `
        <div class="category-card" onclick="setSearchFilter('${c.name}')">
          <div class="cat-logo">${c.icon || '📦'}</div>
          <h4>${c.name}</h4>
          <p>${c.description || ''}</p>
        </div>
      `).join('');
    }
  }

  // Render recent errors list
  const recentContainer = document.getElementById('recent-errors-list');
  const recent = state.errors.slice(0, 4);

  if (recent.length === 0) {
    recentContainer.innerHTML = `<div class="empty-state-card" style="padding:20px; text-align:center; color:var(--text-darker);">${state.lang === 'ru' ? 'Ошибок в базе нет' : "Xatoliklar topilmadi"}</div>`;
    return;
  }

  recentContainer.innerHTML = recent.map(e => `
    <div class="recent-error-item severity-${e.severity || 'medium'}" onclick="openErrorDetails('${e.id}')">
      <div class="error-item-meta">
        <span class="error-device">${e.device_model}</span>
        <span class="error-code-badge">${e.error_code}</span>
      </div>
      <h4>${e.title}</h4>
      <p>${e.description || 'No description logged.'}</p>
    </div>
  `).join('');
}

// --- 6b. KNOWLEDGE BASE (ERRORS) ---
function renderErrors(filtered = null) {
  const container = document.getElementById('error-dictionary-container');
  const list = filtered || state.errors;

  if (list.length === 0) {
    container.innerHTML = `<div class="empty-state-card" style="padding:40px; text-align:center; color:var(--text-darker); background:var(--card-bg); border-radius:16px;">${state.lang === 'ru' ? 'Нет подходящих карт ошибок' : "Xatoliklar varaqalari topilmadi"}</div>`;
    return;
  }

  container.innerHTML = list.map(e => `
    <div class="error-card" id="error-card-${e.id}">
      <div class="error-card-header">
        <div>
          <div class="err-model-tag">${e.device_model}</div>
          <div class="error-card-title">
            <h3>[${e.error_code}] — ${e.title}</h3>
            <span class="severity-pill ${e.severity}">${e.severity}</span>
          </div>
        </div>
        <span class="device-category-tag">${e.category || 'General'}</span>
      </div>
      <div class="error-card-body">
        <div class="err-section">
          <h5 style="color:var(--text-darker); font-weight:800; font-size:0.75rem;">${state.lang === 'ru' ? 'Описание неисправности' : "Nosozlik tavsifi"}</h5>
          <p>${e.description || 'No description logged.'}</p>
        </div>
        <div class="err-section">
          <h5 style="color:var(--text-darker); font-weight:800; font-size:0.75rem;">${state.lang === 'ru' ? 'Вероятная причина' : "Taxminiy sabab"}</h5>
          <p>${e.cause || 'No cause logged.'}</p>
        </div>
        <div class="err-section">
          <h5 style="color:var(--text-darker); font-weight:800; font-size:0.75rem;">${state.lang === 'ru' ? 'Инструкция по диагностике и ремонту' : "Tashxis va ta'mirlash yo'riqnomasi"}</h5>
          <p>${e.solution || 'No instructions logged.'}</p>
        </div>
      </div>
      <div class="error-card-footer">
        <button class="btn btn-secondary btn-xs" onclick="deleteErrorEntry(${e.id})">${state.lang === 'ru' ? 'Удалить запись' : "O'chirish"}</button>
      </div>
    </div>
  `).join('');
}

function filterErrors() {
  const query = document.getElementById('err-search-filter').value.toLowerCase();
  const filtered = state.errors.filter(e => 
    e.error_code.toLowerCase().includes(query) ||
    e.device_model.toLowerCase().includes(query) ||
    e.title.toLowerCase().includes(query) ||
    (e.description && e.description.toLowerCase().includes(query))
  );
  renderErrors(filtered);
}

// --- 6c. DEVICES & INVENTORY ---
function renderDevices(filtered = null) {
  const container = document.getElementById('devices-list-container');
  const list = filtered || state.devices;

  if (list.length === 0) {
    container.innerHTML = `<div class="empty-state-card" style="padding:40px; text-align:center; color:var(--text-darker); background:var(--card-bg); border-radius:16px; grid-column:1/-1;">${state.lang === 'ru' ? 'Аппараты не найдены' : "Uskunalar topilmadi"}</div>`;
    return;
  }

  container.innerHTML = list.map(d => {
    const repairCount = state.repairs.filter(r => r.device_id == d.id).length;
    const programCount = state.programs.filter(p => p.device_id == d.id).length;
    const openCardText = state.lang === 'ru' ? 'Открыть карту &rarr;' : state.lang === 'uz' ? "Kartani ochish &rarr;" : "Open Card &rarr;";

    return `
      <div class="device-card" onclick="showDeviceDetails(${d.id})">
        <div class="device-card-header">
          <span class="device-category-tag">${d.category}</span>
          <span class="device-serial">${d.serial_number || 'No S/N'}</span>
        </div>
        <h3>${d.name}</h3>
        <p class="device-model-desc">${d.manufacturer} | ${d.model}</p>
        <p class="device-desc-excerpt">${d.description ? d.description.substring(0, 85) + (d.description.length > 85 ? '...' : '') : 'No description provided.'}</p>
        <div class="device-card-footer">
          <div class="device-stats">
            <span>⚙ ${programCount} Configs</span>
            <span>🛠 ${repairCount} Service Logs</span>
          </div>
          <span class="text-cyan font-weight-bold">${openCardText}</span>
        </div>
      </div>
    `;
  }).join('');
}

function filterDevices() {
  const query = document.getElementById('device-search-filter').value.toLowerCase();
  const filtered = state.devices.filter(d => 
    d.name.toLowerCase().includes(query) ||
    d.model.toLowerCase().includes(query) ||
    d.manufacturer.toLowerCase().includes(query) ||
    d.category.toLowerCase().includes(query) ||
    (d.serial_number && d.serial_number.toLowerCase().includes(query))
  );
  renderDevices(filtered);
}

// --- 6d. DEVICE DETAILS DRAWER ---
async function showDeviceDetails(id) {
  try {
    let data;
    if (state.dbMode === 'server') {
      data = await fetchData(`${API.devices}/${id}`);
    } else {
      const dev = state.devices.find(d => d.id == id);
      if (!dev) throw new Error('Device not found');
      
      const repairs = state.repairs.filter(r => r.device_id == id);
      const programs = state.programs.filter(p => p.device_id == id);
      data = { ...dev, repairs, programs };
    }

    state.activeDevice = data;

    // Fill UI drawer fields
    document.getElementById('dev-detail-name').textContent = data.name;
    document.getElementById('dev-detail-meta').textContent = `${data.manufacturer} — Model ${data.model}`;
    document.getElementById('dev-detail-desc').textContent = data.description || 'No description logged.';
    document.getElementById('dev-detail-category').textContent = data.category;
    document.getElementById('dev-detail-serial').textContent = data.serial_number || 'N/A';

    // Timeline history
    const repairsTimeline = document.getElementById('dev-detail-repairs-timeline');
    if (data.repairs.length === 0) {
      repairsTimeline.innerHTML = '<p class="text-darker" style="font-size: 0.8rem; margin:10px 0;">No repairs logged.</p>';
    } else {
      repairsTimeline.innerHTML = data.repairs.map(r => `
        <div class="timeline-item ${r.result}">
          <div class="timeline-dot"></div>
          <div class="timeline-meta">${new Date(r.date).toLocaleDateString()} — Code: ${r.error_code || 'None'}</div>
          <div class="timeline-content">
            <h5>Problem: ${r.problem}</h5>
            <p><strong>Cause:</strong> ${r.cause || 'Unknown'}</p>
            <p><strong>Solution:</strong> ${r.solution || 'No details logged'}</p>
            <div class="timeline-action">Status: <span class="badge result-badge ${r.result}">${r.result.replace('_', ' ')}</span></div>
          </div>
        </div>
      `).join('');
    }

    // Firmware configs
    const progList = document.getElementById('dev-detail-programs');
    if (data.programs.length === 0) {
      progList.innerHTML = '<p class="text-darker" style="font-size: 0.8rem; margin:10px 0;">No software files linked.</p>';
    } else {
      progList.innerHTML = data.programs.map(p => `
        <div class="dev-program-item">
          <h5>${p.name} <span class="ver">${p.version}</span></h5>
          <p>${p.description || 'No description.'}</p>
          ${p.file_path ? `<a href="${p.file_path}" download class="btn btn-link btn-xs" style="margin-top:6px; display:inline-block;">📥 Download config</a>` : ''}
        </div>
      `).join('');
    }

    document.getElementById('btn-delete-device-action').onclick = () => deleteDevice(data.id);
    document.getElementById('device-detail-panel').style.display = 'flex';
  } catch (err) {
    showToast('Failed to pull detailed equipment history.', 'danger');
  }
}

function closeDeviceDetails() {
  document.getElementById('device-detail-panel').style.display = 'none';
  state.activeDevice = null;
}

// --- 6e. MANUALS ---
function renderManuals(filtered = null) {
  const container = document.getElementById('manuals-list-container');
  const list = filtered || state.manuals;

  if (list.length === 0) {
    container.innerHTML = `<div class="empty-state-card" style="padding:40px; text-align:center; color:var(--text-darker); background:var(--card-bg); border-radius:16px; grid-column:1/-1;">No manuals found.</div>`;
    return;
  }

  container.innerHTML = list.map(m => `
    <div class="manual-card">
      <div class="manual-card-header">
        <div class="doc-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <div>
          <span class="doc-model">${m.device_model}</span>
          <h4>${m.title}</h4>
        </div>
      </div>
      <p class="manual-notes">${m.notes || 'No notes logged.'}</p>
      <div class="manual-card-footer">
        <span class="badge" style="background-color: var(--bg-primary); border: 1px solid var(--card-border);">${m.type || 'PDF'}</span>
        <div style="display:flex; gap: 8px;">
          ${m.file_path && m.file_path !== '#' ? `<a href="${m.file_path}" target="_blank" class="btn btn-secondary btn-xs">📥 View Doc</a>` : '<span class="text-darker" style="font-size:0.7rem; padding:4px;">No doc file</span>'}
          <button class="btn btn-danger btn-xs" onclick="deleteManual(${m.id})">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterManuals() {
  const query = document.getElementById('manuals-search-filter').value.toLowerCase();
  const filtered = state.manuals.filter(m => 
    m.device_model.toLowerCase().includes(query) ||
    m.title.toLowerCase().includes(query) ||
    (m.notes && m.notes.toLowerCase().includes(query))
  );
  renderManuals(filtered);
}

// --- 6f. SERVICE LOG (REPAIRS) ---
function renderRepairs(filtered = null) {
  const container = document.getElementById('repairs-list-container');
  const list = filtered || state.repairs;

  if (list.length === 0) {
    container.innerHTML = `<div class="empty-state-card" style="padding:40px; text-align:center; color:var(--text-darker); background:var(--card-bg); border-radius:16px;">No logged cases.</div>`;
    return;
  }

  container.innerHTML = list.map(r => {
    const dev = state.devices.find(d => d.id == r.device_id);
    const devMfg = r.device_manufacturer || (dev ? dev.manufacturer : '');
    const devModel = r.device_model || (dev ? dev.model : '');
    const devName = r.device_name || (dev ? dev.name : 'Physical Equipment');

    return `
      <div class="repair-log-card">
        <div class="log-meta-col">
          <span class="log-device-lbl">${devMfg} ${devModel}</span>
          <h4>${devName}</h4>
          <span class="log-date">🔧 ${new Date(r.date).toLocaleString()}</span>
          <span class="badge result-badge ${r.result}">${r.result.replace('_', ' ')}</span>
        </div>
        <div class="log-detail-col">
          <h5 style="color:var(--text-darker); font-weight:800; font-size:0.75rem;">Reported Fault [Code: ${r.error_code || 'None'}]</h5>
          <p class="text-main" style="margin-bottom: 10px;"><strong>Problem:</strong> ${r.problem}</p>
          <p><strong>Discovered Root Cause:</strong> ${r.cause || 'Not specified.'}</p>
        </div>
        <div class="log-solution-col">
          <h5 style="color:var(--text-darker); font-weight:800; font-size:0.75rem;">Applied Action & Solution</h5>
          <p>${r.solution || 'No service actions logged.'}</p>
          <div style="margin-top: 16px; display: flex; justify-content: flex-end; gap: 8px;">
            <button class="btn btn-secondary btn-xs" onclick="deleteRepairLog(${r.id})">Delete Log</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterRepairs() {
  const query = document.getElementById('repairs-search-filter').value.toLowerCase();
  const filtered = state.repairs.filter(r => {
    const dev = state.devices.find(d => d.id == r.device_id);
    const name = dev ? dev.name.toLowerCase() : '';
    const model = dev ? dev.model.toLowerCase() : '';
    return r.problem.toLowerCase().includes(query) ||
      (r.cause && r.cause.toLowerCase().includes(query)) ||
      (r.solution && r.solution.toLowerCase().includes(query)) ||
      name.includes(query) ||
      model.includes(query)
  });
  renderRepairs(filtered);
}

// --- 6g. PROGRAMS & FIRMWARE ---
function renderPrograms(filtered = null) {
  const container = document.getElementById('programs-list-container');
  const list = filtered || state.programs;

  if (list.length === 0) {
    container.innerHTML = `<div class="empty-state-card" style="padding:40px; text-align:center; color:var(--text-darker); background:var(--card-bg); border-radius:16px; grid-column:1/-1;">No firmware config files.</div>`;
    return;
  }

  container.innerHTML = list.map(p => {
    const dev = state.devices.find(d => d.id == p.device_id);
    const devMfg = p.device_manufacturer || (dev ? dev.manufacturer : '');
    const devModel = p.device_model || (dev ? dev.model : '');

    let formattedParams = '';
    if (p.parameters) {
      try {
        const obj = JSON.parse(p.parameters);
        formattedParams = Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join('\n');
      } catch (e) {
        formattedParams = p.parameters;
      }
    }

    return `
      <div class="program-card">
        <div class="program-card-header">
          <div>
            <span class="program-device-name">${devMfg} ${devModel}</span>
            <h4 style="margin-top: 4px;">${p.name}</h4>
          </div>
          <span class="program-ver-badge">${p.version}</span>
        </div>
        <p class="manual-notes" style="font-size: 0.8rem;">${p.description || 'No description logged.'}</p>
        
        ${formattedParams ? `
          <div class="program-params-preview">
            <div style="font-size: 0.65rem; color: var(--text-darker); text-transform: uppercase; font-weight:700; margin-bottom:4px;">Machine Calibration Parameters</div>
            <pre style="margin:0; font-family:inherit;">${formattedParams}</pre>
          </div>
        ` : ''}

        ${p.notes ? `
          <div style="font-size:0.7rem; color: var(--text-muted); line-height: 1.45; margin-top:8px;">
            <strong>Flashing Notes:</strong> ${p.notes}
          </div>
        ` : ''}

        <div class="manual-card-footer" style="margin-top: auto; padding-top: 14px;">
          ${p.file_path ? `<a href="${p.file_path}" download class="btn btn-primary btn-xs">📥 Download Binary</a>` : '<span class="text-darker" style="font-size:0.75rem;">Offline Config</span>'}
          <button class="btn btn-danger btn-xs" onclick="deleteProgram(${p.id})">Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

function filterPrograms() {
  const query = document.getElementById('programs-search-filter').value.toLowerCase();
  const filtered = state.programs.filter(p => {
    const dev = state.devices.find(d => d.id == p.device_id);
    const model = dev ? dev.model.toLowerCase() : '';
    return p.name.toLowerCase().includes(query) ||
      p.version.toLowerCase().includes(query) ||
      model.includes(query)
  });
  renderPrograms(filtered);
}

// 7. Smart Search Handler
async function executeSmartSearch(query) {
  const overlay = document.getElementById('search-results-overlay');
  const termDisplay = document.getElementById('search-term-display');
  
  termDisplay.textContent = query;
  overlay.style.display = 'block';

  try {
    let res;
    if (state.dbMode === 'server') {
      res = await fetchData(`${API.search}?q=${encodeURIComponent(query)}`);
    } else {
      // Local Smart Search Emulator (LocalStorage arrays filtering)
      const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
      
      const filterArray = (arr, fields) => {
        return arr.filter(item => {
          return terms.every(term => {
            return fields.some(field => {
              const val = item[field];
              return val && String(val).toLowerCase().includes(term);
            });
          });
        });
      };

      const matchedErrors = filterArray(state.errors, ['error_code', 'device_model', 'title', 'description', 'cause', 'solution', 'category']);
      const matchedDevices = filterArray(state.devices, ['name', 'model', 'manufacturer', 'category', 'serial_number', 'description']);
      const matchedManuals = filterArray(state.manuals, ['device_model', 'title', 'type', 'notes']);
      
      const matchedRepairs = state.repairs.filter(r => {
        const dev = state.devices.find(d => d.id == r.device_id);
        const devName = dev ? dev.name : '';
        const devModel = dev ? dev.model : '';
        return terms.every(term => {
          return (r.error_code && r.error_code.toLowerCase().includes(term)) ||
            r.problem.toLowerCase().includes(term) ||
            devName.toLowerCase().includes(term) ||
            devModel.toLowerCase().includes(term);
        });
      });

      res = {
        errors: matchedErrors.slice(0, 10),
        devices: matchedDevices.slice(0, 10),
        manuals: matchedManuals.slice(0, 10),
        repairs: matchedRepairs.slice(0, 10),
        programs: []
      };
    }

    // Update overlay counts
    document.getElementById('count-found-errors').textContent = res.errors.length;
    document.getElementById('count-found-repairs').textContent = res.repairs.length;
    document.getElementById('count-found-devices').textContent = res.devices.length;
    
    const docsCount = res.manuals.length + (res.programs ? res.programs.length : 0);
    document.getElementById('count-found-docs').textContent = docsCount;

    // Render overlay items
    const errorsList = document.getElementById('results-errors-list');
    if (res.errors.length === 0) {
      errorsList.innerHTML = '<div class="text-darker" style="font-size:0.75rem; padding:8px;">No matching errors.</div>';
    } else {
      errorsList.innerHTML = res.errors.map(e => `
        <div class="result-item err-item" onclick="openFoundError(${e.id})">
          <h5>[${e.error_code}] ${e.title}</h5>
          <p>${e.device_model} — ${e.severity}</p>
        </div>
      `).join('');
    }

    const repairsList = document.getElementById('results-repairs-list');
    if (res.repairs.length === 0) {
      repairsList.innerHTML = '<div class="text-darker" style="font-size:0.75rem; padding:8px;">No matching repairs.</div>';
    } else {
      repairsList.innerHTML = res.repairs.map(r => {
        const dev = state.devices.find(d => d.id == r.device_id);
        const devModel = r.device_model || (dev ? dev.model : '');
        return `
          <div class="result-item rep-item" onclick="openFoundRepair(${r.id})">
            <h5>${r.device_manufacturer || ''} ${devModel}</h5>
            <p>${r.problem.substring(0, 50)}...</p>
            <div class="result-meta">Status: ${r.result}</div>
          </div>
        `;
      }).join('');
    }

    const devicesList = document.getElementById('results-devices-list');
    if (res.devices.length === 0) {
      devicesList.innerHTML = '<div class="text-darker" style="font-size:0.75rem; padding:8px;">No matching equipment.</div>';
    } else {
      devicesList.innerHTML = res.devices.map(d => `
        <div class="result-item dev-item" onclick="openFoundDevice(${d.id})">
          <h5>${d.name}</h5>
          <p>${d.manufacturer} | ${d.model}</p>
          <div class="result-meta">S/N: ${d.serial_number || 'N/A'}</div>
        </div>
      `).join('');
    }

    const docsList = document.getElementById('results-docs-list');
    if (docsCount === 0) {
      docsList.innerHTML = '<div class="text-darker" style="font-size:0.75rem; padding:8px;">No matching docs.</div>';
    } else {
      let html = res.manuals.map(m => `
        <div class="result-item doc-item" onclick="openFoundManual()">
          <h5>📘 ${m.title}</h5>
          <p>${m.device_model} — Service Manual</p>
        </div>
      `).join('');
      docsList.innerHTML = html;
    }

  } catch (err) {
    console.error('Smart Search failure:', err);
  }
}

// Search items clicks
function openFoundError(id) {
  document.getElementById('search-results-overlay').style.display = 'none';
  openErrorDetails(id);
}
function openFoundDevice(id) {
  document.getElementById('search-results-overlay').style.display = 'none';
  showDeviceDetails(id);
}
function openFoundRepair(id) {
  document.getElementById('search-results-overlay').style.display = 'none';
  switchTab('repairs');
  setTimeout(() => {
    document.getElementById('repairs-search-filter').value = state.repairs.find(r => r.id === id)?.error_code || '';
    filterRepairs();
  }, 100);
}
function openFoundManual() {
  document.getElementById('search-results-overlay').style.display = 'none';
  switchTab('manuals');
}
function openFoundProgram() {
  document.getElementById('search-results-overlay').style.display = 'none';
  switchTab('programs');
}

function setSearchFilter(category) {
  switchTab('devices');
  const filterInput = document.getElementById('device-search-filter');
  if (filterInput) {
    filterInput.value = category;
    filterDevices();
  }
}

// 8. Popup Modals Utilities
let activeModalId = null;

function showModal(id) {
  activeModalId = id;
  const overlay = document.getElementById('modal-overlay');
  const card = document.getElementById(id);
  if (overlay) overlay.style.display = 'block';
  if (card) card.style.display = 'flex';
  
  if (id === 'modal-settings') {
    const keyInput = document.getElementById('settings-api-key');
    if (keyInput) {
      keyInput.value = localStorage.getItem('biomed_api_key') || '';
    }
  }
}

function hideActiveModal() {
  if (activeModalId) {
    const overlay = document.getElementById('modal-overlay');
    const card = document.getElementById(activeModalId);
    if (overlay) overlay.style.display = 'none';
    if (card) card.style.display = 'none';
    
    const form = document.querySelector(`#${activeModalId} form`);
    if (form) form.reset();
    
    activeModalId = null;
  }
}

// 9. Forms Submissions (AJAX & LocalStorage)

async function handleCategorySubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    if (state.dbMode === 'server') {
      const res = await fetch(API.categories, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error();
    } else {
      // Standalone mode category save
      const cats = JSON.parse(localStorage.getItem('biomed_categories')) || [];
      const newId = cats.length > 0 ? Math.max(...cats.map(c => c.id)) + 1 : 1;
      const newCat = { id: newId, ...data };
      cats.push(newCat);
      localStorage.setItem('biomed_categories', JSON.stringify(cats));
    }

    showToast(state.lang === 'ru' ? 'Категория успешно создана' : 'Toifa muvaffaqiyatli yaratildi', 'success');
    hideActiveModal();
    refreshAllData();
  } catch (err) {
    showToast('Failed to create category.', 'danger');
  }
}

async function handleDeviceSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    if (state.dbMode === 'server') {
      const res = await fetch(API.devices, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error();
    } else {
      const devs = JSON.parse(localStorage.getItem('biomed_devices')) || [];
      const newId = devs.length > 0 ? Math.max(...devs.map(d => d.id)) + 1 : 1;
      const newDevice = { id: newId, ...data };
      devs.push(newDevice);
      localStorage.setItem('biomed_devices', JSON.stringify(devs));
    }
    
    showToast(state.lang === 'ru' ? 'Аппарат успешно добавлен' : 'Apparat muvaffaqiyatli qo\'shildi', 'success');
    hideActiveModal();
    refreshAllData();
  } catch (err) {
    showToast('Failed to add equipment card.', 'danger');
  }
}

async function handleErrorSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    if (state.dbMode === 'server') {
      const res = await fetch(API.errors, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error();
    } else {
      const errs = JSON.parse(localStorage.getItem('biomed_errors')) || [];
      const newId = errs.length > 0 ? Math.max(...errs.map(e => e.id)) + 1 : 1;
      const newErr = { id: newId, ...data };
      errs.push(newErr);
      localStorage.setItem('biomed_errors', JSON.stringify(errs));
    }

    showToast(state.lang === 'ru' ? 'Карта ошибки успешно сохранена' : 'Xatolik varaqasi saqlandi', 'success');
    hideActiveModal();
    refreshAllData();
  } catch (err) {
    showToast('Failed to save error code.', 'danger');
  }
}

async function handleRepairSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  if (data.device_id) data.device_id = parseInt(data.device_id);

  try {
    if (state.dbMode === 'server') {
      const res = await fetch(API.repairs, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error();
    } else {
      const reps = JSON.parse(localStorage.getItem('biomed_repairs')) || [];
      const newId = reps.length > 0 ? Math.max(...reps.map(r => r.id)) + 1 : 1;
      const newRepair = { 
        id: newId, 
        ...data, 
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString()
      };
      reps.push(newRepair);
      localStorage.setItem('biomed_repairs', JSON.stringify(reps));
    }

    showToast(state.lang === 'ru' ? 'Ремонт успешно зарегистрирован' : 'Ta\'mirlash muvaffaqiyatli qayd etildi', 'success');
    hideActiveModal();
    refreshAllData();
  } catch (err) {
    showToast('Failed to log repair details.', 'danger');
  }
}

async function handleManualSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  try {
    if (state.dbMode === 'server') {
      const res = await fetch(API.manuals, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error();
    } else {
      const data = Object.fromEntries(formData.entries());
      const file = data.file;
      let virtualPath = '#';

      if (file && file.name) {
        if (file.size > 1.5 * 1024 * 1024) {
          showToast('File over 1.5MB saved as metadata in standalone mode.', 'warning');
          virtualPath = `[Local File: ${file.name}]`;
        } else {
          virtualPath = await readFileAsBase64(file);
        }
      }

      const manuals = JSON.parse(localStorage.getItem('biomed_manuals')) || [];
      const newId = manuals.length > 0 ? Math.max(...manuals.map(m => m.id)) + 1 : 1;
      const newManual = {
        id: newId,
        device_model: data.device_model,
        title: data.title,
        type: data.type || 'PDF',
        notes: data.notes,
        file_path: virtualPath
      };
      manuals.push(newManual);
      localStorage.setItem('biomed_manuals', JSON.stringify(manuals));
    }

    showToast('Service manual linked successfully.', 'success');
    hideActiveModal();
    refreshAllData();
  } catch (err) {
    showToast('Failed to save manual document.', 'danger');
  }
}

async function handleProgramSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  
  const paramsInput = document.getElementById('form-program-params').value.trim();
  if (paramsInput) {
    try {
      JSON.parse(paramsInput);
    } catch (err) {
      showToast('Calibration parameters must be valid JSON.', 'warning');
      return;
    }
  }

  try {
    if (state.dbMode === 'server') {
      const res = await fetch(API.programs, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error();
    } else {
      const data = Object.fromEntries(formData.entries());
      const file = data.file;
      let virtualPath = '';

      if (file && file.name) {
        if (file.size > 1.5 * 1024 * 1024) {
          virtualPath = `[Binary: ${file.name}]`;
        } else {
          virtualPath = await readFileAsBase64(file);
        }
      }

      const programs = JSON.parse(localStorage.getItem('biomed_programs')) || [];
      const newId = programs.length > 0 ? Math.max(...programs.map(p => p.id)) + 1 : 1;
      const newProg = {
        id: newId,
        device_id: parseInt(data.device_id),
        name: data.name,
        version: data.version,
        description: data.description,
        file_path: virtualPath,
        parameters: data.parameters,
        notes: data.notes
      };
      programs.push(newProg);
      localStorage.setItem('biomed_programs', JSON.stringify(programs));
    }

    showToast('Program configuration saved.', 'success');
    hideActiveModal();
    refreshAllData();
  } catch (err) {
    showToast('Failed to store firmware profile.', 'danger');
  }
}

// 10. Deletions APIs

async function deleteDevice(id) {
  if (!confirm('Are you sure you want to decommission and delete this equipment?')) return;
  try {
    if (state.dbMode === 'server') {
      const res = await fetch(`${API.devices}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
    } else {
      const devs = JSON.parse(localStorage.getItem('biomed_devices')) || [];
      localStorage.setItem('biomed_devices', JSON.stringify(devs.filter(d => d.id != id)));
      
      const reps = JSON.parse(localStorage.getItem('biomed_repairs')) || [];
      localStorage.setItem('biomed_repairs', JSON.stringify(reps.filter(r => r.device_id != id)));
      
      const progs = JSON.parse(localStorage.getItem('biomed_programs')) || [];
      localStorage.setItem('biomed_programs', JSON.stringify(progs.filter(p => p.device_id != id)));
    }
    
    showToast('Equipment removed from inventory.', 'success');
    closeDeviceDetails();
    refreshAllData();
  } catch (err) {
    showToast('Failed to decommission device.', 'danger');
  }
}

async function deleteErrorEntry(id) {
  if (!confirm('Erase this error code reference sheet?')) return;
  try {
    if (state.dbMode === 'server') {
      const res = await fetch(`${API.errors}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
    } else {
      const errs = JSON.parse(localStorage.getItem('biomed_errors')) || [];
      localStorage.setItem('biomed_errors', JSON.stringify(errs.filter(e => e.id != id)));
    }
    
    showToast('Error code reference card deleted.', 'success');
    refreshAllData();
  } catch (err) {
    showToast('Failed to delete error card.', 'danger');
  }
}

async function deleteManual(id) {
  if (!confirm('Permanently delete this manual file?')) return;
  try {
    if (state.dbMode === 'server') {
      const res = await fetch(`${API.manuals}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
    } else {
      const manuals = JSON.parse(localStorage.getItem('biomed_manuals')) || [];
      localStorage.setItem('biomed_manuals', JSON.stringify(manuals.filter(m => m.id != id)));
    }
    
    showToast('Manual document deleted.', 'success');
    refreshAllData();
  } catch (err) {
    showToast('Failed to remove document.', 'danger');
  }
}

async function deleteRepairLog(id) {
  if (!confirm('Erase this service history record?')) return;
  try {
    if (state.dbMode === 'server') {
      const res = await fetch(`${API.repairs}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
    } else {
      const reps = JSON.parse(localStorage.getItem('biomed_repairs')) || [];
      localStorage.setItem('biomed_repairs', JSON.stringify(reps.filter(r => r.id != id)));
    }
    
    showToast('Repair record deleted.', 'success');
    refreshAllData();
  } catch (err) {
    showToast('Failed to delete repair log.', 'danger');
  }
}

async function deleteProgram(id) {
  if (!confirm('Delete this configuration profile?')) return;
  try {
    if (state.dbMode === 'server') {
      const res = await fetch(`${API.programs}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
    } else {
      const progs = JSON.parse(localStorage.getItem('biomed_programs')) || [];
      localStorage.setItem('biomed_programs', JSON.stringify(progs.filter(p => p.id != id)));
    }
    
    showToast('Configuration profile deleted.', 'success');
    refreshAllData();
  } catch (err) {
    showToast('Failed to remove configuration.', 'danger');
  }
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

// 11. AI Service Assistant Chat (Direct Browser Gemini / Server Proxy)
async function triggerChatSend() {
  const textarea = document.getElementById('ai-chat-textarea');
  const text = textarea.value.trim();
  if (!text) return;

  textarea.value = '';
  await sendChatMessage(text);
}

async function sendChatMessage(userText) {
  const chatMessages = document.getElementById('chat-messages-panel');
  const contextToggle = document.getElementById('ai-context-toggle').checked;
  const statusBadge = document.getElementById('crawler-status-badge');
  const inspectorPanel = document.getElementById('inspector-content-panel');

  const dict = i18n[state.lang];

  // Append user message bubble
  chatMessages.innerHTML += `
    <div class="message user-msg">
      <div class="message-sender">🔧 ENGINEER</div>
      <div class="message-content"><p>${escapeHtml(userText)}</p></div>
    </div>
  `;
  scrollChatToBottom();

  // Append AI thinking bubble
  const thinkingId = 'ai-thinking-' + Date.now();
  const analyzingLabel = state.lang === 'ru' ? 'Анализирую симптомы и выполняю поиск по локальной базе...' : state.lang === 'uz' ? 'Muammoni tahlil qilib, lokal bazani qidiryapman...' : 'Analyzing symptoms and crawling local database...';
  chatMessages.innerHTML += `
    <div class="message system-msg" id="${thinkingId}">
      <div class="message-sender">${dict.ai_welcome_header}</div>
      <div class="message-content"><p><em>${analyzingLabel}</em></p></div>
    </div>
  `;
  scrollChatToBottom();

  // Crawl database context
  let harvestedContext = '';
  let dbHits = { errors: [], repairs: [], manuals: [], devices: [] };

  if (contextToggle) {
    statusBadge.textContent = state.lang === 'ru' ? 'Поиск...' : 'Qidiruv...';
    statusBadge.classList.add('crawling');
    inspectorPanel.innerHTML = `<div style="font-size: 0.8rem; color: var(--text-cyan); font-family: var(--font-mono);">[SQL CRAWLER]: Analyzing prompt words, querying tables, fetching indices...</div>`;

    const keywords = userText.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g," ")
      .split(/\s+/)
      .filter(w => w.length > 2 && !['and', 'the', 'for', 'with', 'not', 'this', 'how', 'what', 'why', 'are', 'was', 'were'].includes(w));
    
    if (keywords.length > 0) {
      const matchKeywords = (item, fields) => {
        return keywords.some(kw => fields.some(f => item[f] && String(item[f]).toLowerCase().includes(kw)));
      };

      dbHits.errors = state.errors.filter(e => matchKeywords(e, ['error_code', 'device_model', 'title', 'description', 'cause', 'solution'])).slice(0, 3);
      dbHits.repairs = state.repairs.filter(r => matchKeywords(r, ['error_code', 'problem', 'cause', 'solution'])).slice(0, 2);
      dbHits.manuals = state.manuals.filter(m => matchKeywords(m, ['device_model', 'title', 'notes'])).slice(0, 2);

      const contextParts = [];
      if (dbHits.errors.length > 0) {
        contextParts.push("=== RELEVANT DATABASE ERROR REFERENCE ===");
        dbHits.errors.forEach(e => {
          contextParts.push(`Device Model: ${e.device_model}\nError Code: ${e.error_code}\nTitle: ${e.title}\nDescription: ${e.description}\nKnown Cause: ${e.cause}\nKnown Solution: ${e.solution}\n---`);
        });
      }
      if (dbHits.repairs.length > 0) {
        contextParts.push("=== RELEVANT PAST REPAIR RECORDS ===");
        dbHits.repairs.forEach(r => {
          const dev = state.devices.find(d => d.id == r.device_id);
          const devName = dev ? dev.name : 'Device';
          contextParts.push(`Device: ${devName} (${r.device_model || 'N/A'})\nError Code: ${r.error_code || 'N/A'}\nProblem: ${r.problem}\nRoot Cause: ${r.cause || 'Unknown'}\nApplied Solution: ${r.solution}\nResult: ${r.result}\n---`);
        });
      }
      if (dbHits.manuals.length > 0) {
        contextParts.push("=== RELEVANT TECHNICAL DOCUMENTATION ===");
        dbHits.manuals.forEach(m => {
          contextParts.push(`Device Model: ${m.device_model}\nManual Title: ${m.title}\nType: ${m.type}\nNotes: ${m.notes || ''}\n---`);
        });
      }

      harvestedContext = contextParts.join('\n');
    }
  } else {
    statusBadge.textContent = 'Disabled';
    statusBadge.classList.remove('crawling');
    inspectorPanel.innerHTML = '<div class="empty-inspector-state"><p>Database context is disabled. AI will rely on general knowledge.</p></div>';
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

Below is the context from our private offline technical database, which contains exact reference documents, manuals, and past service logs matching the user's issue. Use this context as your primary source of truth, and match its terms when possible:

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
- Respond in the same language as the user's message (Russian, Uzbek, or English).
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

  try {
    let aiResponseText = '';
    let isDemoMode = false;

    if (state.dbMode === 'server') {
      const response = await fetch(API.aiChat, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, contextEnabled: contextToggle })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Chat API Error');
      aiResponseText = data.text;
      isDemoMode = data.demoMode;
    } else {
      const browserApiKey = localStorage.getItem('biomed_api_key') || '';
      
      if (!browserApiKey) {
        isDemoMode = true;
        const isRussian = state.lang === 'ru';
        const isUzbek = state.lang === 'uz';
        
        if (isRussian) {
          aiResponseText = `### ⚠️ API Ключ Не Настроен (Локальная база работает)

Поскольку приложение запущено в автономном режиме без Node.js сервера, для работы ИИ требуется указать ваш **Gemini API Key** в **Системных Настройках** (иконка шестеренки вверху справа).

Тем не менее, поисковой робот успешно извлек локальные записи для контекста:
\`\`\`text
${harvestedContext || 'Записи по этому запросу в локальной базе не найдены.'}
\`\`\``;
        } else if (isUzbek) {
          aiResponseText = `### ⚠️ API kalit sozlanmagan (Lokal baza faol)

Ilova brauzerda avtonom rejimda ishlayotgani sababli, AI muhandis bilan bog'lanish uchun **Tizim Sozlamalari** (o'ng yuqoridagi tishli g'ildirak shaklidagi tugma) orqali o'zingizning **Gemini API Key** kalitingizni kiritishingiz lozim.

Shunga qaramay, qidiruv tizimi lokal bazadan quyidagi hujjatlarni muvaffaqiyatli yukladi:
\`\`\`text
${harvestedContext || "Ushbu so'rov bo'yicha lokal bazadan hujjatlar topilmadi."}
\`\`\``;
        } else {
          aiResponseText = `### ⚠️ Gemini API Key Not Configured

Since the app is running in Standalone Browser mode, you must enter your **Gemini API Key** in **System Settings** (gear icon in header) to query the AI.

However, the local database crawler successfully harvested context:
\`\`\`text
${harvestedContext || 'No matching local documents found.'}
\`\`\``;
        }
      } else {
        // Direct Browser Call to Google Gemini API via CORS
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${browserApiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt + `\n\nUser Question/Issue: ${userText}` }] }],
            generationConfig: { temperature: 0.2 }
          })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || 'Gemini API call failed.');
        aiResponseText = data.candidates[0].content.parts[0].text;
      }
    }

    // Remove thinking message bubble
    const thinkingEl = document.getElementById(thinkingId);
    if (thinkingEl) thinkingEl.remove();

    // Append AI response
    const formattedText = parseMarkdown(aiResponseText);
    chatMessages.innerHTML += `
      <div class="message system-msg">
        <div class="message-sender">${dict.ai_welcome_header}</div>
        <div class="message-content">${formattedText}</div>
      </div>
    `;
    scrollChatToBottom();

    // Render local crawl details
    if (contextToggle) {
      statusBadge.textContent = isDemoMode ? 'Demo Context' : 'Crawled';
      statusBadge.classList.remove('crawling');

      const totalHits = dbHits.errors.length + dbHits.repairs.length + dbHits.manuals.length;
      if (totalHits === 0) {
        inspectorPanel.innerHTML = `<div class="empty-inspector-state"><p>No matching database files found. AI responded using general expertise.</p></div>`;
      } else {
        let cardsHtml = `<div style="font-size: 0.65rem; color: var(--text-darker); text-transform: uppercase; font-weight:700; margin-bottom:12px; font-family:var(--font-mono);">[SQLite Index Hits: ${totalHits} documents]</div>`;
        
        dbHits.errors.forEach(e => {
          cardsHtml += `
            <div class="inspector-card">
              <h5>⚠️ Error Reference</h5>
              <div class="item-title">[${e.error_code}] — ${e.title}</div>
              <div class="item-body"><strong>Device:</strong> ${e.device_model}\n<strong>Solution:</strong> ${e.solution.substring(0, 100)}...</div>
            </div>
          `;
        });
        dbHits.repairs.forEach(r => {
          const dev = state.devices.find(d => d.id == r.device_id);
          cardsHtml += `
            <div class="inspector-card">
              <h5>🛠 Service History</h5>
              <div class="item-title">${dev ? dev.name : 'Device'} (${r.device_model || 'N/A'})</div>
              <div class="item-body"><strong>Problem:</strong> ${r.problem}\n<strong>Action:</strong> ${r.solution}</div>
            </div>
          `;
        });
        dbHits.manuals.forEach(m => {
          cardsHtml += `
            <div class="inspector-card">
              <h5>📘 Manual File</h5>
              <div class="item-title">${m.title}</div>
              <div class="item-body"><strong>Target:</strong> ${m.device_model}</div>
            </div>
          `;
        });

        inspectorPanel.innerHTML = cardsHtml;
      }
    }

  } catch (err) {
    const thinkingEl = document.getElementById(thinkingId);
    if (thinkingEl) thinkingEl.remove();

    statusBadge.textContent = 'Error';
    statusBadge.classList.remove('crawling');
    inspectorPanel.innerHTML = `<div class="text-danger" style="font-size:0.75rem;">Crawler query failed.</div>`;

    chatMessages.innerHTML += `
      <div class="message system-msg" style="border-left-color: var(--status-danger);">
        <div class="message-sender">🤖 SYSTEM FAILURE</div>
        <div class="message-content">
          <p class="text-danger">Failed to retrieve response from AI co-engineer.</p>
          <p style="font-size:0.8rem; opacity:0.8;">Details: ${err.message}</p>
        </div>
      </div>
    `;
    scrollChatToBottom();
  }
}

function scrollChatToBottom() {
  const panel = document.getElementById('chat-messages-panel');
  if (panel) panel.scrollTop = panel.scrollHeight;
}

// 12. Settings Panel Actions

function saveSystemSettings() {
  const keyInput = document.getElementById('settings-api-key').value.trim();
  localStorage.setItem('biomed_api_key', keyInput);
  
  // Re-run connection check to pick up browser direct key
  updateConnectionStatusBadge();
  
  showToast(state.lang === 'ru' ? 'Настройки успешно сохранены' : "Sozlamalar saqlandi", 'success');
  hideActiveModal();
}

function exportBrowserDatabase() {
  const data = {
    categories: JSON.parse(localStorage.getItem('biomed_categories')) || [],
    devices: JSON.parse(localStorage.getItem('biomed_devices')) || [],
    errors: JSON.parse(localStorage.getItem('biomed_errors')) || [],
    manuals: JSON.parse(localStorage.getItem('biomed_manuals')) || [],
    repairs: JSON.parse(localStorage.getItem('biomed_repairs')) || [],
    programs: JSON.parse(localStorage.getItem('biomed_programs')) || []
  };

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `biomed_database_backup_${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('Database JSON backup exported.', 'success');
}

function triggerDatabaseImport() {
  document.getElementById('import-db-file-input').click();
}

function importBrowserDatabase(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      
      if (!data.categories || !data.devices || !data.errors || !data.manuals || !data.repairs || !data.programs) {
        throw new Error('Schema mismatch');
      }

      localStorage.setItem('biomed_categories', JSON.stringify(data.categories));
      localStorage.setItem('biomed_devices', JSON.stringify(data.devices));
      localStorage.setItem('biomed_errors', JSON.stringify(data.errors));
      localStorage.setItem('biomed_manuals', JSON.stringify(data.manuals));
      localStorage.setItem('biomed_repairs', JSON.stringify(data.repairs));
      localStorage.setItem('biomed_programs', JSON.stringify(data.programs));

      showToast('Database restored successfully from archive.', 'success');
      hideActiveModal();
      refreshAllData();
    } catch (err) {
      showToast('Database restore failed. Invalid file format.', 'danger');
    }
  };
  reader.readAsText(file);
}

function resetDatabaseToSeed() {
  if (!confirm('🚨 WARNING: This will overwrite your entire browser database and reset it to factory seed cards. Proceed?')) return;
  seedBrowserDatabase();
  showToast('Database reset to factory seeds.', 'success');
  hideActiveModal();
  refreshAllData();
}

// 13. Browser Sandbox Database Seeds
function seedBrowserDatabase() {
  const categories = [
    { id: 1, name: 'Infusion Pump', icon: '🧬', description: 'Volumat, syringe pumps, dosing configurations' },
    { id: 2, name: 'Ultrasound', icon: '📡', description: 'GE Voluson, probes, acoustic boards, imaging' },
    { id: 3, name: 'Laboratory Analyzer', icon: '🔬', description: 'Mindray analyzers, fluidics, photometers' },
    { id: 4, name: 'X-Ray', icon: '⚡', description: 'High voltage tubes, digital detectors, cooling' }
  ];
  const devices = [
    { id: 1, name: 'Volumat MC Agilia', model: 'Volumat MC', manufacturer: 'Fresenius Kabi', category: 'Infusion Pump', serial_number: 'VOL-720394', description: 'Volumetric infusion pump for administrative delivery of fluids and medications.' },
    { id: 2, name: 'Voluson E8', model: 'Voluson E8', manufacturer: 'GE Healthcare', category: 'Ultrasound', serial_number: 'VOL-E8-84729', description: 'Premium high-end diagnostic ultrasound system for OB/GYN and cardiovascular applications.' },
    { id: 3, name: 'BS-200 Chemistry Analyzer', model: 'BS-200', manufacturer: 'Mindray', category: 'Laboratory Analyzer', serial_number: 'BS2-094821', description: 'Bench-top, discrete and random access clinical chemistry analyzer with 200 tests per hour.' },
    { id: 4, name: 'DuraDiagnostic X-Ray', model: 'DuraDiagnostic', manufacturer: 'Philips', category: 'X-Ray', serial_number: 'PH-DURA-3382', description: 'Digital radiography X-ray system for high-throughput general examinations.' }
  ];
  const errors = [
    { id: 1, device_model: 'Volumat MC', error_code: 'Err 102', title: 'Air in Line Sensor Calibration Error', description: 'The air-in-line ultrasonic sensor reports values outside the acceptable calibration range during self-test.', cause: 'Dust, dried medication residues on the sensor face, or piezo-electric element degradation.', solution: '1. Clean the tubing slot with an isopropyl alcohol swab.\n2. Run sensor calibration protocol in Service Mode.\n3. If calibration fails, replace the air-in-line sensor assembly.', severity: 'high', category: 'Sensors' },
    { id: 2, device_model: 'Volumat MC', error_code: 'Err 304', title: 'Door Mechanism Jammed', description: 'The safety door lock mechanism failed to engage or disengage within the timeout period.', cause: 'Mechanical obstruction, worn plastic latch gears, or faulty microswitch detector.', solution: '1. Check for tubing or foreign object obstructions.\n2. Inspect locking latch gear teeth for wear.\n3. Verify microswitch continuity using a multimeter when closed.\n4. Lubricate mechanical tracks with high-viscosity silicone grease.', severity: 'high', category: 'Mechanical' },
    { id: 3, device_model: 'Voluson E8', error_code: 'E12', title: 'No Probe Detected', description: 'The ultrasound system fails to identify any connected active probe in probe port 1 or 2.', cause: 'Dirty connector pins on the probe, damaged connector locking mechanism, or failure of the probe select board.', solution: '1. Turn off the system, disconnect the probe and clean probe connector gold pins with contact cleaner.\n2. Inspect pins for bending or physical damage.\n3. Connect probe to a different port to isolate the port vs probe issue.\n4. If probe works in port 2, replace the probe select board for port 1.', severity: 'medium', category: 'Hardware' },
    { id: 4, device_model: 'BS-200', error_code: 'E12', title: 'Lamp Energy Low', description: 'The photometric optical unit reports absorbance energy levels below the minimum threshold at 340nm.', cause: 'Halogen lamp aging (surpassed 2000 operational hours), dirty optical windows, or faulty power supply to the lamp assembly.', solution: '1. Check lamp operational hours in service utility.\n2. Replace halogen lamp (12V/20W) if hours exceed 1500.\n3. Wipe cuvette optical windows and fiber optic head with lint-free cloth.\n4. Re-calibrate optical offset in service software.', severity: 'medium', category: 'Optics' },
    { id: 5, device_model: 'DuraDiagnostic', error_code: 'Err 20', title: 'X-Ray Tube Overheat Warning', description: 'Thermal sensor in the oil-filled tube housing indicates temperature has exceeded 75 degrees Celsius.', cause: 'Continuous high-dose exposures without adequate cooling intervals, failure of the housing cooling fan, or oil leaks causing low thermal capacity.', solution: '1. Suspend exposures immediately and allow tube to cool for 20 minutes.\n2. Verify that the external cooling fans are running during idle.\n3. Inspect the tube housing housing for signs of yellow oil leakage.\n4. Check thermal switch resistance (should be close to 0 ohms when cool).', severity: 'critical', category: 'Thermal' }
  ];
  const manuals = [
    { id: 1, device_model: 'Volumat MC', title: 'Volumat Agilia Service & Repair Manual v3.2', file_path: '#', type: 'PDF', notes: 'Includes complete circuit schematics, calibration procedures, and full error code list.' },
    { id: 2, device_model: 'BS-200', title: 'Mindray BS-200 Service Manual and Fluidic Diagram', file_path: '#', type: 'PDF', notes: 'Contains details on the syringe pump assembly, sample probe washing, and optical alignment.' }
  ];
  const repairs = [
    { id: 1, device_id: 1, error_code: 'Err 102', problem: 'Pump alarms immediately with Err 102 on startup.', cause: 'Sensor face was coated with dried saline solution residue.', solution: 'Cleaned sensor face thoroughly with isopropyl alcohol. Ran calibration in Service Mode. Test run of 500ml saline passed successfully.', date: new Date().toISOString(), result: 'solved' },
    { id: 2, device_id: 3, error_code: 'E12', problem: 'Chemistry analyzer reports low light energy, calibration failing at 340nm.', cause: 'Halogen light source aged. Total operating time recorded as 2420 hours.', solution: 'Installed new halogen bulb. Cleaned collimating lenses. Ran absorbance gain calibration in service program. Successful calibration.', date: new Date().toISOString(), result: 'solved' }
  ];
  const programs = [
    { id: 1, device_id: 1, name: 'Agilia Main Firmware Binary', version: 'v3.5.2', description: 'Main micro-controller firmware for Agilia series pumps. Addresses battery discharge warning threshold issues.', file_path: '', parameters: '{"baud_rate": 19200, "calibration_offset_air": 240, "battery_cutoff_v": 6.8}', notes: 'Must use the Agilia Service Tool v2.0 software via RS232-to-USB cable to upload.' },
    { id: 2, device_id: 3, name: 'BS-200 Calibration Parameters Profile', version: '2026_Q2_Ref', description: 'Standard optical and syringe step motor calibration offsets config.', file_path: '', parameters: '{"pump_w_steps": 12800, "syringe_stroke_ul": 100, "lamp_gain_340nm": 1.25}', notes: 'Restored after syringe assembly replacement.' }
  ];

  localStorage.setItem('biomed_categories', JSON.stringify(categories));
  localStorage.setItem('biomed_devices', JSON.stringify(devices));
  localStorage.setItem('biomed_errors', JSON.stringify(errors));
  localStorage.setItem('biomed_manuals', JSON.stringify(manuals));
  localStorage.setItem('biomed_repairs', JSON.stringify(repairs));
  localStorage.setItem('biomed_programs', JSON.stringify(programs));
}

// 14. Helper Utilities

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = '🔬';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';
  if (type === 'danger') icon = '❌';

  toast.innerHTML = `<span>${icon}</span><div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.4s forwards';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

function escapeHtml(text) {
  if (!text) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function parseMarkdown(md) {
  if (!md) return '';
  let html = md;
  
  html = html.replace(/```(\w*)\n([\s\S]*?)```/gm, (match, lang, code) => {
    return `<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>`;
  });
  
  html = html.replace(/`([^`]+)`/g, (match, code) => {
    return `<code>${escapeHtml(code)}</code>`;
  });

  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  const lines = html.split('\n');
  const formattedLines = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('<h') || trimmed.startsWith('<u') || trimmed.startsWith('<o') || trimmed.startsWith('<l') || trimmed.startsWith('<p') || trimmed.startsWith('<c') || trimmed.startsWith('<d')) {
      return line;
    }
    if (trimmed === '') return '';
    return `<p>${line}</p>`;
  });
  
  return formattedLines.join('\n');
}
