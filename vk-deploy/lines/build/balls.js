/* Линии — рисование шариков и оформление. window.LN_ART={COLS,THEMES,ball(g,r,k,theme)} — g уже сдвинут в центр шарика. */
(()=>{
'use strict';
// [светлый, основной, тёмный]
const COLS=[
  ['#ff8a7a','#e8392d','#8f150d'],   // красный
  ['#ffc46b','#f28a16','#9a4b00'],   // оранжевый
  ['#fff08a','#f2cb12','#9a7a00'],   // жёлтый
  ['#9be38a','#3fae3a','#1c5e1a'],   // зелёный
  ['#8fe6f7','#1fb2d6','#0b5d73'],   // голубой
  ['#8fa8ff','#3459d6','#162a7a'],   // синий
  ['#d7a3ff','#9447d1','#4c1a75'],   // фиолетовый
];
// оформление: фон, доска, клетки
const THEMES=[
  {id:'classic',ru:'Классика',en:'Classic',need:0,    bg:['#1d5a6b','#0f2f3d'],frame:'#e9dcc3',cell:'#f7efe0',cell2:'#efe3cc',ink:'#3a2c1e'},
  {id:'candy',  ru:'Леденцы', en:'Candy',  need:1500, bg:['#ff9cc0','#b9558f'],frame:'#fff0f6',cell:'#fff8fb',cell2:'#fde3ee',ink:'#6a2a4a'},
  {id:'gems',   ru:'Самоцветы',en:'Gems',  need:4000, bg:['#2b2346','#120f22'],frame:'#4a3f6e',cell:'#2f2850',cell2:'#28224a',ink:'#f0e8ff'},
  {id:'smile',  ru:'Смайлики',en:'Smiles', need:8000, bg:['#7fd0ff','#3b8fd6'],frame:'#fff6d8',cell:'#fffdf4',cell2:'#fbf1d2',ink:'#2b3a5a'},
];
function sphere(g,r,k){ const [l,b,d]=COLS[k];
  const gr=g.createRadialGradient(-r*.35,-r*.42,r*.08,0,0,r*1.02); gr.addColorStop(0,l); gr.addColorStop(.5,b); gr.addColorStop(1,d);
  g.beginPath(); g.arc(0,0,r,0,7); g.fillStyle=gr; g.fill(); }
function shine(g,r,a=.6){ g.fillStyle=`rgba(255,255,255,${a})`; g.beginPath(); g.ellipse(-r*.33,-r*.43,r*.3,r*.17,-.62,0,7); g.fill();
  g.fillStyle=`rgba(255,255,255,${a*.45})`; g.beginPath(); g.arc(r*.38,r*.4,r*.09,0,7); g.fill(); }
const PAINT={
  classic(g,r,k){ sphere(g,r,k); shine(g,r); },
  candy(g,r,k){ sphere(g,r,k); g.save(); g.beginPath(); g.arc(0,0,r,0,7); g.clip(); g.strokeStyle='rgba(255,255,255,.55)'; g.lineWidth=r*.2;
    for(let i=0;i<3;i++){ g.beginPath(); g.arc(0,0,r*(.32+i*.3),-2.2+i*.5,-.4+i*.5); g.stroke(); } g.restore(); shine(g,r,.7); },
  gems(g,r,k){ const [l,b,d]=COLS[k], n=8, R=r*1.02, ri=r*.52, P=(rad,i)=>[Math.cos(i/n*6.2832-1.9635)*rad,Math.sin(i/n*6.2832-1.9635)*rad];
    g.beginPath(); for(let i=0;i<n;i++) g.lineTo(...P(R,i)); g.closePath(); g.fillStyle=b; g.fill();
    for(let i=0;i<n;i++){ const mid=(i+.5)/n*6.2832-1.9635, lit=Math.cos(mid+2.356);   // свет сверху-слева
      g.beginPath(); g.moveTo(...P(R,i)); g.lineTo(...P(R,i+1)); g.lineTo(...P(ri,i+1)); g.lineTo(...P(ri,i)); g.closePath();
      g.fillStyle=lit>.3?l:lit<-.3?d:b; g.globalAlpha=.85; g.fill(); g.globalAlpha=1; }
    g.beginPath(); for(let i=0;i<n;i++) g.lineTo(...P(ri,i)); g.closePath(); const gr=g.createLinearGradient(-ri,-ri,ri,ri); gr.addColorStop(0,l); gr.addColorStop(1,b); g.fillStyle=gr; g.fill();
    g.strokeStyle='rgba(255,255,255,.35)'; g.lineWidth=r*.05; g.stroke();
    g.fillStyle='rgba(255,255,255,.85)'; g.beginPath(); const sx=-ri*.35, sy=-ri*.4, s=r*.16; g.moveTo(sx,sy-s); g.lineTo(sx+s*.3,sy-s*.3); g.lineTo(sx+s,sy); g.lineTo(sx+s*.3,sy+s*.3); g.lineTo(sx,sy+s); g.lineTo(sx-s*.3,sy+s*.3); g.lineTo(sx-s,sy); g.lineTo(sx-s*.3,sy-s*.3); g.closePath(); g.fill(); },
  smile(g,r,k){ sphere(g,r,k); const ink='rgba(40,20,10,.85)';
    g.fillStyle=ink; for(const s of [-1,1]){ g.beginPath(); g.ellipse(s*r*.3,-r*.08,r*.1,r*.15,0,0,7); g.fill(); }
    g.fillStyle='#fff'; for(const s of [-1,1]){ g.beginPath(); g.arc(s*r*.3-r*.03,-r*.14,r*.04,0,7); g.fill(); }
    g.strokeStyle=ink; g.lineWidth=r*.09; g.lineCap='round'; g.beginPath(); g.arc(0,r*.12,r*.32,.5,2.64); g.stroke();
    g.fillStyle='rgba(255,120,140,.45)'; for(const s of [-1,1]){ g.beginPath(); g.ellipse(s*r*.55,r*.2,r*.13,r*.08,0,0,7); g.fill(); }
    shine(g,r,.5); },
};
function ball(g,r,k,theme){ (PAINT[theme]||PAINT.classic)(g,r,k); }
window.LN_ART={COLS,THEMES,ball};
})();
