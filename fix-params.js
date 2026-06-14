const fs = require('fs');
let h = fs.readFileSync('malitaxi-admin-new.html', 'utf8');

// Remplacer renderParams par une version interactive complète
const oldParams = `// ── 16. PARAMÈTRES ──
function renderParams(){
  document.getElementById("content").innerHTML=\`
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">⚙️ Configuration</div></div>
      \${[["🏷️ App","MaliTaxi VIP"],["📱 Version","1.0.0"],["🌍 Pays","Mali 🇲🇱"],["💱 Devise","FCFA"],["💰 Commission MaliTaxi","15%"],["🤝 IBI Groupe","5%"],["🚗 Chauffeur","80%"],["⭐ Note minimum","3.5/5"]].map(([k,v])=>\`
        <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border)"><span style="color:var(--muted)">\${k}</span><b>\${v}</b></div>
      \`).join("")}
    </div>
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">📋 Journal d'activités</div></div>
      \${ACTIVITY_LOG.length===0?'<div style="text-align:center;padding:20px;color:var(--muted)">Aucune activité</div>':
      \`<table><thead><tr><th>Date</th><th>Heure</th><th>Utilisateur</th><th>Action</th></tr></thead><tbody>
      \${ACTIVITY_LOG.map(l=>\`<tr><td>\${l.date}</td><td>\${l.time}</td><td>\${l.user}</td><td>\${l.action} — \${l.detail}</td></tr>\`).join("")}
      </tbody></table>\`}
    </div>
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">📱 Applications</div></div>
      <div style="display:flex;flex-direction:column;gap:8px">
        \${[["👑","MaliTaxi VIP Client","malitaxi-vip-final-12.html"],["🚕","MaliTaxi Lite","malitaxi-lite-18.html"],["🚗","Chauffeur Pro","chauffeur-vip-pro-20.html"],["🚕","Chauffeur Lite","chauffeur-lite-7.html"]].map(([ico,nom,fichier])=>\`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--bg);border-radius:10px">
            <span>\${ico} \${nom}</span>
            <a href="https://mikailou33-collab.github.io/malitaxi-vip/\${fichier}" target="_blank" class="btn btn-primary btn-small">Ouvrir</a>
          </div>
        \`).join("")}
      </div>
    </div>\`;
}`;

const newParams = `// ── PARAMÈTRES GLOBAUX ──
let APP_CONFIG = {
  nom: "MaliTaxi VIP",
  version: "1.0.0",
  pays: "Mali 🇲🇱",
  devise: "FCFA",
  note_min: "3.5",
  whatsapp: "96551630019",
};

let COMMISSIONS = {
  chauffeur: 80,
  malitaxi: 15,
  partenaire: 5,
};

let PARTENAIRES_CONFIG = [
  {id:1, nom:"IBI Groupe", type:"Partenaire véhicules", pct:5, contact:"+223 XX XXX XXX", actif:true},
  {id:2, nom:"MaliTaxi", type:"Plateforme", pct:15, contact:"mikailou33@gmail.com", actif:true},
];

// ── 16. PARAMÈTRES ──
function renderParams(){
  const total = COMMISSIONS.chauffeur + COMMISSIONS.malitaxi + COMMISSIONS.partenaire;
  document.getElementById("content").innerHTML=\`
    <!-- COMMISSIONS -->
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">💰 Commissions & Partage des revenus</div>
        <button class="btn btn-primary btn-small" onclick="sauverCommissions()">💾 Sauvegarder</button>
      </div>
      <div style="background:\${total===100?"#dcfce7":"#fee2e2"};padding:10px 16px;border-radius:10px;margin-bottom:16px;font-size:13px;font-weight:700;color:\${total===100?"#16a34a":"#dc2626"}">
        \${total===100?"✅ Total = 100% — Correct !":"⚠️ Total = "+total+"% — Doit être 100% !"}
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
        <div style="background:#eff6ff;border-radius:14px;padding:20px;text-align:center">
          <div style="font-size:32px">🚗</div>
          <div style="font-weight:900;font-size:15px;margin:8px 0">Chauffeur</div>
          <input type="number" id="pct-chauffeur" value="\${COMMISSIONS.chauffeur}" min="0" max="100"
            style="width:80px;text-align:center;font-size:24px;font-weight:900;color:var(--blue);border:2px solid var(--border);border-radius:10px;padding:6px;font-family:inherit"
            onchange="updateTotal()"/>
          <div style="font-size:12px;color:var(--muted);margin-top:4px">% des revenus</div>
        </div>
        <div style="background:#f0fdf4;border-radius:14px;padding:20px;text-align:center">
          <div style="font-size:32px">🏢</div>
          <div style="font-weight:900;font-size:15px;margin:8px 0">MaliTaxi</div>
          <input type="number" id="pct-malitaxi" value="\${COMMISSIONS.malitaxi}" min="0" max="100"
            style="width:80px;text-align:center;font-size:24px;font-weight:900;color:var(--green);border:2px solid var(--border);border-radius:10px;padding:6px;font-family:inherit"
            onchange="updateTotal()"/>
          <div style="font-size:12px;color:var(--muted);margin-top:4px">% des revenus</div>
        </div>
        <div style="background:#fefce8;border-radius:14px;padding:20px;text-align:center">
          <div style="font-size:32px">🤝</div>
          <div style="font-weight:900;font-size:15px;margin:8px 0">IBI Groupe</div>
          <input type="number" id="pct-partenaire" value="\${COMMISSIONS.partenaire}" min="0" max="100"
            style="width:80px;text-align:center;font-size:24px;font-weight:900;color:var(--gold);border:2px solid var(--border);border-radius:10px;padding:6px;font-family:inherit"
            onchange="updateTotal()"/>
          <div style="font-size:12px;color:var(--muted);margin-top:4px">% des revenus</div>
        </div>
      </div>
      <div id="total-check" style="margin-top:16px;text-align:center;font-size:14px;font-weight:700;color:var(--green)">
        ✅ Total : \${total}%
      </div>
    </div>

    <!-- PARTENAIRES -->
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">🤝 Partenaires</div>
        <button class="btn btn-primary btn-small" onclick="ajouterPartenaire()">➕ Nouveau</button>
      </div>
      <table>
        <thead><tr><th>Partenaire</th><th>Type</th><th>%</th><th>Contact</th><th>Statut</th><th>Actions</th></tr></thead>
        <tbody>\${PARTENAIRES_CONFIG.map(p=>\`<tr>
          <td><b>\${p.nom}</b></td>
          <td>\${p.type}</td>
          <td><b style="color:var(--gold)">\${p.pct}%</b></td>
          <td>\${p.contact}</td>
          <td><span class="badge \${p.actif?"badge-green":"badge-red"}">\${p.actif?"✅ Actif":"❌ Inactif"}</span></td>
          <td style="display:flex;gap:4px">
            <button class="btn btn-primary btn-small" onclick="modifierPartenaire(\${p.id})">✏️ Modifier</button>
            <button class="btn btn-small \${p.actif?"btn-red":"btn-green"}" onclick="togglePartenaire(\${p.id})">\${p.actif?"Désactiver":"Activer"}</button>
          </td>
        </tr>\`).join("")}</tbody>
      </table>
    </div>

    <!-- MON COMPTE -->
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">👤 Mon compte admin</div>
        <button class="btn btn-primary btn-small" onclick="sauverCompte()">💾 Sauvegarder</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="form-group"><label class="form-label">Nom affiché</label>
          <input class="form-input" id="admin-nom" value="\${currentAdmin?.nom||"Admin Principal"}"/>
        </div>
        <div class="form-group"><label class="form-label">Identifiant</label>
          <input class="form-input" id="admin-user" value="admin" readonly style="opacity:.6"/>
        </div>
        <div class="form-group"><label class="form-label">Nouveau mot de passe</label>
          <input class="form-input" id="admin-pass" type="password" placeholder="Laisser vide pour garder l'actuel"/>
        </div>
        <div class="form-group"><label class="form-label">Confirmer mot de passe</label>
          <input class="form-input" id="admin-pass2" type="password" placeholder="Confirmer nouveau mot de passe"/>
        </div>
      </div>
    </div>

    <!-- CONFIG APP -->
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">⚙️ Configuration application</div>
        <button class="btn btn-primary btn-small" onclick="sauverConfig()">💾 Sauvegarder</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="form-group"><label class="form-label">🏷️ Nom de l'app</label>
          <input class="form-input" id="cfg-nom" value="\${APP_CONFIG.nom}"/>
        </div>
        <div class="form-group"><label class="form-label">📱 Version</label>
          <input class="form-input" id="cfg-version" value="\${APP_CONFIG.version}"/>
        </div>
        <div class="form-group"><label class="form-label">💱 Devise</label>
          <input class="form-input" id="cfg-devise" value="\${APP_CONFIG.devise}"/>
        </div>
        <div class="form-group"><label class="form-label">⭐ Note minimum chauffeur</label>
          <input class="form-input" id="cfg-note" value="\${APP_CONFIG.note_min}" type="number" step="0.1" min="1" max="5"/>
        </div>
        <div class="form-group"><label class="form-label">📱 WhatsApp admin</label>
          <input class="form-input" id="cfg-wa" value="\${APP_CONFIG.whatsapp}"/>
        </div>
      </div>
    </div>

    <!-- APPLICATIONS -->
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">📱 Applications MaliTaxi</div></div>
      <div style="display:flex;flex-direction:column;gap:8px">
        \${[
          ["👑","MaliTaxi VIP Client","malitaxi-vip-final-12.html","#1E40AF"],
          ["🚕","MaliTaxi Lite","malitaxi-lite-18.html","#059669"],
          ["🚗","Chauffeur Pro","chauffeur-vip-pro-20.html","#D97706"],
          ["🚕","Chauffeur Lite","chauffeur-lite-7.html","#7C3AED"],
          ["🇲🇱","Mali Nav","../mali-nav/","#DC2626"]
        ].map(([ico,nom,url,col])=>\`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--bg);border-radius:10px;border-left:4px solid \${col}">
            <span style="font-weight:700">\${ico} \${nom}</span>
            <a href="https://mikailou33-collab.github.io/malitaxi-vip/\${url}" target="_blank" class="btn btn-primary btn-small" style="background:\${col}">Ouvrir</a>
          </div>
        \`).join("")}
      </div>
    </div>

    <!-- JOURNAL -->
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">📋 Journal d'activités</div>
        <button class="btn btn-red btn-small" onclick="ACTIVITY_LOG=[];renderParams();toast('🗑️ Journal effacé','e')">🗑️ Effacer</button>
      </div>
      \${ACTIVITY_LOG.length===0?'<div style="text-align:center;padding:20px;color:var(--muted)">Aucune activité enregistrée</div>':
      \`<table><thead><tr><th>Date</th><th>Heure</th><th>Utilisateur</th><th>Action</th></tr></thead><tbody>
      \${ACTIVITY_LOG.map(l=>\`<tr><td>\${l.date}</td><td>\${l.time}</td><td>\${l.user}</td><td>\${l.action} — \${l.detail}</td></tr>\`).join("")}
      </tbody></table>\`}
    </div>\`;
}

function updateTotal(){
  const c=parseInt(document.getElementById("pct-chauffeur")?.value)||0;
  const m=parseInt(document.getElementById("pct-malitaxi")?.value)||0;
  const p=parseInt(document.getElementById("pct-partenaire")?.value)||0;
  const total=c+m+p;
  const el=document.getElementById("total-check");
  if(el){
    el.textContent=(total===100?"✅":"⚠️")+" Total : "+total+"%";
    el.style.color=total===100?"var(--green)":"var(--red)";
  }
}

function sauverCommissions(){
  const c=parseInt(document.getElementById("pct-chauffeur")?.value)||0;
  const m=parseInt(document.getElementById("pct-malitaxi")?.value)||0;
  const p=parseInt(document.getElementById("pct-partenaire")?.value)||0;
  if(c+m+p!==100){toast("⚠️ Le total doit être 100% ! Actuellement "+(c+m+p)+"%","e");return;}
  COMMISSIONS.chauffeur=c;COMMISSIONS.malitaxi=m;COMMISSIONS.partenaire=p;
  logActivity("Paramètres","💰 Commissions modifiées: "+c+"/"+m+"/"+p+"%");
  toast("✅ Commissions sauvegardées !","s");
}

function sauverCompte(){
  const nom=document.getElementById("admin-nom")?.value;
  const pass=document.getElementById("admin-pass")?.value;
  const pass2=document.getElementById("admin-pass2")?.value;
  if(pass&&pass!==pass2){toast("⚠️ Les mots de passe ne correspondent pas !","e");return;}
  if(nom&&currentAdmin){
    currentAdmin.nom=nom;
    document.getElementById("sb-name").textContent=nom;
    document.getElementById("sb-av").textContent=nom[0];
  }
  if(pass){
    ADMIN_ACCOUNTS.admin.pass=pass;
    logActivity("Paramètres","🔑 Mot de passe modifié");
  }
  toast("✅ Compte mis à jour !","s");
}

function sauverConfig(){
  APP_CONFIG.nom=document.getElementById("cfg-nom")?.value||APP_CONFIG.nom;
  APP_CONFIG.version=document.getElementById("cfg-version")?.value||APP_CONFIG.version;
  APP_CONFIG.devise=document.getElementById("cfg-devise")?.value||APP_CONFIG.devise;
  APP_CONFIG.note_min=document.getElementById("cfg-note")?.value||APP_CONFIG.note_min;
  APP_CONFIG.whatsapp=document.getElementById("cfg-wa")?.value||APP_CONFIG.whatsapp;
  logActivity("Paramètres","⚙️ Configuration mise à jour");
  toast("✅ Configuration sauvegardée !","s");
}

function ajouterPartenaire(){
  document.getElementById("modal-box").innerHTML=\`
    <div class="modal-hdr"><div class="modal-title">🤝 Nouveau partenaire</div><div class="modal-close" onclick="closeModal()">✕</div></div>
    <div class="form-group"><label class="form-label">Nom partenaire</label><input class="form-input" id="pn" placeholder="Ex: IBI Groupe"/></div>
    <div class="form-group"><label class="form-label">Type</label><input class="form-input" id="pt2" placeholder="Ex: Partenaire véhicules"/></div>
    <div class="form-row">
      <div class="form-group" style="flex:1"><label class="form-label">Pourcentage (%)</label><input class="form-input" id="pp2" type="number" placeholder="5" min="0" max="100"/></div>
      <div class="form-group" style="flex:1"><label class="form-label">Contact</label><input class="form-input" id="pct2" placeholder="+223 XX XXX XXX"/></div>
    </div>
    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="btn" style="background:var(--border)" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="creerPartenaire()">✅ Ajouter</button>
    </div>\`;
  openModal();
}

function creerPartenaire(){
  const n=document.getElementById("pn").value,t=document.getElementById("pt2").value,
    p=parseInt(document.getElementById("pp2").value)||0,c=document.getElementById("pct2").value;
  if(!n){toast("⚠️ Entrez le nom","e");return;}
  PARTENAIRES_CONFIG.push({id:PARTENAIRES_CONFIG.length+1,nom:n,type:t,pct:p,contact:c||"—",actif:true});
  closeModal();renderParams();toast("✅ "+n+" ajouté !","s");
}

function modifierPartenaire(id){
  const p=PARTENAIRES_CONFIG.find(x=>x.id===id);
  if(!p) return;
  document.getElementById("modal-box").innerHTML=\`
    <div class="modal-hdr"><div class="modal-title">✏️ Modifier \${p.nom}</div><div class="modal-close" onclick="closeModal()">✕</div></div>
    <div class="form-group"><label class="form-label">Nom</label><input class="form-input" id="mn2" value="\${p.nom}"/></div>
    <div class="form-group"><label class="form-label">Type</label><input class="form-input" id="mt2" value="\${p.type}"/></div>
    <div class="form-row">
      <div class="form-group" style="flex:1"><label class="form-label">Pourcentage (%)</label><input class="form-input" id="mp2" type="number" value="\${p.pct}"/></div>
      <div class="form-group" style="flex:1"><label class="form-label">Contact</label><input class="form-input" id="mc2" value="\${p.contact}"/></div>
    </div>
    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="btn" style="background:var(--border)" onclick="closeModal()">Annuler</button>
      <button class="btn btn-primary" onclick="sauverPartenaire(\${id})">✅ Sauvegarder</button>
    </div>\`;
  openModal();
}

function sauverPartenaire(id){
  const p=PARTENAIRES_CONFIG.find(x=>x.id===id);
  if(p){
    p.nom=document.getElementById("mn2").value||p.nom;
    p.type=document.getElementById("mt2").value||p.type;
    p.pct=parseInt(document.getElementById("mp2").value)||p.pct;
    p.contact=document.getElementById("mc2").value||p.contact;
    closeModal();renderParams();toast("✅ "+p.nom+" modifié !","s");
  }
}

function togglePartenaire(id){
  const p=PARTENAIRES_CONFIG.find(x=>x.id===id);
  if(p){p.actif=!p.actif;renderParams();toast((p.actif?"✅ ":"❌ ")+p.nom+(p.actif?" activé":" désactivé"),p.actif?"s":"e");}
}`;

h = h.replace(oldParams, newParams);

fs.writeFileSync('malitaxi-admin-new.html', h, 'utf8');
console.log('OK taille:', h.length);
