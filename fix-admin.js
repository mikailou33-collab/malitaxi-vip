const fs=require('fs');
var html=fs.readFileSync('malitaxi-admin-10.html','utf8');
html=html.replace('${CHAUFFEURS.filter(c=>!c.valide).length}','3');
html=html.replace('Billets Avion</td>','');
html=html.replace(/545\.000 F<\/td>/,'');
html=html.replace('✈️','');
fs.writeFileSync('malitaxi-admin-10.html',html);
console.log('OK fait');