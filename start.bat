@echo off
title School App - Development Server
color 0A
echo ====================================
echo   School App - Starting Servers
echo ====================================
echo.
echo Starting Laravel API on port 8000...
echo Starting Vite on port 5173...
echo.
echo Press Ctrl+C to stop both servers
echo ====================================
echo.

start cmd /k "php artisan serve --host=127.0.0.1 --port=8000"
timeout /t 2 /nobreak >nul
start cmd /k "npm run dev"

echo Servers are starting...
echo.
echo Access your app at: http://127.0.0.1:8000
pause
