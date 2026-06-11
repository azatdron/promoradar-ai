const TIMEOUT_MS = 8000;
const UA = 'Mozilla/5.0 (PromoRadarAI LinkValidator/1.0)';

function send(res, code, body) {
  res.status(code).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function safeUrl(raw) {
  try {
    const u = new URL(raw);
    if (!['https:', 'http:'].includes(u.protocol)) return null;
    return u;
  } catch (_) { return null; }
}

export default async function handler(req, res) {
  const raw = req.query?.url || '';
  const url = safeUrl(raw);
  if (!url) return send(res, 400, { ok: false, status: 0, reason: 'bad-url' });
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let r = await fetch(url.toString(), {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'user-agent': UA, 'accept': 'text/html,*/*' },
      signal: controller.signal
    }).catch(async () => fetch(url.toString(), {
      method: 'GET',
      redirect: 'follow',
      headers: { 'user-agent': UA, 'accept': 'text/html,*/*' },
      signal: controller.signal
    }));
    const ok = (r.status >= 200 && r.status < 400) || r.status === 401 || r.status === 403;
    send(res, 200, { ok, status: r.status, finalUrl: r.url, checkedAt: new Date().toISOString() });
  } catch (e) {
    send(res, 200, { ok: false, status: 0, reason: String(e.message || e), checkedAt: new Date().toISOString() });
  } finally {
    clearTimeout(t);
  }
}
