'use strict';
/* No dependencies. Local static hosting matches the Vercel demo behavior. */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'../public');
const port = Number(process.env.PORT || 3000);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  const pathname=new URL(req.url,'http://local.test').pathname;
  let decoded;try{decoded=decodeURIComponent(pathname);}catch{res.writeHead(400);res.end('Bad request');return;}
  const file=path.resolve(root,'.'+decoded,decoded.endsWith('/')?'index.html':'');
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  fs.readFile(file,(error,buffer)=>{
    if(error){res.writeHead(404);res.end('Not found');return;}
    res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream','cache-control':'no-cache','x-content-type-options':'nosniff'});
    res.end(buffer);
  });
}).listen(port,'0.0.0.0',()=>console.log(`Buildwell mobile demo: http://localhost:${port}`));
