/* Уютный маджонг — векторные иконки плиток (без эмодзи: одинаково на всех устройствах).
   Каждая рисуется в квадрате -1..1. window.MJ_ICONS = [{name, draw(g)}] */
(()=>{
'use strict';
const P=Math.PI;
function circ(g,x,y,r,c){ g.beginPath(); g.arc(x,y,r,0,P*2); g.fillStyle=c; g.fill(); }
function ell(g,x,y,rx,ry,a,c){ g.beginPath(); g.ellipse(x,y,rx,ry,a||0,0,P*2); g.fillStyle=c; g.fill(); }
function line(g,pts,c,w){ g.beginPath(); g.moveTo(pts[0],pts[1]); for(let i=2;i<pts.length;i+=2) g.lineTo(pts[i],pts[i+1]); g.strokeStyle=c; g.lineWidth=w; g.lineCap='round'; g.lineJoin='round'; g.stroke(); }
function quad(g,pts,c){ g.beginPath(); g.moveTo(pts[0],pts[1]); for(let i=2;i<pts.length;i+=4) g.quadraticCurveTo(pts[i],pts[i+1],pts[i+2],pts[i+3]); g.closePath(); g.fillStyle=c; g.fill(); }
function shine(g,x,y,r){ ell(g,x,y,r,r*0.6,-0.6,'rgba(255,255,255,.55)'); }
function leaf(g,x,y,s,a,c){ g.save(); g.translate(x,y); g.rotate(a); ell(g,0,-s,s*0.45,s,0,c||'#5fae4f'); g.restore(); }

const ICONS=[
 {name:'клубника',draw(g){ quad(g,[0,0.85, -0.75,0.2,-0.6,-0.35, -0.3,-0.65,0,-0.45, 0.3,-0.65,0.6,-0.35, 0.75,0.2,0,0.85],'#e8434f');
   for(const [x,y] of [[-.3,-.15],[.05,-.2],[.35,-.1],[-.15,.2],[.2,.2],[0,.5]]) ell(g,x,y,.045,.07,0,'#ffe08a');
   for(const a of [-1,-.35,.35,1]) leaf(g,0,-.5,.22,a,'#4f9e45'); }},
 {name:'лимон',draw(g){ ell(g,0,0.05,0.8,0.58,-0.25,'#ffd33d'); ell(g,-0.78,0.25,0.12,0.1,0,'#ffd33d'); ell(g,0.78,-0.15,0.12,0.1,0,'#ffd33d'); shine(g,-0.25,-0.2,0.2); leaf(g,0.35,-0.45,0.2,0.9); }},
 {name:'вишня',draw(g){ line(g,[-0.35,0.25, 0.15,-0.7, 0.4,0.3],'#6b4a2a',0.09); circ(g,-0.38,0.4,0.36,'#d7263d'); circ(g,0.42,0.45,0.36,'#c41e3a'); shine(g,-0.5,0.28,0.1); shine(g,0.3,0.33,0.1); leaf(g,0.2,-0.65,0.22,1.2); }},
 {name:'персик',draw(g){ circ(g,0,0.1,0.75,'#ffad7a'); ell(g,0.25,0.15,0.45,0.6,0,'#ff8f6b'); line(g,[0,-0.6, 0.05,0.75],'rgba(200,90,60,.5)',0.06); shine(g,-0.35,-0.15,0.18); leaf(g,0.15,-0.62,0.25,0.8); }},
 {name:'круассан',draw(g){ quad(g,[-0.9,0.35, -0.6,-0.6,0,-0.6, 0.6,-0.6,0.9,0.35, 0.45,0.05,0,0.15, -0.45,0.05,-0.9,0.35],'#e2a04f');
   for(const x of [-0.45,0,0.45]) line(g,[x-0.08,-0.5, x+0.08,0.05],'#b8742c',0.08); }},
 {name:'капкейк',draw(g){ quad(g,[-0.6,0.15, -0.5,0.85,0,0.85, 0.5,0.85,0.6,0.15],'#7cc6e8'); for(const x of [-0.3,0,0.3]) line(g,[x,0.2, x*0.8,0.8],'#5aa9cc',0.06);
   circ(g,-0.35,0.05,0.32,'#ff9fc2'); circ(g,0.35,0.05,0.32,'#ff9fc2'); circ(g,0,-0.2,0.42,'#ffb3d0'); circ(g,0,-0.62,0.14,'#e8233f'); }},
 {name:'печенька',draw(g){ circ(g,0,0,0.8,'#d9a35b'); circ(g,0,0,0.68,'#e5b26b'); for(const [x,y] of [[-.3,-.3],[.25,-.35],[.4,.15],[-.1,.1],[-.35,.35],[.1,.45]]) circ(g,x,y,.11,'#5a3520'); }},
 {name:'чашка',draw(g){ ell(g,0,0.72,0.75,0.15,0,'#e9e1d6'); quad(g,[-0.6,-0.2, -0.6,0.65,0,0.65, 0.6,0.65,0.6,-0.2],'#fafafa'); ell(g,0,-0.2,0.6,0.14,0,'#8a5a3a');
   g.beginPath(); g.arc(0.68,0.2,0.2,-1.3,1.3); g.strokeStyle='#fafafa'; g.lineWidth=0.11; g.stroke(); line(g,[-0.15,-0.45, -0.25,-0.65, -0.1,-0.85],'rgba(160,140,120,.6)',0.07); line(g,[0.2,-0.45, 0.1,-0.65, 0.25,-0.85],'rgba(160,140,120,.6)',0.07); }},
 {name:'подсолнух',draw(g){ for(let i=0;i<12;i++){ g.save(); g.rotate(i*P/6); ell(g,0,-0.55,0.17,0.32,0,'#ffc928'); g.restore(); } circ(g,0,0,0.38,'#7a4a1f'); for(const [x,y] of [[-.12,-.1],[.12,-.08],[0,.12]]) circ(g,x,y,.05,'#5a3412'); }},
 {name:'тюльпан',draw(g){ line(g,[0,0.1, 0,0.9],'#4f9e45',0.1); leaf(g,0.05,0.85,0.3,0.7); quad(g,[-0.5,-0.55, -0.6,0.25,0,0.25, 0.6,0.25,0.5,-0.55, 0.25,-0.2,0,-0.6, -0.25,-0.2,-0.5,-0.55],'#ff6f9c'); }},
 {name:'грибок',draw(g){ quad(g,[-0.28,0.1, -0.35,0.85,0,0.85, 0.35,0.85,0.28,0.1],'#f7ecd9'); quad(g,[-0.85,0.15, -0.8,-0.75,0,-0.75, 0.8,-0.75,0.85,0.15],'#e23b3b'); for(const [x,y,r] of [[-.4,-.25,.13],[.15,-.45,.11],[.45,-.1,.12],[-.05,-.05,.09]]) circ(g,x,y,r,'#fff'); }},
 {name:'котик',draw(g){ g.beginPath(); g.moveTo(-0.7,-0.2); g.lineTo(-0.6,-0.85); g.lineTo(-0.2,-0.5); g.lineTo(0.2,-0.5); g.lineTo(0.6,-0.85); g.lineTo(0.7,-0.2); g.closePath(); g.fillStyle='#f39c4a'; g.fill();
   ell(g,0,0.12,0.75,0.65,0,'#f39c4a'); for(const s of [-1,1]){ ell(g,0.3*s,0,0.09,0.13,0,'#3a2a20'); line(g,[0.35*s,0.3, 0.85*s,0.22],'#7a4a20',0.035); line(g,[0.35*s,0.38, 0.85*s,0.42],'#7a4a20',0.035); }
   ell(g,0,0.22,0.09,0.06,0,'#e86a7a'); }},
 {name:'рыбка',draw(g){ g.beginPath(); g.moveTo(0.45,0); g.lineTo(0.9,-0.4); g.lineTo(0.9,0.4); g.closePath(); g.fillStyle='#4aa3df'; g.fill(); ell(g,-0.1,0,0.65,0.42,0,'#5bb8f0'); circ(g,-0.45,-0.08,0.08,'#1f3a55'); line(g,[0,-0.3, 0.12,0, 0,0.3],'#3a8fc8',0.06); }},
 {name:'клубок',draw(g){ circ(g,0,0,0.75,'#9b6bd6'); g.save(); g.beginPath(); g.arc(0,0,0.75,0,P*2); g.clip();
   for(let i=-3;i<=3;i++) line(g,[-1,i*0.22-0.3, 1,i*0.22+0.3],'#7d4fbd',0.07); g.restore(); line(g,[0.6,0.4, 0.85,0.75, 0.6,0.9],'#9b6bd6',0.07); }},
 {name:'мёд',draw(g){ quad(g,[-0.65,-0.35, -0.85,0.85,0,0.85, 0.85,0.85,0.65,-0.35],'#e8a020'); ell(g,0,-0.4,0.55,0.15,0,'#c98510'); ell(g,0,-0.55,0.42,0.12,0,'#f5c04a');
   quad(g,[-0.5,-0.1, -0.45,0.35,0,0.35, 0.45,0.35,0.5,-0.1],'#fff3d6'); line(g,[-0.2,0.12, 0.2,0.12],'#e8a020',0.08); }},
 {name:'морковка',draw(g){ g.beginPath(); g.moveTo(-0.35,-0.35); g.quadraticCurveTo(0.35,-0.5,0.4,-0.25); g.lineTo(-0.05,0.9); g.closePath(); g.fillStyle='#ff8a1f'; g.fill();
   for(const y of [0,0.3]) line(g,[-0.15,y-0.1, 0.1,y],'#d9670a',0.05); for(const a of [-0.6,0,0.6]) leaf(g,0.05,-0.4,0.28,a); }},
 {name:'груша',draw(g){ circ(g,0,0.35,0.55,'#b5d65a'); circ(g,0,-0.2,0.35,'#b5d65a'); shine(g,-0.25,0.2,0.15); line(g,[0,-0.5, 0.08,-0.8],'#6b4a2a',0.08); leaf(g,0.15,-0.7,0.2,1.1); }},
 {name:'чайник',draw(g){ ell(g,0,0.2,0.65,0.55,0,'#6fb7a8'); g.beginPath(); g.moveTo(0.55,0.1); g.lineTo(0.95,-0.25); g.lineTo(0.9,-0.1); g.lineTo(0.6,0.35); g.closePath(); g.fillStyle='#6fb7a8'; g.fill();
   g.beginPath(); g.arc(-0.7,0.2,0.25,P*0.5,P*1.5); g.strokeStyle='#5aa090'; g.lineWidth=0.1; g.stroke(); ell(g,0,-0.32,0.35,0.1,0,'#5aa090'); circ(g,0,-0.45,0.1,'#f2c94c'); circ(g,-0.15,0.25,0.12,'#fff'); circ(g,0.18,0.15,0.09,'#fff'); }},
];
window.MJ_ICONS=ICONS;
})();
