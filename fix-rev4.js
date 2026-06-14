const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-20.html', 'utf8');

// Supprimer ancien openRevenus
const s = h.indexOf('\nfunction openRevenus()');
const e = h.indexOf('\n}', s) + 2;
if(s > 0) h = h.slice(0, s) + h.slice(e);

// Ajouter version ultra simple
const code = '\nfunction openRevenus(){\n  var o=document.createElement("div");\n  o.id="rev-ov";\n  o.style.cssText="position:fixed;inset:0;background:#0F0F1A;z-index:900;overflow-y:auto";\n  o.innerHTML="<div style=\'padding:20px;color:#fff;max-width:420px;margin:0 auto\'><button onclick=document.getElementById(\'rev-ov\').remove() style=\'background:rgba(255,255,255,.1);border:none;color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;margin-bottom:16px\'>← Retour</button><h2 style=\'color:#F5A623;margin-bottom:16px\'>💰 Mes Revenus</h2><div style=\'background:#1A1A2E;border-radius:12px;padding:16px;margin-bottom:12px\'><div style=\'font-size:12px;color:rgba(255,255,255,.6)\'>AUJOURD HUI</div><div style=\'font-size:28px;font-weight:900;color:#fff\'>15 500 F</div><div style=\'color:rgba(255,255,255,.5);font-size:13px\'>5 courses</div></div><div style=\'background:#1A1A2E;border-radius:12px;padding:16px;margin-bottom:12px\'><div style=\'font-size:12px;color:rgba(255,255,255,.6)\'>CETTE SEMAINE</div><div style=\'font-size:28px;font-weight:900;color:#10b981\'>140 500 F</div><div style=\'color:rgba(255,255,255,.5);font-size:13px\'>55 courses</div></div><div style=\'background:#1A1A2E;border-radius:12px;padding:16px;margin-bottom:12px\'><div style=\'font-size:12px;color:rgba(255,255,255,.6)\'>COMMISSION MaliTaxi (15%)</div><div style=\'font-size:24px;font-weight:900;color:#F5A623\'>-21 075 F</div></div><div style=\'background:#1A1A2E;border-radius:12px;padding:16px;margin-bottom:20px\'><div style=\'font-size:12px;color:rgba(255,255,255,.6)\'>NET A RECEVOIR (80%)</div><div style=\'font-size:28px;font-weight:900;color:#10b981\'>119 425 F</div></div><button onclick=\'alert(\"Retrait envoye ! Paiement dans 24h.\")\' style=\'width:100%;padding:16px;background:linear-gradient(135deg,#059669,#10b981);border:none;border-radius:12px;color:#fff;font-size:16px;font-weight:900;cursor:pointer\'>💸 Demander retrait 119 425 F</button></div>";\n  document.body.appendChild(o);\n}\n';

const ls = h.lastIndexOf('</script>');
h = h.slice(0, ls) + code + h.slice(ls);
fs.writeFileSync('chauffeur-vip-pro-20.html', h, 'utf8');
console.log('OK taille:', h.length);