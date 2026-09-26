// Keep course and practice choices together in one compact selection screen.
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var home=document.getElementById('home');
    var course=home.querySelector('.hunter-course-panel'), departure=home.querySelector('.hunter-departure-panel');
    var menu=document.createElement('dialog');menu.id='hunter-menu';menu.className='hunter-menu';
    menu.innerHTML='<div class="page-head"><h2>メニュー</h2><button type="button" class="bkbtn">とじる ✕</button></div>';
    document.body.appendChild(menu);menu.querySelector('button').onclick=function(){menu.close();};
    ['.hunter-navigation','.hunter-raid-details','.hunter-shop-link'].forEach(function(selector){var el=home.querySelector(selector);if(el)menu.appendChild(el);});
    menu.addEventListener('click',function(e){if(e.target===menu)menu.close();});
    var menuButton=document.createElement('button');menuButton.className='hunter-collection-link';menuButton.textContent='☰ メニュー';menuButton.onclick=function(){menu.showModal();};home.querySelector('.hunter-heading').appendChild(menuButton);
    var oldShow=show;show=function(screen){if(screen!=='home')menu.close();oldShow(screen);};
    var challenges=document.getElementById('hunter-challenge-launch');
    if(challenges)course.appendChild(challenges);
    departure.querySelector('h2').textContent='れんしゅうを えらぼう';
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
  });
})();
