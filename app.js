const logos={
  Binance:'https://assets.coingecko.com/markets/images/52/small/binance.jpg',
  Bybit:'https://assets.coingecko.com/markets/images/698/small/bybit_spot.png',
  Coinbase:'https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png'
};
const brandColor={Binance:'#e2a700',Bybit:'#7357d8',OKX:'#111827',KuCoin:'#20a984',Coinbase:'#1f6bff',Gate:'#2675ff',MEXC:'#18a987',Bitget:'#00a6b8',BingX:'#2563eb'};
const links={
  Binance:{Launchpool:'https://www.binance.com/en/launchpool',Megadrop:'https://www.binance.com/en/megadrop',Earn:'https://www.binance.com/en/earn',Staking:'https://www.binance.com/en/earn'},
  Bybit:{Launchpad:'https://www.bybit.com/en/trade/spot/launchpad',Launchpool:'https://www.bybit.com/en/trade/spot/launchpool',Earn:'https://www.bybit.com/en/earn',Staking:'https://www.bybit.com/en/earn'},
  OKX:{Jumpstart:'https://www.okx.com/jumpstart',Earn:'https://www.okx.com/earn',Staking:'https://www.okx.com/earn'},
  KuCoin:{GemPool:'https://www.kucoin.com/gempool',Spotlight:'https://www.kucoin.com/spotlight-center',GemSpace:'https://www.kucoin.com/gemspace/ongoing',Earn:'https://www.kucoin.com/earn',Staking:'https://www.kucoin.com/earn'},
  Coinbase:{Earn:'https://www.coinbase.com/learning-rewards'},
  Gate:{Launchpad:'https://www.gate.com/launchpad',Launchpool:'https://www.gate.com/launchpool',CandyDrop:'https://www.gate.com/candy-drop',Startup:'https://www.gate.com/startup',Earn:'https://www.gate.com/earn',Staking:'https://www.gate.com/earn'},
  MEXC:{Kickstarter:'https://www.mexc.com/announcements/mx-exclusives',Launchpool:'https://www.mexc.com/earn',Earn:'https://www.mexc.com/earn',Staking:'https://www.mexc.com/earn'},
  Bitget:{Launchpool:'https://www.bitget.com/events/launchpool',Earn:'https://www.bitget.com/earn',Staking:'https://www.bitget.com/earn'},
  BingX:{Launchpad:'https://bingx.com/en/launchpad/overview',Earn:'https://bingx.com/en/wealth/',Staking:'https://bingx.com/en/wealth/'}
};
let offers=[
 {id:'kucoin-tea-gempool',active:true,verified:true,category:'Launch',ex:'KuCoin',type:'GemPool',name:'TEA',coin:'TEA',stake:'KCS / USDT',end:2,endAt:'2026-06-14T00:00:00Z',left:null,profit:{50:'$5–$15',100:'$9–$30',500:'$45–$120',1000:'$90–$240'},roi:'до 180%',score:87,actions:['GemPool','Spotlight','GemSpace'],source:'KuCoin',realCalc:{method:'apr_time_prorated',apr:180,source:'KuCoin'}},
 {id:'kucoin-kcs-staking',active:true,verified:true,category:'Staking',ex:'KuCoin',type:'Staking',name:'KCS',coin:'KCS',stake:'KCS',left:'гибко',durationDays:30,profit:{50:'$0.20–$0.70',100:'$0.40–$1.40',500:'$2–$7',1000:'$4–$14'},roi:'5%–18% год',score:76,actions:['Staking','Earn'],source:'KuCoin Earn',realCalc:{method:'apr_time_prorated',apr:12,durationDays:30,source:'KuCoin Earn'}},
 {id:'binance-bnb-earn',active:true,verified:true,category:'Earn',ex:'Binance',type:'Earn',name:'BNB Vault',coin:'BNB',stake:'BNB',left:'гибко',durationDays:30,profit:{50:'$0.10–$0.50',100:'$0.20–$1',500:'$1–$5',1000:'$2–$10'},roi:'2%–12% год',score:74,actions:['Earn','Staking'],source:'Binance Earn',realCalc:{method:'apr_time_prorated',apr:8,durationDays:30,source:'Binance Earn'}},
 {id:'bybit-flexible-earn',active:true,verified:true,category:'Earn',ex:'Bybit',type:'Earn',name:'Flexible Earn',coin:'USDT',stake:'USDT',left:'гибко',durationDays:30,profit:{50:'$0.08–$0.40',100:'$0.16–$0.80',500:'$0.80–$4',1000:'$1.60–$8'},roi:'2%–10% год',score:70,actions:['Earn','Staking'],source:'Bybit Earn',realCalc:{method:'apr_time_prorated',apr:7,durationDays:30,source:'Bybit Earn'}},
 {id:'gate-gt-earn',active:true,verified:true,category:'Staking',ex:'Gate',type:'Staking',name:'GT',coin:'GT',stake:'GT / USDT',left:'гибко',durationDays:30,profit:{50:'$0.10–$0.60',100:'$0.20–$1.20',500:'$1–$6',1000:'$2–$12'},roi:'3%–15% год',score:69,actions:['Staking','Earn'],source:'Gate Earn',realCalc:{method:'apr_time_prorated',apr:10,durationDays:30,source:'Gate Earn'}},
 {id:'bitget-bgb-staking',active:true,verified:true,category:'Staking',ex:'Bitget',type:'Staking',name:'BGB',coin:'BGB',stake:'BGB',left:'гибко',durationDays:30,profit:{50:'$0.10–$0.50',100:'$0.20–$1',500:'$1–$5',1000:'$2–$10'},roi:'3%–12% год',score:68,actions:['Staking','Earn'],source:'Bitget Earn',realCalc:{method:'apr_time_prorated',apr:9,durationDays:30,source:'Bitget Earn'}},
 {id:'okx-simple-earn',active:true,verified:true,category:'Earn',ex:'OKX',type:'Earn',name:'Simple Earn',coin:'USDT',stake:'USDT',left:'гибко',durationDays:30,profit:{50:'$0.08–$0.35',100:'$0.16–$0.70',500:'$0.80–$3.50',1000:'$1.60–$7'},roi:'2%–8% год',score:66,actions:['Earn'],source:'OKX Earn',realCalc:{method:'apr_time_prorated',apr:6,durationDays:30,source:'OKX Earn'}},
 {id:'mexc-mx-staking',active:true,verified:true,category:'Staking',ex:'MEXC',type:'Staking',name:'MX',coin:'MX',stake:'MX',left:'гибко',durationDays:30,profit:{50:'$0.10–$0.50',100:'$0.20–$1',500:'$1–$5',1000:'$2–$10'},roi:'3%–12% год',score:65,actions:['Staking','Earn'],source:'MEXC Earn',realCalc:{method:'apr_time_prorated',apr:8,durationDays:30,source:'MEXC Earn'}},
 {id:'bingx-wealth',active:true,verified:true,category:'Earn',ex:'BingX',type:'Earn',name:'Wealth',coin:'USDT',stake:'USDT',left:'гибко',durationDays:30,profit:{50:'$0.05–$0.30',100:'$0.10–$0.60',500:'$0.50–$3',1000:'$1–$6'},roi:'1%–7% год',score:62,actions:['Earn'],source:'BingX Wealth',realCalc:{method:'apr_time_prorated',apr:5,durationDays:30,source:'BingX Wealth'}},
 {active:false,verified:false,staleReason:'Не подтверждено live-валидацией',id:'bybit-xter-launch',ex:'Bybit',type:'Launch',name:'EXTER / MNT',coin:'EXTER / MNT',stake:'USDT / MNT',end:99,endAt:'2025-01-08T08:59:00Z',left:'завершено',active:false,profit:{50:'$8–$22',100:'$15–$45',500:'$70–$180',1000:'$140–$360'},roi:'14%–45%',score:86,actions:['Launchpad','Launchpool']},
 {active:false,verified:false,staleReason:'Не подтверждено live-валидацией',id:'binance-lista-launchpool',ex:'Binance',type:'Launchpool',name:'LISTA',coin:'LISTA',stake:'BNB / FDUSD',end:3,left:'3 д. 12 ч.',profit:{50:'$10–$30',100:'$20–$60',500:'$90–$260',1000:'$180–$520'},roi:'20%–50%',score:80,actions:['Launchpool','Megadrop'],realCalc:{method:'apr_time_prorated',apr:45,source:'Binance'}},
 {active:false,verified:false,staleReason:'Не подтверждено live-валидацией',id:'gate-launch-center',ex:'Gate',type:'Launch',name:'CandyDrop / Pool',coin:'CandyDrop / Pool',stake:'GT / USDT',end:4,left:'4 д. 12 ч.',profit:{50:'$4–$12',100:'$8–$24',500:'$35–$90',1000:'$70–$180'},roi:'8%–24%',score:74,actions:['Launchpad','Launchpool','CandyDrop','Startup'],realCalc:{method:'apr_time_prorated',apr:28,source:'Gate'}},
 {active:false,verified:false,staleReason:'Не подтверждено live-валидацией',id:'bitget-bgb-launchpool',ex:'Bitget',type:'Launchpool',name:'BGB Pool',coin:'BGB',stake:'BGB / USDT',end:4,left:'4 д. 12 ч.',profit:{50:'$4–$14',100:'$8–$28',500:'$40–$110',1000:'$80–$220'},roi:'10%–30%',score:72,actions:['Launchpool'],realCalc:{method:'apr_time_prorated',apr:30,source:'Bitget'}},
 {active:false,verified:false,staleReason:'Не подтверждено live-валидацией',id:'okx-jumpstart',ex:'OKX',type:'Jumpstart',name:'Jumpstart',coin:'OKB',stake:'OKB / USDT',end:5,left:'5 д. 0 ч.',profit:{50:'$3–$10',100:'$8–$20',500:'$35–$100',1000:'$70–$200'},roi:'8%–22%',score:72,actions:['Jumpstart'],realCalc:{method:'apr_time_prorated',apr:22,source:'OKX'}},
 {active:false,verified:false,staleReason:'Не подтверждено live-валидацией',id:'coinbase-earn',ex:'Coinbase',type:'Earn',name:'Learning Rewards',coin:'Tasks',stake:'Tasks',end:5,left:'5 д. 0 ч.',profit:{50:'$2–$8',100:'$2–$12',500:'$5–$20',1000:'$8–$30'},roi:'4%–12%',score:70,actions:['Earn'],realCalc:{method:'task_reward',apr:12,source:'Coinbase'}},
 {active:false,verified:false,staleReason:'Не подтверждено live-валидацией',id:'bingx-launchpad',ex:'BingX',type:'Launchpad',name:'Launchpad Hub',coin:'New coins',stake:'USDT / Tasks',end:6,left:'6 д. 0 ч.',profit:{50:'$3–$9',100:'$6–$18',500:'$30–$80',1000:'$60–$150'},roi:'6%–18%',score:68,actions:['Launchpad'],realCalc:{method:'apr_time_prorated',apr:18,source:'BingX'}},
 {active:false,verified:false,staleReason:'Не подтверждено live-валидацией',id:'mexc-kickstarter',ex:'MEXC',type:'Kickstarter',name:'MX Exclusives',coin:'MX',stake:'MX / Tasks',end:7,left:'7 д. 0 ч.',profit:{50:'$3–$10',100:'$6–$18',500:'$30–$80',1000:'$60–$160'},roi:'7%–20%',score:66,actions:['Kickstarter','Launchpool'],realCalc:{method:'apr_time_prorated',apr:20,source:'MEXC'}}
];
const app=document.getElementById('app');
const exOrder=['Binance','Bybit','OKX','KuCoin','Gate','MEXC','Bitget','BingX'];
const sortModes=[['today','Сегодня'],['potential','Потенциал'],['roi','ROI'],['end','Осталось'],['exchange','Биржа']];
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
function fmtMoney(n){
 if(!isFinite(n)||n<=0)return '$0.00';
 if(n<1)return '$'+n.toFixed(2);
 if(n<10)return '$'+n.toFixed(2).replace(/\.00$/,'');
 return '$'+Math.round(n).toLocaleString('en-US')
}
function leftFromEndAt(endAt){
 if(!endAt)return null; const diff=new Date(endAt).getTime()-Date.now(); if(diff<=0)return 'завершено';
 const d=Math.floor(diff/86400000); const h=Math.floor((diff%86400000)/3600000); return `${d} д. ${h} ч.`;
}
function mergeLive(payload){
 if(!payload||!payload.offers)return; liveStatus=payload.source||'live';
 offers=offers.map(o=>{
   const upd=payload.offers.find(x=>x.id===o.id);
   if(!upd)return o;
   const merged={...o,...upd, profit:{...o.profit,...(upd.profit||{})}};
   if(upd.profitLive){
     // Store live range as-is; rewardCalc uses realCalc for exact current deposit.
     merged.profit={...merged.profit, live:upd.profitLive};
   }
   return merged;
 });
 const known=new Set(offers.map(o=>o.id).filter(Boolean));
 for(const upd of payload.offers){
   if(upd.id && !known.has(upd.id) && upd.active!==false){
     offers.push({profit:{50:upd.profitLive||'$0–$0'}, score:60, actions:[], ...upd});
   }
 }
}

async function loadLive(){
 try{const r=await fetch('/api/live',{cache:'no-store'}); if(!r.ok)throw new Error('no live'); const j=await r.json(); mergeLive(j); save(); render();}
 catch(e){liveStatus='static';}
}

function daysLeftValue(o){
 if(o.endAt){const d=(new Date(o.endAt).getTime()-Date.now())/86400000; return Math.max(0,d)}
 return Number(o.end)||0;
}
function rewardCalc(o){
 const dep=Number(deposit)||50;
 const r=o.realCalc||o.reward||{};
 if(r.tvlUsd && r.rewardPoolUsd){
   const share=dep/Number(r.tvlUsd);
   const est=Number(r.rewardPoolUsd)*share;
   return {kind:'pool', share, est, lo:est*0.85, hi:est*1.15, source:r.source||o.source||'Биржа'};
 }
 if(r.apr){
   const d=Number(r.durationDays||o.durationDays)||daysLeftValue(o)||30;
   const est=dep*(Number(r.apr)/100)*(d/365);
   return {kind:'apr', days:d, apr:Number(r.apr), est, lo:est*0.75, hi:est*1.25, source:r.source||o.source||'APR'};
 }
 const nums=parseMoneyRange(o.profit?.[deposit]||o.profit?.['100']||o.profit?.['50']||'$0-$0');
 const base=o.profit?.[deposit]?Number(deposit):(o.profit?.['100']?100:50);
 const k=dep/base;
 return {kind:'model', est:((nums[0]+nums[1])/2)*k, lo:nums[0]*k, hi:nums[1]*k, source:'Оценка'};
}
function profitFor(o){
 const c=rewardCalc(o);
 if(c && c.est>0) return `${fmtMoney(c.lo)}–${fmtMoney(c.hi)}`;
 const exact=o.profit[deposit]; if(exact) return exact;
 const base=o.profit['100']||o.profit['50']||'$0–$0';
 const nums=(base.match(/\d+/g)||[]).map(Number); if(nums.length<2) return base;
 const baseAmount=o.profit['100']?'100':'50'; const k=Number(deposit)/Number(baseAmount);
 const lo=Math.max(1,Math.round(nums[0]*k)); const hi=Math.max(lo,Math.round(nums[1]*k));
 return `$${lo}–$${hi}`;
}
function calcLine(o){
 const c=rewardCalc(o); if(!c) return '';
 const dep=`Депозит: $${Number(deposit).toLocaleString('en-US')}`;
 const reward=`Награда: ≈${fmtMoney(c.est)}`;
 if(c.kind==='pool'){return `<div class="calcMini"><span>${dep}</span><span>Доля: ${(c.share*100).toFixed(5)}%</span><span>${reward}</span></div>`}
 if(c.kind==='apr'){return `<div class="calcMini"><span>${dep}</span><span>${reward}</span><span>APR скрыт в расчёте</span></div>`}
 return `<div class="calcMini soft"><span>${dep}</span><span>${reward}</span><span>Оценка</span></div>`
}
function sourceLine(o){
 const verified=o.verified!==false;
 const src=o.source||'official';
 const url=o.sourceUrl||'';
 return `<div class="sourceRow"><span class="verified ${verified?'ok':'warn'}">${verified?'✓ Проверено':'⚠ Требует проверки'}</span><span class="src">${src}</span>${url?`<button class="sourceBtn" data-source="${url}">Открыть источник</button>`:''}</div>`;
}
function maxProfit(str){const nums=(str.match(/\d+/g)||[]).map(Number);return nums.at(-1)||0}
function roiMax(str){const nums=(str.match(/\d+/g)||[]).map(Number);return nums.at(-1)||0}
function sortLabel(){return sortModes.find(x=>x[0]===sort)?.[1]||'По потенциалу'}
function sorted(list){return [...list].sort((a,b)=>{if(sort==='today') return (b.score||0)-(a.score||0); if(sort==='roi')return roiMax(b.roi)-roiMax(a.roi);if(sort==='end')return daysLeftValue(b)-daysLeftValue(a);if(sort==='exchange')return exOrder.indexOf(a.ex)-exOrder.indexOf(b.ex);return maxProfit(profitFor(b))-maxProfit(profitFor(a));})}
function logoImg(ex){
 const custom={
  OKX:'<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#050505"/><rect x="10" y="10" width="10" height="10" fill="#fff"/><rect x="28" y="10" width="10" height="10" fill="#fff"/><rect x="19" y="19" width="10" height="10" fill="#fff"/><rect x="10" y="28" width="10" height="10" fill="#fff"/><rect x="28" y="28" width="10" height="10" fill="#fff"/></svg>',
  KuCoin:'<svg viewBox="0 0 48 48" aria-label="KuCoin"><defs><linearGradient id="kcapp" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#14d4a4"/><stop offset="1" stop-color="#0bbf82"/></linearGradient></defs><rect width="48" height="48" rx="12" fill="url(#kcapp)"/><path d="M14 12v24" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M18 24 31 12" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 24 31 36" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="33" cy="24" r="4.4" fill="#fff"/></svg>',
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
function typeRow(){return ['Все','Launch','Staking','Earn','Airdrop'].map(t=>`<button class="chip type ${selectedTypes.includes(t)?'active':''}" data-type="${t}">${t}</button>`).join('')}
function matchesType(o){if(selectedTypes.includes('Все'))return true;return selectedTypes.some(t=>{
 const cat=o.category||((['Launchpool','Launchpad','GemPool','Jumpstart','Kickstarter','CandyDrop','Spotlight','Launch'].includes(o.type)||['Launchpool','Launchpad','GemPool','Jumpstart','Kickstarter','CandyDrop','Spotlight'].some(a=>(o.actions||[]).includes(a)))?'Launch':o.type);
 if(t==='Launch')return cat==='Launch';
 if(t==='Staking')return cat==='Staking'||o.type==='Staking'||(o.actions||[]).includes('Staking');
 if(t==='Earn')return cat==='Earn'||o.type==='Earn'||(o.actions||[]).includes('Earn');
 if(t==='Airdrop')return cat==='Airdrop'||o.type==='Airdrop'||(o.actions||[]).includes('Airdrop')||o.type==='CandyDrop'||(o.actions||[]).includes('CandyDrop');
 return o.type===t||(o.actions||[]).includes(t);
})}
function render(){const now=Date.now();const filtered=sorted(offers.filter(o=>exchanges.includes(o.ex)&&matchesType(o)&&o.active!==false&&(!o.endAt||new Date(o.endAt).getTime()>now)));const best=filtered[0];app.innerHTML=`<main class="page"><header class="top"><img class="logo" src="icon.svg"><div class="title"><h1>PromoRadar AI</h1><p>Акции топ-бирж в одном месте</p></div></header>
<section class="filters">
 <div class="fBlock"><div class="fHead"><h2>Мой депозит</h2><b>${deposit} USDT⌄</b></div><div class="depositRow custom">${['50','100','500','1000'].map(d=>`<button class="dep ${d===deposit?'active':''}" data-deposit="${d}"><b>${d}</b><small>USDT</small></button>`).join('')}<button class="dep customBtn ${!['50','100','500','1000'].includes(String(deposit))?'active':''}" data-custom><b>Своя</b><small>сумма</small></button></div></div>
 <div class="fBlock"><div class="fHead clean"><h2>Биржи</h2></div><div class="chipRow exRow expanded">${exchangeRow()}</div></div>
 <div class="fBlock"><div class="fHead clean"><h2>Тип заработка</h2></div><div class="chipRow typeRow">${typeRow()}</div></div>
</section>
<div class="section"><div><h2>Лучшие акции сейчас</h2><span>${filtered.length} акций · ${sortLabel().toLowerCase()}</span></div><button class="sort" data-sort>↗ ${sortLabel()}⌄</button></div>
${best?`<div class="best"><div><small>Лучший вариант</small><b>${best.ex} • ${best.name}</b></div><strong>${profitFor(best)}</strong></div>`:''}
<section class="list">${filtered.length?filtered.map(card).join(''):'<div class="empty">Нет активных проверенных акций по выбранным фильтрам. Свайпните вниз для live-проверки бирж.</div>'}</section><div class="liveNote"><b>Live API v32 · Earn + Staking</b><span>Добавлены Launch, Staking, Earn и Airdrop без лишних разделов. Доход считается от вашего депозита; live-валидация акций сохранена.</span></div></main><div id="pullRefresh" class="pullRefresh">↻ Обновить</div><div id="toast" class="toast"></div>`;bind();initPullRefresh()}
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
 ${calcLine(o)}
 ${sourceLine(o)}
 ${expanded===id?detailsPanel(o):''}
 <div class="actionRow">${o.actions.map(a=>`<button class="action" data-open="${o.ex}|${a}">${a}</button>`).join('')}</div>
 </article>`}
function detailsPanel(o){
 const c=rewardCalc(o)||{}; const rc=o.realCalc||{};
 const parts=[];
 if(rc.rewardPoolTEA) parts.push(['Пул наград', Number(rc.rewardPoolTEA).toLocaleString('en-US')+' TEA']);
 if(rc.totalLockedTEA) parts.push(['TVL/блокировка', Number(rc.totalLockedTEA).toLocaleString('en-US')+' TEA']);
 if(rc.participants) parts.push(['Участников', Number(rc.participants).toLocaleString('en-US')]);
 if(rc.apr) parts.push(['APR', Number(rc.apr).toFixed(2).replace('.00','')+'%']);
 parts.push(['Ваш депозит', '$'+Number(deposit).toLocaleString('en-US')]);
 if(c.share) parts.push(['Ваша доля', (c.share*100).toFixed(5)+'%']);
 if(c.est) parts.push(['Ожидаемая награда', '≈'+fmtMoney(c.est)]);
 return `<div class="detailsPanel">${parts.map(([a,b])=>`<div><small>${a}</small><b>${b}</b></div>`).join('')}</div>`;
}
function settingsModal(){return `<div class="modal" id="settings"><div class="sheet"><div class="sheetHead"><h2>Настройки</h2><button data-close class="close">×</button></div><div class="sheetTitle">Показывать биржи</div><div class="sheetGrid">${exOrder.map(ex=>`<button class="sheetChip ${exchanges.includes(ex)?'on':''}" data-toggle-ex="${ex}"><span class="miniLogo ${ex.toLowerCase()}">${logoImg(ex)}</span>${ex}</button>`).join('')}</div><div class="setting">Избранные акции <span>В карточках ☆</span></div><div class="setting">Ссылки <span>Разделы бирж</span></div></div></div>`}
function gearIcon(){return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06A2 2 0 1 1 7.03 3.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.2.36.5.68.9.9.34.2.72.3 1.1.3H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51.8Z"/></svg>`}
function bind(){document.querySelectorAll('[data-deposit]').forEach(b=>b.onclick=()=>{deposit=b.dataset.deposit;save();render()});document.querySelectorAll('[data-custom]').forEach(b=>b.onclick=()=>{const v=prompt('Введите свою сумму в USDT', deposit); if(v===null)return; const n=Math.max(1, Math.round(Number(String(v).replace(',','.'))||0)); if(n){deposit=String(n);save();render()}});document.querySelectorAll('[data-toggle-ex]').forEach(b=>b.onclick=e=>{e.stopPropagation();const ex=b.dataset.toggleEx;exchanges=exchanges.includes(ex)?exchanges.filter(x=>x!==ex):[...exchanges,ex];if(!exchanges.length)exchanges=[ex];save();render();
loadLive();if(document.getElementById('settings')?.classList.contains('show'))setTimeout(openSettings,0)});document.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{const t=b.dataset.type;if(t==='Все'){selectedTypes=['Все']}else{selectedTypes=selectedTypes.filter(x=>x!=='Все');selectedTypes=selectedTypes.includes(t)?selectedTypes.filter(x=>x!==t):[...selectedTypes,t];if(!selectedTypes.length)selectedTypes=['Все']}save();render()});document.querySelectorAll('[data-sort]').forEach(b=>b.onclick=()=>{let i=sortModes.findIndex(x=>x[0]===sort);sort=sortModes[(i+1)%sortModes.length][0];save();render()});document.querySelectorAll('[data-card]').forEach(el=>el.onclick=e=>{if(e.target.closest('[data-fav],[data-open]'))return;expanded=expanded===el.dataset.card?'':el.dataset.card;save();render()});document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.fav;fav=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];save();render()});document.querySelectorAll('[data-open]').forEach(b=>b.onclick=e=>{e.stopPropagation();const [ex,act]=b.dataset.open.split('|');openLink(ex,act)});document.querySelectorAll('[data-source]').forEach(b=>b.onclick=e=>{e.stopPropagation();window.location.href=b.dataset.source});document.querySelectorAll('[data-settings]').forEach(b=>b.onclick=openSettings);document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeSettings);const st=document.getElementById('settings');if(st)st.onclick=e=>{if(e.target.id==='settings')closeSettings()}}
function openSettings(){document.getElementById('settings')?.classList.add('show')}
function closeSettings(){document.getElementById('settings')?.classList.remove('show')}
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


// v32 Earn + Staking placeholder
const telegramPlans={day:5,month:30,sixMonths:120,year:180};
