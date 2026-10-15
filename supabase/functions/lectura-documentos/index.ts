// Lee la foto de un documento (cedula del cliente o matricula del vehiculo) y devuelve sus datos.
// Lo usa el formulario de compra. Usa Google Gemini (secreto GEMINI_API_KEY) o, si no existe,
// Anthropic (ANTHROPIC_API_KEY). Body: { tipo: "cedula" | "matricula", images: [{ image, mediaType }] }.
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

// Cada documento: claves que se devuelven -> como aparecen en el documento.
const DOCUMENTS: Record<string, { fields: Record<string, string>; intro: string; rules: string }> = {
  matricula: {
    intro: "Estas imagenes son el frente y/o el reverso de una matricula vehicular de Ecuador (documento de la ANT o de un municipio como la AMT).",
    fields: {
      placa: "PLACA ACTUAL",
      propietario: "NOMBRE DEL PROPIETARIO",
      cedula: "C.I. / PASAPORTE / RUC del propietario",
      marca: "MARCA",
      modelo: "MODELO",
      anio: "AÑO (año de fabricacion)",
      color: "COLOR 1",
      chasis: "NUMERO VIN (CHASIS)",
      motor: "NUMERO MOTOR",
      clase: "CLASE DE VEHICULO (por ejemplo VEHICULO UTILITARIO, AUTOMOVIL)",
      servicio: "CLASE DE TRANSPORTE o SERVICIO (por ejemplo PARTICULAR)",
      numeroMatricula: "numero de la matricula (numero grande junto al nombre del propietario)",
      placaAnterior: "PLACA ANTERIOR",
      anioModelo: "AÑO MODELO",
      ramv: "RAMV / CPN",
      cilindraje: "CILINDRAJE",
      tipoVehiculo: "TIPO DE VEHICULO",
      combustible: "COMBUSTIBLE",
      carroceria: "CARROCERIA",
      pasajeros: "PASAJEROS",
      tonelaje: "TONELADAS",
      tipoPeso: "TIPO DE PESO",
      paisOrigen: "PAIS DE ORIGEN",
      color2: "COLOR 2",
      remarcado: "REMARCADO",
      ortopedico: "ORTOPEDICO",
      tipoTransporte: "TIPO DE TRANSPORTE (MODALIDAD)",
      ambitoOperacion: "AMBITO DE OPERACION",
      provincia: "PROVINCIA",
      canton: "CANTON",
      domicilio: "DOMICILIO",
      telefonoPropietario: "TELEFONO",
      avaluo: "AVALUO",
      valorMatricula: "VALOR MATRICULA",
      fechaCompra: "FECHA COMPRA",
      fechaEmision: "FECHA EMISION",
      fechaCaducidad: "FECHA CADUCA",
      lugarEmision: "LUGAR EMISION",
      observacionesMatricula: "OBSERVACIONES",
    },
    rules: "placa sin guiones ni espacios (ejemplo PBX1234); cedula o RUC solo con digitos; anio y anioModelo con cuatro digitos.",
  },
  cedula: {
    intro: "Estas imagenes son el frente y/o el reverso de una cedula de identidad de Ecuador (modelo anterior o nuevo documento de identidad del Registro Civil).",
    fields: {
      cedula: "numero de cedula o NUI (10 digitos)",
      apellidos: "APELLIDOS",
      nombres: "NOMBRES",
      fechaNacimiento: "FECHA DE NACIMIENTO",
      lugarNacimiento: "LUGAR DE NACIMIENTO",
      nacionalidad: "NACIONALIDAD",
      sexo: "SEXO",
      estadoCivil: "ESTADO CIVIL",
      conyuge: "CONYUGE (nombre del conyuge, si aparece)",
      instruccion: "INSTRUCCION",
      profesion: "PROFESION / OCUPACION",
      nombrePadre: "APELLIDOS Y NOMBRES DEL PADRE",
      nombreMadre: "APELLIDOS Y NOMBRES DE LA MADRE",
      lugarExpedicion: "LUGAR DE EXPEDICION",
      fechaExpedicion: "FECHA DE EXPEDICION o EMISION",
      fechaExpiracion: "FECHA DE EXPIRACION o VENCIMIENTO",
      codigoDactilar: "codigo dactilar (por ejemplo V4443V4442, en el reverso)",
      numeroDocumento: "NUMERO DE DOCUMENTO (solo en el documento nuevo, distinto del NUI)",
    },
    rules: "cedula solo con digitos; codigoDactilar sin espacios.",
  },
};

function buildPrompt(tipo: string) {
  const doc = DOCUMENTS[tipo];
  const empty = JSON.stringify(Object.fromEntries(Object.keys(doc.fields).map((key) => [key, ""])));
  return `${doc.intro}
Combina la informacion de todas las imagenes y extrae TODOS los datos que aparecen.
Responde SOLO con un objeto JSON con estas claves:
${empty}
Donde va cada dato: ${Object.entries(doc.fields).map(([key, label]) => `${key}: ${label}`).join("; ")}.
Reglas: ${doc.rules} Fechas tal como aparecen (ejemplo 27-NOV-2025); textos en mayusculas.
Si una casilla esta vacia, tiene solo guiones o no se ve con claridad, deja la cadena vacia. Si las imagenes no son el documento indicado,
devuelve todas las claves vacias.`;
}

function cleanData(tipo: string, parsed: Record<string, unknown>) {
  const doc = DOCUMENTS[tipo];
  const clean = (value: unknown) => String(value ?? "").trim().slice(0, 120).toUpperCase();
  const data: Record<string, string> = {};
  for (const key of Object.keys(doc.fields)) {
    let value = clean(parsed[key]);
    if (/^[-_.\s]*$/.test(value)) value = "";
    if (key === "placa" || key === "placaAnterior") value = value.replace(/[^A-Z0-9]/g, "");
    if (key === "cedula") value = value.replace(/\D/g, "");
    if (key === "anio" || key === "anioModelo") value = value.replace(/\D/g, "").slice(0, 4);
    if (key === "codigoDactilar") value = value.replace(/\s/g, "");
    data[key] = value;
  }
  return data;
}

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
    return response(origin, 503, { ok: false, error: "La lectura automatica de documentos aun no esta configurada. Llene los datos a mano." });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return response(origin, 400, { ok: false, error: "Solicitud invalida." });
  }
  const tipo = String(body.tipo || "");
  if (!DOCUMENTS[tipo]) return response(origin, 400, { ok: false, error: "Tipo de documento no valido." });
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const rawImages = Array.isArray(body.images) ? body.images : [];
  const images = rawImages.slice(0, 2).map((item: Record<string, unknown>) => ({
    data: String(item?.image || ""),
    mediaType: allowedTypes.includes(String(item?.mediaType)) ? String(item?.mediaType) : "image/jpeg",
  })).filter((item) => item.data);
  const totalSize = images.reduce((sum, item) => sum + item.data.length, 0);
  if (!images.length || totalSize > 12_000_000) {
    return response(origin, 400, { ok: false, error: "Las fotos no son validas o son demasiado grandes." });
  }

  const prompt = buildPrompt(tipo);
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
            contents: [{ parts: [...images.map((item) => ({ inline_data: { mime_type: item.mediaType, data: item.data } })), { text: prompt }] }],
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
            ? "El servicio de lectura esta saturado en este momento. Intente en unos segundos."
            : "El servicio de lectura no respondio. Llene los datos a mano.",
        });
      }
    } else {
      const model = Deno.env.get("ANTHROPIC_MODEL") || "claude-sonnet-5-5";
      const aiResponse = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "x-api-key": anthropicKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
        body: JSON.stringify({
          model,
          max_tokens: 1500,
          messages: [{
            role: "user",
            content: [
              ...images.map((item) => ({ type: "image", source: { type: "base64", media_type: item.mediaType, data: item.data } })),
              { type: "text", text: prompt },
            ],
          }],
        }),
        signal: AbortSignal.timeout(45000),
      });
      const payload = await aiResponse.json().catch(() => null);
      if (!aiResponse.ok) {
        return response(origin, 502, { ok: false, error: "El servicio de lectura no respondio. Llene los datos a mano." });
      }
      text = (payload?.content || []).map((part: { text?: string }) => part?.text || "").join("");
    }
    const match = text.match(/\{[\s\S]*\}/);
    const parsed = match ? JSON.parse(match[0]) : {};
    return response(origin, 200, { ok: true, tipo, data: cleanData(tipo, parsed) });
  } catch (error) {
    const message = error instanceof DOMException && error.name === "TimeoutError"
      ? "La lectura tardo demasiado. Intente de nuevo."
      : "No se pudo leer el documento.";
    return response(origin, 502, { ok: false, error: message });
  }
});
