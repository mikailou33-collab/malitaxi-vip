const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-20.html', 'utf8');

// Supprimer ancien module revenus
const start = h.indexOf('// MODULE REVENUS');
const end = h.indexOf('\nfunction demanderRetrait');
if(start > 0 && end > start){
  const endFn = h.indexOf('\n}', end) + 2;
  h = h.slice(0, start) + h.slice(endFn);
  console.log('Ancien module supprimé');
}

// Version simple sans template literals
const code = `
function openRevenus(){
  var o=document.createElement('div');
  o.id='rev-ov';
  o.style.cssText='position:fixed;inset:0;background:#0F0F1A;z-index:900;overflow-y:auto;font-family:inherit';
  var d='<div style="max-width:420px;margin:0 auto;padding:20px">';
  d+='<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">';
  d+='<button onclick="document.getElementById(\'rev-ov\').remove()" style="background:rgba(255,255,255,.1);border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer">←</button>';
  d+='<div style="font-size:18px;font-weight:900;color:#F5A623">💰 Mes Revenus</div></div>';
  d+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">';
  d+='<div style="background:linear-gradient(135deg,#1E40AF,#3B82F6);border-radius:16px;padding:16px"><div style="font-size:11px;color:rgba(255,255,255,.7);font-weight:700">AUJOURD\'HUI</div><div style="font-size:24px;font-weight:900;color:#fff;margin-top:4px">15 500 F</div><div style="font-size:12px;color:rgba(255,255,255,.6)">5 courses</div></div>';
  d+='<div style="background:linear-gradient(135deg,#059669,#10b981);border-radius:16px;padding:16px"><div style="font-size:11px;color:rgba(255,255,255,.7);font-weight:700">CETTE SEMAINE</div><div style="font-size:24px;font-weight:900;color:#fff;margin-top:4px">140 500 F</div><div style="font-size:12px;color:rgba(255,255,255,.6)">55 courses</div></div>';
  d+='<div style="background:rgba(245,166,35,.15);border:1px solid rgba(245,166,35,.3);border-radius:16px;padding:16px"><div style="font-size:11px;color:rgba(255,255,255,.7);font-weight:700">COMMISSION 15%</div><div style="font-size:20px;font-weight:900;color:#F5A623;margin-top:4px">-21 075 F</div><div style="font-size:12px;color:rgba(255,255,255,.6)">MaliTaxi</div></div>';
  d+='<div style="background:rgba(16,185,129,.15);border:1px solid rgba(16,185,129,.3);border-radius:16px;padding:16px"><div style="font-size:11px;color:rgba(255,255,255,.7);font-weight:700">NET A RECEVOIR</div><div style="font-size:20px;font-weight:900;color:#10b981;margin-top:4px">119 425 F</div><div style="font-size:12px;color:rgba(255,255,255,.6)">80% des revenus</div></div>';
  d+='</div>';
  d+='<div style="background:#1A1A2E;border-radius:16px;padding:16px;margin-bottom:20px">';
  d+='<div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:16px">📊 Revenus cette semaine</div>';
  d+='<div style="display:flex;align-items:flex-end;gap:8px;height:120px">';
  var jours=[['Lun',15500],['Mar',22000],['Mer',18500],['Jeu',25000],['Ven',31000],['Sam',28500],['Dim',0]];
  for(var i=0;i<jours.length;i++){
    var hh=Math.round((jours[i][1]/31000)*80);
    var pk=jours[i][1]===31000;
    d+='<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">';
    d+='<div style="font-size:9px;color:rgba(255,255,255,.5)">'+(jours[i][1]>0?Math.round(jours[i][1]/1000)+'k':'')+'</div>';
    d+='<div style="width:100%;height:'+hh+'px;background:'+(pk?'#F5A623':'rgba(245,166,35,.25)')+';border-radius:6px 6px 0 0;min-height:4px"></div>';
    d+='<div style="font-size:10px;color:'+(pk?'#F5A623':'rgba(255,255,255,.5)')+';font-weight:'+(pk?900:400)+'">'+jours[i][0]+'</div></div>';
  }
  d+='</div></div>';
  d+='<div style="background:#1A1A2E;border-radius:16px;padding:16px;margin-bottom:20px">';
  d+='<div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:12px">💳 Par mode de paiement</div>';
  var pays=[['🟠','Orange Money',8500,55],['🔵','Wave',4500,29],['🟡','Moov',1500,10],['💵','Cash',1000,6]];
  for(var p=0;p<pays.length;p++){
    d+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">';
    d+='<div style="font-size:20px">'+pays[p][0]+'</div>';
    d+='<div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:13px;color:#fff;font-weight:700">'+pays[p][1]+'</span><span style="font-size:13px;color:#F5A623;font-weight:700">'+pays[p][2].toLocaleString('fr-FR')+' F</span></div>';
    d+='<div style="background:rgba(255,255,255,.1);border-radius:4px;height:6px"><div style="background:#F5A623;height:6px;border-radius:4px;width:'+pays[p][3]+'%"></div></div></div></div>';
  }
  d+='</div>';
  d+='<div style="background:#1A1A2E;border-radius:16px;padding:16px;margin-bottom:20px">';
  d+='<div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:12px">📋 Courses aujourd\'hui</div>';
  var cs=[['🚕','07:30','Hamdallaye → ACI 2000','2 500 F','Orange'],['👑','09:15','Badalabougou → Sogoniko','4 500 F','Wave'],['🚕','11:00','Lafiabougou → Faladié','3 000 F','Cash'],['🏍️','14:30','Magnambougou → Kalaban','2 000 F','Moov'],['🚕','16:45','Niamakoro → Hamdallaye','3 500 F','Orange']];
  for(var c=0;c<cs.length;c++){
    d+='<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.08)">';
    d+='<div style="width:40px;height:40px;background:rgba(245,166,35,.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px">'+cs[c][0]+'</div>';
    d+='<div style="flex:1"><div style="font-size:13px;font-weight:700;color:#fff">'+cs[c][2]+'</div><div style="font-size:11px;color:rgba(255,255,255,.5)">⏰ '+cs[c][1]+'</div></div>';
    d+='<div style="text-align:right"><div style="font-size:14px;font-weight:900;color:#F5A623">'+cs[c][3]+'</div><div style="font-size:10px;color:rgba(255,255,255,.4)">'+cs[c][4]+'</div></div></div>';
  }
  d+='</div>';
  d+='<button onclick="alert(\'Retrait de 119 425 F envoyé ! Paiement dans 24h.\')" style="width:100%;padding:16px;background:linear-gradient(135deg,#059669,#10b981);border:none;border-radius:14px;color:#fff;font-size:16px;font-weight:900;cursor:pointer;font-family:inherit;margin-bottom:20px">💸 Demander retrait — 119 425 F</button>';
  d+='</div>';
  o.innerHTML=d;
  document.body.appendChild(o);
}
`;

const lastScript = h.lastIndexOf('</script>');
h = h.slice(0, lastScript) + code + '\n' + h.slice(lastScript);
fs.writeFileSync('chauffeur-vip-pro-20.html', h, 'utf8');
console.log('OK taille:', h.length);
