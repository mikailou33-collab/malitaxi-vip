const fs = require('fs');
let h = fs.readFileSync('chauffeur-vip-pro-20.html', 'utf8');

const revenusCode = `

// ══════════════════════════════════════
// MODULE REVENUS DÉTAILLÉS
// ══════════════════════════════════════

const REVENUS_DATA = {
  today: [
    {heure:"07:30",client:"Aminata S.",de:"Hamdallaye",vers:"ACI 2000",km:3.2,duree:12,montant:2500,pay:"Orange Money",type:"taxi"},
    {heure:"09:15",client:"Boubacar D.",de:"Badalabougou",vers:"Sogoniko",km:6.1,duree:22,montant:4500,pay:"Wave",type:"vip"},
    {heure:"11:00",client:"Mariam C.",de:"Lafiabougou",vers:"Faladié",km:4.5,duree:18,montant:3000,pay:"Cash",type:"taxi"},
    {heure:"14:30",client:"Oumar T.",de:"Magnambougou",vers:"Kalaban",km:2.8,duree:10,montant:2000,pay:"Moov",type:"moto"},
    {heure:"16:45",client:"Fatoumata K.",de:"Niamakoro",vers:"Hamdallaye",km:5.3,duree:20,montant:3500,pay:"Orange Money",type:"taxi"},
  ],
  week: [
    {jour:"Lun",montant:15500,courses:6},
    {jour:"Mar",montant:22000,courses:9},
    {jour:"Mer",montant:18500,courses:7},
    {jour:"Jeu",montant:25000,courses:10},
    {jour:"Ven",montant:31000,courses:12},
    {jour:"Sam",montant:28500,courses:11},
    {jour:"Dim",montant:0,courses:0},
  ]
};

function openRevenus(){
  const totalJour = REVENUS_DATA.today.reduce((a,r)=>a+r.montant,0);
  const totalSemaine = REVENUS_DATA.week.reduce((a,r)=>a+r.montant,0);
  const commission = Math.round(totalSemaine*0.15);
  const net = totalSemaine - commission;
  const maxW = Math.max(...REVENUS_DATA.week.map(w=>w.montant));

  const overlay = document.createElement('div');
  overlay.id = 'revenus-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:#0F0F1A;z-index:900;overflow-y:auto;font-family:inherit';
  overlay.innerHTML = \`
    <div style="max-width:420px;margin:0 auto;padding:20px">
      <!-- HEADER -->
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
        <button onclick="document.getElementById('revenus-overlay').remove()"
          style="background:rgba(255,255,255,.1);border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer">←</button>
        <div style="font-size:18px;font-weight:900;color:#F5A623">💰 Mes Revenus</div>
      </div>

      <!-- STATS RAPIDES -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
        <div style="background:linear-gradient(135deg,#1E40AF,#3B82F6);border-radius:16px;padding:16px">
          <div style="font-size:11px;color:rgba(255,255,255,.7);font-weight:700">AUJOURD'HUI</div>
          <div style="font-size:24px;font-weight:900;color:#fff;margin-top:4px">\${totalJour.toLocaleString('fr-FR')} F</div>
          <div style="font-size:12px;color:rgba(255,255,255,.6);margin-top:2px">\${REVENUS_DATA.today.length} courses</div>
        </div>
        <div style="background:linear-gradient(135deg,#059669,#10b981);border-radius:16px;padding:16px">
          <div style="font-size:11px;color:rgba(255,255,255,.7);font-weight:700">CETTE SEMAINE</div>
          <div style="font-size:24px;font-weight:900;color:#fff;margin-top:4px">\${totalSemaine.toLocaleString('fr-FR')} F</div>
          <div style="font-size:12px;color:rgba(255,255,255,.6);margin-top:2px">\${REVENUS_DATA.week.reduce((a,w)=>a+w.courses,0)} courses</div>
        </div>
        <div style="background:rgba(245,166,35,.15);border:1px solid rgba(245,166,35,.3);border-radius:16px;padding:16px">
          <div style="font-size:11px;color:rgba(255,255,255,.7);font-weight:700">COMMISSION (15%)</div>
          <div style="font-size:20px;font-weight:900;color:#F5A623;margin-top:4px">-\${commission.toLocaleString('fr-FR')} F</div>
          <div style="font-size:12px;color:rgba(255,255,255,.6);margin-top:2px">MaliTaxi</div>
        </div>
        <div style="background:rgba(16,185,129,.15);border:1px solid rgba(16,185,129,.3);border-radius:16px;padding:16px">
          <div style="font-size:11px;color:rgba(255,255,255,.7);font-weight:700">NET À RECEVOIR</div>
          <div style="font-size:20px;font-weight:900;color:#10b981;margin-top:4px">\${net.toLocaleString('fr-FR')} F</div>
          <div style="font-size:12px;color:rgba(255,255,255,.6);margin-top:2px">80% des revenus</div>
        </div>
      </div>

      <!-- GRAPHIQUE SEMAINE -->
      <div style="background:#1A1A2E;border-radius:16px;padding:16px;margin-bottom:20px">
        <div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:16px">📊 Revenus cette semaine</div>
        <div style="display:flex;align-items:flex-end;gap:8px;height:100px">
          \${REVENUS_DATA.week.map(w=>{
            const h2 = maxW>0 ? Math.round((w.montant/maxW)*80) : 0;
            const isPeak = w.montant===maxW && maxW>0;
            return \`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
              <div style="font-size:9px;color:rgba(255,255,255,.5)">\${w.montant>0?(w.montant/1000).toFixed(0)+'k':''}</div>
              <div style="width:100%;height:\${h2}px;background:\${isPeak?'linear-gradient(0deg,#F5A623,#fbbf24)':'rgba(245,166,35,.25)'};border-radius:6px 6px 0 0;min-height:4px;transition:.3s"></div>
              <div style="font-size:10px;color:\${isPeak?'#F5A623':'rgba(255,255,255,.5)';font-weight:\${isPeak?'900':'400'}">\${w.jour}</div>
            </div>\`;
          }).join('')}
        </div>
      </div>

      <!-- PAIEMENTS PAR TYPE -->
      <div style="background:#1A1A2E;border-radius:16px;padding:16px;margin-bottom:20px">
        <div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:12px">💳 Par mode de paiement</div>
        \${(()=>{
          const pays = {};
          REVENUS_DATA.today.forEach(r=>{ pays[r.pay]=(pays[r.pay]||0)+r.montant; });
          const total2 = Object.values(pays).reduce((a,b)=>a+b,0);
          const icons = {'Orange Money':'🟠','Wave':'🔵','Moov':'🟡','Cash':'💵'};
          return Object.entries(pays).map(([pay,montant])=>\`
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
              <div style="font-size:20px">\${icons[pay]||'💳'}</div>
              <div style="flex:1">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                  <span style="font-size:13px;color:#fff;font-weight:700">\${pay}</span>
                  <span style="font-size:13px;color:#F5A623;font-weight:700">\${montant.toLocaleString('fr-FR')} F</span>
                </div>
                <div style="background:rgba(255,255,255,.1);border-radius:4px;height:6px">
                  <div style="background:#F5A623;height:6px;border-radius:4px;width:\${Math.round(montant/total2*100)}%"></div>
                </div>
              </div>
            </div>
          \`).join('');
        })()}
      </div>

      <!-- HISTORIQUE DU JOUR -->
      <div style="background:#1A1A2E;border-radius:16px;padding:16px;margin-bottom:20px">
        <div style="font-size:14px;font-weight:800;color:#fff;margin-bottom:12px">📋 Courses aujourd'hui</div>
        \${REVENUS_DATA.today.map(r=>\`
          <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.08)">
            <div style="width:40px;height:40px;background:rgba(245,166,35,.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px">
              \${r.type==='vip'?'👑':r.type==='moto'?'🏍️':'🚕'}
            </div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:700;color:#fff">\${r.de} → \${r.vers}</div>
              <div style="font-size:11px;color:rgba(255,255,255,.5)">⏰ \${r.heure} · 📏 \${r.km}km · ⏱️ \${r.duree}min</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:14px;font-weight:900;color:#F5A623">\${r.montant.toLocaleString('fr-FR')} F</div>
              <div style="font-size:10px;color:rgba(255,255,255,.4)">\${r.pay}</div>
            </div>
          </div>
        \`).join('')}
      </div>

      <!-- BOUTON RETRAIT -->
      <button style="width:100%;padding:16px;background:linear-gradient(135deg,#059669,#10b981);border:none;border-radius:14px;color:#fff;font-size:16px;font-weight:900;cursor:pointer;font-family:inherit;margin-bottom:20px"
        onclick="demanderRetrait(\${net})">
        💸 Demander un retrait — \${net.toLocaleString('fr-FR')} F
      </button>
    </div>
  \`;
  document.body.appendChild(overlay);
}

function demanderRetrait(montant){
  alert('💸 Demande de retrait de ' + montant.toLocaleString('fr-FR') + ' FCFA envoyée !\\n\\nVous recevrez votre paiement dans 24h sur Orange Money.');
}
`;

// Insérer avant le dernier </script>
const lastScript = h.lastIndexOf('</script>');
h = h.slice(0, lastScript) + revenusCode + '\n' + h.slice(lastScript);

// Connecter le bouton Revenus dans la navbar
h = h.replace(
  '<div class="nav-item" onclick="showTab(\'revenus\')">',
  '<div class="nav-item" onclick="openRevenus()">'
);

// Si pas trouvé, chercher autrement
if(!h.includes('onclick="openRevenus()"')){
  h = h.replace(
    /(<[^>]*>)\s*💰\s*(<\/[^>]*>)\s*(<[^>]*>)\s*Revenus\s*(<\/[^>]*>)/,
    (match) => match.replace('onclick="', 'onclick="openRevenus();return;//')
  );
}

fs.writeFileSync('chauffeur-vip-pro-20.html', h, 'utf8');
console.log('OK taille:', h.length);
