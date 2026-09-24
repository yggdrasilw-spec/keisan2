const {chromium}=require('playwright');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'});try{
 const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://**/*',r=>r.abort());await page.goto('http://127.0.0.1:8874/hikizan_hunter.html');
 await page.evaluate(()=>{document.getElementById('start-screen').remove();sfxOn=false;voiceOn=false;getFx=(key)=>false;});
 for(const [width,height] of [[1366,768],[960,540],[390,844],[360,640]]){
 await page.setViewportSize({width,height});await page.evaluate(()=>show('home'));
 assert(await page.locator('.hunter-course-panel').isVisible());assert(!await page.locator('.hunter-departure-panel').isVisible());
 await page.screenshot({path:`tests/flow-course-${width}.png`});
 await page.locator('#cc').click();assert(await page.locator('.hunter-activity-panel').isVisible());assert(!await page.locator('.hunter-course-panel').isVisible());
 await page.locator('#hunter-challenge-launch').click();assert(await page.locator('.mode-shinsoku').isDisabled());assert(await page.locator('.mode-super').isDisabled());await page.keyboard.press('Escape');
 await page.screenshot({path:`tests/flow-activity-${width}.png`});await page.locator('#hunter-normal').click();await page.screenshot({path:`tests/flow-start-${width}.png`});assert(await page.locator('.hunter-departure-panel').isVisible());await page.locator('#hunter-flow-back').click();assert(await page.locator('.hunter-activity-panel').isVisible());
 for(const screen of ['home','settings','advanced-settings','achievements','kotsu-home','kotsu-sub','records','stats','kotsu-records','kotsu-stats','changelog','result']){
 await page.evaluate(s=>show(s),screen);await page.screenshot({path:`tests/flow-${screen}-${width}.png`});
 const dims=await page.evaluate(()=>({w:document.documentElement.scrollWidth,cw:innerWidth}));assert(dims.w<=dims.cw,JSON.stringify({screen,width,...dims}));
 }
 }
 await page.evaluate(()=>{show('home');startHunterChallenge('shinsoku');});assert(await page.locator('#home').isVisible());
 await page.evaluate(()=>ACH_BADGE_DEFS.forEach(d=>badgeData[d.key]={date:'test'}));
 assert(await page.evaluate(()=>hunterChallengeAccess('shinsoku').open));assert(await page.evaluate(()=>hunterChallengeAccess('mugen').open));assert(!await page.evaluate(()=>hunterChallengeAccess('super').open));
 await page.evaluate(()=>['no','ten','borrow','mix'].forEach(c=>storageSaveText('hikizan_challenge_'+c+'_shinsoku_clear','1')));assert(await page.evaluate(()=>hunterChallengeAccess('super').open));
 await page.locator('#cn').click();await page.locator('#hunter-challenge-launch').click();assert(await page.locator('.mode-super').isEnabled());await page.locator('.mode-shinsoku').click();assert(await page.locator('#practice').isVisible());
 assert.deepEqual(errors,[]);console.log('PASS: sequential flow, back navigation, all lock conditions, direct start guard, unlocked launch and responsive screens');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
