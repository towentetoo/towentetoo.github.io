/* T&C STUDIO — platform layer core.
 * The games were written against the Yandex Games SDK. For VK and OK the build
 * puts this file + platform-vk.js / platform-ok.js in place of /sdk.js: it defines
 * window.YaGames with the same subset of the API the games call, implemented on
 * top of the target platform SDK. Game logic stays identical on all platforms. */
(function(){
'use strict';
const TC=window.__TC=window.__TC||{};

TC.log=function(){ try{ (window.__plog=window.__plog||[]).push(Array.prototype.join.call(arguments,' ')); }catch(e){} };
TC.timeout=(p,ms)=>Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms))]);

// localStorage that never throws (Safari private mode, blocked third-party storage in iframes)
TC.safeStorage=function(){
  try{ const k='__tc_probe'; localStorage.setItem(k,'1'); localStorage.removeItem(k); return localStorage; }catch(e){}
  const m=new Map();
  return { getItem:k=>m.has(k)?m.get(k):null, setItem:(k,v)=>{ m.set(k,String(v)); }, removeItem:k=>{ m.delete(k); },
    clear:()=>m.clear(), key:i=>Array.from(m.keys())[i]||null, get length(){ return m.size; } };
};

// Split a string into pieces of at most maxBytes UTF-8 bytes (never splits a character).
TC.chunk=function(str,maxBytes){
  const out=[]; let cur='', bytes=0;
  for(const ch of str){
    const cp=ch.codePointAt(0), b=cp<0x80?1:cp<0x800?2:cp<0x10000?3:4;
    if(bytes+b>maxBytes&&cur){ out.push(cur); cur=''; bytes=0; }
    cur+=ch; bytes+=b;
  }
  if(cur||!out.length) out.push(cur);
  return out;
};

// Key/value cloud storage with chunking. kv = {get(keys)->Promise<{key:value}>, set(key,value)->Promise}
// Layout: <key> holds the JSON itself, or "#c:<n>" with the JSON split over <key>__0 … <key>__<n-1>.
TC.chunkedStore=function(kv,maxBytes){
  return {
    async load(key){
      const head=(await kv.get([key]))[key];
      if(!head) return undefined;
      let json=head;
      const m=/^#c:(\d+)$/.exec(head);
      if(m){
        const n=+m[1], keys=[]; for(let i=0;i<n;i++) keys.push(key+'__'+i);
        const parts=await kv.get(keys);
        json=keys.map(k=>parts[k]||'').join('');
      }
      return JSON.parse(json);
    },
    async save(key,obj){
      const json=JSON.stringify(obj===undefined?null:obj);
      const parts=TC.chunk(json,maxBytes);
      if(parts.length===1){ await kv.set(key,json); return; }
      for(let i=0;i<parts.length;i++) await kv.set(key+'__'+i,parts[i]);   // chunks first,
      await kv.set(key,'#c:'+parts.length);                                    // head last
    }
  };
};

// Builds the YaGames-compatible object. impl provides platform specifics.
TC.makeSdk=function(impl){
  const listeners={};
  const emit=(e)=>{ (listeners[e]||[]).slice().forEach(f=>{ try{ f(); }catch(err){} }); };
  const store=impl.kv?TC.chunkedStore(impl.kv,impl.chunkBytes||4000):null;
  let adBusy=false, lastInter=0;
  const sdk={
    platform:impl.id,
    environment:{ i18n:{ lang:impl.lang||'ru' } },
    features:{
      LoadingAPI:{ ready(){ TC.log('ready'); try{ impl.ready&&impl.ready(); }catch(e){} } },
      GameplayAPI:{ start(){ TC.log('gp.start'); }, stop(){ TC.log('gp.stop'); } }
    },
    adv:{
      showFullscreenAdv({callbacks={}}={}){
        const cb=callbacks;
        // Same contract as Yandex: too soon → onClose(false) without opening.
        if(adBusy||Date.now()-lastInter<(impl.interGapMs||60000)){ TC.log('inter.skip'); setTimeout(()=>cb.onClose&&cb.onClose(false),0); return; }
        adBusy=true; TC.log('inter');
        let done=false;
        const fin=(fn,arg)=>{ if(done) return; done=true; adBusy=false; try{ fn&&fn(arg); }catch(e){} };
        try{ cb.onOpen&&cb.onOpen(); }catch(e){}
        impl.interstitial().then(shown=>{ if(shown) lastInter=Date.now(); TC.log('inter.close',shown); fin(cb.onClose,!!shown); })
          .catch(err=>{ TC.log('inter.error'); fin(cb.onError||cb.onClose,err); });
      },
      showRewardedVideo({callbacks={}}={}){
        const cb=callbacks;
        if(adBusy){ setTimeout(()=>cb.onError&&cb.onError(new Error('busy')),0); return; }
        adBusy=true; TC.log('rewarded');
        let done=false;
        try{ cb.onOpen&&cb.onOpen(); }catch(e){}
        impl.rewarded().then(watched=>{
          if(done) return; done=true; adBusy=false;
          if(watched){ TC.log('rewarded.ok'); try{ cb.onRewarded&&cb.onRewarded(); }catch(e){} }
          else TC.log('rewarded.skip');
          try{ cb.onClose&&cb.onClose(); }catch(e){}
        }).catch(err=>{ if(done) return; done=true; adBusy=false; TC.log('rewarded.error'); try{ cb.onError&&cb.onError(err); }catch(e){} });
      }
    },
    getStorage(){ return Promise.resolve(TC.safeStorage()); },
    getPlayer(){
      return Promise.resolve({
        isAuthorized:()=>!!impl.userId,
        getUniqueID:()=>impl.userId?String(impl.userId):'',
        getName:()=>'',
        getData(keys){
          if(!store) return Promise.resolve({});
          const ks=Array.isArray(keys)&&keys.length?keys:['save'];
          return Promise.all(ks.map(k=>store.load(k).then(v=>[k,v]))).then(arr=>{
            const o={}; arr.forEach(([k,v])=>{ if(v!==undefined) o[k]=v; }); TC.log('getData'); return o; });
        },
        setData(obj){
          if(!store) return Promise.reject(new Error('no cloud'));
          return Promise.all(Object.keys(obj||{}).map(k=>store.save(k,obj[k]))).then(()=>{ TC.log('setData'); });
        }
      });
    },
    isAvailableMethod:()=>Promise.resolve(false),     // leaderboards / payments are not provided this way
    leaderboards:{
      setScore:()=>Promise.reject(new Error('unsupported')),
      getEntries:()=>Promise.reject(new Error('unsupported'))
    },
    auth:undefined,                                    // players are always signed in on VK / OK
    getPayments:()=>Promise.reject(new Error('unsupported')),
    on(e,f){ (listeners[e]=listeners[e]||[]).push(f); },
    off(e,f){ listeners[e]=(listeners[e]||[]).filter(x=>x!==f); },
    // extras used by the games when platform !== 'yandex'
    nativeBoard:impl.nativeBoard||null,
    __emit:emit
  };
  if(impl.bindEvents) impl.bindEvents(emit);
  return sdk;
};
})();

/* T&C STUDIO — VK Games (VK Bridge) implementation of the YaGames subset. Requires vk-bridge.min.js + core.js. */
(function(){
'use strict';
const TC=window.__TC;
const q=new URLSearchParams(location.search);
const LANG={ru:'ru',uk:'uk',ua:'uk',be:'be',kz:'kk',en:'en',pt:'en',es:'en'};
const bridge=()=>window.vkBridge;
const send=(m,p)=>{ const b=bridge(); if(!b) return Promise.reject(new Error('no bridge')); return b.send(m,p||{}); };
let inVK=false;

const impl={
  id:'vk',
  lang:LANG[q.get('vk_language')]||'ru',
  userId:q.get('vk_user_id')||'',
  chunkBytes:4000,                                  // VK Storage: value up to 4096 bytes
  kv:{
    get(keys){
      if(!inVK) return Promise.reject(new Error('offline'));
      return send('VKWebAppStorageGet',{keys}).then(r=>{
        const o={}; ((r&&r.keys)||[]).forEach(x=>{ if(x&&x.value) o[x.key]=x.value; }); return o; });
    },
    set(key,value){
      if(!inVK) return Promise.reject(new Error('offline'));
      return send('VKWebAppStorageSet',{key,value});
    }
  },
  interGapMs:60000,
  interstitial(){
    if(!inVK) return Promise.reject(new Error('offline'));
    return send('VKWebAppShowNativeAds',{ad_format:'interstitial'}).then(r=>!!(r&&r.result)).finally(()=>preload('interstitial'));
  },
  rewarded(){
    if(!inVK) return Promise.reject(new Error('offline'));
    return send('VKWebAppCheckNativeAds',{ad_format:'reward'}).then(r=>{
      if(!(r&&r.result)) throw new Error('no ads');
      return send('VKWebAppShowNativeAds',{ad_format:'reward'});
    }).then(r=>!!(r&&r.result)).finally(()=>preload('reward'));
  },
  // Native VK leaderboard window; VK stores the result itself.
  nativeBoard(score){
    if(!inVK) return Promise.reject(new Error('offline'));
    return send('VKWebAppShowLeaderBoardBox',{user_result:Math.max(0,Math.floor(score||0))});
  },
  bindEvents(emit){
    const b=bridge(); if(!b||!b.subscribe) return;
    b.subscribe(e=>{
      const t=e&&e.detail&&e.detail.type;
      if(t==='VKWebAppViewHide') emit('game_api_pause');
      else if(t==='VKWebAppViewRestore') emit('game_api_resume');
    });
  }
};
function preload(fmt){ if(inVK) send('VKWebAppCheckNativeAds',{ad_format:fmt}).catch(()=>{}); }

let initP=null;
window.YaGames={
  init(){
    if(initP) return initP;
    // VKWebAppInit must be the first bridge message. Outside VK there is no answer → offline mode.
    initP=TC.timeout(send('VKWebAppInit'),4000).then(()=>{ inVK=true; },()=>{ inVK=false; TC.log('vk.offline'); })
      .then(()=>{
        if(inVK){
          send('VKWebAppDisableSwipeBack').catch(()=>{});   // drag gestures must not close the game on iOS
          preload('interstitial'); preload('reward');
        }
        const sdk=TC.makeSdk(impl);
        sdk.online=inVK;
        return sdk;
      });
    return initP;
  }
};
})();
