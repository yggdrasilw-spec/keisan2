const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
  const page=await browser.newPage(), errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://**/*',r=>r.abort());
  await page.goto('http://127.0.0.1:8874/hikizan_hunter.html');
  await page.evaluate(()=>{document.getElementById('start-screen').remove();voiceOn=false;sfxOn=false;fxSettings.fx_shuriken=false;});
  for(const [width,height] of [[1366,768],[1920,1080],[960,540],[390,844],[360,640]]) {
   await page.setViewportSize({width,height});
   await page.evaluate(()=>show('home'));
   await page.locator('#cc').click();
   assert.equal(await page.locator('#cc').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('#hunter-selected-course').innerText(),'くりさがり あり');
   assert.equal(await page.evaluate(()=>gSt.mode),'borrow');
   await page.locator('#cn').click();
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`home overflow ${width}`);
   if(width>=960){
    const left=await page.locator('.hunter-course-panel').boundingBox(),right=await page.locator('.hunter-departure-panel').boundingBox();
    assert(right.x>left.x+left.width-1);
    if(height>=768)assert(right.y+right.height<=height,`start below fold ${width}`);
   }
   await page.waitForTimeout(750);
   await page.screenshot({path:`tests/home-refresh-${width}.png`,fullPage:true});
   await page.locator('.kotsu-banner').click();
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`number overflow ${width}`);
   await page.waitForTimeout(750);
   await page.screenshot({path:`tests/numbers-refresh-${width}.png`,fullPage:true});
  }
  await page.setViewportSize({width:1366,height:768});
  await page.evaluate(()=>{show('achievements');});
  await page.locator('#ach-avatar-stage').click();
  assert.equal(await page.locator('.ninja-levelup-overlay.is-open').count(),0);
  // Both the legacy level-up card and the queued level-up card close on their contents.
  await page.evaluate(()=>playAchLevelUp(ACH_STAGES[1]));
  await page.locator('#ninja-levelup-overlay .ninja-levelup-footer').click();
  await page.waitForFunction(()=>document.getElementById('ninja-levelup-overlay').style.display==='none');
  await page.evaluate(()=>{badgeData={};KOTSU_IMG_DEFS.slice(0,8).forEach(d=>badgeData['kotsu_'+d.key]=1);window.levelDone=0;showNinjaLevelUpEffect(0,()=>window.levelDone++);});
  await page.locator('.ninja-levelup-overlay.is-open .ninja-levelup-footer').click();
  assert.equal(await page.evaluate(()=>levelDone),1);
  assert.equal(await page.locator('.ninja-levelup-overlay.is-open').count(),0);
  for(const [width,height] of [[1366,768],[390,844],[960,540]]) {
   await page.setViewportSize({width,height});
   await page.evaluate(()=>{window.rewardDone=0;showGemUnlockEffect(kotsuImgSrc(KOTSU_IMG_DEFS.find(d=>d.key==='no_top_01')),hunterCreatureName({key:'no_top_01'})+'\nゲット！',()=>window.rewardDone++);});
   await page.waitForTimeout(650);
   const img=await page.locator('.gem-burst-overlay[role=dialog] .gem-burst-img').boundingBox();
   assert(img.height>Math.min(250,height*.4));
   assert.equal(await page.locator('.gem-burst-overlay[role=dialog] .gem-burst-img').evaluate(el=>getComputedStyle(el).objectFit),'cover');
   await page.screenshot({path:`tests/reward-refresh-${width}.png`});
   await page.locator('.hunter-reward-close').click();
   assert.equal(await page.evaluate(()=>rewardDone),1);
  }
  await page.setViewportSize({width:1366,height:768});
  await page.evaluate(()=>{setAchTab('shop');show('achievements');HunterHud.setStarCount(1000);renderShopCollection();});
  assert.equal(await page.locator('.shop-card').count(),100);
  assert.equal(await page.evaluate(()=>new Set(HUNTER_SHOP_ITEMS.map(i=>i.id)).size),100);
  await page.locator('.hunter-shop-filters button').getByText('森のめぐみ',{exact:true}).click();
  assert.equal(await page.locator('.shop-card').count(),19);
  await page.locator('.shop-buy').last().click();
  assert(await page.evaluate(()=>hasShopItem('hunter_spring_crystal')));
  await page.locator('.hunter-shop-filters button').getByText('購入済み',{exact:true}).click();
  assert.equal(await page.locator('.shop-card').count(),1);
  await page.locator('.hunter-shop-filters button').getByText('すべて',{exact:true}).click();
  await page.screenshot({path:'tests/shop-refresh.png'});
  await page.evaluate(()=>{show('home');show('kotsu-home');});
  await page.screenshot({path:'tests/crystal-transition.png'});
  const css=await page.locator('.wipe-star').evaluate(el=>getComputedStyle(el).backgroundImage);
  assert(css.includes('hunter-crystal.svg'));
  assert.deepEqual(errors,[]);
  console.log('PASS: responsive selection, course state, 100 items and filters, center-tap close, large reward, crystal transition');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
