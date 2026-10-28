# Menú en pantalla

## Encender
- **Mac:** doble clic en `iniciar.command`
- **Windows:** doble clic en `iniciar.bat`

Se abre el menú en pantalla completa en Chrome. Para salir: `Cmd+Q` (Mac) o `Alt+F4` (Windows).

Si el puerto 8090 está ocupado por un menú abierto antes, se cierra solo y arranca el nuevo. Si lo usa otro programa, te pregunta si cerrarlo; si dices que no, usa el siguiente puerto libre (8091, 8092…).

Si la computadora no tiene Node.js, el lanzador avisa y abre el menú en **modo USB**.

## Modo USB (sin instalar nada)
1. En tu computadora abre `config.html`, haz tus cambios y presiona **Guardar y descargar**.
2. Copia el `config.js` descargado a esta carpeta (en la USB), reemplazando el anterior.
3. En la pantalla abre `index.html` con el navegador (Chrome o Edge).

Las fotos que subes en modo USB quedan dentro de `config.js`, así que funcionan sin internet.

## Configurar
Abre **http://localhost:8090/config** en la misma computadora.
Desde el celular, usa la dirección que aparece en *Ajustes → Acceso y respaldo*
(ej. `http://10.10.17.114:8090/config`). El celular debe estar en el mismo Wi-Fi.

Al presionar **Guardar y publicar**, todas las pantallas se actualizan al instante.

## En la pantalla
Mueve el mouse para ver los controles: anterior / pausa / siguiente / Ajustes / Pantalla completa.

| Tecla | Acción |
|---|---|
| `F` o doble clic | Pantalla completa |
| `←` `→` | Cambiar página |
| `Espacio` | Pausar |
| `C` | Abrir ajustes |
| `R` | Recargar |

## Archivos
- `data/config.json`: tu menú guardado (respáldalo)
- `uploads/`: fotos subidas desde el panel
- `config.js`: menú de ejemplo inicial
- Node.js (https://nodejs.org) es opcional: solo hace falta para editar desde el celular y ver los cambios en vivo.
