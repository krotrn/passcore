export async function fetchRequest(url: string, method: string, body?: any) {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  if (body != null) headers.append('Content-Type', 'application/json');

  const res = await fetch(url, {
    method,
    body: body ?? null,
    headers
  });

  const text = await res.text();
  let data: any = {};
  if (text) {
    try { data = JSON.parse(text); } catch (e) { data = text; }
  }

  return { ok: res.ok, status: res.status, data };
}