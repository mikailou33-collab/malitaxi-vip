const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-20.html', 'utf8');

// Ajouter onclick sur le bouton Historique
h = h.replace(
  '<div style="font-size:18px">📋</div><div style="flex:1"><div style="font-size:13px;font-weight:700">Historique courses</div>',
  '<div style="font-size:18px">📋</div><div style="flex:1" onclick="openHistorique()"><div style="font-size:13px;font-weight:700">Historique courses</div>'
);

// Aussi chercher si le div parent a un onclick
h = h.replace(
  'cursor:pointer" onclick="openL',
  'cursor:pointer" onclick="openHistorique()" id="btn-historique"><span style="display:none">x</span><span style="display:none" onclick="openL'
);

// Ajouter la fonction openHistorique avant </script>
const code = `
function openHistorique(){
  var o=document.createElement("div");
  o.id="hist-ov";
  o.style.cssText="position:fixed;inset:0;background:#0F0F1A;z-index:900;overflow-y:auto;font-family:inherit";
  var d="";
  d+="<div style='max-width:420px;margin:0 auto;padding:20px'>";
  d+="<div style='display:flex;align-items:center;gap:12px;margin-bottom:20px'>";
  d+="<button onclick=\"document.getElementById('hist-ov').remove()\" style='background:rgba(255,255,255,.1);border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer'>←</button>";
  d+="<div style='font-size:18px;font-weight:900;color:#F5A623'>📋 Historique courses</div></div>";
  
  // Filtres
  d+="<div style='display:flex;gap:8px;margin-bottom:16px'>";
  d+="<button onclick=\"filtrerHist('tous',this)\" class='hist-btn' style='flex:1;padding:8px;background:#F5A623;border:none;border-radius:8px;color:#fff;font-weight:700;cursor:pointer;font-family:inherit;font-size:12px'>Tous</button>";
  d+="<button onclick=\"filtrerHist('taxi',this)\" class='hist-btn' style='flex:1;padding:8px;background:rgba(255,255,255,.1);border:none;border-radius:8px;color:#fff;font-weight:700;cursor:pointer;font-family:inherit;font-size:12px'>🚕 Taxi</button>";
  d+="<button onclick=\"filtrerHist('moto',this)\" class='hist-btn' style='flex:1;padding:8px;background:rgba(255,255,255,.1);border:none;border-radius:8px;color:#fff;font-weight:700;cursor:pointer;font-family:inherit;font-size:12px'>🏍️ Moto</button>";
  d+="<button onclick=\"filtrerHist('livraison',this)\" class='hist-btn' style='flex:1;padding:8px;background:rgba(255,255,255,.1);border:none;border-radius:8px;color:#fff;font-weight:700;cursor:pointer;font-family:inherit;font-size:12px'>📦 Livr.</button>";
  d+="</div>";
  
  // Stats rapides
  d+="<div style='display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px'>";
  d+="<div style='background:#1A1A2E;border-radius:12px;padding:12px;text-align:center'><div style='font-size:20px;font-weight:900;color:#F5A623'>"+totalCourses+"</div><div style='font-size:10px;color:rgba(255,255,255,.5)'>Total courses</div></div>";
  d+="<div style='background:#1A1A2E;border-radius:12px;padding:12px;text-align:center'><div style='font-size:20px;font-weight:900;color:#10b981'>245K</div><div style='font-size:10px;color:rgba(255,255,255,.5)'>FCFA ce mois</div></div>";
  d+="<div style='background:#1A1A2E;border-radius:12px;padding:12px;text-align:center'><div style='font-size:20px;font-weight:900;color:#3B82F6'>4.8⭐</div><div style='font-size:10px;color:rgba(255,255,255,.5)'>Note moy.</div></div>";
  d+="</div>";
  
  // Liste des courses
  d+="<div id='hist-list'>";
  var courses=[
    {id:"C001",type:"taxi",ico:"🚕",client:"Aminata Sanogo",de:"Hamdallaye",vers:"ACI 2000",date:"Aujourd'hui",heure:"07:30",km:3.2,duree:12,montant:2500,note:5,pay:"Orange Money",statut:"terminee"},
    {id:"C002",type:"vip",ico:"👑",client:"Boubacar Diarra",de:"Badalabougou",vers:"Sogoniko",date:"Aujourd'hui",heure:"09:15",km:6.1,duree:22,montant:4500,note:4,pay:"Wave",statut:"terminee"},
    {id:"C003",type:"moto",ico:"🏍️",client:"Mariam Coulibaly",de:"Lafiabougou",vers:"Faladié",date:"Hier",heure:"14:30",km:2.8,duree:10,montant:2000,note:5,pay:"Moov",statut:"terminee"},
    {id:"C004",type:"taxi",ico:"🚕",client:"Oumar Traoré",de:"Magnambougou",vers:"Kalaban",date:"Hier",heure:"11:00",km:4.5,duree:18,montant:3000,note:3,pay:"Cash",statut:"annulee"},
    {id:"C005",type:"livraison",ico:"📦",client:"Fatoumata Keita",de:"Marché Médina",vers:"Hamdallaye",date:"13/06/2026",heure:"16:45",km:5.3,duree:20,montant:1500,note:5,pay:"Orange Money",statut:"terminee"},
    {id:"C006",type:"taxi",ico:"🚕",client:"Seydou Koné",de:"Niamakoro",vers:"Hamdallaye",date:"12/06/2026",heure:"08:00",km:7.1,duree:28,montant:3500,note:4,pay:"Wave",statut:"terminee"},
    {id:"C007",type:"taxi",ico:"🚕",client:"Kadiatou Bah",de:"Sogoniko",vers:"ACI 2000",date:"12/06/2026",heure:"10:30",km:4.0,duree:16,montant:2500,note:5,pay:"Orange Money",statut:"terminee"},
  ];
  
  var dates={};
  for(var i=0;i<courses.length;i++){
    var c=courses[i];
    if(!dates[c.date]){
      dates[c.date]=true;
      d+="<div style='font-size:11px;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;margin:12px 0 8px'>"+c.date+"</div>";
    }
    var stars="";
    for(var s=1;s<=5;s++) stars+=s<=c.note?"⭐":"☆";
    d+="<div class='hist-item' data-type='"+c.type+"' style='background:#1A1A2E;border-radius:14px;padding:14px;margin-bottom:10px;border-left:3px solid "+(c.statut=="terminee"?"#10b981":"#dc2626")+"'>";
    d+="<div style='display:flex;align-items:center;gap:10px;margin-bottom:8px'>";
    d+="<div style='width:40px;height:40px;background:rgba(245,166,35,.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px'>"+c.ico+"</div>";
    d+="<div style='flex:1'>";
    d+="<div style='font-size:13px;font-weight:700;color:#fff'>"+c.client+"</div>";
    d+="<div style='font-size:11px;color:rgba(255,255,255,.5)'>"+c.heure+" · "+c.km+"km · "+c.duree+"min</div>";
    d+="</div>";
    d+="<div style='text-align:right'>";
    d+="<div style='font-size:15px;font-weight:900;color:"+(c.statut=="terminee"?"#F5A623":"#dc2626")+"'>"+(c.statut=="terminee"?"+":"")+c.montant.toLocaleString("fr-FR")+" F</div>";
    d+="<div style='font-size:10px;color:rgba(255,255,255,.4)'>"+c.pay+"</div>";
    d+="</div></div>";
    d+="<div style='display:flex;align-items:center;justify-content:space-between'>";
    d+="<div style='font-size:12px;color:rgba(255,255,255,.6)'>📍 "+c.de+" → "+c.vers+"</div>";
    d+="<div style='font-size:11px'>"+stars+"</div>";
    d+="</div>";
    d+="<div style='margin-top:6px'><span style='background:"+(c.statut=="terminee"?"rgba(16,185,129,.2)":"rgba(220,38,38,.2)")+";color:"+(c.statut=="terminee"?"#10b981":"#dc2626")+";padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700'>"+(c.statut=="terminee"?"✅ Terminée":"❌ Annulée")+"</span></div>";
    d+="</div>";
  }
  d+="</div>";
  
  // Bouton exporter
  d+="<button onclick=\"alert('Export disponible dans la version complète')\" style='width:100%;padding:14px;background:rgba(245,166,35,.15);border:1px solid rgba(245,166,35,.3);border-radius:12px;color:#F5A623;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;margin-top:8px'>📥 Exporter historique</button>";
  d+="</div>";
  
  o.innerHTML=d;
  document.body.appendChild(o);
}

function filtrerHist(type, btn){
  document.querySelectorAll(".hist-btn").forEach(function(b){
    b.style.background="rgba(255,255,255,.1)";
  });
  btn.style.background="#F5A623";
  document.querySelectorAll(".hist-item").forEach(function(item){
    item.style.display=(type==="tous"||item.dataset.type===type)?"block":"none";
  });
}
`;

const lastScript = h.lastIndexOf('</script>');
h = h.slice(0, lastScript) + code + '\n' + h.slice(lastScript);

// Connecter le bouton Historique
h = h.replace(
  "'<div style=\"padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;cursor:pointer\" onclick=\"openL",
  "'<div style=\"padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;cursor:pointer\" onclick=\"openHistorique()\" ><span style=\"display:none\" onclick=\"openL"
);

fs.writeFileSync('chauffeur-vip-pro-20.html', h, 'utf8');
console.log('OK taille:', h.length);
