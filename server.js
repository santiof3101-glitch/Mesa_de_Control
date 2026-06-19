const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8787;
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, "autocor-datos-pc.json");
const BACKUP_DIR = path.join(ROOT, "respaldos-autocor");
const MAX_BODY_SIZE = 200 * 1024 * 1024;
const MAX_BACKUPS = 80;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function send(res, status, body = "", headers = {}) {
  res.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Accept",
    ...headers
  });
  res.end(body);
}

function sendJson(res, status, payload) {
  send(res, status, JSON.stringify(payload), { "Content-Type": "application/json; charset=utf-8" });
}

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function backupFileName(reason = "auto") {
  const safeReason = String(reason || "auto").replace(/[^a-z0-9_-]+/gi, "-").slice(0, 40) || "auto";
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `autocor-${stamp}-${safeReason}.json`;
}

function writeBackupFromPayload(payload, reason = "auto") {
  ensureBackupDir();
  const body = JSON.stringify({
    savedAt: new Date().toISOString(),
    reason,
    state: payload.state || payload
  }, null, 2);
  const filePath = path.join(BACKUP_DIR, backupFileName(reason));
  fs.writeFileSync(filePath, body, "utf8");
  pruneBackups();
  return filePath;
}

function backupCurrentData(reason = "manual") {
  if (!fs.existsSync(DATA_FILE)) return null;
  ensureBackupDir();
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
  backups.slice(MAX_BACKUPS).forEach((backup) => {
    try {
      fs.unlinkSync(path.join(BACKUP_DIR, backup.name));
    } catch {}
  });
}

function serveFile(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(ROOT, requestedPath));
  if (!filePath.startsWith(ROOT)) {
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

function readBody(req, callback) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
    if (body.length > MAX_BODY_SIZE) {
      req.destroy();
    }
  });
  req.on("end", () => callback(body));
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    send(res, 204);
    return;
  }

  if (req.url.startsWith("/api/state")) {
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
        send(res, 200, data, { "Content-Type": "application/json; charset=utf-8" });
      });
      return;
    }

    if (req.method === "POST") {
      readBody(req, (body) => {
        try {
          const payload = JSON.parse(body || "{}");
          if (!payload.state) throw new Error("Sin estado");
          const filePayload = JSON.stringify({
            savedAt: new Date().toISOString(),
            state: payload.state
          }, null, 2);
          try {
            writeBackupFromPayload(payload, payload.reason || "auto");
          } catch {}
          fs.writeFile(DATA_FILE, filePayload, "utf8", (error) => {
            if (error) {
              sendJson(res, 500, { ok: false, error: "No se pudo guardar" });
              return;
            }
            sendJson(res, 200, { ok: true });
          });
        } catch {
          sendJson(res, 400, { ok: false, error: "JSON invalido" });
        }
      });
      return;
    }
  }

  if (req.url.startsWith("/api/backups")) {
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
      readBody(req, (body) => {
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
      readBody(req, (body) => {
        try {
          const payload = JSON.parse(body || "{}");
          const name = path.basename(payload.name || "");
          const filePath = path.join(BACKUP_DIR, name);
          if (!name || !filePath.startsWith(BACKUP_DIR) || !fs.existsSync(filePath)) throw new Error("No existe");
          backupCurrentData("antes-de-restaurar");
          fs.copyFileSync(filePath, DATA_FILE);
          sendJson(res, 200, { ok: true });
        } catch {
          sendJson(res, 400, { ok: false, error: "No se pudo restaurar" });
        }
      });
      return;
    }
  }

  serveFile(req, res);
});

server.listen(PORT, "127.0.0.1", () => {
  ensureBackupDir();
  console.log(`Autocor listo: http://127.0.0.1:${PORT}`);
  console.log(`Datos compartidos del PC: ${DATA_FILE}`);
  console.log(`Respaldos automaticos: ${BACKUP_DIR}`);
});
