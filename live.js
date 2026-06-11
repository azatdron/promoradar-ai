export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=900');
  const out = { source: 'live', updatedAt: new Date().toISOString(), offers: [] };
  try {
    const url = 'https://www.kucoin.com/gempool';
    const page = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 PromoRadarBot/1.0' } });
    const text = await page.text();
    const pool = text.match(/Total Pool Amount \(TEA\)[\s\S]{0,80}([\d,]+)|([\d,]+)\s*Total Pool Amount \(TEA\)/i);
    const end = text.match(/End Time:\s*06\/14\s*00:00\s*\(UTC\)|End Time[^\d]*(06\/14 00:00)/i);
    const aprKcs = text.match(/KCS Pool[\s\S]{0,400}?APR\s*([\d.]+)%/i);
    const aprTea = text.match(/TEA Pool[\s\S]{0,400}?APR\s*([\d.]+)%/i);
    const totalLockedKcs = text.match(/Total Locked \(KCS\)\s*([\d,]+)/i);
    out.offers.push({
      id: 'kucoin-tea-gempool',
      ex: 'KuCoin',
      type: 'GemPool',
      name: 'TEA',
      coin: 'TEA',
      stake: 'KCS / USDT',
      endAt: '2026-06-14T00:00:00Z',
      left: null,
      source: 'KuCoin GemPool',
      realCalc: {
        method: 'apr_time_prorated',
        apr: aprKcs ? Number(aprKcs[1]) : null,
        maxApr: aprTea ? Number(aprTea[1]) : null,
        rewardPoolTEA: pool ? Number((pool[1] || pool[2] || '0').replace(/,/g, '')) : 133333333,
        totalLockedKCS: totalLockedKcs ? Number(totalLockedKcs[1].replace(/,/g, '')) : null
      },
      roi: aprKcs ? `${aprKcs[1]}% APR` : 'live APR',
      actions: ['GemPool', 'Spotlight', 'GemSpace']
    });
  } catch (e) {
    out.source = 'static-fallback';
    out.error = String(e.message || e);
  }
  res.status(200).json(out);
}
