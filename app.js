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
let offers=[
 {id:'kucoin-tea-gempool',ex:'KuCoin',type:'GemPool',name:'TEA',coin:'TEA',stake:'KCS / USDT',end:2,endAt:'2026-06-14T00:00:00Z',left:'2 д. 8 ч.',profit:{50:'$5–$15',100:'$9–$30',500:'$45–$120',1000:'$90–$240'},roi:'до 180%',score:87,actions:['GemPool','Spotlight','GemSpace'],source:'KuCoin'},
 {ex:'Bybit',type:'Launch',name:'EXTER / MNT',coin:'EXTER / MNT',stake:'USDT / MNT',end:99,endAt:'2025-01-08T08:59:00Z',left:'завершено',active:false,profit:{50:'$8–$22',100:'$15–$45',500:'$70–$180',1000:'$140–$360'},roi:'14%–45%',score:86,actions:['Launchpad','Launchpool']},
 {ex:'Binance',type:'Launchpool',name:'LISTA',coin:'LISTA',stake:'BNB / FDUSD',end:3,left:'3 д. 12 ч.',profit:{50:'$10–$30',100:'$20–$60',500:'$90–$260',1000:'$180–$520'},roi:'20%–50%',score:80,actions:['Launchpool','Megadrop']},
 {ex:'Gate',type:'Launch',name:'CandyDrop / Pool',coin:'CandyDrop / Pool',stake:'GT / USDT',end:4,left:'4 д. 12 ч.',profit:{50:'$4–$12',100:'$8–$24',500:'$35–$90',1000:'$70–$180'},roi:'8%–24%',score:74,actions:['Launchpad','Launchpool','CandyDrop','Startup']},
 {ex:'Bitget',type:'Launchpool',name:'BGB Pool',coin:'BGB',stake:'BGB / USDT',end:4,left:'4 д. 12 ч.',profit:{50:'$4–$14',100:'$8–$28',500:'$40–$110',1000:'$80–$220'},roi:'10%–30%',score:72,actions:['Launchpool']},
 {ex:'OKX',type:'Jumpstart',name:'Jumpstart',coin:'OKB',stake:'OKB / USDT',end:5,left:'5 д. 0 ч.',profit:{50:'$3–$10',100:'$8–$20',500:'$35–$100',1000:'$70–$200'},roi:'8%–22%',score:72,actions:['Jumpstart']},
 {ex:'Coinbase',type:'Earn',name:'Learning Rewards',coin:'Tasks',stake:'Tasks',end:5,left:'5 д. 0 ч.',profit:{50:'$2–$8',100:'$2–$12',500:'$5–$20',1000:'$8–$30'},roi:'4%–12%',score:70,actions:['Earn']},
 {ex:'BingX',type:'Launchpad',name:'Launchpad Hub',coin:'New coins',stake:'USDT / Tasks',end:6,left:'6 д. 0 ч.',profit:{50:'$3–$9',100:'$6–$18',500:'$30–$80',1000:'$60–$150'},roi:'6%–18%',score:68,actions:['Launchpad']},
 {ex:'MEXC',type:'Kickstarter',name:'MX Exclusives',coin:'MX',stake:'MX / Tasks',end:7,left:'7 д. 0 ч.',profit:{50:'$3–$10',100:'$6–$18',500:'$30–$80',1000:'$60–$160'},roi:'7%–20%',score:66,actions:['Kickstarter','Launchpool']}
];
const app=document.getElementById('app');
const exOrder=['Binance','Bybit','OKX','KuCoin','Gate','MEXC','Bitget','BingX'];
const sortModes=[['today','🔥 Сегодня'],['potential','💰 Потенциал'],['roi','📈 ROI'],['end','⏳ Скоро закончится'],['exchange','🏦 Биржа']];
let deposit=localStorage.prDeposit||'50';
let stored;try{stored=JSON.parse(localStorage.prExchanges||'null')}catch(e){}
let exchanges=Array.isArray(stored)?stored.filter(x=>exOrder.includes(x)):['Binance','Bybit','OKX','KuCoin'];
if(exchanges.length===7 && !exchanges.includes('BingX')) exchanges.push('BingX');
if(!exchanges.length) exchanges=['Binance','Bybit','OKX','KuCoin'];
let selectedTypes=JSON.parse(localStorage.prTypes||'["Все"]');
if(!Array.isArray(selectedTypes)||!selectedTypes.length) selectedTypes=['Все'];
let fav=JSON.parse(localStorage.prFav||'[]');
let expanded=localStorage.prExpanded||'';
let showAllEx=true;
let sort=localStorage.prSort||'today';
function save(){localStorage.prDeposit=deposit;localStorage.prExchanges=JSON.stringify(exchanges);localStorage.prTypes=JSON.stringify(selectedTypes);localStorage.prFav=JSON.stringify(fav);localStorage.prSort=sort;localStorage.prExpanded=expanded}


let liveStatus='static';
function parseMoneyRange(str){const nums=(str.match(/\d+/g)||[]).map(Number);return nums.length>=2?nums:[0,0]}
function fmtMoney(n){if(!isFinite(n)||n<=0)return '$0'; if(n<1)return '<$1'; return '$'+Math.round(n).toLocaleString('en-US')}
function leftFromEndAt(endAt){
 if(!endAt)return null; const diff=new Date(endAt).getTime()-Date.now(); if(diff<=0)return 'завершено';
 const d=Math.floor(diff/86400000); const h=Math.floor((diff%86400000)/3600000); return `${d} д. ${h} ч.`;
}
function mergeLive(payload){
 if(!payload||!payload.offers)return; liveStatus=payload.source||'live';
 offers=offers.map(o=>{const upd=payload.offers.find(x=>x.id===o.id); if(!upd)return o; return {...o,...upd, profit:{...o.profit,...(upd.profit||{})}}});
}
async function loadLive(){
 try{const r=await fetch('/api/live',{cache:'no-store'}); if(!r.ok)throw new Error('no live'); const j=await r.json(); mergeLive(j); save(); render();}
 catch(e){liveStatus='static';}
}

function profitFor(o){
 if(o.realCalc&&o.realCalc.apr){const leftMs=o.endAt?Math.max(0,new Date(o.endAt).getTime()-Date.now()):0; const days=leftMs/86400000; const dep=Number(deposit)||50; const est=dep*(Number(o.realCalc.apr)/100)*(days/365); const lo=Math.max(0,est*0.75); const hi=Math.max(lo,est*1.25); return `${fmtMoney(lo)}–${fmtMoney(hi)}`}
 const exact=o.profit[deposit]; if(exact) return exact;
 const base=o.profit['100']||o.profit['50']||'$0–$0';
 const nums=(base.match(/\d+/g)||[]).map(Number); if(nums.length<2) return base;
 const baseAmount=o.profit['100']?'100':'50'; const k=Number(deposit)/Number(baseAmount);
 const lo=Math.max(1,Math.round(nums[0]*k)); const hi=Math.max(lo,Math.round(nums[1]*k));
 return `$${lo}–$${hi}`;
}
function maxProfit(str){const nums=(str.match(/\d+/g)||[]).map(Number);return nums.at(-1)||0}
function roiMax(str){const nums=(str.match(/\d+/g)||[]).map(Number);return nums.at(-1)||0}
function sortLabel(){return sortModes.find(x=>x[0]===sort)?.[1]||'По потенциалу'}
function sorted(list){return [...list].sort((a,b)=>{if(sort==='today') return a.end-b.end; if(sort==='roi')return roiMax(b.roi)-roiMax(a.roi);if(sort==='end')return a.end-b.end;if(sort==='exchange')return a.ex.localeCompare(b.ex,'ru');return maxProfit(profitFor(b))-maxProfit(profitFor(a));})}
function logoImg(ex){
 const custom={
  OKX:'<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#050505"/><rect x="10" y="10" width="10" height="10" fill="#fff"/><rect x="28" y="10" width="10" height="10" fill="#fff"/><rect x="19" y="19" width="10" height="10" fill="#fff"/><rect x="10" y="28" width="10" height="10" fill="#fff"/><rect x="28" y="28" width="10" height="10" fill="#fff"/></svg>',
  KuCoin:'<svg viewBox="0 0 48 48" aria-label="KuCoin"><defs><linearGradient id="kg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#16c98d"/><stop offset="1" stop-color="#0aa66f"/></linearGradient></defs><rect width="48" height="48" rx="13" fill="url(#kg)"/><path d="M13 12v24" fill="none" stroke="#fff" stroke-width="5.4" stroke-linecap="round"/><path d="M16 24 29 12" fill="none" stroke="#fff" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 24 29 36" fill="none" stroke="#fff" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M29 17 39 24 29 31" fill="none" stroke="#fff" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="29" cy="24" r="3.9" fill="#fff"/></svg>',
  Gate:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="15" fill="none" stroke="#2962ff" stroke-width="7"/><rect x="24" y="10" width="13" height="13" rx="2" fill="#49d391"/><path d="M31 24a7 7 0 1 1-7-7" stroke="#2962ff" stroke-width="7" fill="none" stroke-linecap="round"/></svg>',
  MEXC:'<svg viewBox="0 0 48 48"><path d="M6 32 16 16c2-3 6-3 8 0l4 7 4-7c2-3 6-3 8 0l8 16H37l-5-9-4 7h-8l-4-7-5 9H6Z" fill="#3f6df6"/><path d="M20 30h8l-4-7-4 7Z" fill="#23d6a2"/></svg>',
  Bitget:'<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#6be7ee"/><path d="M18 13 9 24l9 11h8L17 24l9-11h-8Z" fill="#08111f"/><path d="M30 13 21 24l9 11h8L29 24l9-11h-8Z" fill="#08111f" opacity=".82"/></svg>',
  BingX:'<svg viewBox="0 0 48 48"><defs><linearGradient id="bx" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#1264ff"/><stop offset="1" stop-color="#8d5cff"/></linearGradient></defs><rect width="48" height="48" rx="12" fill="url(#bx)"/><path d="M10 16h12l5 8-5 8H10l6-8-6-8Zm18 0h10l-6 8 6 8H28l-5-8 5-8Z" fill="#fff"/></svg>'
 };
 if(custom[ex]) return custom[ex];
 return `<img src="${logos[ex]}" onerror="this.replaceWith(document.createTextNode('${ex.slice(0,2).toUpperCase()}'))">`
}
function exChip(ex){const on=exchanges.includes(ex);return `<button class="chip ex ${on?'active':''} logoOnly" data-toggle-ex="${ex}" title="${ex}"><span class="miniLogo ${ex.toLowerCase()}">${logoImg(ex)}</span></button>`}
function exchangeRow(){return exOrder.map(exChip).join('')}
function typeRow(){return ['Все','Launchpool','Launchpad','GemPool','Jumpstart','Spotlight','Earn','Kickstarter','CandyDrop'].map(t=>`<button class="chip type ${selectedTypes.includes(t)?'active':''}" data-type="${t}">${t}</button>`).join('')}
function matchesType(o){if(selectedTypes.includes('Все'))return true;return selectedTypes.some(t=>{if(t==='Launchpool')return o.actions.includes('Launchpool')||o.type==='Launchpool';if(t==='Launchpad')return o.actions.includes('Launchpad');return o.type===t||o.actions.includes(t)})}
function render(){const now=Date.now();const filtered=sorted(offers.filter(o=>exchanges.includes(o.ex)&&matchesType(o)&&o.active!==false&&(!o.endAt||new Date(o.endAt).getTime()>now)));const best=filtered[0];app.innerHTML=`<main class="page"><header class="top"><img class="logo" src="icon.svg"><div class="title"><h1>PromoRadar AI</h1><p>Акции топ-бирж в одном месте</p></div><button class="gear" data-settings aria-label="Настройки">${gearIcon()}</button></header>
<section class="filters">
 <div class="fBlock"><div class="fHead"><h2>Мой депозит</h2><b>${deposit} USDT⌄</b></div><div class="depositRow custom">${['50','100','500','1000'].map(d=>`<button class="dep ${d===deposit?'active':''}" data-deposit="${d}"><b>${d}</b><small>USDT</small></button>`).join('')}<button class="dep customBtn ${!['50','100','500','1000'].includes(String(deposit))?'active':''}" data-custom><b>Своя</b><small>сумма</small></button></div></div>
 <div class="fBlock"><div class="fHead clean"><h2>Биржи</h2></div><div class="chipRow exRow expanded">${exchangeRow()}</div></div>
 <div class="fBlock"><div class="fHead clean"><h2>Тип акций</h2></div><div class="chipRow typeRow">${typeRow()}</div></div>
</section>
<div class="section"><div><h2>Лучшие акции сейчас</h2><span>${filtered.length} акций · ${sortLabel().toLowerCase()}</span></div><button class="sort" data-sort>↗ ${sortLabel()}⌄</button></div>
${best?`<div class="best"><div><small>Лучший вариант</small><b>${best.ex} • ${best.name}</b></div><strong>${profitFor(best)}</strong></div>`:''}
<section class="list">${filtered.length?filtered.map(card).join(''):'<div class="empty">Нет активных проверенных акций по выбранным фильтрам</div>'}</section><div class="sourceNote"><b>Данные обновляются свайпом вниз</b><span>${liveStatus==='static'?'Если live-источник недоступен, остаётся последняя локальная проверка.':'Live-данные обновлены через Vercel API.'}</span></div>
</main>${settingsModal()}<div id="pullRefresh" class="pullRefresh">↻ Обновить</div><div id="toast" class="toast"></div>`;bind();initPullRefresh()}
function endLabel(o){const live=leftFromEndAt(o.endAt); return live || o.left || (o.end ? `${o.end} д. ${o.end===1?'6':'12'} ч.` : '—')}
function displayLine(o){return `${o.coin} • ${o.type}`}
function card(o){const id=o.ex+'-'+o.name;const is=fav.includes(id);return `<article class="offer v19card" data-card="${id}">
 <div class="cardTop">
   <div class="brandLogo ${o.ex.toLowerCase()}">${logoImg(o.ex)}</div>
   <div class="cardTitle">
     <div class="brandLine"><span class="brand" style="color:${brandColor[o.ex]||'#17994c'}">${o.ex}</span><button class="fav ${is?'on':''}" data-fav="${id}" title="В избранное">☆</button></div>
     <h3>${displayLine(o)}</h3>
   </div>
   <div class="score"><b>${o.score}</b><small>/100</small></div>
 </div>
 <div class="metricGrid">
   <div><small>Вложить</small><b>${o.stake}</b></div>
   <div><small>Потенциал</small><b class="green">${profitFor(o)}</b></div>
   <div><small>ROI</small><b>${o.roi}</b></div>
   <div><small>Осталось</small><b>${endLabel(o)}</b></div>
 </div>
 <div class="actionRow">${o.actions.map(a=>`<button class="action" data-open="${o.ex}|${a}">${a}</button>`).join('')}</div>
 </article>`}
function settingsModal(){return `<div class="modal" id="settings"><div class="sheet"><div class="sheetHead"><h2>Настройки</h2><button data-close class="close">×</button></div><div class="sheetTitle">Показывать биржи</div><div class="sheetGrid">${exOrder.map(ex=>`<button class="sheetChip ${exchanges.includes(ex)?'on':''}" data-toggle-ex="${ex}"><span class="miniLogo ${ex.toLowerCase()}">${logoImg(ex)}</span>${ex}</button>`).join('')}</div><div class="setting">Избранные акции <span>В карточках ☆</span></div><div class="setting">Ссылки <span>Разделы бирж</span></div></div></div>`}
function gearIcon(){return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06A2 2 0 1 1 7.03 3.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.2.36.5.68.9.9.34.2.72.3 1.1.3H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51.8Z"/></svg>`}
function bind(){document.querySelectorAll('[data-deposit]').forEach(b=>b.onclick=()=>{deposit=b.dataset.deposit;save();render()});document.querySelectorAll('[data-custom]').forEach(b=>b.onclick=()=>{const v=prompt('Введите свою сумму в USDT', deposit); if(v===null)return; const n=Math.max(1, Math.round(Number(String(v).replace(',','.'))||0)); if(n){deposit=String(n);save();render()}});document.querySelectorAll('[data-toggle-ex]').forEach(b=>b.onclick=e=>{e.stopPropagation();const ex=b.dataset.toggleEx;exchanges=exchanges.includes(ex)?exchanges.filter(x=>x!==ex):[...exchanges,ex];if(!exchanges.length)exchanges=[ex];save();render();
loadLive();if(document.getElementById('settings')?.classList.contains('show'))setTimeout(openSettings,0)});document.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{const t=b.dataset.type;if(t==='Все'){selectedTypes=['Все']}else{selectedTypes=selectedTypes.filter(x=>x!=='Все');selectedTypes=selectedTypes.includes(t)?selectedTypes.filter(x=>x!==t):[...selectedTypes,t];if(!selectedTypes.length)selectedTypes=['Все']}save();render()});document.querySelectorAll('[data-sort]').forEach(b=>b.onclick=()=>{let i=sortModes.findIndex(x=>x[0]===sort);sort=sortModes[(i+1)%sortModes.length][0];save();render()});document.querySelectorAll('[data-card]').forEach(el=>el.onclick=e=>{if(e.target.closest('[data-fav],[data-open]'))return;expanded=expanded===el.dataset.card?'':el.dataset.card;save();render()});document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.fav;fav=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];save();render()});document.querySelectorAll('[data-open]').forEach(b=>b.onclick=e=>{e.stopPropagation();const [ex,act]=b.dataset.open.split('|');openLink(ex,act)});document.querySelectorAll('[data-settings]').forEach(b=>b.onclick=openSettings);document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeSettings);document.getElementById('settings').onclick=e=>{if(e.target.id==='settings')closeSettings()}}
function openSettings(){document.getElementById('settings').classList.add('show')}
function closeSettings(){document.getElementById('settings').classList.remove('show')}
function showToast(t){const el=document.getElementById('toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1600)}
function openLink(ex,act){const url=(links[ex]&&links[ex][act])||Object.values(links[ex]||{})[0]||'#';showToast(`Открываю ${ex} • ${act}`);setTimeout(()=>{window.location.href=url},120)}

let pullInit=false;
let pullStart=0;
let pulling=false;
let refreshing=false;
async function refreshLive(){
 if(refreshing)return;
 refreshing=true;
 const pr=document.getElementById('pullRefresh');
 if(pr){pr.textContent='⟳ Обновляю данные…';pr.classList.add('show','loading')}
 await loadLive();
 if(pr){pr.textContent='✓ Обновлено';setTimeout(()=>{pr.classList.remove('show','loading');pr.textContent='↻ Обновить'},700)}
 showToast('Данные обновлены');
 refreshing=false;
}
function initPullRefresh(){
 if(pullInit)return; pullInit=true;
 window.addEventListener('touchstart',e=>{if(window.scrollY<=2){pullStart=e.touches[0].clientY;pulling=true}}, {passive:true});
 window.addEventListener('touchmove',e=>{if(!pulling)return; const dy=e.touches[0].clientY-pullStart; const pr=document.getElementById('pullRefresh'); if(dy>35&&pr){pr.classList.add('show');pr.textContent=dy>85?'↻ Отпустите для обновления':'↻ Потяните для обновления'}}, {passive:true});
 window.addEventListener('touchend',()=>{if(!pulling)return; const pr=document.getElementById('pullRefresh'); const active=pr&&pr.classList.contains('show')&&pr.textContent.includes('Отпустите'); pulling=false; if(active) refreshLive(); else if(pr) pr.classList.remove('show')});
}

render();
loadLive();
