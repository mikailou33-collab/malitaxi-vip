const fs = require('fs');
let h = fs.readFileSync('malitaxi-admin-new.html', 'utf8');

h = h.replace('<div class="sb-sec">Système</div>',
'<div class="sb-sec">Transport</div>' +
'<div class="sb-item" id="si-bus" onclick="go(\'bus\')"><span class="sb-ico">🚌</span> Billets bus</div>' +
'<div class="sb-item" id="si-livraison" onclick="go(\'livraison\')"><span class="sb-ico">📦</span> Livraisons</div>' +
'<div class="sb-item" id="si-suivilive" onclick="go(\'suivilive\')"><span class="sb-ico">🔴</span> Suivi live</div>' +
'<div class="sb-item" id="si-pubvideo" onclick="go(\'pubvideo\')"><span class="sb-ico">📢</span> Publicités</div>' +
'<div class="sb-sec">Système</div>');

fs.writeFileSync('malitaxi-admin-new.html', h, 'utf8');
console.log('OK taille:', h.length);