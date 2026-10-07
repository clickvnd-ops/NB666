const fs=require('fs'),path=require('path'); const root=path.join(__dirname,'game_data','game');
const must=['index.html','XR_Config.js','XR_Getdata.js','js/plugins.js','js/offline_guard.js','js/plugins/DHQL_OfflineServer.js','js/main.js'];
const bad=must.filter(x=>!fs.existsSync(path.join(root,x))); if(bad.length){console.error('Missing:',bad);process.exit(1)}
console.log('VERIFY PASS: required offline/game entry files present');
