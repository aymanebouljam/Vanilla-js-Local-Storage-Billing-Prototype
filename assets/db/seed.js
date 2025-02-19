// seeding pièces
const seedPieces = () => {
    if(confirm("Cette action va supprimer les données actuelles, voulez-vous continuer ?")){
        const pieces = [
            { "designation": 'Collier AC PVC 60*20', 'prix_unitaire': 65.03 },
            { 'designation': 'Collier AC PVC 63*40', 'prix_unitaire': 74.84 },
            { 'designation': 'Collier AC PVC 63*20', 'prix_unitaire': 74.04 },
            { 'designation': 'Collier AC PVC 80*40', 'prix_unitaire': 72.81 },
            { 'designation': 'Collier AC PVC 60*40', 'prix_unitaire': 70.04 },
            { 'designation': 'Collier AC PVC 100*40', 'prix_unitaire': 79.39 },
            { 'designation': 'Collier AC PVC 110*40', 'prix_unitaire': 75.99 },
            { 'designation': 'Robinet PEC 20*3/4', 'prix_unitaire': 127.77 },
            { 'designation': 'Robinet PEC 40*1"1/2', 'prix_unitaire': 348.68 },
            { 'designation': 'Tuyau Poly HD 10k50', 'prix_unitaire': 14.32 },
            { 'designation': 'Tuyau Poly HD 10k25', 'prix_unitaire': 3.79 },
            { 'designation': 'Tuyau Poly HD 10k20', 'prix_unitaire': 2.43 },
            { 'designation': 'Couvercle tabernacle', 'prix_unitaire': 7.5 },
            { 'designation': 'Tube PVC 6K DN 75', 'prix_unitaire': 11.75 },
            { 'designation': 'Bouche à clé', 'prix_unitaire': 52.09},
            { 'designation': 'Porte de niche GM', 'prix_unitaire': 160.00 },
            { 'designation': 'Raccord SRM L 20*1/2', 'prix_unitaire': 19.90 },
            { 'designation': 'Raccord SRM L 25*1/2', 'prix_unitaire': 21.58 },
            { 'designation': 'Raccord SRM L 25*3/4', 'prix_unitaire': 19.56 },
            { 'designation': 'Raccord SRM L 50*1"1/2', 'prix_unitaire': 127.50 },
            { 'designation': 'Robinet Arrêt TCE 1/2', 'prix_unitaire': 42.00 },
            { 'designation': 'Raccord compteur 15', 'prix_unitaire': 12.50 },
            { 'designation': 'Vanne Bronze F 11/2', 'prix_unitaire': 86.70 },
            { 'designation': 'Coude SRM 50*1"1/2', 'prix_unitaire': 131.70 },
            { 'designation': 'Mamelon double Lait 1/2', 'prix_unitaire': 8.29 },
            { 'designation': 'Clapet RE 1/2', 'prix_unitaire': 14.13 },
            { 'designation': 'Clapet RE 1"1/4', 'prix_unitaire': 64.89 },
            { 'designation': 'Clapet RE 1"1/2', 'prix_unitaire': 74.43 },
            { 'designation': 'Confection de Niche GM', 'prix_unitaire': 155.77 },
            { 'designation': 'Pose Tuyau pol HD 50', 'prix_unitaire': 26.70 },
            { 'designation': 'Pose Tuyau pol HD 25', 'prix_unitaire': 26.70 },
            { 'designation': 'POSE Appareils', 'prix_unitaire': 133.56 },
        ];
            localStorage.setItem("piècesList", JSON.stringify(pieces));
            alert("Insertion réussite !");
            window.location.reload();
        }
};


// seeding fees

const seedFees = () => {
   if(confirm("Cette action va supprimer les données actuelles, Voulez-vous continuer ?")){
        const elements = [
            {designation:'Installation de la prise', valeur : 191.37},
            {designation: 'Tva', valeur : 0.20},
            {designation:'Frais intervention', valeur : 0.15},
        ];
            localStorage.setItem('fixe', JSON.stringify(elements));
        
            alert("Insertion réussite !");
            window.location.reload();
   }
}