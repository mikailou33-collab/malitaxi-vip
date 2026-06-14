const fs = require('fs');
let h = fs.readFileSync('malitaxi-vip-final-13.html', 'utf8');

// Remplacer direct
h = h.replace(
  'if(id==="livraison" && clientDansBamako!==false){ openLivraison(); return; }',
  'if(id==="livraison"){ openLivraison(); return; }'
);

fs.writeFileSync('malitaxi-vip-final-13.html', h, 'utf8');
console.log('OK changements:', h.includes('if(id==="livraison"){ openLivraison()'));