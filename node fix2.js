const fs=require('fs');
var html=fs.readFileSync('malitaxi-vip-final-12.html','utf8');
html=html.replace(',\n  {id:"aeroport",ico:"✈️",label:"Avion"   },','');
html=html.replace(',\n  {id:"bus",     ico:"🚍",label:"Bus"     },','');
fs.writeFileSync('malitaxi-vip-final-12.html',html);
console.log('OK fait');