// seeding pièces
const seedPieces = () => {
    const pieces = [
    { "designation": "Collier AC PVC 60*20", "prix_unitaire": 75.01 },
    { "designation": "Collier AC PVC 63*20", "prix_unitaire": 65.03 },
    { "designation": "Collier AC PVC 80*40", "prix_unitaire": 72.81 },
    { "designation": "Collier AC PVC 60*40", "prix_unitaire": 70.04 },
    { "designation": "Collier AC PVC 100*40", "prix_unitaire": 79.39 },
    { "designation": "Collier AC PVC 110*40", "prix_unitaire": 75.99 },
    { "designation": "Robinet PEC 20*3/4", "prix_unitaire": 139.85 },
    { "designation": "Robinet PEC 40*1*1/2", "prix_unitaire": 310.86 },
    { "designation": "Tuyau Poly HD 10k40", "prix_unitaire": 3.87 },
    { "designation": "Tuyau Poly HD 10k25", "prix_unitaire": 3.81 },
    { "designation": "Tuyau Poly HD 10k20", "prix_unitaire": 7.5 },
    { "designation": "Couvercle tabernacle", "prix_unitaire": 7.5 },
    { "designation": "Tube PVC 6K DN 75", "prix_unitaire": 52.09 },
    { "designation": "Bouche à clée", "prix_unitaire": 19.90 },
    { "designation": "Porte de niche GM", "prix_unitaire": 136.36 },
    { "designation": "Raccord SRM L 25*1/2", "prix_unitaire": 21.58 },
    { "designation": "Raccord SRM L 25*3/4", "prix_unitaire": 19.56 },
    { "designation": "Raccord SRM L 50*1*1/2", "prix_unitaire": 123.09 },
    { "designation": "Robinet Arrêt TCE 1/2", "prix_unitaire": 42.00 },
    { "designation": "Raccord compteur 1/5", "prix_unitaire": 12.50 },
    { "designation": "Vanne Bronze FI 1/2", "prix_unitaire": 86.70 },
    { "designation": "Coude SRM 50*1*1/4", "prix_unitaire": 131.70 },
    { "designation": "Mamelon double Lait 1/2", "prix_unitaire": 8.29 },
    { "designation": "Clapet RE 1/2", "prix_unitaire": 68.49 },
    { "designation": "Clapet RE 1*1/4", "prix_unitaire": 74.43 },
    { "designation": "Clapet RE 1*1/2", "prix_unitaire": 155.77 },
    { "designation": "Confection de Niche GM", "prix_unitaire": 155.77 },
];
    localStorage.setItem("piècesList", JSON.stringify(pieces));
    alert("Data seed successful !");
}

// seeding fees

const seedFees = () => {
    const elements = [
    {designation:"Pose Tuyau pol HD 20", valeur : 26.70},
    {designation:"Pose Tuyau pol HD 25", valeur : 26.70},
    {designation:"Pose Tuyau pol HD 50", valeur : 26.70},
    {designation:"Pose Appareils", valeur : 133.56},
    {designation:"Installation de la prise", valeur : 191.37},
    {designation: "Tva", valeur : 0.20},
    {designation:"Frais intervention", valeur : 0.15},
];
    localStorage.setItem("fixe", JSON.stringify(elements));

    alert("Data seed successful !");
}