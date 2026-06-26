@echo off
echo ===================================================
echo 🚀 INITIALIZING AND PUSHING MEDTECH TO GITHUB
echo ===================================================
echo.
git init
git add .
git commit -m "Initial commit: Biomedical Engineering SPA with Capacitor & GitHub Actions"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/Mustafo-programmer/med.git
echo.
echo ---------------------------------------------------
echo 🔒 Pushing to GitHub (If prompted, please log in)
echo ---------------------------------------------------
git push -u origin main
echo.
echo ===================================================
echo ✅ Done! Check the Actions tab in your repository!
echo ===================================================
pause
