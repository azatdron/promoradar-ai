
const projectLinks={
  LayerZero:'https://cryptorank.io/price/layerzero',
  ZetaChain:'https://cryptorank.io/price/zetachain',
  Starknet:'https://cryptorank.io/price/starknet',
  'Kelp DAO':'https://cryptorank.io/price/kelp-dao',
  Monad:'https://cryptorank.io/price/monad',
  Berachain:'https://cryptorank.io/price/berachain',
  'Manta Network':'https://cryptorank.io/price/manta-network',
  Initia:'https://cryptorank.io/price/initia',
  MegaETH:'https://cryptorank.io/price/megaeth',
  Movement:'https://cryptorank.io/price/movement'
};

const app=document.getElementById('app');

const cats=[
  ['all','Все'],
  ['best','Лучшие'],
  ['free','Бесплатно'],
  ['deposit','С депозитом'],
  ['potential','Потенциал'],
  ['funds','Фонды'],
  ['fav','Избранное']
];

const aliases={
  'Все':'all','Лучшие':'best','Бесплатно':'free','С депозитом':'deposit','Потенциал':'potential','Фонды':'funds','Избранное':'fav',
  'free':'free','best':'best','deposit':'deposit','potential':'potential','funds':'funds','fav':'fav','all':'all'
};

let deposit=localStorage.prDeposit||'500';
let category=aliases[localStorage.prCrCategory]||'best';
let fav=JSON.parse(localStorage.prFav||'[]');
let expanded='';

const projects=[
 {name:'LayerZero',type:'Airdrop',coin:'ZRO',stake:'$0',profit:{50:'$100–$500',100:'$100–$500',500:'$100–$500',1000:'$100–$500',siteUrl:'https://layerzero.network/',actionUrl:'https://stargate.finance/',steps:['Подключить кошелёк', 'Сделать bridge между сетями', 'Использовать LayerZero dApps', 'Повторить активность несколько раз'],cost:'$0–20 на комиссии'},roi:'Высокий',score:91,status:'active',statusText:'Active',startDate:'2026-06-01',endDate:'2026-07-15',cat:['best','free','potential','funds'],funds:['a16z','Sequoia','PayPal'],fundsCount:11,time:'10–20 мин',difficulty:'Легко',icon:'L0',logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=layerzero.network'},
 {name:'Monad',type:'Testnet',coin:'MON',stake:'$0',profit:{50:'$50–$300',100:'$50–$300',500:'$50–$300',1000:'$50–$300',siteUrl:'https://monad.xyz/',actionUrl:'https://testnet.monad.xyz/',steps:['Открыть тестнет Monad', 'Подключить кошелёк', 'Выполнить задания экосистемы', 'Сохранить активность кошелька'],cost:'$0'},roi:'Высокий',score:89,status:'active',statusText:'Active',startDate:'2026-06-10',endDate:'2026-07-30',cat:['best','free','potential','funds'],funds:['Paradigm','Electric'],fundsCount:9,time:'20–40 мин',difficulty:'Средняя',icon:'M',logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=monad.xyz'},
 {name:'Berachain',type:'Testnet',coin:'BERA',stake:'$0',profit:{50:'$80–$400',100:'$80–$400',500:'$80–$400',1000:'$80–$400',siteUrl:'https://www.berachain.com/',actionUrl:'https://bepolia.faucet.berachain.com/',steps:['Открыть тестнет Berachain', 'Получить тестовые токены', 'Сделать swap / stake / liquidity', 'Повторить действия в dApps'],cost:'$0'},roi:'Высокий',score:90,status:'ending',statusText:'Ending Soon',startDate:'2026-05-28',endDate:'2026-06-28',cat:['best','free','potential','funds'],funds:['Polychain','Framework'],fundsCount:10,time:'20–30 мин',difficulty:'Средняя',icon:'B',logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=berachain.com'},
 {name:'ZetaChain',type:'Testnet',coin:'ZETA',stake:'$0',profit:{50:'$20–$100',100:'$20–$100',500:'$20–$100',1000:'$20–$100',siteUrl:'https://www.zetachain.com/',actionUrl:'https://hub.zetachain.com/',steps:['Открыть ZetaHub', 'Подключить кошелёк', 'Сделать кросс-чейн действия', 'Проверить задания'],cost:'$0–10'},roi:'Средний',score:92,status:'active',statusText:'Active',startDate:'2026-06-05',endDate:'2026-07-05',cat:['best','free','potential','funds'],funds:['Blockchain.com','Jane Street'],fundsCount:6,time:'15–20 мин',difficulty:'Легко',icon:'Z',logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=zetachain.com'},
 {name:'Initia',type:'Testnet',coin:'INIT',stake:'$0',profit:{50:'$40–$220',100:'$40–$220',500:'$40–$220',1000:'$40–$220',siteUrl:'https://initia.xyz/',actionUrl:'https://app.testnet.initia.xyz/',steps:['Открыть Initia testnet', 'Подключить кошелёк', 'Выполнить задания', 'Проверить прогресс'],cost:'$0'},roi:'Высокий',score:85,status:'active',statusText:'Active',startDate:'2026-06-08',endDate:'2026-07-20',cat:['free','potential','funds'],funds:['Binance Labs','Delphi'],fundsCount:5,time:'10–15 мин',difficulty:'Легко',icon:'I',logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=initia.xyz'},
 {name:'Manta Network',type:'Airdrop',coin:'MANTA',stake:'$0',profit:{50:'$30–$150',100:'$30–$150',500:'$30–$150',1000:'$30–$150',siteUrl:'https://manta.network/',actionUrl:'https://newparadigm.manta.network/',steps:['Открыть портал Manta', 'Подключить кошелёк', 'Проверить кампании', 'Выполнить задания'],cost:'$0–20'},roi:'Средний',score:86,status:'active',statusText:'Active',startDate:'2026-06-03',endDate:'2026-07-10',cat:['free','potential','funds'],funds:['Binance Labs','Polychain'],fundsCount:6,time:'15–25 мин',difficulty:'Средняя',icon:'M',logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=manta.network'},
 {name:'Movement',type:'Testnet',coin:'MOVE',stake:'$0',profit:{50:'$30–$180',100:'$30–$180',500:'$30–$180',1000:'$30–$180',siteUrl:'https://movementlabs.xyz/',actionUrl:'https://movementlabs.xyz/',steps:['Открыть сайт Movement', 'Проверить testnet / quests', 'Подключить кошелёк', 'Выполнить активности'],cost:'$0'},roi:'Средний',score:84,status:'active',statusText:'Active',startDate:'2026-06-12',endDate:'2026-08-01',cat:['free','potential','funds'],funds:['Polychain','Binance Labs'],fundsCount:7,time:'15 мин',difficulty:'Легко',icon:'MV',logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=movementlabs.xyz'},
 {name:'MegaETH',type:'Airdrop',coin:'MEGA',stake:'$0',profit:{50:'$60–$250',100:'$60–$250',500:'$60–$250',1000:'$60–$250',siteUrl:'https://megaeth.com/',actionUrl:'https://megaeth.com/',steps:['Открыть MegaETH', 'Проверить testnet / waitlist', 'Подключить кошелёк или X', 'Выполнить задания'],cost:'$0'},roi:'Высокий',score:88,status:'active',statusText:'Active',startDate:'2026-06-15',endDate:'2026-08-15',cat:['best','free','potential','funds'],funds:['Dragonfly','Figment'],fundsCount:8,time:'20 мин',difficulty:'Средняя',icon:'ME',logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=megaeth.com'},
 {name:'Kelp DAO',type:'Staking',coin:'KELP',stake:'от $10',profit:{50:'$20–$80',100:'$40–$160',500:'$200–$800',1000:'$400–$1600',siteUrl:'https://kelpdao.xyz/',actionUrl:'https://app.kelpdao.xyz/',steps:['Открыть Kelp DAO app', 'Подключить кошелёк', 'Выбрать restaking', 'Учитывать риски депозита'],cost:'от $10'},roi:'Средний',score:87,status:'active',statusText:'Active',startDate:'2026-06-01',endDate:'2026-09-01',cat:['best','deposit','funds'],funds:['Laser Digital','SCB'],fundsCount:7,time:'5 мин',difficulty:'Легко',icon:'K',logoUrl:'https://www.google.com/s2/favicons?sz=128&domain=kelpdao.xyz'}
];

function save(){
  localStorage.prDeposit=deposit;
  localStorage.prCrCategory=category;
  localStorage.prFav=JSON.stringify(fav);
}
function daysLeft(dateStr){const ms=new Date(dateStr+'T23:59:59Z').getTime()-Date.now();return Math.max(0,Math.ceil(ms/86400000))}
function ruDate(dateStr){const d=new Date(dateStr+'T00:00:00Z');return d.toLocaleDateString('ru-RU',{day:'2-digit',month:'short'}).replace('.','')}
function activeProjectsOnly(arr){return arr.filter(p=>p.status!=='finished' && daysLeft(p.endDate)>0)}
function rangeMax(str){
  const nums=(String(str||'').match(/\d+/g)||[]).map(Number);
  return nums[nums.length-1]||0;
}
function catLabel(id){
  return (cats.find(c=>c[0]===id)||cats[0])[1];
}
function visibleProjects(){
 let arr=activeProjectsOnly(projects.slice());
 if(category==='fav') arr=arr.filter(p=>fav.includes(p.name));
 else if(category!=='all') arr=arr.filter(p=>p.cat.includes(category));
 if(!arr.length && category!=='fav') arr=projects.slice();
 return arr.sort((a,b)=>rangeMax(b.profit[deposit]||b.profit[500])-rangeMax(a.profit[deposit]||a.profit[500]));
}
function catChips(){
  return cats.map(c=>`<button class="chip type ${c[0]===category?'active':''}" data-cat="${c[0]}">${c[1]}</button>`).join('');
}
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
 const isExp=expanded===id;
 const profit=o.profit[deposit]||o.profit[500];
 return `<article class="offer project ${isExp?'expanded':''}" data-expand="${id}">
 <div class="exLogo projectIcon"><img src="${o.logoUrl}" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><span>${o.icon}</span></div>
 <div class="meta">
   <div class="exchange">${o.name} • ${o.type}</div>
   <h3>${o.coin}</h3>
   <span class="coin"><em class="status ${o.status}">${o.statusText}</em> · ${o.difficulty} · ${o.time} · фонды: ${o.fundsCount}</span><span class="dates">Старт: ${ruDate(o.startDate)} · Осталось: ${daysLeft(o.endDate)} д.</span>
   <div class="cols">
    <div class="col"><span>Вложить</span><b>${o.stake}</b></div>
    <div class="col"><span>Потенциал</span><b class="profit">${profit}</b></div>
    <div class="col"><span>ROI</span><b>${o.roi}</b></div>
   </div>
   <div class="fundTags">${o.funds.slice(0,3).map(f=>`<em>${f}</em>`).join('')}</div>
   <div class="actions"><button class="star ${is?'on':''}" data-fav="${id}">${is?'★':'☆'}</button><button class="open ghost" data-details="${id}">Подробнее</button><button class="open" data-url="${encodeURIComponent(o.actionUrl||projectLinks[o.name]||o.siteUrl||'#')}">Открыть</button></div>
 </div>
 <div class="score"><div class="ring">${o.score}<small>/100</small></div></div>
 </article>`;
}

function detailsModal(){
 if(!expanded) return '';
 const o=projects.find(p=>p.name===expanded);
 if(!o) return '';
 const profit=o.profit[deposit]||o.profit[500];
 return `<div class="modal show detailsModal" id="details"><div class="sheet detailsSheet">
  <div class="sheetHead"><h2>${o.name}</h2><button class="close" data-close-details>×</button></div>
  <div class="detailStatus"><span class="status ${o.status}">${o.statusText}</span><b>${o.type}</b><em>${o.difficulty}</em></div>
  <div class="detailGrid">
    <div><small>Потенциал</small><b>${profit}</b></div>
    <div><small>Стоимость</small><b>${o.cost||o.stake}</b></div>
    <div><small>Время</small><b>${o.time}</b></div>
    <div><small>Осталось</small><b>${daysLeft(o.endDate)} д.</b></div>
  </div>
  <h3>Что делать</h3>
  <ol class="steps">${(o.steps||[]).map(s=>`<li>${s}</li>`).join('')}</ol>
  <h3>Фонды</h3>
  <div class="fundTags big">${o.funds.map(f=>`<em>${f}</em>`).join('')}</div>
  <div class="detailActions">
    <button class="open bigOpen" data-url="${encodeURIComponent(o.actionUrl||o.siteUrl)}">🚀 Открыть активность</button>
    <button class="open ghost" data-url="${encodeURIComponent(o.siteUrl||o.actionUrl)}">Сайт проекта</button>
  </div>
  <p class="risk">Не финансовый совет. Проверяйте ссылки, используйте отдельный кошелёк и не отправляйте seed-фразу.</p>
 </div></div>`;
}
function bind(){
 document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{category=b.dataset.cat;save();render()});
 document.querySelectorAll('[data-custom]').forEach(b=>b.onclick=()=>{const v=prompt('Введите сумму USDT',deposit);if(v&&Number(v)>0){deposit=String(Number(v));save();render()}});
 document.querySelectorAll('[data-scan]').forEach(b=>b.onclick=()=>{toast('Возможности обновлены')});
 document.querySelectorAll('[data-expand]').forEach(card=>card.onclick=e=>{if(e.target.closest('[data-fav],[data-url]'))return;expanded=expanded===card.dataset.expand?'':card.dataset.expand;render()});
 document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.fav;fav=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];save();render()});
 document.querySelectorAll('[data-url]').forEach(b=>b.onclick=e=>{e.stopPropagation();openExternal(b.dataset.url)})
 document.querySelectorAll('[data-details]').forEach(b=>b.onclick=e=>{e.stopPropagation();expanded=b.dataset.details;render()});
 document.querySelectorAll('[data-close-details]').forEach(b=>b.onclick=()=>{expanded='';render()});
 const dm=document.getElementById('details'); if(dm) dm.onclick=e=>{if(e.target.id==='details'){expanded='';render()}};

}

function openExternal(raw){
 let url='';
 try{url=decodeURIComponent(raw||'')}catch(e){url=raw||''}
 if(!/^https?:\/\//i.test(url)){toast('Ссылка временно недоступна');return}
 try{
  if(window.Telegram&&Telegram.WebApp&&Telegram.WebApp.openLink){
    Telegram.WebApp.openLink(url);
  }else{
    window.open(url,'_blank','noopener,noreferrer');
  }
 }catch(e){
  window.open(url,'_blank','noopener,noreferrer');
 }
}
function toast(t){
 let el=document.getElementById('toast');
 if(!el)return;
 el.textContent=t;
 el.classList.add('show');
 setTimeout(()=>el.classList.remove('show'),1500)
}
render();
