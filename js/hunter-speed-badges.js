// Challenge achievements are separate from the seven normal mastery medals.
var HUNTER_SPEED_BADGES=[];
['shinsoku','super'].forEach(function(tier){
  ['no','ten','borrow','mix'].forEach(function(course,index){
    var label=['くりさがりなし','10からひく','くりさがりあり','ばらばら'][index];
    var speed=tier==='shinsoku'?'神速':'超神速',seconds=tier==='shinsoku'?2:1.5;
    var def={key:course+'_'+tier,mode:course,challenge:tier,ico:'⚡',title:label+'\n'+speed+' おうぎバッジ',img:'img/badge_'+course+'_'+tier+'.svg',desc:label+'・'+speed+'\n1問 '+seconds+'秒以内で '+Math.min(20,buildP(course).length)+'問すべて正解'};
    HUNTER_SPEED_BADGES.push(def);ACH_BADGE_DEFS.push(def);HUNTER_CREATURE_NAMES[def.key]=speed+'・'+label;
  });
});
function collectHunterSpeedBadges(){
  var added=[];
  HUNTER_SPEED_BADGES.forEach(function(def){
    if(!badgeData[def.key] && storageLoadText('hikizan_challenge_'+def.mode+'_'+def.challenge+'_clear','0')==='1'){
      badgeData[def.key]={date:new Date().toISOString()};added.push(def);
    }
  });
  if(added.length)saveBadgeData();
  return added;
}
document.addEventListener('DOMContentLoaded',function(){collectHunterSpeedBadges();});
