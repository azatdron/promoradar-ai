
const app=document.getElementById('app');

const state={
  deposit:Number(localStorage.prDeposit||500),
  category:localStorage.prCrCategory||'best',
  sort:localStorage.prCrSort||'potential',
  favorites:JSON.parse(localStorage.prCrFav||'[]'),
  pro:localStorage.prPro==='1'
};

const categories=[
  ['best','Лучшие сегодня'],
  ['free','Бесплатно'],
  ['deposit','Нужен депозит'],
  ['potential','Высокий потенциал'],
  ['funds','Фонды участвуют'],
  ['fav','Избранное']
];

const projects=[
  {id:'zetachain',name:'ZetaChain',type:'Testnet',desc:'Кросс-чейн инфраструктура',invest:0,minDeposit:0,potential:[20,100],difficulty:'Легко',time:'15–20 мин',funds:['Blockchain.com','Jane Street','Human Capital'],fundsCount:6,score:92,cats:['best','free','potential','funds'],logo:'Z'},
  {id:'starknet',name:'Starknet',type:'Airdrop',desc:'Layer 2 решение на Ethereum',invest:0,minDeposit:0,potential:[50,200],difficulty:'Средняя',time:'20–30 мин',funds:['Paradigm','Sequoia','Pantera'],fundsCount:8,score:90,cats:['best','free','potential','funds'],logo:'✦'},
  {id:'layerzero',name:'LayerZero',type:'Airdrop',desc:'Омничейн протокол',invest:0,minDeposit:0,potential:[100,500],difficulty:'Легко',time:'10–20 мин',funds:['a16z','Sequoia','PayPal Ventures'],fundsCount:11,score:91,cats:['best','free','potential','funds'],logo:'L0'},
  {id:'kelpdao',name:'Kelp DAO',type:'Staking',desc:'Liquid Restaking на Ethereum',invest:10,minDeposit:10,potential:[20,80],difficulty:'Легко',time:'5 мин',funds:['Laser Digital','SCB'],fundsCount:7,score:87,cats:['best','deposit','funds'],logo:'K'},
  {id:'manta',name:'Manta Network',type:'Airdrop',desc:'Модульный L2 для dApps',invest:0,minDeposit:0,potential:[30,150],difficulty:'Средняя',time:'15–25 мин',funds:['Binance Labs','Polychain'],fundsCount:6,score:86,cats:['free','potential','funds'],logo:'M'},
  {id:'monad',name:'Monad',type:'Testnet',desc:'Высокопроизводительный L1',invest:0,minDeposit:0,potential:[50,300],difficulty:'Средняя',time:'20–40 мин',funds:['Paradigm','Electric Capital'],fundsCount:9,score:89,cats:['best','free','potential','funds'],logo:'M'},
  {id:'initia',name:'Initia',type:'Testnet',desc:'Сеть interwoven rollups',invest:0,minDeposit:0,potential:[40,220],difficulty:'Легко',time:'10–15 мин',funds:['Binance Labs','Delphi'],fundsCount:5,score:85,cats:['free','potential','funds'],logo:'I'},
  {id:'berachain',name:'Berachain',type:'Testnet',desc:'EVM L1 с Proof-of-Liquidity',invest:0,minDeposit:0,potential:[80,400],difficulty:'Средняя',time:'20–30 мин',funds:['Polychain','Framework'],fundsCount:10,score:90,cats:['best','free','potential','funds'],logo:'B'},
  {id:'megaeth',name:'MegaETH',type:'Airdrop',desc:'Real-time blockchain',invest:0,minDeposit:0,potential:[60,250],difficulty:'Средняя',time:'20 мин',funds:['Dragonfly','Figment'],fundsCount:8,score:88,cats:['best','free','potential','funds'],logo:'ME'},
  {id:'movement',name:'Movement',type:'Testnet',desc:'MoveVM L2 экосистема',invest:0,minDeposit:0,potential:[30,180],difficulty:'Легко',time:'15 мин',funds:['Polychain','Binance Labs'],fundsCount:7,score:84,cats:['free','potential','funds'],logo:'MV'}
];

function save(){
  localStorage.prDeposit=state.deposit;
  localStorage.prCrCategory=state.category;
  localStorage.prCrSort=state.sort;
  localStorage.prCrFav=JSON.stringify(state.favorites);
  localStorage.prPro=state.pro?'1':'0';
}
function money(n){return '$'+Number(n).toLocaleString('en-US')}
function scaledPotential(p){
  if(p.minDeposit>0){
    const k=Math.max(1,state.deposit/p.minDeposit);
    return [Math.round(p.potential[0]*k),Math.round(p.potential[1]*k)];
  }
  return p.potential;
}
function filtered(){
  let arr=projects.slice();
  if(state.category==='fav') arr=arr.filter(p=>state.favorites.includes(p.id));
  else if(state.category!=='best') arr=arr.filter(p=>p.cats.includes(state.category));
  else arr=arr.filter(p=>p.cats.includes('best'));
  if(state.sort==='score') arr.sort((a,b)=>b.score-a.score);
  else arr.sort((a,b)=>scaledPotential(b)[1]-scaledPotential(a)[1]);
  return arr;
}
function logoClass(p){
  const map={ZetaChain:'zeta',Starknet:'stark',LayerZero:'layerzero','Kelp DAO':'kelp','Manta Network':'manta',Monad:'monad',Initia:'initia',Berachain:'bera',MegaETH:'mega',Movement:'move'};
  return map[p.name]||'generic';
}
function diffClass(x){return x==='Легко'?'easy':x==='Средняя'?'mid':'hard'}
function typeClass(t){return t.toLowerCase().replace(/[^a-z]/g,'')||'tag'}
function card(p){
  const fav=state.favorites.includes(p.id);
  const pot=scaledPotential(p);
  const free=p.minDeposit===0;
  return `<article class="op-card">
    <div class="op-head">
      <div class="op-logo ${logoClass(p)}">${p.logo}</div>
      <div class="op-title">
        <div class="name-line"><h3>${p.name}</h3><span class="type ${typeClass(p.type)}">${p.type}</span></div>
        <p>${p.desc}</p>
      </div>
      <button class="star ${fav?'on':''}" data-fav="${p.id}">${fav?'★':'☆'}</button>
    </div>
    <div class="op-row">
      <div class="op-metrics">
        <div><small>Вложения</small><b>${free?'$0':'от '+money(p.minDeposit)}</b></div>
        <div><small>Потенциал</small><b class="green">${money(pot[0])} – ${money(pot[1])}</b></div>
        <div><small>Сложность</small><b class="${diffClass(p.difficulty)}">${p.difficulty}</b></div>
      </div>
      <div class="score"><b>${p.score}</b><small>/100</small></div>
    </div>
    <div class="chips">
      <span>${free?'Бесплатно':'с депозитом'}</span>
      <span>${p.time}</span>
      <span>Фонды: ${p.fundsCount}</span>
    </div>
    <div class="funds">${p.funds.slice(0,3).map(f=>`<span>${f}</span>`).join('')}</div>
    <div class="actions"><button>Подробнее</button><button>Открыть</button></div>
  </article>`;
}
function render(){
  const list=filtered();
  const best=list[0];
  app.innerHTML=`<main class="page">
    <header class="top">
      <img class="logo" src="icon.svg">
      <div class="title"><h1>PromoRadar AI</h1><p>Лучшие крипто-возможности в одном месте</p></div>
      <button class="proTop ${state.pro?'active':''}" data-pro>${state.pro?'PRO':'FREE'}</button>
    </header>

    <section class="source-card">
      <div class="cr-logo">C</div>
      <div class="source-info">
        <h2>CryptoRank Scanner</h2>
        <p><i></i>Источник активен</p>
        <small>Airdrops, testnets, staking, launchpads и фонды</small>
      </div>
      <button class="check" data-scan>Проверить</button>
      <div class="updated">↻ Обновлено: ${new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})}</div>
    </section>

    <section class="filters">
      <div class="fHead"><h2>Мой депозит</h2><b>${state.deposit} USDT⌄</b></div>
      <div class="depositRow">${[50,100,500,1000].map(d=>`<button class="dep ${d===state.deposit?'active':''}" data-dep="${d}"><b>${d}</b><small>USDT</small></button>`).join('')}<button class="dep custom" data-custom><b>Своя</b><small>сумма</small></button></div>
      <div class="catRow">${categories.map(c=>`<button class="cat ${state.category===c[0]?'active':''}" data-cat="${c[0]}">${c[1]}</button>`).join('')}</div>
    </section>

    <div class="section">
      <div><h2>Найденные возможности</h2><span>${list.length} проектов · ${categories.find(c=>c[0]===state.category)?.[1]||'Все'}</span></div>
      <div class="sectionActions">
        <button class="favFilter ${state.category==='fav'?'active':''}" data-cat="fav">☆ ${state.favorites.length}</button>
        <button class="sort" data-sort>↗ ${state.sort==='score'?'По рейтингу':'По потенциалу'}⌄</button>
      </div>
    </div>

    ${best?`<div class="best"><div><small>Лучший вариант</small><b>${best.name} • ${best.type}</b></div><strong>${money(scaledPotential(best)[0])}–${money(scaledPotential(best)[1])}</strong></div>`:''}

    <section class="list">${list.length?list.map(card).join(''):'<div class="empty">Нет проектов по выбранному фильтру.</div>'}</section>

    <nav class="bottom-nav">
      <button class="active">Главная</button>
      <button data-cat="fav">Избранное</button>
      <button data-alerts>Уведомления</button>
      <button data-pro>Профиль</button>
    </nav>
  </main><div id="toast" class="toast"></div>`;
  bind();
}
function toast(text){const t=document.getElementById('toast'); if(!t)return; t.textContent=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1200)}
function bind(){
  document.querySelectorAll('[data-dep]').forEach(b=>b.onclick=()=>{state.deposit=Number(b.dataset.dep);save();render()});
  const custom=document.querySelector('[data-custom]');
  if(custom) custom.onclick=()=>{const v=prompt('Введите сумму USDT',state.deposit); if(v&&Number(v)>0){state.deposit=Number(v);save();render()}};
  document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{state.category=b.dataset.cat;save();render()});
  document.querySelectorAll('[data-fav]').forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.fav;state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):state.favorites.concat(id);save();render()});
  document.querySelector('[data-sort]')?.addEventListener('click',()=>{state.sort=state.sort==='potential'?'score':'potential';save();render()});
  document.querySelectorAll('[data-pro]').forEach(b=>b.onclick=()=>{state.pro=!state.pro;save();render()});
  document.querySelector('[data-scan]')?.addEventListener('click',e=>{e.target.textContent='Сканирую...';setTimeout(()=>{toast('CryptoRank Scanner обновлён');render()},650)});
  document.querySelectorAll('[data-alerts]').forEach(b=>b.onclick=()=>toast('Уведомления — следующий этап'));
}
render();
