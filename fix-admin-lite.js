const fs = require('fs');
let h = fs.readFileSync('malitaxi-admin-new.html', 'utf8');

// Ajouter lien Mali Nav Lite dans sidebar
h = h.replace(
  '<div class="sb-item" id="si-malinav" onclick="go(\'malinav\')"><span class="sb-ico">🇲🇱</span> Mali Nav Stats</div>',
  '<div class="sb-item" id="si-malinav" onclick="go(\'malinav\')"><span class="sb-ico">🇲🇱</span> Mali Nav Stats</div>\n    <div class="sb-item" id="si-maliNavLite" onclick="ouvrirMaliNavLite()"><span class="sb-ico">📱</span> Mali Nav Lite</div>'
);

// Ajouter dans renderMaliNav les liens vers Lite
h = h.replace(
  '<a href="https://mikailou33-collab.github.io/mali-nav/" target="_blank" class="btn btn-primary" style="display:inline-block;text-decoration:none;text-align:center">🌍 Ouvrir Mali Nav</a>',
  '<a href="https://mikailou33-collab.github.io/mali-nav/" target="_blank" class="btn btn-primary" style="display:inline-block;text-decoration:none;text-align:center">🌍 Ouvrir Mali Nav</a>\n        <a href="https://mikailou33-collab.github.io/mali-nav/mali-nav-lite.html" target="_blank" class="btn" style="background:var(--green);color:#fff;display:inline-block;text-decoration:none;text-align:center">📱 Mali Nav Lite</a>'
);

// Ajouter fonction ouvrirMaliNavLite
const code = '\nfunction ouvrirMaliNavLite(){\n  window.open("https://mikailou33-collab.github.io/mali-nav/mali-nav-lite.html","_blank");\n}\n';
h = h.replace('</script>\n</body>', code + '</script>\n</body>');

fs.writeFileSync('malitaxi-admin-new.html', h, 'utf8');
console.log('OK taille:', h.length);