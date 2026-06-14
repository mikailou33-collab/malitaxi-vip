const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-20.html', 'utf8');

// Ajouter bouton Documents dans le Profil
h = h.replace(
  "'<div style=\"padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;cursor:pointer\" onclick=\"openHistorique()\"",
  "'<div style=\"padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;cursor:pointer\" onclick=\"openDocuments()\" ><div style=\"font-size:18px\">📄</div><div style=\"flex:1\"><div style=\"font-size:13px;font-weight:700\">Mes Documents</div><div style=\"font-size:11px;color:var(--muted)\">CNI · Permis · Carte grise</div></div><div style=\"color:var(--muted)\">›</div></div>'"
  + "+'<div style=\"padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;cursor:pointer\" onclick=\"openHistorique()\""
);

// Ajouter fonction openDocuments avant </script>
const code = `
function openDocuments(){
  var o=document.createElement("div");
  o.id="docs-ov";
  o.style.cssText="position:fixed;inset:0;background:#0F0F1A;z-index:900;overflow-y:auto;font-family:inherit";
  
  var docs=[
    {id:"cni",ico:"🪪",nom:"Carte Nationale d'Identite",desc:"CNI valide de moins de 10 ans",statut:"valide",date:"01/01/2025"},
    {id:"permis",ico:"🚗",nom:"Permis de conduire",desc:"Permis categories B ou D",statut:"attente",date:"10/06/2026"},
    {id:"carte_grise",ico:"📋",nom:"Carte grise vehicule",desc:"Document officiel du vehicule",statut:"rejete",date:"05/06/2026"},
    {id:"assurance",ico:"🛡️",nom:"Assurance vehicule",desc:"Assurance en cours de validite",statut:"attente",date:""},
    {id:"casier",ico:"📜",nom:"Casier judiciaire",desc:"Casier judiciaire vierge",statut:"valide",date:"15/03/2026"},
  ];
  
  var d="";
  d+="<div style='max-width:420px;margin:0 auto;padding:20px'>";
  d+="<div style='display:flex;align-items:center;gap:12px;margin-bottom:20px'>";
  d+="<button onclick=\"document.getElementById('docs-ov').remove()\" style='background:rgba(255,255,255,.1);border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer'>←</button>";
  d+="<div style='font-size:18px;font-weight:900;color:#F5A623'>📄 Mes Documents</div></div>";
  
  // Stats validation
  var valides=docs.filter(function(d){return d.statut==="valide";}).length;
  var total=docs.length;
  var pct=Math.round(valides/total*100);
  
  d+="<div style='background:#1A1A2E;border-radius:14px;padding:16px;margin-bottom:16px'>";
  d+="<div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:8px'>";
  d+="<div style='font-size:13px;color:rgba(255,255,255,.7)'>Dossier completude</div>";
  d+="<div style='font-size:15px;font-weight:900;color:#F5A623'>"+valides+"/"+total+" validés</div>";
  d+="</div>";
  d+="<div style='background:rgba(255,255,255,.1);border-radius:6px;height:8px'>";
  d+="<div style='background:linear-gradient(90deg,#F5A623,#fbbf24);height:8px;border-radius:6px;width:"+pct+"%'></div>";
  d+="</div>";
  d+="<div style='font-size:11px;color:rgba(255,255,255,.4);margin-top:6px'>"+pct+"% completé</div>";
  d+="</div>";
  
  // Info importante
  d+="<div style='background:rgba(245,166,35,.1);border:1px solid rgba(245,166,35,.3);border-radius:12px;padding:12px;margin-bottom:16px;font-size:12px;color:rgba(255,255,255,.7)'>";
  d+="⚠️ Tous les documents doivent etre validés pour commencer a conduire. L'equipe MaliTaxi vérifie chaque document sous 24-48h.";
  d+="</div>";
  
  // Liste documents
  for(var i=0;i<docs.length;i++){
    var doc=docs[i];
    var couleur=doc.statut==="valide"?"#10b981":doc.statut==="attente"?"#F5A623":"#dc2626";
    var badge=doc.statut==="valide"?"✅ Validé":doc.statut==="attente"?"⏳ En attente":"❌ Rejeté";
    var bg=doc.statut==="valide"?"rgba(16,185,129,.1)":doc.statut==="attente"?"rgba(245,166,35,.1)":"rgba(220,38,38,.1)";
    
    d+="<div style='background:#1A1A2E;border-radius:14px;padding:16px;margin-bottom:10px;border:1px solid rgba(255,255,255,.08)'>";
    d+="<div style='display:flex;align-items:center;gap:12px;margin-bottom:10px'>";
    d+="<div style='width:44px;height:44px;background:rgba(245,166,35,.15);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px'>"+doc.ico+"</div>";
    d+="<div style='flex:1'>";
    d+="<div style='font-size:14px;font-weight:700;color:#fff'>"+doc.nom+"</div>";
    d+="<div style='font-size:11px;color:rgba(255,255,255,.4);margin-top:2px'>"+doc.desc+"</div>";
    d+="</div>";
    d+="<span style='background:"+bg+";color:"+couleur+";padding:4px 10px;border-radius:8px;font-size:11px;font-weight:700'>"+badge+"</span>";
    d+="</div>";
    
    if(doc.date){
      d+="<div style='font-size:11px;color:rgba(255,255,255,.4);margin-bottom:8px'>📅 Soumis le "+doc.date+"</div>";
    }
    
    if(doc.statut==="rejete"){
      d+="<div style='background:rgba(220,38,38,.1);border-radius:8px;padding:8px;margin-bottom:8px;font-size:12px;color:#fca5a5'>❌ Document rejeté. Photo floue ou document expiré. Veuillez soumettre un nouveau document.</div>";
    }
    
    d+="<div style='display:flex;gap:8px'>";
    if(doc.statut!=="valide"){
      d+="<button onclick=\"uploaderDoc('"+doc.id+"','"+doc.nom+"')\" style='flex:1;padding:10px;background:linear-gradient(135deg,#F5A623,#e8920f);border:none;border-radius:10px;color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit'>";
      d+=doc.statut==="rejete"?"📷 Renvoyer":"📷 Uploader";
      d+="</button>";
    }
    if(doc.statut==="valide"){
      d+="<button onclick=\"voirDoc('"+doc.id+"')\" style='flex:1;padding:10px;background:rgba(16,185,129,.2);border:1px solid rgba(16,185,129,.3);border-radius:10px;color:#10b981;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit'>👁️ Voir document</button>";
    }
    d+="</div>";
    d+="</div>";
  }
  
  // Aide
  d+="<div style='background:#1A1A2E;border-radius:14px;padding:16px;margin-top:8px'>";
  d+="<div style='font-size:14px;font-weight:800;color:#fff;margin-bottom:10px'>❓ Besoin d'aide ?</div>";
  d+="<button onclick=\"contacterAdmin()\" style='width:100%;padding:12px;background:rgba(37,211,102,.15);border:1px solid rgba(37,211,102,.3);border-radius:10px;color:#25D366;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit'>📱 Contacter l'equipe MaliTaxi</button>";
  d+="</div>";
  
  d+="</div>";
  o.innerHTML=d;
  document.body.appendChild(o);
}

function uploaderDoc(id, nom){
  var input=document.createElement("input");
  input.type="file";
  input.accept="image/*,.pdf";
  input.onchange=function(e){
    var file=e.target.files[0];
    if(file){
      alert("Document "+nom+" soumis avec succes !\n\nL'equipe MaliTaxi va verifier votre document sous 24-48h.\nVous recevrez une notification WhatsApp.");
    }
  };
  input.click();
}

function voirDoc(id){
  alert("Affichage du document disponible dans la version complete de l'application.");
}

function contacterAdmin(){
  var msg=encodeURIComponent("Bonjour MaliTaxi, j'ai besoin d'aide pour mes documents chauffeur. Mon ID: "+driverName);
  window.open("https://wa.me/+22396551630019?text="+msg,"_blank");
}
`;

const lastScript = h.lastIndexOf('</script>');
h = h.slice(0, lastScript) + code + '\n' + h.slice(lastScript);
fs.writeFileSync('chauffeur-vip-pro-20.html', h, 'utf8');
console.log('OK taille:', h.length);
