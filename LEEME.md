# Menú en pantalla

## Encender
- **Mac:** doble clic en `iniciar.command`
- **Windows:** doble clic en `iniciar.bat`

Se abre el menú en pantalla completa en Chrome. Para salir: `Cmd+Q` (Mac) o `Alt+F4` (Windows).

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
- Requiere **Node.js** (https://nodejs.org), sin instalar nada más.
