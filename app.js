const EXCHANGES = [
  {id:'binance', name:'Binance', short:'B.', color:'binance', url:'https://www.binance.com/en/launchpool', logo:'binance'},
  {id:'bybit', name:'Bybit', short:'B.', color:'bybit', url:'https://www.bybit.com/en/trade/spot/launchpad', logo:'bybit'},
  {id:'okx', name:'OKX', short:'O', color:'okx', url:'https://www.okx.com/jumpstart', logo:'okx'},
  {id:'kucoin', name:'KuCoin', short:'K.', color:'kucoin', url:'https://www.kucoin.com/spotlight', logo:'kucoin'},
  {id:'gate', name:'Gate', short:'G.', color:'gate', url:'https://www.gate.com/startup', logo:'gate'},
  {id:'mexc', name:'MEXC', short:'M.', color:'mexc', url:'https://www.mexc.com/announcements/all', logo:'mexc'},
  {id:'bitget', name:'Bitget', short:'Bg', color:'kucoin', url:'https://www.bitget.com/events', logo:'bitget'}
];
const TYPES = ['Все','Launchpool','Launchpad','Jumpstart','Spotlight','Airdrop','Earn','Startup'];
const DEPOSITS=[50,100,500,1000];
let state={deposit:1000, exchanges:['binance','bybit','okx','kucoin','gate','mexc','bitget'], type:'Все', sort:'exchange', expanded:false, saved:new Set(JSON.parse(localStorage.getItem('savedOffers')||'[]'))};

const offers=[
  {id:'mexc-desu', exchange:'mexc', type:'Airdrop', title:'DESU Airdrop+', coin:'DESU', invest:'Tasks / Trade', baseMin:40, baseMax:140, roiMin:6, roiMax:18, score:72, active:true, verified:true, links:[{label:'Airdrop', url:'https://www.mexc.com/announcements/all'}]},
  {id:'binance-launchpool', exchange:'binance', type:'Launchpool', title:'Новых проектов нет', coin:'—', invest:'BNB / FDUSD', baseMin:0, baseMax:0, roiMin:0, roiMax:0, score:0, active:false, verified:true, links:[{label:'Launchpool', url:'https://www.binance.com/en/launchpool'}]},
  {id:'bybit-hub', exchange:'bybit', type:'Launchpad', title:'Launchpad / Launchpool', coin:'—', invest:'MNT / USDT', baseMin:0, baseMax:0, roiMin:0, roiMax:0, score:0, active:false, verified:true, links:[{label:'Launchpad', url:'https://www.bybit.com/en/trade/spot/launchpad'}, {label:'Launchpool', url:'https://www.bybit.com/en/trade/spot/launchpool'}]},
  {id:'kucoin-spotlight', exchange:'kucoin', type:'Spotlight', title:'Spotlight', coin:'—', invest:'KCS / USDT', baseMin:0, baseMax:0, roiMin:0, roiMax:0, score:0, active:false, verified:true, links:[{label:'Spotlight', url:'https://www.kucoin.com/spotlight'}]},
  {id:'gate-startup', exchange:'gate', type:'Startup', title:'Startup / CandyDrop', coin:'—', invest:'GT / USDT', baseMin:0, baseMax:0, roiMin:0, roiMax:0, score:0, active:false, verified:true, links:[{label:'Startup', url:'https://www.gate.com/startup'}]},
  {id:'okx-jumpstart', exchange:'okx', type:'Jumpstart', title:'Новых проектов нет', coin:'—', invest:'OKB / USDT', baseMin:0, baseMax:0, roiMin:0, roiMax:0, score:0, active:false, verified:true, links:[{label:'Jumpstart', url:'https://www.okx.com/jumpstart'}]}
];
function logo(type){
 const common='viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"';
 if(type==='binance')return `<svg ${common}><rect width="64" height="64" rx="15" fill="#0b1220"/><path fill="#f3ba2f" d="M32 10 42 20 36 26 32 22 28 26 22 20 32 10Zm-18 18 6-6 6 6-6 6-6-6Zm18 0 6 6-6 6-6-6 6-6Zm18 0 6-6 6 6-6 6-6-6ZM22 44l6-6 4 4 4-4 6 6-10 10-10-10Z"/></svg>`;
 if(type==='bybit')return `<svg ${common}><rect width="64" height="64" rx="15" fill="#111727"/><text x="32" y="37" text-anchor="middle" font-size="17" font-family="Arial" font-weight="900" fill="#fff">BYBIT</text><rect x="42" y="15" width="4" height="28" fill="#f7a51d"/></svg>`;
 if(type==='okx')return `<svg ${common}><rect width="64" height="64" rx="15" fill="#050505"/><g fill="#fff"><rect x="14" y="14" width="13" height="13"/><rect x="37" y="14" width="13" height="13"/><rect x="25.5" y="25.5" width="13" height="13"/><rect x="14" y="37" width="13" height="13"/><rect x="37" y="37" width="13" height="13"/></g></svg>`;
 if(type==='kucoin')return `<svg ${common}><rect width="64" height="64" rx="15" fill="#fff"/><path d="M18 18v28l9-9 7 7h12L31 31l15-13H34l-16 16V18h-8v28h8V18Z" fill="#25c49a"/><circle cx="32" cy="32" r="4" fill="#25c49a"/></svg>`;
 if(type==='gate')return `<svg ${common}><rect width="64" height="64" rx="15" fill="#fff"/><path d="M35 15a17 17 0 1 0 14 27H35V30h27A30 30 0 1 1 52 12l-8 9a17 17 0 0 0-9-6Z" fill="#2266ec"/><rect x="39" y="12" width="12" height="12" rx="2" fill="#74e2b6"/></svg>`;
 if(type==='mexc')return `<svg ${common}><rect width="64" height="64" rx="15" fill="#071120"/><path d="M17 42 27 22c2-4 8-4 10 0l10 20h-9l-6-12-6 12h-9Z" fill="#37df9e"/><path d="M30 42 40 22c2-4 8-4 10 0l10 20h-9l-6-12-6 12h-9Z" fill="#2d68ff" opacity=".9"/></svg>`;
 if(type==='bitget')return `<svg ${common}><rect width="64" height="64" rx="15" fill="#5ce4ed"/><path d="M22 18h20L29 31l13 15H22l-9-10 14-14-5-4Z" fill="#101820"/></svg>`;
}
function ex(id){return EXCHANGES.find(e=>e.id===id)}
function calc(o){let f=state.deposit/50; return {min:Math.round(o.baseMin*f), max:Math.round(o.baseMax*f)}}
function currentOffers(){
 let arr=offers.filter(o=>state.exchanges.includes(o.exchange));
 if(state.type!=='Все') arr=arr.filter(o=>o.type===state.type || (o.links||[]).some(l=>l.label===state.type));
 arr=arr.filter(o=>o.active && o.baseMax>0); // не показываем завершённые/пустые
 if(state.sort==='roi') arr.sort((a,b)=>b.roiMax-a.roiMax);
 else if(state.sort==='rating') arr.sort((a,b)=>b.score-a.score);
 else if(state.sort==='exchange') arr.sort((a,b)=>ex(a.exchange).name.localeCompare(ex(b.exchange).name));
 else arr.sort((a,b)=>calc(b).max-calc(a).max);
 return arr;
}
function renderFilters(){
 document.getElementById('depositLabel').textContent=`${state.deposit} USDT⌄`;
 document.getElementById('depositChips').innerHTML=DEPOSITS.map(d=>`<button class="chip ${state.deposit===d?'active':''}" data-deposit="${d}"><strong>${d}</strong><small>USDT</small></button>`).join('');
 const shown = state.expanded? EXCHANGES : EXCHANGES.slice(0,4);
 document.getElementById('exchangeToggle').textContent=`${state.exchanges.length} из ${EXCHANGES.length}⌄`;
 const wrap=document.getElementById('exchangeChips'); wrap.className='chips exchanges '+(state.expanded?'expanded':'');
 wrap.innerHTML=shown.map(e=>`<button class="chip ${state.exchanges.includes(e.id)?'active':''}" data-ex="${e.id}"><span class="ex-logo">${logo(e.logo)}</span><span class="short">${e.short}</span><span class="full">${e.name}</span>${state.exchanges.includes(e.id)?'<span class="check">✓</span>':''}</button>`).join('') + (!state.expanded?`<button class="chip" id="moreEx">+${EXCHANGES.length-4}⌄</button>`:'');
 document.getElementById('typeLabel').textContent=state.type+'⌄';
 document.getElementById('typeChips').innerHTML=TYPES.slice(0,5).map(t=>`<button class="chip ${state.type===t?'active':''}" data-type="${t}">${t}</button>`).join('');
}
function renderCards(){
 const arr=currentOffers();
 const sortNames={potential:'по потенциалу',roi:'по ROI',rating:'по рейтингу',exchange:'по бирже'};
 document.getElementById('countLabel').textContent=`${arr.length} акций • ${sortNames[state.sort]}`;
 document.getElementById('sortBtn').textContent=(state.sort==='potential'?'↗ По потенциалу⌄':state.sort==='roi'?'% По ROI⌄':state.sort==='rating'?'◎ По рейтингу⌄':'↗ По бирже⌄');
 const best=document.getElementById('bestCard');
 if(arr[0]){const c=calc(arr[0]); best.hidden=false; best.innerHTML=`<div><small>Лучший вариант</small><b>${ex(arr[0].exchange).name} • ${arr[0].title}</b></div><strong>$${c.min}–$${c.max}</strong>`} else best.hidden=true;
 document.getElementById('emptyState').hidden=arr.length>0;
 document.getElementById('cards').innerHTML=arr.map(cardHtml).join('');
}
function cardHtml(o){const e=ex(o.exchange); const c=calc(o); const saved=state.saved.has(o.id); return `<article class="offer-card">
  <div class="offer-logo">${logo(e.logo)}</div>
  <div class="offer-main">
    <div class="brand-line"><span class="brand-name ${e.color}">${e.name}</span><span class="tag">${o.type}</span></div>
    <h3 class="title">${o.title}</h3>
    <span class="coin">Монета: ${o.coin}</span>
    <div class="metrics"><div class="metric"><span>Вложить</span><b>${o.invest}</b></div><div class="metric"><span>Потенциал</span><b class="money">$${c.min}–$${c.max}</b></div><div class="metric"><span>ROI</span><b>${o.roiMin}%–${o.roiMax}%</b></div></div>
  </div>
  <div class="score"><div><b>${o.score}</b><small>/100</small></div></div>
  <div class="actions"><button class="star ${saved?'saved':''}" data-save="${o.id}">☆</button>${(o.links||[]).map(l=>`<button class="action-link" data-url="${l.url}">${l.label}</button>`).join('')}</div>
</article>`}
function render(){renderFilters();renderCards();bind()}
function bind(){
 document.querySelectorAll('[data-deposit]').forEach(b=>b.onclick=()=>{state.deposit=+b.dataset.deposit;render()});
 document.querySelectorAll('[data-ex]').forEach(b=>b.onclick=()=>{const id=b.dataset.ex; state.exchanges=state.exchanges.includes(id)?state.exchanges.filter(x=>x!==id):[...state.exchanges,id];render()});
 document.getElementById('moreEx')?.addEventListener('click',()=>{state.expanded=true;render()});
 document.getElementById('exchangeToggle').onclick=()=>{state.expanded=!state.expanded;render()};
 document.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{state.type=b.dataset.type;render()});
 document.querySelectorAll('[data-save]').forEach(b=>b.onclick=()=>{const id=b.dataset.save; state.saved.has(id)?state.saved.delete(id):state.saved.add(id); localStorage.setItem('savedOffers',JSON.stringify([...state.saved]));render()});
 document.querySelectorAll('[data-url]').forEach(b=>b.onclick=()=>{window.location.href=b.dataset.url});
}
document.getElementById('sortBtn').onclick=()=>{const order=['potential','roi','rating','exchange']; state.sort=order[(order.indexOf(state.sort)+1)%order.length];renderCards();bind()};
const sheet=document.getElementById('settingsSheet'), back=document.getElementById('sheetBackdrop');
document.getElementById('settingsBtn').onclick=()=>{back.hidden=false;sheet.classList.add('open');sheet.setAttribute('aria-hidden','false')};
function closeSheet(){sheet.classList.remove('open');sheet.setAttribute('aria-hidden','true');setTimeout(()=>back.hidden=true,180)}
document.getElementById('closeSettings').onclick=closeSheet;back.onclick=closeSheet;
render();
