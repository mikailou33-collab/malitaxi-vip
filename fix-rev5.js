const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-20.html', 'utf8');
const s = h.indexOf('\nfunction openRevenus()');
const e = h.indexOf('\n}', s) + 2;
if(s > 0){ h = h.slice(0, s) + h.slice(e); console.log('Supprimé'); }
fs.writeFileSync('chauffeur-vip-pro-20.html', h, 'utf8');
console.log('OK taille:', h.length);