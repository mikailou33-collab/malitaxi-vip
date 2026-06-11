const fs=require('fs');
var html=fs.readFileSync('malitaxi-admin-10.html','utf8');
var pubSection=`
<div id="section-pub" class="section" style="display:none">
<h2 style="font-size:20px;font-weight:700;margin-bottom:20px">📢 Gestion Publicités</h2>
<div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap">
<div style="background:#fff;border-radius:12px;padding:16px;flex:1;min-width:150px;box-shadow:0 2px 8px rgba(0,0,0,0.08)"><div style="font-size:28px;font-weight:800;color:#F5A623">8</div><div style="color:#666;font-size:13px">Pubs actives</div></div>
<div style="background:#fff;border-radius:12px;padding:16px;flex:1;min-width:150px;box-shadow:0 2px 8px rgba(0,0,0,0.08)"><div style="font-size:28px;font-weight:800;color:#22c55e">245.000</div><div style="color:#666;font-size:13px">Revenus pub (FCFA)</div></div>
<div style="background:#fff;border-radius:12px;padding:16px;flex:1;min-width:150px;box-shadow:0 2px 8px rgba(0,0,0,0.08)"><div style="font-size:28px;font-weight:800;color:#6366f1">3</div><div style="color:#666;font-size:13px">En attente</div></div>
</div>
<div style="background:#fff;border-radius:12px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,0.08);margin-bottom:20px">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
<h3 style="font-size:16px;font-weight:700">📋 Annonceurs actifs</h3>
<button onclick="ajouterPub()" style="background:#F5A623;color:white;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:600">+ Ajouter</button>
</div>
<table style="width:100%;border-collapse:collapse">
<thead><tr style="background:#f8f9fa"><th style="padding:10px;text-align:left;font-size:13px">Annonceur</th><th style="padding:10px;text-align:left;font-size:13px">Catégorie</th><th style="padding:10px;text-align:left;font-size:13px">Statut</th><th style="padding:10px;text-align:left;font-size:13px">Action</th></tr></thead>
<tbody id="pub-list">
<tr style="border-bottom:1px solid #f0f0f0"><td style="padding:10px">Hotel Mandé</td><td style="padding:10px"><span style="background:#dbeafe;color:#1d4ed8;padding:3px 8px;border-radius:4px;font-size:12px">Hôtel</span></td><td style="padding:10px"><span style="background:#dcfce7;color:#16a34a;padding:3px 8px;border-radius:4px;font-size:12px">✅ Actif</span></td><td style="padding:10px"><button onclick="togglePub(this)" style="background:#fee2e2;color:#dc2626;border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:12px">Désactiver</button></td></tr>
<tr style="border-bottom:1px solid #f0f0f0"><td style="padding:10px">Immo Bamako</td><td style="padding:10px"><span style="background:#fef9c3;color:#854d0e;padding:3px 8px;border-radius:4px;font-size:12px">Immobilier</span></td><td style="padding:10px"><span style="background:#dcfce7;color:#16a34a;padding:3px 8px;border-radius:4px;font-size:12px">✅ Actif</span></td><td style="padding:10px"><button onclick="togglePub(this)" style="background:#fee2e2;color:#dc2626;border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:12px">Désactiver</button></td></tr>
<tr style="border-bottom:1px solid #f0f0f0"><td style="padding:10px">ElectroBamako</td><td style="padding:10px"><span style="background:#f3e8ff;color:#7c3aed;padding:3px 8px;border-radius:4px;font-size:12px">Électronique</span></td><td style="padding:10px"><span style="background:#fef9c3;color:#854d0e;padding:3px 8px;border-radius:4px;font-size:12px">⏳ En attente</span></td><td style="padding:10px"><button onclick="validerPub(this)" style="background:#dcfce7;color:#16a34a;border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:12px">Valider</button></td></tr>
</tbody>
</table>
</div>
</div>
<script>
function ajouterPub(){var nom=prompt("Nom de l'annonceur:");if(!nom)return;var cat=prompt("Catégorie (Hôtel/Immobilier/Électronique/Beauté/Événement/Shopping):");if(!cat)return;var tr=document.createElement('tr');tr.style.borderBottom='1px solid #f0f0f0';tr.innerHTML='<td style="padding:10px">'+nom+'</td><td style="padding:10px"><span style="background:#dbeafe;color:#1d4ed8;padding:3px 8px;border-radius:4px;font-size:12px">'+cat+'</span></td><td style="padding:10px"><span style="background:#dcfce7;color:#16a34a;padding:3px 8px;border-radius:4px;font-size:12px">✅ Actif</span></td><td style="padding:10px"><button onclick="togglePub(this)" style="background:#fee2e2;color:#dc2626;border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-size:12px">Désactiver</button></td>';document.getElementById('pub-list').appendChild(tr);}
function togglePub(btn){var td=btn.parentNode.previousElementSibling;if(btn.textContent==='Désactiver'){td.innerHTML='<span style="background:#fee2e2;color:#dc2626;padding:3px 8px;border-radius:4px;font-size:12px">❌ Inactif</span>';btn.textContent='Activer';btn.style.background='#dcfce7';btn.style.color='#16a34a';}else{td.innerHTML='<span style="background:#dcfce7;color:#16a34a;padding:3px 8px;border-radius:4px;font-size:12px">✅ Actif</span>';btn.textContent='Désactiver';btn.style.background='#fee2e2';btn.style.color='#dc2626';}}
function validerPub(btn){var td=btn.parentNode.previousElementSibling;td.innerHTML='<span style="background:#dcfce7;color:#16a34a;padding:3px 8px;border-radius:4px;font-size:12px">✅ Actif</span>';btn.textContent='Désactiver';btn.onclick=function(){togglePub(btn)};btn.style.background='#fee2e2';btn.style.color='#dc2626';}
</script>`;
var navItem='<li onclick="showSection(\'pub\')" id="nav-pub" class="nav-item"><span>📢</span> Publicités</li>';
html=html.replace('</ul>',navItem+'</ul>');
html=html.replace('</body>',pubSection+'</body>');
fs.writeFileSync('malitaxi-admin-10.html',html);
console.log('OK fait');