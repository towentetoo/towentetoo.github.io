/* Уютный маджонг — бабушкина кухня: покупки за звёзды и рисованная сцена 720×440.
   Тот же интерфейс, что был у дачи: window.MJ_DACHA={ITEMS,draw(g,owned:Set,t)} */
(()=>{
'use strict';
const ITEMS=[
  {id:'wall',    e:'🎨', cost:3, ru:'Новые обои',      en:'New wallpaper'},
  {id:'curtains',e:'🪟', cost:4, ru:'Занавески',       en:'Curtains'},
  {id:'plant',   e:'🪴', cost:4, ru:'Цветок на окне',  en:'Window plant'},
  {id:'cloth',   e:'🍽️', cost:5, ru:'Скатерть',        en:'Tablecloth'},
  {id:'teapot',  e:'🫖', cost:5, ru:'Чайник',          en:'Teapot'},
  {id:'shelf',   e:'☕', cost:6, ru:'Полка с чашками', en:'Cup shelf'},
  {id:'jars',    e:'🍯', cost:6, ru:'Банки варенья',   en:'Jam jars'},
  {id:'clock',   e:'🕰️', cost:7, ru:'Часы с маятником',en:'Pendulum clock'},
  {id:'lamp',    e:'💡', cost:7, ru:'Абажур',          en:'Lampshade'},
  {id:'rug',     e:'🧶', cost:8, ru:'Половик',         en:'Rag rug'},
  {id:'cat',     e:'🐈', cost:9, ru:'Кот на окне',     en:'Cat on the sill'},
  {id:'cupboard',e:'🗄️', cost:12,ru:'Резной буфет',    en:'Carved cupboard'},
];
const P=Math.PI;
function rr(g,x,y,w,h,r){ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }
function circ(g,x,y,r,c){ g.beginPath(); g.arc(x,y,r,0,P*2); g.fillStyle=c; g.fill(); }
function cup(g,x,y,s,c){ g.fillStyle=c; rr(g,x-9*s,y-8*s,18*s,14*s,4*s); g.fill(); g.strokeStyle=c; g.lineWidth=2.5*s; g.beginPath(); g.arc(x+10*s,y-1*s,4*s,-1.4,1.4); g.stroke(); }
function draw(g,own,t){
  const has=id=>own.has(id);
  // стена
  g.fillStyle=has('wall')?'#fbe6c8':'#cfc6b6'; g.fillRect(0,0,720,340);
  if(has('wall')){ for(let x=0;x<720;x+=48) for(let y=0;y<340;y+=48){ g.fillStyle='rgba(232,99,79,.18)'; g.beginPath(); g.arc(x+24,y+24,5,0,7); g.fill();
      g.fillStyle='rgba(123,196,127,.25)'; g.beginPath(); g.ellipse(x+12,y+12,4,7,.7,0,7); g.fill(); } }
  else { g.strokeStyle='rgba(90,80,70,.35)'; g.lineWidth=3; for(const [a,b,c,d] of [[80,60,120,110],[600,40,640,90],[420,250,460,290],[260,30,290,70]]){ g.beginPath(); g.moveTo(a,b); g.lineTo((a+c)/2+8,(b+d)/2); g.lineTo(c,d); g.stroke(); }
    g.fillStyle='rgba(120,110,95,.25)'; g.fillRect(500,180,80,50); }
  // пол
  g.fillStyle='#b88452'; g.fillRect(0,340,720,100); g.fillStyle='rgba(0,0,0,.08)'; for(let x=0;x<720;x+=60) g.fillRect(x,340,3,100);
  g.fillStyle='#8a5a34'; g.fillRect(0,334,720,8);
  // окно
  g.fillStyle='#fff'; g.fillRect(250,60,200,150); g.fillStyle='#bfe6f7'; g.fillRect(262,72,176,126);
  g.fillStyle='#d6f0c8'; g.beginPath(); g.ellipse(350,198,110,30,0,P,0); g.fill(); circ(g,410,95,16,'#fff2a8');
  g.fillStyle='#fff'; g.fillRect(347,72,6,126); g.fillRect(262,132,176,6); g.fillStyle='#e8dccb'; g.fillRect(240,206,220,12);
  if(has('curtains')){ g.fillStyle='#e8634f'; for(const [x,dir] of [[246,1],[454,-1]]){ g.beginPath(); g.moveTo(x,50); g.quadraticCurveTo(x+dir*40,130,x+dir*10,215); g.lineTo(x,215); g.closePath(); g.fill();
      g.fillStyle='rgba(255,255,255,.35)'; for(let y=70;y<200;y+=22){ g.beginPath(); g.arc(x+dir*12,y,3,0,7); g.fill(); } g.fillStyle='#e8634f'; }
    g.fillStyle='#8a5a34'; g.fillRect(232,46,236,8); }
  if(has('plant')){ g.fillStyle='#c96a3c'; rr(g,272,180,34,28,4); g.fill(); for(const a of [-.6,-.2,.2,.6]){ g.save(); g.translate(289,182); g.rotate(a); g.fillStyle='#5fae4f'; g.beginPath(); g.ellipse(0,-18,7,18,0,0,7); g.fill(); g.restore(); }
    circ(g,281,160,6,'#ff6f9c'); circ(g,298,156,6,'#ff6f9c'); }
  if(has('cat')){ const tail=Math.sin(t*1.8)*8; g.fillStyle='#f39c4a'; g.beginPath(); g.ellipse(400,194,26,14,0,0,7); g.fill(); circ(g,422,180,12,'#f39c4a');
    g.beginPath(); g.moveTo(414,172); g.lineTo(416,160); g.lineTo(422,170); g.moveTo(424,170); g.lineTo(431,160); g.lineTo(432,174); g.fill();
    g.strokeStyle='#f39c4a'; g.lineWidth=6; g.lineCap='round'; g.beginPath(); g.moveTo(376,196); g.quadraticCurveTo(360,204,366+tail,214); g.stroke();
    g.strokeStyle='#3a2a20'; g.lineWidth=2; g.beginPath(); g.arc(419,180,3,0,P); g.stroke(); g.beginPath(); g.arc(427,180,3,0,P); g.stroke(); }
  // буфет слева
  if(has('cupboard')){ g.fillStyle='#9a6334'; rr(g,30,120,150,216,8); g.fill(); g.fillStyle='#b5773f'; rr(g,40,130,130,90,6); g.fill(); g.fillStyle='#d8eef6'; g.fillRect(50,140,50,70); g.fillRect(110,140,50,70);
    for(const [x,c] of [[65,'#e8634f'],[85,'#7cc6e8'],[125,'#ffd33d'],[145,'#9b6bd6']]) cup(g,x,178,.8,c);
    g.fillStyle='#b5773f'; rr(g,40,230,130,96,6); g.fill(); circ(g,90,278,5,'#f2c94c'); circ(g,120,278,5,'#f2c94c'); g.fillStyle='#7a4a22'; g.fillRect(24,112,162,10); }
  else { g.fillStyle='#8a7a66'; rr(g,50,240,90,96,4); g.fill(); g.fillStyle='rgba(0,0,0,.15)'; g.fillRect(60,250,70,30); }
  // полка с чашками
  if(has('shelf')){ g.fillStyle='#8a5a34'; g.fillRect(500,110,170,10); for(const [x,c] of [[520,'#e8634f'],[555,'#7cc6e8'],[590,'#ffd33d'],[625,'#7bc47f'],[655,'#ff9fc2']]) cup(g,x,104,1,c); }
  if(has('jars')){ g.fillStyle='#8a5a34'; g.fillRect(500,170,170,10); for(const [x,c] of [[520,'#c8233f'],[565,'#e8a020'],[610,'#9b6bd6'],[650,'#e8634f']]){ g.fillStyle=c; rr(g,x-14,140,28,30,5); g.fill(); g.fillStyle='#fff'; rr(g,x-15,134,30,8,3); g.fill(); g.fillStyle='#fff3d6'; g.fillRect(x-8,150,16,10); } }
  // часы
  if(has('clock')){ g.fillStyle='#8a5a34'; rr(g,180,40,46,110,8); g.fill(); circ(g,203,70,18,'#fffaf0'); g.strokeStyle='#5a3d2b'; g.lineWidth=2.5;
    g.beginPath(); g.moveTo(203,70); g.lineTo(203,58); g.moveTo(203,70); g.lineTo(212,74); g.stroke(); const a=Math.sin(t*3)*.3;
    g.save(); g.translate(203,96); g.rotate(a); g.strokeStyle='#f2c94c'; g.lineWidth=2; g.beginPath(); g.moveTo(0,0); g.lineTo(0,38); g.stroke(); circ(g,0,42,7,'#f2c94c'); g.restore(); }
  // абажур
  g.strokeStyle='#5a3d2b'; g.lineWidth=2; g.beginPath(); g.moveTo(360,0); g.lineTo(360,has('lamp')?36:50); g.stroke();
  if(has('lamp')){ const glow=.25+.08*Math.sin(t*2); circ(g,360,80,90,`rgba(255,220,120,${glow})`); g.fillStyle='#e8634f'; g.beginPath(); g.moveTo(320,72); g.lineTo(340,36); g.lineTo(380,36); g.lineTo(400,72); g.closePath(); g.fill();
    g.fillStyle='#fff2a8'; g.beginPath(); g.ellipse(360,74,40,6,0,0,7); g.fill(); g.fillStyle='#ffd33d'; for(let x=324;x<400;x+=10){ g.beginPath(); g.arc(x,74,3,0,7); g.fill(); } }
  else circ(g,360,56,8,'#e8e0c8');
  // половик
  if(has('rug')){ for(let i=0;i<5;i++){ g.fillStyle=['#e8634f','#7cc6e8','#ffd33d','#7bc47f','#ff9fc2'][i]; g.beginPath(); g.ellipse(360,392,190-i*34,40-i*7,0,0,7); g.fill(); } }
  // стол
  g.fillStyle='#8a5a34'; g.fillRect(250,300,12,60); g.fillRect(458,300,12,60);
  if(has('cloth')){ g.fillStyle='#fff'; g.beginPath(); g.moveTo(232,282); g.lineTo(488,282); g.lineTo(498,330); g.lineTo(222,330); g.closePath(); g.fill();
    g.fillStyle='rgba(232,99,79,.75)'; for(let x=232;x<490;x+=24){ g.fillRect(x,282,12,48); } for(let y=282;y<330;y+=16){ g.fillStyle='rgba(232,99,79,.35)'; g.fillRect(222,y,276,8); } }
  else { g.fillStyle='#a87a4a'; g.fillRect(232,282,256,22); }
  if(has('teapot')){ g.fillStyle='#6fb7a8'; g.beginPath(); g.ellipse(360,262,34,26,0,0,7); g.fill(); g.beginPath(); g.moveTo(390,256); g.lineTo(414,236); g.lineTo(410,246); g.lineTo(392,268); g.fill();
    g.strokeStyle='#5aa090'; g.lineWidth=5; g.beginPath(); g.arc(328,262,12,P*.5,P*1.5); g.stroke(); circ(g,360,236,6,'#f2c94c'); circ(g,350,262,6,'#fff'); circ(g,370,256,5,'#fff');
    g.strokeStyle='rgba(255,255,255,.7)'; g.lineWidth=3; const s=Math.sin(t*2)*4; g.beginPath(); g.moveTo(416,232); g.quadraticCurveTo(424+s,218,416,204); g.stroke(); }
}
window.MJ_DACHA={ITEMS,draw};
window.MJ_ROOMS=[{id:'kitchen',e:'🫖',ru:'Кухня',en:'Kitchen',ITEMS,draw}].concat(window.MJ_ROOMS||[]);
})();
