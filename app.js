
const app = document.getElementById('app');

const HARD_LINKS = {
  'LayerZero': {site:'https://layerzero.network/', action:'https://stargate.finance/'},
  'Monad': {site:'https://monad.xyz/', action:'https://testnet.monad.xyz/'},
  'Berachain': {site:'https://www.berachain.com/', action:'https://www.berachain.com/'},
  'ZetaChain': {site:'https://www.zetachain.com/', action:'https://hub.zetachain.com/'},
  'Initia': {site:'https://initia.xyz/', action:'https://app.testnet.initia.xyz/'},
  'Manta Network': {site:'https://manta.network/', action:'https://manta.network/'},
  'Movement': {site:'https://movementlabs.xyz/', action:'https://movementlabs.xyz/'},
  'MegaETH': {site:'https://megaeth.com/', action:'https://megaeth.com/'},
  'Kelp DAO': {site:'https://kelpdao.xyz/', action:'https://app.kelpdao.xyz/'}
};

const cats = [
  ['all','Все'],
  ['best','Лучшие'],
  ['free','Бесплатно'],
  ['deposit','С депозитом'],
  ['potential','Потенциал'],
  ['funds','Фонды'],
  ['fav','Избранное']
];

const aliases = {
  'Все':'all','Лучшие':'best','Бесплатно':'free','С депозитом':'deposit','Потенциал':'potential','Фонды':'funds','Избранное':'fav',
  'free':'free','best':'best','deposit':'deposit','potential':'potential','funds':'funds','fav':'fav','all':'all'
};

let deposit = localStorage.prDeposit || '500';
let category = aliases[localStorage.prCrCategory] || 'best';
let fav = JSON.parse(localStorage.prFav || '[]');
let expanded = '';

const projects = [
  {
    name:'LayerZero', type:'Airdrop', coin:'ZRO', stake:'$0',
    profit:{50:'$100–$500',100:'$100–$500',500:'$100–$500',1000:'$100–$500'},
    roi:'Высокий', score:91, status:'active', statusText:'Active',
    startDate:'2026-06-01', endDate:'2026-07-15',
    cat:['best','free','potential','funds'],
    funds:['a16z','Sequoia','PayPal'], fundsCount:11,
    time:'10–20 мин', difficulty:'Легко', icon:'L0',
    logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=layerzero.network',
    cost:'$0–20 на комиссии',
    guideSteps:['Открыть Stargate','Подключить отдельный кошелёк','Сделать bridge USDC/ETH между 2–3 сетями','Повторить 3–5 транзакций в разные дни','Проверить новые кампании LayerZero'],
    counts:['Bridge между сетями','Swap/transfer через Stargate','Активность в разные дни'],
    chance:'Высокий шанс, если делать активность регулярно',
    beginner:'Новичок справится, но нужны комиссии в сетях.'
  },
  {
    name:'Monad', type:'Testnet', coin:'MON', stake:'$0',
    profit:{50:'$50–$300',100:'$50–$300',500:'$50–$300',1000:'$50–$300'},
    roi:'Высокий', score:89, status:'active', statusText:'Active',
    startDate:'2026-06-10', endDate:'2026-07-30',
    cat:['best','free','potential','funds'],
    funds:['Paradigm','Electric'], fundsCount:9,
    time:'20–40 мин', difficulty:'Средняя', icon:'M',
    logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=monad.xyz',
    cost:'$0',
    guideSteps:['Открыть Monad testnet','Подключить кошелёк','Получить тестовые токены','Сделать swap / transfer','Пройти доступные задания экосистемы'],
    counts:['Testnet transactions','Swap','Transfer','Quest activity'],
    chance:'Высокий потенциал, но награда не гарантирована',
    beginner:'Подходит новичку, если есть кошелёк.'
  },
  {
    name:'Berachain', type:'Testnet', coin:'BERA', stake:'$0',
    profit:{50:'$80–$400',100:'$80–$400',500:'$80–$400',1000:'$80–$400'},
    roi:'Высокий', score:90, status:'ending', statusText:'Ending Soon',
    startDate:'2026-05-28', endDate:'2026-06-28',
    cat:['best','free','potential','funds'],
    funds:['Polychain','Framework'], fundsCount:10,
    time:'20–30 мин', difficulty:'Средняя', icon:'B',
    logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=berachain.com',
    cost:'$0',
    guideSteps:['Открыть сайт Berachain','Подключить кошелёк','Получить тестовые токены','Сделать swap','Добавить ликвидность или выполнить задания экосистемы'],
    counts:['Swap','Liquidity','Тестнет-транзакции','Квесты экосистемы'],
    chance:'Средний/высокий шанс за активный тестнет',
    beginner:'Нужны базовые знания testnet и faucet.'
  },
  {
    name:'ZetaChain', type:'Testnet', coin:'ZETA', stake:'$0',
    profit:{50:'$20–$100',100:'$20–$100',500:'$20–$100',1000:'$20–$100'},
    roi:'Средний', score:92, status:'active', statusText:'Active',
    startDate:'2026-06-05', endDate:'2026-07-05',
    cat:['best','free','potential','funds'],
    funds:['Blockchain.com','Jane Street'], fundsCount:6,
    time:'15–20 мин', difficulty:'Легко', icon:'Z',
    logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=zetachain.com',
    cost:'$0–10',
    guideSteps:['Открыть ZetaHub','Подключить MetaMask','Получить тестовые токены','Сделать cross-chain swap','Проверить задания и повторить активность'],
    counts:['Cross-chain действия','Swap','Bridge','Повторная активность'],
    chance:'Средний шанс, зависит от активности кошелька',
    beginner:'Лёгкий формат, но нужен кошелёк.'
  },
  {
    name:'Initia', type:'Testnet', coin:'INIT', stake:'$0',
    profit:{50:'$40–$220',100:'$40–$220',500:'$40–$220',1000:'$40–$220'},
    roi:'Высокий', score:85, status:'active', statusText:'Active',
    startDate:'2026-06-08', endDate:'2026-07-20',
    cat:['free','potential','funds'],
    funds:['Binance Labs','Delphi'], fundsCount:5,
    time:'10–15 мин', difficulty:'Легко', icon:'I',
    logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=initia.xyz',
    cost:'$0',
    guideSteps:['Открыть Initia testnet','Подключить кошелёк','Получить faucet','Сделать транзакции','Выполнить задания в приложениях Initia'],
    counts:['Faucet','Тестнет-транзакции','Quest activity'],
    chance:'Средний шанс, если выполнять задания регулярно',
    beginner:'Хорошо подходит новичку.'
  },
  {
    name:'Manta Network', type:'Airdrop', coin:'MANTA', stake:'$0',
    profit:{50:'$30–$150',100:'$30–$150',500:'$30–$150',1000:'$30–$150'},
    roi:'Средний', score:86, status:'active', statusText:'Active',
    startDate:'2026-06-03', endDate:'2026-07-10',
    cat:['free','potential','funds'],
    funds:['Binance Labs','Polychain'], fundsCount:6,
    time:'15–25 мин', difficulty:'Средняя', icon:'M',
    logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=manta.network',
    cost:'$0–20',
    guideSteps:['Открыть портал Manta','Подключить кошелёк','Проверить активные кампании','Выполнить задания','Сохранить активность кошелька'],
    counts:['Quest','Bridge/Deposit если требуется','Активность в кампании'],
    chance:'Средний шанс, зависит от текущей кампании',
    beginner:'Нужна внимательность к условиям кампании.'
  },
  {
    name:'Movement', type:'Testnet', coin:'MOVE', stake:'$0',
    profit:{50:'$30–$180',100:'$30–$180',500:'$30–$180',1000:'$30–$180'},
    roi:'Средний', score:84, status:'active', statusText:'Active',
    startDate:'2026-06-12', endDate:'2026-08-01',
    cat:['free','potential','funds'],
    funds:['Polychain','Binance Labs'], fundsCount:7,
    time:'15 мин', difficulty:'Легко', icon:'MV',
    logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=movementlabs.xyz',
    cost:'$0',
    guideSteps:['Открыть Movement','Проверить testnet / quests','Подключить кошелёк','Выполнить доступные действия','Повторить активность через несколько дней'],
    counts:['Testnet','Quest','Активность кошелька'],
    chance:'Средний шанс за раннее участие',
    beginner:'Лёгкий вариант для старта.'
  },
  {
    name:'MegaETH', type:'Airdrop', coin:'MEGA', stake:'$0',
    profit:{50:'$60–$250',100:'$60–$250',500:'$60–$250',1000:'$60–$250'},
    roi:'Высокий', score:88, status:'active', statusText:'Active',
    startDate:'2026-06-15', endDate:'2026-08-15',
    cat:['best','free','potential','funds'],
    funds:['Dragonfly','Figment'], fundsCount:8,
    time:'20 мин', difficulty:'Средняя', icon:'ME',
    logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=megaeth.com',
    cost:'$0',
    guideSteps:['Открыть сайт MegaETH','Проверить waitlist / testnet','Подключить кошелёк или X','Выполнить доступные задания','Следить за новыми этапами'],
    counts:['Waitlist','Testnet / Quest если открыт','Социальная активность'],
    chance:'Высокий потенциал, но активность может открываться этапами',
    beginner:'Пока лучше следить за доступными заданиями.'
  },
  {
    name:'Kelp DAO', type:'Staking', coin:'KELP', stake:'от $10',
    profit:{50:'$20–$80',100:'$40–$160',500:'$200–$800',1000:'$400–$1600'},
    roi:'Средний', score:87, status:'active', statusText:'Active',
    startDate:'2026-06-01', endDate:'2026-09-01',
    cat:['best','deposit','funds'],
    funds:['Laser Digital','SCB'], fundsCount:7,
    time:'5 мин', difficulty:'Легко', icon:'K',
    logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=kelpdao.xyz',
    cost:'от $10',
    guideSteps:['Открыть Kelp DAO app','Подключить кошелёк','Выбрать restaking','Проверить риски и комиссии','Сделать депозит только если понимаешь риск'],
    counts:['Restaking','Deposit','Points activity'],
    chance:'Средний шанс, но нужен депозит',
    beginner:'Не для новичка без понимания DeFi-рисков.'
  }
];

function save(){localStorage.prDeposit=deposit;localStorage.prCrCategory=category;localStorage.prFav=JSON.stringify(fav);}
function safeLinkFor(name,kind){const h=HARD_LINKS[name]||{}; return kind==='site' ? (h.site||h.action||'#') : (h.action||h.site||'#');}
function rangeMax(str){const nums=(String(str||'').match(/\d+/g)||[]).map(Number); return nums[nums.length-1]||0;}
function daysLeft(dateStr){const ms=new Date(dateStr+'T23:59:59Z').getTime()-Date.now(); return Math.max(0,Math.ceil(ms/86400000));}
function ruDate(dateStr){const d=new Date(dateStr+'T00:00:00Z'); return d.toLocaleDateString('ru-RU',{day:'2-digit',month:'short'}).replace('.','');}
function activeProjectsOnly(arr){return arr.filter(p=>p.status!=='finished' && daysLeft(p.endDate)>0);}
function catLabel(id){return (cats.find(c=>c[0]===id)||cats[0])[1];}
function visibleProjects(){
 let arr=activeProjectsOnly(projects.slice());
 if(category==='fav') arr=arr.filter(p=>fav.includes(p.name));
 else if(category!=='all') arr=arr.filter(p=>p.cat.includes(category));
 if(!arr.length && category!=='fav') arr=activeProjectsOnly(projects.slice());
 return arr.sort((a,b)=>rangeMax(b.profit[deposit]||b.profit[500])-rangeMax(a.profit[deposit]||a.profit[500]));
}
function catChips(){return cats.map(c=>`<button class="chip type ${c[0]===category?'active':''}" data-cat="${c[0]}">${c[1]}</button>`).join('');}
function progressFor(name){const saved=JSON.parse(localStorage.getItem('prProgress_'+name)||'[]'); const total=(projects.find(p=>p.name===name)?.guideSteps||[]).length||0; const done=saved.filter(Boolean).length; return {saved,total,done};}

function render(){
 const filtered=visibleProjects();
 const best=filtered[0];
 app.innerHTML=`<main class="page"><header class="top"><img class="logo" src="icon.svg"><div class="title"><h1>PromoRadar AI</h1><p>Лучшие крипто-возможности в одном месте</p></div><button class="gear" data-scan>↻</button></header>

 <section class="filters compact">
   <div class="filterBlock depLine"><div class="rowHead"><h2>Мой депозит</h2><b data-custom>${deposit} USDT⌄</b></div></div>
   <div class="filterBlock"><div class="rowHead"><h2>Фильтры</h2><b>${catLabel(category)}⌄</b></div><div class="chips typeRow">${catChips()}</div></div>
   <button class="checkWide" data-scan>Проверить возможности</button>
 </section>

 <div class="section"><div><h2>Найденные возможности</h2><span>${filtered.length} проектов · ${catLabel(category).toLowerCase()}</span></div><button class="sort">↗ Потенциал⌄</button></div>
 ${best?`<div class="best"><div><small>Лучший вариант</small><b>${best.name} • ${best.type}</b></div><div class="money">${best.profit[deposit]||best.profit[500]}</div></div>`:''}
 <section class="list">${filtered.length?filtered.map(card).join(''):'<div class="empty">Нет проектов по выбранному фильтру</div>'}</section></main>${detailsModal()}<div class="toast" id="toast"></div>`;
 bind();
}

function card(o){
 const id=o.name;
 const is=fav.includes(id);
 const profit=o.profit[deposit]||o.profit[500];
 const p=progressFor(id);
 const statusTxt=p.done===0?'Не начато':(p.done>=p.total?'Выполнено':'В процессе');
 return `<article class="offer project" data-expand="${id}">
 <div class="exLogo projectIcon"><img src="${o.logoUrl}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span>${o.icon}</span></div>
 <div class="meta">
   <div class="exchange">${o.name} • ${o.type}</div>
   <h3>${o.coin}</h3>
   <span class="coin"><em class="status ${o.status}">${o.statusText}</em> · ${o.difficulty} · ${o.time} · фонды: ${o.fundsCount}</span><span class="dates">Старт: ${ruDate(o.startDate)} · Осталось: ${daysLeft(o.endDate)} д.</span>
   <div class="progressMini"><b>${statusTxt}</b><span>${p.done}/${p.total}</span></div>
   <div class="cols">
    <div class="col"><span>Вложить</span><b>${o.stake}</b></div>
    <div class="col"><span>Потенциал</span><b class="profit">${profit}</b></div>
    <div class="col"><span>ROI</span><b>${o.roi}</b></div>
   </div>
   <div class="fundTags">${o.funds.slice(0,3).map(f=>`<em>${f}</em>`).join('')}</div>
   <div class="actions"><button class="star ${is?'on':''}" data-fav="${id}">${is?'★':'☆'}</button><button class="open ghost" data-details="${id}">Пошаговая инструкция</button><button class="open" data-url="${encodeURIComponent(safeLinkFor(o.name,'action'))}">Открыть</button></div>
 </div>
 <div class="score"><div class="ring">${o.score}<small>/100</small></div></div>
 </article>`;
}

function detailsModal(){
 if(!expanded) return '';
 const o=projects.find(p=>p.name===expanded);
 if(!o) return '';
 const profit=o.profit[deposit]||o.profit[500];
 const prog=progressFor(o.name);
 const steps=o.guideSteps||[];
 const counts=o.counts||[];
 const statusTxt=prog.done===0?'Не начато':(prog.done>=prog.total?'Выполнено':'В процессе');
 return `<div class="modal show detailsModal" id="details"><div class="sheet detailsSheet">
  <div class="sheetHead"><h2>${o.name}</h2><button class="close" data-close-details>×</button></div>
  <div class="detailStatus"><span class="status ${o.status}">${o.statusText}</span><b>${o.type}</b><em>${o.difficulty}</em></div>
  <div class="detailGrid">
    <div><small>Потенциал</small><b>${profit}</b></div>
    <div><small>Стоимость</small><b>${o.cost||o.stake}</b></div>
    <div><small>Время</small><b>${o.time}</b></div>
    <div><small>Осталось</small><b>${daysLeft(o.endDate)} д.</b></div>
  </div>
  <div class="aiHint"><b>🤖 Пошаговая инструкция</b><span>${o.beginner}</span></div>
  <div class="progressBox"><b>${statusTxt}</b><span>${prog.done}/${prog.total} выполнено</span></div>
  <h3>Что делать</h3>
  <div class="checkList">${steps.map((s,i)=>`<label><input type="checkbox" data-step="${i}" ${prog.saved[i]?'checked':''}><span>${s}</span></label>`).join('')}</div>
  <h3>Какие действия засчитываются</h3>
  <div class="countTags">${counts.map(s=>`<span>${s}</span>`).join('')}</div>
  <h3>Шанс награды</h3>
  <p class="chance">${o.chance}</p>
  <h3>Фонды</h3>
  <div class="fundTags big">${o.funds.map(f=>`<em>${f}</em>`).join('')}</div>
  <div class="detailActions">
    <button class="open bigOpen" data-url="${encodeURIComponent(safeLinkFor(o.name,'action'))}">🚀 Открыть активность</button>
    <button class="open ghost" data-url="${encodeURIComponent(safeLinkFor(o.name,'site'))}">Сайт проекта</button>
  </div>
  <p class="risk">Не финансовый совет. Проверяй ссылки, используй отдельный кошелёк и не отправляй seed-фразу.</p>
 </div></div>`;
}

function bind(){
 document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{category=b.dataset.cat;save();render();});
 document.querySelectorAll('[data-custom]').forEach(b=>b.onclick=()=>{const v=prompt('Введите сумму USDT',deposit); if(v&&Number(v)>0){deposit=String(Number(v));save();render();}});
 document.querySelectorAll('[data-scan]').forEach(b=>b.onclick=()=>toast('Возможности обновлены'));
 document.querySelectorAll('[data-expand]').forEach(card=>card.onclick=e=>{if(e.target.closest('[data-fav],[data-url],[data-details]'))return; expanded=card.dataset.expand; render();});
 document.querySelectorAll('[data-details]').forEach(b=>b.onclick=e=>{e.stopPropagation(); expanded=b.dataset.details; render();});
 document.querySelectorAll('[data-close-details]').forEach(b=>b.onclick=()=>{expanded=''; render();});
 const dm=document.getElementById('details'); if(dm) dm.onclick=e=>{if(e.target.id==='details'){expanded=''; render();}};
 document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=e=>{e.stopPropagation(); const id=b.dataset.fav; fav=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id]; save(); render();});
 document.querySelectorAll('[data-url]').forEach(b=>b.onclick=e=>{e.stopPropagation(); openExternal(b.dataset.url);});
 document.querySelectorAll('[data-step]').forEach(ch=>ch.onchange=()=>{const p=projects.find(x=>x.name===expanded); if(!p)return; const current=progressFor(p.name).saved; current[Number(ch.dataset.step)]=ch.checked; localStorage.setItem('prProgress_'+p.name,JSON.stringify(current)); render();});
}
function openExternal(raw){
 let url='';
 try{url=decodeURIComponent(raw||'')}catch(e){url=raw||''}
 if(!/^https?:\/\//i.test(url)){toast('Ссылка недоступна'); return;}
 try{
  if(window.Telegram&&Telegram.WebApp&&Telegram.WebApp.openLink){Telegram.WebApp.openLink(url);}
  else{window.open(url,'_blank','noopener,noreferrer');}
 }catch(e){window.open(url,'_blank','noopener,noreferrer');}
}
function toast(t){let el=document.getElementById('toast'); if(!el)return; el.textContent=t; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),1500);}
render();
