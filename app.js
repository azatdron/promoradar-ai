const exchanges = ["Binance","Bybit","OKX","KuCoin","Coinbase","Gate","MEXC"];
const types = ["Все","Launchpool","Launchpad","Jumpstart","Spotlight","Airdrop","Earn","Competition"];
const deposits = [50,100,500,1000];
let state = { deposit:100, exchanges:[...exchanges], type:"Все" };

const promos = [
 {ex:"Binance", logo:"◆", type:"Launchpool", title:"Launchpool: Lista DAO", invest:"BNB / FDUSD", min:0.01, base:[12,32], roi:[12,32], days:3, score:95, url:"https://www.binance.com"},
 {ex:"Binance", logo:"◆", type:"Megadrop", title:"Megadrop: New Token", invest:"BNB + задания", min:10, base:[8,28], roi:[8,28], days:5, score:89, url:"https://www.binance.com"},
 {ex:"Bybit", logo:"B", type:"Launchpad", title:"Launchpad: MNT Pool", invest:"MNT / USDT", min:50, base:[15,45], roi:[15,45], days:2, score:92, url:"https://www.bybit.com"},
 {ex:"Bybit", logo:"B", type:"Launchpool", title:"Launchpool: New Listing", invest:"USDT / MNT", min:20, base:[7,22], roi:[7,22], days:4, score:86, url:"https://www.bybit.com"},
 {ex:"OKX", logo:"OKX", type:"Jumpstart", title:"Jumpstart: ZETA Event", invest:"OKB", min:30, base:[10,25], roi:[10,25], days:1, score:88, url:"https://www.okx.com"},
 {ex:"OKX", logo:"OKX", type:"Earn", title:"Earn Bonus: Flexible Event", invest:"USDT", min:100, base:[5,18], roi:[5,18], days:6, score:76, url:"https://www.okx.com"},
 {ex:"KuCoin", logo:"K", type:"Spotlight", title:"Spotlight: ALT Sale", invest:"KCS / USDT", min:25, base:[9,30], roi:[9,30], days:4, score:85, url:"https://www.kucoin.com"},
 {ex:"KuCoin", logo:"K", type:"Competition", title:"Trading Bonus Pool", invest:"Объём торгов", min:100, base:[4,20], roi:[4,20], days:7, score:70, url:"https://www.kucoin.com"},
 {ex:"Coinbase", logo:"C", type:"Airdrop", title:"Rewards: OP Learn", invest:"Задания", min:0, base:[2,8], roi:[2,8], days:5, score:66, url:"https://www.coinbase.com"},
 {ex:"Gate", logo:"G", type:"Launchpad", title:"Startup: XYZ Token", invest:"USDT", min:10, base:[6,26], roi:[6,26], days:2, score:82, url:"https://www.gate.io"},
 {ex:"Gate", logo:"G", type:"Airdrop", title:"Airdrop Carnival", invest:"Задания", min:0, base:[1,12], roi:[1,12], days:3, score:64, url:"https://www.gate.io"},
 {ex:"MEXC", logo:"M", type:"Kickstarter", title:"Kickstarter: Vote to List", invest:"MX", min:20, base:[5,19], roi:[5,19], days:1, score:78, url:"https://www.mexc.com"},
];

function profit(p){
 const scale = Math.max(0.35, state.deposit/100);
 return [Math.round(p.base[0]*scale), Math.round(p.base[1]*scale)];
}
function visible(){
 return promos.filter(p => state.exchanges.includes(p.ex) && (state.type==="Все" || p.type===state.type)).sort((a,b)=> b.score-a.score);
}
function chip(text, active, onClick){
 const b=document.createElement('button'); b.className='chip'+(active?' active':''); b.textContent=text; b.onclick=onClick; return b;
}
function renderChips(){
 const dc=document.getElementById('depositChips'); dc.innerHTML='';
 deposits.forEach(d=>dc.appendChild(chip(`${d} USDT`, state.deposit===d, ()=>{state.deposit=d; render();})));
 document.getElementById('depositLabel').textContent = `${state.deposit} USDT`;
 const ec=document.getElementById('exchangeChips'); ec.innerHTML='';
 exchanges.forEach(ex=>ec.appendChild(chip(ex, state.exchanges.includes(ex), ()=>{state.exchanges = state.exchanges.includes(ex) ? state.exchanges.filter(x=>x!==ex) : [...state.exchanges, ex]; render();})));
 document.getElementById('exchangeCount').textContent = `${state.exchanges.length}/${exchanges.length}`;
 const tc=document.getElementById('typeChips'); tc.innerHTML='';
 types.forEach(t=>tc.appendChild(chip(t, state.type===t, ()=>{state.type=t; render();})));
}
function renderList(){
 const list=document.getElementById('list'); const data=visible(); list.innerHTML='';
 document.getElementById('resultCount').textContent = `${data.length} акций`;
 if(!data.length){ list.innerHTML='<div class="empty">Нет акций по выбранным фильтрам</div>'; return; }
 const best=data[0], bp=profit(best);
 document.getElementById('bestTitle').textContent = `${best.ex} • ${best.title}`;
 document.getElementById('bestProfit').textContent = `$${bp[0]}–$${bp[1]}`;
 data.forEach(p=>{
   const pr=profit(p);
   const el=document.createElement('article'); el.className='card';
   el.innerHTML=`<div class="exLogo">${p.logo}</div><div><div class="meta">${p.ex} • ${p.type}</div><h3>${p.title}</h3><p>Вложить: ${p.invest}</p><p class="profit">Потенциал $${pr[0]} – $${pr[1]}</p></div><div class="score">${p.score}<small>/100</small></div><div class="tags"><span class="tag">ROI ${p.roi[0]}%–${p.roi[1]}%</span><span class="tag">до конца ${p.days} дн.</span><span class="tag">мин. ${p.min} USDT</span></div><button class="openBtn">Подробнее / открыть биржу</button>`;
   el.querySelector('.openBtn').onclick=()=>showDetails(p, pr);
   el.onclick=(e)=>{ if(!e.target.classList.contains('openBtn')) showDetails(p, pr); };
   list.appendChild(el);
 });
}
function showDetails(p, pr){
 const c=document.getElementById('detailsContent');
 c.innerHTML=`<span class="badge">${p.ex} • ${p.type}</span><h2>${p.title}</h2><p>Оценка выгодности: <b style="color:var(--green)">${p.score}/100</b></p><div class="detailGrid"><div><span>Что вложить</span><b>${p.invest}</b></div><div><span>Мой депозит</span><b>${state.deposit} USDT</b></div><div><span>Потенциал</span><b>$${pr[0]} – $${pr[1]}</b></div><div><span>ROI</span><b>${p.roi[0]}% – ${p.roi[1]}%</b></div><div><span>До конца</span><b>${p.days} дн.</b></div></div><button class="openBtn" onclick="window.open('${p.url}','_blank')">Открыть ${p.ex}</button>`;
 document.getElementById('details').classList.remove('hidden');
}
document.getElementById('closeDetails').onclick=()=>document.getElementById('details').classList.add('hidden');
document.getElementById('settingsBtn').onclick=()=>alert('Настройки уже сверху: выбери депозит, биржи и тип акции. Отдельные страницы убраны.');
function render(){ renderChips(); renderList(); }
render();
