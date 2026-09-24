const ALLOWED_ORIGINS = new Set([
  "https://santiof3101-glitch.github.io",
  "http://127.0.0.1:8787",
  "http://localhost:8787",
]);

const jsonHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://santiof3101-glitch.github.io",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
  Vary: "Origin",
});

function response(origin: string, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders(origin) });
}

function normalizePlate(value: unknown) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function getClientIp(req: Request) {
  return req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") || "";
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: jsonHeaders(origin) });
  if (req.method !== "POST") return response(origin, 405, { ok: false, error: "Metodo no permitido." });
  if (!ALLOWED_ORIGINS.has(origin)) return response(origin, 403, { ok: false, error: "Origen no autorizado." });

  const apiKey = Deno.env.get("DATACIL_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!apiKey || !supabaseUrl || !serviceRoleKey) {
    return response(origin, 503, { ok: false, error: "La integracion no esta configurada." });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return response(origin, 400, { ok: false, error: "Solicitud invalida." });
  }

  const action = String(body.action || "query").toLowerCase();
  const placa = normalizePlate(body.placa);
  const forceRefresh = body.forceRefresh === true;
  const advisor = typeof body.advisor === "object" && body.advisor ? body.advisor as Record<string, unknown> : {};
  if (!String(advisor.id || "").trim() || !String(advisor.name || "").trim()) {
    return response(origin, 401, { ok: false, error: "No se pudo validar al asesor comercial." });
  }

  const dbHeaders = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };

  const advisorRole = String(advisor.role || "").toLowerCase();
  if (!["commercial", "legal"].includes(advisorRole)) {
    return response(origin, 403, { ok: false, error: "Consulta ANT no habilitada para este perfil." });
  }
  const usersQuery = new URL(`${supabaseUrl}/rest/v1/REGISTROS`);
  usersQuery.searchParams.set("select", "datos");
  usersQuery.searchParams.set("modulo", "eq.usuarios");
  usersQuery.searchParams.set("tipo", "eq.base");
  usersQuery.searchParams.set("order", "id.desc");
  usersQuery.searchParams.set("limit", "1");
  try {
    const usersResponse = await fetch(usersQuery, { headers: dbHeaders });
    if (!usersResponse.ok) return response(origin, 503, { ok: false, error: "No se pudieron validar los permisos de Consulta ANT." });
    const rows = await usersResponse.json();
    const usersSnapshot = Array.isArray(rows) ? rows[0]?.datos : null;
    const users = advisorRole === "legal" ? usersSnapshot?.legalUsers : usersSnapshot?.commercialAdvisors;
    const allowed = Array.isArray(users) && users.some((user) =>
      String(user?.id || "") === String(advisor.id || "") && user?.datacilEnabled === true
    );
    if (!allowed) return response(origin, 403, { ok: false, error: "El administrador no ha habilitado Consulta ANT para este usuario." });
  } catch {
    return response(origin, 503, { ok: false, error: "No se pudieron validar los permisos de Consulta ANT." });
  }

  if (action === "list") {
    const listQuery = new URL(`${supabaseUrl}/rest/v1/REGISTROS`);
    listQuery.searchParams.set("select", "datos");
    listQuery.searchParams.set("modulo", "eq.datacil");
    listQuery.searchParams.set("tipo", "eq.vehiculo");
    listQuery.searchParams.set("order", "id.desc");
    listQuery.searchParams.set("limit", "200");
    try {
      const listResponse = await fetch(listQuery, { headers: dbHeaders });
      if (!listResponse.ok) return response(origin, 502, { ok: false, error: "No se pudo cargar el historial de consultas." });
      const rows = await listResponse.json();
      const seen = new Set<string>();
      const lookups = (Array.isArray(rows) ? rows : [])
        .map((row) => row?.datos)
        .filter((snapshot) => {
          const snapshotPlate = normalizePlate(snapshot?.placa);
          if (!snapshotPlate || seen.has(snapshotPlate)) return false;
          seen.add(snapshotPlate);
          return true;
        });
      return response(origin, 200, { ok: true, lookups });
    } catch {
      return response(origin, 502, { ok: false, error: "No se pudo cargar el historial de consultas." });
    }
  }

  if (!/^[A-Z]{3}[0-9]{3,4}$/.test(placa)) {
    return response(origin, 400, { ok: false, error: "Ingrese una placa ecuatoriana valida." });
  }

  const cacheQuery = new URL(`${supabaseUrl}/rest/v1/REGISTROS`);
  cacheQuery.searchParams.set("select", "datos");
  cacheQuery.searchParams.set("modulo", "eq.datacil");
  cacheQuery.searchParams.set("tipo", "eq.vehiculo");
  cacheQuery.searchParams.set("datos->>placa", `eq.${placa}`);
  cacheQuery.searchParams.set("order", "id.desc");
  cacheQuery.searchParams.set("limit", "1");

  try {
    const cachedResponse = await fetch(cacheQuery, { headers: dbHeaders });
    if (cachedResponse.ok) {
      const cachedRows = await cachedResponse.json();
      const cached = Array.isArray(cachedRows) ? cachedRows[0]?.datos : null;
      if (cached && !forceRefresh) {
        return response(origin, 200, { ok: true, cached: true, snapshot: cached });
      }
    }

    const datacilResponse = await fetch(
      `https://api.datacil.com/v1/ecuador/data/vehiculo/${encodeURIComponent(placa)}`,
      {
        headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
        signal: AbortSignal.timeout(30000),
      },
    );
    const rawText = await datacilResponse.text();
    let providerData: unknown = rawText;
    try {
      providerData = rawText ? JSON.parse(rawText) : {};
    } catch {}

    if (!datacilResponse.ok) {
      const messages: Record<number, string> = {
        401: "Datacil rechazo la credencial configurada.",
        402: "Datacil informa que no hay creditos disponibles.",
        403: "El servicio de vehiculos no esta habilitado en Datacil.",
        404: "Datacil no encontro informacion para esta placa.",
        429: "Datacil alcanzo el limite temporal de consultas.",
      };
      return response(origin, datacilResponse.status, {
        ok: false,
        error: messages[datacilResponse.status] || "Datacil no pudo completar la consulta.",
        providerStatus: datacilResponse.status,
      });
    }

    const queriedAt = new Date().toISOString();
    const snapshot = {
      version: 1,
      provider: "datacil",
      placa,
      queriedAt,
      queriedBy: {
        id: String(advisor.id || ""),
        name: String(advisor.name || ""),
        agency: String(advisor.agency || ""),
      },
      data: providerData,
    };
    const auditRecord = {
      modulo: "datacil",
      tipo: "vehiculo",
      datos: snapshot,
      usuario: `${String(advisor.name || "Asesor")} | ${getClientIp(req)}`,
    };
    const saveResponse = await fetch(`${supabaseUrl}/rest/v1/REGISTROS`, {
      method: "POST",
      headers: { ...dbHeaders, Prefer: "return=minimal" },
      body: JSON.stringify(auditRecord),
    });
    if (!saveResponse.ok) {
      return response(origin, 502, { ok: false, error: "La consulta se realizo, pero no pudo guardarse. No vuelva a consultar y contacte al administrador." });
    }
    return response(origin, 200, { ok: true, cached: false, snapshot });
  } catch (error) {
    const message = error instanceof DOMException && error.name === "TimeoutError"
      ? "Datacil tardo demasiado en responder."
      : "No se pudo conectar con Datacil.";
    return response(origin, 502, { ok: false, error: message });
  }
});
