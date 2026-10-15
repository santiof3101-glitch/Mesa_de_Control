// Feria Automundo: lee la foto de una matricula vehicular y devuelve sus datos.
// Usa Google Gemini (secreto GEMINI_API_KEY) o, si no existe, Anthropic (ANTHROPIC_API_KEY).
const ALLOWED_ORIGINS = new Set([
  "https://santiof3101-glitch.github.io",
  "http://127.0.0.1:8787",
  "http://localhost:8787",
]);

const jsonHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://santiof3101-glitch.github.io",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
  Vary: "Origin",
});

function response(origin: string, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders(origin) });
}

async function getRole(req: Request, supabaseUrl: string, apiKey: string): Promise<string> {
  const authorization = req.headers.get("authorization") || "";
  if (!/^Bearer\s+ey/i.test(authorization)) return "";
  const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { Authorization: authorization, apikey: apiKey },
  });
  if (!userResponse.ok) return "";
  const user = await userResponse.json().catch(() => null);
  return String(user?.app_metadata?.autocor_role || "");
}

const PROMPT = `Estas imagenes son el frente y/o el reverso de una matricula vehicular de Ecuador (documento de la ANT).
Combina la informacion de todas las imagenes.
Extrae los datos y responde SOLO con un objeto JSON con estas claves:
{"placa": "", "propietario": "", "cedula": "", "marca": "", "modelo": "", "anio": "", "color": "", "chasis": "", "motor": "", "clase": "", "servicio": ""}
Reglas: placa sin guiones ni espacios (ejemplo PBX1234); cedula o RUC solo con digitos;
anio con cuatro digitos; textos en mayusculas tal como aparecen.
Si un dato no se ve con claridad deja la cadena vacia. Si las imagenes no son una matricula,
devuelve todas las claves vacias.`;

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") || "";
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: jsonHeaders(origin) });
  if (req.method !== "POST") return response(origin, 405, { ok: false, error: "Metodo no permitido." });
  if (!ALLOWED_ORIGINS.has(origin)) return response(origin, 403, { ok: false, error: "Origen no autorizado." });

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const geminiKey = Deno.env.get("GEMINI_API_KEY") || "";
  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY") || "";

  const role = await getRole(req, supabaseUrl, anonKey).catch(() => "");
  if (!["commercial", "legal", "admin"].includes(role)) {
    return response(origin, 401, { ok: false, error: "Su sesion no es valida. Ingrese nuevamente." });
  }
  if (!geminiKey && !anthropicKey) {
    return response(origin, 503, { ok: false, error: "La lectura automatica de matriculas aun no esta configurada. Llene los datos o use Consulta ANT." });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return response(origin, 400, { ok: false, error: "Solicitud invalida." });
  }
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const rawImages = Array.isArray(body.images) ? body.images : [{ image: body.image, mediaType: body.mediaType }];
  const images = rawImages.slice(0, 2).map((item: Record<string, unknown>) => ({
    data: String(item?.image || ""),
    mediaType: allowedTypes.includes(String(item?.mediaType)) ? String(item?.mediaType) : "image/jpeg",
  })).filter((item) => item.data);
  const totalSize = images.reduce((sum, item) => sum + item.data.length, 0);
  if (!images.length || totalSize > 12_000_000) {
    return response(origin, 400, { ok: false, error: "Las fotos no son validas o son demasiado grandes." });
  }

  try {
    let text = "";
    if (geminiKey) {
      // Si un modelo esta saturado (503/429) se prueba con el siguiente.
      const models = (Deno.env.get("GEMINI_MODEL") || "gemini-3.8-flash,gemini-3.5-flash-lite,gemini-3.6-flash,gemini-3.5-flash")
        .split(",").map((item) => item.trim()).filter(Boolean);
      let lastStatus = 0;
      for (const model of models) {
        const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
          method: "POST",
          headers: { "x-goog-api-key": geminiKey, "content-type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [...images.map((item) => ({ inline_data: { mime_type: item.mediaType, data: item.data } })), { text: PROMPT }] }],
            generationConfig: { temperature: 0, responseMimeType: "application/json" },
          }),
          signal: AbortSignal.timeout(40000),
        });
        lastStatus = aiResponse.status;
        const payload = await aiResponse.json().catch(() => null);
        if (aiResponse.ok) {
          text = (payload?.candidates?.[0]?.content?.parts || []).map((part: { text?: string }) => part?.text || "").join("");
          break;
        }
        if (![429, 500, 503].includes(aiResponse.status)) break;
      }
      if (!text) {
        const busy = [429, 503].includes(lastStatus);
        return response(origin, 502, {
          ok: false,
          error: busy
            ? "El servicio de lectura esta saturado en este momento. Intente en unos segundos o use Consulta ANT."
            : "El servicio de lectura no respondio. Llene los datos o use Consulta ANT.",
        });
      }
    } else {
      const model = Deno.env.get("ANTHROPIC_MODEL") || "claude-sonnet-5-5";
      const aiResponse = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "x-api-key": anthropicKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
        body: JSON.stringify({
          model,
          max_tokens: 600,
          messages: [{
            role: "user",
            content: [
              ...images.map((item) => ({ type: "image", source: { type: "base64", media_type: item.mediaType, data: item.data } })),
              { type: "text", text: PROMPT },
            ],
          }],
        }),
        signal: AbortSignal.timeout(45000),
      });
      const payload = await aiResponse.json().catch(() => null);
      if (!aiResponse.ok) {
        return response(origin, 502, { ok: false, error: "El servicio de lectura no respondio. Llene los datos o use Consulta ANT." });
      }
      text = (payload?.content || []).map((part: { text?: string }) => part?.text || "").join("");
    }
    const match = text.match(/\{[\s\S]*\}/);
    const parsed = match ? JSON.parse(match[0]) : {};
    const clean = (value: unknown) => String(value ?? "").trim().slice(0, 120);
    const data = {
      placa: clean(parsed.placa).toUpperCase().replace(/[^A-Z0-9]/g, ""),
      propietario: clean(parsed.propietario).toUpperCase(),
      cedula: clean(parsed.cedula).replace(/\D/g, ""),
      marca: clean(parsed.marca).toUpperCase(),
      modelo: clean(parsed.modelo).toUpperCase(),
      anio: clean(parsed.anio).replace(/\D/g, "").slice(0, 4),
      color: clean(parsed.color).toUpperCase(),
      chasis: clean(parsed.chasis).toUpperCase(),
      motor: clean(parsed.motor).toUpperCase(),
      clase: clean(parsed.clase).toUpperCase(),
      servicio: clean(parsed.servicio).toUpperCase(),
    };
    return response(origin, 200, { ok: true, data });
  } catch (error) {
    const message = error instanceof DOMException && error.name === "TimeoutError"
      ? "La lectura tardo demasiado. Intente de nuevo."
      : "No se pudo leer la matricula.";
    return response(origin, 502, { ok: false, error: message });
  }
});
