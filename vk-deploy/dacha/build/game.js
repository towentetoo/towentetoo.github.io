/* Дачный ремонт — три в ряд. T&C STUDIO. HTML5 для Яндекс Игр / VK / OK (платформа — через YaGames-совместимый слой). */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const DEV=!!window.__M3_DEV__||/[?&]dev\b/.test(location.search);
const PF=window.__TC_PLATFORM||'yandex';

// ================= тексты =================
const NM={yandex:{ru:'Яндекс Игры',en:'Yandex Games'},vk:{ru:'ВКонтакте',en:'VK'},ok:{ru:'Одноклассники',en:'OK'}}[PF];
const legal=(L)=>L==='ru'?`<h3>Политика конфиденциальности</h3>
<p>Игра «Дачный ремонт» не собирает и не передаёт разработчику персональные данные игроков.</p>
<p>Прогресс (уровень, звёзды, бустеры, покупки на даче и настройки звука) хранится на устройстве игрока и в хранилище платформы ${NM.ru}, привязанном к аккаунту, чтобы он не терялся и был доступен на других устройствах.</p>
${PF==='yandex'?'<p>Если игрок вошёл через Яндекс ID, в рейтинге показываются его публичное имя, аватар и результат — по правилам платформы Яндекс Игры.</p>':PF==='vk'?'<p>Таблица рекордов показывается средствами ВКонтакте по правилам платформы.</p>':''}
<p>Реклама показывается средствами платформы ${NM.ru}. Обработка данных при показе рекламы регулируется политикой конфиденциальности платформы.</p>
<p>Удалить локальный прогресс можно, очистив данные сайта в настройках браузера.</p>
<h3>Лицензионное соглашение</h3>
<p>Игра предоставляется бесплатно для личного некоммерческого использования на платформе ${NM.ru} на условиях «как есть».</p>
<p>Все права на игру, её графику, музыку и программный код принадлежат разработчику (T&amp;C STUDIO). Запрещено копировать, изменять, распространять игру или её части без разрешения разработчика.</p>
<p>Внутриигровые звёзды и бустеры не имеют денежной ценности и не могут быть обменяны на деньги, товары или услуги.</p>
<p>Разработчик не несёт ответственности за перебои в работе платформы и за потерю данных по причинам, не зависящим от разработчика.</p>
<p>Начиная игру, вы соглашаетесь с этими условиями.</p>`:`<h3>Privacy policy</h3>
<p>Cottage Makeover does not collect or send players’ personal data to the developer.</p>
<p>Progress (level, stars, boosters, cottage items and sound settings) is stored on the player’s device and in ${NM.en} platform storage linked to the account, so it is kept and available on other devices.</p>
${PF==='yandex'?'<p>If the player signs in with Yandex ID, the leaderboard shows their public name, avatar and result according to Yandex Games rules.</p>':PF==='vk'?'<p>The leaderboard is provided by VK according to the platform rules.</p>':''}
<p>Ads are shown by the ${NM.en} platform. Data processing for ads is governed by the platform’s privacy policy.</p>
<p>You can delete local progress by clearing site data in your browser settings.</p>
<h3>License agreement</h3>
<p>The game is provided free of charge for personal non-commercial use on the ${NM.en} platform “as is”.</p>
<p>All rights to the game, its graphics, music and code belong to the developer (T&amp;C STUDIO). Copying, modifying or distributing the game or its parts without permission is prohibited.</p>
<p>In-game stars and boosters have no monetary value and cannot be exchanged for money, goods or services.</p>
<p>The developer is not responsible for platform outages or data loss beyond the developer’s control.</p>
<p>By playing the game you agree to these terms.</p>`;
const STR={
 ru:{title:'Дачный<br>ремонт',moves:'Ходы',level:'Уровень',play:'Играть',cont:'Продолжить',dacha:'🏡 Дача',board:'🏆 Рейтинг',
   how:'Меняй соседние фишки местами и собирай по три в ряд. За уровни — звёзды, на звёзды ремонтируй бабушкину дачу.',
   collect:'Собери:',go:'Начать',movesN:n=>`Ходов: ${n}`,lvlN:n=>`Уровень ${n}`,
   pause:'Пауза',resume:'Продолжить',restart:'Начать заново',menu:'В меню',sfxOn:'🔊 Звуки',sfxOff:'🔈 Звуки выкл',musOn:'🎵 Музыка',musOff:'🎵 Музыка выкл',
   win:'Уровень пройден!',next:'Дальше',double:'Удвоить звёзды',toDacha:'🏡 На дачу',got:n=>`+${n} ★`,score:'Очки',
   lose:'Ходы закончились',loseText:'Совсем чуть-чуть осталось!',more:'+5 ходов',again:'Заново',
   hamT:'Молотки закончились',hamX:'Посмотри рекламу и получи 2 молотка. А ещё каждые 2 уровня — +1 молоток.',hamB:'Смотреть: +2 молотка',
   shufT:'Перемешивания закончились',shufX:'Посмотри рекламу и получи 2 перемешивания. А ещё каждые 3 уровня — +1 перемешивание.',shufB:'Смотреть: +2 перемешивания',cancel:'Отмена',
   hamTip:'Нажми на фишку, которую разбить',shuffled:'Перемешано',noMoves:'Ходов нет — перемешиваю',
   praise:['Отлично!','Супер!','Невероятно!'],
   adNA:'Реклама сейчас недоступна, попробуй позже',back:'Назад',own:'✓',need:n=>`Не хватает ${n} ★`,bought:'Готово!',allDone:'Дача отремонтирована полностью! Отличная работа.',
   boardLoading:'Загрузка рейтинга…',boardErr:'Рейтинг сейчас недоступен',boardEmpty:'Пока никого нет. Стань первым!',boardGuest:'Войди, чтобы попасть в рейтинг',
   login:PF==='yandex'?'Войти через Яндекс':'Войти',anon:'Игрок',lvls:n=>`${n} ур.`,legalBtn:'Конфиденциальность и соглашение',
   boot:'Загрузка…',bootErr:'Не удалось загрузить игру. Проверь интернет и попробуй ещё раз.',retry:'Повторить',meta:(l,s)=>`Уровень ${l} · ★ ${s}`,mud:'Лужи',weed:'Сорняки'},
 en:{title:'Cottage<br>Makeover',moves:'Moves',level:'Level',play:'Play',cont:'Continue',dacha:'🏡 Cottage',board:'🏆 Leaderboard',
   how:'Swap neighbouring pieces to match three in a row. Earn stars and spend them to fix up grandma’s cottage.',
   collect:'Collect:',go:'Start',movesN:n=>`Moves: ${n}`,lvlN:n=>`Level ${n}`,
   pause:'Pause',resume:'Resume',restart:'Restart',menu:'Menu',sfxOn:'🔊 Sounds',sfxOff:'🔈 Sounds off',musOn:'🎵 Music',musOff:'🎵 Music off',
   win:'Level complete!',next:'Next',double:'Double the stars',toDacha:'🏡 To the cottage',got:n=>`+${n} ★`,score:'Score',
   lose:'Out of moves',loseText:'You were so close!',more:'+5 moves',again:'Retry',
   hamT:'Out of hammers',hamX:'Watch an ad to get 2 hammers. Every 2 levels also give +1 hammer.',hamB:'Watch: +2 hammers',
   shufT:'Out of shuffles',shufX:'Watch an ad to get 2 shuffles. Every 3 levels also give +1 shuffle.',shufB:'Watch: +2 shuffles',cancel:'Cancel',
   hamTip:'Tap a piece to smash',shuffled:'Shuffled',noMoves:'No moves — shuffling',
   praise:['Great!','Super!','Amazing!'],
   adNA:'Ads are unavailable right now, try later',back:'Back',own:'✓',need:n=>`${n} more ★ needed`,bought:'Done!',allDone:'The cottage is fully renovated! Great job.',
   boardLoading:'Loading leaderboard…',boardErr:'Leaderboard is unavailable right now',boardEmpty:'Nobody here yet. Be the first!',boardGuest:'Sign in to join the leaderboard',
   login:PF==='yandex'?'Sign in with Yandex':'Sign in',anon:'Player',lvls:n=>`lvl ${n}`,legalBtn:'Privacy and terms',
   boot:'Loading…',bootErr:'Could not load the game. Check your connection and try again.',retry:'Retry',meta:(l,s)=>`Level ${l} · ★ ${s}`,mud:'Puddles',weed:'Weeds'}
};
STR.ru.legal=legal('ru'); STR.en.legal=legal('en');
const RU_LANGS=new Set(['ru','be','kk','uk','uz']);
const resolveLang=l=>RU_LANGS.has(String(l||'').toLowerCase().slice(0,2))?'ru':'en';
if(DEV) window.__m3ResolveLang=resolveLang;
let LANG='ru', T=STR.ru;

// ================= фишки и препятствия =================
const ART=window.DR_ART;
const weedDraw=(g,hp)=>{ g.save(); g.scale(1.15,1.15); ART.weed(g,hp); g.restore(); };
const mudDraw=g=>ART.puddle(g);
const KINDS=ART.PIECES;
const N=8, WEED=-2, CB=-1;
const ITEMS=window.MJ_DACHA.ITEMS;

// ================= уровни =================
// маски 8×8: '.' пусто, m/M — грязь 1/2 слоя, w/W — сорняк 1/2 удара
const PAT={
  mudC:['........','........','..mmmm..','..mmmm..','..mmmm..','..mmmm..','........','........'],
  mudD:['........','...mm...','..mmmm..','.mmmmmm.','.mmmmmm.','..mmmm..','...mm...','........'],
  mudB:['........','........','........','........','.mmmmmm.','.mmmmmm.','.mmmmmm.','........'],
  mudO:['........','.mmmmmm.','.m....m.','.m....m.','.m....m.','.m....m.','.mmmmmm.','........'],
  weedL:['........','........','........','........','........','........','..w..w..','.ww..ww.'],
  weedR:['........','........','........','...ww...','..wwww..','........','........','........'],
  weedB:['........','........','........','........','........','.wwwwww.','........','........'],
  weedH:['........','........','.W....W.','..W..W..','........','..W..W..','.W....W.','........'],
  mix1:['........','........','..mmmm..','..mmmm..','........','........','..w..w..','.ww..ww.'],
  mix2:['........','........','..mmmm..','.wmMMmw.','.wmMMmw.','..mmmm..','........','........'],
  mix3:['........','.mmmmmm.','.m....m.','.m.WW.m.','.m.WW.m.','.m....m.','.mmmmmm.','........'],
};
// [ходы, видов фишек, цели-цвета {вид:кол-во}, маска]. Грязь и сорняки из маски всегда входят в цели целиком.
const LEVELS=[
  [22,5,{2:18},null],[22,5,{0:16,4:14},null],[20,5,{1:22},null],
  [22,5,{},'mudC'],[26,6,{3:12},'mudD'],[22,6,{0:20,5:20},null],[24,6,{},'mudB'],
  [22,6,{},'weedL'],[22,6,{2:14},'weedR'],[26,6,{},'mix1'],
  [24,6,{4:22,1:22},null],[26,6,{},'mudO'],[24,6,{3:15},'weedB'],[26,6,{},'weedH'],
  [28,6,{},'mix2'],[30,6,{},'mix3'],
];
function maskGoals(pat){ const g={}; if(!pat) return g; let m=0,w=0; for(const row of PAT[pat]) for(const ch of row){ if(ch==='m') m++; if(ch==='M') m+=2; if(ch==='w'||ch==='W') w++; }
  if(m) g.mud=m; if(w) g.weed=w; return g; }
function levelDef(n){
  const i=n<=LEVELS.length?n-1:3+((n-1)%(LEVELS.length-3)), [moves,kinds,goals,pat]=LEVELS[i], k=n<=LEVELS.length?0:Math.floor((n-1-3)/(LEVELS.length-3));
  const g={}; for(const key in goals) g[key]=Math.round(goals[key]*(1+.08*k));
  return {moves:Math.max(16,moves-k),kinds,goals:{...g,...maskGoals(pat)},pat};
}

// ================= состояние поля =================
let grid=[], mud=[], level=1, moves=0, goals={}, kinds=6, state='idle', score=0, combo=0, idSeq=1, idle=0, hintMove=null, extraUsed=false, startMoves=0;
const rnd=k=>Math.random()*k|0;
function mk(k,sp){ return {id:idSeq++,k,sp:sp||null,hp:0,x:0,y:0,s:1,a:1,shake:0}; }
const at=(r,c)=>(r>=0&&r<N&&c>=0&&c<N)?grid[r][c]:undefined;
const same=(a,b)=>a&&b&&a.k>=0&&a.k===b.k;
const isWeed=p=>p&&p.k===WEED;

function buildLevel(n){
  const d=levelDef(n); level=n; moves=startMoves=d.moves; kinds=d.kinds; goals=d.goals; score=0; combo=0; idle=0; hintMove=null; extraUsed=false;
  const mask=d.pat?PAT[d.pat]:null;
  mud=[...Array(N)].map((_,r)=>[...Array(N)].map((_,c)=>{ const ch=mask?mask[r][c]:'.'; return ch==='m'?1:ch==='M'?2:0; }));
  for(let tries=0;tries<50;tries++){
    grid=[]; for(let r=0;r<N;r++){ grid.push([]); for(let c=0;c<N;c++){ const ch=mask?mask[r][c]:'.';
      if(ch==='w'||ch==='W'){ const p=mk(WEED); p.hp=ch==='W'?2:1; grid[r].push(p); continue; }
      let k; do{ k=rnd(kinds); }while((c>=2&&grid[r][c-1].k===k&&grid[r][c-2].k===k)||(r>=2&&grid[r-1][c].k===k&&grid[r-2][c].k===k));
      grid[r].push(mk(k)); } }
    if(findMove()) break;
  }
  for(let r=0;r<N;r++) for(let c=0;c<N;c++){ const p=grid[r][c]; p.x=c; p.y=r-N-1-rnd(3)-(N-r)*.2; }
}

// ================= совпадения =================
function findMatches(swapA,swapB){
  const runs=[];
  for(let r=0;r<N;r++){ let c=0; while(c<N){ let e=c+1; while(e<N&&same(grid[r][c],grid[r][e])) e++; if(e-c>=3) runs.push({cells:[...Array(e-c)].map((_,i)=>[r,c+i]),dir:'h'}); c=e; } }
  for(let c=0;c<N;c++){ let r=0; while(r<N){ let e=r+1; while(e<N&&same(grid[r][c],grid[e][c])) e++; if(e-r>=3) runs.push({cells:[...Array(e-r)].map((_,i)=>[r+i,c]),dir:'v'}); r=e; } }
  const clear=new Set(), make=[], used=new Set(), key=(r,c)=>r+','+c, cnt={};
  runs.forEach(R=>R.cells.forEach(([r,c])=>{ const k=key(r,c); cnt[k]=(cnt[k]||0)+1; clear.add(k); }));
  const pivotOf=R=>{ for(const s of [swapA,swapB]) if(s&&R.cells.some(([r,c])=>r===s[0]&&c===s[1])) return s; return R.cells[Math.floor(R.cells.length/2)]; };
  for(const R of runs.filter(R=>R.cells.length>=5)){ const [r,c]=pivotOf(R); if(used.has(key(r,c))) continue; make.push({r,c,k:CB,sp:'cb'}); used.add(key(r,c)); }
  for(const k of Object.keys(cnt)) if(cnt[k]>1&&!used.has(k)){ const [r,c]=k.split(',').map(Number); make.push({r,c,k:grid[r][c].k,sp:'bomb'}); used.add(k); }
  for(const R of runs.filter(R=>R.cells.length===4)){ if(R.cells.some(([r,c])=>used.has(key(r,c)))) continue; const [r,c]=pivotOf(R); make.push({r,c,k:grid[r][c].k,sp:R.dir==='h'?'h':'v'}); used.add(key(r,c)); }
  return {clear,make};
}
function blast(r,c,p,set){
  const add=(rr,cc)=>{ if(rr>=0&&rr<N&&cc>=0&&cc<N) set.add(rr+','+cc); };
  if(p.sp==='h') for(let i=0;i<N;i++) add(r,i);
  if(p.sp==='v') for(let i=0;i<N;i++) add(i,c);
  if(p.sp==='bomb') for(let i=-1;i<=1;i++) for(let j=-1;j<=1;j++) add(r+i,c+j);
  if(p.sp==='cb'){ const k=p.target>=0?p.target:mostCommon(); for(let i=0;i<N;i++) for(let j=0;j<N;j++) if(grid[i][j]&&grid[i][j].k===k) add(i,j); }
}
function mostCommon(){ const m={}; grid.flat().forEach(p=>{ if(p&&p.k>=0) m[p.k]=(m[p.k]||0)+1; }); return +Object.keys(m).sort((a,b)=>m[b]-m[a])[0]; }
function goalHit(key){ if(goals[key]>0){ goals[key]--; return true; } return false; }
// разрушение: цепные бонусы, грязь под фишками, сорняки рядом
function destroy(clear,make,quiet){
  const queue=[...clear], done=new Set(), keep=new Set(make.map(m=>m.r+','+m.c));
  while(queue.length){ const k=queue.pop(); if(done.has(k)) continue; done.add(k);
    const [r,c]=k.split(',').map(Number), p=grid[r][c]; if(!p||!p.sp) continue;
    const s=new Set(); blast(r,c,p,s); s.forEach(x=>{ if(!done.has(x)) queue.push(x); }); if(!quiet) fx.push({r,c,sp:p.sp,a:1}); }
  let n=0; const hitWeeds=new Set();
  const damageWeed=(r,c)=>{ const w=at(r,c); if(!isWeed(w)||hitWeeds.has(w.id)) return; hitWeeds.add(w.id); w.hp--; w.shake=.3;
    if(w.hp<=0){ goalHit('weed'); if(!quiet){ dying.push(w); burst(c,r,'#5fae4f'); } grid[r][c]=null; score+=30; } };
  done.forEach(k=>{ const [r,c]=k.split(',').map(Number), p=grid[r][c]; if(!p) return;
    if(isWeed(p)){ damageWeed(r,c); return; }
    if(keep.has(k)&&!p.sp) { if(mud[r][c]>0){ mud[r][c]--; goalHit('mud'); } return; }
    if(mud[r][c]>0){ mud[r][c]--; goalHit('mud'); if(!quiet) burst(c,r,'#8a6440'); }
    goalHit(p.k); score+=10*(combo+1); n++;
    if(!quiet){ dying.push(p); burst(c,r,KINDS[p.k]?KINDS[p.k].col:'#fff'); }
    grid[r][c]=null;
    for(const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]) damageWeed(r+dr,c+dc); });
  for(const m of make){ const p=grid[m.r][m.c]; if(p&&!p.sp&&p.k>=0){ p.sp=m.sp; p.k=m.k; p.s=1.5; } else if(!p){ const q=mk(m.k,m.sp); q.x=m.c; q.y=m.r; q.s=1.5; grid[m.r][m.c]=q; } }
  return n;
}
function gravity(){
  for(let c=0;c<N;c++){ let w=N-1; for(let r=N-1;r>=0;r--){ const p=grid[r][c]; if(p){ grid[r][c]=null; grid[w][c]=p; w--; } }
    let spawn=0; for(let r=w;r>=0;r--){ const p=mk(rnd(kinds)); p.x=c; p.y=-1-spawn++; grid[r][c]=p; } }
}
function findMove(){
  for(let r=0;r<N;r++) for(let c=0;c<N;c++) for(const [dr,dc] of [[0,1],[1,0]]){
    const r2=r+dr, c2=c+dc; if(r2>=N||c2>=N) continue; const a=grid[r][c], b=grid[r2][c2];
    if(!a||!b||isWeed(a)||isWeed(b)) continue;
    if(a.sp==='cb'||b.sp==='cb'||(a.sp&&b.sp)) return [[r,c],[r2,c2]];
    grid[r][c]=b; grid[r2][c2]=a; const m=findMatches(); grid[r][c]=a; grid[r2][c2]=b;
    if(m.clear.size) return [[r,c],[r2,c2]]; }
  return null;
}
function reshuffle(){
  const cells=[]; for(let r=0;r<N;r++) for(let c=0;c<N;c++) if(!isWeed(grid[r][c])) cells.push([r,c]);
  const ps=cells.map(([r,c])=>grid[r][c]);
  for(let t=0;t<200;t++){ for(let i=ps.length-1;i>0;i--){ const j=rnd(i+1); [ps[i],ps[j]]=[ps[j],ps[i]]; }
    cells.forEach(([r,c],i)=>grid[r][c]=ps[i]); if(!findMatches().clear.size&&findMove()) return; }
  for(const [r,c] of cells) grid[r][c].k=rnd(kinds);   // крайний случай: перекрасить
  if(!findMove()||findMatches().clear.size) reshuffle();
}

// ================= ход игрока =================
let pending=null, timer=0;
const canPlay=()=>inputEnabled&&running&&!paused()&&state==='idle'&&moves>0;
function trySwap(a,b){
  if(!canPlay()) return;
  const pa=at(...a), pb=at(...b); if(!pa||!pb||isWeed(pa)||isWeed(pb)){ if(pa) pa.shake=.25; SFX.no(); return; }
  audio(); hintMove=null; idle=0;
  grid[a[0]][a[1]]=pb; grid[b[0]][b[1]]=pa;
  if(pa.sp==='cb'||pb.sp==='cb'||(pa.sp&&pb.sp)){ moves--; state='swap'; pending={a,b,special:true}; SFX.swap(); updHud(); return; }
  const m=findMatches(a,b);
  if(m.clear.size){ moves--; state='swap'; pending={a,b}; SFX.swap(); updHud(); }
  else { state='swapback'; pending={a,b}; SFX.no(); }
}
function specialSet(a,b){
  const pa=grid[a[0]][a[1]], pb=grid[b[0]][b[1]], set=new Set([a.join(','),b.join(',')]);
  if(pa.sp==='cb'&&pb.sp==='cb'){ for(let r=0;r<N;r++) for(let c=0;c<N;c++) set.add(r+','+c); pa.sp=pb.sp=null; pa.k=pb.k=0; }
  else if(pa.sp==='cb'||pb.sp==='cb'){ const cb=pa.sp==='cb'?pa:pb, other=cb===pa?pb:pa; cb.target=other.k;
    if(other.sp){ for(let r=0;r<N;r++) for(let c=0;c<N;c++){ const p=grid[r][c]; if(p&&p.k===other.k&&!p.sp) p.sp=Math.random()<.5?'h':'v'; } } }
  else { const [r,c]=b; for(let i=0;i<N;i++){ set.add(r+','+i); set.add(i+','+c); }
    if(pa.sp==='bomb'||pb.sp==='bomb') for(let i=-2;i<=2;i++) for(let j=-2;j<=2;j++) if(r+i>=0&&r+i<N&&c+j>=0&&c+j<N) set.add((r+i)+','+(c+j)); }
  return set;
}
function afterSwap(){
  const {a,b,special}=pending; pending=null; combo=0;
  if(special){ destroy(specialSet(a,b),[]); SFX.boom(); shake=.25; updHud(); state='clear'; timer=.22; return; }
  resolve(a,b);
}
function resolve(a,b){
  const m=findMatches(a,b);
  if(!m.clear.size){ state='idle'; checkEnd(); if(state==='idle'&&!findMove()){ toast(T.noMoves); reshuffle(); } return; }
  destroy(m.clear,m.make); SFX.match(combo); if(m.make.length) SFX.special(); combo++;
  if(combo>=3) toast(T.praise[Math.min(2,combo-3)]);
  updHud(); state='clear'; timer=.2;
}
function goalsDone(){ return Object.values(goals).every(v=>v<=0); }

// ================= бустеры =================
let hammerMode=false;
function useHammer(r,c){
  const p=at(r,c); if(!p) return;
  hammerMode=false; $('hammerTip').classList.add('hide'); prog.hammer--; save(); updHud();
  const set=new Set([r+','+c]); if(isWeed(p)) p.hp=1;
  destroy(set,[]); SFX.boom(); shake=.15; state='clear'; timer=.2; updHud();
}
$('bHammer').onclick=e=>{ e.stopPropagation(); audio(); if(!canPlay()) return;
  if(prog.hammer<=0){ openOffer('hammer'); return; }
  hammerMode=!hammerMode; $('hammerTip').textContent=T.hamTip; $('hammerTip').classList.toggle('hide',!hammerMode); };
$('bShuffle').onclick=e=>{ e.stopPropagation(); audio(); if(!canPlay()) return;
  if(prog.shuf<=0){ openOffer('shuf'); return; }
  prog.shuf--; save(); reshuffle(); toast(T.shuffled); SFX.shuffle(); updHud(); };
let offerKind='';
function openOffer(kind){ offerKind=kind;
  $('offerTitle').textContent=kind==='hammer'?T.hamT:T.shufT; $('offerText').textContent=kind==='hammer'?T.hamX:T.shufX; $('offerBtn').textContent=kind==='hammer'?T.hamB:T.shufB;
  pushScreen('ovOffer'); }
$('bOfferAd').onclick=()=>showRewarded(()=>{ if(offerKind==='hammer') prog.hammer+=2; else prog.shuf+=2; save(true); updHud(); },ok=>{ if(ok){ popScreen(); SFX.coin(); } });

// ================= конец уровня =================
let lastStars=0;
function checkEnd(){
  if(goalsDone()){ state='end'; running=false; applyState();
    const st=moves>=Math.max(4,startMoves*.3)?3:moves>=2?2:1; lastStars=st;
    if(prog.level===level){ prog.level=level+1; prog.stars+=st; prog.earned+=st; }
    const gift=[]; if(level%2===0){ prog.hammer++; gift.push('+1 🔨'); } if(level%3===0){ prog.shuf++; gift.push('+1 🔀'); }   // бонусы за игру — не только за рекламу
    save(true); pushCloud(); submitBest();
    $('stars').innerHTML='<i class="on">★</i>'.repeat(st)+'<i>★</i>'.repeat(3-st);
    $('winText').textContent=`${T.score}: ${score}  ·  ${T.got(st)}`+(gift.length?'  ·  '+gift.join(' '):'');
    $('bDouble').classList.remove('hide');
    SFX.win(); setTimeout(()=>pushScreen('ovWin'),600); return; }
  if(moves<=0){ state='end'; running=false; applyState();
    fillGoals($('goalsLeft'));
    $('bMore').classList.toggle('hide',extraUsed);
    SFX.lose(); setTimeout(()=>pushScreen('ovLose'),500); }
}
$('bDouble').onclick=()=>showRewarded(()=>{ prog.stars+=lastStars; prog.earned+=lastStars; save(true); },ok=>{ if(ok){ $('bDouble').classList.add('hide'); $('winText').textContent+=`  ·  ${T.got(lastStars)}`; SFX.coin(); } });
$('bMore').onclick=()=>showRewarded(()=>{ moves+=5; extraUsed=true; },ok=>{ if(ok){ clearScreens(); state='idle'; running=true; applyState(); updHud(); } });
function startLevel(n){ clearScreens(); buildLevel(n); updHud(); fillGoals($('goalsBig'));
  $('startTitle').textContent=T.lvlN(n); $('startMoves').textContent=T.movesN(moves); state='idle'; running=false; pushScreen('ovStart'); }
$('bGo').onclick=()=>{ audio(); clearScreens(); running=true; applyState(); };
$('bNext').onclick=()=>{ const go=()=>startLevel(prog.level); if(level>=2) showInterstitial(go); else go(); };
$('bAgain').onclick=()=>{ const go=()=>startLevel(level); if(level>=3) showInterstitial(go); else go(); };
$('bWinDacha').onclick=()=>{ clearScreens(); openDacha(); };
$('bLoseMenu').onclick=toMenu;
$('bRestart').onclick=()=>startLevel(level);

// ================= раскладка =================
const cv=$('c'), ctx=cv.getContext('2d');
let W=0,H=0,DPR=1,CS=40,BX=0,BY=0,shake=0;
function layout(){
  W=Math.max(1,innerWidth); H=Math.max(1,innerHeight); DPR=Math.min(devicePixelRatio||1,2.5);
  cv.width=W*DPR|0; cv.height=H*DPR|0; cv.style.width=W+'px'; cv.style.height=H+'px';
  const land=W>H*1.15, top=Math.max(76,H*.1), pad=12, toolsH=land?0:64, toolsW=land?70:0;
  CS=Math.floor(Math.min((W-pad*2-toolsW*2)/N,(H-top-pad*2-toolsH)/N,74));
  BX=Math.round((W-CS*N)/2); BY=Math.round(top+(H-top-toolsH-CS*N)/2);
  const t=$('tools').style;
  if(land){ Object.assign(t,{flexDirection:'column',left:(BX+CS*N+18)+'px',top:(BY)+'px',bottom:'',transform:''}); }
  else { Object.assign(t,{flexDirection:'row',left:'50%',transform:'translateX(-50%)',top:(BY+CS*N+14)+'px',bottom:''}); }
  $('hammerTip').style.top=(BY-44)+'px';
}
addEventListener('resize',()=>{ layout(); if(stack.includes('ovDacha')) sizeScene(); });
addEventListener('orientationchange',()=>setTimeout(layout,200));

// ================= ввод =================
let down=null, selected=null;
const cellAt=(x,y)=>{ const c=Math.floor((x-BX)/CS), r=Math.floor((y-BY)/CS); return (r>=0&&r<N&&c>=0&&c<N)?[r,c]:null; };
cv.addEventListener('pointerdown',e=>{ audio(); const cell=cellAt(e.clientX,e.clientY); if(!cell){ selected=null; return; }
  if(hammerMode){ if(canPlay()) useHammer(...cell); return; }
  down={cell,x:e.clientX,y:e.clientY,used:false}; });
cv.addEventListener('pointermove',e=>{ if(!down||down.used) return; const dx=e.clientX-down.x, dy=e.clientY-down.y;
  if(Math.max(Math.abs(dx),Math.abs(dy))>CS*.35){ const [r,c]=down.cell; const t=Math.abs(dx)>Math.abs(dy)?[r,c+Math.sign(dx)]:[r+Math.sign(dy),c];
    down.used=true; selected=null; if(at(...t)) trySwap(down.cell,t); } });
cv.addEventListener('pointerup',()=>{ if(down&&!down.used){ const cell=down.cell;
    if(selected&&Math.abs(selected[0]-cell[0])+Math.abs(selected[1]-cell[1])===1){ const s=selected; selected=null; trySwap(s,cell); }
    else selected=(selected&&selected[0]===cell[0]&&selected[1]===cell[1])?null:cell; }
  down=null; });

// ================= отрисовка =================
let iconCache={}, iconKey='';
function icon(key,draw,scale=.92){ const k2=CS+'|'+DPR; if(k2!==iconKey){ iconCache={}; iconKey=k2; }
  if(!iconCache[key]){ const sz=Math.ceil(CS*scale*DPR), c=document.createElement('canvas'); c.width=c.height=sz; const g=c.getContext('2d');
    g.translate(sz/2,sz/2); g.scale(sz/2.15,sz/2.15); draw(g); iconCache[key]=c; } return iconCache[key]; }
const fx=[], parts=[], dying=[];
function burst(c,r,col){ if(parts.length>300) return; const x=BX+(c+.5)*CS, y=BY+(r+.5)*CS;
  for(let i=0;i<8;i++){ const a=Math.random()*6.28, v=CS*(2+Math.random()*3); parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-CS*2,r:CS*(.04+Math.random()*.05),t:.5+Math.random()*.3,c:i%3?col:'#fff'}); } }
function rr(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
function drawBoard(){
  const fw=CS*.32;   // деревянный борт грядки
  ctx.fillStyle='rgba(40,60,20,.25)'; rr(BX-fw+4,BY-fw+8,CS*N+fw*2,CS*N+fw*2,fw*.6); ctx.fill();
  rr(BX-fw,BY-fw,CS*N+fw*2,CS*N+fw*2,fw*.6); ctx.fillStyle='#b5773f'; ctx.fill(); ctx.lineWidth=3; ctx.strokeStyle='#3b2a1c'; ctx.stroke();
  ctx.strokeStyle='rgba(90,50,20,.45)'; ctx.lineWidth=2; for(const o of [.33,.66]){ ctx.beginPath(); ctx.moveTo(BX-fw,BY-fw*o); ctx.lineTo(BX+CS*N+fw,BY-fw*o); ctx.moveTo(BX-fw,BY+CS*N+fw*o); ctx.lineTo(BX+CS*N+fw,BY+CS*N+fw*o); ctx.stroke(); }
  for(const [x,y] of [[BX-fw*.5,BY-fw*.5],[BX+CS*N+fw*.5,BY-fw*.5],[BX-fw*.5,BY+CS*N+fw*.5],[BX+CS*N+fw*.5,BY+CS*N+fw*.5]]){ ctx.beginPath(); ctx.arc(x,y,fw*.18,0,7); ctx.fillStyle='#7a4a22'; ctx.fill(); }
  for(let r=0;r<N;r++) for(let c=0;c<N;c++){ ctx.fillStyle=(r+c)%2?'#7a5133':'#875a39'; ctx.fillRect(BX+c*CS,BY+r*CS,CS,CS);
    if((r*7+c*3)%5===0){ ctx.fillStyle='rgba(255,255,255,.07)'; ctx.beginPath(); ctx.arc(BX+(c+.3)*CS,BY+(r+.7)*CS,CS*.05,0,7); ctx.fill(); }
    if(mud[r]&&mud[r][c]){ const ic=icon('mud',mudDraw,1.02); const s=ic.width/DPR; ctx.globalAlpha=mud[r][c]>1?1:.75; ctx.drawImage(ic,BX+c*CS+(CS-s)/2,BY+r*CS+(CS-s)/2,s,s); ctx.globalAlpha=1; } }
  if(selected){ ctx.fillStyle='rgba(255,230,120,.45)'; ctx.fillRect(BX+selected[1]*CS,BY+selected[0]*CS,CS,CS); }
}
function drawPiece(p){
  const x=BX+(p.x+.5)*CS+(p.shake>0?Math.sin(p.shake*60)*CS*.06:0), y=BY+(p.y+.5)*CS; if(y<BY-CS*.5) return;
  ctx.save(); ctx.translate(x,y); ctx.scale(p.s,p.s); ctx.globalAlpha=p.a;
  if(p.k===WEED){ const ic=icon('weed'+p.hp,g=>weedDraw(g,p.hp)); const s=ic.width/DPR; ctx.drawImage(ic,-s/2,-s/2,s,s); }
  else if(p.sp==='cb'){ const t=performance.now()/600; for(let i=0;i<6;i++){ ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,CS*.38,t+i*1.047,t+(i+1)*1.047); ctx.fillStyle=KINDS[i].col; ctx.fill(); }
    ctx.beginPath(); ctx.arc(0,0,CS*.18,0,7); ctx.fillStyle='#fff'; ctx.fill(); }
  else { const ic=icon('k'+p.k,KINDS[p.k].draw), s=ic.width/DPR; ctx.drawImage(ic,-s/2,-s/2,s,s);
    if(p.sp==='h'||p.sp==='v'){ ctx.strokeStyle='rgba(255,255,255,.95)'; ctx.lineWidth=CS*.06; for(const o of [-.12,.12]){ ctx.beginPath();
      if(p.sp==='h'){ ctx.moveTo(-CS*.42,o*CS); ctx.lineTo(CS*.42,o*CS); } else { ctx.moveTo(o*CS,-CS*.42); ctx.lineTo(o*CS,CS*.42); } ctx.stroke(); } }
    if(p.sp==='bomb'){ ctx.strokeStyle=`rgba(255,200,60,${.6+.4*Math.sin(performance.now()/150)})`; ctx.lineWidth=CS*.08; ctx.beginPath(); ctx.arc(0,0,CS*.44,0,7); ctx.stroke(); } }
  ctx.restore();
}
function paintBg(t){
  const g=ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,'#6ec6f5'); g.addColorStop(.6,'#bfe7fb'); g.addColorStop(.61,'#8fd16a'); g.addColorStop(1,'#5fae47'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  const sx=W*.85, sy=H*.12, sr=Math.min(W,H)*.09; ctx.fillStyle='rgba(255,236,140,.35)'; ctx.beginPath(); ctx.arc(sx,sy,sr*1.5,0,7); ctx.fill(); ctx.fillStyle='#ffe066'; ctx.beginPath(); ctx.arc(sx,sy,sr,0,7); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.9)'; for(const [x0,y,s] of [[.15,.1,1],[.55,.2,.8],[.35,.3,.6]]){ const x=((x0*W+t*12*s)%(W+200))-100, r=Math.min(W,H)*.05*s;
    ctx.beginPath(); ctx.arc(x,y*H,r,0,7); ctx.arc(x+r,y*H-r*.4,r*1.2,0,7); ctx.arc(x+r*2.1,y*H,r*.9,0,7); ctx.fill(); }
  ctx.fillStyle='#7cc35a'; ctx.beginPath(); ctx.ellipse(W*.2,H*.63,W*.45,H*.08,0,0,7); ctx.fill(); ctx.fillStyle='#86cb62'; ctx.beginPath(); ctx.ellipse(W*.85,H*.62,W*.4,H*.06,0,0,7); ctx.fill();
}
let last=performance.now(), sceneT=0;
function frame(now){
  const dt=Math.min(.05,(now-last)/1000); last=now;
  if(!pauseReasons.has('hidden')&&!pauseReasons.has('ad')){
    let moving=false;
    for(let r=0;r<N;r++) for(let c=0;c<N;c++){ const p=grid[r]&&grid[r][c]; if(!p) continue;
      const sp=(state==='swap'||state==='swapback')?9:14, dx=c-p.x, dy=r-p.y;
      if(Math.abs(dx)>.01||Math.abs(dy)>.01){ moving=true; const st=sp*dt; p.x+=Math.abs(dx)<st?dx:Math.sign(dx)*st; p.y+=Math.abs(dy)<st*1.6?dy:Math.sign(dy)*st*1.6; }
      else { p.x=c; p.y=r; }
      if(p.s!==1){ p.s+=(1-p.s)*Math.min(1,dt*10); if(Math.abs(p.s-1)<.01) p.s=1; }
      if(p.shake>0) p.shake=Math.max(0,p.shake-dt); }
    for(let i=dying.length-1;i>=0;i--){ const p=dying[i]; p.s-=dt*5; p.a=Math.max(0,p.s); if(p.s<=0) dying.splice(i,1); }
    if(!paused()){
      if(state==='swap'&&!moving) afterSwap();
      else if(state==='swapback'&&!moving){ const {a,b}=pending; const pa=grid[a[0]][a[1]]; grid[a[0]][a[1]]=grid[b[0]][b[1]]; grid[b[0]][b[1]]=pa; pending=null; state='settle'; }
      else if(state==='settle'&&!moving) state='idle';
      else if(state==='clear'){ timer-=dt; if(timer<=0){ gravity(); state='fall'; } }
      else if(state==='fall'&&!moving) resolve();
      if(state==='idle'&&running){ idle+=dt; if(idle>6&&!hintMove) hintMove=findMove(); }
    }
    shake=Math.max(0,shake-dt);
    ctx.setTransform(DPR,0,0,DPR,0,0); paintBg(now/1000);
    if(shake>0) ctx.translate((Math.random()-.5)*CS*.15*shake/.25,(Math.random()-.5)*CS*.15*shake/.25);
    drawBoard();
    ctx.save(); ctx.beginPath(); ctx.rect(BX,BY,CS*N,CS*N); ctx.clip();
    if(hintMove&&state==='idle'&&running){ const a=.25+.25*Math.sin(now/180); ctx.fillStyle=`rgba(255,220,90,${a})`; for(const [r,c] of hintMove) ctx.fillRect(BX+c*CS,BY+r*CS,CS,CS); }
    for(let r=0;r<N;r++) for(let c=0;c<N;c++){ const p=grid[r]&&grid[r][c]; if(p) drawPiece(p); }
    for(const p of dying) drawPiece(p);
    for(let i=fx.length-1;i>=0;i--){ const f=fx[i]; f.a-=dt*3; if(f.a<=0){ fx.splice(i,1); continue; } ctx.fillStyle=`rgba(255,240,150,${f.a*.75})`;
      if(f.sp==='h') ctx.fillRect(BX,BY+(f.r+.3)*CS,CS*N,CS*.4); if(f.sp==='v') ctx.fillRect(BX+(f.c+.3)*CS,BY,CS*.4,CS*N);
      if(f.sp==='bomb'||f.sp==='cb'){ ctx.beginPath(); ctx.arc(BX+(f.c+.5)*CS,BY+(f.r+.5)*CS,CS*1.6*(1.2-f.a),0,7); ctx.fill(); } }
    ctx.restore();
    for(let i=parts.length-1;i>=0;i--){ const q=parts[i]; q.t-=dt; if(q.t<=0){ parts.splice(i,1); continue; }
      q.x+=q.vx*dt; q.y+=q.vy*dt; q.vy+=CS*12*dt; ctx.globalAlpha=Math.min(1,q.t*2); ctx.fillStyle=q.c; ctx.beginPath(); ctx.arc(q.x,q.y,q.r,0,7); ctx.fill(); ctx.globalAlpha=1; }
  }
  const top=stack[stack.length-1];
  if(top==='ovDacha'&&!pauseReasons.has('hidden')){ sceneT+=dt; drawScene(); }
  if(top==='ovMenu'&&!pauseReasons.has('hidden')){ sceneT+=dt; drawHero(); }
  requestAnimationFrame(frame);
}

// ================= HUD =================
function goalCanvas(key,size){ const c=document.createElement('canvas'); c.width=c.height=size*2; const g=c.getContext('2d'); g.translate(size,size); g.scale(size*.85,size*.85);
  if(key==='mud') mudDraw(g); else if(key==='weed') weedDraw(g,1); else KINDS[+key].draw(g); return c; }
function updHud(){ $('moves').textContent=moves; $('lvl').textContent=level; const box=$('goals'); box.innerHTML='';
  for(const k of Object.keys(goals)){ const d=document.createElement('div'); d.className='goal'+(goals[k]<=0?' done':''); d.appendChild(goalCanvas(k,30));
    const b=document.createElement('b'); b.textContent=goals[k]<=0?'✓':goals[k]; d.appendChild(b); box.appendChild(d); }
  const h=$('nHammer'), s=$('nShuf'); h.textContent=prog.hammer>0?prog.hammer:'+'; h.classList.toggle('ad',prog.hammer<=0); s.textContent=prog.shuf>0?prog.shuf:'+'; s.classList.toggle('ad',prog.shuf<=0); }
function fillGoals(box){ box.innerHTML=''; for(const k of Object.keys(goals)){ if(goals[k]<=0) continue; const d=document.createElement('div'); d.appendChild(goalCanvas(k,52)); const b=document.createElement('span'); b.textContent=goals[k]; d.appendChild(b); box.appendChild(d); } }
let toastT=0; function toast(m){ const el=$('toast'); el.textContent=m; el.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('show'),1600); }

// ================= платформа и сохранения =================
let ysdk=null, player=null, readySent=false, inputEnabled=false, storage=null;
const withTimeout=(p,ms)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms))]);
const SAVE_KEY='m3_save_v1';
let prog={level:1,stars:0,earned:0,hammer:2,shuf:2,items:[],sfx:true,mus:true,ts:0};
function sanitize(p){ if(!p||typeof p!=='object') return null; const n=(v,d,mx)=>Number.isFinite(+v)?Math.max(0,Math.min(mx,Math.floor(+v))):d;
  return {level:Math.max(1,n(p.level,1,1e6)),stars:n(p.stars,0,1e7),earned:n(p.earned,0,1e7),hammer:n(p.hammer,2,999),shuf:n(p.shuf,2,999),
    items:Array.isArray(p.items)?p.items.filter(id=>ITEMS.some(i=>i.id===id)):[],sfx:p.sfx!==false,mus:p.mus!==false,ts:n(p.ts,0,9e15)}; }
function mergeSaves(a,b){ if(!a) return b; if(!b) return a; const base=b.ts>a.ts?{...b}:{...a};
  base.level=Math.max(a.level,b.level); base.earned=Math.max(a.earned,b.earned); base.items=[...new Set([...a.items,...b.items])]; return base; }
function localRead(){ try{ const s=(storage||localStorage).getItem(SAVE_KEY); return s?sanitize(JSON.parse(s)):null; }catch(e){ return null; } }
function localWrite(){ try{ (storage||localStorage).setItem(SAVE_KEY,JSON.stringify(prog)); }catch(e){} }
let cloudTimer=0, cloudBusy=false, cloudDirty=false, lastCloud=0;
function save(important){ prog.ts=Date.now(); localWrite(); cloudDirty=true; scheduleCloud(important); }
function scheduleCloud(important){ if(!player) return; const gap=important?3200:10000, wait=Math.max(0,gap-(Date.now()-lastCloud)); clearTimeout(cloudTimer); cloudTimer=setTimeout(pushCloud,wait); }
async function pushCloud(){ if(!player||!cloudDirty) return; if(cloudBusy||Date.now()-lastCloud<3000){ scheduleCloud(true); return; }
  cloudBusy=true; cloudDirty=false; lastCloud=Date.now(); try{ await player.setData({save:prog},true); }catch(e){ cloudDirty=true; } finally{ cloudBusy=false; } }
async function loadCloud(){ if(!player) return null; try{ const d=await withTimeout(player.getData(['save']),5000); return sanitize(d&&d.save); }catch(e){ return null; } }

// ================= звук =================
let A=null, BUS=null, MUS=null, blurred=false;
function audio(){ if(A) return A;
  try{ A=new (window.AudioContext||window.webkitAudioContext)(); const master=A.createGain(); master.connect(A.destination);
    BUS={sfx:A.createGain(),mus:A.createGain()}; BUS.sfx.connect(master); BUS.mus.connect(master);
    MUS=window.MJ_MUSIC.build(A,BUS.mus); setBus(); applyState(); }catch(e){ A=null; } return A; }
function setBus(){ if(!BUS) return; BUS.sfx.gain.value=prog.sfx?1:0; BUS.mus.gain.value=prog.mus?0.8:0; }
function sndLabels(){ $('bSfx').textContent=prog.sfx?T.sfxOn:T.sfxOff; $('bMus').textContent=prog.mus?T.musOn:T.musOff;
  const q=$('bSound'); q.textContent=(prog.sfx||prog.mus)?'🔊':'🔇'; q.setAttribute('aria-label',(prog.sfx||prog.mus)?T.sfxOn:T.sfxOff); }
function tone(f,d,v,when=0){ if(!A||A.state!=='running') return; const t=A.currentTime+when, o=A.createOscillator(), g=A.createGain();
  o.frequency.value=f; g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(v,t+.006); g.gain.exponentialRampToValueAtTime(.0001,t+d); o.connect(g); g.connect(BUS.sfx); o.start(t); o.stop(t+d+.02); }
const mf=m=>440*Math.pow(2,(m-69)/12), PEN=[67,69,71,74,76,79,81,83,86,88];   // соль мажор, как музыка
const bell=(m,v,w=0,d=.3)=>{ tone(mf(m),d,v,w); tone(mf(m)*2.01,d*.5,v*.25,w); };
const SFX={ swap(){ bell(62,.035,0,.12); }, no(){ tone(170,.15,.045); }, match(c){ bell(PEN[Math.min(c,9)],.06); },
  special(){ [0,4,7].forEach((s,i)=>bell(79+s,.045,i*.05,.25)); }, boom(){ tone(90,.4,.1); [0,4,7,12].forEach((s,i)=>bell(74+s,.045,i*.04)); },
  shuffle(){ for(let i=0;i<5;i++) bell(PEN[i],.03,i*.05,.15); }, coin(){ bell(83,.05); bell(88,.05,.08); },
  win(){ [67,71,74,79,83].forEach((m,i)=>bell(m,.06,i*.11,.6)); }, lose(){ [71,67,62].forEach((m,i)=>bell(m,.045,i*.15,.5)); } };

// ================= пауза и экраны =================
const pauseReasons=new Set(['menu']);
const paused=()=>pauseReasons.size>0;
const audioHeld=()=>pauseReasons.has('hidden')||pauseReasons.has('ad')||pauseReasons.has('platform')||blurred;
let running=false, gpActive=false;
function setPause(r,on){ on?pauseReasons.add(r):pauseReasons.delete(r); applyState(); }
function applyState(){
  if(A){ try{ if(audioHeld()){ if(A.state==='running') A.suspend(); } else if(A.state==='suspended') A.resume(); }catch(e){}
    if(MUS){ if(prog.mus&&!audioHeld()) MUS.start(); else MUS.stop(); } }
  const active=running&&!paused();
  if(active!==gpActive){ gpActive=active; try{ const gp=ysdk&&ysdk.features&&ysdk.features.GameplayAPI; if(gp) active?gp.start():gp.stop(); }catch(e){} }
}
document.addEventListener('visibilitychange',()=>{ setPause('hidden',document.hidden); if(document.hidden){ localWrite(); if(cloudDirty) pushCloud(); if(running&&!stack.length) pushScreen('ovPause'); } });
addEventListener('blur',()=>{ blurred=true; applyState(); }); addEventListener('focus',()=>{ blurred=false; applyState(); });
addEventListener('pagehide',()=>localWrite());
document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('selectstart',e=>e.preventDefault());
const stack=[];
function pushScreen(id){ const top=stack[stack.length-1]; if(top) $(top).classList.add('hide');
  stack.push(id); $(id).classList.remove('hide'); setPause('menu',true); if(id==='ovPause') sndLabels();
  hammerMode=false; $('hammerTip').classList.add('hide');
  const f=id==='ovDacha'?null:$(id).querySelector('.btn:not(.hide):not([disabled])'); if(f) f.focus({preventScroll:true}); }
function popScreen(){ const id=stack.pop(); if(id) $(id).classList.add('hide'); const top=stack[stack.length-1];
  if(top) $(top).classList.remove('hide'); else setPause('menu',false); }
function clearScreens(){ while(stack.length) $(stack.pop()).classList.add('hide'); setPause('menu',false); }
document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>{ popScreen();
  if(!stack.length&&!running){ toMenu(); return; }          // уровень не идёт (например, вышли с дачи после победы) — в меню
  if(stack[stack.length-1]==='ovMenu') fillMenu(); });
function fillMenu(){ $('bPlay').textContent=prog.level>1?T.cont:T.play; $('menuMeta').textContent=prog.level>1||prog.stars?T.meta(prog.level,prog.stars):''; }
function toMenu(){ clearScreens(); running=false; state='idle'; applyState(); fillMenu(); pushScreen('ovMenu'); }
$('bPause').onclick=e=>{ e.stopPropagation(); audio(); if(inputEnabled&&running&&!stack.length) pushScreen('ovPause'); };
$('bResume').onclick=()=>popScreen();
$('bSfx').onclick=()=>{ prog.sfx=!prog.sfx; save(true); audio(); setBus(); sndLabels(); SFX.swap(); };
$('bMus').onclick=()=>{ prog.mus=!prog.mus; save(true); audio(); setBus(); applyState(); sndLabels(); };
$('bSound').onclick=()=>{ const on=!(prog.sfx||prog.mus); prog.sfx=prog.mus=on; save(true); audio(); setBus(); applyState(); sndLabels(); };
$('bMenu').onclick=toMenu;
$('bPlay').onclick=()=>{ if(!inputEnabled) return; audio(); startLevel(prog.level); };
$('bLegal').onclick=()=>pushScreen('ovLegal');
$('bBoard').onclick=()=>{ audio(); if(!ysdk) return;
  if(PF==='yandex'){ openBoard(); return; }
  if(PF==='vk'&&ysdk.nativeBoard){ save(true); ysdk.nativeBoard(prog.level-1).catch(()=>toast(T.boardErr)); } };
addEventListener('keydown',e=>{ if(e.code==='Escape'||e.code==='KeyP'){ if(stack[stack.length-1]==='ovPause') popScreen(); else if(running&&!stack.length) pushScreen('ovPause'); } });

// ================= дача =================
const scene=$('scene'), sg=scene.getContext('2d'), hero=$('hero'), hg=hero.getContext('2d');
function sizeScene(){ const r=Math.min(2,devicePixelRatio||1); scene.width=720*r; scene.height=440*r; }
function drawScene(){ const r=scene.width/720; sg.setTransform(r,0,0,r,0,0); window.MJ_DACHA.draw(sg,new Set(prog.items),sceneT); }
function drawHero(){ const r=hero.width/720; hg.setTransform(r,0,0,r,0,0); window.MJ_DACHA.draw(hg,new Set(prog.items),sceneT); }
function openDacha(){ audio(); sizeScene(); fillDacha(); if(stack[stack.length-1]!=='ovDacha') pushScreen('ovDacha'); $('ovDacha').querySelector('.panel').scrollTop=0; drawScene(); }
function fillDacha(){
  $('dStars').textContent=prog.stars; const box=$('items'); box.innerHTML='';
  for(const it of ITEMS){ const own=prog.items.includes(it.id), b=document.createElement('button'); b.className='item'+(own?' own':prog.stars>=it.cost?' can':'');
    const e=document.createElement('span'); e.className='ie'; e.textContent=it.e; const n=document.createElement('span'); n.className='in'; n.textContent=it[LANG];
    const c=document.createElement('span'); c.className='ic'; c.textContent=own?T.own:`★ ${it.cost}`; b.append(e,n,c); b.disabled=own;
    b.onclick=()=>{ if(own) return; if(prog.stars<it.cost){ toast(T.need(it.cost-prog.stars)); SFX.no(); return; }
      prog.stars-=it.cost; prog.items.push(it.id); save(true); pushCloud(); SFX.win(); toast(prog.items.length===ITEMS.length?T.allDone:T.bought); fillDacha(); };
    box.appendChild(b); }
}
$('bDacha').onclick=openDacha;

// ================= реклама (только через SDK) =================
let adBusy=false;
function suspendAudio(){ try{ if(A&&A.state==='running') A.suspend(); }catch(e){} if(MUS) MUS.stop(); }
function pauseGameForAd(){ setPause('ad',true); suspendAudio(); }   // игра, ввод, звук и GameplayAPI стоят
function showInterstitial(then){
  if(!ysdk||adBusy){ then(); return; }
  adBusy=true; save(true);
  let done=false; const fin=()=>{ if(done) return; done=true; adBusy=false; setPause('ad',false); then(); };
  try{ ysdk.adv.showFullscreenAdv({callbacks:{ onOpen(){ pauseGameForAd(); }, onClose(){ fin(); }, onError(){ fin(); }, onOffline(){ fin(); } }}); }catch(e){ fin(); }
}
function showRewarded(onReward,onDone){
  if(!ysdk||adBusy){ if(!adBusy) toast(T.adNA); return; }
  adBusy=true; save(true);
  let rewarded=false, done=false;
  const fin=failed=>{ if(done) return; done=true; adBusy=false; setPause('ad',false); if(!rewarded&&failed) toast(T.adNA); if(onDone) onDone(rewarded); };
  try{ ysdk.adv.showRewardedVideo({callbacks:{ onOpen(){ pauseGameForAd(); },
    onRewarded(){ if(rewarded) return; rewarded=true; onReward(); },     // награда — только здесь и один раз
    onClose(){ fin(false); }, onError(){ fin(true); } }}); }catch(e){ fin(true); }
}

// ================= рейтинг (Яндекс) =================
const BOARD='levels';
async function submitBest(){ if(!ysdk||!player||PF!=='yandex') return; try{ if(!(await ysdk.isAvailableMethod('leaderboards.setScore'))) return; await ysdk.leaderboards.setScore(BOARD,prog.level-1); }catch(e){} }
const isAuth=()=>{ try{ return !!(player&&player.isAuthorized&&player.isAuthorized()); }catch(e){ return false; } };
async function openBoard(){
  pushScreen('ovBoard'); const list=$('boardList'), msg=$('boardMsg'); list.innerHTML=''; msg.textContent=T.boardLoading; $('bAuth').classList.toggle('hide',isAuth()||!ysdk.auth);
  try{ const res=await withTimeout(ysdk.leaderboards.getEntries(BOARD,{quantityTop:10,includeUser:true,quantityAround:2}),8000);
    const me=player&&player.getUniqueID?player.getUniqueID():null, es=(res&&res.entries)||[]; msg.textContent=es.length?'':T.boardEmpty;
    for(const e of es){ const li=document.createElement('li'); if(me&&e.player&&e.player.uniqueID===me) li.className='me';
      const a=document.createElement('span'); a.className='rk'; a.textContent=e.rank; const b=document.createElement('span'); b.className='nm'; b.textContent=(e.player&&e.player.publicName)||T.anon;
      const c=document.createElement('span'); c.className='sc'; c.textContent=T.lvls(e.score); li.append(a,b,c); list.appendChild(li); }
    if(!isAuth()) msg.textContent=(msg.textContent?msg.textContent+' ':'')+T.boardGuest;
  }catch(e){ msg.textContent=T.boardErr; } }
$('bAuth').onclick=async()=>{ if(!ysdk||!ysdk.auth) return; try{ await ysdk.auth.openAuthDialog(); player=await withTimeout(ysdk.getPlayer(),5000);
  const m=mergeSaves(prog,await loadCloud()); if(m) prog=m; save(true); await submitBest(); popScreen(); openBoard(); }catch(e){} };

// ================= запуск =================
function applyLang(){
  document.documentElement.lang=LANG;
  document.querySelectorAll('[data-t]').forEach(el=>{ const v=T[el.dataset.t]; if(typeof v==='string') el.textContent=v; });
  $('title').innerHTML=T.title; $('legalText').innerHTML=T.legal; document.title=T.title.replace('<br>',' ');
  $('bPause').setAttribute('aria-label',T.pause);
  if(PF==='ok') $('bBoard').classList.add('hide');
}
async function boot(){
  const t0=STR[resolveLang(navigator.language)]; $('bootMsg').textContent=t0.boot; $('bRetry').classList.add('hide');
  try{
    ysdk=await window.YaGames.init();
    LANG=resolveLang(ysdk.environment.i18n.lang); T=STR[LANG]; applyLang();
    try{ storage=await withTimeout(ysdk.getStorage(),3000); }catch(e){ storage=null; }
    const local=localRead();
    try{ player=await withTimeout(ysdk.getPlayer(),5000); }catch(e){ player=null; }
    const m=mergeSaves(local,await loadCloud()); if(m) prog=m; localWrite();
    try{ ysdk.on('game_api_pause',()=>setPause('platform',true)); ysdk.on('game_api_resume',()=>setPause('platform',false)); }catch(e){}
    try{ await withTimeout(document.fonts?document.fonts.ready:Promise.resolve(),3000); }catch(e){}
    buildLevel(prog.level);
    updHud(); sndLabels();
    $('ovBoot').classList.add('hide'); fillMenu(); pushScreen('ovMenu');
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    if(!readySent){ try{ ysdk.features.LoadingAPI.ready(); }catch(e){} readySent=true; }
    inputEnabled=true;
  }catch(e){ const t=STR[resolveLang(navigator.language)]; $('bootMsg').textContent=t.bootErr; $('bRetry').textContent=t.retry; $('bRetry').classList.remove('hide'); }
}
$('bRetry').onclick=boot;
layout(); requestAnimationFrame(frame); boot();

// ================= тест-хуки и симуляция баланса =================
if(DEV){
  // синхронная симуляция уровня «жадным» ботом — для подбора баланса
  function simLevel(n){ buildLevel(n); let guard=0;
    while(moves>0&&!goalsDone()&&guard++<200){
      let best=null,bs=-1; for(let r=0;r<N;r++) for(let c=0;c<N;c++) for(const [dr,dc] of [[0,1],[1,0]]){ const r2=r+dr,c2=c+dc; if(r2>=N||c2>=N) continue;
        const a=grid[r][c], b=grid[r2][c2]; if(!a||!b||isWeed(a)||isWeed(b)) continue; grid[r][c]=b; grid[r2][c2]=a;
        const m=findMatches([r,c],[r2,c2]); let s=m.clear.size+m.make.length*3+((a.sp&&b.sp)||a.sp==='cb'||b.sp==='cb'?8:0);
        for(const k of m.clear){ const [rr,cc]=k.split(',').map(Number); const p=grid[rr][cc]; if(p&&goals[p.k]>0) s+=2; if(mud[rr][cc]&&goals.mud>0) s+=3;
          for(const [x,y] of [[1,0],[-1,0],[0,1],[0,-1]]) if(isWeed(at(rr+x,cc+y))&&goals.weed>0) s+=3; }
        grid[r][c]=a; grid[r2][c2]=b; if((m.clear.size||(a.sp&&b.sp)||a.sp==='cb'||b.sp==='cb')&&s>bs){ bs=s; best=[[r,c],[r2,c2]]; } }
      if(!best){ reshuffle(); continue; }
      const [a,b]=best, pa=grid[a[0]][a[1]], pb=grid[b[0]][b[1]]; grid[a[0]][a[1]]=pb; grid[b[0]][b[1]]=pa; moves--; combo=0;
      if(pa.sp==='cb'||pb.sp==='cb'||(pa.sp&&pb.sp)){ destroy(specialSet(a,b),[],true); gravity(); }
      let m=findMatches(a,b); while(m.clear.size){ destroy(m.clear,m.make,true); combo++; gravity(); m=findMatches(); }
    }
    dying.length=0; parts.length=0; fx.length=0; return goalsDone(); }
  window.__m3={ get grid(){return grid}, get mud(){return mud}, get state(){return state}, findMove, trySwap, get moves(){return moves}, set moves(v){moves=v}, get goals(){return goals},
    startLevel, buildLevel, cellCenter:(r,c)=>[BX+(c+.5)*CS,BY+(r+.5)*CS], findMatches, get prog(){return prog}, get paused(){return [...pauseReasons]},
    get running(){return running}, get music(){return MUS&&MUS.playing}, simLevel, levels:LEVELS.length,
    place:(r,c,k,sp)=>{ const p=mk(k,sp); p.x=c; p.y=r; grid[r][c]=p; } };
}
})();
