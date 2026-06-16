
// PromoRadar AI v73 CryptoRank API Scanner
// Vercel env:
// CRYPTORANK_API_KEY = твой CryptoRank API key
// CRYPTORANK_API_URL = реальный endpoint CryptoRank, который отдаёт Drop Hunting / activities JSON
// Пример: endpoint из CryptoRank API docs/dashboard. Ключ передаётся в header x-api-key.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  const apiKey = process.env.CRYPTORANK_API_KEY || '';
  const apiUrl = process.env.CRYPTORANK_API_URL || '';

  try {
    if (!apiUrl) {
      return res.status(200).json({
        source: 'scanner-not-configured',
        mode: 'fallback',
        updated: new Date().toISOString(),
        message: 'Add CRYPTORANK_API_URL and CRYPTORANK_API_KEY in Vercel env.',
        projects: demoProjects()
      });
    }

    const upstream = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        ...(apiKey ? {'x-api-key': apiKey} : {})
      }
    });

    if (!upstream.ok) {
      throw new Error('CryptoRank HTTP ' + upstream.status);
    }

    const data = await upstream.json();
    const raw = extractList(data);
    const projects = raw
      .map(normalizeCryptoRank)
      .filter(Boolean)
      .filter(p => p.status !== 'finished')
      .sort((a, b) => Number(b.score || 0) - Number(a.score || 0));

    return res.status(200).json({
      source: 'cryptorank-api',
      mode: 'live',
      updated: new Date().toISOString(),
      total: projects.length,
      projects
    });

  } catch (e) {
    return res.status(200).json({
      source: 'scanner-error-fallback',
      mode: 'fallback',
      error: String(e.message || e),
      updated: new Date().toISOString(),
      projects: demoProjects()
    });
  }
}

function extractList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.result)) return data.result;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.projects)) return data.projects;
  if (Array.isArray(data.opportunities)) return data.opportunities;
  if (data.data && Array.isArray(data.data.items)) return data.data.items;
  if (data.data && Array.isArray(data.data.result)) return data.data.result;
  return [];
}

function normalizeCryptoRank(x) {
  const name = x.name || x.title || x.projectName || x.currencyName || x.coinName;
  if (!name) return null;

  const type = x.type || x.taskType || x.category || x.activityType || 'Airdrop';
  const statusRaw = String(x.status || x.state || x.activityStatus || '').toLowerCase();

  const finished = /ended|finished|closed|distributed|claim ended|no active tasks|inactive/.test(statusRaw);
  const ending = /ending|soon|deadline|last/.test(statusRaw);

  const endDate = pickDate(x.endDate, x.deadline, x.end, x.finishDate, x.rewardDate) || daysFromNow(30);
  const startDate = pickDate(x.startDate, x.start, x.createdAt, x.updatedAt) || new Date().toISOString().slice(0, 10);

  const funds = cleanArray(x.funds || x.investors || x.raiseFunds || x.backers || []);
  const score = Number(x.score || x.moniScore || x.rating || autoScore({funds, endDate, type, statusRaw}));

  const siteUrl = x.siteUrl || x.website || x.url || x.link || '';
  const actionUrl = x.actionUrl || x.activityUrl || x.taskUrl || x.guideUrl || x.url || siteUrl || '';

  return {
    name,
    type,
    coin: x.symbol || x.ticker || x.coin || name.slice(0, 4).toUpperCase(),
    stake: normalizeCost(x.cost || x.deposit || x.requiredAmount),
    potential: normalizePotential(x.reward || x.potential || x.rewardType),
    roi: score >= 85 ? 'Высокий' : score >= 70 ? 'Средний' : 'Низкий',
    score,
    status: finished ? 'finished' : ending ? 'ending' : 'active',
    statusText: finished ? 'Finished' : ending ? 'Ending Soon' : 'Active',
    startDate,
    endDate,
    cat: buildCats({finished, funds, cost: x.cost, type}),
    funds,
    fundsCount: funds.length,
    time: x.time || x.estimatedTime || '10–20 мин',
    difficulty: x.difficulty || 'Легко',
    icon: (x.symbol || name).slice(0, 2).toUpperCase(),
    logoUrl: x.logo || x.icon || x.image || faviconFrom(siteUrl, name),
    domain: domainFrom(siteUrl),
    siteUrl,
    actionUrl,
    x: x.x || x.twitter || x.twitterUrl || '',
    docs: x.docs || x.docsUrl || x.documentation || '',
    guideSteps: x.guideSteps || x.steps || defaultSteps(type),
    counts: x.counts || defaultCounts(type),
    chance: x.chance || 'Шанс зависит от условий проекта, регулярности активности и отбора кошельков.',
    beginner: x.beginner || 'Проверь условия проекта и выполняй шаги аккуратно.',
    source: 'cryptorank'
  };
}

function cleanArray(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(i => typeof i === 'string' ? i : (i.name || i.title || '')).filter(Boolean).slice(0, 8);
  if (typeof v === 'string') return v.split(',').map(s => s.trim()).filter(Boolean).slice(0, 8);
  return [];
}

function pickDate(...vals) {
  for (const v of vals) {
    if (!v) continue;
    const d = new Date(v);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  return '';
}

function normalizeCost(v) {
  if (v === 0 || v === '0') return '$0';
  if (!v) return '$0';
  if (String(v).includes('$')) return String(v);
  return String(v);
}

function normalizePotential(v) {
  if (!v) return '$0–$0';
  if (typeof v === 'string') return v.includes('$') ? v : String(v);
  return String(v);
}

function buildCats({finished, funds, cost, type}) {
  if (finished) return [];
  const cats = ['best', 'potential'];
  const free = !cost || String(cost).includes('0') || String(cost).toLowerCase().includes('free');
  cats.push(free ? 'free' : 'deposit');
  if (funds && funds.length) cats.push('funds');
  if (/staking|restaking/i.test(type)) cats.push('deposit');
  return [...new Set(cats)];
}

function autoScore({funds, endDate, type, statusRaw}) {
  let s = 65;
  if (funds && funds.length) s += Math.min(15, funds.length * 3);
  if (/testnet|airdrop|points/i.test(type)) s += 8;
  const days = Math.ceil((new Date(endDate).getTime() - Date.now()) / 86400000);
  if (days > 7 && days < 60) s += 7;
  if (/confirmed|reward available|active/i.test(statusRaw)) s += 5;
  return Math.max(50, Math.min(95, s));
}

function defaultSteps(type) {
  if (/staking|restaking/i.test(type)) {
    return ['Открыть официальный app', 'Подключить отдельный кошелёк', 'Проверить риски и комиссии', 'Выполнить deposit/restaking', 'Отметить прогресс'];
  }
  return ['Открыть страницу активности', 'Подключить отдельный кошелёк', 'Проверить условия кампании', 'Выполнить задания', 'Отметить прогресс'];
}

function defaultCounts(type) {
  if (/testnet/i.test(type)) return ['Testnet transactions', 'Faucet', 'Quest activity'];
  if (/staking|restaking/i.test(type)) return ['Deposit', 'Restaking', 'Points'];
  return ['Quest', 'Wallet activity', 'Social activity'];
}

function faviconFrom(siteUrl, name) {
  const d = domainFrom(siteUrl) || (name.toLowerCase().replace(/\s+/g, '') + '.xyz');
  return 'https://www.google.com/s2/favicons?sz=128&domain=' + d;
}

function domainFrom(url) {
  try { return new URL(url).hostname; } catch { return ''; }
}

function daysFromNow(n) {
  return new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);
}

function demoProjects() {
  return [{
    name: 'Scanner Demo',
    type: 'Airdrop',
    coin: 'DEMO',
    stake: '$0',
    potential: '$0–$0',
    score: 70,
    status: 'active',
    statusText: 'Active',
    startDate: daysFromNow(-1),
    endDate: daysFromNow(30),
    cat: ['best','free','potential'],
    funds: [],
    fundsCount: 0,
    time: '10 мин',
    difficulty: 'Легко',
    icon: 'AI',
    domain: 'cryptorank.io',
    siteUrl: 'https://cryptorank.io/drophunting',
    actionUrl: 'https://cryptorank.io/drophunting',
    x: 'https://x.com/CryptoRank_io',
    docs: 'https://cryptorank.io/public-api',
    guideSteps: ['Подключить CryptoRank API URL', 'Добавить CRYPTORANK_API_KEY в Vercel', 'Нажать Проверить возможности', 'Проверить live-проекты', 'Отметить прогресс'],
    counts: ['API', 'Live Scanner', 'Active filter'],
    chance: 'Это demo-карточка. Реальные проекты появятся после подключения API.',
    beginner: 'Scanner готов, осталось добавить API URL и ключ.'
  }];
}
