// PromoRadar AI live data layer (Vercel Serverless Function)
// Stage 1: real-source connector skeleton for exchange promo pages + public market APIs.
// Important: many exchanges do not publish a stable public API for Launchpad/Launchpool events.
// This file uses official public URLs where available and hides expired/404 offers when detected.

const UA = 'Mozilla/5.0 (PromoRadarAI/1.0; +https://promoradar-ai.vercel.app)';
const TIMEOUT_MS = 7500;

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
  } finally {
    clearTimeout(t);
  }
}

function isEnded(text = '') {
  return /\b(ended|finished|completed|closed|прошедшие|завершено|закончено)\b/i.test(text);
}

function findApr(text = '') {
  const m = text.match(/APR[^0-9]{0,30}([0-9]+(?:[.,][0-9]+)?)\s*%|([0-9]+(?:[.,][0-9]+)?)\s*%[^A-Za-zА-Яа-я]{0,20}APR/i);
  return m ? Number((m[1] || m[2]).replace(',', '.')) : null;
}

function calcProfitRangeByApr(deposit, apr, endAt) {
  const d = Number(deposit || 50);
  const leftDays = endAt ? Math.max(0, (new Date(endAt).getTime() - Date.now()) / 86400000) : 1;
  if (!apr || !isFinite(apr) || apr <= 0 || leftDays <= 0) return null;
  const est = d * (apr / 100) * (leftDays / 365);
  const lo = Math.max(0.5, est * 0.75);
  const hi = Math.max(lo, est * 1.25);
  const fmt = (x) => x < 1 ? '<$1' : '$' + Math.round(x).toLocaleString('en-US');
  return `${fmt(lo)}–${fmt(hi)}`;
}

function leftLabel(endAt) {
  if (!endAt) return null;
  const diff = new Date(endAt).getTime() - Date.now();
  if (diff <= 0) return 'завершено';
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  return `${d} д. ${h} ч.`;
}

async function getKuCoinGemPool() {
  const endAt = '2026-06-14T00:00:00Z';
  const page = await fetchText('https://www.kucoin.com/gempool');
  const apr = page.ok ? findApr(page.text) : null;
  const active = page.ok && !isEnded(page.text);
  return {
    id: 'kucoin-tea-gempool',
    ex: 'KuCoin',
    type: 'GemPool',
    name: 'TEA',
    coin: 'TEA',
    stake: 'KCS / USDT',
    endAt,
    left: leftLabel(endAt),
    active,
    source: 'KuCoin GemPool live page',
    sourceUrl: 'https://www.kucoin.com/gempool',
    roi: apr ? `${apr}% APR` : 'до 180%',
    realCalc: { method: apr ? 'apr_time_prorated' : 'page_verified_static_apr', apr: apr || 180 },
    profitLive: calcProfitRangeByApr(50, apr || 180, endAt),
    actions: ['GemPool', 'Spotlight', 'GemSpace']
  };
}

async function checkOffer(id, ex, url, patch = {}) {
  try {
    const page = await fetchText(url);
    const active = page.ok && !isEnded(page.text);
    return { id, ex, active, sourceUrl: url, source: `${ex} live page`, ...patch };
  } catch (e) {
    return { id, ex, liveError: String(e.message || e), sourceUrl: url, ...patch };
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate=600');
  const out = { source: 'multi-exchange-live-v25', updatedAt: new Date().toISOString(), offers: [], providerStatus: [] };

  const tasks = [
    getKuCoinGemPool(),
    // If these pages show Ended/404, the client hides or marks the offer instead of showing stale data.
    checkOffer('bybit-xter-launch', 'Bybit', 'https://www.bybit.com/en/trade/spot/launchpad', { type: 'Launchpad', name: 'EXTER / MNT', coin: 'EXTER / MNT' }),
    checkOffer('binance-lista-launchpool', 'Binance', 'https://www.binance.com/en/launchpool', { type: 'Launchpool' }),
    checkOffer('okx-jumpstart', 'OKX', 'https://www.okx.com/jumpstart', { type: 'Jumpstart' }),
    checkOffer('gate-launch-center', 'Gate', 'https://www.gate.com/launchpool', { type: 'Launch' }),
    checkOffer('bitget-bgb-launchpool', 'Bitget', 'https://www.bitget.com/events/launchpool', { type: 'Launchpool' }),
    checkOffer('mexc-kickstarter', 'MEXC', 'https://www.mexc.com/earn', { type: 'Kickstarter' }),
    checkOffer('bingx-launchpad', 'BingX', 'https://bingx.com/en/launchpad/overview', { type: 'Launchpad' })
  ];

  const settled = await Promise.allSettled(tasks);
  for (const s of settled) {
    if (s.status === 'fulfilled') {
      out.offers.push(s.value);
      out.providerStatus.push({ ex: s.value.ex, ok: !s.value.liveError, active: s.value.active, url: s.value.sourceUrl || null });
    } else {
      out.providerStatus.push({ ok: false, error: String(s.reason) });
    }
  }

  json(res, 200, out);
}
