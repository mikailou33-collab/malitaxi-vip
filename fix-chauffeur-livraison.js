const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-21.html', 'utf8');

// Ajouter Firebase + système livraison avant </body>
const code = `
<!-- Firebase pour livraisons -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
<script>
window.addEventListener('load', function(){
  if(!firebase.apps.length){
    firebase.initializeApp({
      apiKey:"AIzaSyDdM8PcwhNnfCjaLmqwV5gLgLe9UUsgnZU",
      databaseURL:"https://malitaxi-default-rtdb.firebaseio.com",
      projectId:"malitaxi"
    });
  }
  window.dbCh = firebase.database();
  
  // Écouter les nouvelles livraisons
  window.dbCh.ref('livraisons').orderByChild('statut').equalTo('en_attente').on('value', function(snap){
    var data = snap.val();
    if(!data) return;
    Object.keys(data).forEach(function(key){
      var liv = data[key];
      // Afficher notification livraison
      if(!document.getElementById('notif-'+key)){
        afficherNotifLivraison(key, liv);
      }
    });
  });
});

function afficherNotifLivraison(key, liv){
  var notif = document.createElement('div');
  notif.id = 'notif-'+key;
  notif.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);width:90%;max-width:380px;background:#1A1A2E;border:2px solid #F5A623;border-radius:16px;padding:16px;z-index:500;box-shadow:0 8px 32px rgba(0,0,0,.5)';
  notif.innerHTML = 
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">'
    +'<div style="font-size:32px">📦</div>'
    +'<div>'
    +'<div style="font-size:15px;font-weight:900;color:#F5A623">Nouvelle livraison !</div>'
    +'<div style="font-size:12px;color:rgba(255,255,255,.7)">'+liv.depart+' → '+liv.arrivee+'</div>'
    +'</div></div>'
    +'<div style="background:rgba(245,166,35,.1);border-radius:10px;padding:10px;margin-bottom:12px;font-size:12px;color:rgba(255,255,255,.8)">'
    +'👤 '+liv.destinataire+' · 📱 '+liv.tel+'<br>'
    +'💰 '+liv.prix.toLocaleString("fr-FR")+' FCFA · 📦 '+liv.type
    +'</div>'
    +'<div style="display:flex;gap:8px">'
    +'<button onclick="refuserLivraison(\''+key+'\')" style="flex:1;padding:12px;background:rgba(220,38,38,.2);border:1px solid rgba(220,38,38,.4);border-radius:10px;color:#f87171;font-weight:800;cursor:pointer;font-family:inherit;font-size:14px">❌ Refuser</button>'
    +'<button onclick="accepterLivraison(\''+key+'\',\''+liv.codeConfirmation+'\')" style="flex:1;padding:12px;background:linear-gradient(135deg,#059669,#10b981);border:none;border-radius:10px;color:#fff;font-weight:800;cursor:pointer;font-family:inherit;font-size:14px">✅ Accepter</button>'
    +'</div>';
  document.body.appendChild(notif);
  
  // Timer 30 secondes
  var t = 30;
  var iv = setInterval(function(){
    t--;
    if(t<=0){
      clearInterval(iv);
      notif.remove();
    }
  }, 1000);
}

function accepterLivraison(key, codeConfirm){
  document.getElementById('notif-'+key)?.remove();
  // Mettre à jour statut dans Firebase
  if(window.dbCh){
    window.dbCh.ref('livraisons/'+key).update({statut:'acceptee', chauffeur:'Chauffeur Pro'});
  }
  // Afficher panel suivi livraison
  afficherSuiviLivraison(key, codeConfirm);
}

function refuserLivraison(key){
  document.getElementById('notif-'+key)?.remove();
  if(window.dbCh){
    window.dbCh.ref('livraisons/'+key).update({statut:'refusee'});
  }
  showToast('❌ Livraison refusée');
}

function afficherSuiviLivraison(key, codeConfirm){
  var panel = document.createElement('div');
  panel.id = 'suivi-'+key;
  panel.style.cssText = 'position:fixed;inset:0;background:#0F0F1A;z-index:400;overflow-y:auto;font-family:inherit;padding:20px';
  panel.innerHTML = 
    '<div style="max-width:420px;margin:0 auto">'
    +'<h2 style="color:#F5A623;margin-bottom:16px">📦 Livraison en cours</h2>'
    +'<div style="background:#1A1A2E;border-radius:14px;padding:16px;margin-bottom:12px;border:1px solid rgba(255,255,255,.1)">'
    +'<div style="font-size:13px;color:rgba(255,255,255,.6);margin-bottom:4px">Code de suivi</div>'
    +'<div style="font-size:18px;font-weight:900;color:#fff">'+key+'</div>'
    +'</div>'
    +'<div style="display:grid;gap:10px;margin-bottom:16px">'
    +'<button onclick="confirmerRecuperation(\''+key+'\')" id="btn-recup-'+key+'" style="width:100%;padding:14px;background:linear-gradient(135deg,#2563eb,#3b82f6);border:none;border-radius:12px;color:#fff;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit">📦 Confirmer récupération colis</button>'
    +'<div id="code-section-'+key+'" style="display:none;background:rgba(5,150,105,.15);border:1px solid rgba(5,150,105,.3);border-radius:12px;padding:14px">'
    +'<div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:8px">🔐 Demandez le code au destinataire :</div>'
    +'<input id="code-input-'+key+'" placeholder="Entrez le code 4 chiffres" maxlength="4" style="width:100%;padding:12px;background:rgba(255,255,255,.1);border:2px solid rgba(245,166,35,.5);border-radius:10px;color:#fff;font-size:20px;font-weight:900;text-align:center;font-family:inherit;outline:none;letter-spacing:8px" type="number"/>'
    +'<button onclick="confirmerLivraisonFinale(\''+key+'\',\''+codeConfirm+'\')" style="width:100%;padding:12px;background:linear-gradient(135deg,#059669,#10b981);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit;margin-top:10px">✅ Valider le code</button>'
    +'</div>'
    +'</div>'
    +'<button onclick="document.getElementById(\'suivi-'+key+'\').remove()" style="width:100%;padding:12px;background:rgba(255,255,255,.1);border:none;border-radius:10px;color:#fff;font-size:13px;cursor:pointer;font-family:inherit">← Retour</button>'
    +'</div>';
  document.body.appendChild(panel);
}

function confirmerRecuperation(key){
  var btn = document.getElementById('btn-recup-'+key);
  if(btn) btn.style.background = 'linear-gradient(135deg,#059669,#10b981)';
  if(btn) btn.textContent = '✅ Colis récupéré !';
  if(btn) btn.disabled = true;
  
  if(window.dbCh){
    window.dbCh.ref('livraisons/'+key).update({statut:'en_route', recupere:new Date().toISOString()});
  }
  
  // Afficher section code
  var codeSection = document.getElementById('code-section-'+key);
  if(codeSection) codeSection.style.display = 'block';
  showToast('✅ Récupération confirmée !');
}

function confirmerLivraisonFinale(key, codeAttendu){
  var input = document.getElementById('code-input-'+key);
  if(!input || !input.value){
    showToast('⚠️ Entrez le code du destinataire');
    return;
  }
  if(input.value !== codeAttendu){
    showToast('❌ Code incorrect ! Vérifiez avec le destinataire.');
    input.style.borderColor = '#dc2626';
    return;
  }
  // Code correct !
  if(window.dbCh){
    window.dbCh.ref('livraisons/'+key).update({
      statut:'livree',
      livree_le: new Date().toISOString()
    });
  }
  document.getElementById('suivi-'+key)?.remove();
  showToast('🎉 Livraison confirmée ! Bien joué !');
}
</script>`;

h = h.replace('</body>', code + '\n</body>');

fs.writeFileSync('chauffeur-vip-pro-21.html', h, 'utf8');
console.log('OK taille:', h.length);
console.log('accepterLivraison:', h.includes('accepterLivraison'));
console.log('confirmerRecuperation:', h.includes('confirmerRecuperation'));
console.log('confirmerLivraisonFinale:', h.includes('confirmerLivraisonFinale'));
