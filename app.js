const logos={
  Binance:'https://assets.coingecko.com/markets/images/52/small/binance.jpg',
  Bybit:'https://assets.coingecko.com/markets/images/698/small/bybit_spot.png',
  Coinbase:'https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png'
};
const brandColor={Binance:'#e2a700',Bybit:'#7357d8',OKX:'#111827',KuCoin:'#20a984',Coinbase:'#1f6bff',Gate:'#2675ff',MEXC:'#18a987',Bitget:'#00a6b8',BingX:'#2563eb'};
const links={
  Binance:{Launchpool:'https://www.binance.com/en/launchpool',Megadrop:'https://www.binance.com/en/megadrop'},
  Bybit:{Launchpad:'https://www.bybit.com/en/trade/spot/launchpad',Launchpool:'https://www.bybit.com/en/trade/spot/launchpool'},
  OKX:{Jumpstart:'https://www.okx.com/jumpstart'},
  KuCoin:{GemPool:'https://www.kucoin.com/gempool',Spotlight:'https://www.kucoin.com/spotlight-center',GemSpace:'https://www.kucoin.com/gemspace/ongoing'},
  Coinbase:{Earn:'https://www.coinbase.com/learning-rewards'},
  Gate:{Launchpad:'https://www.gate.com/launchpad',Launchpool:'https://www.gate.com/launchpool',CandyDrop:'https://www.gate.com/candy-drop',Startup:'https://www.gate.com/startup'},
  MEXC:{Kickstarter:'https://www.mexc.com/announcements/mx-exclusives',Launchpool:'https://www.mexc.com/earn'},
  Bitget:{Launchpool:'https://www.bitget.com/events/launchpool'},
  BingX:{Launchpad:'https://bingx.com/en/launchpad/overview'}
};
const offers=[
 {ex:'KuCoin',type:'GemPool',name:'TEA',coin:'TEA',stake:'KCS / USDT',end:3,profit:{50:'$5–$15',100:'$9–$30',500:'$45–$120',1000:'$90–$240'},roi:'до 180%',score:87,actions:['GemPool','Spotlight','GemSpace']},
 {ex:'Bybit',type:'Launch',name:'EXTER / MNT',coin:'EXTER / MNT',stake:'USDT / MNT',end:2,profit:{50:'$8–$22',100:'$15–$45',500:'$70–$180',1000:'$140–$360'},roi:'14%–45%',score:86,actions:['Launchpad','Launchpool']},
 {ex:'Binance',type:'Launchpool',name:'LISTA',coin:'LISTA',stake:'BNB / FDUSD',end:3,profit:{50:'$10–$30',100:'$20–$60',500:'$90–$260',1000:'$180–$520'},roi:'20%–50%',score:80,actions:['Launchpool','Megadrop']},
 {ex:'Gate',type:'Launch',name:'CandyDrop / Pool',coin:'CandyDrop / Pool',stake:'GT / USDT',end:4,profit:{50:'$4–$12',100:'$8–$24',500:'$35–$90',1000:'$70–$180'},roi:'8%–24%',score:74,actions:['Launchpad','Launchpool','CandyDrop','Startup']},
 {ex:'Bitget',type:'Launchpool',name:'BGB Pool',coin:'BGB',stake:'BGB / USDT',end:4,profit:{50:'$4–$14',100:'$8–$28',500:'$40–$110',1000:'$80–$220'},roi:'10%–30%',score:72,actions:['Launchpool']},
 {ex:'OKX',type:'Jumpstart',name:'Jumpstart',coin:'OKB',stake:'OKB / USDT',end:5,profit:{50:'$3–$10',100:'$8–$20',500:'$35–$100',1000:'$70–$200'},roi:'8%–22%',score:72,actions:['Jumpstart']},
 {ex:'Coinbase',type:'Earn',name:'Learning Rewards',coin:'Tasks',stake:'Tasks',end:5,profit:{50:'$2–$8',100:'$2–$12',500:'$5–$20',1000:'$8–$30'},roi:'4%–12%',score:70,actions:['Earn']},
 {ex:'BingX',type:'Launchpad',name:'Launchpad Hub',coin:'New coins',stake:'USDT / Tasks',end:6,profit:{50:'$3–$9',100:'$6–$18',500:'$30–$80',1000:'$60–$150'},roi:'6%–18%',score:68,actions:['Launchpad']},
 {ex:'MEXC',type:'Kickstarter',name:'MX Exclusives',coin:'MX',stake:'MX / Tasks',end:7,profit:{50:'$3–$10',100:'$6–$18',500:'$30–$80',1000:'$60–$160'},roi:'7%–20%',score:66,actions:['Kickstarter','Launchpool']}
];
const app=document.getElementById('app');
const exOrder=['Binance','Bybit','OKX','KuCoin','Gate','MEXC','Bitget','BingX'];
const sortModes=[['potential','По потенциалу'],['roi','По ROI'],['score','По рейтингу'],['end','По сроку'],['exchange','По бирже']];
let deposit=localStorage.prDeposit||'50';
let stored;try{stored=JSON.parse(localStorage.prExchanges||'null')}catch(e){}
let exchanges=Array.isArray(stored)?stored.filter(x=>exOrder.includes(x)):['Binance','Bybit','OKX','KuCoin'];
if(exchanges.length===7 && !exchanges.includes('BingX')) exchanges.push('BingX');
if(!exchanges.length) exchanges=['Binance','Bybit','OKX','KuCoin'];
let type=localStorage.prType||'Все';
let fav=JSON.parse(localStorage.prFav||'[]');
let expanded=localStorage.prExpanded||'';
let showAllEx=false;
let sort=localStorage.prSort||'potential';
function save(){localStorage.prDeposit=deposit;localStorage.prExchanges=JSON.stringify(exchanges);localStorage.prType=type;localStorage.prFav=JSON.stringify(fav);localStorage.prSort=sort;localStorage.prExpanded=expanded}
function maxProfit(str){const nums=(str.match(/\d+/g)||[]).map(Number);return nums.at(-1)||0}
function roiMax(str){const nums=(str.match(/\d+/g)||[]).map(Number);return nums.at(-1)||0}
function sortLabel(){return sortModes.find(x=>x[0]===sort)?.[1]||'По потенциалу'}
function sorted(list){return [...list].sort((a,b)=>{if(sort==='roi')return roiMax(b.roi)-roiMax(a.roi);if(sort==='score')return b.score-a.score;if(sort==='end')return a.end-b.end;if(sort==='exchange')return a.ex.localeCompare(b.ex,'ru');return maxProfit(b.profit[deposit])-maxProfit(a.profit[deposit]);})}
function logoImg(ex){
 const custom={
  OKX:'<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#050505"/><rect x="10" y="10" width="10" height="10" fill="#fff"/><rect x="28" y="10" width="10" height="10" fill="#fff"/><rect x="19" y="19" width="10" height="10" fill="#fff"/><rect x="10" y="28" width="10" height="10" fill="#fff"/><rect x="28" y="28" width="10" height="10" fill="#fff"/></svg>',
  KuCoin:'<svg viewBox="0 0 48 48"><path d="M12 12v24l10-10 8 8 6-6-8-8 8-8-6-6-18 18" fill="none" stroke="#1fc58b" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><circle cx="25" cy="24" r="3.5" fill="#1fc58b"/></svg>',
  Gate:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="15" fill="none" stroke="#2962ff" stroke-width="7"/><rect x="24" y="10" width="13" height="13" rx="2" fill="#49d391"/><path d="M31 24a7 7 0 1 1-7-7" stroke="#2962ff" stroke-width="7" fill="none" stroke-linecap="round"/></svg>',
  MEXC:'<svg viewBox="0 0 48 48"><path d="M6 32 16 16c2-3 6-3 8 0l4 7 4-7c2-3 6-3 8 0l8 16H37l-5-9-4 7h-8l-4-7-5 9H6Z" fill="#3f6df6"/><path d="M20 30h8l-4-7-4 7Z" fill="#23d6a2"/></svg>',
  Bitget:'<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#6be7ee"/><path d="M18 13 9 24l9 11h8L17 24l9-11h-8Z" fill="#08111f"/><path d="M30 13 21 24l9 11h8L29 24l9-11h-8Z" fill="#08111f" opacity=".82"/></svg>',
  BingX:'<svg viewBox="0 0 48 48"><defs><linearGradient id="bx" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#1264ff"/><stop offset="1" stop-color="#8d5cff"/></linearGradient></defs><rect width="48" height="48" rx="12" fill="url(#bx)"/><path d="M10 16h12l5 8-5 8H10l6-8-6-8Zm18 0h10l-6 8 6 8H28l-5-8 5-8Z" fill="#fff"/></svg>'
 };
 if(custom[ex]) return custom[ex];
 return `<img src="${logos[ex]}" onerror="this.replaceWith(document.createTextNode('${ex.slice(0,2).toUpperCase()}'))">`
}
function exChip(ex){const on=exchanges.includes(ex);const compact=showAllEx;return `<button class="chip ex ${on?'active':''} ${compact?'logoOnly':''}" data-toggle-ex="${ex}" title="${ex}"><span class="miniLogo ${ex.toLowerCase()}">${logoImg(ex)}</span>${compact?'':`<span class="exName">${ex}</span>${on?'<span class="tick">✓</span>':''}`}</button>`}
function exchangeRow(){const list=showAllEx?exOrder:exOrder.slice(0,4);const more=exOrder.length-4;return list.map(exChip).join('')+(showAllEx?`<button class="chip more hideBtn active" data-more>Скрыть</button>`:`<button class="chip more" data-more>+${more}⌄</button>`)}
function typeRow(){return ['Все','Launchpool','Launchpad','GemPool','Jumpstart','Spotlight','Earn','Kickstarter'].map(t=>`<button class="chip type ${t===type?'active':''}" data-type="${t}">${t}</button>`).join('')}
function matchesType(o){if(type==='Все')return true;if(type==='Launchpool')return o.actions.includes('Launchpool')||o.type==='Launchpool';if(type==='Launchpad')return o.actions.includes('Launchpad');return o.type===type||o.actions.includes(type)}
function render(){const filtered=sorted(offers.filter(o=>exchanges.includes(o.ex)&&matchesType(o)));const best=filtered[0];app.innerHTML=`<main class="page"><header class="top"><img class="logo" src="icon.svg"><div class="title"><h1>PromoRadar AI</h1><p>Акции топ-бирж в одном месте</p></div><button class="gear" data-settings aria-label="Настройки">${gearIcon()}</button></header>
<section class="filters">
 <div class="fBlock"><div class="fHead"><h2>Мой депозит</h2><b>${deposit} USDT⌄</b></div><div class="depositRow">${['50','100','500','1000'].map(d=>`<button class="dep ${d===deposit?'active':''}" data-deposit="${d}"><b>${d}</b><small>USDT</small></button>`).join('')}</div></div>
 <div class="fBlock"><div class="fHead"><h2>Биржи</h2><b>${exchanges.length} из ${exOrder.length}⌄</b></div><div class="chipRow exRow ${showAllEx?'expanded':''}">${exchangeRow()}</div></div>
 <div class="fBlock"><div class="fHead"><h2>Тип акций</h2><b>${type}⌄</b></div><div class="chipRow typeRow">${typeRow()}</div></div>
</section>
<div class="section"><div><h2>Лучшие акции сейчас</h2><span>${filtered.length} акций · ${sortLabel().toLowerCase()}</span></div><button class="sort" data-sort>↗ ${sortLabel()}⌄</button></div>
${best?`<div class="best"><div><small>Лучший вариант</small><b>${best.ex} • ${best.name}</b></div><strong>${best.profit[deposit]}</strong></div>`:''}
<section class="list">${filtered.length?filtered.map(card).join(''):'<div class="empty">Нет акций по выбранным фильтрам</div>'}</section>
</main>${settingsModal()}<div id="toast" class="toast"></div>`;bind()}
function displayLine(o){return `${o.coin} • ${o.type}`}
function card(o){const id=o.ex+'-'+o.name;const is=fav.includes(id);return `<article class="offer" data-card="${id}">
 <div class="brandLogo ${o.ex.toLowerCase()}">${logoImg(o.ex)}</div>
 <div class="info">
   <div class="brandLine"><span class="brand" style="color:${brandColor[o.ex]||'#17994c'}">${o.ex}</span><button class="fav ${is?'on':''}" data-fav="${id}" title="В избранное">☆</button></div>
   <h3>${displayLine(o)}</h3>
   <div class="grid"><div><small>Вложить</small><b>${o.stake}</b></div><div><small>Потенциал</small><b class="green">${o.profit[deposit]}</b></div><div><small>ROI</small><b>${o.roi}</b></div></div>
   <div class="actionRow">${o.actions.map(a=>`<button class="action" data-open="${o.ex}|${a}">${a}</button>`).join('')}</div>
 </div>
 <div class="score"><b>${o.score}</b><small>/100</small></div>
 </article>`}
function settingsModal(){return `<div class="modal" id="settings"><div class="sheet"><div class="sheetHead"><h2>Настройки</h2><button data-close class="close">×</button></div><div class="sheetTitle">Показывать биржи</div><div class="sheetGrid">${exOrder.map(ex=>`<button class="sheetChip ${exchanges.includes(ex)?'on':''}" data-toggle-ex="${ex}"><span class="miniLogo ${ex.toLowerCase()}">${logoImg(ex)}</span>${ex}</button>`).join('')}</div><div class="setting">Избранные акции <span>В карточках ☆</span></div><div class="setting">Ссылки <span>Разделы бирж</span></div></div></div>`}
function gearIcon(){return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06A2 2 0 1 1 7.03 3.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.2.36.5.68.9.9.34.2.72.3 1.1.3H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51.8Z"/></svg>`}
function bind(){document.querySelectorAll('[data-deposit]').forEach(b=>b.onclick=()=>{deposit=b.dataset.deposit;save();render()});document.querySelectorAll('[data-toggle-ex]').forEach(b=>b.onclick=e=>{e.stopPropagation();const ex=b.dataset.toggleEx;exchanges=exchanges.includes(ex)?exchanges.filter(x=>x!==ex):[...exchanges,ex];if(!exchanges.length)exchanges=[ex];save();render();if(document.getElementById('settings')?.classList.contains('show'))setTimeout(openSettings,0)});document.querySelectorAll('[data-more]').forEach(b=>b.onclick=()=>{showAllEx=!showAllEx;render()});document.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{type=b.dataset.type;save();render()});document.querySelectorAll('[data-sort]').forEach(b=>b.onclick=()=>{let i=sortModes.findIndex(x=>x[0]===sort);sort=sortModes[(i+1)%sortModes.length][0];save();render()});document.querySelectorAll('[data-card]').forEach(el=>el.onclick=e=>{if(e.target.closest('[data-fav],[data-open]'))return;expanded=expanded===el.dataset.card?'':el.dataset.card;save();render()});document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.fav;fav=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];save();render()});document.querySelectorAll('[data-open]').forEach(b=>b.onclick=e=>{e.stopPropagation();const [ex,act]=b.dataset.open.split('|');openLink(ex,act)});document.querySelectorAll('[data-settings]').forEach(b=>b.onclick=openSettings);document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeSettings);document.getElementById('settings').onclick=e=>{if(e.target.id==='settings')closeSettings()}}
function openSettings(){document.getElementById('settings').classList.add('show')}
function closeSettings(){document.getElementById('settings').classList.remove('show')}
function showToast(t){const el=document.getElementById('toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1600)}
function openLink(ex,act){const url=(links[ex]&&links[ex][act])||Object.values(links[ex]||{})[0]||'#';showToast(`Открываю ${ex} • ${act}`);setTimeout(()=>{window.location.href=url},120)}
render();
