const fs = require('fs');
let h = fs.readFileSync('malitaxi-admin-new.html', 'utf8');

// Ajouter contrôle GPS dans renderParams
h = h.replace(
  '<!-- CONFIG APP -->',
  `<!-- CONTROLE GPS -->
    <div class="table-wrap">
      <div class="table-hdr"><div class="table-title">🌍 Restriction géographique</div></div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:16px;background:var(--bg);border-radius:12px;margin-bottom:12px">
        <div>
          <div style="font-weight:800">🏙️ Mode Bamako uniquement</div>
          <div style="font-size:12px;color:var(--muted);margin-top:4px">Taxi/Moto/Livraison bloqués hors Bamako</div>
        </div>
        <div id="gps-toggle" onclick="toggleGPS()" style="width:52px;height:28px;background:var(--green);border-radius:14px;cursor:pointer;position:relative;transition:.3s">
          <div style="position:absolute;right:4px;top:4px;width:20px;height:20px;background:#fff;border-radius:50%;transition:.3s"></div>
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:16px;background:var(--bg);border-radius:12px">
        <div>
          <div style="font-weight:800">🌍 Mode Global (toutes régions)</div>
          <div style="font-size:12px;color:var(--muted);margin-top:4px">Services disponibles partout au Mali</div>
        </div>
        <button class="btn btn-primary btn-small" onclick="activerModeGlobal()">Activer</button>
      </div>
    </div>
    <!-- CONFIG APP -->`
);

// Ajouter la fonction toggleGPS
h = h.replace(
  'function updateTotal(){',
  `let gpsRestriction = true;
function toggleGPS(){
  gpsRestriction = !gpsRestriction;
  const toggle = document.getElementById('gps-toggle');
  if(toggle){
    toggle.style.background = gpsRestriction ? 'var(--green)' : 'var(--red)';
    toggle.querySelector('div').style.right = gpsRestriction ? '4px' : 'auto';
    toggle.querySelector('div').style.left = gpsRestriction ? 'auto' : '4px';
  }
  toast(gpsRestriction ? '🏙️ Mode Bamako activé' : '🌍 Mode Global activé', 's');
  logActivity('Paramètres', (gpsRestriction?'🏙️ Restriction Bamako activée':'🌍 Mode global activé'));
}
function activerModeGlobal(){
  gpsRestriction = false;
  toast('🌍 Mode Global activé — Services disponibles partout !', 's');
  logActivity('Paramètres', '🌍 Mode global activé par admin');
}
function updateTotal(){`
);

fs.writeFileSync('malitaxi-admin-new.html', h, 'utf8');
console.log('OK taille:', h.length);