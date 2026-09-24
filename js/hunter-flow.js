// One decision at a time. Existing controls retain their handlers and saved data.
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var home=document.getElementById('home'), layout=home.querySelector('.hunter-mission-layout');
    var course=home.querySelector('.hunter-course-panel'), departure=home.querySelector('.hunter-departure-panel');
    var flow=document.createElement('div');flow.className='hunter-flow-bar';
    flow.innerHTML='<button type="button" class="bkbtn" id="hunter-flow-back">← もどる</button><p id="hunter-flow-status" aria-live="polite"></p>';
    layout.before(flow);
    var activity=document.createElement('section');activity.className='hunter-activity-panel';
    activity.innerHTML='<div class="hunter-section-heading"><span>02</span><div><h2 tabindex="-1">れんしゅうを えらぼう</h2><p class="hunter-flow-course"></p></div></div><button type="button" id="hunter-normal" class="hunter-choice">▶ まとめて れんしゅう<small>すべての問題・にがてな問題</small></button>';
    layout.appendChild(activity);
    activity.appendChild(document.getElementById('kotsu-banner-area'));
    activity.appendChild(document.getElementById('hunter-challenge-launch'));
    var progress=document.createElement('div');progress.className='hunter-flow-progress';
    progress.appendChild(home.querySelector('.hunter-progress-label'));progress.appendChild(document.getElementById('dotrow'));activity.appendChild(progress);
    departure.querySelector('.hunter-section-heading>span').textContent='03';
    departure.querySelector('h2').textContent='もんだいを えらんで スタート';
    [course,departure].forEach(function(panel){panel.querySelector('h2').tabIndex=-1;});
    var step=1;
    function setStep(value,focus){
      step=value;home.dataset.step=value;
      course.hidden=value!==1;activity.hidden=value!==2;departure.hidden=value!==3;
      document.getElementById('hunter-flow-back').hidden=value===1;
      document.getElementById('hunter-flow-status').textContent=value+' / 3　'+['コース','れんしゅう','スタート'][value-1];
      activity.querySelector('.hunter-flow-course').textContent=document.getElementById('hunter-selected-course').textContent;
      if(focus)(value===1?course:value===2?activity:departure).querySelector('h2').focus();
    }
    var oldSel=selMode;selMode=function(mode){oldSel(mode);setStep(2,true);};
    document.getElementById('hunter-normal').onclick=function(){setStep(3,true);};
    document.getElementById('hunter-flow-back').onclick=function(){setStep(Math.max(1,step-1),true);};
    // Secondary destinations live in a separate menu, away from lesson decisions.
    var menu=document.createElement('dialog');menu.id='hunter-menu';menu.className='hunter-menu';
    menu.innerHTML='<div class="page-head"><h2>メニュー</h2><button type="button" class="bkbtn">とじる ✕</button></div>';
    document.body.appendChild(menu);menu.querySelector('button').onclick=function(){menu.close();};
    ['.hunter-navigation','.hunter-raid-details','.hunter-shop-link'].forEach(function(selector){var el=home.querySelector(selector);if(el)menu.appendChild(el);});
    menu.addEventListener('click',function(e){if(e.target===menu)menu.close();});
    var menuButton=document.createElement('button');menuButton.className='hunter-collection-link';menuButton.textContent='☰ メニュー';menuButton.onclick=function(){menu.showModal();};home.querySelector('.hunter-heading').appendChild(menuButton);
    var oldShow=show;show=function(screen){if(screen!=='home')menu.close();oldShow(screen);if(screen==='home')setStep(1,false);};
    // Group long settings pages into a desktop workspace, with natural phone scrolling.
    ['settings','advanced-settings'].forEach(function(id){
      var screen=document.getElementById(id),body=document.createElement('div');body.className='hunter-settings-body';
      Array.from(screen.children).forEach(function(child){if(!child.classList.contains('page-head'))body.appendChild(child);});screen.appendChild(body);
    });
    var advanced=document.querySelector('#advanced-settings .hunter-settings-body'),group;
    Array.from(advanced.children).forEach(function(child){
      if(!group || (child.style.fontSize==='13px' && child.style.fontWeight==='800') || child.classList.contains('learning-settings')){
        group=document.createElement('section');group.className='hunter-settings-section';advanced.appendChild(group);
      }
      group.appendChild(child);
    });
    var sections=Array.from(advanced.querySelectorAll(':scope > .hunter-settings-section'));
    var tabs=document.createElement('nav');tabs.className='hunter-settings-tabs';tabs.setAttribute('aria-label','せっていの しゅるい');advanced.prepend(tabs);
    sections.forEach(function(section,index){
      var button=document.createElement('button');button.type='button';
      var heading=section.querySelector('h2,h3') || section.firstElementChild;
      button.textContent=heading.textContent.trim();
      button.setAttribute('aria-pressed',String(index===0));section.hidden=index!==0;
      button.onclick=function(){sections.forEach(function(other,i){other.hidden=i!==index;tabs.children[i].setAttribute('aria-pressed',String(i===index));});};
      tabs.appendChild(button);
    });
    setStep(1,false);
  });
})();
