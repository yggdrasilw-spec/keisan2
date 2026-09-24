const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
 const page=await browser.newPage();
 await page.route('https://**/*',r=>r.abort());
 await page.goto('http://127.0.0.1:8874/hikizan_hunter.html');
 await page.evaluate(()=>{document.getElementById('start-screen').remove();sfxOn=false;voiceOn=false;fxSettings.fx_wipe=false;});
 for(const [width,height] of [[1920,1080],[1366,768],[1280,720],[1024,576],[960,540]]){
  await page.setViewportSize({width,height});
  for(const mode of ['no','ten','borrow']){
   await page.evaluate(mode=>{selMode(mode);},mode);
   const dimensions=await page.evaluate(()=>({width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,sections:[...document.querySelectorAll('#home>*, #home button')].filter(el=>el.checkVisibility()).map(el=>({id:el.id||el.className,bottom:el.getBoundingClientRect().bottom}))}));
   assert(dimensions.width<=width,JSON.stringify({width,height,mode,dimensions}));
   assert(dimensions.height<=height,JSON.stringify({width,height,mode,dimensions}));
   assert(dimensions.sections.every(s=>s.bottom<=height),JSON.stringify(dimensions));
  }
  await page.evaluate(()=>selMode('no'));
  await page.screenshot({path:`tests/home-fit-${width}.png`});
 }
 console.log('PASS: all home controls fit without scrolling at five landscape sizes, all three courses');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
