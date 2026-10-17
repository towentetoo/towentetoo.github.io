/* Пасьянс — рисование карт (вектор, без картинок). window.SOL_CARDS.face(g,w,h,suit,rank), back(g,w,h)
   масти: 0 ♠, 1 ♥, 2 ♦, 3 ♣. Крупные индексы — чтобы читалось с телефона. */
(()=>{
'use strict';
const RED='#c4202f', BLACK='#1d1d1b', RANKS=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const RANKS_RU=['Т','2','3','4','5','6','7','8','9','10','В','Д','К'];
function suit(g,s,x,y,r,col){ g.save(); g.translate(x,y); g.scale(r,r); g.fillStyle=col; g.beginPath();
  if(s===1){ g.moveTo(0,.9); g.bezierCurveTo(-1.3,0,-.9,-1.1,0,-.45); g.bezierCurveTo(.9,-1.1,1.3,0,0,.9); }
  else if(s===2){ g.moveTo(0,-1); g.quadraticCurveTo(.35,-.35,.75,0); g.quadraticCurveTo(.35,.35,0,1); g.quadraticCurveTo(-.35,.35,-.75,0); g.quadraticCurveTo(-.35,-.35,0,-1); }
  else if(s===0){ g.moveTo(0,-1); g.bezierCurveTo(-1.3,-.1,-.85,.95,-.1,.4); g.lineTo(-.3,1); g.lineTo(.3,1); g.lineTo(.1,.4); g.bezierCurveTo(.85,.95,1.3,-.1,0,-1); }
  else { g.arc(0,-.48,.42,0,7); g.moveTo(-.45,.1); g.arc(-.45,.1,.42,0,7); g.moveTo(.45,.1); g.arc(.45,.1,.42,0,7); g.fill(); g.beginPath(); g.moveTo(-.12,.1); g.lineTo(-.32,1); g.lineTo(.32,1); g.lineTo(.12,.1); }
  g.fill(); g.restore(); }
function rr(g,x,y,w,h,r){ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }
function face(g,w,h,s,r,ru){
  const col=(s===1||s===2)?RED:BLACK, R=(ru?RANKS_RU:RANKS)[r];
  rr(g,.5,.5,w-1,h-1,w*.09); g.fillStyle='#fffdf7'; g.fill(); g.lineWidth=1; g.strokeStyle='rgba(0,0,0,.25)'; g.stroke();
  // крупный индекс слева сверху + масть под ним
  g.fillStyle=col; g.textAlign='left'; g.textBaseline='alphabetic';
  const fs=w*(R.length>1?.36:.42); g.font=`700 ${fs}px PTSerif,Georgia,serif`; g.fillText(R,w*.07,w*.40);
  suit(g,s,w*.2,w*.58,w*.12,col);
  // маленький индекс справа сверху — видно в веере
  g.font=`700 ${w*.22}px PTSerif,Georgia,serif`; g.textAlign='right'; g.fillText(R,w*.93,w*.26); suit(g,s,w*.83,w*.38,w*.075,col);
  if(r>=10){   // картинки: рамка с золотом, буква и корона
    rr(g,w*.12,h*.42,w*.76,h*.5,w*.06); g.fillStyle=col===RED?'#fbe3e3':'#e7e7ef'; g.fill(); g.lineWidth=w*.025; g.strokeStyle='#c99a2e'; g.stroke();
    g.fillStyle='#e0b23a'; g.beginPath(); const cx=w*.5, cy=h*.56; g.moveTo(cx-w*.2,cy); g.lineTo(cx-w*.2,cy-w*.14); g.lineTo(cx-w*.1,cy-w*.06); g.lineTo(cx,cy-w*.18); g.lineTo(cx+w*.1,cy-w*.06); g.lineTo(cx+w*.2,cy-w*.14); g.lineTo(cx+w*.2,cy); g.closePath(); g.fill();
    g.fillStyle=col; g.textAlign='center'; g.font=`700 ${w*.36}px PTSerif,Georgia,serif`; g.fillText(R,cx,h*.86);
  } else suit(g,s,w*.55,h*.7,w*(r===0?.3:.24),col);
}
// рубашка: theme {a: фон, b: узор, gzhel: роспись «Гжель»}
function back(g,w,h,th){
  th=th||{a:'#7a1f2b',b:'#e6c46a'}; const A=th.a, B=th.b, lw=Math.max(1,w*.02);
  rr(g,.5,.5,w-1,h-1,w*.09); g.fillStyle=A; g.fill(); g.lineWidth=1; g.strokeStyle='rgba(0,0,0,.4)'; g.stroke();
  rr(g,w*.08,w*.08,w*.84,h-w*.16,w*.06); g.lineWidth=Math.max(1,w*.03); g.strokeStyle=B; g.stroke();
  g.save(); rr(g,w*.08,w*.08,w*.84,h-w*.16,w*.06); g.clip();
  if(th.gzhel){
    // гжель: синие завитки-«капли» по белому + центральная роза
    g.strokeStyle=B; g.fillStyle=B; g.lineWidth=lw*1.2;
    for(let y=w*.2;y<h;y+=w*.34) for(let x=w*.2+((y/(w*.34))|0)%2*w*.17;x<w;x+=w*.34){
      g.beginPath(); g.moveTo(x,y-w*.07); g.quadraticCurveTo(x+w*.07,y,x,y+w*.07); g.quadraticCurveTo(x-w*.03,y,x,y-w*.07); g.fill(); }
    g.restore(); const cx=w/2, cy=h/2, R=w*.2;
    g.fillStyle=A; g.beginPath(); g.arc(cx,cy,R*1.15,0,7); g.fill(); g.lineWidth=lw; g.strokeStyle=B; g.stroke();
    for(let i=0;i<6;i++){ const a=i*Math.PI/3; g.fillStyle=i%2?'#5f86d6':B; g.beginPath(); g.ellipse(cx+Math.cos(a)*R*.5,cy+Math.sin(a)*R*.5,R*.45,R*.25,a,0,7); g.fill(); }
    g.fillStyle='#fff'; g.beginPath(); g.arc(cx,cy,R*.22,0,7); g.fill(); g.fillStyle=B; g.beginPath(); g.arc(cx,cy,R*.12,0,7); g.fill();
    return;
  }
  g.strokeStyle=B; g.globalAlpha=.35; g.lineWidth=lw;
  for(let i=-h;i<w+h;i+=w*.16){ g.beginPath(); g.moveTo(i,0); g.lineTo(i+h,h); g.moveTo(i+h,0); g.lineTo(i,h); g.stroke(); } g.restore();
  g.fillStyle=B; g.beginPath(); g.ellipse(w/2,h/2,w*.16,w*.16,0,0,7); g.fill(); suit(g,1,w/2,h/2,w*.09,A);
}
window.SOL_CARDS={face,back,suit,RED,BLACK};
})();
