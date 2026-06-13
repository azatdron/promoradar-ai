const logos={
  Binance:'https://assets.coingecko.com/markets/images/52/small/binance.jpg',
  Bybit:'https://assets.coingecko.com/markets/images/698/small/bybit_spot.png',
  OKX:'https://assets.coingecko.com/markets/images/96/small/WeChat_Image_20220117220452.png',
  KuCoin:'https://assets.coingecko.com/markets/images/61/small/kucoin.png',
  Coinbase:'https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png',
  Gate:'https://assets.coingecko.com/markets/images/60/small/gate_io_logo1.jpg',
  MEXC:'https://assets.coingecko.com/markets/images/409/small/WeChat_Image_20210622160936.png'
};
const links={
  Binance:'https://www.binance.com/en/launchpool',
  Bybit:'https://www.bybit.com/en/trade/spot/launchpad',
  OKX:'https://www.okx.com/jumpstart',
  KuCoin:'https://www.kucoin.com/spotlight-center',
  Coinbase:'https://www.coinbase.com/learning-rewards',
  Gate:'https://www.gate.io/startup',
  MEXC:'https://www.mexc.com/airdrop'
};
const offers=[
 {ex:'KuCoin',type:'Spotlight',name:'ALT Sale',coin:'ALT',stake:'KCS / USDT',profit:{50:'$5–$15',100:'$9–$30',500:'$45–$120',1000:'$90–$240'},roi:'12%–35%',score:85},
 {ex:'Bybit',type:'Launchpad',name:'EXTER Sale',coin:'EXTER',stake:'USDT / MNT',profit:{50:'$8–$22',100:'$15–$45',500:'$70–$180',1000:'$140–$360'},roi:'14%–45%',score:86},
 {ex:'Bybit',type:'Launchpool',name:'MNT Pool',coin:'MNT',stake:'MNT / USDT',profit:{50:'$7–$20',100:'$15–$45',500:'$60–$160',1000:'$120–$320'},roi:'18%–45%',score:82},
 {ex:'Binance',type:'Launchpool',name:'Lista DAO',coin:'LISTA',stake:'BNB / FDUSD',profit:{50:'$10–$30',100:'$20–$60',500:'$90–$260',1000:'$180–$520'},roi:'20%–50%',score:80},
 {ex:'OKX',type:'Jumpstart',name:'ZETA Event',coin:'ZETA',stake:'OKB / USDT',profit:{50:'$6–$14',100:'$10–$25',500:'$50–$120',1000:'$100–$240'},roi:'12%–28%',score:78},
 {ex:'Coinbase',type:'Earn',name:'OP Learn',coin:'OP',stake:'Tasks',profit:{50:'$2–$8',100:'$2–$12',500:'$5–$20',1000:'$8–$30'},roi:'4%–12%',score:70},
 {ex:'Gate',type:'Startup',name:'XYZ Startup',coin:'XYZ',stake:'GT / USDT',profit:{50:'$4–$12',100:'$8–$24',500:'$35–$90',1000:'$70–$180'},roi:'8%–24%',score:68},
 {ex:'MEXC',type:'Airdrop',name:'Kickstarter',coin:'MX',stake:'MX / Vote',profit:{50:'$3–$10',100:'$6–$18',500:'$30–$80',1000:'$60–$160'},roi:'7%–20%',score:66}
];
let deposit=localStorage.prDeposit||'50';
let exchanges=JSON.parse(localStorage.prExchanges||'["Binance","Bybit","OKX","KuCoin"]');
let type=localStorage.prType||'Все';
let fav=JSON.parse(localStorage.prFav||'[]');
let expanded='';
const app=document.getElementById('app');
const exOrder=Object.keys(logos);
function save(){localStorage.prDeposit=deposit;localStorage.prExchanges=JSON.stringify(exchanges);localStorage.prType=type;localStorage.prFav=JSON.stringify(fav)}
function visibleExchangeChips(){
  const selected=exOrder.filter(x=>exchanges.includes(x));
  const shown=selected.slice(0,3);
  const rest=exOrder.length-shown.length;
  return shown.map(ex=>exChip(ex)).join('')+`<button class="chip more" data-settings>+${rest}⌄</button>`;
}
function exChip(ex){return `<button class="chip exchange active" data-ex="${ex}"><span class="brandIcon"><img src="${logos[ex]}" onerror="this.replaceWith(document.createTextNode('${ex.slice(0,2).toUpperCase()}'))"></span><span class="name">${ex}</span><span class="check">✓</span></button>`}
function typeChips(){return ['Все','Launchpool','Launchpad','Jumpstart'].map(t=>`<button class="chip type ${t==='Все'?'small':''} ${t===type?'active':''}" data-type="${t}">${t}</button>`).join('')}
function render(){
 const filtered=offers.filter(o=>exchanges.includes(o.ex)&&(type==='Все'||o.type===type)).sort((a,b)=>rangeMax(b.profit[deposit])-rangeMax(a.profit[deposit]));
 const best=filtered[0];
 app.innerHTML=`<main class="page"><header class="top"><img class="logo" src="icon.svg"><div class="title"><h1>PromoRadar AI</h1><p>Акции топ-бирж в одном месте</p></div><button class="gear" data-settings>⚙️</button></header>
 <section class="filters"><div class="filterBlock"><div class="rowHead"><h2>Мой депозит</h2><b>${deposit} USDT⌄</b></div><div class="depositGrid">${['50','100','500','1000'].map(d=>`<button class="chip deposit ${d===deposit?'active':''}" data-deposit="${d}"><span>${d}</span><small>USDT</small></button>`).join('')}</div></div>
 <div class="filterBlock"><div class="rowHead"><h2>Биржи</h2><b data-settings>${exchanges.length} из 7⌄</b></div><div class="chips">${visibleExchangeChips()}</div></div>
 <div class="filterBlock"><div class="rowHead"><h2>Тип акций</h2><b>${type}⌄</b></div><div class="chips typeRow">${typeChips()}</div></div></section>
 <div class="section"><div><h2>Лучшие акции сейчас</h2><span>${filtered.length} акций · по потенциалу</span></div><button class="sort">↗ По потенциалу⌄</button></div>
 ${best?`<div class="best"><div><small>Лучший вариант</small><b>${best.ex} • ${best.name}</b></div><div class="money">${best.profit[deposit]}</div></div>`:''}
 <section class="list">${filtered.length?filtered.map(card).join(''):'<div class="empty">Нет акций по выбранным фильтрам</div>'}</section></main>${settingsModal()}<div class="toast" id="toast"></div>`;
 bind();
}
function rangeMax(str){const nums=(str.match(/\d+/g)||[]).map(Number);return nums[nums.length-1]||0}
function card(o){const id=o.ex+'-'+o.name;const is=fav.includes(id);const isExp=expanded===id;return `<article class="offer ${isExp?'expanded':''}" data-expand="${id}"><div class="exLogo"><img src="${logos[o.ex]}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'txt',textContent:'${o.ex.slice(0,2).toUpperCase()}'}))"></div><div class="meta"><div class="exchange">${o.ex} • ${o.type}</div><h3>${o.name}</h3><span class="coin">Монета: ${o.coin}</span><div class="cols"><div class="col"><span>Вложить</span><b>${o.stake}</b></div><div class="col"><span>Потенциал</span><b class="profit">${o.profit[deposit]}</b></div><div class="col"><span>ROI</span><b>${o.roi}</b></div></div>${isExp?`<div class="actions"><button class="star ${is?'on':''}" data-fav="${id}">☆</button><button class="open" data-url="${encodeURIComponent(links[o.ex])}">Открыть</button></div>`:''}</div><div class="score"><div class="ring">${o.score}<small>/100</small></div></div></article>`}
function settingsModal(){return `<div class="modal" id="settings"><div class="sheet"><div class="sheetHead"><h2>Биржи и настройки</h2><button class="close" data-close>×</button></div><div class="sheetGrid">${exOrder.map(ex=>`<button class="sheetChip ${exchanges.includes(ex)?'on':''}" data-toggle-ex="${ex}"><span class="brandIcon"><img src="${logos[ex]}"></span>${ex}</button>`).join('')}</div><div class="setting">Показывать избранное <span class="blueCheck">✓</span></div><div class="setting">Уведомления о новых акциях <span class="blueCheck">✓</span></div><p class="hint">Нажми на карточку акции, чтобы развернуть её и открыть биржу.</p></div></div>`}
function bind(){document.querySelectorAll('[data-deposit]').forEach(b=>b.onclick=()=>{deposit=b.dataset.deposit;save();render()});document.querySelectorAll('[data-ex]').forEach(b=>b.onclick=()=>{const ex=b.dataset.ex;exchanges=exchanges.filter(x=>x!==ex); if(!exchanges.length) exchanges=[ex];save();render()});document.querySelectorAll('[data-toggle-ex]').forEach(b=>b.onclick=()=>{const ex=b.dataset.toggleEx;exchanges=exchanges.includes(ex)?exchanges.filter(x=>x!==ex):[...exchanges,ex];if(!exchanges.length)exchanges=[ex];save();render();setTimeout(openSettings,0)});document.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{type=b.dataset.type;save();render()});document.querySelectorAll('[data-settings]').forEach(b=>b.onclick=openSettings);document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeSettings);document.getElementById('settings').onclick=e=>{if(e.target.id==='settings')closeSettings()};document.querySelectorAll('[data-expand]').forEach(card=>card.onclick=e=>{if(e.target.closest('[data-fav],[data-url]'))return;expanded=expanded===card.dataset.expand?'':card.dataset.expand;render()});document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.fav;fav=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];save();render()});document.querySelectorAll('[data-url]').forEach(b=>b.onclick=e=>{e.stopPropagation();openOffer(decodeURIComponent(b.dataset.url))})}
function openSettings(){document.getElementById('settings').classList.add('show')}
function closeSettings(){document.getElementById('settings').classList.remove('show')}
function toast(t){let el=document.getElementById('toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1700)}
function openOffer(url){window.location.href=url;setTimeout(()=>toast('Открываю страницу акции биржи'),500)}
render();
