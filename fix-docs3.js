const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-20.html', 'utf8');

const ancien = "+'<div style=\"font-size:18px\">📋</div><div style=\"flex:1\" onclick=\"openHistorique()\">";
const nouveau = "+'<div style=\"font-size:18px\">📄</div><div style=\"flex:1\"><div style=\"font-size:13px;font-weight:700\">Mes Documents</div><div style=\"font-size:11px;color:var(--muted)\">CNI - Permis - Carte grise</div></div><div style=\"color:var(--muted)\">›</div></div>'"
  + "\n    +'<div style=\"padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;cursor:pointer\" onclick=\"openDocuments()\">'"
  + "\n    +'<div style=\"font-size:18px\">📋</div><div style=\"flex:1\" onclick=\"openHistorique()\">";

h = h.replace(ancien, nouveau);
fs.writeFileSync('chauffeur-vip-pro-20.html', h, 'utf8');
console.log('OK taille:', h.length);
console.log('Docs trouvé:', h.includes('Mes Documents'));