// Servidor del Sistema Interno (reemplaza al Apps Script). Mantiene el mismo contrato:
// POST con {action, ...} en texto JSON y respuesta {ok, ...}. Gemini: ?action=geminiProxy&op=...
// Los datos viven en las tablas interno_usuarios, interno_registros e interno_glosario,
// y los expedientes en el bucket privado interno-expedientes.
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const PASSWORD_ROUNDS = 300;
const BUCKET = "interno-expedientes";
const ESTADOS_PROCESO = ["NUEVO", "VALIDADO", "LIQUIDADO", "CONTRATADO", "PENDIENTE_FIRMA", "FIRMADO", "APROBADO", "RECHAZADO"];
const ALLOWED_ORIGINS = new Set(["https://santiof3101-glitch.github.io", "http://127.0.0.1:8787", "http://localhost:8787"]);

type Json = Record<string, any>;
type Session = { ok: true; user: string; displayName: string; isAdmin: boolean };

function headers(origin: string) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://santiof3101-glitch.github.io",
    "Access-Control-Allow-Headers": "content-type, authorization, apikey, x-client-info",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
}

// ── utilidades (idénticas al Apps Script) ──────────────────────
const normUser = (u: unknown) => String(u ?? "").trim().toUpperCase();
const normPlaca = (p: unknown) => String(p ?? "").trim().toUpperCase().replace(/\s+/g, "");
const normTerm = (t: unknown) => String(t ?? "").trim().toUpperCase();
function uniqueUsers(list: unknown): string[] {
  const out: string[] = []; const seen: Record<string, boolean> = {};
  (Array.isArray(list) ? list : []).forEach((u) => { const x = normUser(u); if (x && !seen[x]) { seen[x] = true; out.push(x); } });
  return out;
}
function buildHistory(existing: Json | null, incoming: Json | null, sessionUser: string | null) {
  return uniqueUsers([
    ...(existing?.historialUsuarios || []), ...(incoming?.historialUsuarios || []),
    ...(existing?.asesorCreador ? [existing.asesorCreador] : []), ...(existing?.asesorEditor ? [existing.asesorEditor] : []),
    ...(incoming?.asesorCreador ? [incoming.asesorCreador] : []), ...(incoming?.asesorEditor ? [incoming.asesorEditor] : []),
    ...(sessionUser ? [sessionUser] : []),
  ]);
}
const label = (h: string[]) => uniqueUsers(h).join(" / ");
const firstUser = (h: string[]) => uniqueUsers(h)[0] || "";
const lastEditor = (h: string[]) => { const x = uniqueUsers(h); return x.length > 1 ? x[x.length - 1] : ""; };

function b64(bytes: Uint8Array) { let s = ""; bytes.forEach((b) => (s += String.fromCharCode(b))); return btoa(s); }
async function sha256b64(text: string) {
  return b64(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text))));
}
async function saltedDigest(salt: string, password: string) {
  let value = salt + ":" + String(password ?? "");
  for (let i = 0; i < PASSWORD_ROUNDS; i++) value = await sha256b64(salt + value);
  return value;
}
async function makePasswordHash(password: string) {
  const salt = crypto.randomUUID().replace(/-/g, "");
  return "s2$" + salt + "$" + (await saltedDigest(salt, password));
}
async function verifyPassword(stored: string, password: string) {
  const text = String(stored || "");
  if (!text) return false;
  if (text.startsWith("s2$")) { const p = text.split("$"); return p.length === 3 && (await saltedDigest(p[1], password)) === p[2]; }
  return text === (await sha256b64(String(password ?? "")));
}

// ── usuarios y sesiones ────────────────────────────────────────
async function login(username: string, password: string) {
  const { data: u } = await db.from("interno_usuarios").select("*").eq("username", normUser(username)).maybeSingle();
  if (!u || !u.is_active) return { ok: false, message: "Usuario no encontrado o inactivo." };
  if (!(await verifyPassword(u.password_hash, password))) return { ok: false, message: "Clave incorrecta." };
  const token = crypto.randomUUID() + "-" + Date.now();
  const patch: Json = { session_token: token, session_expires_at: new Date(Date.now() + SESSION_TTL_MS).toISOString() };
  if (!String(u.password_hash).startsWith("s2$")) patch.password_hash = await makePasswordHash(password);
  await db.from("interno_usuarios").update(patch).eq("username", u.username);
  return { ok: true, sessionToken: token, user: { username: u.username, displayName: u.display_name || u.username, isAdmin: !!u.is_admin, mustChangePassword: !!u.must_change } };
}
async function validateSession(token: unknown): Promise<Session | Json> {
  if (!token) return { ok: false, code: "AUTH_REQUIRED", message: "Sesión no válida." };
  const { data: u } = await db.from("interno_usuarios").select("*").eq("session_token", String(token)).maybeSingle();
  if (!u || !u.is_active) return { ok: false, code: "AUTH_REQUIRED", message: "Sesión no válida." };
  const exp = u.session_expires_at ? new Date(u.session_expires_at).getTime() : 0;
  if (!exp || exp <= Date.now()) return { ok: false, code: "AUTH_REQUIRED", message: "Sesión expirada." };
  if (exp - Date.now() < SESSION_TTL_MS / 2) {
    await db.from("interno_usuarios").update({ session_expires_at: new Date(Date.now() + SESSION_TTL_MS).toISOString() }).eq("username", u.username);
  }
  return { ok: true, user: normUser(u.username), displayName: u.display_name || normUser(u.username), isAdmin: !!u.is_admin };
}
async function changePassword(username: string, current: string, next: string) {
  const { data: u } = await db.from("interno_usuarios").select("*").eq("username", normUser(username)).maybeSingle();
  if (!u) return { ok: false, message: "Usuario no encontrado." };
  if (!next || String(next).length < 6) return { ok: false, message: "La nueva clave debe tener al menos 6 caracteres." };
  if (!(await verifyPassword(u.password_hash, current))) return { ok: false, message: "La clave actual no es correcta." };
  await db.from("interno_usuarios").update({ password_hash: await makePasswordHash(next), must_change: false, session_token: null, session_expires_at: null }).eq("username", u.username);
  return { ok: true, message: "Clave actualizada correctamente." };
}
async function adminResetPassword(session: Session, target: string, next: string) {
  if (!session.isAdmin) return { ok: false, message: "No autorizado." };
  const { data: u } = await db.from("interno_usuarios").select("username").eq("username", normUser(target)).maybeSingle();
  if (!u) return { ok: false, message: "Usuario destino no encontrado." };
  if (!next || String(next).length < 6) return { ok: false, message: "La nueva clave debe tener al menos 6 caracteres." };
  await db.from("interno_usuarios").update({ password_hash: await makePasswordHash(next), must_change: true, session_token: null, session_expires_at: null }).eq("username", u.username);
  return { ok: true, message: "Clave reseteada correctamente." };
}
async function listUsers(session: Session) {
  if (!session.isAdmin) return { ok: false, message: "No autorizado." };
  const { data } = await db.from("interno_usuarios").select("username,display_name,is_admin,is_active,must_change").order("created_at");
  return { ok: true, rows: (data || []).map((r) => ({ username: r.username, displayName: r.display_name, isAdmin: r.is_admin, isActive: r.is_active, mustChangePassword: r.must_change })) };
}

// ── glosario ───────────────────────────────────────────────────
async function listGlossary() {
  const { data } = await db.from("interno_glosario").select("term,description");
  const items: Json = {};
  (data || []).forEach((r) => { const t = normTerm(r.term); const d = String(r.description || "").trim(); if (t && d) items[t] = d; });
  return { ok: true, items };
}
async function saveGlossaryTerm(term: string, description: string, s: Session) {
  if (!s.isAdmin) return { ok: false, message: "No autorizado." };
  const key = normTerm(term); const desc = String(description || "").trim();
  if (!key) return { ok: false, message: "El término es obligatorio." };
  if (!desc) return { ok: false, message: "La descripción es obligatoria." };
  await db.from("interno_glosario").upsert({ term: key, description: desc, updated_by: s.user, updated_at: new Date().toISOString() });
  return { ok: true, message: "Término guardado." };
}
async function deleteGlossaryTerm(term: string, s: Session) {
  if (!s.isAdmin) return { ok: false, message: "No autorizado." };
  const key = normTerm(term);
  if (!key) return { ok: false, message: "El término es obligatorio." };
  const { data } = await db.from("interno_glosario").delete().eq("term", key).select("term");
  if (!data?.length) return { ok: false, message: "Término no encontrado." };
  return { ok: true, message: "Término eliminado." };
}
async function resetGlossary(s: Session) {
  if (!s.isAdmin) return { ok: false, message: "No autorizado." };
  await db.from("interno_glosario").delete().neq("term", "");
  return { ok: true, message: "Glosario restablecido." };
}

// ── registros por placa ────────────────────────────────────────
async function getRecord(modulo: string, placa: string) {
  const { data } = await db.from("interno_registros").select("data,updated_at").eq("modulo", modulo).eq("placa", normPlaca(placa)).maybeSingle();
  return data ? { data: (data.data || {}) as Json, updatedAt: data.updated_at as string } : null;
}
async function putRecord(modulo: string, placa: string, data: Json) {
  const { error } = await db.from("interno_registros").upsert({ modulo, placa, data, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}
async function listRecords(modulo: string) {
  const out: { placa: string; data: Json; updatedAt: string }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db.from("interno_registros").select("placa,data,updated_at").eq("modulo", modulo).range(from, from + 999);
    if (error) throw new Error(error.message);
    (data || []).forEach((r) => out.push({ placa: r.placa, data: r.data || {}, updatedAt: r.updated_at }));
    if (!data || data.length < 1000) break;
  }
  return out;
}
const dup = (existing: Json | null, data: Json, s: Session) =>
  existing && data._requestId && existing._requestId === data._requestId && existing._requestUser === s.user;

async function saveLiquidacion(data: Json, s: Session) {
  const placa = normPlaca(data.placa);
  if (!placa) return { ok: false, message: "La placa es obligatoria." };
  const prev = await getRecord("liquidacion", placa); const existing = prev?.data || null;
  if (dup(existing, data, s)) return { ok: true, message: "Registro ya guardado.", placa, updated: true, data: existing, estadoProceso: existing!.estadoProceso };
  data._requestUser = s.user;
  const h = buildHistory(existing, data, s.user);
  Object.assign(data, { placa, historialUsuarios: h, asesorCreador: firstUser(h), asesorEditor: lastEditor(h), asesor: label(h) });
  await putRecord("liquidacion", placa, data);
  return { ok: true, message: prev ? "Registro actualizado." : "Registro guardado.", placa, updated: !!prev, data };
}
async function getByPlaca(placa: string, s: Session) {
  const r = await getRecord("liquidacion", placa);
  if (!r) return { ok: false, message: "No existe registro para esa placa." };
  const d = r.data; const h = buildHistory(d, {}, null);
  Object.assign(d, { historialUsuarios: h, asesorCreador: firstUser(h), asesorEditor: lastEditor(h), asesor: label(h) });
  return { ok: true, data: d, openedBy: s.user };
}
async function listLiquidaciones(mode: string, s: Session) {
  let rows = (await listRecords("liquidacion")).map((r) => {
    const h = buildHistory(r.data, {}, null);
    return { placa: r.placa, cliente: r.data.cliente || "", fecha: r.data.fecha || "", riesgo: r.data.riesgo || "", asesor: label(h) || r.data.asesor || "",
      asesorCreador: firstUser(h), asesorEditor: lastEditor(h), historialUsuarios: h, tipoDocumento: r.data.tipoDocumento || "", updatedAt: r.updatedAt };
  });
  if (mode === "mio") rows = rows.filter((x) => x.historialUsuarios.includes(s.user));
  rows.sort((a, b) => (a.asesor + a.placa).localeCompare(b.asesor + b.placa));
  return { ok: true, rows };
}
async function deleteByHistory(modulo: string, placa: string, s: Session, notFound: string, denied: string, done: string) {
  const r = await getRecord(modulo, placa);
  if (!r) return { ok: false, message: notFound };
  if (!s.isAdmin && !buildHistory(r.data, {}, null).includes(s.user)) return { ok: false, message: denied };
  await db.from("interno_registros").delete().eq("modulo", modulo).eq("placa", normPlaca(placa));
  return { ok: true, message: done };
}

async function savePago(data: Json, s: Session) {
  const placa = normPlaca(data.placaValue || data.placa);
  if (!placa) return { ok: false, message: "La placa es obligatoria." };
  const prev = await getRecord("pago", placa); const existing = prev?.data || null;
  if (dup(existing, data, s)) return { ok: true, message: "Registro ya guardado.", placa, updated: true, data: existing, estadoProceso: existing!.estadoProceso };
  data._requestUser = s.user;
  const h = buildHistory(existing, data, s.user);
  Object.assign(data, { placaValue: placa, placa, historialUsuarios: h, asesorCreador: firstUser(h), asesorEditor: lastEditor(h) });
  if (!data.responsableValue) data.responsableValue = s.user;
  await putRecord("pago", placa, data);
  return { ok: true, message: prev ? "Pago actualizado." : "Pago guardado.", placa, updated: !!prev, data };
}
async function getPagoByPlaca(placa: string, s: Session) {
  const r = await getRecord("pago", placa);
  if (!r) return { ok: false, message: "No existe registro de pago para esa placa." };
  const d = r.data; const h = buildHistory(d, {}, null);
  Object.assign(d, { historialUsuarios: h, asesorCreador: firstUser(h), asesorEditor: lastEditor(h) });
  if (!d.responsableValue) d.responsableValue = s.user || "";
  return { ok: true, data: d, openedBy: s.user };
}
async function listPagos(mode: string, s: Session) {
  let rows = (await listRecords("pago")).map((r) => ({ placa: r.placa, responsable: r.data.responsableValue || "", cliente: r.data.clienteValue || "",
    dictamen: r.data.dictamenValue || "", updatedAt: r.updatedAt, data: r.data }));
  if (mode === "mio") rows = rows.filter((x) => normUser(x.responsable || x.data.responsableValue) === s.user);
  rows.sort((a, b) => a.placa.localeCompare(b.placa));
  return { ok: true, rows };
}
async function deletePago(placa: string, s: Session) {
  const r = await getRecord("pago", placa);
  if (!r) return { ok: false, message: "No existe registro de pago para esa placa." };
  if (!s.isAdmin && normUser(r.data.responsableValue) !== s.user) return { ok: false, message: "No autorizado para eliminar este pago." };
  await db.from("interno_registros").delete().eq("modulo", "pago").eq("placa", normPlaca(placa));
  return { ok: true, message: "Pago eliminado." };
}

async function saveVenta(data: Json, s: Session) {
  const placa = normPlaca(data.placaValue || data.placa);
  if (!placa) return { ok: false, message: "La placa es obligatoria." };
  const prev = await getRecord("venta", placa); const existing = prev?.data || null;
  if (dup(existing, data, s)) return { ok: true, message: "Registro ya guardado.", placa, updated: true, data: existing, estadoProceso: existing!.estadoProceso };
  data._requestUser = s.user;
  const h = buildHistory(existing, data, s.user);
  Object.assign(data, { placaValue: placa, placa, historialUsuarios: h, asesorCreador: firstUser(h), asesorEditor: lastEditor(h) });
  await putRecord("venta", placa, data);
  return { ok: true, message: prev ? "Venta actualizada." : "Venta guardada.", placa, updated: !!prev, data };
}
async function getVentaByPlaca(placa: string, s: Session) {
  const r = await getRecord("venta", placa);
  if (!r) return { ok: false, message: "No existe registro de venta para esa placa." };
  const d = r.data; const h = buildHistory(d, {}, null);
  Object.assign(d, { historialUsuarios: h, asesorCreador: firstUser(h), asesorEditor: lastEditor(h) });
  return { ok: true, data: d, openedBy: s.user };
}
async function listVentas(mode: string, s: Session) {
  let rows = (await listRecords("venta")).map((r) => {
    const h = buildHistory(r.data, {}, null);
    return { placa: r.placa, asesorCreador: firstUser(h) || r.data.asesorCreador || "", asesorEditor: lastEditor(h), historialUsuarios: h,
      cliente: r.data.clienteValue || "", dictamen: r.data.dictamenValue || "", updatedAt: r.updatedAt, data: r.data };
  });
  if (mode === "mio") rows = rows.filter((x) => x.historialUsuarios.includes(s.user));
  rows.sort((a, b) => a.placa.localeCompare(b.placa));
  return { ok: true, rows };
}

async function saveContrato(input: Json, s: Session) {
  const placa = normPlaca(input.placa);
  if (!placa) return { ok: false, message: "La placa es obligatoria." };
  const prev = await getRecord("contrato", placa); const existing = prev?.data || null;
  if (dup(existing, input, s)) return { ok: true, message: "Registro ya guardado.", placa, updated: true, data: existing, estadoProceso: existing!.estadoProceso };
  input._requestUser = s.user;
  const data: Json = Object.assign({}, existing || {}, input);
  if (existing) ["historialEstados", "estadoActualizadoEn", "estadoActualizadoPor", "observacionEstado", "drive"].forEach((k) => {
    if (Object.prototype.hasOwnProperty.call(existing, k)) data[k] = existing[k];
  });
  const h = buildHistory(existing, data, s.user);
  Object.assign(data, { placa, historialUsuarios: h, asesorCreador: firstUser(h), asesorEditor: lastEditor(h), asesor: label(h), fechaActualizacion: new Date().toISOString() });
  const estadoPrevio = String(existing?.estadoProceso || "").toUpperCase();
  const idxPrevio = ESTADOS_PROCESO.indexOf(estadoPrevio);
  const idxValidado = ESTADOS_PROCESO.indexOf("VALIDADO");
  let estadoFinal = idxPrevio >= idxValidado ? estadoPrevio : "VALIDADO";
  if (input.estadoProceso) {
    const idxNuevo = ESTADOS_PROCESO.indexOf(String(input.estadoProceso).toUpperCase());
    if (idxNuevo > idxPrevio) estadoFinal = String(input.estadoProceso).toUpperCase();
  }
  Object.assign(data, { estadoProceso: estadoFinal, estadoActualizadoEn: new Date().toISOString(), estadoActualizadoPor: s.user || data.estadoActualizadoPor || "" });
  await putRecord("contrato", placa, data);
  return { ok: true, message: prev ? "Contrato actualizado." : "Contrato guardado.", placa, updated: !!prev, data, estadoProceso: estadoFinal };
}
async function getContratoByPlaca(placa: string, s: Session) {
  const r = await getRecord("contrato", placa);
  if (!r) return { ok: false, message: "No existe registro de contrato para esa placa." };
  const d = r.data; const h = buildHistory(d, {}, null);
  Object.assign(d, { historialUsuarios: h, asesorCreador: firstUser(h), asesorEditor: lastEditor(h), asesor: label(h) });
  if (!d.estadoProceso) d.estadoProceso = "VALIDADO";
  return { ok: true, data: d, openedBy: s.user, estadoProceso: d.estadoProceso };
}
async function setEstadoProceso(placa: string, estado: string, observacion: string, s: Session) {
  const p = normPlaca(placa);
  if (!p) return { ok: false, message: "Placa requerida." };
  const est = String(estado || "").toUpperCase().trim();
  if (!ESTADOS_PROCESO.includes(est)) return { ok: false, message: "Estado inválido: " + estado };
  const r = await getRecord("contrato", p);
  if (!r) return { ok: false, message: "No existe expediente para esa placa. Guarda primero en Contratos." };
  const data = r.data; const ahora = new Date().toISOString();
  const evento = { estado: est, usuario: s.user || "", cuando: ahora, observacion: String(observacion || "").substring(0, 500) };
  data.historialEstados = Array.isArray(data.historialEstados) ? data.historialEstados : [];
  data.historialEstados.push(evento);
  Object.assign(data, { estadoProceso: est, estadoActualizadoEn: ahora, estadoActualizadoPor: evento.usuario, observacionEstado: evento.observacion });
  await putRecord("contrato", p, data);
  return { ok: true, message: "Estado actualizado a " + est + ".", placa: p, estadoProceso: est, data };
}
async function listContratos(mode: string, s: Session) {
  let rows = (await listRecords("contrato")).map((r) => {
    const h = buildHistory(r.data, {}, null);
    return { placa: r.placa, propietario: r.data.propietario || "", cedulaProp: r.data.cedulaPropietario || "", estadoCivil: r.data.estadoCivil || "",
      asesor: label(h) || r.data.asesor || "", asesorCreador: firstUser(h), asesorEditor: lastEditor(h), historialUsuarios: h,
      riesgoValidacion: r.data.riesgoValidacion || "", updatedAt: r.updatedAt, estadoProceso: String(r.data.estadoProceso || "VALIDADO").toUpperCase() };
  });
  if (mode === "mio") rows = rows.filter((x) => x.historialUsuarios.includes(s.user));
  rows.sort((a, b) => a.placa.localeCompare(b.placa));
  return { ok: true, rows };
}
async function estadoPorPlaca(placa: string, s: Session) {
  const p = normPlaca(placa);
  if (!p) return { placa: "", contratos: false, liquidacion: false, pagos: false, ventas: false, _contratos: null, _liquidacion: null, _pagos: null, _ventas: null };
  const [c, l, pa, v]: Json[] = await Promise.all([getContratoByPlaca(p, s), getByPlaca(p, s), getPagoByPlaca(p, s), getVentaByPlaca(p, s)]);
  return { placa: p, contratos: !!c.ok, liquidacion: !!l.ok, pagos: !!pa.ok, ventas: !!v.ok,
    _contratos: c.data || null, _liquidacion: l.data || null, _pagos: pa.data || null, _ventas: v.data || null };
}

// ── firmas SP (Office Script) ──────────────────────────────────
async function recibirFirmasSP(secret: string, filas: unknown) {
  const expected = Deno.env.get("FIRMAS_SP_SECRET");
  if (!expected) return { ok: false, message: "FIRMAS_SP_SECRET no configurado." };
  if (String(secret || "") !== expected) return { ok: false, message: "Secreto inválido." };
  if (!Array.isArray(filas)) return { ok: false, message: "filas debe ser un arreglo." };
  let creados = 0, actualizados = 0, saltados = 0;
  const ahora = new Date().toISOString();
  for (const f of filas as Json[]) {
    const placa = String(f?.placa || "").toUpperCase().replace(/\s/g, "");
    if (!placa) { saltados++; continue; }
    const exists = await getRecord("firma_sp", placa);
    await putRecord("firma_sp", placa, { placa, correoTitular: String(f?.correoTitular || "").trim(), correoCony: String(f?.correoCony || "").trim(), mesHoja: String(f?.mesHoja || "").trim(), actualizado: ahora });
    exists ? actualizados++ : creados++;
  }
  return { ok: true, creados, actualizados, saltados, total: (filas as unknown[]).length, message: "Sincronización OK." };
}
async function getFirmaSPByPlaca(placa: string) {
  const p = String(placa || "").toUpperCase().replace(/\s/g, "");
  if (!p) return { ok: false, message: "Placa requerida." };
  const r = await getRecord("firma_sp", p);
  return r ? { ok: true, data: r.data } : { ok: false, message: "Placa " + p + " no encontrada en la hoja sincronizada." };
}

// ── expedientes (antes Drive) ──────────────────────────────────
function decodeB64(raw: string) {
  let text = String(raw || ""); const i = text.indexOf("base64,"); if (i >= 0) text = text.substring(i + 7);
  const bin = atob(text); const out = new Uint8Array(bin.length);
  for (let k = 0; k < bin.length; k++) out[k] = bin.charCodeAt(k);
  return out;
}
async function subirExpediente(placa: string, archivos: Json[], s: Session) {
  const p = String(placa || "").replace(/\s/g, "").toUpperCase();
  if (!p) return { ok: false, message: "placa requerida" };
  if (!Array.isArray(archivos) || !archivos.length) return { ok: false, message: "No se recibieron archivos." };
  const resultado: Json = { ok: true, placa: p, folderUrl: "", folderId: p, archivos: [] };
  for (const a of archivos) {
    let nombre = String(a?.nombre || "documento").replace(/[\/\\?*:"<>|]/g, "_").trim();
    if (!nombre) continue;
    if (a.esDocx) {
      resultado.archivos.push({ nombre, ok: false, error: "La conversión de Word a PDF ya no está disponible en el servidor; genera el PDF desde el navegador." });
      continue;
    }
    if (!/\.pdf$/i.test(nombre)) nombre += ".pdf";
    try {
      const path = `${p}/${nombre}`;
      const { error } = await db.storage.from(BUCKET).upload(path, decodeB64(a.contenidoBase64), { contentType: "application/pdf", upsert: true });
      if (error) throw new Error(error.message);
      const { data: signed } = await db.storage.from(BUCKET).createSignedUrl(path, 60 * 60 * 24 * 365);
      const { data: dl } = await db.storage.from(BUCKET).createSignedUrl(path, 60 * 60 * 24 * 365, { download: nombre });
      resultado.archivos.push({ nombre, ok: true, fileId: path, url: signed?.signedUrl || "", downloadUrl: dl?.signedUrl || signed?.signedUrl || "" });
    } catch (e) {
      resultado.archivos.push({ nombre, ok: false, error: (e as Error).message });
    }
  }
  try {
    const r = await getRecord("contrato", p);
    if (r) {
      const data = r.data;
      const porNombre: Json = {};
      ((data.drive && Array.isArray(data.drive.archivos)) ? data.drive.archivos : []).forEach((x: Json) => { if (x?.nombre) porNombre[x.nombre] = x; });
      resultado.archivos.filter((x: Json) => x.ok).forEach((x: Json) => { porNombre[x.nombre] = { nombre: x.nombre, url: x.url, fileId: x.fileId, downloadUrl: x.downloadUrl }; });
      data.drive = { folderUrl: "", folderId: p, archivos: Object.values(porNombre), actualizadoEn: new Date().toISOString(), actualizadoPor: s.user || "" };
      await putRecord("contrato", p, data);
    }
  } catch (e) {
    resultado.warningPersist = "No se pudo guardar la lista de archivos en el expediente: " + (e as Error).message;
  }
  return resultado;
}

// ── Gemini ─────────────────────────────────────────────────────
async function geminiProxy(url: URL, raw: string) {
  let env: Json;
  try { env = JSON.parse(raw || "{}"); } catch { return { _proxy: { ok: false, status: 400 }, data: { error: { message: "JSON invalido." } } }; }
  const session = await validateSession(env.sessionToken);
  if (!session.ok) return { _proxy: { ok: false, status: 401 }, data: { error: { message: (session as Json).message } } };
  const key = Deno.env.get("GEMINI_API_KEY");
  if (!key) return { _proxy: { ok: false, status: 500 }, data: { error: { code: 500, status: "CONFIG_ERROR", message: "GEMINI_API_KEY no configurada." } } };
  const op = String(url.searchParams.get("op") || env.op || "models");
  let target: string; let init: RequestInit;
  if (op === "models") {
    target = "https://generativelanguage.googleapis.com/v1beta/models?key=" + encodeURIComponent(key); init = { method: "GET" };
  } else if (op === "generate") {
    const model = String(url.searchParams.get("model") || env.model || "").replace(/[^A-Za-z0-9._\-]/g, "");
    if (!model) return { _proxy: { ok: false, status: 400 }, data: { error: { code: 400, status: "BAD_REQUEST", message: "Falta parámetro model" } } };
    target = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
    init = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(env.request || {}) };
  } else {
    return { _proxy: { ok: false, status: 400 }, data: { error: { code: 400, status: "BAD_REQUEST", message: "op inválida: " + op } } };
  }
  try {
    const resp = await fetch(target, init); const text = await resp.text();
    let parsed: unknown; try { parsed = JSON.parse(text); } catch { parsed = { raw: text }; }
    return { _proxy: { ok: resp.ok, status: resp.status }, data: parsed };
  } catch (e) {
    return { _proxy: { ok: false, status: 0 }, data: { error: { code: 0, status: "FETCH_ERROR", message: String((e as Error).message || e) } } };
  }
}

// ── despacho ───────────────────────────────────────────────────
const NEEDS_SESSION = new Set(["saveGlossaryTerm", "deleteGlossaryTerm", "resetGlossary", "save", "getByPlaca", "list", "delete", "savePago", "getPagoByPlaca",
  "listPagos", "deletePago", "saveVenta", "getVentaByPlaca", "estadoPorPlaca", "listVentas", "deleteVenta", "saveContrato", "getContratoByPlaca",
  "setEstadoProceso", "subirExpedienteDrive", "convertirDocxAPdf", "getFirmaSPByPlaca", "listContratos", "deleteContrato", "adminResetPassword", "listUsers"]);

async function dispatch(action: string, p: Json): Promise<Json> {
  if (action === "ping") return { ok: true, message: "API funcionando" };
  if (action === "login") return login(p.username, p.password);
  if (action === "changePassword") return changePassword(p.username, p.currentPassword, p.newPassword);
  if (action === "listGlossary") return listGlossary();
  if (action === "recibirFirmasSP") return recibirFirmasSP(p.secret, p.filas);
  if (!NEEDS_SESSION.has(action)) return { ok: false, message: "Acción no válida: " + action };
  const v = await validateSession(p.sessionToken);
  if (!v.ok) return v;
  const s = v as Session;
  if (/^save/.test(action) && action !== "saveGlossaryTerm") {
    if (!p.data || typeof p.data !== "object" || Array.isArray(p.data)) return { ok: false, message: "Datos invalidos." };
    p.data = Object.assign({}, p.data, { _requestId: p.requestId || crypto.randomUUID() });
  }
  switch (action) {
    case "adminResetPassword": return adminResetPassword(s, p.targetUsername, p.newPassword);
    case "listUsers": return listUsers(s);
    case "saveGlossaryTerm": return saveGlossaryTerm(p.term, p.description, s);
    case "deleteGlossaryTerm": return deleteGlossaryTerm(p.term, s);
    case "resetGlossary": return resetGlossary(s);
    case "save": return saveLiquidacion(p.data, s);
    case "getByPlaca": return getByPlaca(p.placa, s);
    case "list": return listLiquidaciones(p.mode, s);
    case "delete": return deleteByHistory("liquidacion", p.placa, s, "No existe registro para esa placa.", "No autorizado para eliminar este registro.", "Registro eliminado.");
    case "savePago": return savePago(p.data, s);
    case "getPagoByPlaca": return getPagoByPlaca(p.placa, s);
    case "listPagos": return listPagos(p.mode, s);
    case "deletePago": return deletePago(p.placa, s);
    case "saveVenta": return saveVenta(p.data, s);
    case "getVentaByPlaca": return getVentaByPlaca(p.placa, s);
    case "estadoPorPlaca": return estadoPorPlaca(p.placa, s);
    case "listVentas": return listVentas(p.mode, s);
    case "deleteVenta": return deleteByHistory("venta", p.placa, s, "No existe registro de venta para esa placa.", "No autorizado para eliminar este registro de venta.", "Venta eliminada.");
    case "saveContrato": return saveContrato(p.data, s);
    case "getContratoByPlaca": return getContratoByPlaca(p.placa, s);
    case "setEstadoProceso": return setEstadoProceso(p.placa, p.estado, p.observacion, s);
    case "subirExpedienteDrive": return subirExpediente(p.placa, p.archivos, s);
    case "convertirDocxAPdf": return { ok: false, message: "La conversión de Word a PDF ya no está disponible en el servidor." };
    case "getFirmaSPByPlaca": return getFirmaSPByPlaca(p.placa);
    case "listContratos": return listContratos(p.mode, s);
    case "deleteContrato": return deleteByHistory("contrato", p.placa, s, "No existe registro de contrato para esa placa.", "No autorizado para eliminar este registro.", "Registro de contrato eliminado.");
  }
  return { ok: false, message: "Acción no válida: " + action };
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") || "";
  if (req.method === "OPTIONS") return new Response("ok", { headers: headers(origin) });
  const url = new URL(req.url);
  const started = Date.now();
  let result: Json;
  try {
    const raw = req.method === "POST" ? await req.text() : "";
    if (url.searchParams.get("action") === "geminiProxy") {
      result = await geminiProxy(url, raw);
    } else if (req.method !== "POST") {
      const action = url.searchParams.get("action") || "ping";
      result = action === "ping" ? { ok: true, message: "API funcionando" } : { ok: false, message: "Usa POST para esta accion." };
    } else {
      const body = raw ? JSON.parse(raw) : {};
      const action = String(body.action || "ping");
      try { result = await dispatch(action, body); }
      catch (e) { result = { ok: false, message: "Error al procesar la solicitud: " + (e as Error).message }; }
      const serverMs = Date.now() - started;
      result.timing = { lockWaitMs: 0, processingMs: serverMs, flushMs: 0, serverMs };
    }
  } catch (e) {
    result = { ok: false, message: "Error en la solicitud: " + (e as Error).message };
  }
  return new Response(JSON.stringify(result), { status: 200, headers: headers(origin) });
});
