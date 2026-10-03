const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'});try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:${process.env.QA_PORT||8874}/docs/battle-art-preview.html`);
 await page.waitForFunction(()=>Object.values(HunterBattleArt.status()).length===54&&Object.values(HunterBattleArt.status()).every(s=>s==='ready'),null,{timeout:60000});
 const audit=await page.evaluate(()=>manifest.map(item=>{
  const hero=item.key.startsWith('hero-'),atlas=HunterBattleArt.sheet(hero?'hero':item.key,hero?Number(item.key.slice(-1)):1),c=atlas.getContext('2d');
  const poses=hero?HunterBattleArt.poses.slice(0,7):['idle','slash','hurt','defeat','bow'];
  let transparent=0,opaque=0,empty=[],clipped=[];
  poses.forEach(pose=>{for(let f=0;f<4;f++){const d=c.getImageData(f*64,HunterBattleArt.poses.indexOf(pose)*64,64,64).data;let content=0;
   for(let y=0;y<64;y++)for(let x=0;x<64;x++){const alpha=d[(y*64+x)*4+3];if(!alpha)transparent++;else opaque++;if(alpha>32){content++;if(x===0||x===63||y===0||y===63)clipped.push(pose+'/'+f);}}
   if(!content)empty.push(pose+'/'+f);
  }});
  return {key:item.key,transparent,opaque,empty,clipped:[...new Set(clipped)]};
 }));
 assert.equal(audit.length,54);for(const a of audit){assert(a.transparent>0,a.key+' alpha');assert(a.opaque>0,a.key+' content');assert.deepEqual(a.clipped,[],a.key+' clipped');assert.deepEqual(a.empty.filter(s=>!s.startsWith('smoke/')&&!s.startsWith('defeat/')),[],a.key+' missing pose');}
 await page.screenshot({path:'tests/battle-art-gallery.png',fullPage:true});fs.writeFileSync(path.join(__dirname,'battle-art-audit.json'),JSON.stringify(audit,null,2));assert.deepEqual(errors,[]);
 await page.locator('#pose').selectOption('slash');await page.waitForTimeout(80);await page.screenshot({path:'tests/battle-art-attacks.png',fullPage:true});
 console.log('PASS: all 54 transparent sheets decode, required frames present, normalized horns/wings/tails inside cells, gallery and alpha audit');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
