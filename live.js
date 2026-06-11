// PromoRadar AI live data layer — v26 Real Reward Calculator
// Vercel Serverless Function. It checks official exchange pages and returns a unified
// reward model for the client. Some exchanges do not publish full pool/TVL data in a
// stable public API; when TVL/pool is missing, the client marks the card as APR/page based.

const UA = 'Mozilla/5.0 (PromoRadarAI/1.0; +https://promoradar-ai.vercel.app)';
const TIMEOUT_MS = 8000;

function json(res, code, body) {
  res.status(code).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}
async function fetchText(url) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const r = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'en,ru;q=0.8' }, signal: controller.signal });
    const text = await r.text();
    return { ok: r.ok, status: r.status, text, url };
  } finally { clearTimeout(t); }
}
function isEnded(text = '') {
  return /\b(ended|finished|completed|closed|expired|прошедшие|завершено|закончено)\b/i.test(text);
}
function findApr(text = '') {
  const m = text.match(/APR[^0-9]{0,40}([0-9]+(?:[.,][0-9]+)?)\s*%|([0-9]+(?:[.,][0-9]+)?)\s*%[^A-Za-zА-Яа-я]{0,30}APR/i);
  return m ? Number((m[1] || m[2]).replace(',', '.')) : null;
}
function leftLabel(endAt) {
  if (!endAt) return null;
  const diff = new Date(endAt).getTime() - Date.now();
  if (diff <= 0) return 'завершено';
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  return `${d} д. ${h} ч.`;
}
function profitByApr(deposit, apr, endAt) {
  const d = Number(deposit || 50);
  const leftDays = endAt ? Math.max(0, (new Date(endAt).getTime() - Date.now()) / 86400000) : 1;
  if (!apr || leftDays <= 0) return null;
  const est = d * (apr / 100) * (leftDays / 365);
  const fmt = (x) => x < 1 ? '<$1' : '$' + Math.round(x).toLocaleString('en-US');
  return `${fmt(est * 0.75)}–${fmt(est * 1.25)}`;
}

async function kucoinGemPool() {
  const endAt = '2026-06-14T00:00:00Z';
  const url = 'https://www.kucoin.com/gempool';
  const page = await fetchText(url);
  const apr = page.ok ? (findApr(page.text) || 180) : 180;
  return {
    id: 'kucoin-tea-gempool', ex: 'KuCoin', type: 'GemPool', name: 'TEA', coin: 'TEA', stake: 'KCS / USDT',
    endAt, left: leftLabel(endAt), active: page.ok && !isEnded(page.text), roi: apr ? `${Math.round(apr)}% APR` : 'до 180%',
    source: 'KuCoin GemPool', sourceUrl: url,
    realCalc: { method: 'apr_time_prorated', apr, source: 'KuCoin GemPool' },
    profitLive: profitByApr(50, apr, endAt), actions: ['GemPool', 'Spotlight', 'GemSpace']
  };
}
async function checkedOffer(id, ex, url, patch = {}) {
  try {
    const page = await fetchText(url);
    const apr = page.ok ? findApr(page.text) : null;
    const active = page.ok && !isEnded(page.text);
    return {
      id, ex, active, sourceUrl: url, source: `${ex} official page`,
      ...(apr ? { roi: `${Math.round(apr)}% APR`, realCalc: { method: 'apr_time_prorated', apr, source: `${ex} APR` }, profitLive: profitByApr(50, apr, patch.endAt) } : {}),
      ...patch
    };
  } catch (e) {
    return { id, ex, liveError: String(e.message || e), sourceUrl: url, ...patch };
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate=600');
  const out = { source: 'multi-exchange-live-v26-reward-calc', updatedAt: new Date().toISOString(), offers: [], providerStatus: [] };
  const tasks = [
    kucoinGemPool(),
    checkedOffer('bybit-xter-launch', 'Bybit', 'https://www.bybit.com/en/trade/spot/launchpad', { type: 'Launchpad', name: 'EXTER / MNT', coin: 'EXTER / MNT' }),
    checkedOffer('binance-lista-launchpool', 'Binance', 'https://www.binance.com/en/launchpool', { type: 'Launchpool' }),
    checkedOffer('okx-jumpstart', 'OKX', 'https://www.okx.com/jumpstart', { type: 'Jumpstart' }),
    checkedOffer('gate-launch-center', 'Gate', 'https://www.gate.com/launchpool', { type: 'Launch' }),
    checkedOffer('bitget-bgb-launchpool', 'Bitget', 'https://www.bitget.com/events/launchpool', { type: 'Launchpool' }),
    checkedOffer('mexc-kickstarter', 'MEXC', 'https://www.mexc.com/earn', { type: 'Kickstarter' }),
    checkedOffer('bingx-launchpad', 'BingX', 'https://bingx.com/en/launchpad/overview', { type: 'Launchpad' })
  ];
  const settled = await Promise.allSettled(tasks);
  for (const s of settled) {
    if (s.status === 'fulfilled') {
      out.offers.push(s.value);
      out.providerStatus.push({ ex: s.value.ex, ok: !s.value.liveError, active: s.value.active, url: s.value.sourceUrl || null, calc: s.value.realCalc?.method || null });
    } else {
      out.providerStatus.push({ ok: false, error: String(s.reason) });
    }
  }
  json(res, 200, out);
}
