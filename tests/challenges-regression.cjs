const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'});try{
 const page=await browser.newPage({viewport:{width:1280,height:720},reducedMotion:'reduce'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.route('https://**/*',r=>r.abort());
 await page.goto('http://127.0.0.1:8874/hikizan_hunter.html');
 await page.evaluate(()=>{document.getElementById('start-screen').remove();sfxOn=false;voiceOn=false;});
 await page.locator('#hunter-challenge-launch').click();
 await page.screenshot({path:'tests/challenge-drawer.png'});
 assert.equal(await page.locator('.hunter-challenge-card').count(),3);
 await page.locator('.mode-shinsoku').click();
 await page.evaluate(()=>{sess.startTime=Date.now()-2200;});
 await page.waitForFunction(()=>document.getElementById('result').classList.contains('on'));
 assert.match(await page.locator('#rs2').innerText(),/時間ぎれ/);
 await page.locator('#res-again').click();
 assert.equal(await page.evaluate(()=>sess.hunterChallenge),'shinsoku');
 const completed=await page.evaluate(()=>{
   const previous=JSON.stringify(gD),total=sess.queue.length;
   for(let i=0;i<total;i++){const p=sess.queue[sess.idx];sess.startTime=Date.now()-100;chk(p.ans,null,p);clearNextQuestionTimer();sess.idx++;showP();}
   return {same:previous===JSON.stringify(gD),clear:document.getElementById('rt2').textContent,best:localStorage.getItem('hikizan_challenge_no_shinsoku')};
 });assert(completed.same);assert.match(completed.clear,/クリア/);assert.equal(Number(completed.best),20);
 await page.evaluate(()=>{startHunterChallenge('super');sess.startTime=Date.now()-1600;chk(sess.queue[0].ans,null,sess.queue[0]);});
 assert.match(await page.locator('#rs2').innerText(),/時間ぎれ/);
 await page.evaluate(()=>{startHunterChallenge('mugen');});
 const extended=await page.evaluate(()=>{for(let i=0;i<1100;i++){let p=sess.queue[sess.idx];sess.startTime=Date.now()-100;chk(p.ans,null,p);clearNextQuestionTimer();sess.idx++;showP();}return {n:sess.results.length,screen:document.getElementById('practice').classList.contains('on')};});
 assert.equal(extended.n,1100);assert(extended.screen);
 await page.evaluate(()=>{chk(-99,null,sess.queue[sess.idx]);});
 assert.match(await page.locator('#rt2').innerText(),/1100/);
 await page.evaluate(()=>{startHunterChallenge('super');show('home');});await page.waitForTimeout(1700);
 assert(await page.locator('#home').isVisible());
 await page.evaluate(()=>{startSession(buildP('no'),20);});
 assert.equal(await page.locator('#hunter-time-track').isVisible(),false);
 await page.evaluate(()=>{show('achievements');openAchBadgePreview(ACH_BADGE_DEFS[0]);});
 await page.locator('#hunter-lore-open').click();
 assert(await page.locator('#ach-preview-overlay').isVisible());assert(await page.locator('#hunter-lore-dialog').isVisible());
 await page.screenshot({path:'tests/lore-landscape.png'});
 await page.locator('#hunter-lore-dialog .hunter-dialog-close').click();assert(await page.locator('#ach-preview-overlay').isVisible());
 const keys=await page.evaluate(()=>ACH_BADGE_DEFS.concat(KOTSU_IMG_DEFS).map(d=>d.key));
 for(const key of keys){
  await page.evaluate(key=>{let d=ACH_BADGE_DEFS.concat(KOTSU_IMG_DEFS).find(d=>d.key===key);(d.axis?openAchKotsuPreview:openAchBadgePreview)(d);},key);
  await page.locator('#hunter-lore-open').click();
  assert((await page.locator('#hunter-lore-about').innerText()).length>15,key);
  await page.locator('#hunter-lore-img').evaluate(img=>img.decode());
  await page.locator('#hunter-lore-dialog .hunter-dialog-close').click();
 }
 await page.setViewportSize({width:360,height:640});await page.locator('#hunter-lore-open').click();
 assert(await page.locator('#hunter-lore-dialog').evaluate(d=>d.scrollWidth<=d.clientWidth));
 await page.screenshot({path:'tests/lore-phone.png'});
 await page.keyboard.press('Escape');await page.evaluate(()=>{closeAchPreview();show('home');});
 await page.locator('#hunter-challenge-launch').click();assert(await page.locator('#hunter-challenge-dialog').evaluate(d=>d.scrollWidth<=d.clientWidth));
 await page.screenshot({path:'tests/challenge-phone.png'});
 assert.deepEqual(errors,[]);console.log('PASS: countdown, late answer, retry, clear, normal record isolation, 1100-question endless run, navigation cleanup, all 40 lore images, phone dialogs');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
