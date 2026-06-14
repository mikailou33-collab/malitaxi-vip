const fs = require('fs');
let h = fs.readFileSync('malitaxi-vip-final-12.html', 'utf8');

// Ajouter le module livraison complet avant </script>
const livraisonCode = `

// ══════════════════════════════════════
// MODULE LIVRAISON COMPLET
// ══════════════════════════════════════

function openLivraison(){
  const overlay = document.createElement('div');
  overlay.id = 'livraison-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:900;display:flex;align-items:flex-end;justify-content:center';
  overlay.innerHTML = \`
    <div style="background:#1A1A2E;border-radius:20px 20px 0 0;padding:20px;width:100%;max-width:420px;max-height:90vh;overflow-y:auto">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <div style="font-size:18px;font-weight:900;color:#F5A623">📦 Commander une livraison</div>
        <button onclick="document.getElementById('livraison-overlay').remove()" style="background:rgba(255,255,255,.1);border:none;color:#fff;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer">✕</button>
      </div>

      <!-- TYPE COLIS -->
      <div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:8px;text-transform:uppercase">Type de colis</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px" id="type-colis-grid">
          \${[
            {id:"doc",ico:"📄",label:"Document"},
            {id:"vetement",ico:"👕",label:"Vêtement"},
            {id:"nourriture",ico:"🍱",label:"Nourriture"},
            {id:"electronique",ico:"📱",label:"Électro"},
            {id:"medicament",ico:"💊",label:"Médic."},
            {id:"courses",ico:"🛒",label:"Courses"},
            {id:"cadeau",ico:"🎁",label:"Cadeau"},
            {id:"autre",ico:"📦",label:"Autre"},
          ].map(t=>\`
            <button onclick="selectTypeColis(this,'\${t.id}')" style="background:rgba(255,255,255,.08);border:2px solid transparent;border-radius:12px;padding:10px 4px;color:#fff;cursor:pointer;font-family:inherit;transition:.2s" data-type="\${t.id}">
              <div style="font-size:22px">\${t.ico}</div>
              <div style="font-size:10px;font-weight:700;margin-top:4px">\${t.label}</div>
            </button>
          \`).join("")}
        </div>
      </div>

      <!-- DESCRIPTION -->
      <div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:6px;text-transform:uppercase">Description du colis</div>
        <input id="colis-desc" placeholder="Ex: Sac de vêtements, carton de médicaments..." 
          style="width:100%;padding:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:12px;color:#fff;font-size:14px;font-family:inherit;outline:none"/>
      </div>

      <!-- POIDS -->
      <div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:8px;text-transform:uppercase">Poids estimé</div>
        <div style="display:flex;gap:8px">
          \${[
            {id:"leger",label:"< 1 kg",ico:"🪶"},
            {id:"moyen",label:"1-5 kg",ico:"📦"},
            {id:"lourd",label:"5-15 kg",ico:"🏋️"},
            {id:"tres_lourd",label:"> 15 kg",ico:"🚛"},
          ].map(p=>\`
            <button onclick="selectPoids(this,'\${p.id}')" style="flex:1;background:rgba(255,255,255,.08);border:2px solid transparent;border-radius:12px;padding:10px 4px;color:#fff;cursor:pointer;font-family:inherit" data-poids="\${p.id}">
              <div style="font-size:18px">\${p.ico}</div>
              <div style="font-size:10px;font-weight:700;margin-top:4px">\${p.label}</div>
            </button>
          \`).join("")}
        </div>
      </div>

      <!-- ADRESSES -->
      <div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:6px;text-transform:uppercase">📍 Adresse de ramassage</div>
        <input id="liv-depart" placeholder="Où prendre le colis ?" 
          style="width:100%;padding:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:12px;color:#fff;font-size:14px;font-family:inherit;outline:none;margin-bottom:8px"/>
        <div style="font-size:12px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:6px;text-transform:uppercase">🏁 Adresse de livraison</div>
        <input id="liv-arrivee" placeholder="Où livrer le colis ?" 
          style="width:100%;padding:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:12px;color:#fff;font-size:14px;font-family:inherit;outline:none"/>
      </div>

      <!-- DESTINATAIRE -->
      <div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:6px;text-transform:uppercase">👤 Destinataire</div>
        <input id="liv-nom" placeholder="Nom du destinataire" 
          style="width:100%;padding:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:12px;color:#fff;font-size:14px;font-family:inherit;outline:none;margin-bottom:8px"/>
        <input id="liv-tel" placeholder="Téléphone destinataire (+223...)" type="tel"
          style="width:100%;padding:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:12px;color:#fff;font-size:14px;font-family:inherit;outline:none"/>
      </div>

      <!-- PAIEMENT -->
      <div style="margin-bottom:16px">
        <div style="font-size:12px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:8px;text-transform:uppercase">💳 Paiement</div>
        <div style="display:flex;gap:8px">
          \${[
            {id:"orange",ico:"🟠",label:"Orange Money"},
            {id:"wave",ico:"🔵",label:"Wave"},
            {id:"moov",ico:"🟡",label:"Moov"},
            {id:"cash",ico:"💵",label:"Cash"},
          ].map(p=>\`
            <button onclick="selectPayLiv(this,'\${p.id}')" style="flex:1;background:rgba(255,255,255,.08);border:2px solid transparent;border-radius:12px;padding:10px 4px;color:#fff;cursor:pointer;font-family:inherit" data-pay="\${p.id}">
              <div style="font-size:18px">\${p.ico}</div>
              <div style="font-size:9px;font-weight:700;margin-top:4px">\${p.label}</div>
            </button>
          \`).join("")}
        </div>
      </div>

      <!-- PRIX ESTIMÉ -->
      <div id="liv-prix-box" style="background:rgba(245,166,35,.15);border:1px solid rgba(245,166,35,.3);border-radius:12px;padding:14px;margin-bottom:16px;text-align:center;display:none">
        <div style="font-size:12px;color:rgba(255,255,255,.6)">Prix estimé</div>
        <div id="liv-prix-val" style="font-size:24px;font-weight:900;color:#F5A623">— FCFA</div>
        <div style="font-size:11px;color:rgba(255,255,255,.4);margin-top:4px">Prix final confirmé par le livreur</div>
      </div>

      <!-- BOUTON COMMANDER -->
      <button onclick="confirmerLivraison()" 
        style="width:100%;padding:16px;background:linear-gradient(135deg,#F5A623,#e8920f);border:none;border-radius:14px;color:#fff;font-size:16px;font-weight:900;cursor:pointer;font-family:inherit">
        📦 Commander la livraison
      </button>
    </div>
  \`;
  document.body.appendChild(overlay);
}

let livraisonData = {type:"", poids:"", paiement:""};

function selectTypeColis(btn, type){
  document.querySelectorAll('[data-type]').forEach(b=>{
    b.style.borderColor='transparent';
    b.style.background='rgba(255,255,255,.08)';
  });
  btn.style.borderColor='#F5A623';
  btn.style.background='rgba(245,166,35,.2)';
  livraisonData.type = type;
  calculerPrixLiv();
}

function selectPoids(btn, poids){
  document.querySelectorAll('[data-poids]').forEach(b=>{
    b.style.borderColor='transparent';
    b.style.background='rgba(255,255,255,.08)';
  });
  btn.style.borderColor='#F5A623';
  btn.style.background='rgba(245,166,35,.2)';
  livraisonData.poids = poids;
  calculerPrixLiv();
}

function selectPayLiv(btn, pay){
  document.querySelectorAll('[data-pay]').forEach(b=>{
    b.style.borderColor='transparent';
    b.style.background='rgba(255,255,255,.08)';
  });
  btn.style.borderColor='#F5A623';
  btn.style.background='rgba(245,166,35,.2)';
  livraisonData.paiement = pay;
}

function calculerPrixLiv(){
  if(!livraisonData.type || !livraisonData.poids) return;
  const prix = {
    leger: 800, moyen: 1200, lourd: 2000, tres_lourd: 3500
  }[livraisonData.poids] || 1000;
  const box = document.getElementById('liv-prix-box');
  const val = document.getElementById('liv-prix-val');
  if(box) box.style.display = 'block';
  if(val) val.textContent = prix.toLocaleString('fr-FR') + ' FCFA';
  livraisonData.prix = prix;
}

function confirmerLivraison(){
  const desc = document.getElementById('colis-desc')?.value;
  const depart = document.getElementById('liv-depart')?.value;
  const arrivee = document.getElementById('liv-arrivee')?.value;
  const nom = document.getElementById('liv-nom')?.value;
  const tel = document.getElementById('liv-tel')?.value;

  if(!livraisonData.type){
    alert('⚠️ Choisissez le type de colis !'); return;
  }
  if(!depart || !arrivee){
    alert('⚠️ Entrez les adresses de départ et d\\'arrivée !'); return;
  }
  if(!nom || !tel){
    alert('⚠️ Entrez les infos du destinataire !'); return;
  }
  if(!livraisonData.paiement){
    alert('⚠️ Choisissez un mode de paiement !'); return;
  }

  // Fermer le formulaire
  document.getElementById('livraison-overlay')?.remove();

  // Afficher confirmation
  const code = 'LIV-' + Math.random().toString(36).slice(2,8).toUpperCase();
  const prix = livraisonData.prix || 1200;
  
  const confDiv = document.createElement('div');
  confDiv.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:900;display:flex;align-items:center;justify-content:center;padding:20px';
  confDiv.innerHTML = \`
    <div style="background:#1A1A2E;border-radius:20px;padding:28px;width:100%;max-width:380px;text-align:center;border:2px solid #F5A623">
      <div style="font-size:52px;margin-bottom:12px">📦</div>
      <div style="font-size:20px;font-weight:900;color:#F5A623;margin-bottom:6px">Livraison commandée !</div>
      <div style="background:rgba(245,166,35,.1);border-radius:10px;padding:12px;margin:14px 0;font-size:13px">
        <div style="color:rgba(255,255,255,.6)">Code de suivi</div>
        <div style="font-size:22px;font-weight:900;color:#fff;letter-spacing:2px">\${code}</div>
      </div>
      <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:6px">📍 \${depart} → \${arrivee}</div>
      <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:6px">👤 Pour : \${nom} (\${tel})</div>
      <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:16px">💰 \${prix.toLocaleString('fr-FR')} FCFA</div>
      <div style="background:rgba(5,150,105,.15);border-radius:10px;padding:10px;margin-bottom:16px;font-size:12px;color:#6ee7b7">
        🏍️ Un livreur arrive dans ~10 minutes
      </div>
      <div style="display:flex;gap:10px">
        <button onclick="this.parentNode.parentNode.parentNode.remove()" 
          style="flex:1;padding:14px;background:rgba(255,255,255,.1);border:none;border-radius:12px;color:#fff;font-weight:700;cursor:pointer;font-family:inherit">
          ✕ Fermer
        </button>
        <button onclick="envoyerWhatsAppLiv('\${code}','\${nom}','\${tel}','\${depart}','\${arrivee}',\${prix})"
          style="flex:1;padding:14px;background:linear-gradient(135deg,#25D366,#128C7E);border:none;border-radius:12px;color:#fff;font-weight:700;cursor:pointer;font-family:inherit">
          📱 WhatsApp
        </button>
      </div>
    </div>
  \`;
  document.body.appendChild(confDiv);

  // Notification WhatsApp automatique
  setTimeout(()=>{
    envoyerWhatsAppLiv(code, nom, tel, depart, arrivee, prix);
  }, 500);
}

function envoyerWhatsAppLiv(code, nom, destinataire, depart, arrivee, prix){
  const msg = encodeURIComponent(
    '📦 MaliTaxi Livraison\\n' +
    '━━━━━━━━━━━━━━━━━\\n' +
    '🆔 Code: ' + code + '\\n' +
    '📍 Départ: ' + depart + '\\n' +
    '🏁 Arrivée: ' + arrivee + '\\n' +
    '👤 Pour: ' + nom + '\\n' +
    '💰 Prix: ' + prix.toLocaleString('fr-FR') + ' FCFA\\n' +
    '━━━━━━━━━━━━━━━━━\\n' +
    '🏍️ Livreur en route !'
  );
  window.open('https://wa.me/+22396551630019?text=' + msg, '_blank');
}
`;

// Insérer avant le dernier </script>
const lastScript = h.lastIndexOf('</script>');
h = h.slice(0, lastScript) + livraisonCode + '\n' + h.slice(lastScript);

// Modifier setSvc pour ouvrir le module livraison
h = h.replace(
  "if((id===\"taxi\"||id===\"moto\"||id===\"livraison\") && clientDansBamako===false){",
  "if(id===\"livraison\" && clientDansBamako!==false){ openLivraison(); return; }\n  if((id===\"taxi\"||id===\"moto\") && clientDansBamako===false){"
);

fs.writeFileSync('malitaxi-vip-final-13.html', h, 'utf8');
console.log('OK taille:', h.length);
