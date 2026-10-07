const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'game_data');
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.ogg':'audio/ogg','.m4a':'audio/mp4','.woff2':'font/woff2','.ttf':'font/ttf'};
const packs=[
 {path:path.join(root,'audio.pack'),index:path.join(root,'audio-pack.json')},
 {path:path.join(root,'asset.pack'),index:path.join(root,'asset-pack.json')}
].map(p=>{let files={};try{files=JSON.parse(fs.readFileSync(p.index,'utf8')).files||{}}catch{}return {...p,files};});
http.createServer((req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
 let url;try{url=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end('Bad request')}
 let file=path.resolve(root,'.'+url);
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end('Forbidden')}
 try{
   if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');
   if(!fs.statSync(file).isFile())throw Error();
   const st=fs.statSync(file);
   res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Content-Length':st.size});
   if(req.method==='HEAD')return res.end();
   return fs.createReadStream(file).pipe(res);
 }catch{}
 const rel=url.replace(/^\/+/, '');
 for(const pack of packs){
   const ent=pack.files[rel];
   if(ent&&fs.existsSync(pack.path)){
     res.writeHead(200,{'Content-Type':ent.type||'application/octet-stream','Content-Length':ent.length});
     if(req.method==='HEAD')return res.end();
     return fs.createReadStream(pack.path,{start:ent.offset,end:ent.offset+ent.length-1}).pipe(res);
   }
 }
 res.writeHead(404);res.end('Not found');
}).listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('Game ready on port '+(process.env.PORT||3000)));
