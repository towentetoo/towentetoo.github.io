/* Дачный ремонт — фишки: мультяшные овощи с толстой обводкой и бликами (свой стиль, не как в маджонге).
   Рисуются в квадрате -1..1. window.DR_ART = {PIECES:[{name,col,draw}], weed(g,hp), puddle(g), grandma(g)} */
(()=>{
'use strict';
const OL='#3b2a1c';   // общий цвет обводки
function path(g,fill,lw=.09){ g.fillStyle=fill; g.fill(); g.lineWidth=lw; g.strokeStyle=OL; g.lineJoin='round'; g.stroke(); }
function gloss(g,x,y,rx,ry,a){ g.save(); g.beginPath(); g.ellipse(x,y,rx,ry,a||-.5,0,7); g.fillStyle='rgba(255,255,255,.7)'; g.fill(); g.restore(); }
function shade(g,clip,fn){ g.save(); clip(); g.clip(); fn(); g.restore(); }
function leaf(g,x,y,a,s,c){ g.save(); g.translate(x,y); g.rotate(a); g.beginPath(); g.moveTo(0,0); g.quadraticCurveTo(s*.5,-s*.5,0,-s); g.quadraticCurveTo(-s*.5,-s*.5,0,0); path(g,c||'#4caf3e',.07); g.restore(); }

const PIECES=[
  {name:'tomato',col:'#e8382f',draw(g){            // помидор
    const body=()=>{ g.beginPath(); g.ellipse(0,.12,.82,.72,0,0,7); };
    body(); path(g,'#ef4434');
    shade(g,body,()=>{ g.beginPath(); g.ellipse(.25,.45,.8,.6,0,0,7); g.fillStyle='rgba(150,20,20,.35)'; g.fill(); });
    gloss(g,-.35,-.15,.22,.13);
    for(const a of [-1.1,-.4,.3,1]) leaf(g,0,-.52,a,.42,'#4caf3e');
    g.beginPath(); g.arc(0,-.55,.09,0,7); path(g,'#3f8f33',.06); }},
  {name:'cucumber',col:'#4caf3e',draw(g){          // огурец
    g.save(); g.rotate(-.6);
    const body=()=>{ g.beginPath(); g.ellipse(0,0,.92,.42,0,0,7); };
    body(); path(g,'#5cbf45');
    shade(g,body,()=>{ g.fillStyle='rgba(30,90,20,.35)'; g.fillRect(-1,.12,2,.4); });
    for(const [x,y] of [[-.5,-.1],[-.15,.12],[.2,-.12],[.5,.1],[0,-.25]]){ g.beginPath(); g.arc(x,y,.045,0,7); g.fillStyle='#d9f3a6'; g.fill(); }
    gloss(g,-.35,-.22,.3,.07,0);
    g.beginPath(); g.ellipse(.9,0,.1,.08,0,0,7); path(g,'#8a6a3a',.05); g.restore(); }},
  {name:'eggplant',col:'#7b3fb0',draw(g){          // баклажан
    const body=()=>{ g.beginPath(); g.moveTo(-.1,-.45); g.bezierCurveTo(-.65,-.3,-.75,.4,-.35,.75); g.bezierCurveTo(0,1,.65,.85,.62,.3); g.bezierCurveTo(.6,-.1,.35,-.45,-.1,-.45); };
    body(); path(g,'#8848c4');
    shade(g,body,()=>{ g.beginPath(); g.ellipse(.35,.5,.5,.6,0,0,7); g.fillStyle='rgba(50,10,80,.35)'; g.fill(); });
    gloss(g,-.3,.1,.1,.28,.3);
    g.beginPath(); g.moveTo(-.45,-.42); g.quadraticCurveTo(-.05,-.75,.35,-.42); g.quadraticCurveTo(.05,-.25,-.45,-.42); path(g,'#4caf3e',.07);
    g.beginPath(); g.moveTo(-.05,-.6); g.lineTo(.08,-.9); g.lineWidth=.13; g.strokeStyle=OL; g.lineCap='round'; g.stroke(); g.lineWidth=.07; g.strokeStyle='#4caf3e'; g.stroke(); }},
  {name:'corn',col:'#ffc61a',draw(g){              // кукуруза
    g.save(); g.rotate(.35);
    const cob=()=>{ g.beginPath(); g.ellipse(0,-.05,.38,.82,0,0,7); };
    cob(); path(g,'#ffd23f');
    shade(g,cob,()=>{ g.fillStyle='rgba(200,130,0,.35)'; for(let y=-.9;y<.9;y+=.2) for(let x=-.4;x<.4;x+=.2){ g.beginPath(); g.arc(x+((y*5|0)%2?.1:0),y,.075,0,7); g.fill(); } });
    gloss(g,-.15,-.4,.08,.25,0);
    for(const s of [-1,1]){ g.beginPath(); g.moveTo(0,.85); g.quadraticCurveTo(s*.75,.5,s*.5,-.35); g.quadraticCurveTo(s*.3,.3,0,.85); path(g,'#6cc04a',.07); }
    g.restore(); }},
  {name:'pumpkin',col:'#ff8a1c',draw(g){            // тыква
    const lob=(x,rx)=>{ g.beginPath(); g.ellipse(x,.15,rx,.66,0,0,7); };
    lob(-.42,.42); path(g,'#f07c14'); lob(.42,.42); path(g,'#f07c14'); lob(0,.45); path(g,'#ff9326');
    shade(g,()=>lob(0,.45),()=>{ g.fillStyle='rgba(160,60,0,.25)'; g.fillRect(.15,-1,.5,2); });
    gloss(g,-.12,-.18,.1,.2,0);
    g.beginPath(); g.moveTo(-.06,-.45); g.lineTo(-.02,-.8); g.lineTo(.14,-.78); g.lineTo(.08,-.45); path(g,'#6b8f2c',.07);
    leaf(g,.12,-.6,1.2,.35,'#4caf3e'); }},
  {name:'radish',col:'#e8457a',draw(g){             // редиска
    const body=()=>{ g.beginPath(); g.moveTo(0,.92); g.bezierCurveTo(-.25,.6,-.72,.35,-.62,-.05); g.bezierCurveTo(-.55,-.45,.55,-.45,.62,-.05); g.bezierCurveTo(.72,.35,.25,.6,0,.92); };
    for(const a of [-.6,0,.6]) leaf(g,0,-.3,a,.72,'#4caf3e');
    body(); path(g,'#f0508a');
    shade(g,body,()=>{ g.fillStyle='#fff3f6'; g.beginPath(); g.ellipse(0,.75,.3,.25,0,0,7); g.fill(); g.beginPath(); g.ellipse(.3,.15,.4,.5,0,0,7); g.fillStyle='rgba(120,10,50,.25)'; g.fill(); });
    gloss(g,-.3,-.05,.15,.1); }},
];
function weed(g,hp){   // сорняк: колючий куст; на 2 удара — с колючками и жёлтыми цветками
  g.beginPath(); g.ellipse(0,.62,.78,.22,0,0,7); path(g,'#6b4a2e',.07);
  const c=hp>1?'#2f7d2a':'#46a83a';
  for(const [x,a,s] of [[-.45,-.7,.62],[-.2,-.3,.8],[.2,.3,.8],[.45,.7,.62],[0,0,.95]]){ g.save(); g.translate(x,.58); g.rotate(a);
    g.beginPath(); g.moveTo(0,0); for(let i=0;i<5;i++){ const y=-s*(i+1)/5, w=s*.28*(1-i/6); g.lineTo(w,y+s*.08); g.lineTo(w*.4,y); } for(let i=4;i>=0;i--){ const y=-s*(i+1)/5, w=s*.28*(1-i/6); g.lineTo(-w*.4,y); g.lineTo(-w,y+s*.08); } g.closePath(); path(g,c,.06); g.restore(); }
  if(hp>1) for(const [x,y] of [[-.38,-.12],[.32,-.28],[0,-.62]]){ g.beginPath(); g.arc(x,y,.11,0,7); path(g,'#ffd33d',.05); } }
function puddle(g){    // лужа — голубая, с бликом
  g.beginPath(); g.moveTo(-.8,.05); g.bezierCurveTo(-.85,-.5,-.1,-.6,.3,-.5); g.bezierCurveTo(.9,-.4,.95,.3,.5,.5); g.bezierCurveTo(.1,.7,-.75,.6,-.8,.05);
  g.fillStyle='rgba(90,170,230,.85)'; g.fill(); g.lineWidth=.06; g.strokeStyle='rgba(40,90,140,.6)'; g.stroke();
  g.beginPath(); g.ellipse(-.25,-.15,.28,.08,-.2,0,7); g.fillStyle='rgba(255,255,255,.6)'; g.fill(); }
window.DR_ART={PIECES,weed,puddle};
})();
