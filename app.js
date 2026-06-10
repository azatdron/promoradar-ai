const deposits=[50,100,500,1000];
const types=['Все','Launchpool','Launchpad','Jumpstart','Spotlight','Earn','Airdrop'];
const exchanges=[
 {id:'binance',name:'Binance',short:'BN',cls:'binance'}, {id:'bybit',name:'Bybit',short:'BY',cls:'bybit'},
 {id:'okx',name:'OKX',short:'OKX',cls:'okx'}, {id:'kucoin',name:'KuCoin',short:'K',cls:'kucoin'},
 {id:'coinbase',name:'Coinbase',short:'CB',cls:'coinbase'}, {id:'gate',name:'Gate',short:'GT',cls:'gate'}, {id:'mexc',name:'MEXC',short:'MX',cls:'mexc'}
];
const offers=[
 {exchange:'bybit',type:'Launchpad',coin:'EXTER',title:'EXTER Sale',stake:'USDT / MNT',base:[8,22],roi:'14%–45%',score:86,tag:'Лучший вариант',url:'https://www.bybit.com/en/trade/spot/launchpad'},
 {exchange:'kucoin',type:'Spotlight',coin:'ALT',title:'ALT Sale',stake:'KCS / USDT',base:[5,15],roi:'12%–35%',score:85,url:'https://www.kucoin.com/spotlight'},
 {exchange:'bybit',type:'Launchpool',coin:'MNT',title:'MNT Pool',stake:'MNT / USDT',base:[15,45],roi:'18%–45%',score:82,url:'https://www.bybit.com/en/trade/spot/launchpool'},
 {exchange:'binance',type:'Launchpool',coin:'LISTA',title:'Lista DAO',stake:'BNB / FDUSD',base:[20,60],roi:'20%–50%',score:80,url:'https://www.binance.com/en/launchpool'},
 {exchange:'okx',type:'Jumpstart',coin:'ZETA',title:'ZETA Event',stake:'OKB / USDT',base:[10,25],roi:'12%–28%',score:78,url:'https://www.okx.com/jumpstart'},
 {exchange:'gate',type:'Startup',coin:'XYZ',title:'Startup XYZ',stake:'GT / USDT',base:[6,16],roi:'8%–22%',score:72,url:'https://www.gate.io/startup'},
 {exchange:'mexc',type:'Airdrop',coin:'NEW',title:'Airdrop NEW',stake:'MX / USDT',base:[4,12],roi:'6%–18%',score:69,url:'https://www.mexc.com/airdrop'},
 {exchange:'coinbase',type:'Earn',coin:'OP',title:'OP Learn',stake:'Tasks',base:[2,8],roi:'-',score:62,url:'https://www.coinbase.com/learning-rewards'}
];
let state={deposit:50,type:'Все',selected:new Set(exchanges.slice(0,4).map(e=>e.id)),favOnly:false,favs:new Set(JSON.parse(localStorage.getItem('pr_favs')||'[]'))};
const $=s=>document.querySelector(s);const el=(t,c)=>Object.assign(document.createElement(t),c?{className:c}:{});
function mul(v){return state.deposit/50*v} function money(o){return `$${Math.round(mul(o.base[0]))}–$${Math.round(mul(o.base[1]))}`}
function ex(id){return exchanges.find(e=>e.id===id)}
function renderChips(){
 $('#depositChips').innerHTML=''; deposits.forEach(d=>{let b=el('button','chip deposit '+(state.deposit===d?'active':''));b.innerHTML=`<b>${d}</b><small>USDT</small>`;b.onclick=()=>{state.deposit=d;render()};$('#depositChips').append(b)}); $('#depositLabel').textContent=`${state.deposit} USDT⌄`;
 $('#exchangeChips').innerHTML=''; exchanges.forEach(x=>{let on=state.selected.has(x.id);let b=el('button','chip ex '+(on?'active':''));b.innerHTML=`<span class="logoMini ${x.cls}">${x.short}</span><b>${x.name}</b>${on?'✓':''}`;b.onclick=()=>{state.selected.has(x.id)?state.selected.delete(x.id):state.selected.add(x.id); if(!state.selected.size)state.selected.add(x.id); render()};$('#exchangeChips').append(b)}); $('#exchangeCount').textContent=`${state.selected.size} из ${exchanges.length}⌄`;
 $('#typeChips').innerHTML=''; types.forEach(t=>{let b=el('button','chip type '+(state.type===t?'active':''));b.textContent=t;b.onclick=()=>{state.type=t;render()};$('#typeChips').append(b)}); $('#typeLabel').textContent=`${state.type}⌄`;
}
function filtered(){return offers.filter(o=>state.selected.has(o.exchange)&&(state.type==='Все'||o.type===state.type)&&(!state.favOnly||state.favs.has(o.title))).sort((a,b)=>b.score-a.score)}
function openOffer(o){ window.location.href=o.url; }
function card(o){const x=ex(o.exchange);let c=el('article','offer');c.innerHTML=`<div class="offerLogo ${x.cls}">${x.short}</div><div class="offerTop"><div><div class="meta">${x.name} • ${o.type}</div><h3 class="coinTitle">${o.title}</h3><span class="coinLine">Монета: ${o.coin}</span></div><div class="score">${o.score}<small>/100</small></div></div><div class="grid"><div class="metric"><span>Вложить</span><b>${o.stake}</b></div><div class="metric"><span>Потенциал</span><b class="money">${money(o)}</b></div><div class="metric"><span>ROI</span><b>${o.roi}</b></div></div><div class="actions"><button class="star ${state.favs.has(o.title)?'on':''}" title="В избранное">☆</button><button class="openBtn">Открыть</button></div>`;c.querySelector('.star').onclick=(e)=>{e.stopPropagation();state.favs.has(o.title)?state.favs.delete(o.title):state.favs.add(o.title);localStorage.setItem('pr_favs',JSON.stringify([...state.favs]));render()};c.querySelector('.openBtn').onclick=(e)=>{e.stopPropagation();openOffer(o)};c.onclick=()=>openOffer(o);return c}
function render(){renderChips();let data=filtered();$('#offerCount').textContent=data.length;$('#cards').innerHTML='';data.forEach(o=>$('#cards').append(card(o)));let b=data[0];$('#bestBox').innerHTML=b?`<div class="bestCard"><div><small>Лучший вариант</small><b>${ex(b.exchange).name} • ${b.title}</b></div><strong>${money(b)}</strong></div>`:'<div class="bestCard"><b>Нет акций по фильтрам</b></div>'}
$('#settingsBtn').onclick=()=>{$('#drawer').hidden=false};$('#closeSettings').onclick=()=>{$('#drawer').hidden=true};$('#drawer').onclick=e=>{if(e.target.id==='drawer')$('#drawer').hidden=true};$('#favOnly').onchange=e=>{state.favOnly=e.target.checked;render()};
render();
