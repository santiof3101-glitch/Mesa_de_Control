// Prints (capturas de pantalla) del Sistema Interno guardados por placa en Supabase.
// Acciones (POST JSON con sessionToken): subirPrint, listarPrints, eliminarPrint, ordenarPrints.
// La sesión es la misma del Sistema Interno: se valida con interno_usuarios y, si no está ahí,
// se confirma con el servidor del Sistema Interno (Apps Script).
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const BUCKET = "interno-expedientes";
const MODULOS = new Set(["ventas", "pagos"]);
const MAX_BYTES = 8 * 1024 * 1024;
const GAS_URL = Deno.env.get("INTERNO_GAS_URL") ||
  "https://script.google.com/macros/s/AKfycbxbh1cLzulwNeFHJj2c6_k6Yk4PyHhzTlFlcfW7M0SMz4NrAxKUagOweQobl4AJTcmQ/exec";
const ALLOWED_ORIGINS = new Set(["https://santiof3101-glitch.github.io", "http://127.0.0.1:8787", "http://localhost:8787"]);

type Json = Record<string, any>;
const normPlaca = (p: unknown) => String(p ?? "").trim().toUpperCase().replace(/\s+/g, "");
const normUser = (u: unknown) => String(u ?? "").trim().toUpperCase();

function headers(origin: string) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://santiof3101-glitch.github.io",
    "Access-Control-Allow-Headers": "content-type, authorization, apikey, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
}

async function sesion(token: unknown): Promise<{ ok: boolean; user: string; message?: string }> {
  const t = String(token || "");
  if (!t) return { ok: false, user: "", message: "Sesión no válida." };
  const { data: u } = await db.from("interno_usuarios").select("username,is_active,session_expires_at").eq("session_token", t).maybeSingle();
  if (u && u.is_active && u.session_expires_at && new Date(u.session_expires_at).getTime() > Date.now()) {
    return { ok: true, user: normUser(u.username) };
  }
  // Sesión abierta antes de la copia en Supabase: confirmarla con el servidor del Sistema Interno.
  try {
    const ctrl = new AbortController(); const timer = setTimeout(() => ctrl.abort(), 20000);
    const resp = await fetch(GAS_URL, { method: "POST", redirect: "follow", signal: ctrl.signal,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "getFirmaSPByPlaca", sessionToken: t, placa: "" }) });
    clearTimeout(timer);
    const r = JSON.parse(await resp.text());
    if (r && r.code !== "AUTH_REQUIRED" && !/sesi[oó]n/i.test(String(r.message || ""))) return { ok: true, user: "" };
  } catch (_) { /* sin confirmación */ }
  return { ok: false, user: "", message: "Sesión no válida. Vuelve a iniciar sesión." };
}

function decodeDataUrl(dataUrl: string) {
  const m = /^data:([^;,]+);base64,(.*)$/s.exec(String(dataUrl || ""));
  if (!m) throw new Error("Imagen inválida.");
  const mime = m[1].toLowerCase();
  if (!/^image\/(png|jpe?g|webp|gif)$/.test(mime)) throw new Error("Solo se aceptan imágenes.");
  const bin = atob(m[2]); const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return { mime, bytes };
}
function toBase64(bytes: Uint8Array) {
  let s = ""; const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) s += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(s);
}

async function subirPrint(p: Json, user: string) {
  const modulo = String(p.modulo || ""); const placa = normPlaca(p.placa);
  if (!MODULOS.has(modulo)) return { ok: false, message: "Módulo inválido." };
  if (!placa) return { ok: false, message: "Ingresa la placa para guardar el print." };
  const { mime, bytes } = decodeDataUrl(p.dataUrl);
  if (bytes.length > MAX_BYTES) return { ok: false, message: "La imagen supera 8 MB." };
  const id = crypto.randomUUID();
  const ext = mime.includes("jpeg") || mime.includes("jpg") ? "jpg" : mime.split("/")[1];
  const path = `prints/${modulo}/${placa}/${id}.${ext}`;
  const up = await db.storage.from(BUCKET).upload(path, bytes, { contentType: mime, upsert: false });
  if (up.error) return { ok: false, message: "No se pudo guardar la imagen: " + up.error.message };
  const { count } = await db.from("interno_prints").select("id", { count: "exact", head: true }).eq("modulo", modulo).eq("placa", placa);
  const { error } = await db.from("interno_prints").insert({ id, modulo, placa, path, mime,
    nombre: String(p.nombre || "").slice(0, 120), nota: String(p.nota || "").slice(0, 2000), orden: Number(count || 0), created_by: user });
  if (error) { await db.storage.from(BUCKET).remove([path]); return { ok: false, message: error.message }; }
  return { ok: true, print: { id, orden: Number(count || 0) } };
}

async function listarPrints(p: Json) {
  const modulo = String(p.modulo || ""); const placa = normPlaca(p.placa);
  if (!MODULOS.has(modulo) || !placa) return { ok: true, prints: [] };
  const { data, error } = await db.from("interno_prints").select("*").eq("modulo", modulo).eq("placa", placa)
    .order("orden").order("created_at");
  if (error) return { ok: false, message: error.message };
  const prints: Json[] = [];
  for (const r of data || []) {
    const dl = await db.storage.from(BUCKET).download(r.path);
    if (dl.error || !dl.data) continue;
    const bytes = new Uint8Array(await dl.data.arrayBuffer());
    prints.push({ id: r.id, nombre: r.nombre, nota: r.nota, orden: r.orden, mime: r.mime, createdBy: r.created_by, createdAt: r.created_at,
      dataUrl: `data:${r.mime};base64,${toBase64(bytes)}` });
  }
  return { ok: true, prints };
}

async function eliminarPrint(p: Json) {
  const { data: r } = await db.from("interno_prints").select("id,path").eq("id", String(p.id || "")).maybeSingle();
  if (!r) return { ok: true, message: "Ya no existía." };
  await db.storage.from(BUCKET).remove([r.path]);
  await db.from("interno_prints").delete().eq("id", r.id);
  return { ok: true, message: "Print eliminado." };
}

async function ordenarPrints(p: Json) {
  const ids = Array.isArray(p.ids) ? p.ids.map(String) : [];
  for (let i = 0; i < ids.length; i++) await db.from("interno_prints").update({ orden: i }).eq("id", ids[i]);
  return { ok: true };
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") || "";
  if (req.method === "OPTIONS") return new Response("ok", { headers: headers(origin) });
  let result: Json;
  try {
    const body = JSON.parse((await req.text()) || "{}");
    const s = await sesion(body.sessionToken);
    if (!s.ok) result = { ok: false, code: "AUTH_REQUIRED", message: s.message };
    else if (body.action === "subirPrint") result = await subirPrint(body, s.user);
    else if (body.action === "listarPrints") result = await listarPrints(body);
    else if (body.action === "eliminarPrint") result = await eliminarPrint(body);
    else if (body.action === "ordenarPrints") result = await ordenarPrints(body);
    else result = { ok: false, message: "Acción no válida." };
  } catch (e) {
    result = { ok: false, message: "Error en la solicitud: " + (e as Error).message };
  }
  return new Response(JSON.stringify(result), { status: 200, headers: headers(origin) });
});
