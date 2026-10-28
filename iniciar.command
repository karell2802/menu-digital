#!/bin/zsh
# Doble clic para encender el menú.
#  · Con Node.js: inicia el servidor (edición desde el celular y cambios en vivo).
#  · Sin Node.js: avisa y abre el menú en "modo USB", que no necesita instalar nada.
cd "$(dirname "$0")"
CARPETA="$PWD"

# Busca Node: el del sistema, nvm, Homebrew o una copia portátil en la carpeta node/
NODE=""
for n in "$(command -v node 2>/dev/null)" "$HOME/.nvm/versions/node/"*/bin/node(N[-1]) /opt/homebrew/bin/node /usr/local/bin/node "$CARPETA/node/bin/node"; do
  [ -n "$n" ] && [ -x "$n" ] && NODE="$n" && break
done

abrir() {
  if [ -d "/Applications/Google Chrome.app" ]; then
    open -na "Google Chrome" --args --kiosk --app="$1" \
      --user-data-dir="$HOME/Library/Application Support/MenuPantalla" \
      --noerrdialogs --disable-session-crashed-bubble --disable-infobars --no-first-run
  else
    open "$1"
  fi
}

if [ -z "$NODE" ]; then
  osascript -e 'display dialog "No encontré Node.js en esta computadora.\n\nEl menú se abrirá en MODO USB: funciona igual en la pantalla, pero para cambiar algo editas en config.html, guardas y copias el config.js descargado a esta carpeta.\n\nSi quieres editar desde el celular y que la TV cambie sola, instala Node.js gratis desde nodejs.org." buttons {"Descargar Node.js", "Abrir en modo USB"} default button "Abrir en modo USB" with title "Menú en pantalla" with icon caution' -e 'button returned of result' 2>/dev/null | grep -q "Descargar" && open "https://nodejs.org/es/download"
  abrir "file://$CARPETA/index.html"
  exit 0
fi

# El servidor se encarga del puerto: si hay un menú viejo lo cierra, si es otro programa pregunta,
# y si no, usa el siguiente libre. Después abre la pantalla en Chrome.
exec "$NODE" server.js --abrir
