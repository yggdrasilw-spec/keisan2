const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
 const page=await browser.newPage({viewport:{width:960,height:540}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.route('https://**/*',r=>r.abort());
 await page.goto('http://127.0.0.1:8874/hikizan_hunter.html');
 await page.evaluate(()=>{document.getElementById('start-screen').remove();voiceOn=false;sfxOn=false;fxSettings.fx_perfect=false;fxSettings.fx_medal=false;fxSettings.fx_evolution=false;});
 await page.evaluate(()=>startSession([{a:8,b:3,ans:5}],1));
 assert(await page.locator('#hint-btn-dots').isVisible());
 await page.locator('#hint-btn-dots').click();
 assert.equal(await page.locator('.hunter-dot').count(),10);
 assert.equal(await page.locator('.hunter-dot.subtracted').count(),3);
 assert.equal(await page.locator('.hunter-dot.empty').count(),2);
 await page.evaluate(()=>startSession([{a:13,b:9,ans:4}],1));
 assert(await page.locator('#hint-btn-sakura').isVisible());
 await page.locator('#hint-btn-sakura').click();
 assert((await page.locator('.hunter-formula').innerText()).includes('10 － 6 ＝ 4'));
 await page.locator('[data-method="banana"]').click();
 assert((await page.locator('.hunter-formula').innerText()).includes('1 ＋ 3 ＝ 4'));
 await page.evaluate(()=>{document.querySelector('[data-hunter-hint="sakura"]').click();});
 assert.equal(await page.locator('#hint-btn-sakura').isVisible(),false);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('hikizan_hunter_hint_options')).sakura),false);
 await page.evaluate(()=>{document.querySelector('[data-hunter-hint="sakura"]').click();});
 console.log('PASS: static 5-by-2 subtraction dots, both decompositions, saved hint selection');
 for(const problem of [{a:13,b:8,ans:5},{a:10,b:9,ans:1},{a:18,b:9,ans:9}]){
  for(const branch of problem.a===10?['jukka']:['jukka','bara']){
   await page.evaluate(p=>{startSession([p],1);toggleHint1();},problem);
   await page.locator('#hint-next-btn').click();
   if(problem.a!==10)await page.locator(branch==='jukka'?'#hint-btn-jukka':'#hint-btn-bara').click();
   else await page.waitForTimeout(700);
   for(let step=0;step<8;step++){
    if((await page.locator('#hint-next-btn').innerText()).includes('もういちど'))break;
    await page.locator('#hint-next-btn').click();
   }
   assert((await page.locator('#hint-final-formula').innerText()).endsWith(String(problem.ans)));
   const rect=await page.locator('.practice-hint-panel').boundingBox();assert(rect.y+rect.height<=541);
  }
 }
 await page.screenshot({path:'tests/hint-complete.png'});
 console.log('PASS: dot hints, both subtraction methods, 10-minus, largest borrowing problem');
 await page.evaluate(()=>{startSession([{a:10,b:8,ans:2}],1);toggleHint1();});await page.locator('#hint-next-btn').click();
 await page.evaluate(()=>{startSession([{a:13,b:8,ans:5}],1);toggleHint1();});await page.waitForTimeout(800);
 assert.equal(await page.locator('#hint-next-btn').innerText(),'はじめる');assert.equal(await page.evaluate(()=>hintStep),0);
 await page.evaluate(()=>toggleHint2());
 const frame=page.frameLocator('#hint-soroban-frame');
 for(let i=0;i<4;i++){await frame.locator('#next-btn').click();await page.waitForTimeout(850);}
 await frame.locator('.branch-btn').last().click();await page.waitForTimeout(1000);
 for(let i=0;i<2;i++){await frame.locator('#next-btn').click();await page.waitForTimeout(1100);}
 assert((await frame.locator('#sub-text').innerText()).includes('５'));
 console.log('PASS: cancelled old hint callbacks, live soroban lower-row branch reaches correct answer');
 await page.evaluate(()=>{kSt={kind:'no',axis:'top',num:3,filt:'all'};kD[kk('no','top',3,{a:3,b:1})]={att:1,cor:0,last:{ok:false,el:1000}};kSelFilt('weak');});
 assert.deepEqual(await page.evaluate(()=>kFiltP().map(p=>p.b)),[1]);
 await page.evaluate(()=>goKotsuR());assert(await page.locator('#kotsu-records').isVisible());assert((await page.locator('#kr-list').innerText()).includes('3−1=2'));
 await page.evaluate(()=>{localStorage.setItem('tashizan_sentinel','keep');setStarCountDebug(50);setDebugUnlocked(true);showDebugPanel();});
 await page.locator('#dbg-all-ach-on').click();await page.evaluate(()=>{closeAchLevelPreview();hideDebugPanel();});
 page.once('dialog',d=>d.accept());await page.evaluate(()=>resetData());
 assert.equal(await page.evaluate(()=>getUnlockedAchievementCount().totalOn),0);assert.equal(await page.evaluate(()=>HunterHud.getStarCount()),0);
 assert.equal(await page.evaluate(()=>localStorage.getItem('tashizan_sentinel')),'keep');
 assert.deepEqual(errors,[]);console.log('PASS: kotsu weak filter, records page, coordinated reset and addition-data isolation');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
