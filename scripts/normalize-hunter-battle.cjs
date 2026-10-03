// Pack the generated artwork into the same 64px cells used by the renderer.
// This is atlas processing: full source PNGs remain at the manifest's source paths.
const {chromium}=require('playwright'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),manifest=JSON.parse(fs.readFileSync(path.join(root,'docs/battle-art-manifest.json'),'utf8'));
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.html')?'text/html':file.endsWith('.json')?'application/json':'image/png');res.end(data);});});
server.listen(8877,'127.0.0.1',async()=>{let browser;try{
 browser=await chromium.launch({headless:true,channel:'msedge'});const page=await browser.newPage();await page.goto('http://127.0.0.1:8877/docs/battle-art-preview.html');
 await page.waitForFunction(()=>Object.values(HunterBattleArt.status()).length===54&&Object.values(HunterBattleArt.status()).every(s=>s==='ready'),null,{timeout:60000});
 const boundaries=await page.evaluate(()=>HunterBattleArt.cuts());
 fs.writeFileSync(path.join(root,'docs/battle-sprite-boundaries.json'),JSON.stringify(boundaries,null,2)+'\n');
 const unsafe=Object.entries(boundaries).filter(([key,b])=>b.unsafe.length);
 if(unsafe.length)console.log('Source glow contacts recorded for visual review: '+unsafe.map(([key])=>key).join(', '));
 let before=0,after=0;
 for(const item of manifest){const png=await page.evaluate(key=>{
  const hero=key.startsWith('hero-'),atlas=HunterBattleArt.sheet(hero?'hero':key,hero?Number(key.slice(-1)):1),poses=hero?HunterBattleArt.poses.slice(0,7):['idle','slash','hurt','defeat','bow'];
  const compact=document.createElement('canvas');compact.width=256;compact.height=poses.length*64;const c=compact.getContext('2d');
  poses.forEach((pose,row)=>c.drawImage(atlas,0,HunterBattleArt.poses.indexOf(pose)*64,256,64,0,row*64,256,64));return compact.toDataURL('image/png').split(',')[1];
 },item.key);const file=path.join(root,'img/battle',item.key+'.png');before+=fs.statSync(file).size;const bytes=Buffer.from(png,'base64');fs.writeFileSync(file,bytes);after+=bytes.length;}
 console.log(JSON.stringify({sheets:manifest.length,before,after}));
}catch(e){console.error(e);process.exitCode=1;}finally{if(browser)await browser.close();server.close();}});
