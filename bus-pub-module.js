const fs = require('fs');
let h = fs.readFileSync('malitaxi-admin-new.html', 'utf8');

// 1. Ajouter menus Bus et Pub régionale dans sidebar
h = h.replace(
  '<div class="sb-sec">Transport</div>',
  `<div class="sb-sec">Bus & Régions</div>
  <div class="sb-item" id="si-bus" onclick="go('bus')"><span class="sb-ico">🚌</span> Réservations Bus</div>
  <div class="sb-item" id="si-compagnies" onclick="go('compagnies')"><span class="sb-ico">🏢</span> Compagnies Bus</div>
  <div class="sb-item" id="si-tarifsbus" onclick="go('tarifsbus')"><span class="sb-ico">💰</span> Tarifs Bus</div>
  <div class="sb-item" id="si-pubregion" onclick="go('pubregion')"><span class="sb-ico">📢</span> Pubs Régionales</div>
  <div class="sb-item" id="si-livraison" onclick="go('livraison')"><span class="sb-ico">📦</span> Livraisons</div>
  <div class="sb-item" id="si-suivilive" onclick="go('suivilive')"><span class="sb-ico">🔴</span> Suivi live</div>`
);

// 2. Ajouter le code JS avant </script>
const newJS = `

// ════════════════════════════════════════
// MODULE BUS & PUBLICITÉS RÉGIONALES
// ════════════════════════════════════════

const REGIONS_MALI = [
  {id:"kayes",nom:"Kayes",emoji:"🚂",region:"R1"},
  {id:"koulikoro",nom:"Koulikoro",emoji:"🌍",region:"R2"},
  {id:"sikasso",nom:"Sikasso",emoji:"🌿",region:"R3"},
  {id:"segou",nom:"Ségou",emoji:"🏺",region:"R4"},
  {id:"mopti",nom:"Mopti",emoji:"🐊",region:"R5"},
  {id:"tombouctou",nom:"Tombouctou",emoji:"🕌",region:"R6"},
  {id:"gao",nom:"Gao",emoji:"⭐",region:"R7"},
  {id:"kidal",nom:"Kidal",emoji:"🏔️",region:"R8"},
  {id:"taoudenit",nom:"Taoudénit",emoji:"🧂",region:"R9"},
  {id:"menaka",nom:"Ménaka",emoji:"🦁",region:"R10"},
  {id:"bougouni",nom:"Bougouni",emoji:"🌳",region:"R11"},
  {id:"dioila",nom:"Dioïla",emoji:"🌾",region:"R12"},
  {id:"nioro",nom:"Nioro",emoji:"🏔️",region:"R13"},
  {id:"kita",nom:"Kita",emoji:"🌄",region:"R15"},
  {id:"nara",nom:"Nara",emoji:"🏜️",region:"R16"},
  {id:"bandiagara",nom:"Bandiagara",emoji:"🏔️",region:"R17"},
  {id:"san",nom:"San",emoji:"🌾",region:"R18"},
  {id:"douentza",nom:"Douentza",emoji:"🐘",region:"R19"},
  {id:"koutiala",nom:"Koutiala",emoji:"🌱",region:"RC"},
  {id:"bamako",nom:"District Bamako",emoji:"🏙️",region:"CAP"},
];

const COMPAGNIES_BUS = [
  {id:1,nom:"SONEF",trajets:"Bamako-Ségou-Mopti",actif:true,tel:"+22376000001",prix_base:3500},
  {id:2,nom:"Rimbo Transport",trajets:"Toutes destinations",actif:true,tel:"+22376000002",prix_base:4000},
  {id:3,nom:"Bani Transport",trajets:"Nord Mali",actif:true,tel:"+22376000003",prix_base:5000},
  {id:4,nom:"Bittar Transport",trajets:"Kayes-Dakar",actif:true,tel:"+22376000004",prix_base:8000},
  {id:5,nom:"Diarra Bus",trajets:"Sikasso-Bougouni",actif:true,tel:"+22376000005",prix_base:3000},
  {id:6,nom:"Autre compagnie",trajets:"Variable",actif:false,tel:"—",prix_base:0},
];

const TARIFS_BUS = [
  {de:"Bamako",vers:"Ségou",duree:"3h",prix:3500,compagnie:"SONEF"},
  {de:"Bamako",vers:"Mopti",duree:"7h",prix:6000,compagnie:"SONEF"},
  {de:"Bamako",vers:"Sikasso",duree:"5h",prix:5000,compagnie:"Diarra Bus"},
  {de:"Bamako",vers:"Kayes",duree:"8h",prix:7000,compagnie:"Bittar"},
  {de:"Bamako",vers:"Gao",duree:"14h",prix:12000,compagnie:"Rimbo"},
  {de:"Bamako",vers:"Tombouctou",duree:"16h",prix:15000,compagnie:"Rimbo"},
  {de:"Bamako",vers:"Koutiala",duree:"6h",prix:5500,compagnie:"SONEF"},
  {de:"Bamako",vers:"Bougouni",duree:"4h",prix:4000,compagnie:"Diarra Bus"},
  {de:"Ségou",vers:"Mopti",duree:"4h",prix:4000,compagnie:"SONEF"},
  {de:"Ségou",vers:"Niono",duree:"2h",prix:2000,compagnie:"SONEF"},
];

const RESERVATIONS_BUS = [
  {id:"BUS001",client:"Aminata Sanogo",tel:"79111222",de:"Bamako",vers:"Ségou",date:"14/06/2026",heure:"09h00",places:2,compagnie:"SONEF",paiement:"Orange Money",prix:7000,statut:"confirmé"},
  {id:"BUS002",client:"Boubacar Diarra",tel:"76333444",de:"Bamako",vers:"Mopti",date:"15/06/2026",heure:"05h30",places:1,compagnie:"Rimbo",paiement:"Wave",prix:6000,statut:"en attente"},
  {id:"BUS003",client:"Mariam Coulibaly",tel:"65555666",de:"Bamako",vers:"Kayes",date:"16/06/2026",heure:"14h00",places:3,compagnie:"Bittar",paiement:"Orange Money",prix:21000,statut:"confirmé"},
  {id:"BUS004",client:"Oumar Traoré",tel:"70777888",de:"Ségou",vers:"Mopti",date:"14/06/2026",heure:"09h00",places:1,compagnie:"SONEF",paiement:"Moov",prix:4000,statut:"annulé"},
  {id:"BUS005",client:"Fatoumata Keita",tel:"66789012",de:"Bamako",vers:"Sikasso",date:"17/06/2026",heure:"17h30",places:2,compagnie:"Diarra Bus",paiement:"Wave",prix:10000,statut:"en attente"},
];

let PUBS_REGIONS = [
  {id:1,region:"segou",nom_region:"Ségou",partenaire:"Hôtel Djoliba",cat:"Hôtel",actif:true,contact:"76123456"},
  {id:2,region:"mopti",nom_region:"Mopti",partenaire:"Lodge du Delta",cat:"Tourisme",actif:true,contact:"65987654"},
  {id:3,region:"kayes",nom_region:"Kayes",partenaire:"Immo Kayes",cat:"Immobilier",actif:false,contact:"70456789"},
  {id:4,region:"sikasso",nom_region:"Sikasso",partenaire:"Agro Sikasso",cat:"Agriculture",actif:true,contact:"79234567"},
  {id:5,region:"bamako",nom_region:"Bamako",partenaire:"Hôtel Laïco",cat:"Hôtel",actif:true,contact:"76000001"},
  {id:6,region:"bamako",nom_region:"Bamako",partenaire:"Immo Mali",cat:"Immobilier",actif:true,contact:"76000002"},
];

// ── RÉSERVATIONS BUS ──
function renderBus(){
  const total=RESERVATIONS_BUS.reduce((a,r)=>a+(r.statut!=="annulé"?r.prix:0),0);
  document.getElementById("content").innerHTML=\`
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-icon">🎫</div><div class="stat-val">\${RESERVATIONS_BUS.length}</div><div class="stat-lbl">Total réservations</div></div>
      <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-val">\${RESERVATIONS_BUS.filter(r=>r.statut==="confirmé").length}</div><div class="stat-lbl">Confirmées</div></div>
      <div class="stat-card"><div class="stat-icon">⏳</div><div class="stat-val">\${RESERVATIONS_BUS.filter(r=>r.statut==="en attente").length}</div><div class="stat-lbl">En attente</div></div>
      <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-val">\${fmt(total)}</div><div class="stat-lbl">Revenus (FCFA)</div></div>
    </div>
    <div class="table-wrap">
      <div class="table-hdr">
        <div class="table-title">🚌 Réservations Bus</div>
        <div style="display:flex;gap:8px">
          <select class="form-input" onchange="filtrerBus(this.value)" style="padding:6px 10px;font-size:13px;border-radius:8px;border:1px solid var(--border)">
            <option value="tous">Tous</option>
            <option value="en attente">En attente</option>
            <option value="confirmé">Confirmés</option>
            <option value="annulé">Annulés</option>
          </select>
          <button class="btn btn-primary btn-small" onclick="nouvelleReservation()">➕ Nouvelle</button>
        </div>
      </div>
      <table id="bus-table">
        <thead><tr><th>ID</th><th>Client</th><th>Téléphone</th><th>Trajet</th><th>Date</th><th>Heure</th><th>Places</th><th>Compagnie</th><th>Paiement</th><th>Prix</th><th>Statut</th><th>Actions</th></tr></thead>
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
          <td><span class="badge \${r.statut==="confirmé"?"badge-green":r.statut==="en attente"?"badge-yellow":"badge-red"}">\${r.statut}</span></td>
          <td style="display:flex;gap:4px">
            \${r.statut==="en attente"?\`
              <button class="btn btn-green btn-small" onclick="confirmerBus('\${r.id}')">✅</button>
              <button class="btn btn-red btn-small" onclick="annulerBus('\${r.id}')">❌</button>
            \`:r.statut==="confirmé"?\`
              <button class="btn btn-small" style="background:#fef3c7;color:#d97706" onclick="whatsappClient('\${r.tel}','\${r.client}')">📱</button>
            \`:""}
          </td>
        </tr>\`).join("")}</tbody>
      </table>
    </div>\`;
}

function filtrerBus(val){
  document.querySelectorAll("#bus-tbody tr").forEach(tr=>{
    tr.style.display=(val==="tous"||tr.dataset.statut===val)?"":"none";
  });
}

function confirmerBus(id){
  const r=RESERVATIONS_BUS.find(x=>x.id===id);
  if(r){r.statut="confirmé";renderBus();toast("✅ Réservation "+id+" confirmée !","s");}
}

function annulerBus(id){
  if(!confirm("Annuler la réservation "+id+" ?")) return;
  const r=RESERVATIONS_BUS.find(x=>x.id===id);
  if(r){r.statut="annulé";renderBus();toast("❌ Réservation annulée","e");}
}

function whatsappClient(tel,nom){
  const msg=encodeURIComponent("Bonjour "+nom+", votre billet bus MaliTaxi est confirmé ✅");
  window.open("https://wa.me/"+tel.replace(/[^0-9]/g,"")+"?text="+msg,"_blank");
}

function nouvelleReservation(){
  document.getElementById("modal-box").innerHTML=\`
    <div class="modal-hdr"><div class="modal-title">🎫 Nouvelle réservation bus</div><div class="modal-close" onclick="closeModal()">✕</div></div>
    <div class="form-row">
      <div class="form-group" style="flex:1"><label class="form-label">Nom client</label><input class="form-input" id="bn" placeholder="Prénom Nom"/></div>
      <div class="form-group" style="flex:1"><label class="form-label">Téléphone</label><input class="form-input" id="bt" placeholder="+223 XX XXX XXX"/></div>
    </div>
    <div class="form-row">
      <div class="form-group" style="flex:1"><label class="form-label">Départ</label>
        <select class="form-input" id="bde"><option>Bamako</option>\${REGIONS_MALI.map(r=>\`<option>\${r.nom}</option>\`).join("")}</select>
      </div>
      <div class="form-group" style="flex:1"><label class="form-label">Destination</label>
        <select class="form-input" id="bvers">\${REGIONS_MALI.map(r=>\`<option>\${r.nom}</option>\`).join("")}</select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" style="flex:1"><label class="form-label">Date</label><input class="form-input" id="bdate" type="date"/></div>
      <div class="form-group" style="flex:1"><label class="form-label">Compagnie</label>
        <select class="form-input" id="bcomp">\${COMPAGNIES_BUS.filter(c=>c.actif).map(c=>\`<option>\${c.nom}</option>\`).join("")}</select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" style="flex:1"><label class="form-label">Places</label><input class="form-input" id="bplaces" type="number" value="1" min="1" max="10"/></div>
      <div class="form-group" style="flex:1"><label class="form-label">Paiement</label>
        <select class="form-input" id="bpay"><option>Orange Money</option><option>Wave</option><option>Moov Money</option><option>Cash</option></select>
      </div>
    </div>
    <div class="form-group"><label class="form-label">Prix total (FCFA)</label><input class="form-input" id="bprix" type="number" placeholder="5000"/></div>
    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="btn" style="background:var(--border)" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="ajouterReservBus()">✅ Créer</button>
    </div>\`;
  openModal();
}

function ajouterReservBus(){
  const n=document.getElementById("bn").value,t=document.getElementById("bt").value,
    de=document.getElementById("bde").value,vers=document.getElementById("bvers").value,
    date=document.getElementById("bdate").value,comp=document.getElementById("bcomp").value,
    places=parseInt(document.getElementById("bplaces").value)||1,
    pay=document.getElementById("bpay").value,prix=parseInt(document.getElementById("bprix").value)||0;
  if(!n||!t||!date){toast("⚠️ Remplissez tous les champs","e");return;}
  const id="BUS"+String(RESERVATIONS_BUS.length+1).padStart(3,"0");
  RESERVATIONS_BUS.unshift({id,client:n,tel:t,de,vers,date:date.split("-").reverse().join("/"),heure:"09h00",places,compagnie:comp,paiement:pay,prix,statut:"en attente"});
  closeModal();renderBus();toast("🎫 Réservation "+id+" créée !","s");
}

// ── COMPAGNIES BUS ──
function renderCompagnies(){
  document.getElementById("content").innerHTML=\`
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">🏢 Compagnies de transport (\${COMPAGNIES_BUS.length})</div>
        <button class="btn btn-primary btn-small" onclick="ajouterCompagnie()">➕ Ajouter</button>
      </div>
      <table>
        <thead><tr><th>Compagnie</th><th>Trajets</th><th>Téléphone</th><th>Prix base</th><th>Statut</th><th>Actions</th></tr></thead>
        <tbody>\${COMPAGNIES_BUS.map(c=>\`<tr>
          <td><b>\${c.nom}</b></td>
          <td style="font-size:12px;color:var(--muted)">\${c.trajets}</td>
          <td>\${c.tel}</td>
          <td>\${c.prix_base>0?fmt(c.prix_base)+" F":"—"}</td>
          <td><span class="badge \${c.actif?"badge-green":"badge-red"}">\${c.actif?"✅ Actif":"❌ Inactif"}</span></td>
          <td><button class="btn btn-small \${c.actif?"btn-red":"btn-green"}" onclick="toggleCompagnie(\${c.id})">\${c.actif?"Désactiver":"Activer"}</button></td>
        </tr>\`).join("")}</tbody>
      </table>
    </div>\`;
}

function toggleCompagnie(id){
  const c=COMPAGNIES_BUS.find(x=>x.id===id);
  if(c){c.actif=!c.actif;renderCompagnies();toast((c.actif?"✅ ":"❌ ")+c.nom+(c.actif?" activée":" désactivée"),c.actif?"s":"e");}
}

function ajouterCompagnie(){
  document.getElementById("modal-box").innerHTML=\`
    <div class="modal-hdr"><div class="modal-title">🏢 Nouvelle compagnie</div><div class="modal-close" onclick="closeModal()">✕</div></div>
    <div class="form-group"><label class="form-label">Nom compagnie</label><input class="form-input" id="cn" placeholder="Ex: Mali Express"/></div>
    <div class="form-group"><label class="form-label">Trajets couverts</label><input class="form-input" id="ct" placeholder="Ex: Bamako-Ségou-Mopti"/></div>
    <div class="form-row">
      <div class="form-group" style="flex:1"><label class="form-label">Téléphone</label><input class="form-input" id="ctel" placeholder="+223 XX XXX XXX"/></div>
      <div class="form-group" style="flex:1"><label class="form-label">Prix de base (FCFA)</label><input class="form-input" id="cprix" type="number" placeholder="3500"/></div>
    </div>
    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="btn" style="background:var(--border)" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="creerCompagnie()">✅ Créer</button>
    </div>\`;
  openModal();
}

function creerCompagnie(){
  const n=document.getElementById("cn").value,t=document.getElementById("ct").value,
    tel=document.getElementById("ctel").value,prix=parseInt(document.getElementById("cprix").value)||0;
  if(!n||!t){toast("⚠️ Remplissez tous les champs","e");return;}
  COMPAGNIES_BUS.push({id:COMPAGNIES_BUS.length+1,nom:n,trajets:t,actif:true,tel,prix_base:prix});
  closeModal();renderCompagnies();toast("✅ "+n+" ajoutée !","s");
}

// ── TARIFS BUS ──
function renderTarifsbus(){
  document.getElementById("content").innerHTML=\`
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">💰 Tarifs bus par trajet</div>
        <button class="btn btn-primary btn-small" onclick="ajouterTarifBus()">➕ Nouveau tarif</button>
      </div>
      <table id="tarifs-bus-table">
        <thead><tr><th>Départ</th><th>Arrivée</th><th>Durée</th><th>Prix</th><th>Compagnie</th><th>Actions</th></tr></thead>
        <tbody>\${TARIFS_BUS.map((t,i)=>\`<tr>
          <td><b>\${t.de}</b></td>
          <td><b>\${t.vers}</b></td>
          <td>⏱️ \${t.duree}</td>
          <td><b style="color:var(--blue)">\${fmt(t.prix)} F</b></td>
          <td>\${t.compagnie}</td>
          <td style="display:flex;gap:4px">
            <button class="btn btn-small btn-primary" onclick="modifierTarifBus(\${i})">✏️</button>
            <button class="btn btn-small btn-red" onclick="supprimerTarifBus(\${i})">🗑️</button>
          </td>
        </tr>\`).join("")}</tbody>
      </table>
    </div>\`;
}

function ajouterTarifBus(){
  document.getElementById("modal-box").innerHTML=\`
    <div class="modal-hdr"><div class="modal-title">➕ Nouveau tarif bus</div><div class="modal-close" onclick="closeModal()">✕</div></div>
    <div class="form-row">
      <div class="form-group" style="flex:1"><label class="form-label">Départ</label>
        <select class="form-input" id="tde"><option>Bamako</option>\${REGIONS_MALI.map(r=>\`<option>\${r.nom}</option>\`).join("")}</select>
      </div>
      <div class="form-group" style="flex:1"><label class="form-label">Arrivée</label>
        <select class="form-input" id="tvers">\${REGIONS_MALI.map(r=>\`<option>\${r.nom}</option>\`).join("")}</select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" style="flex:1"><label class="form-label">Durée</label><input class="form-input" id="tduree" placeholder="Ex: 3h"/></div>
      <div class="form-group" style="flex:1"><label class="form-label">Prix (FCFA)</label><input class="form-input" id="tprix" type="number" placeholder="3500"/></div>
    </div>
    <div class="form-group"><label class="form-label">Compagnie</label>
      <select class="form-input" id="tcomp">\${COMPAGNIES_BUS.filter(c=>c.actif).map(c=>\`<option>\${c.nom}</option>\`).join("")}</select>
    </div>
    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="btn" style="background:var(--border)" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="creerTarifBus()">✅ Créer</button>
    </div>\`;
  openModal();
}

function creerTarifBus(){
  const de=document.getElementById("tde").value,vers=document.getElementById("tvers").value,
    duree=document.getElementById("tduree").value,prix=parseInt(document.getElementById("tprix").value)||0,
    comp=document.getElementById("tcomp").value;
  if(!duree||!prix){toast("⚠️ Remplissez tous les champs","e");return;}
  TARIFS_BUS.push({de,vers,duree,prix,compagnie:comp});
  closeModal();renderTarifsbus();toast("✅ Tarif ajouté !","s");
}

function supprimerTarifBus(i){
  if(confirm("Supprimer ce tarif ?")){ TARIFS_BUS.splice(i,1);renderTarifsbus();toast("🗑️ Tarif supprimé","e");}
}

function modifierTarifBus(i){
  const t=TARIFS_BUS[i];
  document.getElementById("modal-box").innerHTML=\`
    <div class="modal-hdr"><div class="modal-title">✏️ Modifier tarif</div><div class="modal-close" onclick="closeModal()">✕</div></div>
    <div class="form-group"><label class="form-label">Prix (FCFA)</label><input class="form-input" id="mtp" type="number" value="\${t.prix}"/></div>
    <div class="form-group"><label class="form-label">Durée</label><input class="form-input" id="mtd" value="\${t.duree}"/></div>
    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="btn" style="background:var(--border)" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="TARIFS_BUS[\${i}].prix=parseInt(document.getElementById('mtp').value)||TARIFS_BUS[\${i}].prix;TARIFS_BUS[\${i}].duree=document.getElementById('mtd').value;closeModal();renderTarifsbus();toast('✅ Tarif modifié','s')">✅ Sauver</button>
    </div>\`;
  openModal();
}

// ── PUBLICITÉS RÉGIONALES ──
function renderPubregion(){
  document.getElementById("content").innerHTML=\`
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-icon">📢</div><div class="stat-val">\${PUBS_REGIONS.length}</div><div class="stat-lbl">Total partenaires</div></div>
      <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-val">\${PUBS_REGIONS.filter(p=>p.actif).length}</div><div class="stat-lbl">Actifs</div></div>
      <div class="stat-card"><div class="stat-icon">🗺️</div><div class="stat-val">\${[...new Set(PUBS_REGIONS.map(p=>p.region))].length}</div><div class="stat-lbl">Régions couvertes</div></div>
      <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-val">\${fmt(PUBS_REGIONS.filter(p=>p.actif).length*25000)}</div><div class="stat-lbl">Revenus pub (FCFA)</div></div>
    </div>
    <div class="table-wrap">
      <div class="table-hdr">
        <div class="table-title">📢 Partenaires par région</div>
        <button class="btn btn-primary btn-small" onclick="ajouterPubRegion()">➕ Nouveau partenaire</button>
      </div>
      <table>
        <thead><tr><th>Région</th><th>Partenaire</th><th>Catégorie</th><th>Contact</th><th>Statut</th><th>Actions</th></tr></thead>
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
        </tr>\`).join("")}</tbody>
      </table>
    </div>
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">🗺️ Couverture par région</div></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px">
        \${REGIONS_MALI.map(r=>{
          const pubs=PUBS_REGIONS.filter(p=>p.region===r.id&&p.actif);
          return \`<div style="background:\${pubs.length>0?"#eff6ff":"#f8fafc"};border-radius:10px;padding:12px;border:1px solid \${pubs.length>0?"#3b82f6":"#e2e8f0"}">
            <div style="font-size:20px">\${r.emoji}</div>
            <div style="font-weight:700;font-size:13px;margin-top:4px">\${r.nom}</div>
            <div style="font-size:11px;color:var(--muted);margin-top:2px">\${pubs.length>0?pubs.length+" partenaire"+(pubs.length>1?"s":""):"Aucun partenaire"}</div>
            <button class="btn btn-primary btn-small" style="margin-top:8px;width:100%" onclick="ajouterPubPourRegion('\${r.id}','\${r.nom}')">➕</button>
          </div>\`;
        }).join("")}
      </div>
    </div>\`;
}

function togglePubRegion(id){
  const p=PUBS_REGIONS.find(x=>x.id===id);
  if(p){p.actif=!p.actif;renderPubregion();toast((p.actif?"✅ ":"❌ ")+p.partenaire+(p.actif?" activé":" désactivé"),p.actif?"s":"e");}
}

function supprimerPubRegion(id){
  const p=PUBS_REGIONS.find(x=>x.id===id);
  if(confirm("Supprimer "+p.partenaire+" ?")){PUBS_REGIONS.splice(PUBS_REGIONS.indexOf(p),1);renderPubregion();toast("🗑️ Partenaire supprimé","e");}
}

function ajouterPubRegion(){ajouterPubPourRegion("","");}

function ajouterPubPourRegion(regionId,regionNom){
  document.getElementById("modal-box").innerHTML=\`
    <div class="modal-hdr"><div class="modal-title">➕ Nouveau partenaire</div><div class="modal-close" onclick="closeModal()">✕</div></div>
    <div class="form-group"><label class="form-label">Région</label>
      <select class="form-input" id="pr">\${REGIONS_MALI.map(r=>\`<option value="\${r.id}" \${r.id===regionId?"selected":""}>\${r.emoji} \${r.nom}</option>\`).join("")}</select>
    </div>
    <div class="form-group"><label class="form-label">Nom du partenaire</label><input class="form-input" id="pp" placeholder="Ex: Hôtel du Fleuve"/></div>
    <div class="form-row">
      <div class="form-group" style="flex:1"><label class="form-label">Catégorie</label>
        <select class="form-input" id="pc2">
          <option>Hôtel</option><option>Immobilier</option><option>Construction</option>
          <option>Électronique</option><option>Beauté</option><option>Événements</option>
          <option>Shopping</option><option>Tourisme</option><option>Agriculture</option><option>Autre</option>
        </select>
      </div>
      <div class="form-group" style="flex:1"><label class="form-label">Contact (téléphone)</label><input class="form-input" id="ptel2" placeholder="7X XXX XXX"/></div>
    </div>
    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="btn" style="background:var(--border)" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="creerPubRegion()">✅ Ajouter</button>
    </div>\`;
  openModal();
}

function creerPubRegion(){
  const rId=document.getElementById("pr").value,
    rNom=REGIONS_MALI.find(x=>x.id===rId)?.nom||rId,
    nom=document.getElementById("pp").value,
    cat=document.getElementById("pc2").value,
    tel=document.getElementById("ptel2").value;
  if(!nom){toast("⚠️ Entrez le nom du partenaire","e");return;}
  PUBS_REGIONS.push({id:PUBS_REGIONS.length+1,region:rId,nom_region:rNom,partenaire:nom,cat,actif:true,contact:tel||"—"});
  closeModal();renderPubregion();toast("✅ "+nom+" ajouté pour "+rNom+" !","s");
}

// ── MISE À JOUR NAVIGATION ──
const _goOld2 = go;
go = function(p){
  const fns = {
    bus: renderBus,
    compagnies: renderCompagnies,
    tarifsbus: renderTarifsbus,
    pubregion: renderPubregion,
  };
  if(fns[p]){
    document.querySelectorAll(".sb-item").forEach(e=>e.classList.remove("active"));
    const si=document.getElementById("si-"+p);if(si)si.classList.add("active");
    const titles={
      bus:"🚌 Réservations Bus",
      compagnies:"🏢 Compagnies Bus",
      tarifsbus:"💰 Tarifs Bus",
      pubregion:"📢 Publicités Régionales",
    };
    if(titles[p]) document.getElementById("pg-ttl").textContent=titles[p];
    fns[p]();
  } else {
    _goOld2(p);
  }
};
`;

h = h.replace('</script>\n</body>', newJS + '\n</script>\n</body>');
fs.writeFileSync('malitaxi-admin-new.html', h, 'utf8');
console.log('OK taille:', h.length);
