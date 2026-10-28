@echo off
chcp 65001 >nul
REM Doble clic para encender el menu.
REM  - Con Node.js: inicia el servidor (edicion desde el celular y cambios en vivo).
REM  - Sin Node.js: avisa y abre el menu en "modo USB", que no necesita instalar nada.
cd /d "%~dp0"
set "CARPETA=%~dp0"
set "NODE="
where node >nul 2>nul && set "NODE=node"
if not defined NODE if exist "%CARPETA%node\node.exe" set "NODE=%CARPETA%node\node.exe"

set "CHROME="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined CHROME if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined CHROME if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"

if not defined NODE (
  powershell -NoProfile -Command "Add-Type -AssemblyName PresentationFramework; $r=[System.Windows.MessageBox]::Show('No encontre Node.js en esta computadora.' + [char]10 + [char]10 + 'El menu se abrira en MODO USB: funciona igual en la pantalla, pero para cambiar algo editas en config.html, guardas y copias el config.js descargado a esta carpeta.' + [char]10 + [char]10 + 'Quieres descargar Node.js (gratis) para editar desde el celular?','Menu en pantalla','YesNo','Warning'); if($r -eq 'Yes'){Start-Process 'https://nodejs.org/es/download'}"
  set "URL=file:///%CARPETA:\=/%index.html"
  goto abrir
)

title Menu en pantalla - servidor
REM El servidor se encarga del puerto: si hay un menu viejo lo cierra, si es otro programa pregunta,
REM y si no, usa el siguiente libre. Despues abre la pantalla en Chrome o Edge.
echo   Deja abierta esta ventana. Para detener: Ctrl+C
"%NODE%" server.js --abrir
exit /b

:abrir
if defined CHROME (
  start "" "%CHROME%" --kiosk --app="%URL%" --user-data-dir="%LocalAppData%\MenuPantalla" --noerrdialogs --no-first-run
) else (
  start "" msedge --kiosk "%URL%" --edge-kiosk-type=fullscreen --no-first-run
)
