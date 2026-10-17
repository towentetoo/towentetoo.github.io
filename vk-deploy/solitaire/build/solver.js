/* Пасьянс — решатель Косынки (сдача по 1, без ограничения кругов). Знает все карты («вдумчивый» пасьянс):
   если решатель находит решение, раскладку гарантированно можно пройти.
   window.SOL_SOLVER.solvable(tab, talon, limit) → true / false / null (не уложился в лимит)
   tab: 7 столбцов [{c:код 0..51, up}], talon: [коды]. Код = масть*13 + достоинство. */
(()=>{
'use strict';
const S=c=>(c/13)|0, R=c=>c%13, red=c=>{ const s=S(c); return s===1||s===2; };
function solvable(tab0,talon0,limit){
  limit=limit||40000;
  // состояние: cols[i] = {down:[коды], up:[коды]}, found[4] = следующий нужный ранг, talon = Set
  const cols=tab0.map(col=>({down:col.filter(x=>!x.up).map(x=>x.c), up:col.filter(x=>x.up).map(x=>x.c)}));
  const found=[0,0,0,0], talon=new Set(talon0);
  const seen=new Set(); let nodes=0;
  const key=()=>found.join(',')+'|'+cols.map(c=>c.down.length+':'+c.up.join('.')).sort().join('/')+'|'+[...talon].sort((a,b)=>a-b).join('.');
  const canF=c=>found[S(c)]===R(c);
  const canT=(c,col)=>col.up.length?(red(col.up[col.up.length-1])!==red(c)&&R(col.up[col.up.length-1])===R(c)+1):(col.down.length===0&&R(c)===12);
  const flip=col=>{ if(!col.up.length&&col.down.length){ col.up.push(col.down.pop()); return true; } return false; };
  function won(){ return cols.every(c=>c.down.length===0); }   // всё открыто — дальше собирается всегда
  function dfs(depth){
    if(won()) return true;
    if(++nodes>limit) return null;
    const k=key(); if(seen.has(k)) return false; seen.add(k);
    // 1) безопасные ходы в дом делаем сразу (без ветвления)
    // 2) перебор: в дом, открывающие ходы, из колоды в столбцы
    const moves=[];
    cols.forEach((col,i)=>{ if(col.up.length){ const c=col.up[col.up.length-1]; if(canF(c)) moves.push({t:'cf',i,p:100-R(c)}); } });
    for(const c of talon) if(canF(c)) moves.push({t:'tf',c,p:90-R(c)});
    cols.forEach((col,i)=>{ if(!col.up.length) return;
      for(let j=0;j<col.up.length;j++){ const c=col.up[j];
        // целиком открытая часть — только если откроем закрытую карту или освободим столбец с королём не в основании
        const whole=j===0; if(!whole){ const under=col.up[j-1]; if(!canF(under)) continue; }
        if(whole&&col.down.length===0&&R(c)===12) continue;      // король и так в основании
        cols.forEach((d,k2)=>{ if(k2===i||!canT(c,d)) return; if(!d.up.length&&!d.down.length&&whole&&col.down.length===0) return;
          moves.push({t:'tt',i,j,k:k2,p:whole&&col.down.length?60+col.down.length:20}); }); } });
    for(const c of talon) cols.forEach((d,k2)=>{ if(canT(c,d)) moves.push({t:'kt',c,k:k2,p:40}); });
    moves.sort((a,b)=>b.p-a.p);
    for(const m of moves){
      // применить
      let undo;
      if(m.t==='cf'){ const col=cols[m.i], c=col.up.pop(); found[S(c)]++; const f=flip(col); undo=()=>{ if(f) col.down.push(col.up.pop()); found[S(c)]--; col.up.push(c); }; }
      else if(m.t==='tf'){ talon.delete(m.c); found[S(m.c)]++; undo=()=>{ found[S(m.c)]--; talon.add(m.c); }; }
      else if(m.t==='tt'){ const a=cols[m.i], b=cols[m.k], run=a.up.splice(m.j); b.up.push(...run); const f=flip(a); undo=()=>{ if(f) a.down.push(a.up.pop()); b.up.splice(b.up.length-run.length); a.up.push(...run); }; }
      else { talon.delete(m.c); cols[m.k].up.push(m.c); undo=()=>{ cols[m.k].up.pop(); talon.add(m.c); }; }
      const r=dfs(depth+1); undo();
      if(r) return true; if(r===null) return null;
    }
    return false;
  }
  return dfs(0);
}
window.SOL_SOLVER={solvable};
})();
