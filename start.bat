@echo off
title Event FZN - Fullstack Server
color 0A

echo.
echo  ██████╗  █████╗ ██████╗  █████╗ ██████╗ 
echo  ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗
echo  ██████╔╝███████║██████╔╝███████║██║  ██║
echo  ██╔══██╗██╔══██║██╔══██╗██╔══██║██║  ██║
echo  ██████╔╝██║  ██║██║  ██║██║  ██║██████╔╝
echo  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 
echo.
echo  ███████╗██╗   ██╗███████╗███████╗██████╗ 
echo  ██╔════╝██║   ██║██╔════╝██╔════╝██╔══██╗
echo  ███████╗██║   ██║█████╗  █████╗  ██████╔╝
echo  ╚════██║██║   ██║██╔══╝  ██╔══╝  ██╔══██╗
echo  ███████║╚██████╔╝███████╗███████╗██║  ██║
echo  ╚══════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝
echo.
echo  ============================================
echo  Premium Event Registration Platform
echo  Location: Surabaya
echo  ============================================
echo.

cd /d "%~dp0backend"

echo [INFO] Installing dependencies...
if not exist "node_modules" (
    call npm install
)

echo.
echo [INFO] Starting Event FZN Server...
echo [INFO] Please wait...
echo.

start "" cmd /k "node server.js"

timeout /t 3 /nobreak >nul

echo.
echo  ╔═══════════════════════════════════════════╗
echo  ║           SERVER STARTED!                  ║
echo  ╠═══════════════════════════════════════════╣
echo  ║                                           ║
echo  ║  🌐 Website:  http://localhost:3000        ║
echo  ║  📡 API:     http://localhost:3000/api    ║
echo  ║                                           ║
echo  ║  Press Ctrl+C to stop the server          ║
echo  ║                                           ║
echo  ╚═══════════════════════════════════════════╝
echo.

powershell -Command "Start-Process 'http://localhost:3000'"

pause
