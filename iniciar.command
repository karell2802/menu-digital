#!/bin/zsh
# Doble clic para encender el menú: inicia el servidor y abre la pantalla completa en Chrome.
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  [ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh"
  export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
fi
if ! command -v node >/dev/null 2>&1; then
  echo "\n  ⚠️  Falta Node.js. Descárgalo gratis de https://nodejs.org e intenta de nuevo.\n"
  read -k1 "?Presiona una tecla para cerrar…"; exit 1
fi

PUERTO=${PUERTO:-8090}
if ! lsof -i :$PUERTO >/dev/null 2>&1; then
  node server.js &
  SERVIDOR=$!
  trap "kill $SERVIDOR 2>/dev/null" EXIT
  sleep 1
fi

# Chrome en modo quiosco (pantalla completa, sin barras). Para salir: Cmd+Q
if [ -d "/Applications/Google Chrome.app" ]; then
  open -na "Google Chrome" --args --kiosk --app="http://localhost:$PUERTO/" \
    --user-data-dir="$HOME/Library/Application Support/MenuPantalla" \
    --noerrdialogs --disable-session-crashed-bubble --disable-infobars --no-first-run
else
  open "http://localhost:$PUERTO/"
fi

echo "  Ajustes:  http://localhost:$PUERTO/config"
wait
