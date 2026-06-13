
const logos={
  CryptoRank:'https://cryptorank.io/favicon.ico'
};
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

let deposit=localStorage.prDeposit||'500';
let category=localStorage.prCrCategory||'Лучшие';
let fav=JSON.parse(localStorage.prFav||'[]');
let expanded='';
const app=document.getElementById('app');

const cats=['Лучшие','Бесплатно','С депозитом','Потенциал','Фонды','Избранное'];

const projects=[
 {name:'LayerZero',type:'Airdrop',coin:'ZRO',stake:'$0',profit:{50:'$100–$500',100:'$100–$500',500:'$100–$500',1000:'$100–$500'},roi:'Высокий',score:91,cat:['Лучшие','Бесплатно','Потенциал','Фонды'],funds:['a16z','Sequoia','PayPal'],fundsCount:11,time:'10–20 мин',difficulty:'Легко',icon:'L0'},
 {name:'ZetaChain',type:'Testnet',coin:'ZETA',stake:'$0',profit:{50:'$20–$100',100:'$20–$100',500:'$20–$100',1000:'$20–$100'},roi:'Средний',score:92,cat:['Лучшие','Бесплатно','Потенциал','Фонды'],funds:['Blockchain.com','Jane Street'],fundsCount:6,time:'15–20 мин',difficulty:'Легко',icon:'Z'},
 {name:'Starknet',type:'Airdrop',coin:'STRK',stake:'$0',profit:{50:'$50–$200',100:'$50–$200',500:'$50–$200',1000:'$50–$200'},roi:'Высокий',score:90,cat:['Лучшие','Бесплатно','Потенциал','Фонды'],funds:['Paradigm','Sequoia','Pantera'],fundsCount:8,time:'20–30 мин',difficulty:'Средняя',icon:'✦'},
 {name:'Kelp DAO',type:'Staking',coin:'KELP',stake:'от $10',profit:{50:'$20–$80',100:'$40–$160',500:'$200–$800',1000:'$400–$1600'},roi:'Средний',score:87,cat:['Лучшие','С депозитом','Фонды'],funds:['Laser Digital','SCB'],fundsCount:7,time:'5 мин',difficulty:'Легко',icon:'K'},
 {name:'Monad',type:'Testnet',coin:'MON',stake:'$0',profit:{50:'$50–$300',100:'$50–$300',500:'$50–$300',1000:'$50–$300'},roi:'Высокий',score:89,cat:['Лучшие','Бесплатно','Потенциал','Фонды'],funds:['Paradigm','Electric'],fundsCount:9,time:'20–40 мин',difficulty:'Средняя',icon:'M'},
 {name:'Berachain',type:'Testnet',coin:'BERA',stake:'$0',profit:{50:'$80–$400',100:'$80–$400',500:'$80–$400',1000:'$80–$400'},roi:'Высокий',score:90,cat:['Лучшие','Бесплатно','Потенциал','Фонды'],funds:['Polychain','Framework'],fundsCount:10,time:'20–30 мин',difficulty:'Средняя',icon:'B'},
 {name:'Manta Network',type:'Airdrop',coin:'MANTA',stake:'$0',profit:{50:'$30–$150',100:'$30–$150',500:'$30–$150',1000:'$30–$150'},roi:'Средний',score:86,cat:['Бесплатно','Потенциал','Фонды'],funds:['Binance Labs','Polychain'],fundsCount:6,time:'15–25 мин',difficulty:'Средняя',icon:'M'},
 {name:'Initia',type:'Testnet',coin:'INIT',stake:'$0',profit:{50:'$40–$220',100:'$40–$220',500:'$40–$220',1000:'$40–$220'},roi:'Высокий',score:85,cat:['Бесплатно','Потенциал','Фонды'],funds:['Binance Labs','Delphi'],fundsCount:5,time:'10–15 мин',difficulty:'Легко',icon:'I'},
 {name:'MegaETH',type:'Airdrop',coin:'MEGA',stake:'$0',profit:{50:'$60–$250',100:'$60–$250',500:'$60–$250',1000:'$60–$250'},roi:'Высокий',score:88,cat:['Лучшие','Бесплатно','Потенциал','Фонды'],funds:['Dragonfly','Figment'],fundsCount:8,time:'20 мин',difficulty:'Средняя',icon:'ME'},
 {name:'Movement',type:'Testnet',coin:'MOVE',stake:'$0',profit:{50:'$30–$180',100:'$30–$180',500:'$30–$180',1000:'$30–$180'},roi:'Средний',score:84,cat:['Бесплатно','Потенциал','Фонды'],funds:['Polychain','Binance Labs'],fundsCount:7,time:'15 мин',difficulty:'Легко',icon:'MV'}
];

function save(){localStorage.prDeposit=deposit;localStorage.prCrCategory=category;localStorage.prFav=JSON.stringify(fav)}
function rangeMax(str){const nums=(str.match(/\d+/g)||[]).map(Number);return nums[nums.length-1]||0}
function visibleProjects(){
 let arr=projects.filter(p=>category==='Избранное'?fav.includes(p.name):category==='Лучшие'?p.cat.includes('Лучшие'):p.cat.includes(category));
 return arr.sort((a,b)=>rangeMax(b.profit[deposit])-rangeMax(a.profit[deposit]));
}
function catChips(){return cats.map(c=>`<button class="chip type ${c===category?'active':''}" data-cat="${c}">${c}</button>`).join('')}
function render(){
 const filtered=visibleProjects();
 const best=filtered[0];
 app.innerHTML=`<main class="page"><header class="top"><img class="logo" src="icon.svg"><div class="title"><h1>PromoRadar AI</h1><p>CryptoRank Scanner · возможности без мусора</p></div><button class="gear" data-scan>↻</button></header>

 <section class="sourceMini">
   <div class="crMark"><img src="${logos.CryptoRank}" onerror="this.replaceWith(document.createTextNode('C'))"></div>
   <div><h2>CryptoRank</h2><span>Источник активен</span></div>
   <button data-scan>Проверить</button>
 </section>

 <section class="filters compact">
   <div class="filterBlock depLine"><div class="rowHead"><h2>Мой депозит</h2><b data-custom>${deposit} USDT⌄</b></div></div>
   <div class="filterBlock"><div class="rowHead"><h2>Фильтры</h2><b>${category}⌄</b></div><div class="chips typeRow">${catChips()}</div></div>
 </section>

 <div class="section"><div><h2>Найденные возможности</h2><span>${filtered.length} проектов · ${category.toLowerCase()}</span></div><button class="sort">↗ Потенциал⌄</button></div>
 ${best?`<div class="best"><div><small>Лучший вариант</small><b>${best.name} • ${best.type}</b></div><div class="money">${best.profit[deposit]}</div></div>`:''}
 <section class="list">${filtered.length?filtered.map(card).join(''):'<div class="empty">Нет проектов по выбранному фильтру</div>'}</section></main><div class="toast" id="toast"></div>`;
 bind();
}
function card(o){const id=o.name;const is=fav.includes(id);const isExp=expanded===id;return `<article class="offer project ${isExp?'expanded':''}" data-expand="${id}">
 <div class="exLogo projectIcon"><span>${o.icon}</span></div>
 <div class="meta">
   <div class="exchange">${o.name} • ${o.type}</div>
   <h3>${o.coin}</h3>
   <span class="coin">${o.difficulty} · ${o.time} · фонды: ${o.fundsCount}</span>
   <div class="cols">
    <div class="col"><span>Вложить</span><b>${o.stake}</b></div>
    <div class="col"><span>Потенциал</span><b class="profit">${o.profit[deposit]}</b></div>
    <div class="col"><span>ROI</span><b>${o.roi}</b></div>
   </div>
   <div class="fundTags">${o.funds.slice(0,3).map(f=>`<em>${f}</em>`).join('')}</div>
   ${isExp?`<div class="actions"><button class="star ${is?'on':''}" data-fav="${id}">${is?'★':'☆'}</button><button class="open" data-url="${encodeURIComponent(projectLinks[o.name]||'https://cryptorank.io/drophunting')}">Открыть</button></div>`:''}
 </div>
 <div class="score"><div class="ring">${o.score}<small>/100</small></div></div>
 </article>`}
function bind(){
 document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{category=b.dataset.cat;save();render()});
 document.querySelectorAll('[data-custom]').forEach(b=>b.onclick=()=>{const v=prompt('Введите сумму USDT',deposit);if(v&&Number(v)>0){deposit=String(Number(v));save();render()}});
 document.querySelectorAll('[data-scan]').forEach(b=>b.onclick=()=>{toast('CryptoRank Scanner обновлён')});
 document.querySelectorAll('[data-expand]').forEach(card=>card.onclick=e=>{if(e.target.closest('[data-fav],[data-url]'))return;expanded=expanded===card.dataset.expand?'':card.dataset.expand;render()});
 document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.fav;fav=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];save();render()});
 document.querySelectorAll('[data-url]').forEach(b=>b.onclick=e=>{e.stopPropagation();window.location.href=decodeURIComponent(b.dataset.url)})
}
function toast(t){let el=document.getElementById('toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1500)}
render();
