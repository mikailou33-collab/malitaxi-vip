const fs=require('fs');
var html=fs.readFileSync('malitaxi-vip-final-12.html','utf8');
var start=html.indexOf("BILLETS D'AVION");
var fnStart=html.lastIndexOf("if(svc===",start);
var fnEnd=html.indexOf("if(svc===",fnStart+10);
html=html.slice(0,fnStart)+html.slice(fnEnd);
fs.writeFileSync('malitaxi-vip-final-12.html',html);
console.log('OK fait');