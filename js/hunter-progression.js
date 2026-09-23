// Reuse Ninja's shop/debug engine with Hunter's own problems, medals and artwork.
var APP_KEYS = { SHOP: 'hikizan_shop_v1', FX: 'hikizan_fx_v1' };
var shopData = storageLoadJSON(APP_KEYS.SHOP, {});
var badgeData = storageLoadJSON('hikizan_awards_v1', {});
var hunterFx = storageLoadJSON('hikizan_fx_v1', {});
var curCourse = '20';
function saveBadgeData() { storageSaveJSON('hikizan_awards_v1', badgeData); }
var hunterEffectKeys = {perfect:'fx_perfect',medal:'fx_medal',evolution:'fx_evolution',answer:'fx_answer',burst:'fx_shuriken'};
Object.keys(hunterEffectKeys).forEach(function(key){if(typeof hunterFx[key]==='boolean' && typeof hunterFx[hunterEffectKeys[key]]!=='boolean')hunterFx[hunterEffectKeys[key]]=hunterFx[key];});
if(typeof hunterFx.fx_sfx!=='boolean')hunterFx.fx_sfx=sfxOn;
storageSaveJSON(APP_KEYS.FX,hunterFx);
function hunterEffectEnabled(key) { return typeof getFx==='function' ? getFx(hunterEffectKeys[key] || key) : hunterFx[key]!==false; }
function getAchStageByCount(total) {var stage=ACH_STAGES[getAchStageIndex(total)];return Object.assign({},stage,{name:stage.title});}
function setSfxEnabled(on) {if(sfxOn!==!!on)toggleSfx();}
function syncAudioControlButtons() {
  [['sfx-btn',sfxOn,'🔔','🔕','おと'],['voice-btn',voiceOn,'🗣','🔇','こえ']].forEach(function(row){var button=document.getElementById(row[0]);button.className='snd-btn '+(row[1]?'on':'off');button.textContent=(row[1]?row[2]:row[3])+' '+row[4];});
}
function syncHunterStarsUI(value) {
  document.querySelectorAll('[data-hunter-stars]').forEach(function(el) { el.textContent = '★ ' + value; });
}
var HunterHud = {
  getStarCount: function() { return Math.max(0, parseInt(storageLoadText('hikizan_stars_total','0'),10) || 0); },
  setStarCount: function(value) { var n = Math.max(0, Math.floor(Number(value) || 0)); storageSaveText('hikizan_stars_total',n); syncHunterStarsUI(n); return n; },
  addStarCount: function(value) { return this.setStarCount(this.getStarCount()+value); }
};
var hunterRawKotsuProgress = getKotsuProgress;
function hunterBadgeReady(def) {
  if(def.challenge)return storageLoadText('hikizan_challenge_'+def.mode+'_'+def.challenge+'_clear','0')==='1';
  var problems = buildP(def.mode);
  var mastered = problems.filter(function(p) { return getSt(gD[gk(def.mode,p)]) === 'master'; }).length;
  return problems.length > 0 && mastered >= (def.limit === 'all' ? problems.length : def.limit);
}
var BADGES = ACH_BADGE_DEFS.map(function(def) { return {id:def.key,name:def.title,img:def.img}; });
var ACH_GEMS = KOTSU_IMG_DEFS.map(function(def) {
  return {id:def.key,label:def.title,img:kotsuImgSrc(def),check:function() {return !!badgeData['kotsu_'+def.key];}};
});
getAchBadgeUnlocked = function(def) { return !!badgeData[def.key]; };
getKotsuProgress = function(def) {
  var progress = hunterRawKotsuProgress(def);
  var gem = ACH_GEMS.find(function(g) { return g.id === def.key; });
  progress.allMaster = gem ? gem.check() : false;
  return progress;
};
function getUnlockedAchievementCount() {
  var counts = getAchTabCounts();
  return {totalOn:counts.badgeOn+counts.kotsuOn,totalAll:BADGES.length+ACH_GEMS.length};
}
function collectHunterAwards() {
  if (typeof isDebugAutoAwardOn === 'function' && !isDebugAutoAwardOn()) return [];
  var added = [];
  ACH_BADGE_DEFS.forEach(function(def) {
    if (!badgeData[def.key] && hunterBadgeReady(def)) {
      badgeData[def.key] = {date:new Date().toISOString()};
      added.push({img:def.img,title:hunterCreatureName(def),master:hunterMasterLabel(def)});
    }
  });
  KOTSU_IMG_DEFS.forEach(function(def) {
    var key = 'kotsu_'+def.key;
    if (!badgeData[key] && hunterRawKotsuProgress(def).allMaster) {
      badgeData[key] = {date:new Date().toISOString()};
      added.push({img:kotsuImgSrc(def),title:hunterCreatureName(def),master:hunterMasterLabel(def)});
    }
  });
  saveBadgeData(); return added;
}
// Preserve medals already earned in the previous, record-derived version.
if (storageLoadText('hikizan_awards_migrated_v1','') !== '1') {
  collectHunterAwards(); storageSaveText('hikizan_awards_migrated_v1','1');
}
var hunterOriginalRenderAchievements = renderAchievements;
renderAchievements = function() {
  hunterOriginalRenderAchievements();
  var group = document.getElementById('ach-group-shop');
  if (group) { group.style.display = ACH_TAB === 'shop' ? 'block' : 'none'; renderShopCollection(); }
  if (ACH_TAB === 'shop') document.getElementById('ach-footer-next').textContent = '練習でためた★で、探索どうぐやおたからをあつめよう。';
};
function renderAchievement() { renderAchievements(); }
var hunterBaseShow=show,hunterWipeTimer=null;
show=function(screen){
  if(recitationActive())return;
  var previous=document.querySelector('.sc.on');
  hunterBaseShow(screen);
  var wipe=document.getElementById('scene-wipe');
  if(wipe && previous && previous.id!==screen && getFx('fx_wipe')){
    clearTimeout(hunterWipeTimer);wipe.classList.remove('active');void wipe.offsetWidth;wipe.classList.add('active');
    hunterWipeTimer=setTimeout(function(){wipe.classList.remove('active');},650);
  }
};
var hunterOriginalOverview = renderAchievementOverview;
renderAchievementOverview = function(total) {
  return hunterOriginalOverview(typeof total === 'number' ? total : getUnlockedAchievementCount().totalOn);
};
checkAchLevelUp = function(stageIdx) {
  if (stageIdx <= getSeenAchStage()) return;
  setSeenAchStage(stageIdx);
  if (hunterEffectEnabled('evolution')) playAchLevelUp(ACH_STAGES[stageIdx]);
};
var hunterPopupDone = null;
var hunterOriginalCloseMaster = closeAllMasterPopup;
closeAllMasterPopup = function() {
  hunterOriginalCloseMaster();
  var done = hunterPopupDone; hunterPopupDone = null;
  if (done) done();
};
function hunterFinishOutcome() {
  var session = sess, results = session.results || [];
  var total = results.length, correct = results.filter(function(r) {return r.ok;}).length;
  var acc = total ? Math.round(correct / total * 100) : 0;
  var elapsed = results.reduce(function(sum,r) {return sum+r.el;},0);
  var completed = total > 0 && total === session.queue.length;
  var mastered = sessMode === 'normal' ? buildP(gSt.mode).filter(function(p) {return getSt(gD[gk(gSt.mode,p)])==='master';}).length : kBuildP().filter(function(p) {return getSt(kD[kk(kSt.kind,kSt.axis,kSt.num,p)])==='master';}).length;
  document.getElementById('rv-t').textContent = total+'もん';
  document.getElementById('rv-a').textContent = acc+'%';
  document.getElementById('rv-avg').textContent = (total ? elapsed/total/1000 : 0).toFixed(1)+'秒';
  document.getElementById('rv-m').textContent = mastered+'もん';
  document.getElementById('rbi').textContent = acc===100 && completed ? '🎉' : acc>=70 ? '😊' : '💪';
  document.getElementById('rt2').textContent = acc===100 && completed ? 'かんぺき！すごい！' : acc>=70 ? 'よくできました！' : 'もう少し！がんばれ！';
  document.getElementById('rs2').textContent = total+'もんちゅう '+correct+'もん せいかい';
  curCourse = session.scope === 'all' ? 'all' : '20';
  var newAwards = collectHunterAwards();
  var stars = grantHunterStars({tot:total,cor:correct,acc:acc},completed);
  document.getElementById('hunter-result-reward').textContent = '★ '+stars+' ゲット！　ためた★ '+HunterHud.getStarCount();
  show('result');
  function evolve() {
    if (sess !== session) return;
    renderAchievementOverview();
    var stage=getAchStageIndex(getUnlockedAchievementCount().totalOn),seen=getSeenAchStage();
    if(stage>seen){setSeenAchStage(stage);if(hunterEffectEnabled('evolution'))showNinjaLevelUpEffect(ACH_STAGES[seen].min);}
  }
  function nextAward() {
    if (sess !== session || !document.getElementById('result').classList.contains('on')) return;
    if (!newAwards.length || !hunterEffectEnabled('medal')) {evolve();return;}
    var award = newAwards.shift();
    showGemUnlockEffect(award.img,award.master+' マスター！\n'+award.title+'ゲット！',nextAward);
  }
  if (acc===100 && completed) {
    sndHunterPerfect();
    if (hunterEffectEnabled('perfect')) showPerfectEffect(nextAward); else nextAward();
  }
  else {if(acc>=70)sndGoodFinish();else sndTryAgain();nextAward();}
}
function hunterBackupPayload() {
  var values = {};
  for (var i=0;i<localStorage.length;i++) {
    var key=localStorage.key(i);
    if (key && key.indexOf('hikizan_')===0) values[key]=localStorage.getItem(key);
  }
  return {schema:'hikizan-hunter-save',version:1,values:values};
}
function exportHunterSave() {
  var url=URL.createObjectURL(new Blob([JSON.stringify(hunterBackupPayload(),null,2)],{type:'application/json'}));
  var a=document.createElement('a');a.href=url;a.download='幻獣ハンター_'+new Date().toISOString().slice(0,10)+'.json';a.click();
  setTimeout(function(){URL.revokeObjectURL(url);},1000);
}
function importHunterSave(text) {
  var data=JSON.parse(text);
  if (!data || data.schema!=='hikizan-hunter-save' || data.version!==1 || !data.values || typeof data.values!=='object' || Array.isArray(data.values)) throw Error('幻獣ハンターのセーブファイルを選んでください。');
  var keys=Object.keys(data.values);
  if (!keys.every(function(key){return key.indexOf('hikizan_')===0 && typeof data.values[key]==='string';})) throw Error('セーブデータの形式が正しくありません。');
  ['hikizan_gD','hikizan_kD','hikizan_awards_v1','hikizan_shop_v1','hikizan_fx_v1','hikizan_learning_v1','hikizan_imgs_custom','hikizan_voice'].forEach(function(key){
    if (!Object.prototype.hasOwnProperty.call(data.values,key)) return;
    var value=JSON.parse(data.values[key]);
    if (!value || typeof value!=='object' || Array.isArray(value)) throw Error('セーブデータの内容が正しくありません。');
    if (key==='hikizan_gD' || key==='hikizan_kD') Object.keys(value).forEach(function(recordKey){var r=value[recordKey];if(!r || !Number.isFinite(r.att) || !Number.isFinite(r.cor) || r.att<0 || r.cor<0 || r.cor>r.att)throw Error('問題記録の形式が正しくありません。');});
  });
  var previous=hunterBackupPayload().values;
  try {
    Object.keys(previous).forEach(function(key){localStorage.removeItem(key);});
    keys.forEach(function(key){localStorage.setItem(key,data.values[key]);});
  } catch(error) {
    keys.forEach(function(key){localStorage.removeItem(key);});
    Object.keys(previous).forEach(function(key){localStorage.setItem(key,previous[key]);});
    throw Error('保存容量が足りません。元のデータに戻しました。');
  }
  return true;
}
document.addEventListener('DOMContentLoaded',function() {
  setSfxEnabled(getFx('fx_sfx'));syncAudioControlButtons();
  initButtonFX();
  var wipe=document.createElement('div');wipe.id='scene-wipe';wipe.setAttribute('aria-hidden','true');wipe.innerHTML='<div class="wipe-backdrop"></div><div class="wipe-burst"></div><div class="wipe-swipe"></div><div class="wipe-star"></div>';document.body.appendChild(wipe);
  IMG_B64_DEFAULT.seikai='img/seikai.png';IMG_B64_DEFAULT.fuseikai='img/fuseikai.png';IMG_B64_DEFAULT.master='img/master.png';syncImageSettingsUI();
  var stars=document.createElement('button');stars.type='button';stars.className='hunter-stars';stars.setAttribute('data-hunter-stars','');stars.onclick=function(){setAchTab('shop');show('achievements');};
  document.getElementById('home').appendChild(stars);syncHunterStarsUI(HunterHud.getStarCount());
  var reward=document.createElement('p');reward.id='hunter-result-reward';reward.className='hunter-reward';document.getElementById('rs2').after(reward);
  var settings=document.createElement('section');settings.className='learning-settings';settings.id='hunter-effect-settings';
  settings.innerHTML='<h2>演出のせってい</h2><div id="fx-settings-area"></div>';
  FX_DEFS.push({key:'fx_medal',label:'🏅 メダル獲得の演出',sub:'新しいメダルを大きく表示',def:true},{key:'fx_evolution',label:'🏹 キャラクター進化の演出',sub:'ハンターの成長をお祝い',def:true},{key:'fx_answer',label:'🖼 正解・不正解の画像',sub:'設定した画像でフィードバック',def:true});
  settings.addEventListener('click',function(event){var row=event.target.closest('[data-action="toggleFx"]');if(row)toggleFx(row.dataset.value);});
  document.getElementById('settings').appendChild(settings);
  renderFxSettings();
  var save=document.createElement('section');save.className='learning-settings';save.innerHTML='<h2>データの保存・復元</h2><p>記録・メダル・★・買い物・設定をまとめて保存します。</p><button id="hunter-export">ファイルに保存</button> <button id="hunter-import">ファイルから復元</button><input id="hunter-import-file" type="file" accept=".json,application/json" hidden>';
  document.getElementById('advanced-settings').appendChild(save);document.getElementById('hunter-export').onclick=exportHunterSave;
  document.getElementById('hunter-import').onclick=function(){document.getElementById('hunter-import-file').click();};
  document.getElementById('hunter-import-file').onchange=async function(){var file=this.files[0];if(!file)return;try{var text=await file.text();var parsed=JSON.parse(text);if(parsed.schema!=='hikizan-hunter-save')throw Error('幻獣ハンターのセーブファイルを選んでください。');if(!confirm('このファイルで幻獣ハンターのデータを復元しますか？'))return;importHunterSave(text);location.reload();}catch(e){alert(e.message);}finally{this.value='';}};
});

// Match the addition app’s full-score fanfare.
function sndHunterPerfect(){
  if (!sfxOn) return;
  var ac = getAC(); if (!ac) return;
  var t = ac.currentTime;
  [[0,80],[0.08,60],[0.16,50]].forEach(function(pair){
    var osc=ac.createOscillator(), g=ac.createGain();
    osc.connect(g); g.connect(ac.destination);
    osc.type='sawtooth'; osc.frequency.setValueAtTime(pair[1], t+pair[0]);
    g.gain.setValueAtTime(0.55, t+pair[0]);
    g.gain.exponentialRampToValueAtTime(0.001, t+pair[0]+0.18);
    osc.start(t+pair[0]); osc.stop(t+pair[0]+0.18);
  });
  [0,0.08,0.16].forEach(function(d){
    var osc=ac.createOscillator(), g=ac.createGain();
    osc.connect(g); g.connect(ac.destination);
    osc.type='sine'; osc.frequency.setValueAtTime(120, t+d);
    osc.frequency.exponentialRampToValueAtTime(40, t+d+0.15);
    g.gain.setValueAtTime(0.7, t+d);
    g.gain.exponentialRampToValueAtTime(0.001, t+d+0.22);
    osc.start(t+d); osc.stop(t+d+0.22);
  });
  var chars=['ぜ','ん','も','ん','せ','い','か','い'];
  chars.forEach(function(_, i){
    var d=0.30+i*0.28;
    var osc=ac.createOscillator(), g=ac.createGain();
    osc.connect(g); g.connect(ac.destination);
    osc.type='square'; osc.frequency.setValueAtTime(200-i*8, t+d);
    osc.frequency.exponentialRampToValueAtTime(60, t+d+0.12);
    g.gain.setValueAtTime(0.4, t+d);
    g.gain.exponentialRampToValueAtTime(0.001, t+d+0.18);
    osc.start(t+d); osc.stop(t+d+0.18);
    var osc2=ac.createOscillator(), g2=ac.createGain();
    osc2.connect(g2); g2.connect(ac.destination);
    osc2.type='sine'; osc2.frequency.setValueAtTime(1200+i*80, t+d);
    g2.gain.setValueAtTime(0.18, t+d);
    g2.gain.exponentialRampToValueAtTime(0.001, t+d+0.10);
    osc2.start(t+d); osc2.stop(t+d+0.10);
  });
  var fanfare=[{f:523,d:0.12,delay:0},{f:659,d:0.12,delay:0.12},{f:784,d:0.12,delay:0.24},{f:1047,d:0.18,delay:0.36},{f:1319,d:0.40,delay:0.54}];
  var fanStart=0.30+8*0.28+0.2;
  fanfare.forEach(function(n){
    var osc=ac.createOscillator(), g=ac.createGain();
    osc.connect(g); g.connect(ac.destination);
    osc.type='sine'; osc.frequency.setValueAtTime(n.f, t+fanStart+n.delay);
    g.gain.setValueAtTime(0.32, t+fanStart+n.delay);
    g.gain.exponentialRampToValueAtTime(0.001, t+fanStart+n.delay+n.d);
    osc.start(t+fanStart+n.delay); osc.stop(t+fanStart+n.delay+n.d);
  });
}
