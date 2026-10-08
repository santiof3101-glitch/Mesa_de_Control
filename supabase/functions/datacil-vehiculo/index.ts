// Funcion antigua reemplazada por datacil-consulta. Se deja respondiendo
// sin datos para que ningun cliente viejo pueda leer el historial.
const ORIGIN = "https://santiof3101-glitch.github.io";

Deno.serve((req) => {
  const headers = {
    "Access-Control-Allow-Origin": ORIGIN,
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  };
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  return new Response(
    JSON.stringify({ ok: false, error: "Este servicio fue reemplazado. Recargue la pagina." }),
    { status: 410, headers },
  );
});
