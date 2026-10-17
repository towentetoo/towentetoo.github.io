/* Линии: Шарики — собери 5 в ряд. T&C STUDIO. HTML5 для Яндекс Игр / VK / OK (платформа — через YaGames-совместимый слой). */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const DEV=!!window.__LN_DEV__||/[?&]dev\b/.test(location.search);
const PF=window.__TC_PLATFORM||'yandex';

// ================= тексты =================
const NM={yandex:{ru:'Яндекс Игры',en:'Yandex Games'},vk:{ru:'ВКонтакте',en:'VK'},ok:{ru:'Одноклассники',en:'OK'}}[PF];
const legal=(L)=>L==='ru'?`<h3>Политика конфиденциальности</h3>
<p>Игра «Линии: Шарики» не собирает и не передаёт разработчику персональные данные игроков.</p>
<p>Прогресс (рекорд, набранные очки, незаконченная партия, отмены ходов, выбранное оформление и настройки звука) хранится на устройстве игрока и в хранилище платформы ${NM.ru}, привязанном к аккаунту, чтобы он не терялся и был доступен на других устройствах.</p>
${PF==='yandex'?'<p>Если игрок вошёл через Яндекс ID, в рейтинге показываются его публичное имя, аватар и результат — по правилам платформы Яндекс Игры.</p>':PF==='vk'?'<p>Таблица рекордов показывается средствами ВКонтакте по правилам платформы.</p>':''}
<p>Реклама показывается средствами платформы ${NM.ru}. Обработка данных при показе рекламы регулируется политикой конфиденциальности платформы.</p>
<p>Удалить локальный прогресс можно, очистив данные сайта в настройках браузера.</p>
<h3>Лицензионное соглашение</h3>
<p>Игра предоставляется бесплатно для личного некоммерческого использования на платформе ${NM.ru} на условиях «как есть».</p>
<p>Все права на игру, её графику, музыку и программный код принадлежат разработчику (T&amp;C STUDIO). Запрещено копировать, изменять, распространять игру или её части без разрешения разработчика.</p>
<p>Внутриигровые очки и отмены ходов не имеют денежной ценности и не могут быть обменяны на деньги, товары или услуги.</p>
<p>Разработчик не несёт ответственности за перебои в работе платформы и за потерю данных по причинам, не зависящим от разработчика.</p>
<p>Начиная игру, вы соглашаетесь с этими условиями.</p>`:`<h3>Privacy policy</h3>
<p>Lines: Color Balls does not collect or send players’ personal data to the developer.</p>
<p>Progress (best score, total points, the unfinished game, undos, the chosen theme and sound settings) is stored on the player’s device and in ${NM.en} platform storage linked to the account, so it is kept and available on other devices.</p>
${PF==='yandex'?'<p>If the player signs in with Yandex ID, the leaderboard shows their public name, avatar and result according to Yandex Games rules.</p>':PF==='vk'?'<p>The leaderboard is provided by VK according to the platform rules.</p>':''}
<p>Ads are shown by the ${NM.en} platform. Data processing for ads is governed by the platform’s privacy policy.</p>
<p>You can delete local progress by clearing site data in your browser settings.</p>
<h3>License agreement</h3>
<p>The game is provided free of charge for personal non-commercial use on the ${NM.en} platform “as is”.</p>
<p>All rights to the game, its graphics, music and code belong to the developer (T&amp;C STUDIO). Copying, modifying or distributing the game or its parts without permission is prohibited.</p>
<p>In-game points and undos have no monetary value and cannot be exchanged for money, goods or services.</p>
<p>The developer is not responsible for platform outages or data loss beyond the developer’s control.</p>
<p>By playing the game you agree to these terms.</p>`;
const STR={
 ru:{title:'Линии',sub:'цветные шарики',score:'Очки',best:'Рекорд',next:'Дальше',play:'Играть',cont:'Продолжить',newGame:'Новая игра',
   how:'Передвигай шарики и собирай 5 и больше одного цвета в линию — по горизонтали, вертикали или диагонали. После каждого хода без линии появляются 3 новых шарика.',
   themes:'🎨 Оформление',board:'🏆 Рейтинг',pause:'Пауза',resume:'Продолжить',menu:'В меню',
   sfxOn:'🔊 Звуки',sfxOff:'🔈 Звуки выкл',musOn:'🎵 Музыка',musOff:'🎵 Музыка выкл',
   over:'Поле заполнено',newBest:'🏆 Новый рекорд!',overText:(b,t)=>`Рекорд: ${b} · Всего очков: ${t}`,revive:'Убрать 15 шариков',
   undoT:'Отмены закончились',undoX:'Посмотри рекламу и получи 3 отмены хода. А ещё за каждые 300 очков в партии — +1 отмена.',undoB:'Смотреть: +3 отмены',cancel:'Отмена',
   noPath:'Туда не пройти',noUndo:'Отменять нечего',undoGift:'+1 отмена ↶',praise:['Отлично!','Супер!','Невероятно!'],
   adNA:'Реклама сейчас недоступна, попробуй позже',back:'Назад',
   themesMeta:t=>`Очков за все партии: ${t}`,thNeed:n=>`🔒 ${n} очков`,thChoose:'Выбрать',thCur:'✓ Выбрано',thNew:n=>`Открыто оформление «${n}»!`,
   boardLoading:'Загрузка рейтинга…',boardErr:'Рейтинг сейчас недоступен',boardEmpty:'Пока никого нет. Стань первым!',boardGuest:'Войди, чтобы попасть в рейтинг',
   login:PF==='yandex'?'Войти через Яндекс':'Войти',anon:'Игрок',legalBtn:'Конфиденциальность и соглашение',
   boot:'Загрузка…',bootErr:'Не удалось загрузить игру. Проверь интернет и попробуй ещё раз.',retry:'Повторить',meta:b=>`Рекорд: ${b}`},
 en:{title:'Lines',sub:'color balls',score:'Score',best:'Best',next:'Next',play:'Play',cont:'Continue',newGame:'New game',
   how:'Move the balls and line up 5 or more of one colour — horizontally, vertically or diagonally. After each move without a line, 3 new balls appear.',
   themes:'🎨 Themes',board:'🏆 Leaderboard',pause:'Pause',resume:'Resume',menu:'Menu',
   sfxOn:'🔊 Sounds',sfxOff:'🔈 Sounds off',musOn:'🎵 Music',musOff:'🎵 Music off',
   over:'The board is full',newBest:'🏆 New best!',overText:(b,t)=>`Best: ${b} · Total points: ${t}`,revive:'Remove 15 balls',
   undoT:'Out of undos',undoX:'Watch an ad to get 3 undos. Every 300 points in a game also give +1 undo.',undoB:'Watch: +3 undos',cancel:'Cancel',
   noPath:'No way there',noUndo:'Nothing to undo',undoGift:'+1 undo ↶',praise:['Great!','Super!','Amazing!'],
   adNA:'Ads are unavailable right now, try later',back:'Back',
   themesMeta:t=>`Points in all games: ${t}`,thNeed:n=>`🔒 ${n} points`,thChoose:'Choose',thCur:'✓ Chosen',thNew:n=>`New theme unlocked: ${n}!`,
   boardLoading:'Loading leaderboard…',boardErr:'Leaderboard is unavailable right now',boardEmpty:'Nobody here yet. Be the first!',boardGuest:'Sign in to join the leaderboard',
   login:PF==='yandex'?'Sign in with Yandex':'Sign in',anon:'Player',legalBtn:'Privacy and terms',
   boot:'Loading…',bootErr:'Could not load the game. Check your connection and try again.',retry:'Retry',meta:b=>`Best: ${b}`}
};
STR.ru.legal=legal('ru'); STR.en.legal=legal('en');
const RU_LANGS=new Set(['ru','be','kk','uk','uz']);
const resolveLang=l=>RU_LANGS.has(String(l||'').toLowerCase().slice(0,2))?'ru':'en';
if(DEV) window.__lnResolveLang=resolveLang;
let LANG='ru', T=STR.ru;

// ================= правила =================
const ART=window.LN_ART, THEMES=ART.THEMES;
const N=9, NC=7, START=5, SPAWN=3, LINE=5, GIFT_EVERY=300, REVIVE=15;
const rnd=k=>Math.random()*k|0;
const rc=i=>[Math.floor(i/N),i%N], idx=(r,c)=>r*N+c;
let grid=new Array(N*N).fill(-1), nextCols=[], nextPos=[], score=0, giftLvl=0, revived=false, undoSnap=null, sel=-1;
let state='idle';   // idle | move | over
const empties=()=>{ const e=[]; for(let i=0;i<N*N;i++) if(grid[i]<0) e.push(i); return e; };
const ballsCount=()=>grid.reduce((a,v)=>a+(v>=0),0);
function pts(n){ return n*2+(n-LINE)*(n-LINE)*2; }   // 5→10, 6→14, 7→22, 8→34, 9→50
// все линии ≥5 через клетку i
function linesAt(i){ const k=grid[i]; const out=new Set(); if(k<0) return out; const [r,c]=rc(i);
  for(const [dr,dc] of [[0,1],[1,0],[1,1],[1,-1]]){ const run=[i];
    for(const s of [1,-1]){ let rr=r+dr*s, cc=c+dc*s; while(rr>=0&&rr<N&&cc>=0&&cc<N&&grid[idx(rr,cc)]===k){ run.push(idx(rr,cc)); rr+=dr*s; cc+=dc*s; } }
    if(run.length>=LINE) run.forEach(x=>out.add(x)); }
  return out; }
// путь по пустым клеткам (4 направления), BFS. Возвращает массив клеток от a до b или null
function path(a,b){ if(a===b||grid[b]>=0) return null; const prev=new Int16Array(N*N).fill(-1), q=[a]; prev[a]=a;
  while(q.length){ const x=q.shift(); if(x===b) break; const [r,c]=rc(x);
    for(const [dr,dc] of [[0,1],[1,0],[0,-1],[-1,0]]){ const rr=r+dr, cc=c+dc; if(rr<0||rr>=N||cc<0||cc>=N) continue; const y=idx(rr,cc); if(prev[y]>=0||grid[y]>=0) continue; prev[y]=x; q.push(y); } }
  if(prev[b]<0) return null; const p=[b]; while(p[0]!==a) p.unshift(prev[p[0]]); return p; }
function pickNext(){ const e=empties(); nextCols=[]; nextPos=[];
  for(let i=0;i<SPAWN;i++){ nextCols.push(rnd(NC)); if(e.length){ nextPos.push(e.splice(rnd(e.length),1)[0]); } else nextPos.push(-1); } }
// выкладываем «следующие» шарики; если клетку заняли — в случайную свободную
function spawn(){ const born=[];
  for(let i=0;i<SPAWN;i++){ let p=nextPos[i]; if(p<0||grid[p]>=0){ const e=empties(); if(!e.length) break; p=e[rnd(e.length)]; }
    grid[p]=nextCols[i]; born.push(p); grow.set(p,0); }
  const clear=new Set(); for(const p of born) linesAt(p).forEach(x=>clear.add(x));
  if(clear.size) removeCells(clear,.18);
  pickNext(); }
function removeCells(set,delay=0){ const n=set.size; let gained=pts(n);
  for(const i of set){ dying.push({i,k:grid[i],t:-delay-.001}); grid[i]=-1; }
  score+=gained; SFX.line(n); if(n>=7) toast(T.praise[Math.min(2,n-7)]); popScore(gained,set);
  while(Math.floor(score/GIFT_EVERY)>giftLvl){ giftLvl++; prog.undo++; toast(T.undoGift); }
  return gained; }
function newGame(){ moving=null; grid.fill(-1); score=0; giftLvl=0; revived=false; undoSnap=null; sel=-1; dying.length=0; grow.clear(); parts.length=0; pops.length=0;
  nextCols=[]; nextPos=[]; for(let i=0;i<START;i++){ const e=empties(); const p=e[rnd(e.length)]; grid[p]=rnd(NC); grow.set(p,-i*.05); }
  pickNext(); state='idle'; prog.games++; saveGame(); }
function snapshot(){ return {g:grid.slice(),n:nextCols.slice(),np:nextPos.slice(),s:score,gl:giftLvl}; }
// ход: шарик a → пустая клетка b
function tryMove(a,b){
  if(!canPlay()||grid[a]<0||grid[b]>=0) return false;
  const p=path(a,b); if(!p){ shakeCell=a; shakeT=.3; toast(T.noPath); SFX.no(); return false; }
  audio(); undoSnap=snapshot(); const k=grid[a]; grid[a]=-1; sel=-1;
  moving={k,path:p,pos:0}; state='move'; SFX.move(); return true; }
function landed(){
  const {k,path:p}=moving, b=p[p.length-1]; moving=null; grid[b]=k; bump.set(b,0);
  const L=linesAt(b);
  if(L.size) removeCells(L); else spawn();
  if(!ballsCount()) spawn();   // поле очистилось — не оставляем игрока без шариков
  updHud(); saveGame();
  if(!empties().length){ gameOver(); return; }
  state='idle'; }
function undo(){
  if(!canPlay()) return; if(!undoSnap){ toast(T.noUndo); SFX.no(); return; }
  if(prog.undo<=0){ pushScreen('ovOffer'); return; }
  prog.undo--; const s=undoSnap; undoSnap=null; grid=s.g; nextCols=s.n; nextPos=s.np; score=s.s; sel=-1;   // giftLvl не откатываем — подарок за очки не выдаётся дважды
  dying.length=0; grow.clear();
  SFX.undo(); updHud(); saveGame(); }
function gameOver(){
  state='over'; running=false; applyState(); undoSnap=null;
  const isBest=score>prog.best; prog.total+=score; if(isBest) prog.best=score;
  const unlocked=THEMES.filter(t=>t.need>prog.total-score&&t.need<=prog.total);
  prog.game=null; save(true); pushCloud(); submitBest();
  $('overScore').textContent=score; $('newBest').classList.toggle('hide',!isBest||score===0);
  $('overText').textContent=T.overText(prog.best,prog.total); $('bRevive').classList.toggle('hide',revived);
  SFX.over(); setTimeout(()=>{ if(state!=='over') return; pushScreen('ovOver'); if(unlocked.length) setTimeout(()=>toast(T.thNew(unlocked[unlocked.length-1][LANG])),400); },700);
  updHud(); }
function revive(){ const balls=[]; for(let i=0;i<N*N;i++) if(grid[i]>=0) balls.push(i);
  for(let j=0;j<REVIVE&&balls.length;j++){ const i=balls.splice(rnd(balls.length),1)[0]; dying.push({i,k:grid[i],t:-j*.03-.001}); grid[i]=-1; }
  prog.total-=score; if(prog.total<0) prog.total=0;   // партия продолжается — очки засчитаются в конце
  revived=true; pickNext(); state='idle'; saveGame(); updHud(); }

// ================= ввод =================
const cv=$('c'), ctx=cv.getContext('2d');
let W=0,H=0,DPR=1,CS=40,BX=0,BY=0;
function layout(){
  W=Math.max(1,innerWidth); H=Math.max(1,innerHeight); DPR=Math.min(devicePixelRatio||1,2.5);
  cv.width=W*DPR|0; cv.height=H*DPR|0; cv.style.width=W+'px'; cv.style.height=H+'px';
  const land=W>H*1.15, big=W>=900&&H>=700; document.body.classList.toggle('big',big); const hb=$('hud').offsetHeight, top=hb?hb+14:(land?Math.max(70,H*.12):Math.max(86,H*.11)), pad=land?14:12, toolsH=land?0:(big?90:76), toolsW=land?(big?96:80):0;
  CS=Math.floor(Math.min((W-pad*2-toolsW*2)/N,(H-top-pad-toolsH-6)/N,72));
  BX=Math.round((W-CS*N)/2); BY=Math.round(top+(H-top-toolsH-CS*N)*(land?.5:.4));
  const tb=$('tools').offsetHeight||130, t=$('tools').style;
  if(land) Object.assign(t,{flexDirection:'column',left:(BX+CS*N+20)+'px',top:(BY+CS*N-tb)+'px',transform:''});
  else Object.assign(t,{flexDirection:'row',left:'50%',transform:'translateX(-50%)',top:(BY+CS*N+14)+'px'});
  sprites={}; }
addEventListener('resize',layout);
addEventListener('orientationchange',()=>setTimeout(layout,200));
const cellAt=(x,y)=>{ const c=Math.floor((x-BX)/CS), r=Math.floor((y-BY)/CS); return (r>=0&&r<N&&c>=0&&c<N)?idx(r,c):-1; };
let down=-1;
cv.addEventListener('pointerdown',e=>{ audio(); if(!canPlay()) return; const i=cellAt(e.clientX,e.clientY); down=i; if(i<0) return;
  if(grid[i]>=0){ if(sel!==i){ sel=i; selT=0; SFX.pick(); } }
  else if(sel>=0){ tryMove(sel,i); down=-1; } });
cv.addEventListener('pointerup',e=>{ if(down<0||!canPlay()){ down=-1; return; } const i=cellAt(e.clientX,e.clientY);
  if(i>=0&&i!==down&&grid[down]>=0&&grid[i]<0&&sel===down) tryMove(down,i);   // перетаскивание
  down=-1; });

// ================= отрисовка =================
let sprites={};
function sprite(k,scale=1,theme){ theme=theme||prog.theme; const key=theme+k+'|'+scale; if(sprites[key]) return sprites[key];
  const r=CS*.38*scale, sz=Math.ceil((r*2+4)*DPR), c=document.createElement('canvas'); c.width=c.height=sz; const g=c.getContext('2d');
  g.translate(sz/2,sz/2); g.scale(DPR,DPR); ART.ball(g,r,k,theme); return sprites[key]=c; }
function drawBallAt(x,y,k,s=1,a=1){ if(s<=0) return; const sp=sprite(k), w=sp.width/DPR*s; ctx.globalAlpha=a; ctx.drawImage(sp,x-w/2,y-w/2,w,w); ctx.globalAlpha=1; }
const theme=()=>THEMES.find(t=>t.id===prog.theme)||THEMES[0];
function rr(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
function paintBg(){ const th=theme(), g=ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,th.bg[0]); g.addColorStop(1,th.bg[1]); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(255,255,255,.05)'; const s=Math.max(28,Math.min(W,H)/12); for(let y=s/2;y<H;y+=s) for(let x=((y/s)%2?s:s/2);x<W;x+=s){ ctx.beginPath(); ctx.arc(x,y,s*.12,0,7); ctx.fill(); } }
function drawBoard(){ const th=theme(), fw=CS*.22, S=CS*N;
  ctx.fillStyle='rgba(0,0,0,.25)'; rr(BX-fw+3,BY-fw+7,S+fw*2,S+fw*2,fw*1.2); ctx.fill();
  rr(BX-fw,BY-fw,S+fw*2,S+fw*2,fw*1.2); ctx.fillStyle=th.frame; ctx.fill(); ctx.lineWidth=3; ctx.strokeStyle=th.ink; ctx.stroke();
  for(let r=0;r<N;r++) for(let c=0;c<N;c++){ const x=BX+c*CS, y=BY+r*CS, m=CS*.05;
    rr(x+m,y+m,CS-m*2,CS-m*2,CS*.18); ctx.fillStyle=(r+c)%2?th.cell2:th.cell; ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,.08)'; ctx.lineWidth=1.5; ctx.stroke(); } }
const dying=[], grow=new Map(), bump=new Map(), parts=[], pops=[];
let moving=null, selT=0, shakeCell=-1, shakeT=0;
const center=i=>{ const [r,c]=rc(i); return [BX+(c+.5)*CS,BY+(r+.5)*CS]; };
function popScore(n,set){ let sx=0,sy=0; for(const i of set){ const [x,y]=center(i); sx+=x; sy+=y; } pops.push({x:sx/set.size,y:sy/set.size,t:1,txt:'+'+n}); }
function burst(i,k){ if(parts.length>400) return; const [x,y]=center(i), col=ART.COLS[k][1];
  for(let j=0;j<9;j++){ const a=Math.random()*6.28, v=CS*(1.5+Math.random()*3); parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-CS*1.5,r:CS*(.04+Math.random()*.05),t:.45+Math.random()*.3,c:j%3?col:'#fff'}); } }
let last=performance.now(), heroT=0;
function frame(now){
  const dt=Math.min(.05,(now-last)/1000); last=now;
  const top=stack[stack.length-1];
  if(!pauseReasons.has('hidden')&&!pauseReasons.has('ad')){
    // логика анимаций
    if(moving&&!paused()){ moving.pos+=dt*24; if(moving.pos>=moving.path.length-1) landed(); }
    selT+=dt; shakeT=Math.max(0,shakeT-dt);
    for(const [i,t] of grow){ const nt=t+dt*5; if(nt>=1) grow.delete(i); else grow.set(i,nt); }
    for(const [i,t] of bump){ const nt=t+dt*6; if(nt>=1) bump.delete(i); else bump.set(i,nt); }
    for(let j=dying.length-1;j>=0;j--){ const d=dying[j]; const was=d.t; d.t+=dt*3.2; if(was<0&&d.t>=0) burst(d.i,d.k); if(d.t>=1) dying.splice(j,1); }
    // кадр
    ctx.setTransform(DPR,0,0,DPR,0,0); paintBg();
    if(boardVisible()){
      drawBoard();
      // где появятся следующие шарики
      if(state!=='over') nextPos.forEach((p,j)=>{ if(p>=0&&grid[p]<0&&!(moving&&moving.path[moving.path.length-1]===p)){ const [x,y]=center(p); drawBallAt(x,y,nextCols[j],.36,.85); } });
      if(sel>=0&&grid[sel]>=0){ const [x,y]=center(sel); ctx.fillStyle='rgba(255,210,63,.35)'; rr(x-CS*.45,y-CS*.45,CS*.9,CS*.9,CS*.2); ctx.fill(); }
      for(let i=0;i<N*N;i++){ if(grid[i]<0) continue; let [x,y]=center(i), s=1;
        if(grow.has(i)) s=Math.max(0,Math.min(1,grow.get(i)))*(1+.15*Math.sin(Math.max(0,grow.get(i))*3.14));
        if(bump.has(i)) s=1+.12*Math.sin(bump.get(i)*3.14);
        if(i===sel) y-=Math.abs(Math.sin(selT*7))*CS*.14;
        if(i===shakeCell&&shakeT>0) x+=Math.sin(shakeT*70)*CS*.06;
        ctx.fillStyle='rgba(0,0,0,.14)'; ctx.beginPath(); ctx.ellipse(center(i)[0],center(i)[1]+CS*.33,CS*.27*s,CS*.07*s,0,0,7); ctx.fill();
        drawBallAt(x,y,grid[i],s); }
      for(const d of dying){ const [x,y]=center(d.i); const t=Math.max(0,d.t); drawBallAt(x,y,d.k,1-t*t,1-t*.5); }
      if(moving){ const f=Math.min(moving.pos,moving.path.length-1), a=Math.floor(f), b=Math.min(a+1,moving.path.length-1), u=f-a;
        const [x1,y1]=center(moving.path[a]), [x2,y2]=center(moving.path[b]); drawBallAt(x1+(x2-x1)*u,y1+(y2-y1)*u,moving.k,1.05); }
      for(let j=parts.length-1;j>=0;j--){ const q=parts[j]; q.t-=dt; if(q.t<=0){ parts.splice(j,1); continue; }
        q.x+=q.vx*dt; q.y+=q.vy*dt; q.vy+=CS*10*dt; ctx.globalAlpha=Math.min(1,q.t*2); ctx.fillStyle=q.c; ctx.beginPath(); ctx.arc(q.x,q.y,q.r,0,7); ctx.fill(); ctx.globalAlpha=1; }
      ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.font=`800 ${Math.round(CS*.6)}px Rubik,sans-serif`;
      for(let j=pops.length-1;j>=0;j--){ const p=pops[j]; p.t-=dt*.9; if(p.t<=0){ pops.splice(j,1); continue; } const yy=p.y-(1-p.t)*CS*1.2;
        ctx.globalAlpha=Math.min(1,p.t*2); ctx.lineWidth=5; ctx.strokeStyle='#3a2c1e'; ctx.strokeText(p.txt,p.x,yy); ctx.fillStyle='#ffd23f'; ctx.fillText(p.txt,p.x,yy); ctx.globalAlpha=1; }
    }
  }
  if((top==='ovMenu'||top==='ovThemes')&&!pauseReasons.has('hidden')){ heroT+=dt; if(top==='ovMenu') drawHero(); }
  requestAnimationFrame(frame);
}
// заставка в меню: волна из семи шариков
const hero=$('hero'), hg=hero.getContext('2d');
function drawHero(){ const s=hero.width/600; hg.setTransform(1,0,0,1,0,0); hg.clearRect(0,0,hero.width,hero.height); hg.setTransform(s,0,0,s,0,0);
  for(let k=0;k<NC;k++){ const x=60+k*80, y=105+Math.sin(heroT*2.4-k*.7)*28;
    hg.fillStyle='rgba(0,0,0,.18)'; hg.beginPath(); hg.ellipse(x,178,26-Math.sin(heroT*2.4-k*.7)*4,6,0,0,7); hg.fill();
    hg.save(); hg.translate(x,y); ART.ball(hg,34,k,prog.theme); hg.restore(); } }

// ================= HUD =================
function updHud(){ $('score').textContent=score; $('best').textContent=Math.max(prog.best,score);
  const u=$('nUndo'); u.textContent=prog.undo>0?prog.undo:'+'; u.classList.toggle('ad',prog.undo<=0);
  const cs=$('nextBalls').querySelectorAll('canvas'); cs.forEach((c,j)=>{ const g=c.getContext('2d'); g.setTransform(1,0,0,1,0,0); g.clearRect(0,0,64,64);
    if(nextCols[j]==null||state==='over') return; g.translate(32,32); ART.ball(g,27,nextCols[j],prog.theme); }); }
let toastT=0; function toast(m){ const el=$('toast'); el.textContent=m; el.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('show'),1700); }

// ================= платформа и сохранения =================
let ysdk=null, player=null, readySent=false, inputEnabled=false, storage=null;
const withTimeout=(p,ms)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms))]);
const SAVE_KEY='ln_save_v1';
let prog={best:0,total:0,games:0,undo:3,theme:'classic',sfx:true,mus:true,game:null,ts:0};
function sanGame(g){ if(!g||typeof g!=='object'||typeof g.g!=='string'||g.g.length!==N*N||!/^[0-6.]+$/.test(g.g)) return null;
  const arr=(a,ok)=>Array.isArray(a)&&a.length===SPAWN&&a.every(ok);
  if(!arr(g.n,v=>Number.isInteger(v)&&v>=0&&v<NC)||!arr(g.np,v=>Number.isInteger(v)&&v>=-1&&v<N*N)) return null;
  if(!g.g.includes('.')) return null;
  return {g:g.g,n:g.n.slice(),np:g.np.slice(),s:Math.max(0,Math.min(1e7,Math.floor(+g.s)||0)),gl:Math.max(0,Math.floor(+g.gl)||0),rv:!!g.rv}; }
function sanitize(p){ if(!p||typeof p!=='object') return null; const n=(v,d,mx)=>Number.isFinite(+v)?Math.max(0,Math.min(mx,Math.floor(+v))):d;
  return {best:n(p.best,0,1e7),total:n(p.total,0,1e9),games:n(p.games,0,1e7),undo:n(p.undo,3,999),theme:THEMES.some(t=>t.id===p.theme)?p.theme:'classic',
    sfx:p.sfx!==false,mus:p.mus!==false,game:sanGame(p.game),ts:n(p.ts,0,9e15)}; }
function mergeSaves(a,b){ if(!a) return b; if(!b) return a; const base=b.ts>a.ts?{...b}:{...a};
  base.best=Math.max(a.best,b.best); base.total=Math.max(a.total,b.total); base.games=Math.max(a.games,b.games); return base; }
function localRead(){ try{ const s=(storage||localStorage).getItem(SAVE_KEY); return s?sanitize(JSON.parse(s)):null; }catch(e){ return null; } }
function localWrite(){ try{ (storage||localStorage).setItem(SAVE_KEY,JSON.stringify(prog)); }catch(e){} }
let cloudTimer=0, cloudBusy=false, cloudDirty=false, lastCloud=0;
function save(important){ prog.ts=Date.now(); localWrite(); cloudDirty=true; scheduleCloud(important); }
function saveGame(){ const s=moving&&undoSnap?undoSnap:{g:grid,n:nextCols,np:nextPos,s:score};   // во время хода сохраняем позицию до хода
  prog.game=state==='over'?null:{g:s.g.map(v=>v<0?'.':v).join(''),n:s.n.slice(),np:s.np.slice(),s:s.s,gl:giftLvl,rv:revived}; save(false); }
function loadGame(g){ moving=null; dying.length=0; grow.clear(); grid=g.g.split('').map(ch=>ch==='.'?-1:+ch); nextCols=g.n.slice(); nextPos=g.np.slice(); score=g.s; giftLvl=Math.max(g.gl,Math.floor(g.s/GIFT_EVERY)); revived=g.rv; undoSnap=null; sel=-1; state='idle'; }
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
function setBus(){ if(!BUS) return; BUS.sfx.gain.value=prog.sfx?1:0; BUS.mus.gain.value=prog.mus?0.75:0; }
function sndLabels(){ $('bSfx').textContent=prog.sfx?T.sfxOn:T.sfxOff; $('bMus').textContent=prog.mus?T.musOn:T.musOff;
  const q=$('bSound'); q.textContent=(prog.sfx||prog.mus)?'🔊':'🔇'; q.setAttribute('aria-label',(prog.sfx||prog.mus)?T.sfxOn:T.sfxOff); }
function tone(f,d,v,when=0,type='sine'){ if(!A||A.state!=='running') return; const t=A.currentTime+when, o=A.createOscillator(), g=A.createGain();
  o.type=type; o.frequency.value=f; g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(v,t+.006); g.gain.exponentialRampToValueAtTime(.0001,t+d); o.connect(g); g.connect(BUS.sfx); o.start(t); o.stop(t+d+.02); }
const mf=m=>440*Math.pow(2,(m-69)/12), PEN=[64,66,68,71,73,76,78,80,83,85];   // ми мажор, как музыка
const bell=(m,v,w=0,d=.3)=>{ tone(mf(m),d,v,w); tone(mf(m)*2.01,d*.5,v*.25,w); };
const SFX={ pick(){ bell(76,.04,0,.12); }, move(){ tone(520,.08,.03,0,'triangle'); tone(660,.08,.025,.05,'triangle'); }, no(){ tone(170,.15,.045); },
  line(n){ const c=Math.min(9,n-3); for(let i=0;i<4;i++) bell(PEN[Math.min(9,c+i)],.055,i*.06,.4); },
  undo(){ bell(71,.04,0,.15); bell(64,.04,.07,.2); }, coin(){ bell(83,.05); bell(88,.05,.08); },
  over(){ [71,68,64,59].forEach((m,i)=>bell(m,.045,i*.16,.6)); } };

// ================= пауза и экраны =================
const pauseReasons=new Set(['menu']);
const paused=()=>pauseReasons.size>0;
const audioHeld=()=>pauseReasons.has('hidden')||pauseReasons.has('ad')||pauseReasons.has('platform')||blurred;
let running=false, gpActive=false;
const canPlay=()=>inputEnabled&&running&&!paused()&&state==='idle';
function setPause(r,on){ on?pauseReasons.add(r):pauseReasons.delete(r); applyState(); }
function applyState(){
  if(A){ try{ if(audioHeld()){ if(A.state==='running') A.suspend(); } else if(A.state==='suspended') A.resume(); }catch(e){}
    if(MUS){ if(prog.mus&&!audioHeld()) MUS.start(); else MUS.stop(); } }
  const active=running&&!paused();
  if(active!==gpActive){ gpActive=active; try{ const gp=ysdk&&ysdk.features&&ysdk.features.GameplayAPI; if(gp) active?gp.start():gp.stop(); }catch(e){} }
  $('hud').classList.toggle('hide',!boardVisible()); $('tools').classList.toggle('hide',!running);
}
document.addEventListener('visibilitychange',()=>{ setPause('hidden',document.hidden); if(document.hidden){ localWrite(); if(cloudDirty) pushCloud(); if(running&&!stack.length) pushScreen('ovPause'); } });
addEventListener('blur',()=>{ blurred=true; applyState(); }); addEventListener('focus',()=>{ blurred=false; applyState(); });
addEventListener('pagehide',()=>localWrite());
document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('selectstart',e=>e.preventDefault());
const stack=[];
const boardVisible=()=>running||stack.some(id=>id==='ovPause'||id==='ovOver'||id==='ovOffer');
function pushScreen(id){ const top=stack[stack.length-1]; if(top) $(top).classList.add('hide');
  stack.push(id); $(id).classList.remove('hide'); setPause('menu',true); if(id==='ovPause') sndLabels();
  const f=$(id).querySelector('.btn:not(.hide):not([disabled])'); if(f) f.focus({preventScroll:true}); }
function popScreen(){ const id=stack.pop(); if(id) $(id).classList.add('hide'); const top=stack[stack.length-1];
  if(top) $(top).classList.remove('hide'); else setPause('menu',false); if(top==='ovMenu') fillMenu(); applyState(); }
function clearScreens(){ while(stack.length) $(stack.pop()).classList.add('hide'); setPause('menu',false); }
document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>popScreen());
function fillMenu(){ const g=!!prog.game; $('bPlay').textContent=g?T.cont:T.play; $('bNew').classList.toggle('hide',!g);
  $('menuMeta').textContent=prog.best?T.meta(prog.best):''; }
function toMenu(){ if(running&&state!=='over') saveGame(); clearScreens(); running=false; sel=-1; applyState(); fillMenu(); pushScreen('ovMenu'); }
function startGame(fresh){ clearScreens(); if(fresh||!prog.game) newGame(); else loadGame(prog.game); running=true; applyState(); layout(); updHud(); }
const withAd=go=>{ if(prog.games>=2) showInterstitial(go); else go(); };
$('bPause').onclick=e=>{ e.stopPropagation(); audio(); if(inputEnabled&&running&&!stack.length) pushScreen('ovPause'); };
$('bUndo').onclick=e=>{ e.stopPropagation(); audio(); undo(); updHud(); };
$('bOfferAd').onclick=()=>showRewarded(()=>{ prog.undo+=3; save(true); updHud(); },ok=>{ if(ok){ popScreen(); SFX.coin(); } });
$('bResume').onclick=()=>popScreen();
$('bSfx').onclick=()=>{ prog.sfx=!prog.sfx; save(true); audio(); setBus(); sndLabels(); SFX.pick(); };
$('bMus').onclick=()=>{ prog.mus=!prog.mus; save(true); audio(); setBus(); applyState(); sndLabels(); };
$('bSound').onclick=()=>{ const on=!(prog.sfx||prog.mus); prog.sfx=prog.mus=on; save(true); audio(); setBus(); applyState(); sndLabels(); };
$('bMenu').onclick=toMenu;
$('bRestart').onclick=()=>{ prog.game=null; withAd(()=>startGame(true)); };
$('bPlay').onclick=()=>{ if(!inputEnabled) return; audio(); startGame(false); };
$('bNew').onclick=()=>{ if(!inputEnabled) return; audio(); prog.game=null; withAd(()=>startGame(true)); };
$('bAgain').onclick=()=>withAd(()=>startGame(true));
$('bOverMenu').onclick=toMenu;
$('bRevive').onclick=()=>showRewarded(()=>{ revive(); },ok=>{ if(ok){ clearScreens(); running=true; applyState(); layout(); updHud(); SFX.coin(); } });
$('bLegal').onclick=()=>pushScreen('ovLegal');
$('bThemes').onclick=()=>{ audio(); fillThemes(); pushScreen('ovThemes'); };
$('bBoard').onclick=()=>{ audio(); if(!ysdk) return;
  if(PF==='yandex'){ openBoard(); return; }
  if(PF==='vk'&&ysdk.nativeBoard){ save(true); ysdk.nativeBoard(prog.best).catch(()=>toast(T.boardErr)); } };
addEventListener('keydown',e=>{ if(e.code==='Escape'||e.code==='KeyP'){ if(stack[stack.length-1]==='ovPause') popScreen(); else if(running&&!stack.length) pushScreen('ovPause'); }
  if((e.ctrlKey||e.metaKey)&&e.code==='KeyZ'&&running&&!stack.length){ undo(); updHud(); } });

// ================= оформление =================
function fillThemes(){ $('themesMeta').textContent=T.themesMeta(prog.total); const box=$('themeList'); box.innerHTML='';
  for(const th of THEMES){ const open=prog.total>=th.need, cur=prog.theme===th.id, b=document.createElement('button'); b.className='th'+(cur?' cur':open?'':' lock');
    const c=document.createElement('canvas'); c.width=300; c.height=110; const g=c.getContext('2d'); const gr=g.createLinearGradient(0,0,0,110); gr.addColorStop(0,th.bg[0]); gr.addColorStop(1,th.bg[1]); g.fillStyle=gr; g.fillRect(0,0,300,110);
    g.fillStyle=th.frame; g.fillRect(14,20,272,70); for(let j=0;j<5;j++){ g.fillStyle=j%2?th.cell2:th.cell; g.fillRect(20+j*53.2,26,51,58); g.save(); g.translate(45.5+j*53.2,55); ART.ball(g,21,[0,2,3,5,6][j],th.id); g.restore(); }
    const n=document.createElement('span'); n.textContent=th[LANG]; const s=document.createElement('small'); s.textContent=cur?T.thCur:open?T.thChoose:T.thNeed(th.need);
    b.append(c,n,s); b.onclick=()=>{ if(!open||cur){ if(!open) SFX.no(); return; } prog.theme=th.id; sprites={}; save(true); SFX.coin(); fillThemes(); updHud(); };
    box.appendChild(b); } }

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
const BOARD='score';
async function submitBest(){ if(!ysdk||!player||PF!=='yandex'||!prog.best) return; try{ if(!(await ysdk.isAvailableMethod('leaderboards.setScore'))) return; await ysdk.leaderboards.setScore(BOARD,prog.best); }catch(e){} }
const isAuth=()=>{ try{ return !!(player&&player.isAuthorized&&player.isAuthorized()); }catch(e){ return false; } };
async function openBoard(){
  pushScreen('ovBoard'); const list=$('boardList'), msg=$('boardMsg'); list.innerHTML=''; msg.textContent=T.boardLoading; $('bAuth').classList.toggle('hide',isAuth()||!ysdk.auth);
  try{ const res=await withTimeout(ysdk.leaderboards.getEntries(BOARD,{quantityTop:10,includeUser:true,quantityAround:2}),8000);
    const me=player&&player.getUniqueID?player.getUniqueID():null, es=(res&&res.entries)||[]; msg.textContent=es.length?'':T.boardEmpty;
    for(const e of es){ const li=document.createElement('li'); if(me&&e.player&&e.player.uniqueID===me) li.className='me';
      const a=document.createElement('span'); a.className='rk'; a.textContent=e.rank; const b=document.createElement('span'); b.className='nm'; b.textContent=(e.player&&e.player.publicName)||T.anon;
      const c=document.createElement('span'); c.className='sc'; c.textContent=e.score; li.append(a,b,c); list.appendChild(li); }
    if(!isAuth()) msg.textContent=(msg.textContent?msg.textContent+' ':'')+T.boardGuest;
  }catch(e){ msg.textContent=T.boardErr; } }
$('bAuth').onclick=async()=>{ if(!ysdk||!ysdk.auth) return; try{ await ysdk.auth.openAuthDialog(); player=await withTimeout(ysdk.getPlayer(),5000);
  const m=mergeSaves(prog,await loadCloud()); if(m) prog=m; save(true); await submitBest(); popScreen(); openBoard(); }catch(e){} };

// ================= запуск =================
function applyLang(){
  document.documentElement.lang=LANG;
  document.querySelectorAll('[data-t]').forEach(el=>{ const v=T[el.dataset.t]; if(typeof v==='string') el.textContent=v; });
  $('title').textContent=T.title; $('legalText').innerHTML=T.legal; document.title=LANG==='ru'?'Линии: Шарики':'Lines: Color Balls';
  $('bPause').setAttribute('aria-label',T.pause); $('bUndo').setAttribute('aria-label',LANG==='ru'?'Отмена хода':'Undo');
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
    sndLabels(); updHud();
    $('ovBoot').classList.add('hide'); fillMenu(); pushScreen('ovMenu'); applyState();
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    if(!readySent){ try{ ysdk.features.LoadingAPI.ready(); }catch(e){} readySent=true; }
    inputEnabled=true;
  }catch(e){ const t=STR[resolveLang(navigator.language)]; $('bootMsg').textContent=t.bootErr; $('bRetry').textContent=t.retry; $('bRetry').classList.remove('hide'); }
}
$('bRetry').onclick=boot;
layout(); applyState(); requestAnimationFrame(frame); boot();

// ================= тест-хуки =================
if(DEV){
  // жадный бот: ход, который даёт самую длинную линию своего цвета
  function bestMove(){ let best=null, bs=-1;
    for(let a=0;a<N*N;a++){ const k=grid[a]; if(k<0) continue; grid[a]=-1;
      const seen=new Set([a]), q=[a];
      while(q.length){ const x=q.shift(); const [r,c]=rc(x); for(const [dr,dc] of [[0,1],[1,0],[0,-1],[-1,0]]){ const rr=r+dr, cc=c+dc; if(rr<0||rr>=N||cc<0||cc>=N) continue; const y=idx(rr,cc); if(seen.has(y)||grid[y]>=0) continue; seen.add(y); q.push(y);
        grid[y]=k; let m=0; for(const [d1,d2] of [[0,1],[1,0],[1,1],[1,-1]]){ let n=1; for(const s of [1,-1]){ let r2=rr+d1*s, c2=cc+d2*s; while(r2>=0&&r2<N&&c2>=0&&c2<N&&grid[idx(r2,c2)]===k){ n++; r2+=d1*s; c2+=d2*s; } } m=Math.max(m,n); } grid[y]=-1;
        const sc=m*10+Math.random(); if(sc>bs){ bs=sc; best=[a,y]; } } }
      grid[a]=k; }
    return best; }
  window.__ln={ get grid(){return grid}, set grid(v){grid=v}, get state(){return state}, get score(){return score}, set score(v){score=v; giftLvl=Math.floor(v/GIFT_EVERY);}, get prog(){return prog}, get next(){return [nextCols,nextPos]},
    get running(){return running}, get paused(){return [...pauseReasons]}, get music(){return MUS&&MUS.playing}, get sel(){return sel},
    cellCenter:i=>center(i), path, linesAt, bestMove, tryMove, spawn, newGame, undo, revive, updHud, saveGame, layout, N, NC,
    setNext:(cols,pos)=>{ nextCols=cols; nextPos=pos; updHud(); } };
}
})();
