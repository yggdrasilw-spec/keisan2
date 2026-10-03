// An accepted miss remains visible until its explanation is complete.
(function(){
  'use strict';
  var pending=null,timer=null,bar=null,observer=null;
  function cancel(){
    clearTimeout(timer);timer=null;if(observer){observer.disconnect();observer=null;}
    if(pending){HunterSakuraLesson.stop();document.getElementById('hint-static-box').hidden=true;if(pending.hintDisplay!==undefined)document.getElementById('hint-area').style.display=pending.hintDisplay;}
    document.getElementById('practice').classList.remove('hunter-review-active');
    pending=null;if(bar){bar.remove();bar=null;}
  }
  function start(p,done){
    if(learningPrefs.missExplanation===false)return false;
    cancel();pending={session:sess,index:sess.idx,done:done};
    timer=setTimeout(function(){
      if(!pending||pending.session!==sess||pending.index!==sess.idx||!document.getElementById('practice').classList.contains('on')){cancel();return;}
      var box=document.getElementById('hint-static-box');
      pending.hintDisplay=document.getElementById('hint-area').style.display;document.getElementById('hint-area').style.display='block';document.getElementById('practice').classList.add('hunter-review-active');
      clearHunterHintTimers();hintVisible=false;document.getElementById('hint-box').style.display='none';document.getElementById('hint-soroban-box').style.display='none';
      box.hidden=false;box.dataset.type='sakura';
      bar=document.createElement('div');bar.className='hunter-review-bar';bar.innerHTML='<strong>こたえの出し方を みよう</strong><button type="button" id="miss-review-next" disabled>解説を みています…</button>';box.after(bar);
      var button=bar.querySelector('button');
      function ready(){clearTimeout(timer);timer=setTimeout(function(){if(pending&&bar){button.disabled=false;button.textContent='わかった！ つぎへ ▶';bar.scrollIntoView({block:'nearest'});}},1000);}
      button.onclick=function(){var review=pending;cancel();if(review&&review.session===sess&&review.index===sess.idx)review.done();};
      if(p.a<10){
        var dots='';for(var i=0;i<p.a;i++)dots+='<span class="hunter-dot'+(i>=p.ans?' subtracted':'')+'"></span>';
        box.innerHTML='<div class="hunter-static-title">'+p.a+' − '+p.b+' ＝ '+p.ans+'</div><div class="hunter-dot-grid">'+dots+'</div><p>赤い '+p.b+'こを とると、青い '+p.ans+'こが のこるよ。</p>';
        ready();
      }else{
        HunterSakuraLesson.mount(box,p);
        if(p.b<=p.a-10)box.querySelector('[data-method="gengen"]').hidden=true;
        observer=new MutationObserver(function(){var board=box.querySelector('.hunter-sakura-svg');if(board&&board.getAttribute('aria-busy')==='true'){clearTimeout(timer);button.disabled=true;button.textContent='解説を みています…';}else ready();});
        observer.observe(box,{subtree:true,attributes:true,attributeFilter:['aria-busy']});
      }
      if(window.HunterBattle)HunterBattle.sync();
    },window.HunterBattle?Math.max(850,HunterBattle.answerDelay()):850);
    return true;
  }
  document.addEventListener('DOMContentLoaded',function(){
    var group=document.createElement('fieldset');group.className='learning-settings';group.id='miss-explanation-settings';group.innerHTML='<legend>ミスしたあとの解説</legend><label><input id="miss-explanation-on" type="checkbox"> 解説を最後まで見る</label><p>最後の図を見てから「つぎへ」で進みます。</p>';
    document.querySelector('#settings .hunter-settings-body').appendChild(group);
    var input=group.querySelector('input');input.checked=learningPrefs.missExplanation!==false;input.onchange=function(){learningPrefs.missExplanation=input.checked;saveLearningPrefs();};
    var oldShow=show;show=function(screen){if(screen!=='practice')cancel();if(screen==='settings')input.checked=learningPrefs.missExplanation!==false;return oldShow(screen);};
    var oldQuestion=showP;showP=function(){if(pending&&(pending.session!==sess||pending.index!==sess.idx))cancel();return oldQuestion();};
    document.getElementById('hint-area').addEventListener('click',function(event){if(pending&&event.target.closest('#hint-btn1,#hint-btn2,#hint-btn-dots,#hint-btn-sakura')){event.preventDefault();event.stopImmediatePropagation();}},true);
  });
  window.HunterAnswerReview={start:start,cancel:cancel,active:function(){return !!pending;}};
})();
