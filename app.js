const deposits=[50,100,500,1000];
const exchanges=[
  {id:'binance',name:'Binance',logo:'BN',cls:'ex-binance',url:'https://www.binance.com/en/launchpool'},
  {id:'bybit',name:'Bybit',logo:'BY',cls:'ex-bybit',url:'https://www.bybit.com/en/trade/spot/launchpad'},
  {id:'okx',name:'OKX',logo:'OKX',cls:'ex-okx',url:'https://www.okx.com/jumpstart'},
  {id:'kucoin',name:'KuCoin',logo:'K',cls:'ex-kucoin',url:'https://www.kucoin.com/spotlight'},
  {id:'coinbase',name:'Coinbase',logo:'C',cls:'ex-coinbase',url:'https://www.coinbase.com/learning-rewards'},
  {id:'gate',name:'Gate',logo:'G',cls:'ex-gate',url:'https://www.gate.com/startup'},
  {id:'mexc',name:'MEXC',logo:'M',cls:'ex-mexc',url:'https://www.mexc.com/launchpad'}
];
const types=['Все','Launchpool','Launchpad','Jumpstart','Spotlight','Earn','Airdrop','Competition'];
const baseOffers=[
 {ex:'kucoin',type:'Spotlight',title:'ALT Sale',asset:'KCS / USDT',min:5,max:15,roi:'12%–35%',score:85,days:4,available:true},
 {ex:'bybit',type:'Launchpool',title:'MNT Pool',asset:'MNT / USDT',min:15,max:45,roi:'18%–45%',score:82,days:2,available:true},
 {ex:'binance',type:'Launchpool',title:'Lista DAO',asset:'BNB / FDUSD',min:20,max:60,roi:'20%–50%',score:80,days:3,available:true},
 {ex:'okx',type:'Jumpstart',title:'ZETA Event',asset:'OKB / USDT',min:10,max:25,roi:'12%–28%',score:78,days:1,available:true},
 {ex:'gate',type:'Airdrop',title:'Startup XYZ',asset:'GT / USDT',min:4,max:12,roi:'8%–22%',score:73,days:5,available:true},
 {ex:'mexc',type:'Launchpad',title:'MX Launch',asset:'MX / USDT',min:6,max:18,roi:'10%–30%',score:72,days:6,available:true},
 {ex:'coinbase',type:'Earn',title:'OP Learn',asset:'Tasks',min:2,max:7,roi:'низкий риск',score:68,days:5,available:true},
 {ex:'bybit',type:'Competition',title:'Spot Volume Race',asset:'USDT',min:8,max:35,roi:'зависит от объёма',score:66,days:7,available:true},
 {ex:'binance',type:'Airdrop',title:'Megadrop Token',asset:'BNB / Tasks',min:10,max:40,roi:'15%–38%',score:79,days:6,available:true}
];
let state={deposit:50, selected:new Set(exchanges.map(e=>e.id)), type:'Все', sort:'score', availableOnly:false};
const $=s=>document.querySelector(s);
function money(v){const m=state.deposit/50; return Math.round(v*m)}
function exById(id){return exchanges.find(e=>e.id===id)}
function chip(label,active,onClick,extra=''){const b=document.createElement('button');b.className='chip '+(active?'active ':'')+extra;b.innerHTML=label;b.onclick=onClick;return b}
function renderChips(){
 const dc=$('#depositChips'); dc.innerHTML=''; dc.className='chipRow deposit';
 deposits.forEach(d=>dc.append(chip(`${d} USDT`,state.deposit===d,()=>{state.deposit=d;render()})));
 $('#depositLabel').textContent=`${state.deposit} USDT`;
 const ec=$('#exchangeChips'); ec.innerHTML='';
 exchanges.forEach(ex=>ec.append(chip(`<span class="exLogo ${ex.cls}">${ex.logo}</span>${ex.name}${state.selected.has(ex.id)?'<span class="check">✓</span>':''}`,state.selected.has(ex.id),()=>{state.selected.has(ex.id)?state.selected.delete(ex.id):state.selected.add(ex.id); if(!state.selected.size) state.selected.add(ex.id); render()})));
 $('#exchangeCount').textContent=`${state.selected.size} из ${exchanges.length}`;
 const tc=$('#typeChips'); tc.innerHTML='';
 types.forEach(t=>tc.append(chip(t,state.type===t,()=>{state.type=t;render()})));
 $('#typeLabel').textContent=state.type;
}
function filtered(){
 let arr=baseOffers.filter(o=>state.selected.has(o.ex));
 if(state.type!=='Все') arr=arr.filter(o=>o.type===state.type);
 if(state.availableOnly) arr=arr.filter(o=>o.available);
 return arr.sort((a,b)=> state.sort==='score' ? b.score-a.score : (money(b.max)-money(a.max)) );
}
function renderOffers(){
 const arr=filtered();
 $('#resultMeta').textContent=`${arr.length} акций • по потенциалу`;
 const best=arr[0];
 const bestCard=$('#bestCard');
 if(best){ const ex=exById(best.ex); bestCard.innerHTML=`<div><small>Лучший вариант</small><strong>${ex.name} • ${best.title}</strong></div><div class="money">$${money(best.min)}–$${money(best.max)}</div>`; }
 else { bestCard.innerHTML='<div><small>Нет акций</small><strong>Выбери другие фильтры</strong></div>'; }
 const box=$('#offers'); box.innerHTML='';
 arr.forEach(o=>{const ex=exById(o.ex); const card=document.createElement('article'); card.className='offer'; card.innerHTML=`
   <div class="offerLogo ${ex.cls}">${ex.logo}</div>
   <div><div class="offerTop">${ex.name} • ${o.type}</div><div class="offerTitle">${o.title}</div><div class="offerMeta"><span>Вложить: <b>${o.asset}</b></span><span>Потенциал: <b>$${money(o.min)}–$${money(o.max)}</b></span><span>ROI: <b>${o.roi}</b></span><span>${o.days} дн.</span></div></div>
   <div class="score"><div>${o.score}<span>/100</span></div></div>
   <div class="actions"><button class="openBtn">Открыть ${ex.name}</button><button class="favBtn">☆</button></div>`;
   card.onclick=(ev)=>{ if(ev.target.closest('button')) return; card.classList.toggle('open'); };
   card.querySelector('.openBtn').onclick=()=>openExchange(ex.url);
   box.append(card);
 });
}
function openExchange(url){
  // Web/PWA cannot reliably detect installed exchange apps on iPhone.
  // Direct event deep links can be added later per exchange if available.
  window.location.href=url;
}
function render(){renderChips();renderOffers()}
$('#settingsBtn').onclick=()=>$('#settingsPanel').showModal();
$('#closeSettings').onclick=()=>$('#settingsPanel').close();
$('#availableOnly').onchange=e=>{state.availableOnly=e.target.checked;render()};
$('#sortBtn').onclick=()=>{state.sort=state.sort==='score'?'profit':'score';$('#sortBtn').textContent=state.sort==='score'?'↗ По выгоде':'$ По сумме';renderOffers()};
render();
