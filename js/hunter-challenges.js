// Independent challenge sessions: normal practice records and medal conditions stay intact.
(function () {
  'use strict';
  var modes = {shinsoku:{name:'神速',sub:'しんそく',ms:2000},super:{name:'超神速',sub:'ちょうしんそく',ms:1500},mugen:{name:'無限',sub:'むげん',ms:4000}};
  var clock = null, pending = null;
  function stopClock(){clearInterval(clock);clock=null;}
  function active(){return sess && sess.hunterChallenge;}
  function limit(){return active()==='mugen'?Math.max(2500,4000-sess.results.length*120):modes[active()].ms;}
  function bestKey(){return 'hikizan_challenge_'+gSt.mode+'_'+active();}
  function updateClock(){
    if(!active() || sess._sessionEnding || sess._answerSubmitted){stopClock();return;}
    var remaining=Math.max(0,limit()-(Date.now()-sess.startTime));
    document.getElementById('ptimer').textContent='あと '+(remaining/1000).toFixed(1)+' 秒';
    document.getElementById('hunter-time-fill').style.width=(remaining/limit()*100)+'%';
    if(!remaining){sess.challengeReason='時間ぎれ！';sess._sessionEnding=true;finish();}
  }
  window.startHunterChallenge=function(mode){
    if(!modes[mode])return;
    document.getElementById('hunter-challenge-dialog').close();
    pending=mode;
    startSession(buildP(gSt.mode),mode==='mugen'?'all':20);
    // A timed first question must not be covered by the normal scene transition.
    var wipe=document.getElementById('scene-wipe');if(wipe)wipe.classList.remove('active');
    document.getElementById('res-again').onclick=function(){startHunterChallenge(mode);};
  };
  var baseStart=startSession;
  startSession=function(ps,cap){stopClock();baseStart(ps,cap);};
  var baseQuestion=showP;
  showP=function(){
    if(pending){sess.hunterChallenge=pending;pending=null;sessMode='challenge';}
    if(active() && !sess._sessionEnding && sess.idx>=sess.queue.length && active()==='mugen')sess.queue.push.apply(sess.queue,sh(buildP(gSt.mode)));
    baseQuestion();
    var on=!!active() && document.getElementById('practice').classList.contains('on');
    document.getElementById('hunter-time-track').hidden=!on;
    document.getElementById('practice').classList.toggle('hunter-challenge-active',on);
    if(!on || sess._sessionEnding || sess._answerSubmitted)return;
    document.getElementById('pbdg').textContent=modes[active()].name+' ｜ '+({no:'くりさがりなし',ten:'10からひく',borrow:'くりさがりあり'})[gSt.mode];
    if(active()==='mugen')document.getElementById('pctr').textContent=sess.results.length+' もん突破';
    if(tIv){clearInterval(tIv);tIv=null;}
    stopClock();updateClock();if(!sess._sessionEnding)clock=setInterval(updateClock,25);
  };
  var baseCheck=chk;
  chk=function(v,btn,p){
    if(!active())return baseCheck(v,btn,p);
    if(sess._answerSubmitted || sess._sessionEnding || sess.queue[sess.idx]!==p || !document.getElementById('practice').classList.contains('on'))return;
    if(Date.now()-sess.startTime>=limit()){updateClock();return;}
    stopClock();
    if(v!==p.ans){
      sess._answerSubmitted=true;sess._answeredIndex=sess.idx;
      sess.results.push({p:p,el:Date.now()-sess.startTime,ok:false});
      sess.challengeReason='こたえは '+p.ans+'！ また ちょうせんしよう';
      sndWrong();finish();return;
    }
    baseCheck(v,btn,p);
  };
  var baseFinish=finish;
  finish=function(){
    if(!active()){document.getElementById('rv-m').previousElementSibling.textContent='マスター';return baseFinish();}
    stopClock();clearNextQuestionTimer();if(tIv){clearInterval(tIv);tIv=null;}
    if(sess._finishRendered)return;
    sess._sessionEnding=true;sess._finishRendered=true;
    var count=sess.results.filter(function(r){return r.ok;}).length;
    var cleared=active()!=='mugen' && count===sess.queue.length;
    var best=Math.max(count,Number(storageLoadText(bestKey(),'0'))||0);storageSaveText(bestKey(),best);
    if(cleared)storageSaveText(bestKey()+'_clear','1');
    document.getElementById('rbi').textContent=cleared?'🏆':'⚡';
    document.getElementById('rt2').textContent=cleared?modes[active()].name+' クリア！':count+'もん 突破！';
    document.getElementById('rs2').textContent=sess.challengeReason || (cleared?'すべて 時間内に せいかい！':'ここまでの記録を 保存したよ');
    document.getElementById('rv-t').textContent=sess.results.length+'もん';
    document.getElementById('rv-a').textContent=(sess.results.length?Math.round(count/sess.results.length*100):0)+'%';
    document.getElementById('rv-avg').textContent=(sess.results.length?sess.results.reduce(function(s,r){return s+r.el;},0)/sess.results.length/1000:0).toFixed(1)+'秒';
    document.getElementById('rv-m').previousElementSibling.textContent='自己ベスト';
    document.getElementById('rv-m').textContent=best+'もん';
    document.getElementById('hunter-result-reward').textContent=modes[active()].name+' ｜ 自己ベスト '+best+'もん';
    show('result');if(cleared)sndHunterPerfect();
  };
  var baseShow=show;
  show=function(screen){if(screen!=='practice')stopClock();return baseShow(screen);};
  document.addEventListener('visibilitychange',function(){if(document.hidden && active() && !sess._sessionEnding){sess.challengeReason='画面を はなれたので 終了したよ';finish();}});
  document.addEventListener('DOMContentLoaded',function(){
    var launch=document.createElement('button');launch.id='hunter-challenge-launch';launch.className='hunter-challenge-launch';launch.innerHTML='⚡ <span>限界に ちょうせん<small>神速・超神速・無限</small></span> ›';
    document.getElementById('home').appendChild(launch);
    var dialog=document.createElement('dialog');dialog.id='hunter-challenge-dialog';dialog.className='hunter-drawer';dialog.setAttribute('aria-labelledby','hunter-challenge-title');
    dialog.innerHTML='<div class="hunter-drawer-head"><span>CHALLENGE SELECT</span><button type="button" class="hunter-dialog-close" aria-label="とじる">✕</button></div><h2 id="hunter-challenge-title">限界の、その先へ。</h2><p id="hunter-challenge-course"></p><div class="hunter-challenge-cards"></div><p class="hunter-rule">まちがい・時間ぎれで 終了。<br>「すべて」の問題から出題するよ。<br>挑戦の記録は、ふだんの練習と別に保存。</p>';
    document.body.appendChild(dialog);
    dialog.querySelector('.hunter-dialog-close').onclick=function(){dialog.close();};
    dialog.addEventListener('click',function(e){if(e.target===dialog)dialog.close();});
    launch.onclick=function(){
      document.getElementById('hunter-challenge-course').textContent='選んだコース：'+document.getElementById('hunter-selected-course').textContent;
      var cards=dialog.querySelector('.hunter-challenge-cards');cards.replaceChildren();
      Object.keys(modes).forEach(function(key,i){var m=modes[key],b=document.createElement('button'),best=storageLoadText('hikizan_challenge_'+gSt.mode+'_'+key,'0');b.className='hunter-challenge-card mode-'+key;
        b.innerHTML='<span class="hunter-challenge-symbol">'+['ϟ','ϟϟ','∞'][i]+'</span><span><small>'+m.sub+'</small><strong>'+m.name+'</strong><span>'+(key==='mugen'?'4秒からだんだん速く。最短2.5秒':(m.ms/1000)+'秒 × '+Math.min(20,buildP(gSt.mode).length)+'問')+'</span><em>自己ベスト '+Number(best)+'もん</em></span><b>▶</b>';
        b.onclick=function(){startHunterChallenge(key);};cards.appendChild(b);
      });dialog.showModal();
    };
    var track=document.createElement('div');track.id='hunter-time-track';track.hidden=true;track.innerHTML='<div id="hunter-time-fill"></div>';document.getElementById('ptimer').after(track);
  });
})();
