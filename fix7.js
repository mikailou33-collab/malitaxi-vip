const fs=require('fs');
var html=fs.readFileSync('malitaxi-vip-final-12.html','utf8');
html=html.replace(/,?\s*\{[^}]*id:\s*["']bus["'][^}]*\}/g,'');
html=html.replace(/,?\s*\{[^}]*id:\s*["']avion["'][^}]*\}/g,'');
html=html.replace(/setSvc\('bus'\)[^;]*/g,'');
html=html.replace(/setSvc\('avion'\)[^;]*/g,'');
fs.writeFileSync('malitaxi-vip-final-12.html',html);
console.log('OK fait');