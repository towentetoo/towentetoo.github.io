/* Пасьянсы — фоновая музыка. Написанная композиция: салонный вальс, ре мажор, 3/4, 104 BPM.
   Форма A–B–A'–C по 8 тактов. Инструменты: рояль (аддитивный), струнный пэд, пиццикато-бас, челеста, зал.
   Живой планировщик с запасом 1.2 с. window.MJ_MUSIC.build(ctx,dest) → {start,stop,playing,scheduleAll} */
(()=>{
'use strict';
const BPM=104, BEAT=60/BPM, BARS=32, LOOP=BARS*3*BEAT, TAIL=4;
const mf=m=>440*Math.pow(2,(m-69)/12);
// аккорды: [голоса вальса «ум-па-па», бас]
const CH={D:[[57,62,66],38], A:[[57,61,64],33], A7:[[55,61,64],33], Bm:[[57,62,66],35], G:[[55,59,62],31], Em:[[55,59,64],40],
  Fs:[[58,61,66],42], Gm:[[55,58,62],31], E7:[[56,62,64],40], D7:[[54,57,60],38]};
const PA=['D','A','Bm','Fs','G','D','Em','A7'];
const PB=['G','A','D','Bm','Em','A','D','D7'];
const PC=['G','Gm','D','Bm','E7','A','D','A7'];
// мелодия: [доля от начала секции (3 доли в такте), длительность, MIDI]
const MA=[[0,2,74],[2,1,73],[3,2,71],[5,1,69],[6,1.5,74],[7.5,.5,76],[8,1,78],[9,3,78],
  [12,2,79],[14,1,78],[15,2,74],[17,1,69],[18,1,71],[19,1,73],[20,1,74],[21,3,76]];
const MB=[[0,1,71],[1,1,74],[2,1,79],[3,2,81],[5,1,79],[6,2,78],[8,1,74],[9,3,81],
  [12,1,79],[13,1,78],[14,1,76],[15,1.5,78],[16.5,.5,79],[17,1,81],[18,2,74],[20,1,73],[21,3,74]];
const MC=[[0,1,83],[1,1,81],[2,1,79],[3,2,79],[5,1,82],[6,2,81],[8,1,78],[9,3,74],
  [12,1,80],[13,1,81],[14,1,83],[15,2,85],[17,1,83],[18,1.5,81],[19.5,.5,78],[20,1,76],[21,3,73]];
const SECTIONS=[{prog:PA,mel:MA,v:0},{prog:PB,mel:MB,v:0},{prog:PA,mel:MA,v:1},{prog:PC,mel:MC,v:1}];
let seed=11; const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
// венский вальс: вторая доля чуть раньше
const T=b=>{ const f=b%3; return Math.max(0.001,(b-(Math.abs(f-1)<1e-6?.07:0))*BEAT+(rnd()-.5)*0.016); };

function build(ctx,dest){
  const sr=ctx.sampleRate;
  const master=ctx.createGain(); master.gain.value=0.85;
  const warm=ctx.createBiquadFilter(); warm.type='lowpass'; warm.frequency.value=6000; warm.Q.value=0.3;
  const comp=ctx.createDynamicsCompressor(); comp.threshold.value=-16; comp.ratio.value=3; comp.attack.value=.01; comp.release.value=.3;
  master.connect(warm); warm.connect(comp); comp.connect(dest);
  const verb=ctx.createConvolver(), vlen=Math.floor(sr*2.8), ir=ctx.createBuffer(2,vlen,sr);
  for(let c=0;c<2;c++){ const d=ir.getChannelData(c); for(let i=0;i<vlen;i++){ const k=i/vlen; d[i]=(rnd()*2-1)*Math.pow(1-k,3)*(i<sr*.02?i/(sr*.02):1); } }
  verb.buffer=ir; const vsend=ctx.createGain(); vsend.gain.value=.38; vsend.connect(verb);
  const vlp=ctx.createBiquadFilter(); vlp.type='lowpass'; vlp.frequency.value=3200; verb.connect(vlp); vlp.connect(master);
  const out=(node,pan,rev)=>{ const p=ctx.createStereoPanner?ctx.createStereoPanner():null; const g=ctx.createGain();
    if(p){ p.pan.value=pan; node.connect(p); p.connect(master); p.connect(g); } else { node.connect(master); node.connect(g); }
    g.gain.value=rev; g.connect(vsend); };

  // рояль: несколько гармоник с разным затуханием + молоточек
  function piano(t,m,vel,dur,pan){
    const f=mf(m), amp=ctx.createGain(), lp=ctx.createBiquadFilter(); lp.type='lowpass';
    lp.frequency.setValueAtTime(Math.min(9000,f*9*vel+800),t); lp.frequency.exponentialRampToValueAtTime(Math.max(400,f*2.5),t+1.5);
    amp.gain.setValueAtTime(.0001,t); amp.gain.linearRampToValueAtTime(.075*vel,t+.004);
    amp.gain.exponentialRampToValueAtTime(.028*vel,t+.5); amp.gain.setTargetAtTime(.0001,t+dur,.18);
    const end=t+dur+1.2;
    [[1,1],[2,.45],[3,.2],[4,.1]].forEach(([h,a],i)=>{ const o=ctx.createOscillator(), g=ctx.createGain(); o.frequency.value=f*h*(1+i*.0007); o.detune.value=(rnd()-.5)*4;
      g.gain.value=a; o.connect(g); g.connect(lp); o.start(t); o.stop(end); });
    lp.connect(amp); out(amp,pan,.5);
  }
  // струнный пэд: две пилы с расстройкой через мягкий фильтр, медленная атака
  function pad(t,notes,dur){
    const amp=ctx.createGain(), lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=1300; lp.Q.value=.5;
    amp.gain.setValueAtTime(.0001,t); amp.gain.linearRampToValueAtTime(.018,t+.5); amp.gain.setValueAtTime(.018,t+dur-.2); amp.gain.linearRampToValueAtTime(.0001,t+dur+.6);
    for(const m of notes) for(const d of [-7,7]){ const o=ctx.createOscillator(); o.type='sawtooth'; o.frequency.value=mf(m+12); o.detune.value=d; o.connect(lp); o.start(t); o.stop(t+dur+.7); }
    lp.connect(amp); out(amp,0,.9);
  }
  function pizz(t,m){
    const f=mf(m), o=ctx.createOscillator(), lp=ctx.createBiquadFilter(), amp=ctx.createGain(); o.type='triangle'; o.frequency.value=f;
    lp.type='lowpass'; lp.frequency.value=600;
    amp.gain.setValueAtTime(.0001,t); amp.gain.linearRampToValueAtTime(.26,t+.008); amp.gain.exponentialRampToValueAtTime(.0001,t+.55);
    o.connect(lp); lp.connect(amp); out(amp,-.1,.15); o.start(t); o.stop(t+.6);
  }
  // челеста: чистый синус + октава, быстро гаснет
  function celesta(t,m,vel,dur){
    const f=mf(m), end=t+Math.max(1,dur*BEAT*1.5), amp=ctx.createGain();
    amp.gain.setValueAtTime(.0001,t); amp.gain.linearRampToValueAtTime(.075*vel,t+.003); amp.gain.exponentialRampToValueAtTime(.0001,end);
    [[1,1],[2,.25],[4.2,.06]].forEach(([h,a])=>{ const o=ctx.createOscillator(), g=ctx.createGain(); o.frequency.value=f*h; g.gain.value=a; o.connect(g); g.connect(amp); o.start(t); o.stop(end+.05); });
    out(amp,.2,.75);
  }

  const EV=[]; const E=(fn,t,...args)=>EV.push([t,fn,args]);
  SECTIONS.forEach((sec,si)=>{
    const b0=si*24;
    sec.prog.forEach((name,bar)=>{
      const [notes,root]=CH[name], b=b0+bar*3, v=.7+rnd()*.2;
      E(pizz,T(b),root); if(bar%2) E(pizz,T(b+2),root+7);
      notes.forEach((m,i)=>{ E(piano,T(b+1)+i*.012,m,v*.55,BEAT*.8,(i-1)*.2); E(piano,T(b+2)+i*.012,m,v*.5,BEAT*.8,(i-1)*.2); });
      if(sec.v||si===1) if(bar%2===0) E(pad,T(b),notes,BEAT*6);
    });
    for(const [bb,dur,m] of sec.mel){
      const t=T(b0+bb), v=.75+rnd()*.25;
      E(piano,t,m,v,dur*BEAT,.1);
      if(sec.v&&si===2) E(celesta,t+.01,m+12,v*.55,dur);
      if(si===3&&dur>=2) E(piano,t+.01,m-(m%12===1||m%12===6||m%12===11?4:3),v*.45,dur*BEAT,-.15);
    }
  });
  EV.sort((x,y)=>x[0]-y[0]);
  let base=0, idx=0, timer=0, on=false;
  function pump(){
    const ahead=ctx.currentTime+1.2;
    while(on){
      if(idx>=EV.length){ idx=0; base+=LOOP; }
      const ev=EV[idx], t=base+ev[0];
      if(t>ahead) break;
      if(t>=ctx.currentTime-0.05) ev[1](Math.max(t,ctx.currentTime+0.005),...ev[2]);
      idx++;
    }
  }
  return {
    start(){ if(on) return; on=true; base=ctx.currentTime+0.1; idx=0; pump(); timer=setInterval(pump,250); },
    stop(){ on=false; clearInterval(timer); },
    get playing(){ return on; },
    scheduleAll(upTo=1e9){ for(const ev of EV) if(ev[0]<upTo) ev[1](ev[0]+0.001,...ev[2]); }
  };
}
window.MJ_MUSIC={build,LOOP,TAIL};
})();
