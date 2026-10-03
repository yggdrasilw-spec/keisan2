// The live Hunter reward definitions are the single source of names and references.
(function(){
  'use strict';
  var roster={};
  ACH_BADGE_DEFS.concat(KOTSU_IMG_DEFS).forEach(function(def){
    roster[def.key]={key:def.key,name:hunterCreatureName(def),reference:def.axis?kotsuImgSrc(def):def.img,
      sprite:'img/battle/'+def.key+'.png',course:def.mode||def.kind,training:!!def.axis,
      place:(def.mode||def.kind)==='borrow'?'mountain':(def.mode==='mix'?'stars':'forest')};
  });
  var normal={no:['easy_20','easy_all'],ten:['ten_all'],borrow:['hard_20','hard_all'],mix:['mix_20','mix_all']};
  function resolve(session,mode,course,kotsu){
    if(!session)return null;
    if(session.hunterChallenge==='shinsoku'||session.hunterChallenge==='super')return roster[course+'_'+session.hunterChallenge]||null;
    if(mode.indexOf('kotsu')===0){var def=getKotsuImgDef(kotsu.kind,kotsu.axis,kotsu.num);return def?roster[def.key]:null;}
    if(mode!=='normal' && session.hunterChallenge!=='mugen')return null;
    var keys=normal[course];if(!keys)return null;
    return roster[keys[session.scope==='all' && gSt.filt!=='weak'?keys.length-1:0]];
  }
  function encounter(course,slot){
    var keys=normal[course];if(!keys)return null;
    // Stay within the chosen course; the fourth encounter is its upper creature.
    var key=slot%4===3?keys[keys.length-1]:keys[0];return roster[key];
  }
  window.HunterBattleRoster={all:roster,resolve:resolve,encounter:encounter};
})();
