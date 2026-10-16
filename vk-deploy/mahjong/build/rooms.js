/* Уютный маджонг — комнаты после кухни: гостиная и спальня. Сцены 720×440, как у кухни.
   window.MJ_ROOMS=[{id,ru,en,e,ITEMS,draw(g,owned:Set,t)}] — кухня добавляется в kitchen.js */
(()=>{
'use strict';
const P=Math.PI;
function rr(g,x,y,w,h,r){ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }
function circ(g,x,y,r,c){ g.beginPath(); g.arc(x,y,r,0,P*2); g.fillStyle=c; g.fill(); }
function room(g,has,wallId,wallOld,wallNew,pattern,floor){
  g.fillStyle=has(wallId)?wallNew:wallOld; g.fillRect(0,0,720,340);
  if(has(wallId)) pattern(); else { g.strokeStyle='rgba(90,80,70,.3)'; g.lineWidth=3; for(const [a,b,c,d] of [[90,70,130,120],[610,50,650,100],[430,240,470,280]]){ g.beginPath(); g.moveTo(a,b); g.lineTo((a+c)/2+8,(b+d)/2); g.lineTo(c,d); g.stroke(); } }
  g.fillStyle=floor; g.fillRect(0,340,720,100); g.fillStyle='rgba(0,0,0,.08)'; for(let x=0;x<720;x+=60) g.fillRect(x,340,3,100);
  g.fillStyle='#7a4a2a'; g.fillRect(0,334,720,8);
}

// ================= гостиная =================
const LIVING=[
  {id:'lv_wall',   e:'🎨', cost:5, ru:'Обои в цветочек', en:'Floral wallpaper'},
  {id:'lv_carpet', e:'🧶', cost:6, ru:'Ковёр на стену',  en:'Wall carpet'},
  {id:'lv_sofa',   e:'🛋️', cost:7, ru:'Диван',           en:'Sofa'},
  {id:'lv_pillows',e:'🟥', cost:5, ru:'Подушки',         en:'Cushions'},
  {id:'lv_lamp',   e:'💡', cost:7, ru:'Торшер',          en:'Floor lamp'},
  {id:'lv_tv',     e:'📺', cost:8, ru:'Телевизор',       en:'Old TV'},
  {id:'lv_ficus',  e:'🪴', cost:6, ru:'Фикус',           en:'Ficus'},
  {id:'lv_photos', e:'🖼️', cost:7, ru:'Семейные фото',   en:'Family photos'},
  {id:'lv_chair',  e:'🪑', cost:9, ru:'Кресло-качалка',  en:'Rocking chair'},
  {id:'lv_light',  e:'✨', cost:10,ru:'Люстра',          en:'Chandelier'},
  {id:'lv_dog',    e:'🐕', cost:11,ru:'Пёс на коврике',  en:'Dog on the rug'},
  {id:'lv_piano',  e:'🎹', cost:14,ru:'Пианино',         en:'Piano'},
];
function drawLiving(g,own,t){
  const has=id=>own.has(id);
  room(g,has,'lv_wall','#c9c2b8','#f3dcc8',()=>{ for(let x=0;x<720;x+=60) for(let y=0;y<340;y+=60){ g.fillStyle='rgba(155,107,214,.22)';
      for(let i=0;i<5;i++){ const a=i*P*2/5; g.beginPath(); g.arc(x+30+Math.cos(a)*7,y+30+Math.sin(a)*7,5,0,7); g.fill(); } circ(g,x+30,y+30,4,'rgba(255,211,61,.6)'); } },'#a0703f');
  // ковёр на стену
  if(has('lv_carpet')){ g.fillStyle='#b8323f'; rr(g,180,40,300,170,6); g.fill(); g.fillStyle='#e8a020'; rr(g,194,54,272,142,4); g.fill(); g.fillStyle='#7a1f2b'; rr(g,206,66,248,118,4); g.fill();
    g.fillStyle='#e8a020'; g.beginPath(); g.moveTo(330,78); g.lineTo(390,125); g.lineTo(330,172); g.lineTo(270,125); g.closePath(); g.fill();
    g.fillStyle='#2f6a8f'; g.beginPath(); g.moveTo(330,98); g.lineTo(366,125); g.lineTo(330,152); g.lineTo(294,125); g.closePath(); g.fill(); circ(g,330,125,8,'#e8a020');
    for(const [x,y] of [[222,82],[438,82],[222,168],[438,168]]) circ(g,x,y,7,'#e8a020'); }
  // семейные фото
  if(has('lv_photos')){ for(const [x,y,w,h,c] of [[520,60,56,70,'#e8d5b5'],[590,80,48,60,'#d6e7f0'],[530,145,70,50,'#f0dccf']]){ g.fillStyle='#8a5a34'; g.fillRect(x-5,y-5,w+10,h+10); g.fillStyle=c; g.fillRect(x,y,w,h);
      circ(g,x+w/2,y+h*0.42,Math.min(w,h)*0.18,'#c99a6e'); g.fillStyle='#6a8fbf'; g.beginPath(); g.ellipse(x+w/2,y+h,w*0.3,h*0.3,0,P,0); g.fill(); } }
  // люстра
  g.strokeStyle='#5a3d2b'; g.lineWidth=2; g.beginPath(); g.moveTo(360,0); g.lineTo(360,has('lv_light')?28:46); g.stroke();
  if(has('lv_light')){ const glow=.22+.08*Math.sin(t*2); circ(g,360,60,100,`rgba(255,226,140,${glow})`); g.fillStyle='#d4a843'; rr(g,320,28,80,10,5); g.fill();
    for(const x of [326,346,374,394]){ g.strokeStyle='#d4a843'; g.lineWidth=2; g.beginPath(); g.moveTo(x,38); g.lineTo(x,52); g.stroke(); g.fillStyle='#fff6d0'; rr(g,x-7,50,14,18,4); g.fill(); }
    for(let i=0;i<7;i++) circ(g,330+i*10,44+Math.sin(t*2+i)*1.5,2.5,'#bfe3ff'); }
  else circ(g,360,52,8,'#e8e0c8');
  // фикус
  if(has('lv_ficus')){ g.fillStyle='#c96a3c'; rr(g,10,290,52,46,6); g.fill(); g.strokeStyle='#5a3d2b'; g.lineWidth=4; g.beginPath(); g.moveTo(36,292); g.lineTo(36,190); g.stroke();
    for(const [x,y,a] of [[12,210,-.7],[60,220,.7],[16,250,-.9],[56,256,.9],[36,180,0],[20,280,-1],[52,282,1]]){ g.save(); g.translate(x,y); g.rotate(a); g.fillStyle='#3f8f45'; g.beginPath(); g.ellipse(0,0,10,22,0,0,7); g.fill(); g.restore(); } }
  // торшер (за диваном)
  if(has('lv_lamp')){ g.strokeStyle='#5a3d2b'; g.lineWidth=4; g.beginPath(); g.moveTo(206,330); g.lineTo(206,170); g.stroke(); g.fillStyle='#5a3d2b'; g.beginPath(); g.ellipse(206,332,22,6,0,0,7); g.fill();
    const glow=.25+.06*Math.sin(t*1.7); circ(g,206,170,70,`rgba(255,220,120,${glow})`); g.fillStyle='#e8634f'; g.beginPath(); g.moveTo(176,180); g.lineTo(190,138); g.lineTo(222,138); g.lineTo(236,180); g.closePath(); g.fill();
    g.fillStyle='#ffd33d'; for(let x=180;x<234;x+=9){ g.beginPath(); g.arc(x,181,2.5,0,7); g.fill(); } }
  // телевизор
  if(has('lv_tv')){ g.fillStyle='#8a5a34'; rr(g,70,250,104,84,6); g.fill(); g.fillStyle='#6a4428'; g.fillRect(78,300,88,6);
    g.fillStyle='#4a3a30'; rr(g,74,178,96,76,10); g.fill(); g.fillStyle='#9fc9d9'; rr(g,84,188,62,56,10); g.fill();
    g.fillStyle=`rgba(255,255,255,${.25+.15*Math.sin(t*5)})`; g.fillRect(90,196,50,6); circ(g,158,200,5,'#d4a843'); circ(g,158,220,5,'#d4a843');
    g.strokeStyle='#4a3a30'; g.lineWidth=2.5; g.beginPath(); g.moveTo(122,178); g.lineTo(104,150); g.moveTo(122,178); g.lineTo(142,150); g.stroke(); }
  // диван
  if(has('lv_sofa')){ g.fillStyle='#6a8f5a'; rr(g,252,230,216,70,14); g.fill(); g.fillStyle='#577a49'; rr(g,242,262,236,64,12); g.fill(); rr(g,232,250,34,80,10); g.fill(); rr(g,454,250,34,80,10); g.fill();
    g.fillStyle='#4a3020'; g.fillRect(250,326,10,10); g.fillRect(460,326,10,10);
    g.fillStyle='#7aa368'; rr(g,268,268,90,34,8); g.fill(); rr(g,362,268,90,34,8); g.fill(); }
  else { g.fillStyle='#8a7a66'; rr(g,262,280,196,50,6); g.fill(); }
  if(has('lv_pillows')){ for(const [x,c,a] of [[284,'#e8634f',-.2],[326,'#ffd33d',.1],[396,'#7cc6e8',-.1],[436,'#ff9fc2',.25]]){ g.save(); g.translate(x,256); g.rotate(a); g.fillStyle=c; rr(g,-18,-16,36,32,10); g.fill(); circ(g,0,0,5,'rgba(255,255,255,.45)'); g.restore(); } }
  // кресло-качалка
  if(has('lv_chair')){ const rock=Math.sin(t*1.4)*.06; g.save(); g.translate(548,330); g.rotate(rock); g.strokeStyle='#8a5a34'; g.lineWidth=6; g.lineCap='round';
    g.beginPath(); g.arc(0,-40,70,P*0.3,P*0.7); g.stroke(); g.beginPath(); g.moveTo(-34,-6); g.lineTo(-24,-110); g.moveTo(26,-6); g.lineTo(32,-72); g.stroke();
    g.fillStyle='#b5773f'; rr(g,-36,-62,72,14,5); g.fill(); g.fillStyle='#c94a5a'; rr(g,-30,-112,40,54,8); g.fill(); g.restore(); }
  // пианино
  if(has('lv_piano')){ g.fillStyle='#3a2420'; rr(g,606,206,104,128,6); g.fill(); g.fillStyle='#fff'; g.fillRect(612,262,92,16); g.fillStyle='#1a1210';
    for(let x=618;x<702;x+=12){ g.fillRect(x,262,6,9); } g.fillStyle='#d4a843'; g.fillRect(606,206,104,6); circ(g,636,232,6,'#fff6d0'); circ(g,680,232,6,'#fff6d0'); }
  // собака
  g.fillStyle='rgba(232,99,79,.35)'; g.beginPath(); g.ellipse(330,392,150,30,0,0,7); g.fill();
  if(has('lv_dog')){ const ear=Math.sin(t*2)*.15; g.fillStyle='#c98a4a'; g.beginPath(); g.ellipse(330,388,48,20,0,0,7); g.fill(); circ(g,376,374,18,'#c98a4a');
    g.save(); g.translate(366,364); g.rotate(-.5+ear); g.fillStyle='#8a5a2a'; g.beginPath(); g.ellipse(0,0,7,14,0,0,7); g.fill(); g.restore(); circ(g,390,378,6,'#3a2a20');
    g.strokeStyle='#3a2a20'; g.lineWidth=2; g.beginPath(); g.arc(372,372,3,0,P); g.stroke(); g.strokeStyle='#c98a4a'; g.lineWidth=7; g.lineCap='round'; const w=Math.sin(t*6)*8;
    g.beginPath(); g.moveTo(284,384); g.quadraticCurveTo(268,372,262+w,362); g.stroke(); }
}

// ================= спальня =================
const BEDROOM=[
  {id:'bd_wall',    e:'🎨', cost:6, ru:'Обои в полоску',   en:'Striped wallpaper'},
  {id:'bd_bed',     e:'🛏️', cost:9, ru:'Кровать',          en:'Bed'},
  {id:'bd_quilt',   e:'🧵', cost:8, ru:'Лоскутное одеяло', en:'Patchwork quilt'},
  {id:'bd_pillow',  e:'☁️', cost:6, ru:'Пышные подушки',   en:'Fluffy pillows'},
  {id:'bd_curtains',e:'🪟', cost:7, ru:'Шторы',            en:'Curtains'},
  {id:'bd_night',   e:'🌙', cost:8, ru:'Ночник',           en:'Night lamp'},
  {id:'bd_dresser', e:'🗄️', cost:10,ru:'Комод',            en:'Dresser'},
  {id:'bd_mirror',  e:'🪞', cost:9, ru:'Зеркало',          en:'Mirror'},
  {id:'bd_paint',   e:'🖼️', cost:9, ru:'Картина',          en:'Painting'},
  {id:'bd_rug',     e:'🟣', cost:8, ru:'Круглый коврик',   en:'Round rug'},
  {id:'bd_bird',    e:'🐦', cost:12,ru:'Канарейка в клетке',en:'Canary in a cage'},
  {id:'bd_stars',   e:'⭐', cost:16,ru:'Гирлянда-звёзды',  en:'Star garland'},
];
function star(g,x,y,r,c){ g.beginPath(); for(let i=0;i<10;i++){ const a=-P/2+i*P/5, rr2=i%2?r*0.45:r; g.lineTo(x+Math.cos(a)*rr2,y+Math.sin(a)*rr2); } g.closePath(); g.fillStyle=c; g.fill(); }
function drawBedroom(g,own,t){
  const has=id=>own.has(id);
  room(g,has,'bd_wall','#c4c0c8','#dfe6f5',()=>{ for(let x=0;x<720;x+=40){ g.fillStyle='rgba(124,160,214,.22)'; g.fillRect(x,0,16,340); g.fillStyle='rgba(255,255,255,.35)'; for(let y=20;y<340;y+=40){ g.beginPath(); g.arc(x+28,y,3,0,7); g.fill(); } } },'#9a6a44');
  // окно ночью
  g.fillStyle='#fff'; g.fillRect(470,50,170,140); g.fillStyle='#2b3f6e'; g.fillRect(480,60,150,120); circ(g,600,90,16,'#fff6c8'); circ(g,594,86,14,'#2b3f6e');
  for(const [x,y] of [[500,80],[530,110],[560,74],[510,150],[585,140],[615,160]]) circ(g,x,y,1.8+Math.sin(t*3+x)*0.6,'#fff');
  g.fillStyle='#fff'; g.fillRect(552,60,6,120); g.fillRect(480,118,150,6); g.fillStyle='#e8dccb'; g.fillRect(462,188,186,10);
  if(has('bd_curtains')){ for(const [x,dir] of [[466,1],[644,-1]]){ g.fillStyle='#7a5aa8'; g.beginPath(); g.moveTo(x,40); g.quadraticCurveTo(x+dir*34,120,x+dir*8,200); g.lineTo(x,200); g.closePath(); g.fill();
      g.fillStyle='rgba(255,211,61,.5)'; for(let y=60;y<190;y+=24) star(g,x+dir*12,y,4,'rgba(255,211,61,.6)'); }
    g.fillStyle='#5a3d2b'; g.fillRect(452,36,206,8); }
  // гирлянда
  if(has('bd_stars')){ g.strokeStyle='#5a4a3a'; g.lineWidth=1.5; g.beginPath(); g.moveTo(20,30); g.quadraticCurveTo(230,90,440,30); g.stroke();
    for(let i=0;i<9;i++){ const u=(i+.5)/9, x=20+u*420, y=30+Math.sin(u*P)*42; const on=.55+.45*Math.sin(t*3+i*1.3); star(g,x,y+8,8,`rgba(255,${200+30*on|0},${80*on|0},${.5+.5*on})`); } }
  // картина
  if(has('bd_paint')){ g.fillStyle='#b5773f'; g.fillRect(120,70,150,104); g.fillStyle='#bfe3f2'; g.fillRect(130,80,130,84); g.fillStyle='#7bc47f'; g.beginPath(); g.moveTo(130,164); g.lineTo(180,110); g.lineTo(210,140); g.lineTo(235,118); g.lineTo(260,164); g.fill(); circ(g,234,96,10,'#ffd33d'); }
  // ночник
  if(has('bd_night')){ const glow=.3+.1*Math.sin(t*1.5); circ(g,410,250,60,`rgba(255,200,120,${glow})`); g.fillStyle='#8a5a34'; rr(g,380,280,60,54,6); g.fill(); g.fillStyle='#5a3d2b'; g.fillRect(406,256,8,26); g.fillStyle='#f7c6a3'; g.beginPath(); g.moveTo(390,258); g.lineTo(398,230); g.lineTo(422,230); g.lineTo(430,258); g.closePath(); g.fill(); }
  // кровать
  if(has('bd_bed')){ g.fillStyle='#8a5a34'; rr(g,90,200,30,140,6); g.fill(); rr(g,350,240,22,100,6); g.fill(); g.fillStyle='#fff8ee'; rr(g,110,250,250,60,10); g.fill(); g.fillStyle='#8a5a34'; g.fillRect(110,306,250,16);
    if(has('bd_quilt')){ const cs=['#e8634f','#ffd33d','#7cc6e8','#7bc47f','#ff9fc2','#9b6bd6']; for(let i=0;i<8;i++) for(let j=0;j<2;j++){ g.fillStyle=cs[(i+j*3)%6]; g.fillRect(170+i*23,262+j*22,23,22); } g.strokeStyle='rgba(255,255,255,.6)'; g.lineWidth=1; for(let i=0;i<=8;i++){ g.beginPath(); g.moveTo(170+i*23,262); g.lineTo(170+i*23,306); g.stroke(); } }
    else { g.fillStyle='#c9c0b0'; g.fillRect(170,262,184,44); }
    if(has('bd_pillow')){ g.fillStyle='#fff'; g.beginPath(); g.ellipse(142,250,30,18,-.2,0,7); g.fill(); g.fillStyle='#ffe8f0'; g.beginPath(); g.ellipse(150,268,26,14,.1,0,7); g.fill(); } }
  else { g.fillStyle='#8a7a66'; rr(g,110,280,230,40,6); g.fill(); }
  // комод + зеркало
  if(has('bd_dresser')){ g.fillStyle='#9a6334'; rr(g,500,236,150,98,6); g.fill(); for(let i=0;i<3;i++){ g.fillStyle='#b5773f'; rr(g,508,244+i*30,134,24,4); g.fill(); circ(g,575,256+i*30,4,'#f2c94c'); } }
  if(has('bd_mirror')){ g.fillStyle='#d4a843'; g.beginPath(); g.ellipse(575,200,30,36,0,0,7); g.fill(); g.fillStyle='#cfe8f5'; g.beginPath(); g.ellipse(575,200,24,30,0,0,7); g.fill();
    g.fillStyle='rgba(255,255,255,.7)'; g.beginPath(); g.ellipse(566,190,5,14,-.4,0,7); g.fill(); }
  // клетка с канарейкой
  if(has('bd_bird')){ g.strokeStyle='#d4a843'; g.lineWidth=2; g.beginPath(); g.moveTo(690,80); g.lineTo(690,100); g.stroke(); g.beginPath(); g.arc(690,140,30,P,0); g.stroke();
    for(let x=662;x<=718;x+=8){ g.beginPath(); g.moveTo(x,140-Math.sqrt(Math.max(0,900-(x-690)**2))); g.lineTo(x,186); g.stroke(); } g.fillStyle='#d4a843'; g.fillRect(656,184,68,6);
    const hop=Math.abs(Math.sin(t*3))*4; g.fillStyle='#ffd33d'; g.beginPath(); g.ellipse(690,166-hop,10,8,0,0,7); g.fill(); circ(g,698,158-hop,6,'#ffd33d'); g.fillStyle='#e8a020'; g.beginPath(); g.moveTo(703,158-hop); g.lineTo(709,160-hop); g.lineTo(703,162-hop); g.fill(); circ(g,700,157-hop,1.5,'#3a2a20'); }
  // коврик
  if(has('bd_rug')){ for(let i=0;i<4;i++){ g.fillStyle=['#9b6bd6','#c9a6f0','#7a5aa8','#e8d8ff'][i]; g.beginPath(); g.ellipse(360,394,170-i*36,36-i*8,0,0,7); g.fill(); } }
}

window.MJ_ROOMS=(window.MJ_ROOMS||[]).concat([
  {id:'living', e:'🛋️', ru:'Гостиная', en:'Living room', ITEMS:LIVING, draw:drawLiving},
  {id:'bedroom',e:'🛏️', ru:'Спальня',  en:'Bedroom',     ITEMS:BEDROOM, draw:drawBedroom},
]);
})();
