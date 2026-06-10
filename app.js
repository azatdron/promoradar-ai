const logos={
  Binance:'https://assets.coingecko.com/markets/images/52/small/binance.jpg',
  Bybit:'https://assets.coingecko.com/markets/images/698/small/bybit_spot.png',
  OKX:'https://assets.coingecko.com/markets/images/96/small/WeChat_Image_20220117220452.png',
  KuCoin:'https://assets.coingecko.com/markets/images/61/small/kucoin.png',
  Coinbase:'https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png',
  Gate:'https://assets.coingecko.com/markets/images/60/small/gate_io_logo1.jpg',
  MEXC:'https://assets.coingecko.com/markets/images/409/small/WeChat_Image_20210622160936.png',
  Bitget:'https://assets.coingecko.com/markets/images/540/small/bitget.png'
};
const brandColor={Binance:'#e2a700',Bybit:'#7357d8',OKX:'#111827',KuCoin:'#20a984',Coinbase:'#1f6bff',Gate:'#2675ff',MEXC:'#18a987',Bitget:'#00a6b8'};
const links={
  Binance:{Launchpool:'https://www.binance.com/en/launchpool',Megadrop:'https://www.binance.com/en/megadrop'},
  Bybit:{Launchpad:'https://www.bybit.com/en/trade/spot/launchpad',Launchpool:'https://www.bybit.com/en/trade/spot/launchpool'},
  OKX:{Jumpstart:'https://www.okx.com/jumpstart'},
  KuCoin:{Spotlight:'https://www.kucoin.com/spotlight-center'},
  Coinbase:{Earn:'https://www.coinbase.com/learning-rewards'},
  Gate:{Startup:'https://www.gate.io/startup'},
  MEXC:{Airdrop:'https://www.mexc.com/airdrop'},
  Bitget:{Launchpool:'https://www.bitget.com/events/launchpool'}
};
const offers=[
 {ex:'KuCoin',type:'Spotlight',name:'ALT Sale',coin:'ALT',stake:'KCS / USDT',end:4,profit:{50:'$5–$15',100:'$9–$30',500:'$45–$120',1000:'$90–$240'},roi:'12%–35%',score:85,actions:['Spotlight']},
 {ex:'Bybit',type:'Launchpad',name:'EXTER Sale',coin:'EXTER',stake:'USDT / MNT',end:2,profit:{50:'$8–$22',100:'$15–$45',500:'$70–$180',1000:'$140–$360'},roi:'14%–45%',score:86,actions:['Launchpad','Launchpool']},
 {ex:'Bybit',type:'Launchpool',name:'MNT Pool',coin:'MNT',stake:'MNT / USDT',end:3,profit:{50:'$7–$20',100:'$15–$45',500:'$60–$160',1000:'$120–$320'},roi:'18%–45%',score:82,actions:['Launchpool','Launchpad']},
 {ex:'Binance',type:'Launchpool',name:'Lista DAO',coin:'LISTA',stake:'BNB / FDUSD',end:3,profit:{50:'$10–$30',100:'$20–$60',500:'$90–$260',1000:'$180–$520'},roi:'20%–50%',score:80,actions:['Launchpool','Megadrop']},
 {ex:'OKX',type:'Jumpstart',name:'ZETA Event',coin:'ZETA',stake:'OKB / USDT',end:1,profit:{50:'$6–$14',100:'$10–$25',500:'$50–$120',1000:'$100–$240'},roi:'12%–28%',score:78,actions:['Jumpstart']},
 {ex:'Coinbase',type:'Earn',name:'OP Learn',coin:'OP',stake:'Tasks',end:5,profit:{50:'$2–$8',100:'$2–$12',500:'$5–$20',1000:'$8–$30'},roi:'4%–12%',score:70,actions:['Earn']},
 {ex:'Gate',type:'Startup',name:'XYZ Startup',coin:'XYZ',stake:'GT / USDT',end:6,profit:{50:'$4–$12',100:'$8–$24',500:'$35–$90',1000:'$70–$180'},roi:'8%–24%',score:68,actions:['Startup']},
 {ex:'MEXC',type:'Airdrop',name:'Kickstarter',coin:'MX',stake:'MX / Vote',end:7,profit:{50:'$3–$10',100:'$6–$18',500:'$30–$80',1000:'$60–$160'},roi:'7%–20%',score:66,actions:['Airdrop']},
 {ex:'Bitget',type:'Launchpool',name:'BGB Pool',coin:'BGB',stake:'BGB / USDT',end:4,profit:{50:'$4–$14',100:'$8–$28',500:'$40–$110',1000:'$80–$220'},roi:'10%–30%',score:72,actions:['Launchpool']}
];
const app=document.getElementById('app');
const exOrder=['Binance','Bybit','OKX','KuCoin','Gate','MEXC','Bitget'];
const sortModes=[['potential','По потенциалу'],['roi','По ROI'],['score','По рейтингу'],['end','По сроку'],['exchange','По бирже']];
let deposit=localStorage.prDeposit||'50';
let exchanges=JSON.parse(localStorage.prExchanges||'["Binance","Bybit","OKX","KuCoin"]');
let type=localStorage.prType||'Все';
let fav=JSON.parse(localStorage.prFav||'[]');
let expanded=localStorage.prExpanded||'';
let showAllEx=false;
let sort=localStorage.prSort||'potential';
function save(){localStorage.prDeposit=deposit;localStorage.prExchanges=JSON.stringify(exchanges);localStorage.prType=type;localStorage.prFav=JSON.stringify(fav);localStorage.prSort=sort;localStorage.prExpanded=expanded}
function maxProfit(str){const nums=(str.match(/\d+/g)||[]).map(Number);return nums.at(-1)||0}
function roiMax(str){const nums=(str.match(/\d+/g)||[]).map(Number);return nums.at(-1)||0}
function sortLabel(){return sortModes.find(x=>x[0]===sort)?.[1]||'По потенциалу'}
function sorted(list){return [...list].sort((a,b)=>{
 if(sort==='roi')return roiMax(b.roi)-roiMax(a.roi);
 if(sort==='score')return b.score-a.score;
 if(sort==='end')return a.end-b.end;
 if(sort==='exchange')return a.ex.localeCompare(b.ex,'ru');
 return maxProfit(b.profit[deposit])-maxProfit(a.profit[deposit]);
})}
function exChip(ex){const on=exchanges.includes(ex);return `<button class="chip ex ${on?'active':''}" data-toggle-ex="${ex}" title="${ex}"><span class="miniLogo"><img src="${logos[ex]}" onerror="this.replaceWith(document.createTextNode('${ex.slice(0,2).toUpperCase()}'))"></span><span class="exName">${ex}</span>${on?'<span class="tick">✓</span>':''}</button>`}
function exchangeRow(){const list=showAllEx?exOrder:exOrder.slice(0,4);const more=exOrder.length-4;return list.map(exChip).join('')+(showAllEx?`<button class="chip more active" data-more>Скрыть</button>`:`<button class="chip more" data-more>+${more}⌄</button>`)}
function typeRow(){return ['Все','Launchpool','Launchpad','Jumpstart','Spotlight'].map(t=>`<button class="chip type ${t===type?'active':''}" data-type="${t}">${t}</button>`).join('')}
function render(){const filtered=sorted(offers.filter(o=>exchanges.includes(o.ex)&&(type==='Все'||o.type===type)));const best=filtered[0];app.innerHTML=`<main class="page"><header class="top"><img class="logo" src="icon.svg"><div class="title"><h1>PromoRadar AI</h1><p>Акции топ-бирж в одном месте</p></div><button class="gear" data-settings>⚙️</button></header>
<section class="filters">
 <div class="fBlock"><div class="fHead"><h2>Мой депозит</h2><b>${deposit} USDT⌄</b></div><div class="depositRow">${['50','100','500','1000'].map(d=>`<button class="dep ${d===deposit?'active':''}" data-deposit="${d}"><b>${d}</b><small>USDT</small></button>`).join('')}</div></div>
 <div class="fBlock"><div class="fHead"><h2>Биржи</h2><b>${exchanges.length} из 7⌄</b></div><div class="chipRow exRow">${exchangeRow()}</div></div>
 <div class="fBlock"><div class="fHead"><h2>Тип акций</h2><b>${type}⌄</b></div><div class="chipRow typeRow">${typeRow()}</div></div>
</section>
<div class="section"><div><h2>Лучшие акции сейчас</h2><span>${filtered.length} акций · ${sortLabel().toLowerCase()}</span></div><button class="sort" data-sort>↗ ${sortLabel()}⌄</button></div>
${best?`<div class="best"><div><small>Лучший вариант</small><b>${best.ex} • ${best.name}</b></div><strong>${best.profit[deposit]}</strong></div>`:''}
<section class="list">${filtered.length?filtered.map(card).join(''):'<div class="empty">Нет акций по выбранным фильтрам</div>'}</section>
</main>${settingsModal()}<div id="toast" class="toast"></div>`;bind()}
function card(o){const id=o.ex+'-'+o.name;const is=fav.includes(id);const open=expanded===id;return `<article class="offer ${open?'openCard':''}" data-card="${id}">
 <div class="brandLogo"><img src="${logos[o.ex]}" onerror="this.replaceWith(document.createTextNode('${o.ex[0]}'))"></div>
 <div class="info">
   <div class="brand" style="color:${brandColor[o.ex]||'#17994c'}">${o.ex}</div><div class="tag">${o.type}</div>
   <h3>${o.name}</h3><span class="coin">Монета: ${o.coin}</span>
   <div class="grid"><div><small>Вложить</small><b>${o.stake}</b></div><div><small>Потенциал</small><b class="green">${o.profit[deposit]}</b></div><div><small>ROI</small><b>${o.roi}</b></div></div>
   ${open?`<div class="actionRow"><button class="fav ${is?'on':''}" data-fav="${id}">☆</button>${o.actions.map(a=>`<button class="action" data-open="${o.ex}|${a}">${a}</button>`).join('')}</div>`:''}
 </div>
 <div class="score"><b>${o.score}</b><small>/100</small></div>
 </article>`}
function settingsModal(){return `<div class="modal" id="settings"><div class="sheet"><div class="sheetHead"><h2>Настройки</h2><button data-close class="close">×</button></div><div class="sheetTitle">Показывать биржи</div><div class="sheetGrid">${exOrder.map(ex=>`<button class="sheetChip ${exchanges.includes(ex)?'on':''}" data-toggle-ex="${ex}"><span class="miniLogo"><img src="${logos[ex]}"></span>${ex}</button>`).join('')}</div><div class="setting">Избранные акции <span>В карточках ☆</span></div><div class="setting">Уведомления <span>Следующий этап</span></div></div></div>`}
function bind(){document.querySelectorAll('[data-deposit]').forEach(b=>b.onclick=()=>{deposit=b.dataset.deposit;save();render()});document.querySelectorAll('[data-toggle-ex]').forEach(b=>b.onclick=e=>{e.stopPropagation();const ex=b.dataset.toggleEx;exchanges=exchanges.includes(ex)?exchanges.filter(x=>x!==ex):[...exchanges,ex];if(!exchanges.length)exchanges=[ex];save();render();if(document.getElementById('settings')?.classList.contains('show'))setTimeout(openSettings,0)});document.querySelectorAll('[data-more]').forEach(b=>b.onclick=()=>{showAllEx=!showAllEx;render()});document.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{type=b.dataset.type;save();render()});document.querySelectorAll('[data-sort]').forEach(b=>b.onclick=()=>{let i=sortModes.findIndex(x=>x[0]===sort);sort=sortModes[(i+1)%sortModes.length][0];save();render()});document.querySelectorAll('[data-card]').forEach(el=>el.onclick=e=>{if(e.target.closest('[data-fav],[data-open]'))return;expanded=expanded===el.dataset.card?'':el.dataset.card;save();render()});document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.fav;fav=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];save();render()});document.querySelectorAll('[data-open]').forEach(b=>b.onclick=e=>{e.stopPropagation();const [ex,act]=b.dataset.open.split('|');openLink(ex,act)});document.querySelectorAll('[data-settings]').forEach(b=>b.onclick=openSettings);document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeSettings);document.getElementById('settings').onclick=e=>{if(e.target.id==='settings')closeSettings()}}
function openSettings(){document.getElementById('settings').classList.add('show')}
function closeSettings(){document.getElementById('settings').classList.remove('show')}
function showToast(t){const el=document.getElementById('toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1800)}
function openLink(ex,act){const url=(links[ex]&&links[ex][act])||Object.values(links[ex]||{})[0]||'#';showToast(`Открываю ${ex} • ${act}`);setTimeout(()=>{window.location.href=url},120)}
render();
