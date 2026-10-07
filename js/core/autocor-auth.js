// Acceso con Supabase Auth.
// La sesion (token de acceso y token de renovacion) vive en este navegador;
// los datos solo se pueden leer o guardar con un token valido.
(function bootstrapAutocorAuth(window) {
  "use strict";

  const PROJECT_URL = "https://evblnxgeyelatdmloydl.supabase.co";
  const PUBLISHABLE_KEY = "sb_publishable_lFsurzFERQn1kQlfSsz1rA_588-DHwk";
  const AUTH_URL = `${PROJECT_URL}/auth/v1`;
  const REST_URL = `${PROJECT_URL}/rest/v1`;
  const STORAGE_URL = `${PROJECT_URL}/storage/v1`;
  const AUTH_STORAGE_KEY = "autocor-auth-session";
  const REFRESH_MARGIN_MS = 2 * 60 * 1000;

  let authSession = readStoredSession();
  let refreshPromise = null;
  const listeners = new Set();

  function readStoredSession() {
    try {
      const saved = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "null");
      if (!saved?.access_token || !saved?.refresh_token) return null;
      return saved;
    } catch {
      return null;
    }
  }

  function storeSession(next) {
    authSession = next;
    try {
      if (next) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
      else localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {}
    listeners.forEach((listener) => {
      try {
        listener(next);
      } catch {}
    });
  }

  function decodeTokenPayload(token = "") {
    try {
      const part = String(token).split(".")[1] || "";
      const base64 = part.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(part.length / 4) * 4, "=");
      const binary = atob(base64);
      const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch {
      return null;
    }
  }

  function sessionFromTokenResponse(payload = {}) {
    const expiresAt = payload.expires_at
      ? Number(payload.expires_at) * 1000
      : Date.now() + Number(payload.expires_in || 3600) * 1000;
    return {
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      expires_at: expiresAt
    };
  }

  // Debe coincidir con autocor_private.auth_email() en Supabase.
  function emailForLogin(role, username) {
    const slug = String(username || "")
      .trim()
      .toLowerCase()
      .replace(/@/g, ".at.")
      .replace(/[^a-z0-9._-]/g, "-")
      .replace(/\.{2,}/g, ".")
      .replace(/^\.+|\.+$/g, "");
    return `${String(role || "").toLowerCase()}--${slug}@acceso.autocor.local`;
  }

  async function readJson(response) {
    return response.json().catch(() => ({}));
  }

  function friendlyAuthError(status, payload = {}) {
    const code = payload.error_code || payload.code || payload.error || "";
    if (status === 400 && /invalid_credentials|invalid_grant/i.test(code)) return "Usuario o contrasena incorrectos.";
    if (/user_banned/i.test(code)) return "Este acceso fue desactivado por el administrador.";
    if (status === 429) return "Demasiados intentos. Espere unos minutos e intente de nuevo.";
    return payload.msg || payload.error_description || payload.message || "No se pudo iniciar sesion.";
  }

  async function signIn(role, username, password) {
    if (!navigator.onLine) return { ok: false, error: "Sin conexion a internet." };
    try {
      const response = await fetch(`${AUTH_URL}/token?grant_type=password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: PUBLISHABLE_KEY },
        body: JSON.stringify({ email: emailForLogin(role, username), password: String(password || "").trim() })
      });
      const payload = await readJson(response);
      if (!response.ok || !payload.access_token) {
        return { ok: false, error: friendlyAuthError(response.status, payload) };
      }
      const claims = decodeTokenPayload(payload.access_token);
      const appMeta = claims?.app_metadata || {};
      if (appMeta.autocor_role !== role) {
        await revokeToken(payload.access_token);
        return { ok: false, error: "Usuario o contrasena incorrectos." };
      }
      storeSession(sessionFromTokenResponse(payload));
      return { ok: true, role: appMeta.autocor_role, userId: appMeta.autocor_id, name: claims?.user_metadata?.name || "" };
    } catch {
      return { ok: false, error: "No se pudo conectar con el servidor de acceso." };
    }
  }

  async function revokeToken(accessToken) {
    if (!accessToken) return;
    try {
      await fetch(`${AUTH_URL}/logout?scope=local`, {
        method: "POST",
        headers: { apikey: PUBLISHABLE_KEY, Authorization: `Bearer ${accessToken}` }
      });
    } catch {}
  }

  async function refresh() {
    if (!authSession?.refresh_token) return false;
    if (refreshPromise) return refreshPromise;
    const refreshToken = authSession.refresh_token;
    refreshPromise = (async () => {
      try {
        const response = await fetch(`${AUTH_URL}/token?grant_type=refresh_token`, {
          method: "POST",
          headers: { "Content-Type": "application/json", apikey: PUBLISHABLE_KEY },
          body: JSON.stringify({ refresh_token: refreshToken })
        });
        const payload = await readJson(response);
        if (response.ok && payload.access_token) {
          storeSession(sessionFromTokenResponse(payload));
          return true;
        }
        // 400/401/403: el token de renovacion ya no sirve (cerrado, bloqueado o caducado).
        if ([400, 401, 403].includes(response.status) && authSession?.refresh_token === refreshToken) {
          storeSession(null);
        }
        return false;
      } catch {
        // Sin conexion: se conserva la sesion y se reintenta despues.
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
    return refreshPromise;
  }

  async function ensureFresh() {
    if (!authSession) return false;
    if (Number(authSession.expires_at || 0) - Date.now() > REFRESH_MARGIN_MS) return true;
    return refresh();
  }

  async function headers(extra = {}) {
    await ensureFresh();
    return {
      apikey: PUBLISHABLE_KEY,
      Authorization: `Bearer ${authSession?.access_token || PUBLISHABLE_KEY}`,
      ...extra
    };
  }

  async function signOut() {
    const current = authSession;
    storeSession(null);
    if (current?.access_token) await revokeToken(current.access_token);
  }

  function getClaims() {
    if (!authSession?.access_token) return null;
    const claims = decodeTokenPayload(authSession.access_token);
    if (!claims) return null;
    return {
      role: claims.app_metadata?.autocor_role || "",
      userId: claims.app_metadata?.autocor_id || "",
      name: claims.user_metadata?.name || "",
      authUserId: claims.sub || ""
    };
  }

  async function rpc(name, params = {}) {
    const response = await fetch(`${REST_URL}/rpc/${encodeURIComponent(name)}`, {
      method: "POST",
      headers: await headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(params)
    });
    const payload = await readJson(response);
    if (!response.ok) {
      const message = payload?.message || payload?.hint || "No se pudo completar la operacion.";
      throw new Error(message);
    }
    return payload;
  }

  // ===== Archivos en Supabase Storage =====
  const FILE_BUCKET = "autocor-archivos";

  function encodeStoragePath(path = "") {
    return String(path).split("/").map(encodeURIComponent).join("/");
  }

  async function uploadFile(path, body, contentType = "application/octet-stream") {
    const response = await fetch(`${STORAGE_URL}/object/${FILE_BUCKET}/${encodeStoragePath(path)}`, {
      method: "POST",
      headers: await headers({ "Content-Type": contentType || "application/octet-stream", "x-upsert": "true", "cache-control": "3600" }),
      body
    });
    if (!response.ok) {
      const payload = await readJson(response);
      throw new Error(payload?.message || "No se pudo subir el archivo.");
    }
    return path;
  }

  async function downloadFile(path) {
    const response = await fetch(`${STORAGE_URL}/object/authenticated/${FILE_BUCKET}/${encodeStoragePath(path)}`, {
      method: "GET",
      headers: await headers()
    });
    if (!response.ok) throw new Error("No se pudo descargar el archivo.");
    return response.blob();
  }

  async function removeFile(path) {
    const response = await fetch(`${STORAGE_URL}/object/${FILE_BUCKET}`, {
      method: "DELETE",
      headers: await headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ prefixes: [path] })
    });
    return response.ok;
  }

  // Renueva el token en segundo plano para que nunca caduque mientras se trabaja.
  window.setInterval(() => {
    if (authSession && navigator.onLine) ensureFresh();
  }, 60 * 1000);
  window.addEventListener("online", () => {
    if (authSession) ensureFresh();
  });
  window.addEventListener("storage", (event) => {
    if (event.key === AUTH_STORAGE_KEY) {
      authSession = readStoredSession();
      listeners.forEach((listener) => {
        try {
          listener(authSession);
        } catch {}
      });
    }
  });

  window.AutocorAuth = Object.freeze({
    PROJECT_URL,
    REST_URL,
    PUBLISHABLE_KEY,
    FILE_BUCKET,
    emailForLogin,
    signIn,
    signOut,
    refresh,
    ensureFresh,
    headers,
    rpc,
    getClaims,
    hasSession: () => Boolean(authSession?.access_token),
    onChange: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    uploadFile,
    downloadFile,
    removeFile
  });
})(window);
