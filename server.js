const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8787;
const HOST = "127.0.0.1";
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, "autocor-datos-pc.json");
const BACKUP_DIR = path.join(ROOT, "respaldos-autocor");
const MAX_BODY_SIZE = 200 * 1024 * 1024;

// Respaldos automaticos: como maximo uno cada 15 minutos.
// Se conservan los ultimos 96 automaticos (aprox. un dia de trabajo),
// uno por dia durante 60 dias y los ultimos 40 manuales.
const AUTO_BACKUP_INTERVAL_MS = 15 * 60 * 1000;
const MAX_AUTO_BACKUPS = 96;
const MAX_DAILY_BACKUPS = 60;
const MAX_MANUAL_BACKUPS = 40;

const ALLOWED_HOSTS = new Set([`127.0.0.1:${PORT}`, `localhost:${PORT}`]);
const ALLOWED_ORIGINS = new Set([`http://127.0.0.1:${PORT}`, `http://localhost:${PORT}`]);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".ttf": "font/ttf"
};

// Archivos que nunca se sirven por HTTP (datos y respaldos).
const PRIVATE_PATHS = [DATA_FILE, BACKUP_DIR];

let lastAutoBackupAt = 0;

function send(res, status, body = "", headers = {}) {
  res.writeHead(status, {
    "X-Content-Type-Options": "nosniff",
    ...headers
  });
  res.end(body);
}

function sendJson(res, status, payload, headers = {}) {
  send(res, status, JSON.stringify(payload), { "Content-Type": "application/json; charset=utf-8", ...headers });
}

function isAllowedHost(req) {
  return ALLOWED_HOSTS.has(String(req.headers.host || "").toLowerCase());
}

// Solo la propia aplicacion (abierta desde http://127.0.0.1:8787) puede usar la API.
// Las peticiones sin cabecera Origin vienen de la misma pagina (GET same-origin) o de herramientas locales.
function isAllowedOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  return ALLOWED_ORIGINS.has(origin);
}

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function backupFileName(reason = "auto") {
  const safeReason = String(reason || "auto").replace(/[^a-z0-9_-]+/gi, "-").slice(0, 40) || "auto";
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `autocor-${stamp}-${safeReason}.json`;
}

function writeFileAtomic(filePath, content) {
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tempPath, content, "utf8");
  fs.renameSync(tempPath, filePath);
}

function writeBackupFromPayload(payload, reason = "auto") {
  ensureBackupDir();
  const body = JSON.stringify({
    savedAt: new Date().toISOString(),
    reason,
    state: payload.state || payload
  });
  const filePath = path.join(BACKUP_DIR, backupFileName(reason));
  writeFileAtomic(filePath, body);
  pruneBackups();
  return filePath;
}

function backupCurrentData(reason = "manual") {
  if (!fs.existsSync(DATA_FILE)) return null;
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  const parsed = JSON.parse(raw || "{}");
  return writeBackupFromPayload(parsed, reason);
}

function listBackups() {
  ensureBackupDir();
  return fs.readdirSync(BACKUP_DIR)
    .filter((name) => name.endsWith(".json"))
    .map((name) => {
      const filePath = path.join(BACKUP_DIR, name);
      const stat = fs.statSync(filePath);
      return { name, size: stat.size, savedAt: stat.mtime.toISOString() };
    })
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

function pruneBackups() {
  const backups = listBackups();
  const keep = new Set();
  const autos = backups.filter((backup) => backup.name.endsWith("-auto.json"));
  const manuals = backups.filter((backup) => !backup.name.endsWith("-auto.json"));

  autos.slice(0, MAX_AUTO_BACKUPS).forEach((backup) => keep.add(backup.name));
  manuals.slice(0, MAX_MANUAL_BACKUPS).forEach((backup) => keep.add(backup.name));

  // El respaldo mas reciente de cada dia se conserva aunque sea automatico.
  const seenDays = new Set();
  backups.forEach((backup) => {
    const day = backup.savedAt.slice(0, 10);
    if (seenDays.has(day) || seenDays.size >= MAX_DAILY_BACKUPS) return;
    seenDays.add(day);
    keep.add(backup.name);
  });

  backups.forEach((backup) => {
    if (keep.has(backup.name)) return;
    try {
      fs.unlinkSync(path.join(BACKUP_DIR, backup.name));
    } catch {}
  });
}

function isPrivatePath(filePath) {
  return PRIVATE_PATHS.some((privatePath) => filePath === privatePath || filePath.startsWith(privatePath + path.sep))
    || filePath.endsWith(".tmp");
}

function serveFile(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    send(res, 405, "Metodo no permitido");
    return;
  }
  let requestedPath;
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  } catch {
    send(res, 400, "Solicitud invalida");
    return;
  }
  const filePath = path.normalize(path.join(ROOT, requestedPath));
  if (!filePath.startsWith(ROOT + path.sep) || isPrivatePath(filePath)) {
    send(res, 403, "Acceso no permitido");
    return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "Archivo no encontrado");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
  });
}

// Lee el cuerpo como bytes y lo convierte a texto al final,
// asi no se dañan tildes ni eñes cuando llegan partidas entre paquetes.
function readBody(req, res, callback) {
  const chunks = [];
  let size = 0;
  let aborted = false;
  req.on("data", (chunk) => {
    if (aborted) return;
    size += chunk.length;
    if (size > MAX_BODY_SIZE) {
      aborted = true;
      sendJson(res, 413, { ok: false, error: "Datos demasiado grandes" });
      req.destroy();
      return;
    }
    chunks.push(chunk);
  });
  req.on("end", () => {
    if (aborted) return;
    callback(Buffer.concat(chunks).toString("utf8"));
  });
}

function handlePing(req, res) {
  // Unico punto abierto a cualquier origen: no devuelve datos,
  // solo avisa que el servidor local esta activo para redirigir a http://127.0.0.1:8787
  sendJson(res, 200, { ok: true, url: `http://${HOST}:${PORT}/` }, { "Access-Control-Allow-Origin": "*" });
}

function handleState(req, res) {
  if (req.method === "GET") {
    if (!fs.existsSync(DATA_FILE)) {
      send(res, 204);
      return;
    }
    fs.readFile(DATA_FILE, "utf8", (error, data) => {
      if (error || !data.trim()) {
        send(res, 204);
        return;
      }
      send(res, 200, data, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
    });
    return;
  }

  if (req.method === "POST") {
    readBody(req, res, (body) => {
      let payload;
      try {
        payload = JSON.parse(body || "{}");
        if (!payload.state) throw new Error("Sin estado");
      } catch {
        sendJson(res, 400, { ok: false, error: "JSON invalido" });
        return;
      }
      const reason = payload.reason || "auto";
      try {
        const now = Date.now();
        if (reason !== "auto") {
          writeBackupFromPayload(payload, reason);
        } else if (now - lastAutoBackupAt >= AUTO_BACKUP_INTERVAL_MS) {
          writeBackupFromPayload(payload, "auto");
          lastAutoBackupAt = now;
        }
      } catch {}
      try {
        writeFileAtomic(DATA_FILE, JSON.stringify({
          savedAt: new Date().toISOString(),
          state: payload.state
        }));
        sendJson(res, 200, { ok: true });
      } catch {
        sendJson(res, 500, { ok: false, error: "No se pudo guardar" });
      }
    });
    return;
  }

  send(res, 405, "Metodo no permitido");
}

function handleBackups(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === "GET") {
    try {
      sendJson(res, 200, { backups: listBackups() });
    } catch {
      sendJson(res, 500, { backups: [] });
    }
    return;
  }
  if (req.method === "POST") {
    readBody(req, res, (body) => {
      try {
        const payload = JSON.parse(body || "{}");
        const reason = payload.reason || "manual";
        const filePath = payload.state ? writeBackupFromPayload(payload, reason) : backupCurrentData(reason);
        sendJson(res, 200, { ok: true, file: filePath ? path.basename(filePath) : "" });
      } catch {
        sendJson(res, 400, { ok: false, error: "No se pudo crear respaldo" });
      }
    });
    return;
  }
  if (req.method === "PUT" && url.pathname === "/api/backups/restore") {
    readBody(req, res, (body) => {
      try {
        const payload = JSON.parse(body || "{}");
        const name = path.basename(String(payload.name || ""));
        const filePath = path.join(BACKUP_DIR, name);
        if (!name || !name.endsWith(".json") || !fs.existsSync(filePath)) throw new Error("No existe");
        const backup = JSON.parse(fs.readFileSync(filePath, "utf8"));
        backupCurrentData("antes-de-restaurar");
        writeFileAtomic(DATA_FILE, JSON.stringify({
          savedAt: new Date().toISOString(),
          state: backup.state || backup
        }));
        sendJson(res, 200, { ok: true });
      } catch {
        sendJson(res, 400, { ok: false, error: "No se pudo restaurar" });
      }
    });
    return;
  }
  send(res, 405, "Metodo no permitido");
}

const server = http.createServer((req, res) => {
  // Bloquea peticiones que llegan con otro nombre de servidor (proteccion contra DNS rebinding).
  if (!isAllowedHost(req)) {
    send(res, 403, "Acceso no permitido");
    return;
  }

  const pathname = String(req.url || "").split("?")[0];

  if (pathname === "/api/ping") {
    if (req.method === "OPTIONS") {
      send(res, 204, "", { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET" });
      return;
    }
    handlePing(req, res);
    return;
  }

  if (pathname.startsWith("/api/")) {
    if (!isAllowedOrigin(req)) {
      sendJson(res, 403, { ok: false, error: "Origen no permitido" });
      return;
    }
    if (req.method === "OPTIONS") {
      send(res, 204);
      return;
    }
    if (pathname === "/api/state") {
      handleState(req, res);
      return;
    }
    if (pathname === "/api/backups" || pathname === "/api/backups/restore") {
      handleBackups(req, res);
      return;
    }
    sendJson(res, 404, { ok: false, error: "No encontrado" });
    return;
  }

  serveFile(req, res);
});

server.listen(PORT, HOST, () => {
  ensureBackupDir();
  console.log(`Autocor listo: http://${HOST}:${PORT}`);
  console.log(`Datos compartidos del PC: ${DATA_FILE}`);
  console.log(`Respaldos automaticos: ${BACKUP_DIR}`);
});
