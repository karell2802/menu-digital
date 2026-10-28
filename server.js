/* ==========================================================================
   Servidor del Menú en Pantalla — sin dependencias (solo Node.js)
   Inicia con:  node server.js        (o doble clic en iniciar.command)
   Pantalla:    http://localhost:8090/
   Ajustes:     http://localhost:8090/config   (también desde el celular)
   ========================================================================== */

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const vm = require("vm");

const PUERTO = Number(process.env.PUERTO) || 8090;
const RAIZ = __dirname;
const DATOS = path.join(RAIZ, "data");
const SUBIDAS = path.join(RAIZ, "uploads");
const ARCHIVO_CONFIG = path.join(DATOS, "config.json");
const ARCHIVO_SEGURIDAD = path.join(DATOS, "seguridad.json");
const MAX_IMAGEN = 12 * 1024 * 1024;

fs.mkdirSync(DATOS, { recursive: true });
fs.mkdirSync(SUBIDAS, { recursive: true });

const TIPOS = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif", ".avif": "image/avif", ".ico": "image/x-icon",
  ".mp4": "video/mp4", ".webm": "video/webm",
};
const EXT_IMAGEN = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif", "image/avif": ".avif", "image/svg+xml": ".svg" };

/* ---------- Configuración ---------- */
function configInicial() {
  try {
    const sandbox = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(RAIZ, "config.js"), "utf8"), sandbox, { timeout: 1000 });
    return sandbox.window.MENU_CONFIG || {};
  } catch (e) {
    console.warn("No se pudo leer config.js:", e.message);
    return {};
  }
}
function leerConfig() {
  try { return JSON.parse(fs.readFileSync(ARCHIVO_CONFIG, "utf8")); }
  catch { const c = configInicial(); guardarConfig(c); return c; }
}
function guardarConfig(c) {
  const tmp = ARCHIVO_CONFIG + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(c, null, 2));
  fs.renameSync(tmp, ARCHIVO_CONFIG);
}
const pinActual = () => { try { return JSON.parse(fs.readFileSync(ARCHIVO_SEGURIDAD, "utf8")).pin || ""; } catch { return ""; } };
const pinValido = req => { const p = pinActual(); return !p || req.headers["x-pin"] === p; };

/* ---------- Avisos en vivo a las pantallas (Server-Sent Events) ---------- */
const oyentes = new Set();
function avisar(evento, datos = {}) {
  const msg = `event: ${evento}\ndata: ${JSON.stringify(datos)}\n\n`;
  oyentes.forEach(r => r.write(msg));
}
setInterval(() => oyentes.forEach(r => r.write(": latido\n\n")), 25000);

/* ---------- Utilidades ---------- */
const json = (res, code, obj) => { res.writeHead(code, { "Content-Type": TIPOS[".json"], "Cache-Control": "no-store" }); res.end(JSON.stringify(obj)); };
function leerCuerpo(req, limite) {
  return new Promise((ok, mal) => {
    const partes = []; let total = 0;
    req.on("data", c => { total += c.length; if (total > limite) { mal(new Error("Archivo demasiado grande")); req.destroy(); } else partes.push(c); });
    req.on("end", () => ok(Buffer.concat(partes)));
    req.on("error", mal);
  });
}
function ips() {
  return Object.values(os.networkInterfaces()).flat().filter(i => i && i.family === "IPv4" && !i.internal).map(i => i.address);
}

/* ---------- Rutas ---------- */
const servidor = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  const ruta = decodeURIComponent(url.pathname);

  try {
    if (ruta === "/api/config" && req.method === "GET") return json(res, 200, leerConfig());

    if (ruta === "/api/config" && req.method === "PUT") {
      if (!pinValido(req)) return json(res, 401, { error: "PIN incorrecto" });
      const c = JSON.parse((await leerCuerpo(req, 5 * 1024 * 1024)).toString("utf8"));
      if (typeof c !== "object" || !Array.isArray(c.categorias)) return json(res, 400, { error: "Configuración inválida" });
      guardarConfig(c);
      avisar("config");
      return json(res, 200, { ok: true });
    }

    if (ruta === "/api/subir" && req.method === "POST") {
      if (!pinValido(req)) return json(res, 401, { error: "PIN incorrecto" });
      const tipo = (req.headers["content-type"] || "").split(";")[0];
      const ext = EXT_IMAGEN[tipo];
      if (!ext) return json(res, 400, { error: "Solo se aceptan imágenes JPG, PNG, WEBP, GIF, AVIF o SVG" });
      const datos = await leerCuerpo(req, MAX_IMAGEN);
      if (!datos.length) return json(res, 400, { error: "La imagen está vacía" });
      const base = String(url.searchParams.get("nombre") || "imagen").replace(/\.[^.]+$/, "")
        .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase().slice(0, 40) || "imagen";
      const nombre = `${Date.now().toString(36)}-${base}${ext}`;
      fs.writeFileSync(path.join(SUBIDAS, nombre), datos);
      return json(res, 200, { url: `uploads/${nombre}` });
    }

    if (ruta === "/api/info") return json(res, 200, { puerto: PUERTO, ips: ips(), pinRequerido: !!pinActual() });

    if (ruta === "/api/pin" && req.method === "POST") {
      const { actual = "", nuevo = "" } = JSON.parse((await leerCuerpo(req, 10000)).toString("utf8") || "{}");
      if (pinActual() && actual !== pinActual()) return json(res, 401, { error: "PIN actual incorrecto" });
      if (nuevo && !/^\d{4,8}$/.test(nuevo)) return json(res, 400, { error: "El PIN debe tener de 4 a 8 números" });
      fs.writeFileSync(ARCHIVO_SEGURIDAD, JSON.stringify({ pin: nuevo }));
      return json(res, 200, { ok: true, pinRequerido: !!nuevo });
    }

    if (ruta === "/api/verificar") return json(res, pinValido(req) ? 200 : 401, { ok: pinValido(req) });

    if (ruta === "/api/eventos") {
      res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-store", Connection: "keep-alive" });
      res.write("retry: 3000\n\n");
      oyentes.add(res);
      req.on("close", () => oyentes.delete(res));
      return;
    }

    if (ruta === "/api/recargar" && req.method === "POST") {
      if (!pinValido(req)) return json(res, 401, { error: "PIN incorrecto" });
      avisar("recargar");
      return json(res, 200, { ok: true });
    }

    if (ruta.startsWith("/api/")) return json(res, 404, { error: "No existe" });

    /* ---------- Archivos ---------- */
    let archivo = ruta === "/" ? "/index.html" : ruta === "/config" || ruta === "/config/" ? "/config.html" : ruta;
    const destino = path.normalize(path.join(RAIZ, archivo));
    // Solo se sirven las páginas, la configuración inicial y las carpetas de imágenes
    const partes = path.relative(RAIZ, destino).split(path.sep);
    const permitido = ["index.html", "config.html", "config.js"].includes(partes.join("/")) || (["uploads", "img"].includes(partes[0]) && partes.length > 1);
    if (!destino.startsWith(RAIZ + path.sep) || !permitido || partes.some(p => p.startsWith("."))) {
      res.writeHead(403); return res.end("Prohibido");
    }
    fs.stat(destino, (err, st) => {
      if (err || !st.isFile()) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); return res.end("No encontrado"); }
      const ext = path.extname(destino).toLowerCase();
      res.writeHead(200, {
        "Content-Type": TIPOS[ext] || "application/octet-stream",
        "Cache-Control": destino.startsWith(SUBIDAS) ? "public, max-age=31536000, immutable" : "no-cache",
      });
      fs.createReadStream(destino).pipe(res);
    });
  } catch (e) {
    json(res, 500, { error: e.message });
  }
});

servidor.listen(PUERTO, "0.0.0.0", () => {
  const red = ips().map(ip => `   Desde otro dispositivo:  http://${ip}:${PUERTO}/config`).join("\n");
  console.log(`
  ┌──────────────────────────────────────────────┐
  │   🍽️  Menú en pantalla funcionando            │
  └──────────────────────────────────────────────┘
   Pantalla:  http://localhost:${PUERTO}/
   Ajustes:   http://localhost:${PUERTO}/config
${red}

   Deja esta ventana abierta. Ctrl+C para detener.
`);
});
servidor.on("error", e => {
  if (e.code === "EADDRINUSE") console.error(`\n  El puerto ${PUERTO} ya está ocupado. ¿El menú ya está abierto en otra ventana?\n`);
  else console.error(e);
  process.exit(1);
});
