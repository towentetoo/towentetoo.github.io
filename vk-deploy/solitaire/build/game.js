/* Пасьянсы: Косынка и Паук — T&C STUDIO. HTML5 для Яндекс Игр / VK / OK (платформа — через YaGames-совместимый слой). */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const DEV=!!window.__SOL_DEV__||/[?&]dev\b/.test(location.search);
const PF=window.__TC_PLATFORM||'yandex';
const CARDS=window.SOL_CARDS;

// ================= тексты =================
const NM={yandex:{ru:'Яндекс Игры',en:'Yandex Games'},vk:{ru:'ВКонтакте',en:'VK'},ok:{ru:'Одноклассники',en:'OK'}}[PF];
const legal=L=>L==='ru'?`<h3>Политика конфиденциальности</h3>
<p>Игра «Пасьянсы: Косынка и Паук» не собирает и не передаёт разработчику персональные данные игроков.</p>
<p>Прогресс (статистика, звёзды, темы, сохранённая партия и настройки звука) хранится на устройстве игрока и в хранилище платформы ${NM.ru}, привязанном к аккаунту, чтобы он не терялся и был доступен на других устройствах.</p>
${PF==='yandex'?'<p>Если игрок вошёл через Яндекс ID, в рейтинге показываются его публичное имя, аватар и результат — по правилам платформы Яндекс Игры.</p>':PF==='vk'?'<p>Таблица рекордов показывается средствами ВКонтакте по правилам платформы.</p>':''}
<p>Реклама показывается средствами платформы ${NM.ru}. Обработка данных при показе рекламы регулируется политикой конфиденциальности платформы.</p>
<p>Удалить локальный прогресс можно, очистив данные сайта в настройках браузера.</p>
<h3>Лицензионное соглашение</h3>
<p>Игра предоставляется бесплатно для личного некоммерческого использования на платформе ${NM.ru} на условиях «как есть».</p>
<p>Все права на игру, её графику, музыку и программный код принадлежат разработчику (T&amp;C STUDIO). Запрещено копировать, изменять, распространять игру или её части без разрешения разработчика.</p>
<p>Внутриигровые звёзды не имеют денежной ценности и не могут быть обменяны на деньги, товары или услуги.</p>
<p>Разработчик не несёт ответственности за перебои в работе платформы и за потерю данных по причинам, не зависящим от разработчика.</p>
<p>Начиная игру, вы соглашаетесь с этими условиями.</p>`:`<h3>Privacy policy</h3>
<p>Solitaire Collection does not collect or send players’ personal data to the developer.</p>
<p>Progress (statistics, stars, themes, the saved game and sound settings) is stored on the player’s device and in ${NM.en} platform storage linked to the account, so it is kept and available on other devices.</p>
${PF==='yandex'?'<p>If the player signs in with Yandex ID, the leaderboard shows their public name, avatar and result according to Yandex Games rules.</p>':PF==='vk'?'<p>The leaderboard is provided by VK according to the platform rules.</p>':''}
<p>Ads are shown by the ${NM.en} platform. Data processing for ads is governed by the platform’s privacy policy.</p>
<p>You can delete local progress by clearing site data in your browser settings.</p>
<h3>License agreement</h3>
<p>The game is provided free of charge for personal non-commercial use on the ${NM.en} platform “as is”.</p>
<p>All rights to the game, its graphics, music and code belong to the developer (T&amp;C STUDIO). Copying, modifying or distributing the game or its parts without permission is prohibited.</p>
<p>In-game stars have no monetary value and cannot be exchanged for money, goods or services.</p>
<p>The developer is not responsible for platform outages or data loss beyond the developer’s control.</p>
<p>By playing the game you agree to these terms.</p>`;
const STR={
 ru:{title:'Пасьянсы',sub:'Косынка и Паук',klon1:'Косынка · по 1',klon3:'Косынка · по 3',sp1:'Паук · 1 масть',sp2:'Паук · 2 масти',sp4:'Паук · 4 масти',
   cont:'Продолжить партию',daily:'📅 Расклад дня',dailyDone:'📅 Расклад дня ✓',stats:'📊 Статистика',themes:'🎨 Оформление',board:'🏆 Рейтинг',
   solvableNote:'Каждая раскладка Косынки по 1 — гарантированно решаемая',moves:'Ходы',time:'Время',undo:'↶ Отмена',hint:'💡',menu:'Меню',
   pause:'Пауза',resume:'Продолжить',newGame:'Новая партия',sfxOn:'🔊 Звуки',sfxOff:'🔈 Звуки выкл',musOn:'🎵 Музыка',musOff:'🎵 Музыка выкл',
   win:'Победа!',winText:(m,t)=>`Ходов: ${m} · Время: ${t}`,got:n=>`+${n} ★`,again:'Ещё партию',double:'Удвоить звёзды',toMenu:'В меню',
   collect:'Собрать карты',noHint:'На столе полезных ходов нет — открой карту из колоды',noUseful:'Полезных ходов не видно — попробуй отменить пару ходов',noMoves:'Ходов больше нет — начни новую партию (пауза → Новая партия)',
   hintT:'Подсказки закончились',hintX:'Посмотри рекламу и получи 3 подсказки. А ещё за каждую победу — +1 подсказка.',hintB:'Смотреть: +3 подсказки',cancel:'Отмена',
   emptyCol:'Сначала заполни пустые столбцы',dealing:'Тасую колоду…',
   statsT:'Статистика',played:'Сыграно',wonN:'Побед',best:'Лучшее время',streak:'Дней подряд',
   themesT:'Оформление',felt:'Сукно',back:'Рубашка',own:'✓',need:n=>`Не хватает ${n} ★`,bought:'Готово!',use:'Выбрать',
   felts:['Зелёное','Синее','Бордовое','Дерево'],backs:['Бордовая','Синяя','Изумрудная','Гжель'],
   adNA:'Реклама сейчас недоступна, попробуй позже',backB:'Назад',
   boardLoading:'Загрузка рейтинга…',boardErr:'Рейтинг сейчас недоступен',boardEmpty:'Пока никого нет. Стань первым!',boardGuest:'Войди, чтобы попасть в рейтинг',
   login:PF==='yandex'?'Войти через Яндекс':'Войти',anon:'Игрок',winsN:n=>`${n} побед`,legalBtn:'Конфиденциальность и соглашение',
   boot:'Загрузка…',bootErr:'Не удалось загрузить игру. Проверь интернет и попробуй ещё раз.',retry:'Повторить',
   how:'Тапни по карте — она сама встанет на лучшее место. Или перетаскивай. За победы — звёзды на новое оформление.'},
 en:{title:'Solitaire',sub:'Klondike & Spider',klon1:'Klondike · draw 1',klon3:'Klondike · draw 3',sp1:'Spider · 1 suit',sp2:'Spider · 2 suits',sp4:'Spider · 4 suits',
   cont:'Continue game',daily:'📅 Daily deal',dailyDone:'📅 Daily deal ✓',stats:'📊 Statistics',themes:'🎨 Themes',board:'🏆 Leaderboard',
   solvableNote:'Every Klondike draw-1 deal is guaranteed to be solvable',moves:'Moves',time:'Time',undo:'↶ Undo',hint:'💡',menu:'Menu',
   pause:'Pause',resume:'Resume',newGame:'New game',sfxOn:'🔊 Sounds',sfxOff:'🔈 Sounds off',musOn:'🎵 Music',musOff:'🎵 Music off',
   win:'You win!',winText:(m,t)=>`Moves: ${m} · Time: ${t}`,got:n=>`+${n} ★`,again:'Play again',double:'Double the stars',toMenu:'Menu',
   collect:'Collect cards',noHint:'No useful moves on the table — draw from the stock',noUseful:'No useful moves found — try undoing a few moves',noMoves:'No more moves — start a new game (pause → New game)',
   hintT:'Out of hints',hintX:'Watch an ad to get 3 hints. Every win also gives +1 hint.',hintB:'Watch: +3 hints',cancel:'Cancel',
   emptyCol:'Fill the empty columns first',dealing:'Shuffling…',
   statsT:'Statistics',played:'Played',wonN:'Won',best:'Best time',streak:'Day streak',
   themesT:'Themes',felt:'Table',back:'Card back',own:'✓',need:n=>`${n} more ★ needed`,bought:'Done!',use:'Use',
   felts:['Green','Blue','Burgundy','Wood'],backs:['Burgundy','Blue','Emerald','Gzhel'],
   adNA:'Ads are unavailable right now, try later',backB:'Back',
   boardLoading:'Loading leaderboard…',boardErr:'Leaderboard is unavailable right now',boardEmpty:'Nobody here yet. Be the first!',boardGuest:'Sign in to join the leaderboard',
   login:PF==='yandex'?'Sign in with Yandex':'Sign in',anon:'Player',winsN:n=>`${n} wins`,legalBtn:'Privacy and terms',
   boot:'Loading…',bootErr:'Could not load the game. Check your connection and try again.',retry:'Retry',
   how:'Tap a card and it moves to the best spot. Or drag it. Wins earn stars for new themes.'}
};
STR.ru.legal=legal('ru'); STR.en.legal=legal('en');
const RU_LANGS=new Set(['ru','be','kk','uk','uz']);
const resolveLang=l=>RU_LANGS.has(String(l||'').toLowerCase().slice(0,2))?'ru':'en';
if(DEV) window.__solResolveLang=resolveLang;
let LANG='ru', T=STR.ru;
const MODES=['klon1','klon3','sp1','sp2','sp4'];
const FELTS=[{c1:'#2a8456',c2:'#14492e',cost:0},{c1:'#2d6fa3',c2:'#173a5c',cost:6},{c1:'#9a2f3c',c2:'#4f1219',cost:8},{c1:'#a8743f',c2:'#5c3b1c',cost:12,wood:true}];
const BACKS=[{a:'#7a1f2b',b:'#e6c46a',cost:0},{a:'#1f4f8a',b:'#d6e4f5',cost:5},{a:'#1e6b4f',b:'#e6c46a',cost:7},{a:'#ffffff',b:'#2b5bb8',cost:12,gzhel:true}];

// ================= случайность (сид для расклада дня) =================
let seedRnd=Math.random;
const mulberry=a=>()=>{ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; };
function shuffle(a,rng){ for(let i=a.length-1;i>0;i--){ const j=(rng()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]]; } return a; }
const today=()=>{ const d=new Date(); return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate(); };

// ================= партия =================
// стопки: stock, waste, found[], tab[]; карта {s,r,up,id,x,y}
let mode='klon1', stock=[], waste=[], found=[], tab=[], moves=0, elapsed=0, won=false, history=[], usedUndo=false, isDaily=false, spDeals=0;
const isSpider=()=>mode.startsWith('sp');
const red=c=>c.s===1||c.s===2;
const all=()=>[...stock,...waste,...found.flat(),...tab.flat()];
function newGame(m,daily){
  mode=m; isDaily=!!daily; moves=0; elapsed=0; won=false; history=[]; usedUndo=false; dragging=null; press=null; hintShow=null;
  const rng=daily?mulberry(today()*7+13):Math.random;
  if(isSpider()){
    const suits=m==='sp1'?[0]:m==='sp2'?[0,1]:[0,1,2,3]; const deck=[]; let id=0;
    for(let k=0;k<8;k++) for(let r=0;r<13;r++) deck.push({s:suits[k%suits.length],r,up:false,id:id++,x:0,y:0});
    shuffle(deck,rng); tab=[...Array(10)].map(()=>[]); found=[];
    for(let i=0;i<54;i++) tab[i%10].push(deck.pop()); tab.forEach(t=>t[t.length-1].up=true); stock=deck; waste=[]; spDeals=5;
  } else {
    // Косынка по 1: перебираем раздачи, пока решатель не подтвердит решаемость
    let tries=0;
    for(;;){ const deck=[]; let id=0; for(let s=0;s<4;s++) for(let r=0;r<13;r++) deck.push({s,r,up:false,id:id++,x:0,y:0});
      shuffle(deck,rng); tab=[...Array(7)].map(()=>[]); for(let i=0;i<7;i++) for(let j=i;j<7;j++){ const c=deck.pop(); c.up=j===i; tab[j].push(c); }
      stock=deck; waste=[]; found=[[],[],[],[]]; tries++;
      if(m!=='klon1'||tries>=25) break;
      const ok=window.SOL_SOLVER.solvable(tab.map(t=>t.map(c=>({c:c.s*13+c.r,up:c.up}))),stock.map(c=>c.s*13+c.r),30000);
      if(ok===true) break; }
  }
  layout(); const p=pos('stock'); for(const c of all()){ c.x=p.x; c.y=p.y; }
  hud(); $('bAuto').classList.add('hide'); saveGame();
}
function snapshot(){ const m=c=>[c.id,c.s,c.r,c.up?1:0];
  history.push(JSON.stringify({stock:stock.map(m),waste:waste.map(m),found:found.map(f=>f.map(m)),tab:tab.map(t=>t.map(m)),moves,spDeals})); if(history.length>300) history.shift(); }
function restoreState(st,keepPos){ const cur=new Map(all().map(c=>[c.id,c]));
  const back=a=>{ let c=cur.get(a[0]); if(!c){ c={id:a[0],s:a[1],r:a[2],up:false,x:0,y:0}; } c.s=a[1]; c.r=a[2]; c.up=!!a[3]; return c; };
  stock=st.stock.map(back); waste=st.waste.map(back); found=st.found.map(f=>f.map(back)); tab=st.tab.map(t=>t.map(back)); moves=st.moves; spDeals=st.spDeals||0; }
function undo(){ if(!history.length||won||!canPlay()) return; restoreState(JSON.parse(history.pop())); usedUndo=true; hud(); afterMove(true); }

// ================= правила =================
const kCanFound=(c,f)=>f.length?(f[f.length-1].s===c.s&&f[f.length-1].r===c.r-1):c.r===0;
const kCanTab=(c,t)=>t.length?(t[t.length-1].up&&red(t[t.length-1])!==red(c)&&t[t.length-1].r===c.r+1):c.r===12;
const sCanTab=(c,t)=>t.length?(t[t.length-1].up&&t[t.length-1].r===c.r+1):true;
function flipTops(){ for(const t of tab) if(t.length&&!t[t.length-1].up) t[t.length-1].up=true; }
function pileOf(c){
  let i=waste.indexOf(c); if(i>=0) return {k:'waste',arr:waste,i};
  i=stock.indexOf(c); if(i>=0) return {k:'stock',arr:stock,i};
  for(let f=0;f<found.length;f++){ i=found[f].indexOf(c); if(i>=0) return {k:'found',n:f,arr:found[f],i}; }
  for(let t=0;t<tab.length;t++){ i=tab[t].indexOf(c); if(i>=0) return {k:'tab',n:t,arr:tab[t],i}; }
  return null; }
function movable(c){ const p=pileOf(c); if(!p) return false;
  if(p.k==='waste') return p.i===p.arr.length-1;
  if(p.k==='found') return !isSpider()&&p.i===p.arr.length-1;
  if(p.k!=='tab'||!c.up) return false;
  for(let i=p.i;i<p.arr.length-1;i++){ const a=p.arr[i], b=p.arr[i+1];
    if(isSpider()?!(a.s===b.s&&a.r===b.r+1):!(red(a)!==red(b)&&a.r===b.r+1)) return false; }
  return true; }
function canDrop(cards,dst,dk){ const c=cards[0];
  if(dk==='found') return !isSpider()&&cards.length===1&&kCanFound(c,dst);
  return isSpider()?sCanTab(c,dst):kCanTab(c,dst); }
function moveCards(src,idx,dst){ snapshot(); const cards=src.arr.splice(idx); dst.push(...cards); moves++; flipTops(); SFX.place(); afterMove(); }
function stockTap(){
  if(!canPlay()) return;
  if(isSpider()){
    if(!stock.length){ SFX.no(); return; }
    if(tab.some(t=>!t.length)){ toast(T.emptyCol); SFX.no(); return; }
    snapshot(); for(const t of tab){ const c=stock.pop(); c.up=true; t.push(c); } spDeals--; moves++; SFX.shuffle(); afterMove(); return;
  }
  snapshot();
  if(stock.length){ const n=mode==='klon3'?3:1; for(let i=0;i<n&&stock.length;i++){ const c=stock.pop(); c.up=true; waste.push(c); } SFX.flip(); }
  else if(waste.length){ stock=waste.reverse().map(c=>(c.up=false,c)); waste=[]; SFX.shuffle(); }
  else { history.pop(); return; }
  moves++; afterMove(); }
// лучший ход для карты: в дом, на продолжение масти (паук), на карту, в пустой столбец
function bestTarget(c){
  const p=pileOf(c); if(!p||!movable(c)) return null; const cards=p.arr.slice(p.i);
  if(!isSpider()&&cards.length===1) for(let f=0;f<4;f++) if(kCanFound(c,found[f])) return {dst:found[f],dk:'found'};
  let best=null, score=-1;
  tab.forEach((t,n)=>{ if(p.k==='tab'&&p.n===n) return; if(!canDrop(cards,t,'tab')) return;
    let s=t.length?2:1; if(isSpider()&&t.length&&t[t.length-1].s===c.s) s=3;
    if(!t.length&&p.k==='tab'&&p.i===0) s=-1;             // бессмысленный перенос короля/стопки в пустой
    if(s>score){ score=s; best={dst:t,dk:'tab'}; } });
  return score>=0?best:null; }
function autoMove(c){ if(hintShow&&!hintShow.stock&&hintShow.c===c&&canDrop(pileOf(c).arr.slice(pileOf(c).i),hintShow.dst,found.includes(hintShow.dst)?'found':'tab')){ const p=pileOf(c), d=hintShow.dst; hintShow=null; moveCards(p,p.i,d); return true; }
  const b=bestTarget(c); if(!b) return false; const p=pileOf(c); moveCards(p,p.i,b.dst); return true; }
function afterMove(silent){
  if(isSpider()){ // собранная масть K..A уходит в дом
    for(const t of tab){ if(t.length<13) continue; const run=t.slice(-13); if(run[0].r!==12||!run[0].up) continue;
      let ok=true; for(let i=0;i<12;i++) if(!(run[i].s===run[i+1].s&&run[i].r===run[i+1].r+1&&run[i+1].up)){ ok=false; break; }
      if(ok){ found.push(t.splice(t.length-13)); flipTops(); SFX.chord(); } } }
  hud(); saveGame();
  const done=isSpider()?found.length===8:found.every(f=>f.length===13);
  if(done&&!won){ won=true; running=false; $('bAuto').classList.add('hide'); applyState(); setTimeout(onWin,500); return; }
  const canAuto=!isSpider()&&!stock.length&&!waste.length&&tab.every(t=>t.every(c=>c.up))&&!won;
  $('bAuto').classList.toggle('hide',!canAuto);
}
function autoCollect(){ $('bAuto').classList.add('hide'); snapshot();
  const step=()=>{ for(const t of tab){ const c=t[t.length-1]; if(!c) continue; for(let f=0;f<4;f++) if(kCanFound(c,found[f])){ found[f].push(t.pop()); moves++; SFX.place(); hud(); setTimeout(step,80); return; } }
    afterMove(); }; step(); }
// подсказка: только полезные ходы (без «пинг-понга» стопок между одинаковыми картами)
let hintShow=null;
const topOf=a=>a[a.length-1];
function firstUp(t){ for(let i=0;i<t.length;i++) if(t[i].up) return i; return -1; }
function hintKlondike(){
  // 1) в дом — с колонок и из отбоя
  for(const c of [...tab.map(topOf),topOf(waste)]) if(c&&c.up) for(let f=0;f<4;f++) if(kCanFound(c,found[f])) return {c,dst:found[f]};
  const kingWaiting=tab.some(t=>{ const i=firstUp(t); return i>0&&t[i].r===12; })||(topOf(waste)&&topOf(waste).r===12);
  // 2) перенос всей открытой части: открывает закрытую карту или освобождает столбец под короля
  for(let n=0;n<7;n++){ const t=tab[n], i=firstUp(t); if(i<0) continue; const c=t[i]; if(!movable(c)) continue;
    if(i===0&&(c.r===12||!kingWaiting)) continue;
    for(let k=0;k<7;k++){ if(k===n||!tab[k].length) continue; if(kCanTab(c,tab[k])) return {c,dst:tab[k]}; }
    if(i>0&&c.r===12) for(let k=0;k<7;k++) if(!tab[k].length) return {c,dst:tab[k]}; }
  // 3) из отбоя на стол
  const w=topOf(waste); if(w) for(const t of tab){ if(!t.length&&w.r!==12) continue; if(kCanTab(w,t)) return {c:w,dst:t}; }
  // 4) переложить часть стопки, чтобы карта под ней ушла в дом
  for(let n=0;n<7;n++){ const t=tab[n], i=firstUp(t); if(i<0) continue;
    for(let j=i+1;j<t.length;j++){ const under=t[j-1]; if(!found.some(f=>kCanFound(under,f))) continue; const c=t[j]; if(!movable(c)) continue;
      for(let k=0;k<7;k++){ if(k===n||!tab[k].length) continue; if(kCanTab(c,tab[k])) return {c,dst:tab[k]}; } } }
  // 5) колода — если в ней вообще есть что сыграть
  if(stock.length||waste.length){ const any=[...stock,...waste].some(c=>found.some(f=>kCanFound(c,f))||tab.some(t=>t.length?kCanTab(c,t):c.r===12));
    if(any||stock.length&&mode==='klon3') return {stock:true}; }
  return null; }
function hintSpider(){
  let best=null, bs=0;
  tab.forEach((t,n)=>{ for(let j=0;j<t.length;j++){ const c=t[j]; if(!c.up||!movable(c)) continue; const par=t[j-1];
      const parSuited=par&&par.up&&par.s===c.s&&par.r===c.r+1, reveals=j>0&&!par.up, empties=j===0;
      tab.forEach((d,k)=>{ if(k===n) return; let sc=0;
        if(d.length){ if(!sCanTab(c,d)) return; const suited=topOf(d).s===c.s;
          if(suited&&!parSuited) sc=4+(reveals?2:0)+(empties?1:0)+j*.01;
          else if(reveals) sc=3; else if(empties&&!parSuited) sc=1; else if(!parSuited&&par&&par.up&&!(par.r===c.r+1)) sc=0; }
        else if(reveals) sc=1.5;
        if(sc>bs){ bs=sc; best={c,dst:d}; } }); } });
  if(best) return best;
  if(stock.length) return {stock:true};
  return null; }
function findHint(){ return isSpider()?hintSpider():hintKlondike(); }
function useHint(){
  if(!canPlay()) return;
  if(prog.hints<=0){ openOffer(); return; }
  const h=findHint();
  if(!h){ const legal=[...tab.flat(),topOf(waste)].some(c=>c&&c.up&&movable(c)&&bestTarget(c)); toast(legal?T.noUseful:T.noMoves); SFX.no(); return; }
  if(h.stock){ hintShow={stock:true,t:1.6}; toast(isSpider()&&tab.some(t=>!t.length)?T.emptyCol:T.noHint); return; }   // колоду подсвечиваем бесплатно
  prog.hints--; save(); hud(); hintShow={c:h.c,dst:h.dst,t:1.6}; SFX.flip(); }
$('bAuto').onclick=autoCollect;

// ================= раскладка =================
const cv=$('c'), ctx=cv.getContext('2d');
let W=0,H=0,DPR=1,CW=60,CH=84,GAP=8,TOP=60,LEFT=0;
const FAN_UP=.28, FAN_DN=.12;
function layout(){
  W=Math.max(1,innerWidth); H=Math.max(1,innerHeight); DPR=Math.min(devicePixelRatio||1,2.5);
  cv.width=W*DPR|0; cv.height=H*DPR|0; cv.style.width=W+'px'; cv.style.height=H+'px';
  const cols=isSpider()?10:7; TOP=Math.max(58,H*.08); GAP=Math.max(3,Math.min(14,W*.009));
  CW=Math.min((W-GAP*(cols-1)-8)/cols,(H-TOP-GAP*3)/(1.4*(isSpider()?5.2:4.2)),118); CH=CW*1.4;
  LEFT=(W-(CW*cols+GAP*(cols-1)))/2; cache={};
}
addEventListener('resize',layout); addEventListener('orientationchange',()=>setTimeout(layout,200));
const colX=i=>LEFT+i*(CW+GAP), tabY0=()=>TOP+CH+GAP*2.2;
function fan(t){ const pile=tab[t]; let up=CH*FAN_UP, dn=CH*FAN_DN; const avail=H-tabY0()-CH-GAP-(innerWidth<innerHeight?10:0);
  let need=0; for(let i=0;i<pile.length-1;i++) need+=pile[i].up?up:dn; if(need>avail&&need>0){ const k=avail/need; up*=k; dn*=k; } return {up,dn}; }
function pos(k,n,i){
  if(k==='stock') return isSpider()?{x:colX(9),y:TOP}:{x:colX(0),y:TOP};
  if(k==='waste') return {x:colX(1),y:TOP};
  if(k==='found') return isSpider()?{x:colX(0)+n*CW*.18,y:TOP}:{x:colX(3+n),y:TOP};
  const f=fan(n); let y=tabY0(); for(let j=0;j<i;j++) y+=tab[n][j].up?f.up:f.dn; return {x:colX(n),y}; }

// ================= ввод =================
let dragging=null, press=null;
const inRect=(x,y,rx,ry)=>x>=rx&&x<=rx+CW&&y>=ry&&y<=ry+CH;
function hitCard(x,y){
  for(let t=0;t<tab.length;t++) for(let i=tab[t].length-1;i>=0;i--){ const c=tab[t][i], h=i===tab[t].length-1?CH:Math.max(CH*.1,tab[t][i+1].y-c.y);
    if(x>=c.x&&x<=c.x+CW&&y>=c.y&&y<=c.y+h) return c; }
  const w=waste[waste.length-1]; if(w&&inRect(x,y,w.x,w.y)) return w;
  if(!isSpider()) for(let f=0;f<4;f++){ const c=found[f][found[f].length-1]; if(c&&inRect(x,y,c.x,c.y)) return c; }
  return null; }
cv.addEventListener('pointerdown',e=>{ audio(); if(!canPlay()) return; const x=e.clientX, y=e.clientY;
  const sp=pos('stock'); if(inRect(x,y,sp.x,sp.y)){ stockTap(); return; }
  const c=hitCard(x,y); if(!c) return;
  if(!movable(c)){ c.sh=.3; SFX.no(); return; }
  const p=pileOf(c); press={c,p,x,y,ox:x-c.x,oy:y-c.y,cards:p.arr.slice(p.i),moved:false}; });
cv.addEventListener('pointermove',e=>{ if(!press) return; const dx=e.clientX-press.x, dy=e.clientY-press.y;
  if(!press.moved&&Math.hypot(dx,dy)>7){ press.moved=true; dragging=press; }
  if(dragging){ const f=CH*FAN_UP*(press.p.k==='tab'?Math.min(1,fan(press.p.n).up/(CH*FAN_UP)):1); dragging.cards.forEach((c,k)=>{ c.x=e.clientX-press.ox; c.y=e.clientY-press.oy+k*f; c.drag=true; }); } });
const endPress=()=>{ if(!press) return; const pr=press; press=null;
  if(!pr.moved){ if(!autoMove(pr.c)){ pr.cards.forEach(c=>c.sh=.3); SFX.no(); } return; }
  dragging=null; pr.cards.forEach(c=>c.drag=false);
  const c=pr.c, cx=c.x+CW/2, cy=c.y+CH/2; let target=null;
  if(!isSpider()&&pr.cards.length===1) for(let f=0;f<4;f++){ const p=pos('found',f); if(Math.abs(cx-(p.x+CW/2))<CW*.7&&Math.abs(cy-(p.y+CH/2))<CH*.7&&kCanFound(c,found[f])) target=found[f]; }
  if(!target){ let bestD=1e9; tab.forEach((t,n)=>{ if(pr.p.k==='tab'&&pr.p.n===n) return; const last=t[t.length-1]; const p=last?{x:last.x,y:last.y}:pos('tab',n,0);
      const d=Math.abs(cx-(p.x+CW/2)); if(d<CW*.8&&cy>p.y-CH*.4&&cy<p.y+CH*1.5&&canDrop(pr.cards,t,'tab')&&d<bestD){ bestD=d; target=t; } }); }
  if(target) moveCards(pr.p,pr.p.i,target); else SFX.no(); };
cv.addEventListener('pointerup',endPress); cv.addEventListener('pointercancel',()=>{ if(press&&press.moved){ press.cards.forEach(c=>c.drag=false); } press=null; dragging=null; });

// ================= отрисовка =================
let cache={}, cacheKey='';
function img(key,draw){ const k=CW.toFixed(1)+'|'+DPR+'|'+prog.back+'|'+LANG; if(k!==cacheKey){ cache={}; cacheKey=k; }
  if(!cache[key]){ const c=document.createElement('canvas'); c.width=Math.ceil(CW*DPR); c.height=Math.ceil(CH*DPR); const g=c.getContext('2d'); g.scale(DPR,DPR); draw(g); cache[key]=c; } return cache[key]; }
const faceImg=c=>img('f'+c.s+'_'+c.r,g=>CARDS.face(g,CW,CH,c.s,c.r,LANG==='ru')), backImg=()=>img('b',g=>CARDS.back(g,CW,CH,BACKS[prog.back]));
function slot(x,y,label){ ctx.save(); ctx.strokeStyle='rgba(255,240,200,.35)'; ctx.lineWidth=2; ctx.setLineDash([6,5]);
  ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(x+1,y+1,CW-2,CH-2,CW*.09); else ctx.rect(x+1,y+1,CW-2,CH-2); ctx.stroke(); ctx.restore();
  if(label){ ctx.fillStyle='rgba(255,240,200,.4)'; ctx.font=`700 ${CW*.38}px PTSerif,serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(label,x+CW/2,y+CH/2); } }
function drawCard(c,hl){ const sx=c.sh>0?Math.sin(c.sh*50)*CW*.05:0;
  ctx.save(); ctx.shadowColor=c.drag?'rgba(0,0,0,.45)':'rgba(0,0,0,.25)'; ctx.shadowBlur=CW*(c.drag?.25:.06); ctx.shadowOffsetY=CW*(c.drag?.12:.03);
  ctx.drawImage(c.up?faceImg(c):backImg(),c.x+sx,c.y,CW,CH); ctx.restore();
  if(hl){ ctx.save(); ctx.strokeStyle=`rgba(255,215,90,${.6+.4*Math.sin(performance.now()/120)})`; ctx.lineWidth=Math.max(2,CW*.06); ctx.beginPath();
    if(ctx.roundRect) ctx.roundRect(c.x-1,c.y-1,CW+2,CH+2,CW*.1); else ctx.rect(c.x-1,c.y-1,CW+2,CH+2); ctx.stroke(); ctx.restore(); } }
function paintFelt(){ const F=FELTS[prog.felt];
  const g=ctx.createRadialGradient(W/2,H*.45,10,W/2,H*.5,Math.max(W,H)*.75); g.addColorStop(0,F.c1); g.addColorStop(1,F.c2); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  if(F.wood){ ctx.strokeStyle='rgba(60,30,10,.18)'; ctx.lineWidth=2; for(let y=0;y<H;y+=26){ ctx.beginPath(); ctx.moveTo(0,y); for(let x=0;x<=W;x+=40) ctx.lineTo(x,y+Math.sin((x+y)/90)*4); ctx.stroke(); } } }
let last=performance.now();
function frame(now){
  const dt=Math.min(.05,(now-last)/1000); last=now;
  if(!pauseReasons.has('hidden')){
    if(running&&!paused()&&!won&&moves>0){ elapsed+=dt; if(((now/500)|0)!==((now-dt*1000)/500|0)) hud(); }
    const targets=[]; stock.forEach(c=>targets.push([c,pos('stock')]));
    const show=mode==='klon3'?3:1; waste.forEach((c,i)=>{ const p=pos('waste'); const k=Math.max(0,i-(waste.length-show)); targets.push([c,{x:p.x+k*CW*.24,y:p.y}]); });
    found.forEach((f,n)=>f.forEach(c=>targets.push([c,pos('found',n)]))); tab.forEach((t,n)=>t.forEach((c,i)=>targets.push([c,pos('tab',n,i)])));
    for(const [c,p] of targets){ if(c.drag) continue; c.x+=(p.x-c.x)*Math.min(1,dt*16); c.y+=(p.y-c.y)*Math.min(1,dt*16); if(c.sh>0) c.sh=Math.max(0,c.sh-dt); }
    if(hintShow){ hintShow.t-=dt; if(hintShow.t<=0) hintShow=null; }
    ctx.setTransform(DPR,0,0,DPR,0,0); paintFelt();
    const sp=pos('stock'); slot(sp.x,sp.y,stock.length?null:(isSpider()?'':'↻'));
    if(!isSpider()){ slot(colX(1),TOP,null); for(let f=0;f<4;f++) slot(colX(3+f),TOP,LANG==='ru'?'Т':'A'); }
    else { slot(colX(0),TOP,null); }
    tab.forEach((t,n)=>slot(colX(n),tabY0(),isSpider()?'':'K'));
    const order=[...stock,...found.flat(),...waste,...tab.flat()].filter(c=>!c.drag);
    const hlSet=new Set(); if(hintShow&&!hintShow.stock){ const p=pileOf(hintShow.c); if(p) p.arr.slice(p.i).forEach(c=>hlSet.add(c)); const d=hintShow.dst[hintShow.dst.length-1]; if(d) hlSet.add(d); }
    if(hintShow&&hintShow.stock&&stock.length) hlSet.add(stock[stock.length-1]);
    for(const c of order) drawCard(c,hlSet.has(c));
    if(hintShow){ let p=null; if(hintShow.stock){ if(!stock.length) p=pos('stock'); } else if(!hintShow.dst.length){ const n=tab.indexOf(hintShow.dst), f=found.indexOf(hintShow.dst); p=n>=0?pos('tab',n,0):f>=0?pos('found',f):null; }
      if(p){ ctx.save(); ctx.strokeStyle=`rgba(255,215,90,${.6+.4*Math.sin(performance.now()/120)})`; ctx.lineWidth=Math.max(3,CW*.06); ctx.strokeRect(p.x,p.y,CW,CH); ctx.restore(); } }
    if(isSpider()&&stock.length){ ctx.fillStyle='rgba(255,240,200,.9)'; ctx.font=`700 ${CW*.3}px PTSerif,serif`; ctx.textAlign='center'; ctx.fillText('×'+spDeals,sp.x+CW/2,sp.y+CH+CW*.3); }
    if(dragging) for(const c of dragging.cards) drawCard(c);
  }
  if(stack[stack.length-1]==='ovMenu') drawMenuArt(now/1000);
  requestAnimationFrame(frame);
}
const fmtT=s=>{ s=Math.round(s); return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`; };
function hud(){ $('moves').textContent=moves; $('time').textContent=fmtT(elapsed); const h=$('nHint'); h.textContent=prog.hints>0?prog.hints:'+'; h.classList.toggle('ad',prog.hints<=0); }
let toastT=0; function toast(m){ const el=$('toast'); el.textContent=m; el.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove("show"),m.length>45?3200:1800); }

// ================= платформа и сохранения =================
let ysdk=null, player=null, readySent=false, inputEnabled=false, storage=null;
const withTimeout=(p,ms)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms))]);
const SAVE_KEY='sol_save_v1';
const STAT0=()=>({p:0,w:0,best:0});
let prog={stars:0,felt:0,back:0,owned:['f0','b0'],stats:Object.fromEntries(MODES.map(m=>[m,STAT0()])),daily:{date:0,streak:0},hints:3,wins:0,sfx:true,mus:true,game:null,ts:0};
function sanitize(p){ if(!p||typeof p!=='object') return null; const n=(v,d,mx)=>Number.isFinite(+v)?Math.max(0,Math.min(mx,Math.floor(+v))):d;
  const st={}; for(const m of MODES){ const s=(p.stats&&p.stats[m])||{}; st[m]={p:n(s.p,0,1e7),w:n(s.w,0,1e7),best:n(s.best,0,1e7)}; }
  return {stars:n(p.stars,0,1e7),felt:n(p.felt,0,FELTS.length-1),back:n(p.back,0,BACKS.length-1),owned:Array.isArray(p.owned)?p.owned.filter(x=>typeof x==='string').slice(0,20):['f0','b0'],
    stats:st,daily:{date:n(p.daily&&p.daily.date,0,1e9),streak:n(p.daily&&p.daily.streak,0,1e5)},hints:n(p.hints,3,999),wins:n(p.wins,0,1e7),sfx:p.sfx!==false,mus:p.mus!==false,
    game:p.game&&typeof p.game==='object'?p.game:null,ts:n(p.ts,0,9e15)}; }
function mergeSaves(a,b){ if(!a) return b; if(!b) return a; const base=b.ts>a.ts?{...b}:{...a};
  base.wins=Math.max(a.wins,b.wins); base.owned=[...new Set([...a.owned,...b.owned])]; return base; }
function localRead(){ try{ const s=(storage||localStorage).getItem(SAVE_KEY); return s?sanitize(JSON.parse(s)):null; }catch(e){ return null; } }
function localWrite(){ try{ (storage||localStorage).setItem(SAVE_KEY,JSON.stringify(prog)); }catch(e){} }
let cloudTimer=0, cloudBusy=false, cloudDirty=false, lastCloud=0;
function save(important){ prog.ts=Date.now(); localWrite(); cloudDirty=true; scheduleCloud(important); }
function scheduleCloud(important){ if(!player) return; const gap=important?3200:15000, wait=Math.max(0,gap-(Date.now()-lastCloud)); clearTimeout(cloudTimer); cloudTimer=setTimeout(pushCloud,wait); }
async function pushCloud(){ if(!player||!cloudDirty) return; if(cloudBusy||Date.now()-lastCloud<3000){ scheduleCloud(true); return; }
  cloudBusy=true; cloudDirty=false; lastCloud=Date.now(); try{ await player.setData({save:prog},true); }catch(e){ cloudDirty=true; } finally{ cloudBusy=false; } }
async function loadCloud(){ if(!player) return null; try{ const d=await withTimeout(player.getData(['save']),5000); return sanitize(d&&d.save); }catch(e){ return null; } }
function saveGame(){ if(won||!tab.length){ prog.game=null; save(); return; } const m=c=>[c.id,c.s,c.r,c.up?1:0];
  prog.game={mode,daily:isDaily,moves,elapsed:Math.round(elapsed),spDeals,stock:stock.map(m),waste:waste.map(m),found:found.map(f=>f.map(m)),tab:tab.map(t=>t.map(m))}; save(); }
function loadGame(){ const g=prog.game; if(!g||!MODES.includes(g.mode)) return false;
  try{ mode=g.mode; isDaily=!!g.daily; stock=[];waste=[];found=[];tab=[]; restoreState(g); elapsed=g.elapsed||0; won=false; history=[]; usedUndo=false; layout();
    const p=pos('stock'); for(const c of all()){ c.x=p.x; c.y=p.y; } hud(); afterMove(true); return true; }catch(e){ prog.game=null; return false; } }

// ================= победа и звёзды =================
let lastStars=0;
function onWin(){
  const st=prog.stats[mode]; st.w++; if(!st.best||elapsed<st.best) st.best=Math.round(elapsed); prog.wins++;
  let stars=1+(usedUndo?0:1)+(elapsed<(isSpider()?600:300)?1:0);
  if(isDaily&&prog.daily.date!==today()){ const y=new Date(); y.setDate(y.getDate()-1); const yd=y.getFullYear()*10000+(y.getMonth()+1)*100+y.getDate();
    prog.daily.streak=prog.daily.date===yd?prog.daily.streak+1:1; prog.daily.date=today(); stars+=3; }
  lastStars=stars; prog.stars+=stars; prog.hints++; prog.game=null; save(true); pushCloud(); submitBest();
  $('winText').textContent=T.winText(moves,fmtT(elapsed))+'  ·  '+T.got(stars)+'  ·  +1 💡'; hud(); $('bDouble').classList.remove('hide');
  SFX.win(); pushScreen('ovWin'); celebrate(); }
let confetti=[];
function celebrate(){ /* карты разлетаются с домов — классика */ const cs=all(); cs.forEach((c,i)=>{ c.vx=(Math.random()-.5)*600; c.vy=-200-Math.random()*400; }); }
$('bDouble').onclick=()=>showRewarded(()=>{ prog.stars+=lastStars; save(true); },ok=>{ if(ok){ $('bDouble').classList.add('hide'); $('winText').textContent+='  ·  '+T.got(lastStars); SFX.chord(); } });
$('bAgain').onclick=()=>{ const go=()=>startMode(mode); showInterstitial(go); };
$('bWinMenu').onclick=()=>{ showInterstitial(toMenu); };

// ================= режимы, меню, экраны =================
function startMode(m,daily){ clearScreens(); if(!daily){ prog.stats[m].p++; } else prog.stats[m].p++;
  $('dealing').classList.remove('hide'); setTimeout(()=>{ newGame(m,daily); $('dealing').classList.add('hide'); running=true; applyState(); save(); },30); }
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{ if(!inputEnabled) return; audio(); startMode(b.dataset.mode); });
$('bCont').onclick=()=>{ if(!inputEnabled) return; audio(); clearScreens(); if(!loadGame()) { toMenu(); return; } running=true; applyState(); };
$('bDaily').onclick=()=>{ if(!inputEnabled) return; audio(); if(prog.daily.date===today()){ toast(T.dailyDone); return; } startMode('klon1',true); };
$('bUndo').onclick=e=>{ e.stopPropagation(); audio(); undo(); };
$('bHint').onclick=e=>{ e.stopPropagation(); audio(); useHint(); };
$('bPause').onclick=e=>{ e.stopPropagation(); audio(); if(inputEnabled&&running&&!stack.length) pushScreen('ovPause'); };
$('bResume').onclick=()=>popScreen();
$('bNewGame').onclick=()=>{ saveGame(); showInterstitial(()=>startMode(mode)); };
$('bMenu').onclick=()=>{ saveGame(); toMenu(); };
function openOffer(){ pushScreen('ovOffer'); }
$('bOfferAd').onclick=()=>showRewarded(()=>{ prog.hints+=3; save(true); hud(); },ok=>{ if(ok){ popScreen(); SFX.chord(); } });
function fillMenu(){ const g=prog.game; $('bCont').classList.toggle('hide',!g); if(g) $('bCont').textContent=T.cont+' · '+T[g.mode];
  $('bDaily').textContent=prog.daily.date===today()?T.dailyDone:T.daily; $('menuStars').textContent='★ '+prog.stars; }
function toMenu(){ clearScreens(); running=false; applyState(); fillMenu(); pushScreen('ovMenu'); }
// статистика
$('bStats').onclick=()=>{ const box=$('statsBox'); box.innerHTML='';
  for(const m of MODES){ const s=prog.stats[m]; const row=document.createElement('div'); row.className='srow';
    row.innerHTML=`<b>${T[m]}</b><span>${T.played}: ${s.p}</span><span>${T.wonN}: ${s.w}${s.p?` (${Math.round(s.w/s.p*100)}%)`:''}</span><span>${T.best}: ${s.best?fmtT(s.best):'—'}</span>`; box.appendChild(row); }
  const d=document.createElement('div'); d.className='srow'; d.innerHTML=`<b>${T.daily}</b><span>${T.streak}: ${prog.daily.streak}</span>`; box.appendChild(d);
  pushScreen('ovStats'); };
// оформление
function themeCard(kind,i,item,name){ const id=(kind==='felt'?'f':'b')+i, own=prog.owned.includes(id), cur=kind==='felt'?prog.felt===i:prog.back===i;
  const b=document.createElement('button'); b.className='th'+(cur?' cur':own?' own':prog.stars>=item.cost?' can':'');
  const cvs=document.createElement('canvas'); cvs.width=120; cvs.height=kind==='felt'?80:150; const g=cvs.getContext('2d');
  if(kind==='felt'){ const gr=g.createRadialGradient(60,40,4,60,40,80); gr.addColorStop(0,item.c1); gr.addColorStop(1,item.c2); g.fillStyle=gr; g.fillRect(0,0,120,80); }
  else { g.fillStyle='#0003'; g.fillRect(0,0,120,150); g.translate(18,8); CARDS.back(g,84,134,item); }
  const n=document.createElement('span'); n.textContent=name; const c=document.createElement('span'); c.className='tc'; c.textContent=cur?'●':own?T.use:`★ ${item.cost}`;
  b.append(cvs,n,c);
  b.onclick=()=>{ if(!own){ if(prog.stars<item.cost){ toast(T.need(item.cost-prog.stars)); SFX.no(); return; } prog.stars-=item.cost; prog.owned.push(id); toast(T.bought); SFX.chord(); }
    if(kind==='felt') prog.felt=i; else prog.back=i; cache={}; save(true); fillThemes(); };
  return b; }
function fillThemes(){ $('thStars').textContent=prog.stars; const f=$('thFelt'), bk=$('thBack'); f.innerHTML=''; bk.innerHTML='';
  FELTS.forEach((x,i)=>f.appendChild(themeCard('felt',i,x,T.felts[i]))); BACKS.forEach((x,i)=>bk.appendChild(themeCard('back',i,x,T.backs[i]))); }
$('bThemes').onclick=()=>{ fillThemes(); pushScreen('ovThemes'); };
$('bLegal').onclick=()=>pushScreen('ovLegal');
$('bBoard').onclick=()=>{ audio(); if(!ysdk) return; if(PF==='yandex'){ openBoard(); return; }
  if(PF==='vk'&&ysdk.nativeBoard){ save(true); ysdk.nativeBoard(prog.wins).catch(()=>toast(T.boardErr)); } };
// анимированная заставка меню: веер карт
const art=$('menuArt'), ag=art.getContext('2d');
function drawMenuArt(t){ const w=art.width, h=art.height; ag.clearRect(0,0,w,h); const cw=w*.2, ch=cw*1.4;
  [[0,3],[1,0],[2,12],[3,11],[1,10]].forEach(([s,r],i)=>{ ag.save(); ag.translate(w/2,h*.95); ag.rotate((i-2)*.22+Math.sin(t*.8+i)*.02); ag.translate(-cw/2,-ch*1.05);
    ag.shadowColor='rgba(0,0,0,.35)'; ag.shadowBlur=10; CARDS.face(ag,cw,ch,s,r,LANG==='ru'); ag.restore(); }); }

// ================= пауза / экраны / звук =================
const pauseReasons=new Set(['menu']);
const paused=()=>pauseReasons.size>0;
const canPlay=()=>inputEnabled&&running&&!paused()&&!won;
let running=false, gpActive=false, blurred=false, A=null, BUS=null, MUS=null;
const audioHeld=()=>pauseReasons.has('hidden')||pauseReasons.has('ad')||pauseReasons.has('platform')||blurred;
function setPause(r,on){ on?pauseReasons.add(r):pauseReasons.delete(r); applyState(); }
function applyState(){
  if(A){ try{ if(audioHeld()){ if(A.state==='running') A.suspend(); } else if(A.state==='suspended') A.resume(); }catch(e){} if(MUS){ if(prog.mus&&!audioHeld()) MUS.start(); else MUS.stop(); } }
  const active=running&&!paused()&&!won;
  if(active!==gpActive){ gpActive=active; try{ const gp=ysdk&&ysdk.features&&ysdk.features.GameplayAPI; if(gp) active?gp.start():gp.stop(); }catch(e){} } }
document.addEventListener('visibilitychange',()=>{ setPause('hidden',document.hidden); if(document.hidden){ saveGame(); localWrite(); if(cloudDirty) pushCloud(); if(running&&!stack.length) pushScreen('ovPause'); } });
addEventListener('blur',()=>{ blurred=true; applyState(); }); addEventListener('focus',()=>{ blurred=false; applyState(); });
addEventListener('pagehide',()=>{ saveGame(); localWrite(); });
document.addEventListener('contextmenu',e=>e.preventDefault()); document.addEventListener('selectstart',e=>e.preventDefault());
const stack=[];
function pushScreen(id){ const top=stack[stack.length-1]; if(top) $(top).classList.add('hide'); stack.push(id); $(id).classList.remove('hide'); setPause('menu',true); if(id==='ovPause') sndLabels();
  const f=$(id).querySelector('.btn:not(.hide):not([disabled])'); if(f) f.focus({preventScroll:true}); }
function popScreen(){ const id=stack.pop(); if(id) $(id).classList.add('hide'); const top=stack[stack.length-1]; if(top) $(top).classList.remove('hide'); else setPause('menu',false); }
function clearScreens(){ while(stack.length) $(stack.pop()).classList.add('hide'); setPause('menu',false); }
document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>{ popScreen(); if(!stack.length&&!running){ toMenu(); return; } if(stack[stack.length-1]==='ovMenu') fillMenu(); });
function audio(){ if(A) return A; try{ A=new (window.AudioContext||window.webkitAudioContext)(); const m=A.createGain(); m.connect(A.destination);
  BUS={sfx:A.createGain(),mus:A.createGain()}; BUS.sfx.connect(m); BUS.mus.connect(m); MUS=window.MJ_MUSIC.build(A,BUS.mus); setBus(); applyState(); }catch(e){ A=null; } return A; }
function setBus(){ if(!BUS) return; BUS.sfx.gain.value=prog.sfx?1:0; BUS.mus.gain.value=prog.mus?.8:0; }
function sndLabels(){ $('bSfx').textContent=prog.sfx?T.sfxOn:T.sfxOff; $('bMus').textContent=prog.mus?T.musOn:T.musOff; const q=$('bSound'); q.textContent=(prog.sfx||prog.mus)?'🔊':'🔇'; q.setAttribute('aria-label',(prog.sfx||prog.mus)?T.sfxOn:T.sfxOff); }
$('bSfx').onclick=()=>{ prog.sfx=!prog.sfx; save(true); audio(); setBus(); sndLabels(); SFX.place(); };
$('bMus').onclick=()=>{ prog.mus=!prog.mus; save(true); audio(); setBus(); applyState(); sndLabels(); };
$('bSound').onclick=()=>{ const on=!(prog.sfx||prog.mus); prog.sfx=prog.mus=on; save(true); audio(); setBus(); applyState(); sndLabels(); };
function noise(d,v,f){ if(!A||A.state!=='running') return; const n=A.createBuffer(1,A.sampleRate*d|0,A.sampleRate), x=n.getChannelData(0); for(let i=0;i<x.length;i++) x[i]=(Math.random()*2-1)*Math.pow(1-i/x.length,2);
  const s=A.createBufferSource(), b=A.createBiquadFilter(), gn=A.createGain(); s.buffer=n; b.type='bandpass'; b.frequency.value=f; b.Q.value=.9; gn.gain.value=v; s.connect(b); b.connect(gn); gn.connect(BUS.sfx); s.start(); }
function tone(f,d,v,w=0){ if(!A||A.state!=='running') return; const t=A.currentTime+w, o=A.createOscillator(), gn=A.createGain(); o.frequency.value=f; gn.gain.setValueAtTime(.0001,t); gn.gain.exponentialRampToValueAtTime(v,t+.01); gn.gain.exponentialRampToValueAtTime(.0001,t+d); o.connect(gn); gn.connect(BUS.sfx); o.start(t); o.stop(t+d+.02); }
const mf=m=>440*Math.pow(2,(m-69)/12);
const SFX={ place(){ noise(.07,.35,2200); }, flip(){ noise(.09,.28,3600); }, shuffle(){ for(let i=0;i<7;i++) setTimeout(()=>noise(.05,.2,3000),i*35); }, no(){ tone(170,.13,.04); },
  chord(){ [62,66,69,74].forEach((m,i)=>tone(mf(m),.5,.05,i*.06)); }, win(){ [62,66,69,74,78].forEach((m,i)=>tone(mf(m),.7,.06,i*.13)); } };

// ================= реклама =================
let adBusy=false;
function suspendAudio(){ try{ if(A&&A.state==='running') A.suspend(); }catch(e){} if(MUS) MUS.stop(); }
function pauseGameForAd(){ setPause('ad',true); suspendAudio(); }
function showInterstitial(then){ if(!ysdk||adBusy){ then(); return; } adBusy=true; save(true);
  let done=false; const fin=()=>{ if(done) return; done=true; adBusy=false; setPause('ad',false); then(); };
  try{ ysdk.adv.showFullscreenAdv({callbacks:{ onOpen(){ pauseGameForAd(); }, onClose(){ fin(); }, onError(){ fin(); }, onOffline(){ fin(); } }}); }catch(e){ fin(); } }
function showRewarded(onReward,onDone){ if(!ysdk||adBusy){ if(!adBusy) toast(T.adNA); return; } adBusy=true; save(true);
  let rewarded=false, done=false; const fin=failed=>{ if(done) return; done=true; adBusy=false; setPause('ad',false); if(!rewarded&&failed) toast(T.adNA); if(onDone) onDone(rewarded); };
  try{ ysdk.adv.showRewardedVideo({callbacks:{ onOpen(){ pauseGameForAd(); }, onRewarded(){ if(rewarded) return; rewarded=true; onReward(); }, onClose(){ fin(false); }, onError(){ fin(true); } }}); }catch(e){ fin(true); } }

// ================= рейтинг (Яндекс) =================
const BOARD='wins';
async function submitBest(){ if(!ysdk||!player||PF!=='yandex') return; try{ if(!(await ysdk.isAvailableMethod('leaderboards.setScore'))) return; await ysdk.leaderboards.setScore(BOARD,prog.wins); }catch(e){} }
const isAuth=()=>{ try{ return !!(player&&player.isAuthorized&&player.isAuthorized()); }catch(e){ return false; } };
async function openBoard(){ pushScreen('ovBoard'); const list=$('boardList'), msg=$('boardMsg'); list.innerHTML=''; msg.textContent=T.boardLoading; $('bAuth').classList.toggle('hide',isAuth()||!ysdk.auth);
  try{ const res=await withTimeout(ysdk.leaderboards.getEntries(BOARD,{quantityTop:10,includeUser:true,quantityAround:2}),8000);
    const me=player&&player.getUniqueID?player.getUniqueID():null, es=(res&&res.entries)||[]; msg.textContent=es.length?'':T.boardEmpty;
    for(const e of es){ const li=document.createElement('li'); if(me&&e.player&&e.player.uniqueID===me) li.className='me';
      const a=document.createElement('span'); a.className='rk'; a.textContent=e.rank; const b=document.createElement('span'); b.className='nm'; b.textContent=(e.player&&e.player.publicName)||T.anon;
      const c=document.createElement('span'); c.className='sc'; c.textContent=T.winsN(e.score); li.append(a,b,c); list.appendChild(li); }
    if(!isAuth()) msg.textContent=(msg.textContent?msg.textContent+' ':'')+T.boardGuest; }catch(e){ msg.textContent=T.boardErr; } }
$('bAuth').onclick=async()=>{ if(!ysdk||!ysdk.auth) return; try{ await ysdk.auth.openAuthDialog(); player=await withTimeout(ysdk.getPlayer(),5000);
  const m=mergeSaves(prog,await loadCloud()); if(m) prog=m; save(true); await submitBest(); popScreen(); openBoard(); }catch(e){} };

// ================= запуск =================
function applyLang(){ document.documentElement.lang=LANG;
  document.querySelectorAll('[data-t]').forEach(el=>{ const v=T[el.dataset.t]; if(typeof v==='string') el.textContent=v; });
  $('legalText').innerHTML=T.legal; document.title=T.title+' — '+T.sub; $('bPause').setAttribute('aria-label',T.pause);
  if(PF==='ok') $('bBoard').classList.add('hide'); }
async function boot(){
  const t0=STR[resolveLang(navigator.language)]; $('bootMsg').textContent=t0.boot; $('bRetry').classList.add('hide');
  try{
    ysdk=await window.YaGames.init();
    LANG=resolveLang(ysdk.environment.i18n.lang); T=STR[LANG]; applyLang();
    try{ storage=await withTimeout(ysdk.getStorage(),3000); }catch(e){ storage=null; }
    const local=localRead(); try{ player=await withTimeout(ysdk.getPlayer(),5000); }catch(e){ player=null; }
    const m=mergeSaves(local,await loadCloud()); if(m) prog=m; localWrite();
    try{ ysdk.on('game_api_pause',()=>setPause('platform',true)); ysdk.on('game_api_resume',()=>setPause('platform',false)); }catch(e){}
    try{ await withTimeout(document.fonts?document.fonts.ready:Promise.resolve(),3000); }catch(e){}
    layout(); hud(); sndLabels(); $('ovBoot').classList.add('hide'); fillMenu(); pushScreen('ovMenu');
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    if(!readySent){ try{ ysdk.features.LoadingAPI.ready(); }catch(e){} readySent=true; }
    inputEnabled=true;
  }catch(e){ const t=STR[resolveLang(navigator.language)]; $('bootMsg').textContent=t.bootErr; $('bRetry').textContent=t.retry; $('bRetry').classList.remove('hide'); }
}
$('bRetry').onclick=boot;
layout(); requestAnimationFrame(frame); boot();
if(DEV) window.__sol={ get tab(){return tab}, get found(){return found}, get stock(){return stock}, get waste(){return waste}, get mode(){return mode}, autoMove, autoMoveTo:(c,d)=>{ const p=pileOf(c); moveCards(p,p.i,d); }, setRun:()=>{ running=true; }, stockTap, undo, newGame, startMode, findHint,
  get moves(){return moves}, get won(){return won}, movable, get prog(){return prog}, get paused(){return [...pauseReasons]}, get running(){return running}, get music(){return MUS&&MUS.playing}, get spDeals(){return spDeals},
  pos:c=>({x:c.x,y:c.y,w:CW,h:CH}), stockPos:()=>pos('stock'),
  rig:()=>{ const cards=all(); for(const c of cards) c.up=true; stock=[]; waste=[]; tab=tab.map(()=>[]);
    if(isSpider()){ found=[]; const runs=[], pool=[...cards]; while(pool.length){ const s=pool[0].s, run=[]; for(let r=12;r>=0;r--){ const k=pool.findIndex(c=>c.s===s&&c.r===r); run.push(pool.splice(k,1)[0]); } runs.push(run); } found=runs.slice(0,7); tab[0]=runs[7].slice(0,12); tab[1]=[runs[7][12]]; }
    else { found=[[],[],[],[]]; const by=s=>cards.filter(c=>c.s===s).sort((a,b)=>a.r-b.r); [0,1,2,3].forEach(s=>{ found[s]=by(s).slice(0,12); tab[s]=[by(s)[12]]; }); }
    afterMove(); } };
})();
