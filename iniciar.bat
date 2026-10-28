@echo off
REM Doble clic para encender el menu: inicia el servidor y abre la pantalla completa en Chrome o Edge.
cd /d "%~dp0"
where node >nul 2>nul || (echo. & echo   Falta Node.js. Descargalo gratis de https://nodejs.org & pause & exit /b 1)
start "Menu en pantalla - servidor" /min node server.js
timeout /t 2 >nul
set URL=http://localhost:8090/
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --kiosk --app=%URL% --user-data-dir="%LOCALAPPDATA%\MenuPantalla" --noerrdialogs --no-first-run
) else (
  start "" msedge --kiosk %URL% --edge-kiosk-type=fullscreen --no-first-run
)
echo.
echo   Ajustes: http://localhost:8090/config
echo   Deja abierta la ventana "Menu en pantalla - servidor".
