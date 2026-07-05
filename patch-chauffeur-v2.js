const fs = require('fs');

const fichier = 'public\\chauffeur.html';
let contenu = fs.readFileSync(fichier, 'utf8');

// Supprimer l'ancien listener si present
const ancienListener = `  // Ecouter les actions depuis la notification
  if(navigator.serviceWorker){
    navigator.serviceWorker.addEventListener('message', function(event){
      if(!event.data || event.data.type !== 'NOTIFICATION_ACTION') return;
      var action = event.data.action;
      var data = event.data.data || {};
      if(action === 'accepter' && data.courseId){
        if(window.dbCh){
          window.dbCh.ref('courses/'+data.courseId).once('value').then(function(snap){
            var course = snap.val();
            if(course && course.statut === 'en_attente'){
              stopSon();
              var notif = document.getElementById('notif-course-'+data.courseId);
              if(notif) notif.remove();
              accepterCourseReelle(data.courseId, course);
            }
          });
        }
      } else if(action === 'refuser' && data.courseId){
        stopSon();
        coursesRefuseesParMoi[data.courseId] = true;
        var notif = document.getElementById('notif-course-'+data.courseId);
        if(notif) notif.remove();
      } else if(action === 'accepter_livraison' && data.livraisonId){
        if(window.dbCh){
          window.dbCh.ref('livraisons/'+data.livraisonId).once('value').then(function(snap){
            var liv = snap.val();
            if(liv && liv.statut === 'en_attente'){
              stopSon();
              var notif = document.getElementById('notif-'+data.livraisonId);
              if(notif) notif.remove();
              accepterLivraison(data.livraisonId, liv);
            }
          });
        }
      } else if(action === 'refuser_livraison' && data.livraisonId){
        stopSon();
        livraisonsRefuseesParMoi[data.livraisonId] = true;
        var notif = document.getElementById('notif-'+data.livraisonId);
        if(notif) notif.remove();
      }
    });
  }
}`;

const nouvelListener = `  // Ecouter les messages du Service Worker (acceptation depuis notification)
  if(navigator.serviceWorker){
    navigator.serviceWorker.addEventListener('message', function(event){
      if(!event.data) return;
      var msg = event.data;

      if(msg.type === 'COURSE_ACCEPTEE_SW'){
        stopSon();
        var notif = document.getElementById('notif-course-'+msg.courseId);
        if(notif) notif.remove();
        // Construire l'objet course depuis les donnees
        if(window.dbCh){
          window.dbCh.ref('courses/'+msg.courseId).once('value').then(function(snap){
            var course = snap.val();
            if(course){
              currentCourse = {
                type: course.type || 'taxi',
                typeVip: !!course.typeVip,
                depart: course.depart || '',
                arrivee: course.arrivee || '',
                arrets: Array.isArray(course.arrets) ? course.arrets : [],
                km: course.km || '',
                duree: course.duree || '',
                prix: course.prix || 0,
                client: course.client || '',
                clientTel: course.clientTel || '',
                paiement: course.paiement || 'cash',
                key: msg.courseId
              };
              courseStep = 1;
              renderHome();
              showToast('✅ Course acceptée depuis la notification !');
            }
          });
        }
      } else if(msg.type === 'COURSE_DEJA_PRISE'){
        stopSon();
        showToast('⏱️ Cette course a déjà été prise');
      } else if(msg.type === 'COURSE_REFUSEE_SW'){
        stopSon();
        coursesRefuseesParMoi[msg.courseId] = true;
        var notif = document.getElementById('notif-course-'+msg.courseId);
        if(notif) notif.remove();
      } else if(msg.type === 'LIVRAISON_ACCEPTEE_SW'){
        stopSon();
        if(window.dbCh){
          window.dbCh.ref('livraisons/'+msg.livraisonId).once('value').then(function(snap){
            var liv = snap.val();
            if(liv){
              afficherSuiviLivraison(msg.livraisonId, liv);
              showToast('✅ Livraison acceptée depuis la notification !');
            }
          });
        }
      } else if(msg.type === 'LIVRAISON_REFUSEE_SW'){
        stopSon();
        livraisonsRefuseesParMoi[msg.livraisonId] = true;
      }
    });
  }
}`;

// Remplacer
if(contenu.includes(ancienListener)){
  contenu = contenu.replace(ancienListener, nouvelListener);
  fs.writeFileSync(fichier, contenu, 'utf8');
  console.log('✅ Listener mis a jour avec succes !');
} else {
  // Essayer avec le texte simple
  const simple = `// simulation désactivée
}`;
  const nouveau = `// simulation désactivée
${nouvelListener}`;
  if(contenu.includes(simple)){
    contenu = contenu.replace(simple, nouveau);
    fs.writeFileSync(fichier, contenu, 'utf8');
    console.log('✅ Listener ajoute avec succes !');
  } else {
    console.log('❌ Texte non trouve');
  }
}
