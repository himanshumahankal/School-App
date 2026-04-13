@echo off
color 0C
echo ====================================
echo   School App - Stop Servers
echo ====================================
echo.
taskkill /f /im php.exe 2>nul
taskkill /f /im node.exe 2>nul
echo Servers stopped!
pause
