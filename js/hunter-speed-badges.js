// Challenge achievements are separate from the seven normal mastery medals.
var HUNTER_SPEED_BADGES=[];
var HUNTER_SPEED_CREATURES={
  no_shinsoku:['風渡りの銀狼','疾風の中を駆け抜ける銀色の狼。風車のように回る尾で、急いでも答えを見失わない道を作る。','くりさがりなしの神速をきわめた証。速さの中でも、ひとつずつ確かめる目を授ける。'],
  ten_shinsoku:['十灯の星蛾','十この灯を羽に宿す小さな蛾。光をひとつずつ数えると、答えへの道が見えてくる。','10からひく神速をきわめた証。十の光を頼りに、迷わず進もう。'],
  borrow_shinsoku:['雷角の岩獅子','石のたてがみと青い雷角をもつ獅子。雷鳴のあとに、くりさがりの道筋を照らす。','くりさがりありの神速をきわめた証。難しい道も落ち着いて駆けぬける力をくれる。'],
  mix_shinsoku:['瞬虹の空鯨','翼のようなひれと虹色の尾をもつ空飛ぶ鯨。移り変わる景色を楽しみながら、雲の上を泳ぐ。','ばらばらの神速をきわめた証。問題が変わっても、考え方を切り替える勇気をくれる。'],
  no_super:['蒼星の角鹿','星明かりをまとう群青色の鹿。二本の水晶角が、静かな夜空に青い道しるべを描く。','くりさがりなしの超神速をきわめた証。見えないほど速い答えも、星のように正しく選ぶ。'],
  ten_super:['金環の砂漠狐','黄金の輪を九つまとった砂漠狐。輪がひとつ輝くたび、十のまとまりがはっきりする。','10からひく超神速をきわめた証。金色の輪のように、考えをすばやくまとめよう。'],
  borrow_super:['紅蓮の双翼竜','炎色の翼を二枚ひろげる竜。胸の白い光は、あわてずに考える心のしるし。','くりさがりありの超神速をきわめた証。炎の道を正しく見分ける集中力を授ける。'],
  mix_super:['天球の星海蛇','星座を背に泳ぐ長い海蛇。尾の先に小さな銀河をたたえ、八色の星を従える。','ばらばらの超神速をきわめた証。変わり続ける問題の先に、広い空を見せてくれる。']
};
['shinsoku','super'].forEach(function(tier){
  ['no','ten','borrow','mix'].forEach(function(course,index){
    var label=['くりさがりなし','10からひく','くりさがりあり','ばらばら'][index];
    var speed=tier==='shinsoku'?'神速':'超神速',seconds=tier==='shinsoku'?2:1.5;
    var creature=HUNTER_SPEED_CREATURES[course+'_'+tier];
    var def={key:course+'_'+tier,mode:course,challenge:tier,ico:'⚡',title:label+'\n'+speed+' おうぎバッジ',img:'img/badge_'+course+'_'+tier+'.png',desc:label+'・'+speed+'\n1問 '+seconds+'秒以内で '+Math.min(20,buildP(course).length)+'問すべて正解'};
    HUNTER_SPEED_BADGES.push(def);ACH_BADGE_DEFS.push(def);HUNTER_CREATURE_NAMES[def.key]=creature[0];
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
