const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-20.html', 'utf8');

// Supprimer notre ancien code
const s = h.indexOf('\nfunction openHistorique()');
const e = h.indexOf('\nfunction filtrerHist') ;
const e2 = h.indexOf('\n}', e) + 2;
if(s > 0 && e2 > s){
  h = h.slice(0, s) + h.slice(e2);
  console.log('Supprimé');
}

// Vérifier
console.log('openHistorique encore là:', h.includes('function openHistorique'));
fs.writeFileSync('chauffeur-vip-pro-20.html', h, 'utf8');
console.log('OK taille:', h.length);