/* Котомерж — HTML5 game for Yandex Games / VK / OK (T&C STUDIO) */
(()=>{
'use strict';
const DEV=!!window.__KM_DEV__;
const $=id=>document.getElementById(id);

// ================= i18n =================
const STR={
 ru:{score:'Счёт',coins:'Монеты',paw:'Лапка',shake:'Встряска',
   intro:'Кидай котов в коробку. Два одинаковых кота сливаются в кота побольше. Дойдёшь до Кота-Космонавта?',
   controls:'Управление: веди мышью или пальцем и отпусти, чтобы бросить кота. Клавиатура: ← → и пробел.',
   play:'Играть',collection:'Коллекция',board:'Рейтинг',pause:'Пауза',resume:'Продолжить',menu:'В меню',
   full:'Коробка переполнена',best:'Рекорд',cont:'Реклама: освободить место и продолжить',again:'Ещё раз',back:'Назад',cancel:'Отмена',
   noCoins:'Не хватает монет',coinsOffer:'Посмотри рекламу и получи 40 монет на бустеры.',watchCoins:'Смотреть рекламу: +40 монет',
   sfxOn:'🔊 Звуки',sfxOff:'🔈 Звуки выкл',musOn:'🎵 Музыка',musOff:'🎵 Музыка выкл',
   newBest:'Новый рекорд!',newCat:'Новый кот!',next:'Далее',tapCat:'Нажми на кота, которого убрать',combo:n=>`Комбо ×${n}`,
   space:'Коты улетели в космос!',found:(a,b)=>`Найдено ${a} из ${b}`,locked:'???',got:n=>`+${n} монет!`,
   adNA:'Реклама сейчас недоступна, попробуй позже',boot:'Загрузка…',bootErr:'Не удалось загрузить игру. Проверь интернет и попробуй ещё раз.',retry:'Повторить',
   login:'Войти через Яндекс',boardLoading:'Загрузка рейтинга…',boardErr:'Рейтинг сейчас недоступен',boardEmpty:'Пока никого нет. Стань первым!',
   boardGuest:'Войди, чтобы твой рекорд попал в рейтинг',anon:'Игрок',legalBtn:'Конфиденциальность и соглашение',
   howTo:'Как играть',howToText:'Бросай котов в коробку. Одинаковые коты сливаются. Не дай коробке переполниться!',
   stamp:'КОТЫ · НЕ КАНТОВАТЬ',keys:'← → и пробел',
   gift:'Подарок',quests:'Задания',boxes:'Коробки',dailyT:'Ежедневный подарок',dailyX:'Заходи каждый день — подарки растут. Пропустишь день — начнёшь сначала.',
   day:n=>`День ${n}`,take:'Забрать',takeX2:'Забрать ×2 за рекламу',tomorrow:n=>`Завтра: +${n} монет`,streak:n=>`Дней подряд: ${n}`,
   questsT:'Задания дня',questsX:'Новые задания каждый день',claim:'Забрать',done:'✓',allBonus:'Все 3 задания',
   qMerge:v=>`Слей котов: ${v}`,qCat:v=>`Получи кота «${CATS[v].ru}»`,qCombo:v=>`Сделай комбо ×${v}`,qScore:v=>`Набери ${v} очков за партию`,
   qGames:v=>`Сыграй партий: ${v}`,qBoost:v=>`Используй бустеры: ${v}`,qDone:'Задание выполнено!',
   boxesT:'Коробки',boxNames:['Картонная','Корзинка','Подарочная','Космическая'],use:'Выбрать',inUse:'Выбрана',needCoins:n=>`Не хватает ${n} монет`,bought:'Новая коробка!',
   lvl:n=>`Уровень ${n}`,lvlUp:n=>`Уровень ${n}! +${n*20} монет`,xp:(a,b)=>`${a} / ${b}`,
   legal:`<h3>Политика конфиденциальности</h3>
<p>Игра «Котомерж» не собирает и не передаёт разработчику персональные данные игроков.</p>
<p>Прогресс (рекорд, монеты, открытые коты и настройки звука) хранится на устройстве игрока и в облачном хранилище Яндекс Игр, привязанном к аккаунту игрока, чтобы прогресс не терялся и был доступен на других устройствах.</p>
<p>Если игрок вошёл через Яндекс ID, в рейтинге показываются его публичное имя, аватар и рекорд — по правилам платформы Яндекс Игры.</p>
<p>Реклама показывается средствами платформы Яндекс Игры. Обработка данных при показе рекламы и авторизации регулируется политикой конфиденциальности Яндекса.</p>
<p>Удалить локальный прогресс можно, очистив данные сайта в настройках браузера.</p>
<h3>Лицензионное соглашение</h3>
<p>Игра предоставляется бесплатно для личного некоммерческого использования на платформе Яндекс Игры на условиях «как есть».</p>
<p>Все права на игру, её графику, звук и программный код принадлежат разработчику. Запрещено копировать, изменять, распространять игру или её части без разрешения разработчика.</p>
<p>Внутриигровые монеты не имеют денежной ценности и не могут быть обменяны на деньги, товары или услуги.</p>
<p>Разработчик не несёт ответственности за перебои в работе платформы и за потерю данных по причинам, не зависящим от разработчика.</p>
<p>Начиная игру, вы соглашаетесь с этими условиями.</p>`},
 en:{score:'Score',coins:'Coins',paw:'Paw',shake:'Shake',
   intro:'Drop cats into the box. Two identical cats merge into a bigger one. Can you reach the Astronaut Cat?',
   controls:'Controls: move the mouse or your finger and release to drop a cat. Keyboard: ← → and Space.',
   play:'Play',collection:'Collection',board:'Leaderboard',pause:'Paused',resume:'Resume',menu:'Main menu',
   full:'The box is full',best:'Best',cont:'Ad: make room and continue',again:'Start over',back:'Back',cancel:'Cancel',
   noCoins:'Not enough coins',coinsOffer:'Watch an ad to get 40 coins for boosters.',watchCoins:'Watch ad: +40 coins',
   sfxOn:'🔊 Sounds',sfxOff:'🔈 Sounds off',musOn:'🎵 Music',musOff:'🎵 Music off',
   newBest:'New record!',newCat:'New cat!',next:'Next',tapCat:'Tap the cat to remove',combo:n=>`Combo ×${n}`,
   space:'Cats flew into space!',found:(a,b)=>`Found ${a} of ${b}`,locked:'???',got:n=>`+${n} coins!`,
   adNA:'Ads are unavailable right now, try later',boot:'Loading…',bootErr:'Could not load the game. Check your connection and try again.',retry:'Retry',
   login:'Sign in with Yandex',boardLoading:'Loading leaderboard…',boardErr:'Leaderboard is unavailable right now',boardEmpty:'Nobody here yet. Be the first!',
   boardGuest:'Sign in to get your best score on the leaderboard',anon:'Player',legalBtn:'Privacy and terms',
   howTo:'How to play',howToText:'Drop cats into the box. Identical cats merge. Don’t let the box overflow!',
   stamp:'CATS · THIS SIDE UP',keys:'← → and Space',
   gift:'Gift',quests:'Quests',boxes:'Boxes',dailyT:'Daily gift',dailyX:'Come back every day — gifts grow. Miss a day and the streak restarts.',
   day:n=>`Day ${n}`,take:'Take',takeX2:'Take ×2 for an ad',tomorrow:n=>`Tomorrow: +${n} coins`,streak:n=>`Day streak: ${n}`,
   questsT:'Daily quests',questsX:'New quests every day',claim:'Claim',done:'✓',allBonus:'All 3 quests',
   qMerge:v=>`Merge cats: ${v}`,qCat:v=>`Get the ${CATS[v].en}`,qCombo:v=>`Make a ×${v} combo`,qScore:v=>`Score ${v} in one game`,
   qGames:v=>`Play games: ${v}`,qBoost:v=>`Use boosters: ${v}`,qDone:'Quest complete!',
   boxesT:'Boxes',boxNames:['Cardboard','Basket','Gift box','Space box'],use:'Use',inUse:'In use',needCoins:n=>`${n} more coins needed`,bought:'New box!',
   lvl:n=>`Level ${n}`,lvlUp:n=>`Level ${n}! +${n*20} coins`,xp:(a,b)=>`${a} / ${b}`,
   legal:`<h3>Privacy policy</h3>
<p>Kotomerge does not collect or send players’ personal data to the developer.</p>
<p>Progress (best score, coins, unlocked cats and sound settings) is stored on the player’s device and in Yandex Games cloud storage linked to the player’s account, so progress is kept and available on other devices.</p>
<p>If the player signs in with Yandex ID, the leaderboard shows their public name, avatar and best score according to Yandex Games rules.</p>
<p>Ads are shown by the Yandex Games platform. Data processing for ads and sign-in is governed by Yandex’s privacy policy.</p>
<p>You can delete local progress by clearing site data in your browser settings.</p>
<h3>License agreement</h3>
<p>The game is provided free of charge for personal non-commercial use on the Yandex Games platform “as is”.</p>
<p>All rights to the game, its graphics, sound and code belong to the developer. Copying, modifying or distributing the game or its parts without the developer’s permission is prohibited.</p>
<p>In-game coins have no monetary value and cannot be exchanged for money, goods or services.</p>
<p>The developer is not responsible for platform outages or data loss beyond the developer’s control.</p>
<p>By playing the game you agree to these terms.</p>`}
};
// ================= platform: yandex (default) | vk | ok — set by the build =================
const PF=window.__TC_PLATFORM||'yandex';
if(PF!=='yandex'){
  const NM={vk:{ru:'ВКонтакте',en:'VK'},ok:{ru:'Одноклассники',en:'OK'}}[PF];
  STR.ru.login='Войти'; STR.en.login='Sign in';
  STR.ru.legal=`<h3>Политика конфиденциальности</h3>
<p>Игра «Котомерж» не собирает и не передаёт разработчику персональные данные игроков.</p>
<p>Прогресс (рекорд, монеты, открытые коты и настройки звука) хранится на устройстве игрока и в хранилище платформы ${NM.ru}, привязанном к аккаунту игрока, чтобы прогресс не терялся и был доступен на других устройствах.</p>
${PF==='vk'?'<p>Таблица рекордов показывается средствами ВКонтакте: в ней видны имя, аватар и рекорд игрока по правилам платформы.</p>\n':''}<p>Реклама показывается средствами платформы ${NM.ru}. Обработка данных при показе рекламы регулируется политикой конфиденциальности платформы.</p>
<p>Удалить локальный прогресс можно, очистив данные сайта в настройках браузера.</p>
<h3>Лицензионное соглашение</h3>
<p>Игра предоставляется бесплатно для личного некоммерческого использования на платформе ${NM.ru} на условиях «как есть».</p>
<p>Все права на игру, её графику, звук и программный код принадлежат разработчику. Запрещено копировать, изменять, распространять игру или её части без разрешения разработчика.</p>
<p>Внутриигровые монеты не имеют денежной ценности и не могут быть обменяны на деньги, товары или услуги.</p>
<p>Разработчик не несёт ответственности за перебои в работе платформы и за потерю данных по причинам, не зависящим от разработчика.</p>
<p>Начиная игру, вы соглашаетесь с этими условиями.</p>`;
  STR.en.legal=`<h3>Privacy policy</h3>
<p>Kotomerge does not collect or send players’ personal data to the developer.</p>
<p>Progress (best score, coins, unlocked cats and sound settings) is stored on the player’s device and in ${NM.en} platform storage linked to the player’s account, so progress is kept and available on other devices.</p>
${PF==='vk'?'<p>The leaderboard is provided by VK and shows the player’s name, avatar and best score according to VK rules.</p>\n':''}<p>Ads are shown by the ${NM.en} platform. Data processing for ads is governed by the platform’s privacy policy.</p>
<p>You can delete local progress by clearing site data in your browser settings.</p>
<h3>License agreement</h3>
<p>The game is provided free of charge for personal non-commercial use on the ${NM.en} platform “as is”.</p>
<p>All rights to the game, its graphics, sound and code belong to the developer. Copying, modifying or distributing the game or its parts without the developer’s permission is prohibited.</p>
<p>In-game coins have no monetary value and cannot be exchanged for money, goods or services.</p>
<p>The developer is not responsible for platform outages or data loss beyond the developer’s control.</p>
<p>By playing the game you agree to these terms.</p>`;
}
const RU_LANGS=new Set(['ru','be','kk','uk','uz']);
function resolveLang(l){ l=String(l||'').toLowerCase().slice(0,2); return RU_LANGS.has(l)?'ru':'en'; }
if(DEV) window.__kmResolveLang=resolveLang;
let LANG='ru', T=STR.ru;

// ================= config =================
const W=420,H=760;                       // game column (logical units)
const BOX={l:26,r:394,top:196,bottom:688};
const LINE_Y=204, DROP_Y=150, G=1500;
const CATS=[
 {ru:'Котёнок',en:'Kitten',       r:15, c:'#f7dcb0', e:'#e9a88f'},
 {ru:'Рыжик',en:'Ginger',         r:21, c:'#f39c4a', e:'#ffcfa0', stripes:'#c96a1c'},
 {ru:'Дымок',en:'Smokey',         r:27, c:'#a3adb8', e:'#e7c0c4'},
 {ru:'Мурка',en:'Calico',         r:33, c:'#fffaf2', e:'#f3b7b7', calico:true},
 {ru:'Барсик',en:'Tabby',         r:40, c:'#8a6e5a', e:'#e0aaa0', stripes:'#5a4334'},
 {ru:'Сиамец',en:'Siamese',       r:48, c:'#f2e6d2', e:'#b98a78', mask:'#5a4034'},
 {ru:'Британец',en:'British',     r:57, c:'#8fa0b8', e:'#d4a7b0'},
 {ru:'Мейн-кун',en:'Maine Coon',  r:66, c:'#d08a4e', e:'#f0c29a', stripes:'#8a4f22', tufts:true},
 {ru:'Сфинкс',en:'Sphynx',        r:76, c:'#f0c0ae', e:'#d88a7a', wrinkles:true},
 {ru:'Кот-Царь',en:'King Cat',    r:87, c:'#ffc94a', e:'#ffe7a8', crown:true},
 {ru:'Кот-Космонавт',en:'Astronaut Cat', r:99, c:'#ffffff', e:'#ffc9d6', helmet:true},
];
const MAX=CATS.length-1;
const PTS=CATS.map((_,i)=>Math.round(3*Math.pow(2.1,i)));
const COST={paw:30,shake:20}, AD_COINS=40;
const BOARD='score';
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease={outBack:t=>{const c=1.70158,c3=c+1;return 1+c3*Math.pow(t-1,3)+c*Math.pow(t-1,2)}, outCubic:t=>1-Math.pow(1-t,3)};

// ================= platform (Yandex Games SDK) =================
let ysdk=null, player=null, inputEnabled=false, readySent=false, initPromise=null, playerPromise=null;
function sdkInit(){
  if(!initPromise) initPromise=Promise.resolve().then(()=>window.YaGames.init())
    .then(sdk=>{ ysdk=sdk; return sdk; }).catch(err=>{ initPromise=null; throw err; });
  return initPromise;
}
function getPlayer(){
  if(!playerPromise) playerPromise=Promise.resolve().then(()=>ysdk.getPlayer()).catch(err=>{ playerPromise=null; throw err; });
  return playerPromise;
}

// ================= saves: local (safe storage) + cloud =================
const SAVE_KEY='km_save_v1';
let prog={best:0,coins:60,unlocked:0,sfx:true,mus:true,ts:0,games:0,xp:0,box:0,owned:[0],daily:{last:0,streak:0,shown:0},q:null};
let storage=null;
function sanitize(p){ if(!p||typeof p!=='object') return null;
  const n=(v,d,mx)=>Number.isFinite(+v)?Math.max(0,Math.min(mx,Math.floor(+v))):d;
  const d=p.daily||{}, q=p.q&&typeof p.q==='object'&&Array.isArray(p.q.list)?p.q:null;
  return {best:n(p.best,0,1e12),coins:n(p.coins,60,1e9),unlocked:n(p.unlocked,0,MAX),sfx:p.sfx!==false,mus:p.mus!==false,ts:n(p.ts,0,9e15),
    games:n(p.games,0,1e9),xp:n(p.xp,0,1e12),box:n(p.box,0,3),owned:Array.isArray(p.owned)?[...new Set([0,...p.owned.map(x=>n(x,0,3))])]:[0],
    daily:{last:n(d.last,0,1e9),streak:n(d.streak,0,1e6),shown:n(d.shown,0,1e9)},
    q:q?{date:n(q.date,0,1e9),bonus:!!q.bonus,list:q.list.slice(0,3).map(x=>({t:String(x.t),v:n(x.v,1,1e7),r:n(x.r,0,1e4),p:n(x.p,0,1e9),c:!!x.c}))}:null}; }
function mergeSaves(a,b){ if(!a) return b; if(!b) return a;
  const base=(b.ts>a.ts)?{...b}:{...a};
  base.best=Math.max(a.best,b.best); base.unlocked=Math.max(a.unlocked,b.unlocked); base.xp=Math.max(a.xp,b.xp); base.games=Math.max(a.games,b.games);
  base.owned=[...new Set([...a.owned,...b.owned])]; return base; }
function localRead(){ try{ const s=(storage||localStorage).getItem(SAVE_KEY); return s?sanitize(JSON.parse(s)):null; }catch(e){ return null; } }
function localWrite(){ try{ (storage||localStorage).setItem(SAVE_KEY,JSON.stringify(prog)); }catch(e){} }
let cloudTimer=0, cloudBusy=false, cloudDirty=false, lastCloud=0;
function save(important){ prog.ts=Date.now(); localWrite(); cloudDirty=true; scheduleCloud(important); }
function scheduleCloud(important){
  if(!player) return;
  const gap=important?3200:10000, wait=Math.max(0,gap-(Date.now()-lastCloud));
  clearTimeout(cloudTimer); cloudTimer=setTimeout(pushCloud,wait);
}
async function pushCloud(){
  if(!player||!cloudDirty) return;
  if(cloudBusy||Date.now()-lastCloud<3000){ scheduleCloud(true); return; }
  cloudBusy=true; cloudDirty=false; lastCloud=Date.now();
  try{ await player.setData({save:prog},true); }
  catch(e){ cloudDirty=true; }
  finally{ cloudBusy=false; }
}
async function loadCloud(){
  if(!player) return null;
  try{ const d=await withTimeout(player.getData(['save']),5000); return sanitize(d&&d.save); }catch(e){ return null; }
}
async function loadPlayer(){
  try{ player=await withTimeout(getPlayer(),5000); }catch(e){ player=null; }
}
function withTimeout(p,ms){ return Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms))]); }

// ================= layout =================
const cv=$('c'), ctx=cv.getContext('2d'), col=$('col');
let S=1, VW=W, VH=H, OX=0, OY=0, DPR=1;
function resize(){
  const vw=Math.max(1,innerWidth), vh=Math.max(1,innerHeight);
  S=Math.min(vw/W, vh/H); VW=vw/S; VH=vh/S; OX=(VW-W)/2; OY=(VH-H)/2;
  DPR=Math.min(window.devicePixelRatio||1,2.5);
  cv.width=Math.floor(vw*DPR); cv.height=Math.floor(vh*DPR);
  cv.style.width=vw+'px'; cv.style.height=vh+'px';
  Object.assign(col.style,{left:(OX*S)+'px',top:(OY*S)+'px',width:(W*S)+'px',height:(H*S)+'px'});
  const root=document.documentElement.style;
  root.setProperty('--fs',(15.5*S)+'px'); root.setProperty('--colw',Math.min(vw,W*S*1.05)+'px');
  paintBg();
}
addEventListener('resize',resize);
addEventListener('orientationchange',()=>setTimeout(resize,200));

// ================= audio: buses + synth (Web Audio only) =================
let A=null, blurred=false;
function audio(){
  if(A) return A;
  try{
    const ac=new (window.AudioContext||window.webkitAudioContext)();
    const master=ac.createGain(); master.gain.value=0.8;
    const comp=ac.createDynamicsCompressor(); comp.threshold.value=-10; comp.ratio.value=6;
    master.connect(comp); comp.connect(ac.destination);
    const sfx=ac.createGain(); sfx.gain.value=prog.sfx?1:0; sfx.connect(master);
    const mus=ac.createGain(); mus.gain.value=prog.mus?0.35:0; mus.connect(master);
    A={ac,master,sfx,mus};
    applyState();
  }catch(e){ A=null; }
  return A;
}
const PENTA=[0,2,4,7,9];
const noteHz=(i,base=392)=>base*Math.pow(2,(Math.floor(i/5)*12+PENTA[((i%5)+5)%5])/12);
function tone({f,dur=.15,type='sine',vol=.2,bus='sfx',slide=1,attack=.005,when=0,filter=0}){
  if(!A||A.ac.state!=='running') return;
  const a=A, t=a.ac.currentTime+when;
  const o=a.ac.createOscillator(), g=a.ac.createGain();
  o.type=type; o.frequency.setValueAtTime(f,t);
  if(slide!==1) o.frequency.exponentialRampToValueAtTime(f*slide,t+dur);
  g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+attack); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  let node=o;
  if(filter){ const bq=a.ac.createBiquadFilter(); bq.type='lowpass'; bq.frequency.value=filter; o.connect(bq); node=bq; }
  node.connect(g); g.connect(a[bus]); o.start(t); o.stop(t+dur+.02);
}
const vary=()=>0.95+Math.random()*0.1;
const SFX={
  drop(){ tone({f:520*vary(),dur:.09,type:'triangle',vol:.12,slide:.7}); },
  land(v){ tone({f:110*vary(),dur:.1,type:'sine',vol:Math.min(.18,.04+v*.02),slide:.6}); },
  merge(lvl,combo){ const f=noteHz(lvl+combo)*vary(); tone({f,dur:.18,type:'sine',vol:.22,slide:1.25}); tone({f:f*2,dur:.12,type:'triangle',vol:.06,when:.02}); },
  big(){ [0,4,7,12].forEach((s,i)=>tone({f:392*Math.pow(2,s/12),dur:.35,type:'triangle',vol:.14,when:i*.07})); },
  meow(){ if(!A||A.ac.state!=='running') return; const a=A, t=a.ac.currentTime;
    const o=a.ac.createOscillator(), g=a.ac.createGain(), bq=a.ac.createBiquadFilter();
    o.type='sawtooth'; bq.type='bandpass'; bq.Q.value=4;
    o.frequency.setValueAtTime(520,t); o.frequency.linearRampToValueAtTime(820,t+.12); o.frequency.exponentialRampToValueAtTime(430,t+.5);
    bq.frequency.setValueAtTime(900,t); bq.frequency.linearRampToValueAtTime(1800,t+.15); bq.frequency.linearRampToValueAtTime(700,t+.5);
    g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.35,t+.05); g.gain.exponentialRampToValueAtTime(.0001,t+.55);
    o.connect(bq); bq.connect(g); g.connect(a.sfx); o.start(t); o.stop(t+.6); },
  pop(){ tone({f:880,dur:.12,type:'square',vol:.07,slide:.5,filter:2000}); },
  whoosh(){ tone({f:180,dur:.35,type:'sawtooth',vol:.08,slide:2.2,filter:900}); },
  coin(){ tone({f:988,dur:.08,type:'square',vol:.06,filter:3000}); tone({f:1319,dur:.16,type:'square',vol:.06,filter:3000,when:.07}); },
  over(){ [7,4,2,0].forEach((s,i)=>tone({f:330*Math.pow(2,s/12),dur:.3,type:'triangle',vol:.12,when:i*.12})); },
};
const CHORDS=[[0,4,7],[5,9,12],[7,11,14],[4,7,12]];
let musT=0, musStep=0;
function musicTick(dt){
  if(!A||!prog.mus||audioHeld()) return;
  musT-=dt; if(musT>0) return;
  musT=0.42;
  const ch=CHORDS[Math.floor(musStep/8)%CHORDS.length];
  if(musStep%8===0) tone({f:131*Math.pow(2,ch[0]/12),dur:1.6,type:'sine',vol:.18,bus:'mus',attack:.05});
  if(Math.random()<.7){ const n=ch[Math.floor(Math.random()*3)]+(Math.random()<.5?12:0); tone({f:262*Math.pow(2,n/12),dur:.6,type:'triangle',vol:.1,bus:'mus',filter:2400}); }
  musStep++;
}
function setBus(){ if(!A) return; const t=A.ac.currentTime;
  A.sfx.gain.setTargetAtTime(prog.sfx?1:0,t,.05); A.mus.gain.setTargetAtTime(prog.mus?0.35:0,t,.2); }

// ================= pause reasons, screens, GameplayAPI =================
// Overlapping reasons: 'menu' (screen stack), 'hidden' (tab), 'ad', 'platform' (game_api_pause).
const pauseReasons=new Set();
const paused=()=>pauseReasons.size>0;
const audioHeld=()=>pauseReasons.has('hidden')||pauseReasons.has('ad')||pauseReasons.has('platform')||blurred;
let gpActive=false;
function suspendAudio(){ try{ if(A&&A.ac.state==='running') A.ac.suspend(); }catch(e){} }
function pauseGameForAd(){ setPause('ad',true); suspendAudio(); }   // physics, input, music and GameplayAPI stop
function setPause(reason,on){ if(on) pauseReasons.add(reason); else pauseReasons.delete(reason); applyState(); }
function applyState(){
  if(A){
    try{
      if(audioHeld()){ if(A.ac.state==='running') A.ac.suspend(); }
      else if(A.ac.state==='suspended') A.ac.resume();
    }catch(e){}
  }
  const active=running&&!paused();
  if(active!==gpActive){
    gpActive=active;
    try{ const gp=ysdk&&ysdk.features&&ysdk.features.GameplayAPI; if(gp){ active?gp.start():gp.stop(); } }catch(e){}
  }
}
document.addEventListener('visibilitychange',()=>{ setPause('hidden',document.hidden); if(document.hidden){ localWrite(); if(cloudDirty) pushCloud(); } });
addEventListener('blur',()=>{ blurred=true; applyState(); });
addEventListener('focus',()=>{ blurred=false; applyState(); });
addEventListener('pagehide',()=>{ localWrite(); });

const stack=[];
function pushScreen(id){
  const top=stack[stack.length-1]; if(top) $(top).classList.add('hide');
  stack.push(id); $(id).classList.remove('hide'); setPause('menu',true);
  const f=$(id).querySelector('.btn:not(.hide):not([disabled])'); if(f) f.focus({preventScroll:true});
}
function popScreen(){
  const id=stack.pop(); if(id) $(id).classList.add('hide');
  const top=stack[stack.length-1];
  if(top){ $(top).classList.remove('hide'); const f=$(top).querySelector('.btn:not(.hide):not([disabled])'); if(f) f.focus({preventScroll:true}); }
  else setPause('menu',false);
}
function clearScreens(){ while(stack.length) $(stack.pop()).classList.add('hide'); setPause('menu',false); }
function toMenu(){ clearScreens(); running=false; bodies=[]; applyState(); pushScreen('ovStart'); refreshBadges(); maybeDaily(); }

let toastT=0;
function toast(msg){ const el=$('toast'); el.textContent=msg; el.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('show'),2200); }

// ================= ads (only via SDK) =================
let adBusy=false;
function showInterstitial(then){
  if(!ysdk||adBusy){ then(); return; }
  adBusy=true; save(true);
  let done=false;
  const fin=()=>{ if(done) return; done=true; adBusy=false; setPause('ad',false); then(); };
  try{
    ysdk.adv.showFullscreenAdv({ callbacks:{
      onOpen(){ pauseGameForAd(); },
      onClose(){ fin(); },
      onError(){ fin(); },
      onOffline(){ fin(); }
    }});
  }catch(e){ fin(); }
}
function showRewarded(onReward,onDone){
  if(!ysdk||adBusy){ if(!adBusy) toast(T.adNA); return; }
  adBusy=true; save(true);
  let rewarded=false, done=false;
  const fin=(failed)=>{ if(done) return; done=true; adBusy=false; setPause('ad',false);
    if(!rewarded&&failed) toast(T.adNA); if(onDone) onDone(rewarded); };
  try{
    ysdk.adv.showRewardedVideo({ callbacks:{
      onOpen(){ pauseGameForAd(); },
      onRewarded(){ if(rewarded) return; rewarded=true; onReward(); },   // reward ONLY here, once
      onClose(){ fin(false); },
      onError(){ fin(true); }
    }});
  }catch(e){ fin(true); }
}

// ================= leaderboard =================
async function submitBest(){
  if(!ysdk||!player||prog.best<=0) return;
  try{
    if(!(await ysdk.isAvailableMethod('leaderboards.setScore'))) return;
    await ysdk.leaderboards.setScore(BOARD,prog.best);
  }catch(e){}
}
async function isAuthorized(){ try{ return !!(player&&player.isAuthorized&&player.isAuthorized()); }catch(e){ return false; } }
async function openBoard(){
  pushScreen('ovBoard');
  const list=$('boardList'), msg=$('boardMsg'), auth=$('bAuth');
  list.innerHTML=''; msg.textContent=T.boardLoading;
  auth.classList.toggle('hide',await isAuthorized()||!ysdk||!ysdk.auth);
  try{
    const res=await withTimeout(ysdk.leaderboards.getEntries(BOARD,{quantityTop:10,includeUser:true,quantityAround:2}),8000);
    const myId=player&&player.getUniqueID?player.getUniqueID():null;
    const entries=(res&&res.entries)||[];
    msg.textContent=entries.length?'':T.boardEmpty;
    for(const e of entries){
      const li=document.createElement('li');
      if(myId&&e.player&&e.player.uniqueID===myId) li.className='me';
      const rk=document.createElement('span'); rk.className='rk'; rk.textContent=e.rank;
      const nm=document.createElement('span'); nm.className='nm'; nm.textContent=(e.player&&e.player.publicName)||T.anon;
      const sc=document.createElement('span'); sc.className='sc'; sc.textContent=e.formattedScore||e.score;
      li.append(rk,nm,sc); list.appendChild(li);
    }
    if(!(await isAuthorized())) msg.textContent=(msg.textContent?msg.textContent+' ':'')+T.boardGuest;
  }catch(e){ msg.textContent=T.boardErr; }
}
async function doAuth(){
  if(!ysdk||!ysdk.auth) return;
  try{
    await ysdk.auth.openAuthDialog();
    playerPromise=null; await loadPlayer();
    const cloud=await loadCloud(); const m=mergeSaves(prog,cloud); if(m) prog=m;
    save(true); updHud(); await submitBest();
    popScreen(); openBoard();
  }catch(e){}
}

// ================= game state =================
let bodies=[], parts=[], rings=[], floats=[], score=0, shownScore=0, nextLvl=0, curLvl=0, aimX=W/2, cooldown=0,
    running=false, danger=0, bombMode=false, contUsed=false, idc=1, time=0,
    trauma=0, hitStop=0, flash=0, combo=0, comboT=0, landThrottle=0, banner=null, gamesPlayed=0;

function rndLvl(){ const r=Math.random(); return r<.32?0:r<.6?1:r<.8?2:r<.93?3:4; }
function newGame(){
  bodies=[]; parts=[]; rings=[]; floats=[]; score=0; shownScore=0; $('score').textContent='0';
  danger=0; contUsed=false; bombMode=false; combo=0; banner=null; xpGiven=0; counted=false;
  curLvl=rndLvl(); nextLvl=rndLvl(); cooldown=0.3; running=true; gamesPlayed++;
  clearScreens(); audio(); updHud(); applyState();
}
function updHud(){
  $('coins').textContent=prog.coins;
  $('bSfx').textContent=prog.sfx?T.sfxOn:T.sfxOff;
  $('bMus').textContent=prog.mus?T.musOn:T.musOff;
  $('bBomb').classList.toggle('on',bombMode);
}
function say(txt,x=W/2,y=300,col='#fff',size=26){ floats.push({x,y,t:1.4,txt,col,size,big:true}); }

function addBody(x,y,lvl,vy=0){
  const r=CATS[lvl].r;
  const b={id:idc++,x,y,px:x,py:y-vy/120,r,lvl,a:0,pa:0,age:0,popT:1,sq:0,sqv:0,lvy:0,blink:Math.random()*4,dead:false};
  bodies.push(b); return b;
}
function drop(){
  if(!inputEnabled||!running||paused()||cooldown>0||bombMode) return;
  const r=CATS[curLvl].r;
  const x=Math.max(BOX.l+r,Math.min(BOX.r-r,aimX));
  const b=addBody(x,DROP_Y,curLvl,120); b.sq=-0.12;
  SFX.drop();
  curLvl=nextLvl; nextLvl=rndLvl(); cooldown=0.42;
}

// ================= physics (Verlet, fixed step) =================
function step(dt){
  const dt2=dt*dt;
  for(const b of bodies){
    const vx=(b.x-b.px)*0.996, vy=(b.y-b.py)*0.996;
    b.lvy=vy; b.px=b.x; b.py=b.y;
    b.x+=vx; b.y+=vy+G*dt2;
    const va=(b.a-b.pa)*0.985; b.pa=b.a; b.a+=va;
    b.age+=dt;
  }
  const merges=[];
  for(let it=0;it<4;it++){
    for(let i=0;i<bodies.length;i++){
      const a=bodies[i]; if(a.dead) continue;
      for(let j=i+1;j<bodies.length;j++){
        const b=bodies[j]; if(b.dead) continue;
        const dx=b.x-a.x, dy=b.y-a.y, rr=a.r+b.r;
        if(Math.abs(dx)>rr||Math.abs(dy)>rr) continue;
        const d2=dx*dx+dy*dy;
        if(d2>=rr*rr||d2===0) continue;
        const d=Math.sqrt(d2);
        if(a.lvl===b.lvl && !a.merging && !b.merging){ a.merging=b.merging=true; merges.push([a,b]); continue; }
        const ov=rr-d, nx=dx/d, ny=dy/d;
        const ma=a.r*a.r, mb=b.r*b.r, s=ma+mb;
        a.x-=nx*ov*(mb/s); a.y-=ny*ov*(mb/s);
        b.x+=nx*ov*(ma/s); b.y+=ny*ov*(ma/s);
        const tv=((b.x-b.px)-(a.x-a.px))*-ny+((b.y-b.py)-(a.y-a.py))*nx;
        a.a+=tv*0.002; b.a-=tv*0.002;
      }
    }
    for(const b of bodies){
      if(b.x-b.r<BOX.l) b.x=BOX.l+b.r;
      if(b.x+b.r>BOX.r) b.x=BOX.r-b.r;
      if(b.y+b.r>BOX.bottom){
        b.y=BOX.bottom-b.r;
        const vx=b.x-b.px; b.px=b.x-vx*0.9;
        b.a+=vx/b.r*0.5;
      }
    }
  }
  for(const b of bodies){ const vx=b.x-b.px, vy=b.y-b.py, v=Math.hypot(vx,vy), vmax=9;
    if(v>vmax){ b.px=b.x-vx/v*vmax; b.py=b.y-vy/v*vmax; } if(vy<-4) b.py=b.y+4; }
  for(const b of bodies){
    const vy=b.y-b.py, dv=b.lvy-vy;
    if(dv>2.2 && b.age>0.05){
      b.sqv+=Math.min(5,dv*0.6);
      if(landThrottle<=0 && dv>3){ SFX.land(dv); landThrottle=0.06; }
    }
  }
  for(const [a,b] of merges){ if(a.dead||b.dead) continue; a.dead=b.dead=true; doMerge(a,b); }
  for(const b of bodies) b.merging=false;
  if(merges.length) bodies=bodies.filter(b=>!b.dead);
}

function doMerge(a,b){
  const x=(a.x+b.x)/2, y=(a.y+b.y)/2, lvl=a.lvl+1;
  combo=comboT>0?combo+1:1; comboT=1.1; quest('merge',1); if(combo>=2) quest('combo',combo);
  const mult=1+0.5*(Math.min(combo,6)-1);
  if(a.lvl<MAX){
    const nb=addBody(x,y,lvl); nb.popT=0; nb.age=1; nb.sq=-0.2;
    gain(Math.round(PTS[lvl]*mult),lvl,x,y);
    const tier=lvl>=7?'large':lvl>=4?'medium':'small';
    feedback(tier,x,y,CATS[lvl].c,CATS[a.lvl].c);
    SFX.merge(lvl,Math.min(combo-1,5));
    if(combo>=2){ floats=floats.filter(f=>!f.combo); floats.push({x:Math.max(90,Math.min(W-90,x)),y:y-CATS[lvl].r-26,t:1.2,txt:T.combo(combo),col:'#ffd23f',size:20+Math.min(combo,6)*1.5,big:true,combo:true}); }
    quest('cat',lvl);
    if(lvl>prog.unlocked){ prog.unlocked=lvl; save(true); banner={lvl,t:0}; setTimeout(()=>SFX.meow(),120); }
  } else {
    gain(PTS[MAX]*3,MAX,x,y);
    feedback('large',x,y,'#ffd23f','#7bd3ff'); for(let k=0;k<50;k++) spark(x,y,k%2?'#ffd23f':'#7bd3ff',1.6);
    say(T.space,W/2,320,'#ffd23f',26);
  }
}
function feedback(tier,x,y,col,col2){
  const k=REDUCED?0.35:1;
  if(tier==='small'){ addTrauma(0.12*k); for(let i=0;i<8;i++) spark(x,y,i%2?col:col2,0.8); }
  if(tier==='medium'){ addTrauma(0.32*k); for(let i=0;i<16;i++) spark(x,y,i%2?col:col2,1.1); rings.push({x,y,t:0,r0:20,r1:110}); }
  if(tier==='large'){ addTrauma(0.7*k); hitStop=0.09; flash=REDUCED?0:0.5; for(let i=0;i<34;i++) spark(x,y,i%2?col:col2,1.5);
    rings.push({x,y,t:0,r0:30,r1:200}); SFX.big(); }
}
const addTrauma=v=>{ trauma=Math.min(1,trauma+v); };
function gain(p,lvl,x,y){
  score+=p; prog.coins+=lvl+1;
  floats.push({x:x+(Math.random()-.5)*20,y,t:1,txt:'+'+p,col:'#fff',size:18+Math.min(lvl,8)*1.5});
  if(score>prog.best) prog.best=score;
  save(false); updHud();
}
function spark(x,y,col,pow=1){ const a=Math.random()*6.283, s=(70+Math.random()*200)*pow;
  parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-90*pow,t:0.5+Math.random()*0.4,col,r:2.5+Math.random()*2.5*pow}); }

function checkOver(dt){
  let over=false;
  for(const b of bodies){ if(b.age>1.2 && b.y-b.r<LINE_Y){ over=true; break; } }
  danger=over?danger+dt:Math.max(0,danger-dt*2);
  if(danger>2.6) gameOver();
}
let bestAtStart=0, xpGiven=0, counted=false;
function gameOver(){
  running=false; danger=0; bombMode=false;
  $('oScore').textContent=score; $('oBest').textContent=prog.best;
  const isNew=score>0&&score>=prog.best&&score>bestAtStart;
  $('oNew').textContent=isNew?T.newBest:'';
  $('bCont').classList.toggle('hide',contUsed);
  if(!counted){ counted=true; prog.games++; quest('games',1); } quest('score',score); addXP(score-xpGiven); xpGiven=score; save(true); if(isNew) submitBest();
  pushScreen('ovOver'); SFX.over(); updHud();
}
function doContinue(){
  contUsed=true;
  const lim=BOX.top+(BOX.bottom-BOX.top)*0.45;
  bodies.forEach(b=>{ if(b.y<lim){ b.dead=true; for(let k=0;k<8;k++) spark(b.x,b.y,CATS[b.lvl].c); } });
  bodies=bodies.filter(b=>!b.dead);
  running=true; cooldown=0.5; clearScreens(); SFX.whoosh(); applyState();
}
function startGame(){ bestAtStart=prog.best; newGame(); }

// ================= boosts =================
function spend(n){ if(prog.coins<n){ pushScreen('ovCoins'); return false; } return true; }
$('bBomb').onclick=e=>{ e.stopPropagation(); if(!inputEnabled||!running||paused()) return;
  if(bombMode){ bombMode=false; updHud(); return; }
  if(!spend(COST.paw)) return;
  bombMode=true; updHud(); say(T.tapCat,W/2,300,'#fff',19);
};
$('bShake').onclick=e=>{ e.stopPropagation(); if(!inputEnabled||!running||paused()) return;
  if(!spend(COST.shake)) return;
  prog.coins-=COST.shake; quest('boost',1); save(false); updHud(); addTrauma(REDUCED?0.2:0.55);
  for(const b of bodies){ b.py=b.y+(8+Math.random()*10); b.px=b.x+(Math.random()-.5)*14; }
  SFX.whoosh();
};
$('bAdCoins').onclick=()=>{ showRewarded(()=>{ prog.coins+=AD_COINS; save(true); updHud(); },
  (ok)=>{ if(ok){ popScreen(); toast(T.got(AD_COINS)); SFX.coin(); } }); };
$('bCoinsClose').onclick=popScreen;

// ================= возвращение игрока: подарок дня, задания, коробки, уровень =================
const DAILY=[50,75,100,150,200,250,500];
const dayKey=(d=new Date())=>d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
const yesterKey=()=>{ const d=new Date(); d.setDate(d.getDate()-1); return dayKey(d); };
function dailyState(){ const D=prog.daily, today=dayKey();
  if(D.last===today) return {can:false,day:((D.streak-1)%7)+1,next:DAILY[D.streak%7]};
  const streak=D.last===yesterKey()?D.streak+1:1; return {can:true,streak,day:((streak-1)%7)+1,amount:DAILY[(streak-1)%7]}; }
function fillDaily(){ const st=dailyState(), box=$('dailyGrid'); box.innerHTML='';
  const cur=st.can?st.day:st.day;
  DAILY.forEach((a,i)=>{ const c=document.createElement('div'); const n=i+1;
    c.className='dcell'+(n<cur||(!st.can&&n===cur)?' got':'')+(st.can&&n===cur?' now':'')+(n===7?' big':'');
    c.innerHTML=`<small>${T.day(n)}</small><b>${n===7?'🎁':'🪙'}</b><span>+${a}</span>`; box.appendChild(c); });
  $('dailyStreak').textContent=T.streak(st.can?st.streak:prog.daily.streak);
  $('bDailyTake').classList.toggle('hide',!st.can); $('bDailyAd').classList.toggle('hide',!st.can);
  $('dailyNext').textContent=st.can?'':T.tomorrow(st.next); }
function claimDaily(x2){ const st=dailyState(); if(!st.can) return;
  const give=()=>{ prog.daily.last=dayKey(); prog.daily.streak=st.streak; prog.coins+=st.amount; save(true); updHud(); SFX.coin(); };
  if(!x2){ give(); toast(T.got(st.amount)); popScreen(); refreshBadges(); return; }
  showRewarded(()=>{ give(); prog.coins+=st.amount; save(true); updHud(); },ok=>{ if(ok){ toast(T.got(st.amount*2)); popScreen(); refreshBadges(); } }); }
$('bDailyTake').onclick=()=>claimDaily(false);
$('bDailyAd').onclick=()=>claimDaily(true);
$('bGift').onclick=()=>{ fillDaily(); pushScreen('ovDaily'); };

// задания дня: 3 штуки, одинаковые для дня, лёгкое / среднее / сложное
const QPOOL={merge:{v:[80,150,250],r:[60,100,150]},cat:{v:[6,7,8],r:[60,100,150]},combo:{v:[3,4,5],r:[60,100,150]},
  score:{v:[10000,20000,35000],r:[60,100,150]},games:{v:[2,3,5],r:[50,80,120]},boost:{v:[1,2,4],r:[50,80,120]}};
const QBONUS=300;
const mul32=a=>()=>{ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; };
function ensureQuests(){ const today=dayKey(); if(prog.q&&prog.q.date===today) return;
  const rnd=mul32(today*31+7), types=Object.keys(QPOOL); for(let i=types.length-1;i>0;i--){ const j=(rnd()*(i+1))|0; [types[i],types[j]]=[types[j],types[i]]; }
  prog.q={date:today,bonus:false,list:types.slice(0,3).map((t,d)=>({t,v:QPOOL[t].v[d],r:QPOOL[t].r[d],p:0,c:false}))}; save(); }
const MAXTYPE={cat:1,combo:1,score:1};
function quest(type,val){ ensureQuests(); let hit=false;
  for(const q of prog.q.list){ if(q.t!==type||q.p>=q.v) continue; const before=q.p;
    q.p=MAXTYPE[type]?Math.max(q.p,val):q.p+val; if(q.p>=q.v&&before<q.v){ q.p=q.v; hit=true; } }
  if(hit){ toast(T.qDone); SFX.coin(); save(true); refreshBadges(); } }
const qText=q=>({merge:T.qMerge,cat:T.qCat,combo:T.qCombo,score:T.qScore,games:T.qGames,boost:T.qBoost})[q.t](q.v);
function fillQuests(){ ensureQuests(); const box=$('questList'); box.innerHTML='';
  prog.q.list.forEach((q,i)=>{ const row=document.createElement('div'); row.className='qrow';
    const prc=Math.min(1,q.p/q.v), shown=q.t==='cat'?(q.p>=q.v?1:0):Math.min(q.p,q.v), of=q.t==='cat'?1:q.v;
    row.innerHTML=`<div class="qt">${qText(q)}</div><div class="qbar"><i style="width:${prc*100}%"></i></div><div class="qn">${shown} / ${of}</div>`;
    const b=document.createElement('button'); b.className='btn qb'+(q.c?' ghost':'');
    b.textContent=q.c?T.done:(q.p>=q.v?`${T.claim} +${q.r}`:`🪙 ${q.r}`); b.disabled=q.c||q.p<q.v;
    b.onclick=()=>{ if(q.c||q.p<q.v) return; q.c=true; prog.coins+=q.r; save(true); updHud(); SFX.coin(); toast(T.got(q.r)); fillQuests(); refreshBadges(); };
    row.appendChild(b); box.appendChild(row); });
  const all=prog.q.list.every(q=>q.c), bb=$('bQBonus');
  bb.disabled=!all||prog.q.bonus; bb.textContent=prog.q.bonus?`${T.allBonus} ${T.done}`:`🎁 ${T.allBonus}: +${QBONUS}`;
  bb.onclick=()=>{ if(!all||prog.q.bonus) return; prog.q.bonus=true; prog.coins+=QBONUS; save(true); updHud(); SFX.coin(); toast(T.got(QBONUS)); fillQuests(); refreshBadges(); }; }
$('bQuests').onclick=()=>{ fillQuests(); pushScreen('ovQuests'); };

// коробки (косметика за монеты)
const BOXES=[
 {cost:0,   ig:['#8c5a2e','#5c3719'],line:'#00000018',flap:'#b77b40',flapS:'#7a4a22',wall:['#d69a5a','#b0773f'],base:'#c68a4c',baseL:'#7a4a22',tape:'#e8d9a866',stamp:'#2a0f05'},
 {cost:2000, ig:['#c49250','#7a5520'],line:'#5a3a1033',flap:'#e0b46a',flapS:'#8a5e22',wall:['#e8bf74','#b5833c'],base:'#d4a258',baseL:'#8a5e22',tape:'#ff8fa3cc',stamp:'#4a2a08',weave:true},
 {cost:5000, ig:['#e2556f','#a3263f'],line:'#ffffff12',flap:'#ff7a90',flapS:'#a3263f',wall:['#ff8fa3','#d84a66'],base:'#e8657e',baseL:'#a3263f',tape:'#ffd23fdd',stamp:'#5a0f1f',ribbon:true},
 {cost:10000, ig:['#2b2f7a','#121440'],line:'#7bd3ff10',flap:'#5b63c9',flapS:'#2b2f7a',wall:['#8a93ff','#4b52b8'],base:'#6a72e0',baseL:'#2b2f7a',tape:'#7bd3ff99',stamp:'#cfd4ff',stars:true},
];
function drawBoxMini(g,w,h,B){ g.clearRect(0,0,w,h); const L=w*.14,R=w*.86,Tp=h*.3,Bt=h*.86;
  const ig=g.createLinearGradient(0,Tp,0,Bt); ig.addColorStop(0,B.ig[0]); ig.addColorStop(1,B.ig[1]); g.fillStyle=ig; g.fillRect(L,Tp,R-L,Bt-Tp);
  if(B.stars){ g.fillStyle='#ffffffaa'; for(let i=0;i<14;i++){ g.beginPath(); g.arc(L+((i*37)%100)/100*(R-L),Tp+((i*53)%100)/100*(Bt-Tp),1.4,0,7); g.fill(); } }
  if(B.weave){ g.strokeStyle=B.line; g.lineWidth=2; for(let y=Tp+6;y<Bt;y+=8){ g.beginPath(); g.moveTo(L,y); g.lineTo(R,y); g.stroke(); } }
  if(B.ribbon){ g.fillStyle=B.tape; g.fillRect(w/2-w*.06,Tp,w*.12,Bt-Tp); }
  g.fillStyle=B.flap; g.strokeStyle=B.flapS; g.lineWidth=2;
  g.beginPath(); g.moveTo(L-4,Tp); g.lineTo(L+w*.2,Tp); g.lineTo(L+w*.12,Tp-h*.16); g.lineTo(L-w*.08,Tp-h*.14); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(R+4,Tp); g.lineTo(R-w*.2,Tp); g.lineTo(R-w*.12,Tp-h*.16); g.lineTo(R+w*.08,Tp-h*.14); g.closePath(); g.fill(); g.stroke();
  const wg=g.createLinearGradient(L-6,0,L,0); wg.addColorStop(0,B.wall[0]); wg.addColorStop(1,B.wall[1]); g.fillStyle=wg; g.fillRect(L-6,Tp,6,Bt-Tp+6); g.fillRect(R,Tp,6,Bt-Tp+6);
  g.fillStyle=B.base; g.fillRect(L-6,Bt,R-L+12,7);
  drawCat(g,w/2,Bt-h*.17,h*.13,3,0,false,false); }
function fillBoxes(){ const box=$('boxGrid'); box.innerHTML='';
  BOXES.forEach((B,i)=>{ const own=prog.owned.includes(i), cur=prog.box===i;
    const b=document.createElement('button'); b.className='bx'+(cur?' cur':own?' own':prog.coins>=B.cost?' can':'');
    const c=document.createElement('canvas'); c.width=160; c.height=130; drawBoxMini(c.getContext('2d'),160,130,B);
    const n=document.createElement('div'); n.textContent=T.boxNames[i]; const k=document.createElement('small'); k.textContent=cur?T.inUse:own?T.use:`🪙 ${B.cost}`;
    b.append(c,n,k);
    b.onclick=()=>{ if(!own){ if(prog.coins<B.cost){ toast(T.needCoins(B.cost-prog.coins)); return; } prog.coins-=B.cost; prog.owned.push(i); toast(T.bought); SFX.coin(); }
      prog.box=i; save(true); updHud(); paintBg(); fillBoxes(); };
    box.appendChild(b); }); }
$('bBoxes').onclick=()=>{ fillBoxes(); pushScreen('ovBoxes'); };

// кошачий уровень: опыт = очки / 10, каждый уровень дороже
const xpNeed=l=>Math.round(200+100*Math.pow(l,1.3));
function lvlOf(xp){ let l=1; while(xp>=xpNeed(l)){ xp-=xpNeed(l); l++; if(l>999) break; } return {l,cur:xp,need:xpNeed(l)}; }
function addXP(points){ const before=lvlOf(prog.xp).l; prog.xp+=Math.round(points/100); const now=lvlOf(prog.xp).l;
  if(now>before){ let bonus=0; for(let l=before+1;l<=now;l++) bonus+=l*20; prog.coins+=bonus; setTimeout(()=>{ toast(T.lvlUp(now)); SFX.coin(); },900); } save(true); }
function fillLevel(){ const L=lvlOf(prog.xp); $('lvlName').textContent=T.lvl(L.l); $('lvlBar').style.width=(L.cur/L.need*100)+'%'; $('lvlXp').textContent=T.xp(L.cur,L.need); }

function refreshBadges(){ ensureQuests(); const st=dailyState();
  $('dGift').classList.toggle('hide',!st.can);
  const qc=prog.q.list.filter(q=>q.p>=q.v&&!q.c).length+(prog.q.list.every(q=>q.c)&&!prog.q.bonus?1:0);
  $('dQuests').classList.toggle('hide',!qc); $('dQuests').textContent=qc||'';
  const cheap=BOXES.some((B,i)=>!prog.owned.includes(i)&&prog.coins>=B.cost); $('dBoxes').classList.toggle('hide',!cheap); fillLevel(); }
function maybeDaily(){ const st=dailyState(), today=dayKey(); if(!st.can||prog.games<1||prog.daily.shown===today) return;
  prog.daily.shown=today; save(); fillDaily(); pushScreen('ovDaily'); }

// ================= input =================
function toLocal(e){ return {x:e.clientX/S-OX, y:e.clientY/S-OY}; }
let down=false;
cv.addEventListener('pointerdown',e=>{
  if(!inputEnabled||stack.length) return;
  const p=toLocal(e); down=true; aimX=p.x; audio();
  if(bombMode){
    const hit=bodies.find(b=>(b.x-p.x)**2+(b.y-p.y)**2<b.r*b.r);
    if(hit){ hit.dead=true; bodies=bodies.filter(b=>!b.dead); for(let k=0;k<22;k++) spark(hit.x,hit.y,CATS[hit.lvl].c,1.1);
      addTrauma(0.25); prog.coins-=COST.paw; quest('boost',1); save(false); bombMode=false; updHud(); SFX.pop(); }
    down=false;
  }
});
cv.addEventListener('pointermove',e=>{ if(inputEnabled) aimX=toLocal(e).x; });
addEventListener('pointerup',()=>{ if(down){ down=false; drop(); } });
addEventListener('pointercancel',()=>{ down=false; });
addEventListener('keydown',e=>{
  if(!inputEnabled) return;
  if(stack.length){ if(e.code==='Escape'&&['ovColl','ovBoard','ovLegal','ovCoins'].includes(stack[stack.length-1])) popScreen();
    else if(e.code==='Escape'&&stack[stack.length-1]==='ovPause') popScreen(); return; }
  if(e.code==='Space'){ e.preventDefault(); audio(); drop(); }
  else if(e.code==='ArrowLeft'||e.code==='KeyA') aimX=Math.max(BOX.l,aimX-18);
  else if(e.code==='ArrowRight'||e.code==='KeyD') aimX=Math.min(BOX.r,aimX+18);
  else if(e.code==='Escape'||e.code==='KeyP'){ if(running) pushScreen('ovPause'); }
});

// ================= buttons =================
$('bPlay').onclick=()=>{ if(inputEnabled) startGame(); };
$('bAgain').onclick=()=>showInterstitial(startGame);        // logical pause: between rounds
$('bMenu').onclick=toMenu; $('bMenu2').onclick=toMenu;
$('bResume').onclick=popScreen;
$('bPause').onclick=e=>{ e.stopPropagation(); if(inputEnabled&&running&&!stack.length) pushScreen('ovPause'); };
$('bCont').onclick=()=>showRewarded(()=>{ save(true); }, ok=>{ if(ok) doContinue(); });
$('bSfx').onclick=()=>{ prog.sfx=!prog.sfx; save(true); audio(); setBus(); updHud(); };
$('bMus').onclick=()=>{ prog.mus=!prog.mus; save(true); audio(); setBus(); updHud(); };
const openColl=()=>{ buildColl(); pushScreen('ovColl'); };
$('bColl').onclick=openColl; $('bColl3').onclick=openColl;
$('bBoard').onclick=()=>{
  if(!ysdk) return;
  if(PF==='yandex'){ openBoard(); return; }
  if(PF==='vk'&&ysdk.nativeBoard){ save(true); ysdk.nativeBoard(prog.best).catch(()=>toast(T.boardErr)); }
};
if(PF==='ok') $('bBoard').classList.add('hide');     // OK has no leaderboard API for HTML5 games
$('bAuth').onclick=doAuth;
$('bLegal').onclick=()=>pushScreen('ovLegal');
document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>{ popScreen(); if(stack[stack.length-1]==='ovStart') refreshBadges(); });

function buildColl(){
  const g=$('grid'); g.innerHTML='';
  $('collCount').textContent=T.found(prog.unlocked+1,CATS.length);
  CATS.forEach((c,i)=>{
    const d=document.createElement('div'); d.className='cell';
    const k=document.createElement('canvas'); k.width=k.height=120;
    drawCat(k.getContext('2d'),60,66,34,i,0,false,i>prog.unlocked);
    const t=document.createElement('div'); t.textContent=i<=prog.unlocked?c[LANG]:T.locked;
    d.append(k,t); g.appendChild(d);
  });
}

// ================= drawing: cats =================
function shade(hex,p){ const n=parseInt(hex.slice(1),16); const cl=v=>Math.max(0,Math.min(255,v));
  const r=cl((n>>16)+p),g=cl(((n>>8)&255)+p),b=cl((n&255)+p);
  return '#'+((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1); }

function drawCat(g,x,y,r,lvl,ang,blink,locked,sx=1,sy=1,look=0){
  const C=CATS[lvl];
  g.save(); g.translate(x,y); g.scale(sx,sy); g.rotate(ang);
  const body=locked?'#34306b':C.c, ear=C.e;
  for(const s of [-1,1]){
    g.fillStyle=body; g.beginPath();
    g.moveTo(s*r*0.22,-r*0.86); g.lineTo(s*r*0.78,-r*1.14); g.lineTo(s*r*0.92,-r*0.38); g.closePath(); g.fill();
    if(!locked){ g.fillStyle=ear; g.beginPath();
      g.moveTo(s*r*0.36,-r*0.8); g.lineTo(s*r*0.72,-r*1.0); g.lineTo(s*r*0.8,-r*0.52); g.closePath(); g.fill();
      if(C.tufts){ g.strokeStyle='#5a3312'; g.lineWidth=r*0.045; g.lineCap='round'; g.beginPath(); g.moveTo(s*r*0.78,-r*1.14); g.lineTo(s*r*0.88,-r*1.32); g.stroke(); } }
  }
  const gr=g.createRadialGradient(-r*0.3,-r*0.38,r*0.1,0,0,r);
  gr.addColorStop(0,locked?'#403b80':shade(body,20)); gr.addColorStop(1,locked?'#28255a':shade(body,-18));
  g.fillStyle=gr; g.beginPath(); g.arc(0,0,r,0,6.283); g.fill();
  g.lineWidth=Math.max(1.5,r*0.055); g.strokeStyle=locked?'#1b1940':shade(body,-60); g.stroke();
  if(locked){ g.fillStyle='#7d78c9'; g.font='800 '+(r*0.95)+'px Rubik,sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('?',0,r*0.06); g.restore(); return; }
  g.save(); g.beginPath(); g.arc(0,0,r*0.96,0,6.283); g.clip();
  if(C.stripes){ g.strokeStyle=C.stripes; g.lineWidth=r*0.085; g.lineCap='round';
    for(const dx of [-0.22,0,0.22]){ g.beginPath(); g.moveTo(dx*r,-r*0.98); g.lineTo(dx*r*0.8,-r*0.56); g.stroke(); }
    for(const s of [-1,1]) for(const dy of [0.02,0.24]){ g.beginPath(); g.moveTo(s*r,dy*r); g.lineTo(s*r*0.72,dy*r+r*0.04); g.stroke(); } }
  if(C.calico){ g.fillStyle='#f39c4a'; g.beginPath(); g.ellipse(-r*0.55,-r*0.5,r*0.45,r*0.38,0.4,0,6.283); g.fill();
    g.fillStyle='#3b2f2a'; g.beginPath(); g.ellipse(r*0.6,-r*0.35,r*0.38,r*0.42,-0.3,0,6.283); g.fill(); }
  if(C.mask){ const m=g.createRadialGradient(0,r*0.18,r*0.05,0,r*0.18,r*0.62); m.addColorStop(0,C.mask); m.addColorStop(1,C.mask+'00'); g.fillStyle=m; g.fillRect(-r,-r,2*r,2*r); }
  if(C.wrinkles){ g.strokeStyle=shade(body,-35); g.lineWidth=r*0.03; g.lineCap='round';
    for(const dy of [-0.64,-0.53]){ g.beginPath(); g.moveTo(-r*0.26,dy*r); g.quadraticCurveTo(0,dy*r-r*0.07,r*0.26,dy*r); g.stroke(); } }
  g.restore();
  g.fillStyle='#ff8fa360'; for(const s of [-1,1]){ g.beginPath(); g.ellipse(s*r*0.54,r*0.26,r*0.16,r*0.1,0,0,6.283); g.fill(); }
  const ey=-r*0.08, ex=r*0.34, lx=look*r*0.04;
  if(blink){ g.strokeStyle='#241a2e'; g.lineWidth=r*0.065; g.lineCap='round';
    for(const s of [-1,1]){ g.beginPath(); g.arc(s*ex,ey,r*0.11,0.2,Math.PI-0.2); g.stroke(); } }
  else for(const s of [-1,1]){
    g.fillStyle='#241a2e'; g.beginPath(); g.ellipse(s*ex+lx,ey,r*0.125,r*0.155,0,0,6.283); g.fill();
    g.fillStyle='#fff'; g.beginPath(); g.arc(s*ex+lx-r*0.045,ey-r*0.06,r*0.05,0,6.283); g.fill();
  }
  g.fillStyle='#ff7a8a'; g.beginPath(); g.moveTo(-r*0.075,r*0.12); g.lineTo(r*0.075,r*0.12); g.lineTo(0,r*0.2); g.closePath(); g.fill();
  g.strokeStyle='#241a2e'; g.lineWidth=Math.max(1,r*0.035); g.lineCap='round';
  g.beginPath(); g.arc(-r*0.08,r*0.22,r*0.08,0.2,Math.PI-0.3); g.stroke();
  g.beginPath(); g.arc(r*0.08,r*0.22,r*0.08,0.3,Math.PI-0.2); g.stroke();
  g.strokeStyle='#241a2e80'; g.lineWidth=Math.max(0.8,r*0.02);
  for(const s of [-1,1]) for(const k of [-1,0,1]){ g.beginPath(); g.moveTo(s*r*0.32,r*(0.2+k*0.06)); g.lineTo(s*r*0.86,r*(0.16+k*0.12)); g.stroke(); }
  if(C.crown){
    g.fillStyle='#ffd23f'; g.strokeStyle='#a8741a'; g.lineWidth=r*0.035; g.lineJoin='round';
    g.beginPath(); g.moveTo(-r*0.4,-r*0.78); g.lineTo(-r*0.46,-r*1.16); g.lineTo(-r*0.2,-r*0.95); g.lineTo(0,-r*1.26); g.lineTo(r*0.2,-r*0.95); g.lineTo(r*0.46,-r*1.16); g.lineTo(r*0.4,-r*0.78); g.closePath(); g.fill(); g.stroke();
    g.fillStyle='#ff5d8f'; g.beginPath(); g.arc(0,-r*0.9,r*0.07,0,6.283); g.fill();
  }
  if(C.helmet){
    g.strokeStyle='#7bd3ff'; g.lineWidth=r*0.07; g.beginPath(); g.arc(0,-r*0.05,r*1.15,0,6.283); g.stroke();
    g.fillStyle='#7bd3ff1c'; g.fill();
    g.fillStyle='#ffffff90'; g.beginPath(); g.ellipse(-r*0.55,-r*0.62,r*0.16,r*0.3,-0.6,0,6.283); g.fill();
    g.strokeStyle='#d8d8e8'; g.lineWidth=r*0.045; g.beginPath(); g.moveTo(0,-r*1.2); g.lineTo(0,-r*1.46); g.stroke();
    g.fillStyle='#ff5d8f'; g.beginPath(); g.arc(0,-r*1.5,r*0.075,0,6.283); g.fill();
  }
  g.restore();
}

// ================= drawing: scene =================
const bg=document.createElement('canvas');
function paintBg(){
  bg.width=cv.width; bg.height=cv.height;
  const g=bg.getContext('2d'); g.setTransform(S*DPR,0,0,S*DPR,0,0);
  g.fillStyle='#1c1e4a'; g.fillRect(0,0,VW,VH);
  // wallpaper: fish-bone motif, anchored to the column so it lines up at any size
  g.strokeStyle='#2a2d6e'; g.lineWidth=1.6; g.lineCap='round';
  const y0=OY+((20-OY)%46+46)%46-46, x0=OX-Math.ceil(OX/60+1)*60;
  for(let yy=y0;yy<VH;yy+=46){ const row=Math.round((yy-OY-20)/46); for(let xx=x0+((row%2+2)%2)*30+10;xx<VW;xx+=60){
    g.beginPath(); g.moveTo(xx,yy); g.lineTo(xx+18,yy);
    for(const k of [4,9,14]){ g.moveTo(xx+k,yy-4); g.lineTo(xx+k+2,yy); g.lineTo(xx+k,yy+4); }
    g.moveTo(xx+18,yy); g.lineTo(xx+23,yy-4); g.moveTo(xx+18,yy); g.lineTo(xx+23,yy+4); g.stroke(); } }
  // lamp light pool
  const cx=OX+W/2;
  const lg=g.createRadialGradient(cx,OY+120,20,cx,OY+420,Math.max(420,VW*0.45)); lg.addColorStop(0,'#fff3c440'); lg.addColorStop(1,'#fff3c400');
  g.fillStyle=lg; g.fillRect(0,0,VW,VH);
  // floor + skirting
  const fy=OY+BOX.bottom+14;
  g.fillStyle='#14153a'; g.fillRect(0,fy,VW,VH-fy);
  g.fillStyle='#23255c'; g.fillRect(0,fy-6,VW,6);
  // box (in column space)
  g.save(); g.translate(OX,OY);
  const L=BOX.l, R=BOX.r, Tp=BOX.top-10, B=BOX.bottom;
  const K=BOXES[prog.box]||BOXES[0];
  const ig=g.createLinearGradient(0,Tp,0,B); ig.addColorStop(0,K.ig[0]); ig.addColorStop(1,K.ig[1]);
  g.fillStyle=ig; g.fillRect(L,Tp,R-L,B-Tp);
  g.strokeStyle=K.line; g.lineWidth=1; for(let xx=L+8;xx<R;xx+=9){ g.beginPath(); g.moveTo(xx,Tp); g.lineTo(xx,B); g.stroke(); }
  if(K.weave){ g.lineWidth=3; for(let yy=Tp+10;yy<B;yy+=14){ g.beginPath(); g.moveTo(L,yy); g.lineTo(R,yy); g.stroke(); } }
  if(K.stars){ g.fillStyle='#ffffff99'; for(let i=0;i<60;i++){ const sx=L+((i*137)%1000)/1000*(R-L), sy=Tp+((i*271)%1000)/1000*(B-Tp); g.beginPath(); g.arc(sx,sy,i%5?1.2:2.2,0,7); g.fill(); } }
  if(K.ribbon){ g.fillStyle=K.tape; g.globalAlpha=.55; g.fillRect(W/2-18,Tp,36,B-Tp); g.globalAlpha=1; }
  g.save(); g.translate(W/2,B-70); g.rotate(-0.07); g.globalAlpha=0.22;
  g.strokeStyle=K.stamp; g.lineWidth=3; g.strokeRect(-118,-24,236,48);
  g.fillStyle=K.stamp; g.font='800 21px Rubik,sans-serif'; g.textAlign='center'; g.textBaseline='middle';
  g.fillText(T.stamp,0,1); g.restore();
  const flap=(x0,x1,dir)=>{ g.fillStyle=K.flap; g.beginPath(); g.moveTo(x0,Tp); g.lineTo(x1,Tp);
    g.lineTo(x1+dir*34,Tp-44); g.lineTo(x0+dir*16,Tp-40); g.closePath(); g.fill();
    g.strokeStyle=K.flapS; g.lineWidth=2; g.stroke(); };
  flap(L-8,L+70,-1); flap(R-70,R+8,1);
  const wall=(x,y,w,h)=>{ const wg=g.createLinearGradient(x,0,x+w,0); wg.addColorStop(0,K.wall[0]); wg.addColorStop(1,K.wall[1]); g.fillStyle=wg; g.fillRect(x,y,w,h); };
  wall(L-12,Tp,12,B-Tp+14); wall(R,Tp,12,B-Tp+14);
  g.fillStyle=K.base; g.fillRect(L-12,B,R-L+24,14);
  g.fillStyle=K.baseL; g.fillRect(L-12,B+12,R-L+24,3);
  g.fillStyle=K.tape; g.fillRect(W/2-26,B,52,14);
  g.restore();
}

function paintHero(){ const h=$('hero').getContext('2d'); h.clearRect(0,0,240,240);
  drawCat(h,120,138,78,Math.min(prog.unlocked,MAX),Math.sin(time*1.5)*0.08,((time%3.2)<0.12)); }

function rr(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }

// Side panels fill the extra width on landscape screens with useful game info.
function drawSides(){
  const side=OX; if(side<170) return;
  const pw=Math.min(210,side-40), top=OY+90;
  // left: collection progress
  let x=side/2-pw/2;
  ctx.fillStyle='#ffffff0f'; rr(x,top,pw,560,20); ctx.fill();
  ctx.fillStyle='#ffd23f'; ctx.font='800 18px Rubik,sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(T.collection,x+pw/2,top+28);
  ctx.fillStyle='#c9c6ff'; ctx.font='500 13px Rubik,sans-serif'; ctx.fillText(T.found(prog.unlocked+1,CATS.length),x+pw/2,top+50);
  for(let i=0;i<=MAX;i++){
    const yy=top+84+i*43, lk=i>prog.unlocked;
    drawCat(ctx,x+32,yy,14,i,0,false,lk);
    ctx.textAlign='left'; ctx.fillStyle=lk?'#7d78c9':'#fff'; ctx.font='500 14px Rubik,sans-serif';
    ctx.fillText(lk?T.locked:CATS[i][LANG],x+56,yy);
  }
  // right: best + how to play
  x=OX+W+side/2-pw/2;
  ctx.fillStyle='#ffffff0f'; rr(x,top,pw,250,20); ctx.fill();
  ctx.textAlign='center'; ctx.fillStyle='#c9c6ff'; ctx.font='500 14px Rubik,sans-serif'; ctx.fillText(T.best,x+pw/2,top+32);
  ctx.fillStyle='#ffd23f'; ctx.font='800 34px Rubik,sans-serif'; ctx.fillText(prog.best,x+pw/2,top+68);
  ctx.fillStyle='#ffd23f'; ctx.font='800 16px Rubik,sans-serif'; ctx.fillText(T.howTo,x+pw/2,top+116);
  ctx.fillStyle='#dcdaff'; ctx.font='500 13px Rubik,sans-serif';
  wrapText(T.howToText,x+pw/2,top+146,pw-30,18);
  ctx.fillStyle='#a9a6e8'; wrapText(T.keys,x+pw/2,top+222,pw-30,18);
}
function wrapText(t,x,y,maxW,lh){ const words=t.split(' '); let line='';
  for(const w of words){ const test=line?line+' '+w:w; if(ctx.measureText(test).width>maxW&&line){ ctx.fillText(line,x,y); y+=lh; line=w; } else line=test; }
  if(line) ctx.fillText(line,x,y); }

function render(){
  ctx.setTransform(DPR,0,0,DPR,0,0);
  ctx.drawImage(bg,0,0,cv.width/DPR,cv.height/DPR);
  ctx.setTransform(S*DPR,0,0,S*DPR,0,0);
  drawSides();
  const sh=trauma*trauma, ox=12*sh*(0.6*Math.sin(time*37)+0.4*Math.sin(time*71+1.3)), oy=8*sh*(0.6*Math.sin(time*43+2)+0.4*Math.sin(time*67)), rot=0.03*sh*Math.sin(time*29);
  ctx.save(); ctx.translate(OX,OY);
  ctx.translate(W/2+ox,H/2+oy); ctx.rotate(rot); ctx.translate(-W/2,-H/2);

  const pulse=danger>0?(0.5+0.5*Math.sin(time*16)):0;
  ctx.strokeStyle=danger>0?`rgba(255,93,143,${0.55+pulse*0.45})`:'#ffffff30'; ctx.lineWidth=danger>0?4:2; ctx.setLineDash([10,9]);
  ctx.beginPath(); ctx.moveTo(BOX.l,LINE_Y); ctx.lineTo(BOX.r,LINE_Y); ctx.stroke(); ctx.setLineDash([]);

  for(let i=0;i<=MAX;i++) drawCat(ctx,BOX.l+14+i*26,98,9.5,i,0,false,i>prog.unlocked);
  ctx.fillStyle='#ffffff14'; rr(W-80,76,56,56,16); ctx.fill();
  ctx.fillStyle='#c9c6ff'; ctx.font='500 10px Rubik,sans-serif'; ctx.textAlign='center'; ctx.textBaseline='alphabetic'; ctx.fillText(T.next,W-52,90);
  drawCat(ctx,W-52,112,Math.min(CATS[nextLvl].r,15),nextLvl,0,false);

  if(running){
    const r=CATS[curLvl].r, x=Math.max(BOX.l+r,Math.min(BOX.r-r,aimX));
    const lg=ctx.createLinearGradient(0,DROP_Y,0,BOX.bottom); lg.addColorStop(0,'#ffffff40'); lg.addColorStop(1,'#ffffff00');
    ctx.strokeStyle=lg; ctx.lineWidth=2; ctx.setLineDash([3,7]);
    ctx.beginPath(); ctx.moveTo(x,DROP_Y+r); ctx.lineTo(x,BOX.bottom); ctx.stroke(); ctx.setLineDash([]);
    if(cooldown<=0.25){ const k=cooldown>0?1-cooldown/0.25:1, s=0.5+0.5*ease.outBack(Math.min(1,k));
      ctx.globalAlpha=bombMode?0.25:1; drawCat(ctx,x,DROP_Y,r*s,curLvl,Math.sin(time*3)*0.06,false,false,1,1,(aimX-x)/40); ctx.globalAlpha=1; }
  }
  for(const b of bodies){
    const pop=b.popT<1?0.55+0.45*ease.outBack(b.popT):1;
    const bl=((time+b.blink)%4)<0.12 || danger>1.2;
    drawCat(ctx,b.x,b.y+b.r*b.sq*0.8,b.r,b.lvl,b.a,bl,false,(1+b.sq)*pop,(1-b.sq)*pop);
    if(bombMode){ ctx.strokeStyle='#ff5d8f'; ctx.lineWidth=3; ctx.setLineDash([6,5]); ctx.beginPath(); ctx.arc(b.x,b.y,b.r+4,time*2,time*2+6.283); ctx.stroke(); ctx.setLineDash([]); }
  }
  for(const g of rings){ const k=ease.outCubic(g.t/0.45); ctx.strokeStyle=`rgba(255,255,255,${0.7*(1-k)})`; ctx.lineWidth=6*(1-k)+1;
    ctx.beginPath(); ctx.arc(g.x,g.y,g.r0+(g.r1-g.r0)*k,0,6.283); ctx.stroke(); }
  for(const p of parts){ ctx.globalAlpha=Math.min(1,p.t*2.2); ctx.fillStyle=p.col; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.283); ctx.fill(); }
  ctx.globalAlpha=1;
  ctx.restore();

  ctx.save(); ctx.translate(OX,OY);
  ctx.textAlign='center'; ctx.textBaseline='middle';
  for(const f of floats){
    const age=(f.big?(f.combo?1.2:1.4):1)-f.t, s=f.big?0.6+0.4*ease.outBack(Math.min(1,age*4)):1;
    ctx.globalAlpha=Math.min(1,f.t*2);
    ctx.font=`800 ${f.size*s}px Rubik,sans-serif`; ctx.lineWidth=5; ctx.strokeStyle='#1a1233';
    ctx.strokeText(f.txt,f.x,f.y); ctx.fillStyle=f.col; ctx.fillText(f.txt,f.x,f.y);
  }
  ctx.globalAlpha=1;
  if(banner){
    const t=banner.t, inK=ease.outBack(Math.min(1,t/0.35)), outA=t>1.8?Math.max(0,1-(t-1.8)/0.4):1;
    ctx.globalAlpha=outA;
    ctx.fillStyle='#15163ad9'; rr(W/2-130,262,260,178,24); ctx.fill();
    ctx.fillStyle='#ffd23f'; ctx.font='800 22px Rubik,sans-serif'; ctx.fillText(T.newCat,W/2,292);
    drawCat(ctx,W/2,354,40*inK,banner.lvl,Math.sin(t*6)*0.1,false);
    ctx.fillStyle='#fff'; ctx.font='800 20px Rubik,sans-serif'; ctx.fillText(CATS[banner.lvl][LANG],W/2,418);
    ctx.globalAlpha=1;
  }
  ctx.restore();
  if(danger>0){ const v=ctx.createRadialGradient(VW/2,VH/2,VH*0.3,VW/2,VH/2,Math.max(VW,VH)*0.75); v.addColorStop(0,'#ff5d8f00'); v.addColorStop(1,`rgba(255,93,143,${0.28*pulse*Math.min(1,danger)})`); ctx.fillStyle=v; ctx.fillRect(0,0,VW,VH); }
  if(flash>0){ ctx.fillStyle=`rgba(255,255,255,${flash})`; ctx.fillRect(0,0,VW,VH); }
}

// ================= loop =================
let last=performance.now(), acc=0; const FIX=1/120;
function loop(now){
  const rdt=Math.min(0.05,(now-last)/1000); last=now;
  const frozen=pauseReasons.has('hidden')||pauseReasons.has('ad')||pauseReasons.has('platform');
  if(!frozen){
    time+=rdt;
    let dt=rdt; if(hitStop>0){ hitStop-=rdt; dt=rdt*0.05; }
    if(running&&!paused()){
      acc+=dt; while(acc>=FIX){ step(FIX); acc-=FIX; }
      cooldown-=dt; checkOver(dt);
      comboT-=dt; if(comboT<=0) combo=0;
      landThrottle-=rdt;
    }
    trauma=Math.max(0,trauma-1.3*rdt);
    flash=Math.max(0,flash-rdt*4);
    for(const b of bodies){
      if(b.popT<1) b.popT=Math.min(1,b.popT+rdt/0.28);
      b.sqv+=(-320*b.sq-14*b.sqv)*rdt; b.sq+=b.sqv*rdt; b.sq=Math.max(-0.3,Math.min(0.3,b.sq));
    }
    for(const p of parts){ p.vy+=650*rdt; p.x+=p.vx*rdt; p.y+=p.vy*rdt; p.t-=rdt; } parts=parts.filter(p=>p.t>0);
    for(const g of rings) g.t+=rdt; rings=rings.filter(g=>g.t<0.45);
    for(const f of floats){ f.y-=(f.big?18:46)*rdt; f.t-=rdt; } floats=floats.filter(f=>f.t>0);
    if(banner){ banner.t+=rdt; if(banner.t>2.2) banner=null; }
    if(shownScore!==score){ shownScore=score-shownScore<3?score:Math.round(shownScore+(score-shownScore)*Math.min(1,rdt*10)); $('score').textContent=shownScore; }
    musicTick(rdt);
    render();
    if(stack[stack.length-1]==='ovStart') paintHero();
  }
  requestAnimationFrame(loop);
}

// ================= boot: SDK → language → progress → first screen → ready → input =================
function applyLang(){
  document.documentElement.lang=LANG;
  document.querySelectorAll('[data-t]').forEach(el=>{ const v=T[el.dataset.t]; if(typeof v==='string') el.textContent=v; });
  $('legalText').innerHTML=T.legal;
  $('bPause').setAttribute('aria-label',T.pause);
  $('c').setAttribute('aria-label',LANG==='ru'?'Котомерж':'Kotomerge');
  document.title=LANG==='ru'?'Котомерж':'Kotomerge';
  document.querySelectorAll('h1').forEach(h=>h.textContent=document.title);
}
function sdkReady(){ if(readySent||!ysdk) return; ysdk.features.LoadingAPI.ready(); readySent=true; }
async function boot(){
  $('bootMsg').textContent=STR[resolveLang(navigator.language)].boot;
  $('bRetry').classList.add('hide');
  try{
    await sdkInit();
    LANG=resolveLang(ysdk.environment.i18n.lang); T=STR[LANG];
    applyLang();
    try{ storage=await withTimeout(ysdk.getStorage(),3000); }catch(e){ storage=null; }
    const local=localRead();
    await loadPlayer();
    const cloud=await loadCloud();
    const merged=mergeSaves(local,cloud); if(merged) prog=merged;
    localWrite();
    try{ ysdk.on('game_api_pause',()=>setPause('platform',true)); ysdk.on('game_api_resume',()=>setPause('platform',false)); }catch(e){}
    try{ await withTimeout(document.fonts?document.fonts.ready:Promise.resolve(),3000); }catch(e){}
    resize(); updHud();
    $('ovBoot').classList.add('hide');
    pushScreen('ovStart'); refreshBadges();
    render(); paintHero();
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));   // first real frame is on screen
    sdkReady();
    inputEnabled=true;
    $('bPlay').focus({preventScroll:true}); maybeDaily();
  }catch(e){
    const t=STR[resolveLang(navigator.language)];
    $('bootMsg').textContent=t.bootErr; $('bRetry').textContent=t.retry; $('bRetry').classList.remove('hide');
  }
}
$('bRetry').onclick=boot;

resize();
requestAnimationFrame(loop);
boot();
if(DEV) window.__km={get bodies(){return bodies}, drop:()=>drop(), newGame:startGame, set aim(v){aimX=v}, get score(){return score},
  get running(){return running}, spawn:(l,x,y)=>addBody(x,y,l), get prog(){return prog}, gameOver:()=>gameOver(), get paused(){return [...pauseReasons]}, quest, ensureQuests, dailyState, lvlOf, set score(v){score=v}, refreshBadges};
})();
