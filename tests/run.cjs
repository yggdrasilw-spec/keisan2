const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const {spawn} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const mime = {'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp3':'audio/mpeg'};
const server = http.createServer((req,res)=>{
  const file = path.resolve(root, '.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(data);});
});
server.listen(8874,'127.0.0.1',async()=>{
  let failed=false;
  for(const name of (process.argv.slice(2).length ? process.argv.slice(2) : ['model','learning','progression','hints','raid','migration','refresh','creatures','home-fit'])){
    console.log('\nTEST '+name);
    const code=await new Promise(resolve=>{const child=spawn(process.execPath,[path.join(__dirname,name+'-regression.cjs')],{cwd:root,stdio:'inherit',env:process.env});child.on('exit',resolve);});
    if(code!==0)failed=true;
  }
  server.close(()=>process.exit(failed?1:0));
});
