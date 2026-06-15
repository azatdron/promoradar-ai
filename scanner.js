
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  try {
    const upstream = process.env.CRYPTORANK_API_URL;
    if (upstream) {
      const r = await fetch(upstream, { headers: { 'accept': 'application/json' } });
      if (!r.ok) throw new Error('Upstream HTTP ' + r.status);
      const data = await r.json();
      const raw = Array.isArray(data) ? data : (data.projects || data.opportunities || data.data || []);
      const projects = raw.map(normalize).filter(Boolean).filter(p => p.status !== 'finished');
      return res.status(200).json({ source: 'cryptorank-live', updated: new Date().toISOString(), projects });
    }
    return res.status(200).json({ source: 'scanner-demo', updated: new Date().toISOString(), note: 'Set CRYPTORANK_API_URL in Vercel env to enable real live source.', projects: demoProjects() });
  } catch (e) {
    return res.status(200).json({ source: 'scanner-fallback', error: String(e.message || e), updated: new Date().toISOString(), projects: demoProjects() });
  }
}
function normalize(x) {
  const name = x.name || x.title || x.projectName;
  if (!name) return null;
  const statusRaw = String(x.status || x.state || '').toLowerCase();
  const finished = /ended|finished|closed|distributed|claim ended/.test(statusRaw);
  return {
    name,
    type: x.type || x.category || 'Airdrop',
    coin: x.symbol || x.ticker || name.slice(0, 4).toUpperCase(),
    stake: x.stake || x.cost || '$0',
    potential: x.potential || x.reward || '$0–$0',
    score: Number(x.score || x.rating || 75),
    status: finished ? 'finished' : 'active',
    statusText: finished ? 'Finished' : 'Active',
    startDate: x.startDate || x.start || new Date().toISOString().slice(0, 10),
    endDate: x.endDate || x.deadline || daysFromNow(30),
    cat: ['best', 'free', 'potential', 'funds'],
    funds: x.funds || x.investors || [],
    fundsCount: Number(x.fundsCount || (x.funds || x.investors || []).length),
    time: x.time || '10–20 мин',
    difficulty: x.difficulty || 'Легко',
    icon: (x.symbol || name).slice(0, 2).toUpperCase(),
    domain: x.domain || '',
    siteUrl: x.siteUrl || x.website || x.url || '',
    actionUrl: x.actionUrl || x.activityUrl || x.url || x.website || '',
    x: x.x || x.twitter || '',
    docs: x.docs || '',
    guideSteps: x.guideSteps || ['Открыть страницу активности','Подключить отдельный кошелёк','Проверить условия кампании','Выполнить задания','Отметить прогресс'],
    counts: x.counts || ['Quest', 'Wallet activity', 'Testnet'],
    chance: x.chance || 'Шанс зависит от условий проекта и регулярности активности.',
    beginner: x.beginner || 'Проверь условия проекта перед выполнением.'
  };
}
function daysFromNow(n) { return new Date(Date.now() + n * 86400000).toISOString().slice(0, 10); }
function demoProjects() {
  return [{
    name: 'Nexus', type: 'Testnet', coin: 'NEX', stake: '$0', potential: '$30–$200',
    score: 82, status: 'active', statusText: 'Active', startDate: daysFromNow(-2), endDate: daysFromNow(45),
    cat: ['best','free','potential','funds'], funds: ['Pantera','Dragonfly'], fundsCount: 2,
    time: '10–15 мин', difficulty: 'Легко', icon: 'NX', domain: 'nexus.xyz',
    siteUrl: 'https://nexus.xyz/', actionUrl: 'https://nexus.xyz/', x: 'https://x.com/NexusLabs', docs: 'https://docs.nexus.xyz/',
    guideSteps: ['Открыть сайт проекта','Подключить кошелёк','Проверить testnet/quest','Выполнить доступные задания','Отметить прогресс'],
    counts: ['Testnet','Quest','Wallet activity'], chance: 'Средний шанс за раннюю активность.', beginner: 'Подходит новичку, если задания открыты.'
  }];
}
