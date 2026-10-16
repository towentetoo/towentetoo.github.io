/* Уютный маджонг — T&C STUDIO. HTML5 для Яндекс Игр / VK / OK (платформа — через YaGames-совместимый слой). */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const DEV=!!window.__MJ_DEV__||/[?&]dev\b/.test(location.search);
const PF=window.__TC_PLATFORM||'yandex';

// ================= тексты =================
const NM={yandex:{ru:'Яндекс Игры',en:'Yandex Games'},vk:{ru:'ВКонтакте',en:'VK'},ok:{ru:'Одноклассники',en:'OK'}}[PF];
const STR={
 ru:{title:'Уютный<br>маджонг',level:'Уровень',tiles:'Плиток',play:'Играть',cont:'Продолжить',dacha:'🏡 Дом',board:'🏆 Рейтинг',
   how:'Находи пары одинаковых плиток. Брать можно только свободные: сверху ничего не лежит и открыт левый или правый бок. За уровни — звёзды, на звёзды обустраивай бабушкин дом: кухню, гостиную и спальню.',
   pause:'Пауза',resume:'Продолжить',menu:'В меню',sfxOn:'🔊 Звуки',sfxOff:'🔈 Звуки выкл',musOn:'🎵 Музыка',musOff:'🎵 Музыка выкл',
   win:'Уровень пройден!',next:'Дальше',double:'Удвоить звёзды',toDacha:'🏡 Обустроить дом',time:'Время',got:n=>`+${n} ★`,
   noMoves:'Ходов нет — перемешиваю',hintT:'Подсказки закончились',hintX:'Посмотри рекламу и получи 3 подсказки. А ещё за каждый уровень — +1 подсказка.',hintB:'Смотреть: +3 подсказки',
   shufT:'Перемешивания закончились',shufX:'Посмотри рекламу и получи 2 перемешивания. А ещё каждые 3 уровня — +1 перемешивание.',shufB:'Смотреть: +2 перемешивания',cancel:'Отмена',
   adNA:'Реклама сейчас недоступна, попробуй позже',back:'Назад',own:'✓',need:n=>`Не хватает ${n} ★`,bought:'Готово!',
   allDone:'Весь дом обустроен! Отличная работа.',roomDone:n=>`Комната готова! Открыта новая: ${n}`,locked:n=>`Сначала обустрой: ${n}`,
   boardLoading:'Загрузка рейтинга…',boardErr:'Рейтинг сейчас недоступен',boardEmpty:'Пока никого нет. Стань первым!',boardGuest:'Войди, чтобы попасть в рейтинг',
   login:PF==='yandex'?'Войти через Яндекс':'Войти',anon:'Игрок',lvls:n=>`${n} ур.`,legalBtn:'Конфиденциальность и соглашение',
   boot:'Загрузка…',bootErr:'Не удалось загрузить игру. Проверь интернет и попробуй ещё раз.',retry:'Повторить',meta:(l,s)=>`Уровень ${l} · ★ ${s}`,
   legal:`<h3>Политика конфиденциальности</h3>
<p>Игра «Уютный маджонг» не собирает и не передаёт разработчику персональные данные игроков.</p>
<p>Прогресс (уровень, звёзды, подсказки, покупки для дома и настройки звука) хранится на устройстве игрока и в хранилище платформы ${NM.ru}, привязанном к аккаунту, чтобы он не терялся и был доступен на других устройствах.</p>
${PF==='yandex'?'<p>Если игрок вошёл через Яндекс ID, в рейтинге показываются его публичное имя, аватар и результат — по правилам платформы Яндекс Игры.</p>':PF==='vk'?'<p>Таблица рекордов показывается средствами ВКонтакте по правилам платформы.</p>':''}
<p>Реклама показывается средствами платформы ${NM.ru}. Обработка данных при показе рекламы регулируется политикой конфиденциальности платформы.</p>
<p>Удалить локальный прогресс можно, очистив данные сайта в настройках браузера.</p>
<h3>Лицензионное соглашение</h3>
<p>Игра предоставляется бесплатно для личного некоммерческого использования на платформе ${NM.ru} на условиях «как есть».</p>
<p>Все права на игру, её графику, музыку и программный код принадлежат разработчику (T&amp;C STUDIO). Запрещено копировать, изменять, распространять игру или её части без разрешения разработчика.</p>
<p>Внутриигровые звёзды не имеют денежной ценности и не могут быть обменяны на деньги, товары или услуги.</p>
<p>Разработчик не несёт ответственности за перебои в работе платформы и за потерю данных по причинам, не зависящим от разработчика.</p>
<p>Начиная игру, вы соглашаетесь с этими условиями.</p>`},
 en:{title:'Cozy<br>Mahjong',level:'Level',tiles:'Tiles',play:'Play',cont:'Continue',dacha:'🏡 Home',board:'🏆 Leaderboard',
   how:'Match pairs of identical tiles. Only free tiles can be taken: nothing on top and the left or right side open. Earn stars and decorate grandma’s home: kitchen, living room and bedroom.',
   pause:'Pause',resume:'Resume',menu:'Menu',sfxOn:'🔊 Sounds',sfxOff:'🔈 Sounds off',musOn:'🎵 Music',musOff:'🎵 Music off',
   win:'Level complete!',next:'Next',double:'Double the stars',toDacha:'🏡 Decorate',time:'Time',got:n=>`+${n} ★`,
   noMoves:'No moves — shuffling',hintT:'Out of hints',hintX:'Watch an ad to get 3 hints. Every level also gives +1 hint.',hintB:'Watch: +3 hints',
   shufT:'Out of shuffles',shufX:'Watch an ad to get 2 shuffles. Every 3 levels also give +1 shuffle.',shufB:'Watch: +2 shuffles',cancel:'Cancel',
   adNA:'Ads are unavailable right now, try later',back:'Back',own:'✓',need:n=>`${n} more ★ needed`,bought:'Done!',
   allDone:'The whole home is done! Great job.',roomDone:n=>`Room complete! New room unlocked: ${n}`,locked:n=>`First finish: ${n}`,
   boardLoading:'Loading leaderboard…',boardErr:'Leaderboard is unavailable right now',boardEmpty:'Nobody here yet. Be the first!',boardGuest:'Sign in to join the leaderboard',
   login:PF==='yandex'?'Sign in with Yandex':'Sign in',anon:'Player',lvls:n=>`lvl ${n}`,legalBtn:'Privacy and terms',
   boot:'Loading…',bootErr:'Could not load the game. Check your connection and try again.',retry:'Retry',meta:(l,s)=>`Level ${l} · ★ ${s}`,
   legal:`<h3>Privacy policy</h3>
<p>Cozy Mahjong does not collect or send players’ personal data to the developer.</p>
<p>Progress (level, stars, hints, home items and sound settings) is stored on the player’s device and in ${NM.en} platform storage linked to the account, so it is kept and available on other devices.</p>
${PF==='yandex'?'<p>If the player signs in with Yandex ID, the leaderboard shows their public name, avatar and result according to Yandex Games rules.</p>':PF==='vk'?'<p>The leaderboard is provided by VK according to the platform rules.</p>':''}
<p>Ads are shown by the ${NM.en} platform. Data processing for ads is governed by the platform’s privacy policy.</p>
<p>You can delete local progress by clearing site data in your browser settings.</p>
<h3>License agreement</h3>
<p>The game is provided free of charge for personal non-commercial use on the ${NM.en} platform “as is”.</p>
<p>All rights to the game, its graphics, music and code belong to the developer (T&amp;C STUDIO). Copying, modifying or distributing the game or its parts without permission is prohibited.</p>
<p>In-game stars have no monetary value and cannot be exchanged for money, goods or services.</p>
<p>The developer is not responsible for platform outages or data loss beyond the developer’s control.</p>
<p>By playing the game you agree to these terms.</p>`}
};
const RU_LANGS=new Set(['ru','be','kk','uk','uz']);
const resolveLang=l=>RU_LANGS.has(String(l||'').toLowerCase().slice(0,2))?'ru':'en';
if(DEV) window.__mjResolveLang=resolveLang;
let LANG='ru', T=STR.ru;

// ================= раскладки =================
const KINDS=window.MJ_ICONS, ROOMS=window.MJ_ROOMS, ITEMS=ROOMS.flatMap(r=>r.ITEMS);
const mask=(rows,z,ox,oy)=>{ const a=[]; rows.forEach((row,j)=>[...row].forEach((ch,i)=>{ if(ch==='#') a.push([ox+i*2,oy+j*2,z]); })); return a; };
const rect=(c,r,z,ox,oy)=>{ const a=[]; for(let j=0;j<r;j++) for(let i=0;i<c;i++) a.push([ox+i*2,oy+j*2,z]); return a; };
const LAYOUTS=[
  [...rect(6,4,0,0,0),...rect(4,2,1,2,2),...rect(2,1,2,4,3)],                                        // домик 34
  [...rect(6,5,0,0,0),...rect(5,4,1,1,1),...rect(4,3,2,2,2),...rect(3,2,3,3,3)],                    // пирамидка 68
  [...rect(3,4,0,0,0),...rect(1,4,0,6,0),...rect(3,4,0,8,0),...rect(2,2,1,1,2),...rect(1,2,1,6,2),...rect(2,2,1,9,2)],   // бабочка 38
  [...rect(8,5,0,0,0),...rect(6,3,1,2,2),...rect(4,1,2,4,4),...rect(2,1,3,6,4)],                    // сундук 64
  [...rect(4,6,0,0,0),...rect(3,5,1,1,1),...rect(2,4,2,2,2),...rect(1,3,3,3,3)],                    // башенка 50
  [...rect(8,6,0,0,0),...rect(6,4,1,2,2)],                                                           // грядка 72
  [...rect(8,2,0,0,0),...rect(6,2,0,2,4),...rect(4,2,0,4,8),...rect(7,1,1,1,1),...rect(5,1,1,3,5),...rect(2,1,1,5,9)],   // лесенка 50
  [...rect(10,4,0,0,0),...rect(8,2,1,2,2),...rect(4,1,2,6,3)],                                       // поле 60
  [...rect(8,4,0,2,2),[2,0,0],[14,0,0],[2,10,0],[14,10,0],[0,5,0],[18,5,0],...rect(6,2,1,4,4),...rect(4,1,2,6,5),...rect(2,1,3,8,5)],   // черепаха 56
  [...mask(['.##..##.','########','########','.######.','..####..','...##...'],0,0,0),...rect(4,2,1,4,3),[6,4,2],[8,4,2]],     // сердце 42
  [...rect(10,5,0,0,0),...rect(2,2,1,0,0),...rect(2,2,1,16,0),...rect(2,2,1,0,6),...rect(2,2,1,16,6),[1,1,2],[17,1,2],[1,7,2],[17,7,2],...rect(2,2,1,8,4)],   // крепость 74
  [...mask(['.####.','######','##..##','######','.####.','.####.','..##..'],0,0,0),...mask(['####','#..#','####'],1,1,1)],   // цветок 40
  [...mask(['#....#','##..##','######','######','######','.####.'],0,0,0),...rect(4,2,1,2,5),[4,6,2],[6,6,2]],   // кот 38
];
function levelDef(n){ return {t:LAYOUTS[(n-1)%LAYOUTS.length], kinds:Math.min(KINDS.length,8+Math.floor((n-1)/2)*2)}; }

// ================= платформа =================
let ysdk=null, player=null, readySent=false, inputEnabled=false, storage=null;
const withTimeout=(p,ms)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms))]);

// ================= сохранения: локально сразу, в облако не чаще раза в 3 с =================
const SAVE_KEY='mj_save_v1';
const P0={level:1,stars:0,earned:0,hints:3,shuf:2,items:[],sfx:true,mus:true,ts:0};
let prog={...P0, items:[]};
function sanitize(p){ if(!p||typeof p!=='object') return null;
  const n=(v,d,mx)=>Number.isFinite(+v)?Math.max(0,Math.min(mx,Math.floor(+v))):d;
  return {level:Math.max(1,n(p.level,1,1e6)),stars:n(p.stars,0,1e7),earned:n(p.earned,0,1e7),hints:n(p.hints,3,999),shuf:n(p.shuf,2,999),
    items:Array.isArray(p.items)?p.items.filter(id=>ITEMS.some(i=>i.id===id)):[],sfx:p.sfx!==false,mus:p.mus!==false,ts:n(p.ts,0,9e15)}; }
function mergeSaves(a,b){ if(!a) return b; if(!b) return a;
  const base=b.ts>a.ts?{...b}:{...a};
  base.level=Math.max(a.level,b.level); base.earned=Math.max(a.earned,b.earned); base.items=[...new Set([...a.items,...b.items])]; return base; }
function localRead(){ try{ const s=(storage||localStorage).getItem(SAVE_KEY); return s?sanitize(JSON.parse(s)):null; }catch(e){ return null; } }
function localWrite(){ try{ (storage||localStorage).setItem(SAVE_KEY,JSON.stringify(prog)); }catch(e){} }
let cloudTimer=0, cloudBusy=false, cloudDirty=false, lastCloud=0;
function save(important){ prog.ts=Date.now(); localWrite(); cloudDirty=true; scheduleCloud(important); }
function scheduleCloud(important){ if(!player) return; const gap=important?3200:10000, wait=Math.max(0,gap-(Date.now()-lastCloud)); clearTimeout(cloudTimer); cloudTimer=setTimeout(pushCloud,wait); }
async function pushCloud(){
  if(!player||!cloudDirty) return;
  if(cloudBusy||Date.now()-lastCloud<3000){ scheduleCloud(true); return; }
  cloudBusy=true; cloudDirty=false; lastCloud=Date.now();
  try{ await player.setData({save:prog},true); }catch(e){ cloudDirty=true; } finally{ cloudBusy=false; }
}
async function loadCloud(){ if(!player) return null; try{ const d=await withTimeout(player.getData(['save']),5000); return sanitize(d&&d.save); }catch(e){ return null; } }

// ================= логика поля =================
let flat=false, tiles=[], level=1, sel=null, hintPair=null, hintT=0, helps=0, elapsed=0, won=false;
const alive=()=>tiles.filter(t=>!t.gone);
function isFree(t,set){
  for(const u of set){ if(u===t) continue; if(u.z===t.z+1&&Math.abs(u.x-t.x)<2&&Math.abs(u.y-t.y)<2) return false; }
  let L=false,R=false;
  for(const u of set){ if(u===t||u.z!==t.z||Math.abs(u.y-t.y)>=2) continue; if(u.x===t.x-2) L=true; else if(u.x===t.x+2) R=true; }
  return !(L&&R);
}
const shuffleArr=a=>{ for(let i=a.length-1;i>0;i--){ const j=Math.random()*(i+1)|0; [a[i],a[j]]=[a[j],a[i]]; } return a; };
// раздача с гарантией решения: снимаем пары свободных плиток и вешаем на них одинаковые картинки
function deal(list,kindPairs){
  for(let tries=0;tries<300;tries++){
    const pool=list.slice(), kp=shuffleArr(kindPairs.slice()); let ok=true;
    while(pool.length){ const free=pool.filter(t=>isFree(t,pool)); if(free.length<2){ ok=false; break; }
      shuffleArr(free); const a=free[0], b=free[1], k=kp.pop(); a.k=k; b.k=k; pool.splice(pool.indexOf(a),1); pool.splice(pool.indexOf(b),1); }
    if(ok) return true;
  }
  return false;
}
function newLevel(n){
  const {t,kinds}=levelDef(n);
  tiles=t.map(([x,y,z],i)=>({id:i,x,y,z,k:0,gone:false,a:0,shake:0}));
  const kp=[]; for(let i=0;i<tiles.length/2;i++) kp.push(i%kinds);
  deal(tiles,kp);
  sel=null; hintPair=null; helps=0; elapsed=0; won=false; flat=false; flyers.length=0;
  layout(); updHud();
}
function findPair(){ const al=alive(), fr=al.filter(t=>isFree(t,al));
  for(let i=0;i<fr.length;i++) for(let j=i+1;j<fr.length;j++) if(fr[i].k===fr[j].k) return [fr[i],fr[j]]; return null; }
function reshuffle(){
  const al=alive(), ks=al.map(t=>t.k).sort((a,b)=>a-b), kp=[]; for(let i=0;i<ks.length;i+=2) kp.push(ks[i]);
  if(!deal(al,kp)){ const cols=Math.min(6,al.length); al.forEach((t,i)=>{ t.x=(i%cols)*2; t.y=Math.floor(i/cols)*2; t.z=0; }); flat=true; deal(al,kp); layout(); }
  sel=null; hintPair=null; for(const t of al) t.a=0.6;
}

// ================= ввод =================
let combo=0, lastMatch=0;
const canPlay=()=>inputEnabled&&running&&!paused()&&!won;
function tap(t){
  audio();
  if(!canPlay()) return;
  if(!t){ sel=null; return; }
  const al=alive();
  if(!isFree(t,al)){ t.shake=0.35; SFX.no(); return; }
  if(!sel){ sel=t; SFX.pick(); return; }
  if(sel===t){ sel=null; return; }
  if(sel.k===t.k){ match(sel,t); sel=null; return; }
  sel=t; SFX.pick();
}
function match(a,b){
  const now=performance.now(); combo=(now-lastMatch<2500)?combo+1:0; lastMatch=now;
  a.gone=b.gone=true; hintPair=null;
  const pa=tilePos(a), pb=tilePos(b), mx=(pa.cx+pb.cx)/2, my=(pa.cy+pb.cy)/2;
  flyers.push({t:a,from:pa,mx,my,s:0},{t:b,from:pb,mx,my,s:0});
  SFX.match(combo); updHud();
  if(!alive().length){ won=true; applyState(); setTimeout(win,650); return; }
  if(!findPair()) setTimeout(()=>{ if(!won){ toast(T.noMoves); reshuffle(); } },500);
}
let lastStars=0, doubled=false;
function win(){
  const stars=helps===0?3:helps<=2?2:1; lastStars=stars; doubled=false;
  prog.stars+=stars; prog.earned+=stars; prog.level=level+1;
  const gift=[]; prog.hints++; gift.push('+1 💡'); if(level%3===0){ prog.shuf++; gift.push('+1 🔀'); }   // бонусы за игру — не только за рекламу
  save(true); pushCloud(); submitBest();
  $('stars').innerHTML='<i class="on">★</i>'.repeat(stars)+'<i>★</i>'.repeat(3-stars);
  const sec=Math.round(elapsed);
  $('winText').textContent=`${T.time}: ${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}  ·  ${T.got(stars)}  ·  ${gift.join(' ')}`;
  $('bDouble').classList.remove('hide'); $('bDouble').disabled=false;
  SFX.win(); pushScreen('ovWin');
}
function nextLevel(){ clearScreens(); level=prog.level; newLevel(level); running=true; applyState(); }
// межстраничная реклама — только в естественной паузе между уровнями, начиная с 3-го
$('bNext').onclick=()=>{ if(level>=2) showInterstitial(nextLevel); else nextLevel(); };
$('bDouble').onclick=()=>showRewarded(()=>{ prog.stars+=lastStars; prog.earned+=lastStars; doubled=true; save(true); },ok=>{ if(ok){ $('bDouble').classList.add('hide'); $('winText').textContent+=`  ·  ${T.got(lastStars)}`; SFX.coin(); } });
$('bWinDacha').onclick=()=>{ clearScreens(); level=prog.level; newLevel(level); openDacha(); };
let offerKind='';
$('bHint').onclick=e=>{ e.stopPropagation(); audio(); if(!canPlay()) return;
  if(prog.hints<=0){ openOffer('hint'); return; }
  const p=findPair(); if(p){ hintPair=p; hintT=2.4; helps++; prog.hints--; save(); updHud(); SFX.pick(); } };
$('bShuffle').onclick=e=>{ e.stopPropagation(); audio(); if(!canPlay()) return;
  if(prog.shuf<=0){ openOffer('shuf'); return; }
  reshuffle(); helps++; prog.shuf--; save(); updHud(); SFX.shuffle(); };
function openOffer(kind){ offerKind=kind;
  $('offerTitle').textContent=kind==='hint'?T.hintT:T.shufT; $('offerText').textContent=kind==='hint'?T.hintX:T.shufX; $('offerBtn').textContent=kind==='hint'?T.hintB:T.shufB;
  pushScreen('ovOffer'); }
$('bOfferAd').onclick=()=>showRewarded(()=>{ if(offerKind==='hint') prog.hints+=3; else prog.shuf+=2; save(true); updHud(); },ok=>{ if(ok){ popScreen(); SFX.coin(); } });

// ================= раскладка на экране =================
const cv=$('c'), ctx=cv.getContext('2d');
let W=0,H=0,DPR=1,U=20,OX=0,OY=0,DZ=0;
const TH=1.3;
function layout(){
  W=Math.max(1,innerWidth); H=Math.max(1,innerHeight); DPR=Math.min(devicePixelRatio||1,2.5);
  cv.width=W*DPR|0; cv.height=H*DPR|0; cv.style.width=W+'px'; cv.style.height=H+'px';
  if(!tiles.length) return;
  let mx=0,my=0,mz=0; for(const t of (flat?alive():tiles)){ mx=Math.max(mx,t.x+2); my=Math.max(my,t.y+2); mz=Math.max(mz,t.z); }
  const top=Math.max(70,H*0.09), pad=12, aw=W-pad*2, ah=H-top-pad*2;
  U=Math.min(aw/(mx+mz*0.24+0.4), ah/(my*TH+mz*0.3+0.4), 44); DZ=U*0.24;
  const bw=mx*U+mz*DZ, bh=my*U*TH+mz*DZ*1.2;
  OX=(W-bw)/2+mz*DZ; OY=top+pad+(ah-bh)/2+mz*DZ*1.2;
}
function tilePos(t){ const w=2*U, h=2*U*TH, x=OX+t.x*U-t.z*DZ, y=OY+t.y*U*TH-t.z*DZ*1.2; return {x,y,w,h,cx:x+w/2,cy:y+h/2}; }
addEventListener('resize',()=>{ layout(); if(stack.includes('ovDacha')) sizeScene(); });
addEventListener('orientationchange',()=>setTimeout(layout,200));

// ================= отрисовка =================
const flyers=[], parts=[];
function rr(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
let iconCache=[], iconKey='';
function icon(k){
  const key=U.toFixed(1)+'|'+DPR; if(key!==iconKey){ iconCache=[]; iconKey=key; }
  if(!iconCache[k]){ const sz=Math.ceil(U*1.55*DPR), c=document.createElement('canvas'); c.width=c.height=sz;
    const g=c.getContext('2d'); g.translate(sz/2,sz/2); g.scale(sz/2.1,sz/2.1); KINDS[k].draw(g); iconCache[k]=c; }
  return iconCache[k];
}
function drawTile(t,p,free,scale=1,alpha=1){
  const {x,y,w,h}=p, r=U*0.28, d=U*0.26;
  ctx.save(); ctx.globalAlpha=alpha;
  if(scale!==1){ ctx.translate(p.cx,p.cy); ctx.scale(scale,scale); ctx.translate(-p.cx,-p.cy); }
  const sx=t.shake>0?Math.sin(t.shake*60)*U*0.12*t.shake/0.35:0, lift=(t===sel)?-U*0.12:0;
  ctx.translate(sx,lift);
  ctx.shadowColor='rgba(90,55,25,.35)'; ctx.shadowBlur=U*0.35; ctx.shadowOffsetX=U*0.12; ctx.shadowOffsetY=U*0.18;
  rr(x+d*0.7,y+d,w,h,r); ctx.fillStyle=['#c79a6b','#b98a5c','#aa7b4f','#9a6d44'][Math.min(3,t.z)]; ctx.fill();
  ctx.shadowColor='transparent';
  rr(x,y,w,h,r); const g=ctx.createLinearGradient(x,y,x,y+h); g.addColorStop(0,'#fffdf6'); g.addColorStop(1,'#f1e2c8'); ctx.fillStyle=g; ctx.fill();
  ctx.lineWidth=Math.max(1,U*0.06); ctx.strokeStyle='#d9bb92'; ctx.stroke();
  const hl=(t===sel)?'#7bc47f':(hintPair&&hintPair.includes(t)&&hintT>0)?`rgba(255,190,60,${0.5+0.5*Math.sin(performance.now()/120)})`:null;
  if(hl){ ctx.lineWidth=U*0.18; ctx.strokeStyle=hl; rr(x+U*0.05,y+U*0.05,w-U*0.1,h-U*0.1,r*0.8); ctx.stroke(); }
  ctx.globalAlpha=alpha*(free?1:0.6);
  const ic=icon(t.k), s=ic.width/DPR; ctx.drawImage(ic,x+w/2-s/2,y+h/2-s/2,s,s);
  if(!free){ ctx.globalAlpha=alpha*0.28; rr(x,y,w,h,r); ctx.fillStyle='#8a6a4a'; ctx.fill(); }
  ctx.restore();
}
function paintBg(){
  const g=ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,'#f7ead6'); g.addColorStop(1,'#ecd5b5'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(255,255,255,.25)'; for(let y=40;y<H;y+=56) for(let x=(y/56|0)%2*28;x<W;x+=56){ ctx.beginPath(); ctx.arc(x,y,5,0,7); ctx.fill(); }
}
function burst(x,y){ if(parts.length>200) return; const cs=['#ffcf5a','#ff9db0','#9fd99c','#fff'];
  for(let i=0;i<14;i++){ const a=Math.random()*6.28, v=120+Math.random()*180; parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-120,r:2+Math.random()*3,t:.6+Math.random()*.3,c:cs[i%4]}); } }
let last=performance.now(), sceneT=0;
function frame(now){
  const dt=Math.min(.05,(now-last)/1000); last=now;
  if(!paused()){
    if(running&&!won) elapsed+=dt;
    hintT=Math.max(0,hintT-dt);
    ctx.setTransform(DPR,0,0,DPR,0,0); paintBg();
    const al=alive(), order=al.slice().sort((a,b)=>a.z-b.z||a.y-b.y||a.x-b.x);
    for(const t of order){ t.shake=Math.max(0,t.shake-dt); const ap=t.a>0?(t.a=Math.max(0,t.a-dt*2),1-t.a*0.3):1; drawTile(t,tilePos(t),isFree(t,al),ap); }
    for(let i=flyers.length-1;i>=0;i--){ const f=flyers[i]; f.s+=dt*3.2; const e=Math.min(1,f.s), k=1-Math.pow(1-e,3);
      const p={...f.from}; p.x+=(f.mx-f.from.cx)*k; p.y+=(f.my-f.from.cy)*k-U*1.5*Math.sin(e*Math.PI)*0.4; p.cx=p.x+p.w/2; p.cy=p.y+p.h/2;
      drawTile(f.t,p,true,1+0.25*Math.sin(e*Math.PI),1-Math.max(0,e-0.7)/0.3); if(f.s>=1){ flyers.splice(i,1); burst(f.mx,f.my); } }
    for(let i=parts.length-1;i>=0;i--){ const q=parts[i]; q.t-=dt; if(q.t<=0){ parts.splice(i,1); continue; }
      q.x+=q.vx*dt; q.y+=q.vy*dt; q.vy+=400*dt; ctx.globalAlpha=Math.min(1,q.t*2); ctx.fillStyle=q.c; ctx.beginPath(); ctx.arc(q.x,q.y,q.r,0,7); ctx.fill(); ctx.globalAlpha=1; }
  }
  if(stack[stack.length-1]==='ovDacha'&&!pauseReasons.has('hidden')){ sceneT+=dt; drawScene(); }
  requestAnimationFrame(frame);
}
cv.addEventListener('pointerdown',e=>{
  const al=alive(), order=al.slice().sort((a,b)=>b.z-a.z||b.y-a.y||b.x-a.x);
  for(const t of order){ const p=tilePos(t); if(e.clientX>=p.x&&e.clientX<=p.x+p.w&&e.clientY>=p.y&&e.clientY<=p.y+p.h){ tap(t); return; } }
  tap(null);
});

// ================= HUD / тост =================
function updHud(){ $('lvl').textContent=level; $('left').textContent=alive().length;
  const h=$('nHint'), s=$('nShuf'); h.textContent=prog.hints>0?prog.hints:'+'; h.classList.toggle('ad',prog.hints<=0); s.textContent=prog.shuf>0?prog.shuf:'+'; s.classList.toggle('ad',prog.shuf<=0); }
let toastT=0; function toast(m){ const el=$('toast'); el.textContent=m; el.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('show'),2000); }

// ================= звук =================
let A=null, BUS=null, MUS=null, blurred=false;
function audio(){
  if(A) return A;
  try{ A=new (window.AudioContext||window.webkitAudioContext)(); const master=A.createGain(); master.connect(A.destination);
    BUS={sfx:A.createGain(),mus:A.createGain()}; BUS.sfx.connect(master); BUS.mus.connect(master);
    MUS=window.MJ_MUSIC.build(A,BUS.mus); setBus(); applyState(); }catch(e){ A=null; }
  return A;
}
function setBus(){ if(!BUS) return; BUS.sfx.gain.value=prog.sfx?1:0; BUS.mus.gain.value=prog.mus?0.85:0; }
function sndLabels(){ $('bSfx').textContent=prog.sfx?T.sfxOn:T.sfxOff; $('bMus').textContent=prog.mus?T.musOn:T.musOff;
  const q=$('bSound'); q.textContent=(prog.sfx||prog.mus)?'🔊':'🔇'; q.setAttribute('aria-label',(prog.sfx||prog.mus)?T.sfxOn:T.sfxOff); }
function tone(f,d,type,v,when=0,att=.006){ if(!A||A.state!=='running') return; const t=A.currentTime+when, o=A.createOscillator(), g=A.createGain();
  o.type=type; o.frequency.setValueAtTime(f,t); g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(v,t+att); g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g); g.connect(BUS.sfx); o.start(t); o.stop(t+d+.02); }
// звуки в фа мажоре — как музыка: мягкий «колокольчик» из двух синусов
const mf=m=>440*Math.pow(2,(m-69)/12), PEN=[77,79,81,84,86,89,91,93,96,98];
function bell(m,v,when=0,d=.35){ const f=mf(m); tone(f,d,'sine',v,when); tone(f*2.01,d*.5,'sine',v*.25,when); }
const SFX={
  pick(){ bell(PEN[Math.random()*5|0]-12,.04,0,.18); },
  no(){ tone(175,.15,'sine',.045); },
  match(c){ const m=PEN[Math.min(c,PEN.length-1)]; bell(m,.07); bell(m+7,.03,.06); },
  shuffle(){ for(let i=0;i<5;i++) bell(PEN[i]-12,.03,i*.05,.15); },
  coin(){ bell(84,.05); bell(89,.05,.08); },
  win(){ [77,81,84,89,93].forEach((m,i)=>bell(m,.06,i*.11,.6)); }
};

// ================= пауза и экраны =================
// независимые причины: 'menu' (экраны), 'hidden' (вкладка), 'ad', 'platform' (game_api_pause)
const pauseReasons=new Set(['menu']);
const paused=()=>pauseReasons.size>0;
const audioHeld=()=>pauseReasons.has('hidden')||pauseReasons.has('ad')||pauseReasons.has('platform')||blurred;
let running=false, gpActive=false;
function setPause(r,on){ on?pauseReasons.add(r):pauseReasons.delete(r); applyState(); }
function applyState(){
  if(A){ try{ if(audioHeld()){ if(A.state==='running') A.suspend(); } else if(A.state==='suspended') A.resume(); }catch(e){}
    if(MUS){ if(prog.mus&&!audioHeld()) MUS.start(); else MUS.stop(); } }
  const active=running&&!paused()&&!won;
  if(active!==gpActive){ gpActive=active; try{ const gp=ysdk&&ysdk.features&&ysdk.features.GameplayAPI; if(gp) active?gp.start():gp.stop(); }catch(e){} }
}
document.addEventListener('visibilitychange',()=>{ setPause('hidden',document.hidden); if(document.hidden){ localWrite(); if(cloudDirty) pushCloud(); if(running&&!stack.length&&!won) pushScreen('ovPause'); } });
addEventListener('blur',()=>{ blurred=true; applyState(); }); addEventListener('focus',()=>{ blurred=false; applyState(); });
addEventListener('pagehide',()=>localWrite());
document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('selectstart',e=>e.preventDefault());

const stack=[];
function pushScreen(id){ const top=stack[stack.length-1]; if(top) $(top).classList.add('hide');
  stack.push(id); $(id).classList.remove('hide'); setPause('menu',true); if(id==='ovPause') sndLabels();
  const f=id==='ovDacha'?null:$(id).querySelector('.btn:not(.hide):not([disabled])'); if(f) f.focus({preventScroll:true}); }
function popScreen(){ const id=stack.pop(); if(id) $(id).classList.add('hide'); const top=stack[stack.length-1];
  if(top) $(top).classList.remove('hide'); else setPause('menu',false); }
function clearScreens(){ while(stack.length) $(stack.pop()).classList.add('hide'); setPause('menu',false); }
document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>{ popScreen(); if(stack[stack.length-1]==='ovMenu') fillMenu(); });
function fillMenu(){ $('bPlay').textContent=prog.level>1?T.cont:T.play; $('menuMeta').textContent=prog.level>1||prog.stars?T.meta(prog.level,prog.stars):''; }
function toMenu(){ clearScreens(); running=false; applyState(); fillMenu(); pushScreen('ovMenu'); }
$('bPause').onclick=e=>{ e.stopPropagation(); audio(); if(inputEnabled&&running&&!stack.length&&!won) pushScreen('ovPause'); };
$('bResume').onclick=()=>popScreen();
$('bSfx').onclick=()=>{ prog.sfx=!prog.sfx; save(true); audio(); setBus(); sndLabels(); SFX.pick(); };
$('bMus').onclick=()=>{ prog.mus=!prog.mus; save(true); audio(); setBus(); applyState(); sndLabels(); };
$('bMenu').onclick=toMenu;
$('bSound').onclick=()=>{ const on=!(prog.sfx||prog.mus); prog.sfx=prog.mus=on; save(true); audio(); setBus(); applyState(); sndLabels(); };
$('bPlay').onclick=()=>{ if(!inputEnabled) return; audio(); clearScreens(); if(level!==prog.level||!tiles.length||won){ level=prog.level; newLevel(level); } running=true; applyState(); };
$('bLegal').onclick=()=>pushScreen('ovLegal');
$('bBoard').onclick=()=>{ audio(); if(!ysdk) return;
  if(PF==='yandex'){ openBoard(); return; }
  if(PF==='vk'&&ysdk.nativeBoard){ save(true); ysdk.nativeBoard(prog.level-1).catch(()=>toast(T.boardErr)); } };
addEventListener('keydown',e=>{
  if(e.code==='Escape'||e.code==='KeyP'){ if(stack[stack.length-1]==='ovPause') popScreen(); else if(running&&!stack.length&&!won) pushScreen('ovPause'); }
  else if(e.code==='KeyH') $('bHint').click();
});

// ================= дача =================
const scene=$('scene'), sg=scene.getContext('2d');
function sizeScene(){ const r=Math.min(2,devicePixelRatio||1); scene.width=720*r; scene.height=440*r; }
let roomView=-1;
const roomDone=i=>ROOMS[i].ITEMS.every(it=>prog.items.includes(it.id));
const roomOpen=i=>i===0||roomDone(i-1);
function curRoom(){ for(let i=0;i<ROOMS.length;i++) if(!roomDone(i)) return i; return ROOMS.length-1; }
function drawScene(){ const r=scene.width/720; sg.setTransform(r,0,0,r,0,0); ROOMS[roomView<0?curRoom():roomView].draw(sg,new Set(prog.items),sceneT); }
function openDacha(){ audio(); sizeScene(); roomView=curRoom(); fillDacha(); if(stack[stack.length-1]!=='ovDacha') pushScreen('ovDacha'); $('ovDacha').querySelector('.panel').scrollTop=0; drawScene(); }
function fillDacha(){
  $('dStars').textContent=prog.stars;
  if(roomView<0) roomView=curRoom(); const R=ROOMS[roomView];
  $('roomTitle').textContent=`${R.e} ${R[LANG]}`;
  const tabs=$('roomTabs'); tabs.innerHTML='';
  ROOMS.forEach((rm,i)=>{ const b=document.createElement('button'); const open=roomOpen(i);
    b.className='rtab'+(i===roomView?' cur':'')+(open?'':' lock')+(roomDone(i)?' done':''); b.textContent=open?`${rm.e} ${rm[LANG]}`:`🔒 ${rm[LANG]}`;
    b.onclick=()=>{ if(!open){ toast(T.locked(ROOMS[i-1][LANG])); SFX.no(); return; } roomView=i; fillDacha(); drawScene(); }; tabs.appendChild(b); });
  const box=$('items'); box.innerHTML='';
  const left=ITEMS.filter(i=>!prog.items.includes(i.id));
  for(const it of R.ITEMS){
    const own=prog.items.includes(it.id), b=document.createElement('button'); b.className='item'+(own?' own':prog.stars>=it.cost?' can':'');
    const e=document.createElement('span'); e.className='ie'; e.textContent=it.e;
    const n=document.createElement('span'); n.className='in'; n.textContent=it[LANG];
    const c=document.createElement('span'); c.className='ic'; c.textContent=own?T.own:`★ ${it.cost}`;
    b.append(e,n,c); b.disabled=own;
    b.onclick=()=>{ if(own) return; if(prog.stars<it.cost){ toast(T.need(it.cost-prog.stars)); SFX.no(); return; }
      prog.stars-=it.cost; prog.items.push(it.id); save(true); pushCloud(); SFX.win();
      const ri=roomView; if(roomDone(ri)&&ri+1<ROOMS.length){ toast(T.roomDone(ROOMS[ri+1][LANG])); } else if(!ITEMS.some(i=>!prog.items.includes(i.id))) toast(T.allDone); else toast(T.bought);
      fillDacha(); drawScene(); };
    box.appendChild(b);
  }
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
async function submitBest(){ if(!ysdk||!player||PF!=='yandex') return;
  try{ if(!(await ysdk.isAvailableMethod('leaderboards.setScore'))) return; await ysdk.leaderboards.setScore(BOARD,prog.level-1); }catch(e){} }
const isAuth=()=>{ try{ return !!(player&&player.isAuthorized&&player.isAuthorized()); }catch(e){ return false; } };
async function openBoard(){
  pushScreen('ovBoard'); const list=$('boardList'), msg=$('boardMsg'); list.innerHTML=''; msg.textContent=T.boardLoading;
  $('bAuth').classList.toggle('hide',isAuth()||!ysdk.auth);
  try{
    const res=await withTimeout(ysdk.leaderboards.getEntries(BOARD,{quantityTop:10,includeUser:true,quantityAround:2}),8000);
    const me=player&&player.getUniqueID?player.getUniqueID():null, es=(res&&res.entries)||[];
    msg.textContent=es.length?'':T.boardEmpty;
    for(const e of es){ const li=document.createElement('li'); if(me&&e.player&&e.player.uniqueID===me) li.className='me';
      const a=document.createElement('span'); a.className='rk'; a.textContent=e.rank;
      const b=document.createElement('span'); b.className='nm'; b.textContent=(e.player&&e.player.publicName)||T.anon;
      const c=document.createElement('span'); c.className='sc'; c.textContent=T.lvls(e.score); li.append(a,b,c); list.appendChild(li); }
    if(!isAuth()) msg.textContent=(msg.textContent?msg.textContent+' ':'')+T.boardGuest;
  }catch(e){ msg.textContent=T.boardErr; }
}
$('bAuth').onclick=async()=>{ if(!ysdk||!ysdk.auth) return;
  try{ await ysdk.auth.openAuthDialog(); player=await withTimeout(ysdk.getPlayer(),5000);
    const m=mergeSaves(prog,await loadCloud()); if(m) prog=m; save(true); await submitBest(); popScreen(); openBoard(); }catch(e){} };

// ================= запуск: SDK → язык → сохранения → меню → ready → ввод =================
function applyLang(){
  document.documentElement.lang=LANG;
  document.querySelectorAll('[data-t]').forEach(el=>{ const v=T[el.dataset.t]; if(typeof v==='string') el.textContent=v; });
  $('title').innerHTML=T.title; $('legalText').innerHTML=T.legal; document.title=T.title.replace('<br>',' ');
  $('bPause').setAttribute('aria-label',T.pause);
  if(PF==='ok') $('bBoard').classList.add('hide');       // у OK нет API рейтинга для HTML5-игр
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
    level=prog.level;
    try{ ysdk.on('game_api_pause',()=>setPause('platform',true)); ysdk.on('game_api_resume',()=>setPause('platform',false)); }catch(e){}
    try{ await withTimeout(document.fonts?document.fonts.ready:Promise.resolve(),3000); }catch(e){}
    newLevel(level); updHud(); sndLabels();
    $('ovBoot').classList.add('hide'); fillMenu(); pushScreen('ovMenu');
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    if(!readySent){ try{ ysdk.features.LoadingAPI.ready(); }catch(e){} readySent=true; }
    inputEnabled=true;
  }catch(e){
    const t=STR[resolveLang(navigator.language)]; $('bootMsg').textContent=t.bootErr; $('bRetry').textContent=t.retry; $('bRetry').classList.remove('hide');
  }
}
$('bRetry').onclick=boot;
layout(); requestAnimationFrame(frame); boot();
if(DEV) window.__mj={ LAYOUTS, ROOMS, deal, levelDef, get paused(){return [...pauseReasons]}, get tiles(){return tiles}, alive, isFree:t=>isFree(t,alive()), findPair, tap, tilePos,
  newLevel:n=>{ level=n; newLevel(n); }, get level(){return level}, get prog(){return prog}, get running(){return running}, get music(){return MUS&&MUS.playing}, get won(){return won} };
})();
