/* Дачный ремонт — изба-сруб и участок: покупки за звёзды, сцена 720×440 в мультяшном стиле с обводкой.
   window.MJ_DACHA={ITEMS,draw(g,owned:Set,t)} */
(()=>{
'use strict';
const ITEMS=[
  {id:'logs',      e:'🪵', cost:3, ru:'Обновить сруб',    en:'Restore the logs'},
  {id:'frames',    e:'🪟', cost:4, ru:'Резные наличники', en:'Carved frames'},
  {id:'beds',      e:'🥬', cost:4, ru:'Грядки',           en:'Garden beds'},
  {id:'roof',      e:'🏠', cost:6, ru:'Зелёная крыша',    en:'Green roof'},
  {id:'porch',     e:'🚪', cost:5, ru:'Крыльцо',          en:'Porch'},
  {id:'fence',     e:'🚧', cost:6, ru:'Штакетник',        en:'Picket fence'},
  {id:'sunflowers',e:'🌻', cost:6, ru:'Подсолнухи',       en:'Sunflowers'},
  {id:'well',      e:'🪣', cost:7, ru:'Колодец',          en:'Well'},
  {id:'greenhouse',e:'🌱', cost:8, ru:'Теплица',          en:'Greenhouse'},
  {id:'dog',       e:'🐕', cost:8, ru:'Пёс в будке',      en:'Dog house'},
  {id:'samovar',   e:'🫖', cost:9, ru:'Самовар',          en:'Samovar'},
  {id:'banya',     e:'🛖', cost:12,ru:'Банька',           en:'Bathhouse'},
];
const OL='#3b2a1c', P=Math.PI;
function poly(g,pts,fill,lw=3){ g.beginPath(); g.moveTo(pts[0],pts[1]); for(let i=2;i<pts.length;i+=2) g.lineTo(pts[i],pts[i+1]); g.closePath(); g.fillStyle=fill; g.fill(); g.lineWidth=lw; g.strokeStyle=OL; g.lineJoin='round'; g.stroke(); }
function rect(g,x,y,w,h,fill,lw=3,r=0){ g.beginPath(); if(r){ g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); } else g.rect(x,y,w,h);
  g.fillStyle=fill; g.fill(); if(lw){ g.lineWidth=lw; g.strokeStyle=OL; g.stroke(); } }
function circ(g,x,y,r,fill,lw=3){ g.beginPath(); g.arc(x,y,r,0,P*2); g.fillStyle=fill; g.fill(); if(lw){ g.lineWidth=lw; g.strokeStyle=OL; g.stroke(); } }
function draw(g,own,t){
  const has=id=>own.has(id);
  // небо, солнце, облака, холмы — как фон игры
  let gr=g.createLinearGradient(0,0,0,300); gr.addColorStop(0,'#6ec6f5'); gr.addColorStop(1,'#bfe7fb'); g.fillStyle=gr; g.fillRect(0,0,720,440);
  circ(g,640,62,34,'#ffe066',3);
  for(const [x0,y,s] of [[90,58,1],[330,36,.8],[500,90,.6]]){ const x=((x0+t*8*s)%820)-60; g.fillStyle='#fff'; g.beginPath();
    g.arc(x,y,20*s+4,0,7); g.arc(x+24*s,y-10*s,26*s,0,7); g.arc(x+50*s,y,18*s+3,0,7); g.fill(); }
  g.fillStyle='#86cb62'; g.beginPath(); g.ellipse(150,300,330,70,0,0,7); g.fill(); g.fillStyle='#7cc35a'; g.beginPath(); g.ellipse(620,296,260,60,0,0,7); g.fill();
  g.fillStyle='#6cb84e'; g.fillRect(0,300,720,140);
  // баня (на заднем плане слева)
  if(has('banya')){ rect(g,30,214,120,86,'#c98a4b'); for(let y=224;y<300;y+=14){ g.strokeStyle='rgba(59,42,28,.5)'; g.lineWidth=2; g.beginPath(); g.moveTo(30,y); g.lineTo(150,y); g.stroke(); }
    poly(g,[20,218,90,170,160,218],'#7a4a22'); rect(g,74,248,26,52,'#8a5a34'); rect(g,108,170,14,34,'#9a9a9a');
    const s=(t*20)%40; g.fillStyle=`rgba(255,255,255,${.6-s/70})`; g.beginPath(); g.arc(115,162-s,8+s/5,0,7); g.fill(); }
  // теплица (справа сзади)
  if(has('greenhouse')){ g.fillStyle='rgba(210,240,255,.75)'; g.beginPath(); g.moveTo(560,300); g.lineTo(560,240); g.arc(615,240,55,P,0); g.lineTo(670,300); g.closePath(); g.fill(); g.lineWidth=3; g.strokeStyle=OL; g.stroke();
    g.strokeStyle='rgba(59,42,28,.6)'; g.lineWidth=2; for(const x of [578,596,615,634,652]){ g.beginPath(); g.moveTo(x,300); g.lineTo(x,240-Math.sqrt(Math.max(0,55*55-(x-615)**2))+ (x===615?0:0)); g.stroke(); }
    for(const [x,c] of [[575,'#ef4434'],[600,'#ef4434'],[630,'#5cbf45'],[655,'#ef4434']]) circ(g,x,282,6,c,2); }
  // изба
  const log=has('logs')?'#d99a58':'#9b8f80', log2=has('logs')?'#b9773a':'#7f7466';
  rect(g,210,170,260,140,log);
  for(let y=170;y<310;y+=20){ g.fillStyle=log2; g.fillRect(212,y+14,256,6); g.strokeStyle=OL; g.lineWidth=2; g.beginPath(); g.moveTo(210,y+20); g.lineTo(470,y+20); g.stroke();
    for(const x of [206,474]){ g.beginPath(); g.ellipse(x,y+10,8,9,0,0,7); g.fillStyle=log; g.fill(); g.lineWidth=2; g.stroke(); g.beginPath(); g.arc(x,y+10,3,0,7); g.strokeStyle=log2; g.stroke(); g.strokeStyle=OL; } }
  if(!has('logs')){ g.strokeStyle='rgba(40,30,20,.5)'; g.lineWidth=3; for(const [a,b,c,d] of [[250,200,275,230],[420,260,445,280]]){ g.beginPath(); g.moveTo(a,b); g.lineTo(c,d); g.stroke(); } }
  // крыша
  poly(g,[192,176,340,72,488,176],has('roof')?'#4fae5a':'#6e6a64',4);
  if(has('roof')){ g.strokeStyle='rgba(30,80,40,.6)'; g.lineWidth=3; for(let i=1;i<9;i++){ const x=192+i*33; g.beginPath(); g.moveTo(x,176); g.lineTo(340+(x-340)*.15,90); g.stroke(); }
    rect(g,404,92,22,44,'#c0452f'); }
  else { rect(g,280,130,40,16,'#55524d',2); rect(g,370,148,28,12,'#55524d',2); }
  // окно на фронтоне
  rect(g,322,120,36,36,has('frames')?'#bfe6f7':'#4a4540',3,4);
  // окна
  for(const x of [236,404]){
    if(has('frames')){ rect(g,x-8,196,58,8,'#3a7bd5',2); poly(g,[x-10,196,x+21,178,x+52,196],'#3a7bd5',2); rect(g,x,204,42,52,'#bfe6f7'); g.fillStyle='#fff'; g.fillRect(x+19,204,4,52); g.fillRect(x,226,42,4);
      g.fillStyle='rgba(255,255,255,.5)'; g.fillRect(x+4,208,8,14); rect(g,x-8,256,58,8,'#3a7bd5',2); for(const dx of [6,21,36]) circ(g,x+dx,262,3,'#fff',0); }
    else { rect(g,x,204,42,52,'#4a4540'); g.save(); g.translate(x+21,230); g.rotate(.45); rect(g,-30,-5,60,10,'#8a6a4a',2); g.rotate(-.9); rect(g,-30,-5,60,10,'#8a6a4a',2); g.restore(); }
  }
  // дверь и крыльцо
  rect(g,318,226,44,84,has('logs')?'#8a4f22':'#6b5a4a',3,4); circ(g,352,268,4,'#ffd33d',2);
  if(has('porch')){ rect(g,296,300,88,12,'#c98a4b'); rect(g,304,312,72,10,'#b5773f'); rect(g,300,212,8,90,'#c98a4b',2); rect(g,372,212,8,90,'#c98a4b',2); poly(g,[290,214,340,192,390,214],'#3a7bd5',3); }
  else rect(g,312,306,56,8,'#7f7466',2);
  // самовар на столике
  if(has('samovar')){ rect(g,488,288,56,8,'#c98a4b',2); rect(g,494,296,6,22,'#8a5a34',2); rect(g,532,296,6,22,'#8a5a34',2);
    g.beginPath(); g.ellipse(516,268,16,20,0,0,7); g.fillStyle='#ffc53d'; g.fill(); g.lineWidth=3; g.strokeStyle=OL; g.stroke(); rect(g,508,244,16,8,'#ffc53d',2); rect(g,502,284,28,6,'#ffc53d',2);
    g.beginPath(); g.moveTo(532,268); g.lineTo(544,272); g.stroke(); g.fillStyle='rgba(255,255,255,.6)'; g.beginPath(); g.ellipse(510,262,4,8,0,0,7); g.fill(); }
  // колодец
  if(has('well')){ rect(g,600,318,64,40,'#9a9a9a'); for(let x=606;x<660;x+=16) for(let y=322;y<356;y+=12){ g.strokeStyle='rgba(59,42,28,.4)'; g.lineWidth=1.5; g.strokeRect(x,y,14,10); }
    rect(g,604,262,6,58,'#8a5a34',2); rect(g,654,262,6,58,'#8a5a34',2); poly(g,[594,268,632,240,670,268],'#c0452f'); rect(g,620,300,20,16,'#b5773f',2); g.strokeStyle=OL; g.lineWidth=2; g.beginPath(); g.moveTo(630,272); g.lineTo(630,300); g.stroke(); }
  // будка с псом
  if(has('dog')){ poly(g,[60,350,60,310,90,290,120,310,120,350],'#b5773f'); g.beginPath(); g.arc(90,340,14,P,0); g.lineTo(104,350); g.lineTo(76,350); g.fillStyle='#3b2a1c'; g.fill();
    const w=Math.sin(t*8)*5; circ(g,140,340,15,'#e0b07a'); circ(g,150,326,11,'#e0b07a'); poly(g,[144,318,140,306,152,316],'#a8743f',2); circ(g,154,325,2,OL,0); circ(g,160,328,3,OL,0);
    g.strokeStyle=OL; g.lineWidth=4; g.lineCap='round'; g.beginPath(); g.moveTo(126,336); g.lineTo(116,326+w); g.stroke(); }
  // подсолнухи
  if(has('sunflowers')) for(const [x,h] of [[176,96],[192,80],[700,100]]){ g.strokeStyle='#3f8f33'; g.lineWidth=5; g.beginPath(); g.moveTo(x,330); g.lineTo(x,330-h); g.stroke();
    for(let i=0;i<10;i++){ g.save(); g.translate(x,330-h); g.rotate(i*P/5+Math.sin(t)*.05); g.beginPath(); g.ellipse(0,-14,6,10,0,0,7); g.fillStyle='#ffc61a'; g.fill(); g.lineWidth=1.5; g.strokeStyle=OL; g.stroke(); g.restore(); }
    circ(g,x,330-h,9,'#7a4a22',2); }
  // грядки с овощами
  if(has('beds')){ for(const [x,veg] of [[150,'#ef4434'],[250,'#5cbf45'],[430,'#ff9326']]){ rect(g,x,360,90,26,'#875a39',3,6);
      for(let i=0;i<4;i++){ const vx=x+14+i*21; g.strokeStyle='#3f8f33'; g.lineWidth=3; g.beginPath(); g.moveTo(vx,362); g.lineTo(vx,350); g.stroke(); circ(g,vx,352,7,veg,2); } } }
  else { g.fillStyle='#8a7a4e'; for(const [x,y] of [[160,370],[300,380],[450,372],[560,384]]){ for(let i=-2;i<=2;i++){ g.beginPath(); g.ellipse(x+i*6,y,3,12,i*.3,0,7); g.fill(); } } }
  // забор
  if(has('fence')){ for(let x=4;x<720;x+=24){ if(x>292&&x<392) continue; poly(g,[x,432,x,404,x+9,394,x+18,404,x+18,432],'#fff3dc',2); }
    rect(g,0,410,292,6,'#f0dcb8',2); rect(g,392,410,328,6,'#f0dcb8',2); }
  else { for(const x of [40,110,520,650]){ g.save(); g.translate(x,420); g.rotate((x%7)/10-.3); rect(g,-4,-30,8,34,'#7f7466',2); g.restore(); } }
}
window.MJ_DACHA={ITEMS,draw};
})();
