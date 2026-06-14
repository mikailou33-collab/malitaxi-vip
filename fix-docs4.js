const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-20.html', 'utf8');

const code = `
function openDocuments(){
  var o=document.createElement("div");
  o.id="docs-ov";
  o.style.cssText="position:fixed;inset:0;background:#0F0F1A;z-index:900;overflow-y:auto;font-family:inherit;padding:20px";
  var docs=[
    ["🪪","Carte Nationale d Identite","valide","01/01/2025"],
    ["🚗","Permis de conduire","attente","10/06/2026"],
    ["📋","Carte grise vehicule","rejete","05/06/2026"],
    ["🛡️","Assurance vehicule","attente",""],
    ["📜","Casier judiciaire","valide","15/03/2026"]
  ];
  var liste="";
  for(var i=0;i<docs.length;i++){
    var d=docs[i];
    var col=d[2]==="valide"?"#10b981":d[2]==="attente"?"#F5A623":"#dc2626";
    var badge=d[2]==="valide"?"✅ Valide":d[2]==="attente"?"⏳ En attente":"❌ Rejete";
    liste+="<div style='background:#1A1A2E;border-radius:12px;padding:14px;margin-bottom:10px;border-left:3px solid "+col+"'>";
    liste+="<div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:6px'>";
    liste+="<div style='font-size:14px;font-weight:700;color:#fff'>"+d[0]+" "+d[1]+"</div>";
    liste+="<span style='color:"+col+";font-size:12px;font-weight:700'>"+badge+"</span></div>";
    if(d[3]) liste+="<div style='font-size:11px;color:rgba(255,255,255,.4);margin-bottom:8px'>📅 "+d[3]+"</div>";
    if(d[2]==="rejete") liste+="<div style='font-size:12px;color:#fca5a5;margin-bottom:8px'>Document rejete. Photo floue. Renvoyer svp.</div>";
    if(d[2]!=="valide") liste+="<button onclick='alert(\"Document soumis! Verification 24-48h.\")' style='padding:8px 16px;background:#F5A623;border:none;border-radius:8px;color:#fff;font-weight:700;cursor:pointer;font-family:inherit'>📷 "+(d[2]==="rejete"?"Renvoyer":"Uploader")+"</button>";
    liste+="</div>";
  }
  o.innerHTML="<div style='max-width:420px;margin:0 auto'><button onclick='document.getElementById(\"docs-ov\").remove()' style='background:rgba(255,255,255,.1);border:none;color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;margin-bottom:16px'>← Retour</button><h2 style='color:#F5A623;margin-bottom:16px'>📄 Mes Documents</h2><div style='background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.3);border-radius:12px;padding:12px;margin-bottom:16px;font-size:13px;color:rgba(255,255,255,.8)'>⚠️ Tous les documents doivent etre valides pour conduire. Verification sous 24-48h.</div>"+liste+"<button onclick='window.open(\"https://wa.me/+22396551630019\",\"_blank\")' style='width:100%;padding:12px;background:rgba(37,211,102,.15);border:1px solid rgba(37,211,102,.3);border-radius:10px;color:#25D366;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;margin-top:8px'>📱 Contacter MaliTaxi</button></div>";
  document.body.appendChild(o);
}
`;

const lastScript = h.lastIndexOf('</script>');
h = h.slice(0, lastScript) + code + '\n' + h.slice(lastScript);
fs.writeFileSync('chauffeur-vip-pro-20.html', h, 'utf8');
console.log('OK taille:', h.length);
