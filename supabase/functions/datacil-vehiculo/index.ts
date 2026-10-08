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

function normalizePlate(value: unknown) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function getClientIp(req: Request) {
  return req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

type AutocorUser = { role: string; id: string; name: string; agency: string };

// El usuario se obtiene del token de Supabase Auth, no de lo que envia el navegador.
async function getAuthenticatedUser(req: Request, supabaseUrl: string, apiKey: string): Promise<AutocorUser | null> {
  const authorization = req.headers.get("authorization") || "";
  if (!/^Bearer\s+ey/i.test(authorization)) return null;
  const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { Authorization: authorization, apikey: apiKey },
  });
  if (!userResponse.ok) return null;
  const user = await userResponse.json().catch(() => null);
  const appMeta = user?.app_metadata || {};
  const role = String(appMeta.autocor_role || "");
  const id = String(appMeta.autocor_id || "");
  if (!role || !id) return null;
  return { role, id, name: String(user?.user_metadata?.name || ""), agency: "" };
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") || "";
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: jsonHeaders(origin) });
  if (req.method !== "POST") return response(origin, 405, { ok: false, error: "Metodo no permitido." });
  if (!ALLOWED_ORIGINS.has(origin)) return response(origin, 403, { ok: false, error: "Origen no autorizado." });

  const apiKey = Deno.env.get("DATACIL_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || serviceRoleKey;
  if (!apiKey || !supabaseUrl || !serviceRoleKey || !anonKey) {
    return response(origin, 503, { ok: false, error: "La integracion no esta configurada." });
  }

  let advisor: AutocorUser | null = null;
  try {
    advisor = await getAuthenticatedUser(req, supabaseUrl, anonKey);
  } catch {
    advisor = null;
  }
  if (!advisor) {
    return response(origin, 401, { ok: false, error: "Su sesion no es valida. Ingrese nuevamente." });
  }
  if (!["commercial", "legal"].includes(advisor.role)) {
    return response(origin, 403, { ok: false, error: "Consulta ANT no habilitada para este perfil." });
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

  const dbHeaders = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };

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
    const users = advisor.role === "legal" ? usersSnapshot?.legalUsers : usersSnapshot?.commercialAdvisors;
    const record = Array.isArray(users)
      ? users.find((user: Record<string, unknown>) => String(user?.id || "") === advisor!.id)
      : null;
    if (!record || record.datacilEnabled !== true) {
      return response(origin, 403, { ok: false, error: "El administrador no ha habilitado Consulta ANT para este usuario." });
    }
    advisor.name = String(record.name || advisor.name || "Asesor");
    advisor.agency = String(record.agency || "");
  } catch {
    return response(origin, 503, { ok: false, error: "No se pudieron validar los permisos de Consulta ANT." });
  }

  type LookupSummary = { placa: string; queriedAt: string; byId: string; byName: string };

  // Resumen liviano de consultas (sin el detalle de Datacil).
  async function fetchSummaries(filters: Record<string, string>, tipo = "vehiculo"): Promise<LookupSummary[]> {
    const query = new URL(`${supabaseUrl}/rest/v1/REGISTROS`);
    query.searchParams.set(
      "select",
      tipo === "vehiculo"
        ? "placa:datos->>placa,queriedAt:datos->>queriedAt,byId:datos->queriedBy->>id,byName:datos->queriedBy->>name"
        : "placa:datos->>placa,queriedAt:datos->>at,byId:datos->>userId,byName:datos->>userName",
    );
    query.searchParams.set("modulo", "eq.datacil");
    query.searchParams.set("tipo", `eq.${tipo}`);
    query.searchParams.set("order", "id.desc");
    query.searchParams.set("limit", "2000");
    Object.entries(filters).forEach(([key, value]) => query.searchParams.set(key, value));
    const result = await fetch(query, { headers: dbHeaders });
    if (!result.ok) throw new Error("summaries");
    const rows = await result.json();
    return (Array.isArray(rows) ? rows : []).map((row) => ({
      placa: normalizePlate(row?.placa),
      queriedAt: String(row?.queriedAt || ""),
      byId: String(row?.byId || ""),
      byName: String(row?.byName || ""),
    })).filter((row) => row.placa);
  }

  async function fetchLatestSnapshots(plates: string[]) {
    if (!plates.length) return new Map<string, unknown>();
    const query = new URL(`${supabaseUrl}/rest/v1/REGISTROS`);
    query.searchParams.set("select", "datos");
    query.searchParams.set("modulo", "eq.datacil");
    query.searchParams.set("tipo", "eq.vehiculo");
    query.searchParams.set("datos->>placa", `in.(${plates.join(",")})`);
    query.searchParams.set("order", "id.desc");
    const result = await fetch(query, { headers: dbHeaders });
    if (!result.ok) throw new Error("snapshots");
    const rows = await result.json();
    const latest = new Map<string, unknown>();
    (Array.isArray(rows) ? rows : []).forEach((row) => {
      const snapshotPlate = normalizePlate(row?.datos?.placa);
      if (snapshotPlate && !latest.has(snapshotPlate)) latest.set(snapshotPlate, row.datos);
    });
    return latest;
  }

  // Deja constancia de que el usuario uso una consulta guardada de otra persona,
  // para que tambien aparezca en su historial (no consume credito).
  async function recordAccess(snapshotPlate: string, ownerId: string) {
    if (!snapshotPlate || ownerId === advisor!.id) return;
    await fetch(`${supabaseUrl}/rest/v1/REGISTROS`, {
      method: "POST",
      headers: { ...dbHeaders, Prefer: "return=minimal" },
      body: JSON.stringify({
        modulo: "datacil",
        tipo: "acceso",
        datos: { placa: snapshotPlate, userId: advisor!.id, userName: advisor!.name, agency: advisor!.agency, at: new Date().toISOString() },
        usuario: `${advisor!.name || "Asesor"} | ${getClientIp(req)}`,
      }),
    }).catch(() => null);
  }

  if (action === "list") {
    // Un asesor comercial solo ve sus consultas; la mesa de control puede ver todas.
    const canSeeAll = advisor.role === "legal";
    const scope = canSeeAll && body.scope !== "mine" ? "all" : "mine";
    const search = normalizePlate(body.search);
    const advisorFilter = canSeeAll ? String(body.advisorId || "").trim() : "";
    const limit = Math.min(Math.max(Number(body.limit) || 10, 1), 50);
    const offset = Math.max(Number(body.offset) || 0, 0);
    try {
      let summaries: LookupSummary[];
      if (scope === "mine") {
        const [own, accessed] = await Promise.all([
          fetchSummaries({ "datos->queriedBy->>id": `eq.${advisor.id}` }),
          fetchSummaries({ "datos->>userId": `eq.${advisor.id}` }, "acceso"),
        ]);
        summaries = [...own, ...accessed];
      } else {
        summaries = await fetchSummaries(advisorFilter ? { "datos->queriedBy->>id": `eq.${advisorFilter}` } : {});
      }
      summaries.sort((x, y) => y.queriedAt.localeCompare(x.queriedAt));
      const advisorsMap = new Map<string, string>();
      if (scope === "all" && !advisorFilter) summaries.forEach((row) => row.byId && advisorsMap.set(row.byId, row.byName || row.byId));
      const seen = new Set<string>();
      const unique = summaries.filter((row) => {
        if (seen.has(row.placa)) return false;
        seen.add(row.placa);
        return !search || row.placa.includes(search);
      });
      const page = unique.slice(offset, offset + limit);
      const snapshots = await fetchLatestSnapshots(page.map((row) => row.placa));
      const lookups = page.map((row) => snapshots.get(row.placa)).filter(Boolean);
      return response(origin, 200, {
        ok: true,
        scope,
        lookups,
        total: unique.length,
        hasMore: offset + limit < unique.length,
        advisors: [...advisorsMap].map(([id, name]) => ({ id, name })).sort((x, y) => x.name.localeCompare(y.name)),
      });
    } catch {
      return response(origin, 502, { ok: false, error: "No se pudo cargar el historial de consultas." });
    }
  }

  if (action === "find") {
    // Busca una consulta guardada por placa sin llamar a Datacil.
    if (!/^[A-Z]{3}[0-9]{3,4}$/.test(placa)) return response(origin, 200, { ok: true, snapshot: null });
    try {
      const snapshots = await fetchLatestSnapshots([placa]);
      return response(origin, 200, { ok: true, snapshot: snapshots.get(placa) || null });
    } catch {
      return response(origin, 502, { ok: false, error: "No se pudo buscar la consulta guardada." });
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
        await recordAccess(placa, String(cached?.queriedBy?.id || ""));
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
        id: advisor.id,
        name: advisor.name,
        agency: advisor.agency,
      },
      data: providerData,
    };
    const auditRecord = {
      modulo: "datacil",
      tipo: "vehiculo",
      datos: snapshot,
      usuario: `${advisor.name || "Asesor"} | ${getClientIp(req)}`,
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
