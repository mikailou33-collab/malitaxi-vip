const fs = require('fs');
let h = fs.readFileSync('malitaxi-admin-new.html', 'utf8');

// FIX 1: Ajouter type aller/retour dans RESERVATIONS_BUS
h = h.replace(
  '{id:"BUS001",client:"Aminata Sanogo",tel:"79111222",de:"Bamako",vers:"Ségou",date:"14/06/2026",heure:"09h00",places:2,compagnie:"SONEF",paiement:"Orange Money",prix:7000,statut:"confirmé"}',
  '{id:"BUS001",client:"Aminata Sanogo",tel:"79111222",de:"Bamako",vers:"Ségou",date:"14/06/2026",dateRetour:"21/06/2026",heure:"09h00",places:2,compagnie:"SONEF",paiement:"Orange Money",prix:7000,type:"aller-retour",statut:"confirmé"}'
);
h = h.replace(
  '{id:"BUS002",client:"Boubacar Diarra",tel:"76333444",de:"Bamako",vers:"Mopti",date:"15/06/2026",heure:"05h30",places:1,compagnie:"Rimbo",paiement:"Wave",prix:6000,statut:"en attente"}',
  '{id:"BUS002",client:"Boubacar Diarra",tel:"76333444",de:"Bamako",vers:"Mopti",date:"15/06/2026",dateRetour:"",heure:"05h30",places:1,compagnie:"Rimbo",paiement:"Wave",prix:6000,type:"aller simple",statut:"en attente"}'
);
h = h.replace(
  '{id:"BUS003",client:"Mariam Coulibaly",tel:"65555666",de:"Bamako",vers:"Kayes",date:"16/06/2026",heure:"14h00",places:3,compagnie:"Bittar",paiement:"Orange Money",prix:21000,statut:"confirmé"}',
  '{id:"BUS003",client:"Mariam Coulibaly",tel:"65555666",de:"Bamako",vers:"Kayes",date:"16/06/2026",dateRetour:"23/06/2026",heure:"14h00",places:3,compagnie:"Bittar",paiement:"Orange Money",prix:21000,type:"aller-retour",statut:"confirmé"}'
);
h = h.replace(
  '{id:"BUS004",client:"Oumar Traoré",tel:"70777888",de:"Ségou",vers:"Mopti",date:"14/06/2026",heure:"09h00",places:1,compagnie:"SONEF",paiement:"Moov",prix:4000,statut:"annulé"}',
  '{id:"BUS004",client:"Oumar Traoré",tel:"70777888",de:"Ségou",vers:"Mopti",date:"14/06/2026",dateRetour:"",heure:"09h00",places:1,compagnie:"SONEF",paiement:"Moov",prix:4000,type:"aller simple",statut:"annulé"}'
);
h = h.replace(
  '{id:"BUS005",client:"Fatoumata Keita",tel:"66789012",de:"Bamako",vers:"Sikasso",date:"17/06/2026",heure:"17h30",places:2,compagnie:"Diarra Bus",paiement:"Wave",prix:10000,statut:"en attente"}',
  '{id:"BUS005",client:"Fatoumata Keita",tel:"66789012",de:"Bamako",vers:"Sikasso",date:"17/06/2026",dateRetour:"24/06/2026",heure:"17h30",places:2,compagnie:"Diarra Bus",paiement:"Wave",prix:10000,type:"aller-retour",statut:"en attente"}'
);

// FIX 2: Mettre à jour renderBus pour afficher type + date retour
const oldRenderBus = `        <thead><tr><th>ID</th><th>Client</th><th>Téléphone</th><th>Trajet</th><th>Date</th><th>Heure</th><th>Places</th><th>Compagnie</th><th>Paiement</th><th>Prix</th><th>Statut</th><th>Actions</th></tr></thead>
        <tbody id="bus-tbody">\${RESERVATIONS_BUS.map(r=>\`<tr data-statut="\${r.statut}">
          <td><b>\${r.id}</b></td>
          <td>\${r.client}</td>
          <td>\${r.tel}</td>
          <td><b>\${r.de}</b> → \${r.vers}</td>
          <td>\${r.date}</td>
          <td>\${r.heure}</td>
          <td style="text-align:center">\${r.places}</td>
          <td>\${r.compagnie}</td>
          <td>\${r.paiement}</td>
          <td><b>\${fmt(r.prix)} F</b></td>
          <td><span class="badge \${r.statut==="confirmé"?"badge-green":r.statut==="en attente"?"badge-yellow":"badge-red"}">\${r.statut}</span></td>`;

const newRenderBus = `        <thead><tr><th>ID</th><th>Client</th><th>Téléphone</th><th>Trajet</th><th>Type</th><th>Date aller</th><th>Date retour</th><th>Heure</th><th>Places</th><th>Compagnie</th><th>Paiement</th><th>Prix</th><th>Statut</th><th>Actions</th></tr></thead>
        <tbody id="bus-tbody">\${RESERVATIONS_BUS.map(r=>\`<tr data-statut="\${r.statut}">
          <td><b>\${r.id}</b></td>
          <td>\${r.client}</td>
          <td>\${r.tel}</td>
          <td><b>\${r.de}</b> → \${r.vers}</td>
          <td><span class="badge \${r.type==="aller-retour"?"badge-blue":"badge-green"}">\${r.type==="aller-retour"?"🔄 A/R":"→ Aller"}</span></td>
          <td>\${r.date}</td>
          <td>\${r.dateRetour||"—"}</td>
          <td>\${r.heure}</td>
          <td style="text-align:center">\${r.places}</td>
          <td>\${r.compagnie}</td>
          <td>\${r.paiement}</td>
          <td><b>\${fmt(r.prix)} F</b></td>
          <td><span class="badge \${r.statut==="confirmé"?"badge-green":r.statut==="en attente"?"badge-yellow":"badge-red"}">\${r.statut}</span></td>`;

h = h.replace(oldRenderBus, newRenderBus);

// FIX 3: Ajouter champ type + date retour dans formulaire nouvelle réservation
h = h.replace(
  `    <div class="form-group"><label class="form-label">Prix total (FCFA)</label><input class="form-input" id="bprix" type="number" placeholder="5000"/></div>`,
  `    <div class="form-row">
      <div class="form-group" style="flex:1"><label class="form-label">Type de billet</label>
        <select class="form-input" id="btype" onchange="document.getElementById('retour-row').style.display=this.value==='aller-retour'?'flex':'none'">
          <option value="aller simple">→ Aller simple</option>
          <option value="aller-retour">🔄 Aller-Retour</option>
        </select>
      </div>
      <div class="form-group" style="flex:1" id="retour-row" style="display:none"><label class="form-label">Date retour</label><input class="form-input" id="bretour" type="date"/></div>
    </div>
    <div class="form-group"><label class="form-label">Prix total (FCFA)</label><input class="form-input" id="bprix" type="number" placeholder="5000"/></div>`
);

// FIX 4: Mettre à jour ajouterReservBus pour inclure type et date retour
h = h.replace(
  `  const id="BUS"+String(RESERVATIONS_BUS.length+1).padStart(3,"0");
  RESERVATIONS_BUS.unshift({id,client:n,tel:t,de,vers,date:date.split("-").reverse().join("/"),heure:"09h00",places,compagnie:comp,paiement:pay,prix,statut:"en attente"});`,
  `  const id="BUS"+String(RESERVATIONS_BUS.length+1).padStart(3,"0");
  const btype=document.getElementById("btype")?.value||"aller simple";
  const bretour=document.getElementById("bretour")?.value||"";
  RESERVATIONS_BUS.unshift({id,client:n,tel:t,de,vers,date:date.split("-").reverse().join("/"),dateRetour:bretour?bretour.split("-").reverse().join("/"):"",heure:"09h00",places,compagnie:comp,paiement:pay,prix,type:btype,statut:"en attente"});`
);

// FIX 5: Remplacer renderPubregion pour ajouter photos/vidéos
const oldPubRegion = `// ── PUBLICITÉS RÉGIONALES ──
function renderPubregion(){`;

const newPubRegion = `// ── PUBLICITÉS RÉGIONALES AVEC MEDIA ──
function renderPubregion(){`;

h = h.replace(oldPubRegion, newPubRegion);

// FIX 6: Améliorer le tableau des pubs régionales avec media
h = h.replace(
  `        <thead><tr><th>Région</th><th>Partenaire</th><th>Catégorie</th><th>Contact</th><th>Statut</th><th>Actions</th></tr></thead>
        <tbody>\${PUBS_REGIONS.map(p=>\`<tr>
          <td><b>\${REGIONS_MALI.find(r=>r.id===p.region)?.emoji||"🌍"} \${p.nom_region}</b></td>
          <td><b>\${p.partenaire}</b></td>
          <td><span class="badge badge-blue">\${p.cat}</span></td>
          <td>\${p.contact}</td>
          <td><span class="badge \${p.actif?"badge-green":"badge-red"}">\${p.actif?"✅ Actif":"❌ Inactif"}</span></td>
          <td style="display:flex;gap:4px">
            <button class="btn btn-small \${p.actif?"btn-red":"btn-green"}" onclick="togglePubRegion(\${p.id})">\${p.actif?"Désactiver":"Activer"}</button>
            <button class="btn btn-red btn-small" onclick="supprimerPubRegion(\${p.id})">🗑️</button>
          </td>
        </tr>\`).join("")}</tbody>`,
  `        <thead><tr><th>Région</th><th>Visuel</th><th>Partenaire</th><th>Catégorie</th><th>Media</th><th>Contact</th><th>Statut</th><th>Actions</th></tr></thead>
        <tbody>\${PUBS_REGIONS.map(p=>\`<tr>
          <td><b>\${REGIONS_MALI.find(r=>r.id===p.region)?.emoji||"🌍"} \${p.nom_region}</b></td>
          <td><div style="width:60px;height:40px;background:linear-gradient(135deg,#1E40AF,#3B82F6);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:20px">\${p.emoji||"🏢"}</div></td>
          <td><b>\${p.partenaire}</b></td>
          <td><span class="badge badge-blue">\${p.cat}</span></td>
          <td style="display:flex;gap:4px">
            <button class="btn btn-small" style="background:#dbeafe;color:#1d4ed8" onclick="ajouterPhoto(\${p.id})">📷 Photo</button>
            <button class="btn btn-small" style="background:#f3e8ff;color:#7c3aed" onclick="ajouterVideo(\${p.id})">🎥 Vidéo</button>
          </td>
          <td>\${p.contact}</td>
          <td><span class="badge \${p.actif?"badge-green":"badge-red"}">\${p.actif?"✅ Actif":"❌ Inactif"}</span></td>
          <td style="display:flex;gap:4px">
            <button class="btn btn-small \${p.actif?"btn-red":"btn-green"}" onclick="togglePubRegion(\${p.id})">\${p.actif?"Désactiver":"Activer"}</button>
            <button class="btn btn-red btn-small" onclick="supprimerPubRegion(\${p.id})">🗑️</button>
          </td>
        </tr>\`).join("")}</tbody>`
);

// FIX 7: Ajouter emoji dans PUBS_REGIONS et fonctions photo/vidéo
h = h.replace(
  `  {id:1,region:"segou",nom_region:"Ségou",partenaire:"Hôtel Djoliba",cat:"Hôtel",actif:true,contact:"76123456"},`,
  `  {id:1,region:"segou",nom_region:"Ségou",partenaire:"Hôtel Djoliba",cat:"Hôtel",actif:true,contact:"76123456",emoji:"🏨",photo:"",video:""},`
);
h = h.replace(
  `  {id:2,region:"mopti",nom_region:"Mopti",partenaire:"Lodge du Delta",cat:"Tourisme",actif:true,contact:"65987654"},`,
  `  {id:2,region:"mopti",nom_region:"Mopti",partenaire:"Lodge du Delta",cat:"Tourisme",actif:true,contact:"65987654",emoji:"🏕️",photo:"",video:""},`
);
h = h.replace(
  `  {id:3,region:"kayes",nom_region:"Kayes",partenaire:"Immo Kayes",cat:"Immobilier",actif:false,contact:"70456789"},`,
  `  {id:3,region:"kayes",nom_region:"Kayes",partenaire:"Immo Kayes",cat:"Immobilier",actif:false,contact:"70456789",emoji:"🏠",photo:"",video:""},`
);
h = h.replace(
  `  {id:4,region:"sikasso",nom_region:"Sikasso",partenaire:"Agro Sikasso",cat:"Agriculture",actif:true,contact:"79234567"},`,
  `  {id:4,region:"sikasso",nom_region:"Sikasso",partenaire:"Agro Sikasso",cat:"Agriculture",actif:true,contact:"79234567",emoji:"🌿",photo:"",video:""},`
);
h = h.replace(
  `  {id:5,region:"bamako",nom_region:"Bamako",partenaire:"Hôtel Laïco",cat:"Hôtel",actif:true,contact:"76000001"},`,
  `  {id:5,region:"bamako",nom_region:"Bamako",partenaire:"Hôtel Laïco",cat:"Hôtel",actif:true,contact:"76000001",emoji:"🏨",photo:"",video:""},`
);
h = h.replace(
  `  {id:6,region:"bamako",nom_region:"Bamako",partenaire:"Immo Mali",cat:"Immobilier",actif:true,contact:"76000002"},`,
  `  {id:6,region:"bamako",nom_region:"Bamako",partenaire:"Immo Mali",cat:"Immobilier",actif:true,contact:"76000002",emoji:"🏠",photo:"",video:""},`
);

// FIX 8: Ajouter fonctions photo/vidéo et emoji dans creerPubRegion
h = h.replace(
  `  PUBS_REGIONS.push({id:PUBS_REGIONS.length+1,region:rId,nom_region:rNom,partenaire:nom,cat,actif:true,contact:tel||"—"});`,
  `  const emojis={"Hôtel":"🏨","Immobilier":"🏠","Construction":"🏗️","Électronique":"📱","Beauté":"💄","Événements":"🎉","Shopping":"🛍️","Tourisme":"🏕️","Agriculture":"🌿","Autre":"🏢"};
  PUBS_REGIONS.push({id:PUBS_REGIONS.length+1,region:rId,nom_region:rNom,partenaire:nom,cat,actif:true,contact:tel||"—",emoji:emojis[cat]||"🏢",photo:"",video:""});`
);

// FIX 9: Fonctions ajouterPhoto et ajouterVideo
h = h.replace(
  `function creerPubRegion(){`,
  `function ajouterPhoto(id){
  const p=PUBS_REGIONS.find(x=>x.id===id);
  if(!p) return;
  document.getElementById("modal-box").innerHTML=\`
    <div class="modal-hdr"><div class="modal-title">📷 Photo — \${p.partenaire}</div><div class="modal-close" onclick="closeModal()">✕</div></div>
    <div class="form-group"><label class="form-label">Lien photo (URL image)</label>
      <input class="form-input" id="photo-url" placeholder="https://exemple.com/photo.jpg" value="\${p.photo||""}"/>
    </div>
    <div id="photo-preview" style="margin:12px 0;\${p.photo?"":"display:none"}">
      \${p.photo?\`<img src="\${p.photo}" style="width:100%;border-radius:10px;max-height:200px;object-fit:cover">\`:""}
    </div>
    <div style="font-size:12px;color:var(--muted);margin-bottom:12px">💡 Astuce: Utilisez un lien Google Drive, Imgur, ou hébergeur d'images</div>
    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="btn" style="background:var(--border)" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="sauverPhoto(\${id})">✅ Sauvegarder</button>
    </div>\`;
  openModal();
}

function sauverPhoto(id){
  const p=PUBS_REGIONS.find(x=>x.id===id);
  const url=document.getElementById("photo-url").value;
  if(p){p.photo=url;closeModal();renderPubregion();toast("📷 Photo mise à jour pour "+p.partenaire,"s");}
}

function ajouterVideo(id){
  const p=PUBS_REGIONS.find(x=>x.id===id);
  if(!p) return;
  document.getElementById("modal-box").innerHTML=\`
    <div class="modal-hdr"><div class="modal-title">🎥 Vidéo — \${p.partenaire}</div><div class="modal-close" onclick="closeModal()">✕</div></div>
    <div class="form-group"><label class="form-label">Lien vidéo YouTube</label>
      <input class="form-input" id="video-url" placeholder="https://youtube.com/watch?v=..." value="\${p.video||""}"/>
    </div>
    \${p.video?\`<div style="margin:12px 0"><iframe width="100%" height="180" src="https://www.youtube.com/embed/\${p.video.includes("v=")?p.video.split("v=")[1].split("&")[0]:p.video.split("/").pop()}" frameborder="0" allowfullscreen style="border-radius:10px"></iframe></div>\`:""}
    <div style="font-size:12px;color:var(--muted);margin-bottom:12px">💡 Collez le lien YouTube de la vidéo publicitaire du partenaire</div>
    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="btn" style="background:var(--border)" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="sauverVideo(\${id})">✅ Sauvegarder</button>
    </div>\`;
  openModal();
}

function sauverVideo(id){
  const p=PUBS_REGIONS.find(x=>x.id===id);
  const url=document.getElementById("video-url").value;
  if(p){p.video=url;closeModal();renderPubregion();toast("🎥 Vidéo mise à jour pour "+p.partenaire,"s");}
}

function creerPubRegion(){`
);

fs.writeFileSync('malitaxi-admin-new.html', h, 'utf8');
console.log('OK taille:', h.length);
