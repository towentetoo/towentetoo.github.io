/* Уютный маджонг — фоновая музыка. Написанная композиция (не случайные ноты):
   фа мажор, 84 BPM, свинг. Форма A–B–A'–B' по 8 тактов, ≈ 91 с.
   Инструменты: электропиано (FM), калимба-мелодия, мягкий бас, шейкер, эхо зала.
   Рендерится один раз в OfflineAudioContext → бесшовная петля. window.MJ_MUSIC.render(sr) → Promise<AudioBuffer> */
(()=>{
'use strict';
const BPM=84, BEAT=60/BPM, BARS=32, LOOP=BARS*4*BEAT, TAIL=4;
const mf=m=>440*Math.pow(2,(m-69)/12);

// --- гармония: [аккорд электропиано, бас]
const CH={F:[[53,57,60,64],41], Dm:[[50,53,57,60],38], Gm:[[55,58,62,65],43], C7:[[58,60,64,67],36],
          Am:[[57,60,64,67],45], Bb:[[58,62,65,69],46], Csus:[[58,60,62,65],36]};
const PROG_A=['F','Dm','Gm','C7','F','Am','Bb','Csus'];
const PROG_B=['Bb','C7','Am','Dm','Gm','C7','F','C7'];
// --- мелодия: [доля от начала секции, длительность в долях, MIDI]
const MEL_A=[[.5,.5,72],[1,1,69],[2,.5,72],[2.5,1.5,77], [4,1,76],[5,.5,74],[5.5,.5,72],[6,2,74],
  [8.5,.5,70],[9,1,74],[10,.5,72],[10.5,1.5,70], [12,1,69],[13,.5,67],[13.5,.5,69],[14,2,72],
  [16.5,.5,72],[17,1,69],[18,.5,72],[18.5,1.5,81], [20,1,79],[21,.5,77],[21.5,.5,76],[22,2,76],
  [24,.5,74],[24.5,.5,76],[25,1,77],[26,1,74],[27,1,70], [28,1.5,72],[29.5,.5,74],[30,2,72]];
const MEL_B=[[0,1,74],[1,1,77],[2,1.5,81],[3.5,.5,79], [4,1,79],[5,.5,77],[5.5,.5,76],[6,2,79],
  [8,1,76],[9,1,72],[10,1.5,76],[11.5,.5,74], [12,1,74],[13,.5,72],[13.5,.5,69],[14,2,74],
  [16,.5,70],[16.5,.5,72],[17,1,74],[18,1,77],[19,1,74], [20,1.5,76],[21.5,.5,74],[22,1,72],[23,1,70],
  [24,2,69],[26,1,72],[27,1,77], [28,2,76],[30,1,72],[31,1,74]];
// во втором проходе A' мелодия слегка украшена (форшлаги), B' — с подголоском на терцию ниже
const SECTIONS=[{prog:PROG_A,mel:MEL_A,v:0},{prog:PROG_B,mel:MEL_B,v:0},{prog:PROG_A,mel:MEL_A,v:1},{prog:PROG_B,mel:MEL_B,v:1}];

// детерминированный «человеческий» разброс, чтобы петля всегда звучала одинаково
let seed=7; const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const swing=b=>{ const f=b-Math.floor(b); return Math.abs(f-.5)<1e-6?Math.floor(b)+.58:b; };   // восьмые со свингом
const T=b=>Math.max(0.001,swing(b)*BEAT+(rnd()-.5)*0.018);                                                        // ±9 мс

function build(ctx,dest){
  const sr=ctx.sampleRate;
  // --- общая шина: тёплый фильтр → компрессор; параллельно эхо зала
  const master=ctx.createGain(); master.gain.value=0.9;
  const warm=ctx.createBiquadFilter(); warm.type='lowpass'; warm.frequency.value=5200; warm.Q.value=0.4;
  const comp=ctx.createDynamicsCompressor(); comp.threshold.value=-16; comp.ratio.value=3; comp.attack.value=.01; comp.release.value=.25;
  master.connect(warm); warm.connect(comp); comp.connect(dest);
  const verb=ctx.createConvolver(), vlen=Math.floor(sr*2.2), ir=ctx.createBuffer(2,vlen,sr);
  for(let c=0;c<2;c++){ const d=ir.getChannelData(c); for(let i=0;i<vlen;i++){ const k=i/vlen; d[i]=(rnd()*2-1)*Math.pow(1-k,3.2)*(i<sr*.012?i/(sr*.012):1); } }
  verb.buffer=ir; const vsend=ctx.createGain(); vsend.gain.value=.32; vsend.connect(verb);
  const vlp=ctx.createBiquadFilter(); vlp.type='lowpass'; vlp.frequency.value=3500; verb.connect(vlp); vlp.connect(master);
  const out=(node,pan,rev)=>{ const p=ctx.createStereoPanner?ctx.createStereoPanner():null; const g=ctx.createGain(); g.gain.value=1;
    if(p){ p.pan.value=pan; node.connect(p); p.connect(master); p.connect(g); } else { node.connect(master); node.connect(g); }
    g.gain.value=rev; g.connect(vsend); };

  // электропиано: FM 1:1 с затухающим индексом + немного 2-й гармоники
  function ep(t,m,vel,dur,pan){
    const f=mf(m), car=ctx.createOscillator(), mod=ctx.createOscillator(), mi=ctx.createGain(), amp=ctx.createGain();
    car.frequency.value=f; mod.frequency.value=f; car.detune.value=(rnd()-.5)*6;
    mi.gain.setValueAtTime(f*1.6*vel,t); mi.gain.exponentialRampToValueAtTime(f*0.15,t+1.2);
    mod.connect(mi); mi.connect(car.frequency);
    amp.gain.setValueAtTime(0.0001,t); amp.gain.linearRampToValueAtTime(.09*vel,t+.006);
    amp.gain.exponentialRampToValueAtTime(.035*vel,t+.6); amp.gain.setTargetAtTime(.0001,t+dur,.25);
    car.connect(amp); out(amp,pan,.55);
    car.start(t); mod.start(t); car.stop(t+dur+1.5); mod.stop(t+dur+1.5);
  }
  // калимба / музыкальная шкатулка: FM 1:3.5 быстро гаснет + чистый тон
  function kal(t,m,vel,dur){
    const f=mf(m), car=ctx.createOscillator(), mod=ctx.createOscillator(), mi=ctx.createGain(), amp=ctx.createGain(), body=ctx.createOscillator(), bg=ctx.createGain();
    car.frequency.value=f; mod.frequency.value=f*3.5; mi.gain.setValueAtTime(f*2.2*vel,t); mi.gain.exponentialRampToValueAtTime(1,t+.18);
    mod.connect(mi); mi.connect(car.frequency);
    amp.gain.setValueAtTime(.0001,t); amp.gain.linearRampToValueAtTime(.11*vel,t+.004); amp.gain.exponentialRampToValueAtTime(.0001,t+Math.max(.9,dur*BEAT*1.6));
    body.frequency.value=f; body.type='triangle'; bg.gain.setValueAtTime(.0001,t); bg.gain.linearRampToValueAtTime(.05*vel,t+.02);
    bg.gain.exponentialRampToValueAtTime(.0001,t+dur*BEAT+.4);
    car.connect(amp); body.connect(bg); out(amp,.12,.7); out(bg,.12,.5);
    const end=t+Math.max(1.2,dur*BEAT*1.8); car.start(t); mod.start(t); body.start(t); car.stop(end); mod.stop(end); body.stop(end);
  }
  function bass(t,m,dur){
    const f=mf(m), o=ctx.createOscillator(), o2=ctx.createOscillator(), g2=ctx.createGain(), lp=ctx.createBiquadFilter(), amp=ctx.createGain();
    o.frequency.value=f; o2.type='triangle'; o2.frequency.value=f*2; g2.gain.value=.18;
    lp.type='lowpass'; lp.frequency.value=420;
    amp.gain.setValueAtTime(.0001,t); amp.gain.linearRampToValueAtTime(.2,t+.015); amp.gain.exponentialRampToValueAtTime(.09,t+.5); amp.gain.setTargetAtTime(.0001,t+dur,.08);
    o.connect(lp); o2.connect(g2); g2.connect(lp); lp.connect(amp); out(amp,0,.08);
    o.start(t); o2.start(t); o.stop(t+dur+.6); o2.stop(t+dur+.6);
  }
  const noise=ctx.createBuffer(1,sr*.2|0,sr); { const d=noise.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=rnd()*2-1; }
  function shaker(t,vel){
    const s=ctx.createBufferSource(), bp=ctx.createBiquadFilter(), amp=ctx.createGain();
    s.buffer=noise; bp.type='bandpass'; bp.frequency.value=7500; bp.Q.value=.9;
    amp.gain.setValueAtTime(.0001,t); amp.gain.linearRampToValueAtTime(.05*vel,t+.012); amp.gain.exponentialRampToValueAtTime(.0001,t+.09);
    s.connect(bp); bp.connect(amp); out(amp,-.3,.15); s.start(t); s.stop(t+.12);
  }

  // все ноты считаются один раз (с «человеческим» разбросом), дальше планировщик подаёт их с запасом ~1 с
  const EV=[]; const E=(fn,t,...args)=>EV.push([t,fn,args]);
  SECTIONS.forEach((sec,si)=>{
    const b0=si*32;   // 8 тактов × 4 доли
    sec.prog.forEach((name,bar)=>{
      const [notes,root]=CH[name], b=b0+bar*4;
      const v=.75+rnd()*.2;
      // левая рука: аккорд «перебором» на 1, верх на «2-и», середина на «3-и», в конце такта — подхват
      notes.forEach((m,i)=>E(ep,T(b)+i*.018,m,v*(i===0?.8:1),BEAT*1.9,(i-1.5)*.15));
      E(ep,T(b+1.5),notes[2],v*.6,BEAT*.9,.2); E(ep,T(b+1.5)+.015,notes[3],v*.6,BEAT*.9,.25);
      E(ep,T(b+2.5),notes[1],v*.55,BEAT*.9,-.2); E(ep,T(b+2.5)+.015,notes[2],v*.55,BEAT*1.2,-.1);
      if(bar%2) E(ep,T(b+3.5),notes[3]+(sec.v?12:0),v*.45,BEAT*.5,.3);
      // бас: тоника на 1, квинта на 3, проходящая нота
      E(bass,T(b),root,BEAT*1.7); E(bass,T(b+2),root+7,BEAT*1.2);
      if(bar%2===1) E(bass,T(b+3.5),root+(bar===7?-1:2),BEAT*.45);
      // шейкер — только во второй половине формы и в B, тихо, со свингом
      if(si>0) for(let k=0;k<4;k++){ E(shaker,T(b+k),.35+rnd()*.15); E(shaker,T(b+k+.5),.7+rnd()*.25); }
    });
    for(const [bb,dur,m] of sec.mel){
      const t=T(b0+bb), v=.75+rnd()*.25;
      if(sec.v&&dur>=1.5&&si===2) E(kal,Math.max(.001,t-.07),m+2,v*.5,.25);            // форшлаг в A'
      E(kal,t,m,v,dur);
      if(sec.v&&si===3) E(kal,t+.01,m-(m%12===5||m%12===0?4:3),v*.45,dur); // подголосок в B'
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
    scheduleAll(upTo=1e9){ for(const ev of EV) if(ev[0]<upTo) ev[1](ev[0]+0.001,...ev[2]); }   // для офлайн-экспорта
  };
}
window.MJ_MUSIC={build,LOOP,TAIL};
})();
