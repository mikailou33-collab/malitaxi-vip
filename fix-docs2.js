const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-20.html', 'utf8');

// Supprimer notre code
const s = h.indexOf('\nfunction openDocuments()');
const e = h.indexOf('\nfunction contacterAdmin') ;
const e2 = h.indexOf('\n}', e) + 2;
if(s > 0 && e2 > s){
  h = h.slice(0, s) + h.slice(e2);
  console.log('Supprimé');
}

// Supprimer ajout bouton documents dans profil
h = h.replace(
  "+'<div style=\"padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;cursor:pointer\" onclick=\"openDocuments()\" ><div style=\"font-size:18px\">📄</div><div style=\"flex:1\"><div style=\"font-size:13px;font-weight:700\">Mes Documents</div><div style=\"font-size:11px;color:var(--muted)\">CNI · Permis · Carte grise</div></div><div style=\"color:var(--muted)\">›</div></div>'",
  ""
);

fs.writeFileSync('chauffeur-vip-pro-20.html', h, 'utf8');
console.log('OK taille:', h.length);