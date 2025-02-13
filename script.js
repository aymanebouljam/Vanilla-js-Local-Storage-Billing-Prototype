// const data = [
//     { "designation": "Collier AC PVC 60*20", "prix_unitaire": 75.01 },
//     { "designation": "Collier AC PVC 63*20", "prix_unitaire": 65.03 },
//     { "designation": "Collier AC PVC 80*40", "prix_unitaire": 72.81 },
//     { "designation": "Collier AC PVC 60*40", "prix_unitaire": 70.04 },
//     { "designation": "Collier AC PVC 100*40", "prix_unitaire": 79.39 },
//     { "designation": "Collier AC PVC 110*40", "prix_unitaire": 75.99 },
//     { "designation": "Robinet PEC 20*3/4", "prix_unitaire": 139.85 },
//     { "designation": "Robinet PEC 40*1*1/2", "prix_unitaire": 310.86 },
//     { "designation": "Tuyau Poly HD 10b40", "prix_unitaire": 3.87 },
//     { "designation": "Tuyau Poly HD 10b25", "prix_unitaire": 3.81 },
//     { "designation": "Tuyau Poly HD 10b20", "prix_unitaire": 7.5 },
//     { "designation": "Couvercle tabernacle", "prix_unitaire": 7.5 },
//     { "designation": "Tube PVC 6K DN 75", "prix_unitaire": 52.09 },
//     { "designation": "Bouche à clef", "prix_unitaire": 19.90 },
//     { "designation": "Porte de niche GM", "prix_unitaire": 136.36 },
//     { "designation": "Raccord SRM L 25*1/2", "prix_unitaire": 21.58 },
//     { "designation": "Raccord SRM L 25*3/4", "prix_unitaire": 19.56 },
//     { "designation": "Raccord SRM L 50*1*1/2", "prix_unitaire": 123.09 },
//     { "designation": "Robinet Arrêt TCE 1/2", "prix_unitaire": 42.00 },
//     { "designation": "Raccord compteur 1/5", "prix_unitaire": 12.50 },
//     { "designation": "Vanne Bronze FI 1/2", "prix_unitaire": 86.70 },
//     { "designation": "Coude SRM 50*1*1/4", "prix_unitaire": 131.70 },
//     { "designation": "Mamelon double Lait 1/2", "prix_unitaire": 8.29 },
//     { "designation": "Clapet RE 1/2", "prix_unitaire": 68.49 },
//     { "designation": "Clapet RE 1*1/4", "prix_unitaire": 74.43 },
//     { "designation": "Clapet RE 1*1/2", "prix_unitaire": 155.77 },
//     { "designation": "Confection de Niche GM", "prix_unitaire": 155.77 },
//     { "designation": "Pose Tuyau pol HD 25", "prix_unitaire": 26.70 },
//     { "designation": "POSE Appareils", "prix_unitaire": 133.56 },
//     { "designation": "Installation de la prise", "prix_unitaire": 191.37 }
// ]
// ;

const data =
[
    { "designation": "Collier AC PVC 60*20", "prix_unitaire": 75.01 },
    { "designation": "Collier AC PVC 80*40", "prix_unitaire": 72.81 },
    { "designation": "Robinet PEC 20*3/4", "prix_unitaire": 139.85 },
    { "designation": "Robinet PEC 40*1*1/2", "prix_unitaire": 310.86 },
    { "designation": "Tuyau Poly HD 10b40", "prix_unitaire": 3.87 },
    { "designation": "Tuyau Poly HD 10b25", "prix_unitaire": 3.81 },
];
const fraisInterv = 0.15;
const TVA = 0.20;
// Elements
const tbody = document.getElementById("tableBody");
const tdevis = document.getElementById("tableDevis");

//form
const nom = document.getElementById("nom");
const prénom= document.getElementById("prénom");
const objet = document.getElementById("objet");
const quantité = document.getElementById("quantité");
const checkbox = document.getElementsByClassName("checkbox");
const compteurContainer = document.getElementById("compteur-container");
const policeContainer = document.getElementById("police-container");
const typeContainer = document.getElementById("type-container");
const form = document.getElementById("facture");
//fetch table
const fetchData = (liste) =>{
   if(tbody){
        tbody.innerHTML = "";
        if(liste.length > 0){
            liste.forEach(item => {
                tbody.innerHTML += `
                    <tr>
                        <td>${item.designation}</td>
                        <td>${item.prix_unitaire}</td>
                        <td>
                            <input type="number" id="quantité" value="0" min="0" class="form-control border border-dark w-25 mx-auto">
                        </td>
                        <td><input type="checkbox" class="checkbox form-check-input border border-3 border-dark" id ="checkbox" onclick="handleCheck(this)"></td>
                    </tr>
                `;
            });
        }else{
            tbody.innerHTML = `
                <tr>
                   <td colspan="4" class="fs-5">Aucune pièce correspondante trouvée</td>
                </tr>
            `;
        }
   }
}

window.onload = fetchData(data);

//Filter table
const filterTable = (event) => {
    const searched = event.target.value.trim();
    const filtered = data.filter(item => item.designation.toLowerCase().includes(searched.toLowerCase()));
    fetchData(filtered);
};

//handle select
const handleSelect = (event) => {
    const selected = event.target.value;
    typeContainer.innerHTML = "";
    policeContainer.innerHTML = "";
    compteurContainer.innerHTML = "";

    if(selected === "nouveau branchement"){
        typeContainer.innerHTML = `
            <select class="form-control border-2"  id="typeBranch" required>
                <option value="">-- Type de Branchement --</option>
                <option value="branchement 25">Branchement 25</option>
                <option value="branchement 50">Branchement 50</option>
            </select>
        `;
        compteurContainer.innerHTML = `
            <label class="form-label fs-5">Nombre de compteurs :</label>
            <input type="number" value="0" min="0" id="compteur" class="form-control w-25" required>
        `;

    }else if(selected === "modification de branchement"){
        typeContainer.innerHTML = `
        <select class="form-control border-2"  id="typeBranch" required>
            <option value="">-- Type de Branchement --</option>
            <option value="branchement 20/25">Modification 20 => 25</option>
            <option value="branchement 20/50">Modification 20 => 50</option>
            <option value="branchement 25/50">Modification 25 => 50</option>
        </select>
    `;
        compteurContainer.innerHTML = `
            <label class="form-label fs-5">Nombre de compteurs :</label>
            <input type="number" value="0" min="0" id="compteur" class="form-control w-25" required>
        `;
        policeContainer.innerHTML = ` 
            <input type="text" placeholder="N° de Police" class="form-control" id="police" required>
        `;
    }
}

//handle Form
const handleForm = (event) => {
    event.preventDefault();
    localStorage.removeItem("data");
    const typeBranch = document.getElementById("typeBranch");
    const compteur = document.getElementById("compteur");
    const police = document.getElementById("police");

    if(compteur && Number(compteur.value) == 0){
        alert("Veuillez saisir le nombre des compteurs");
        return;
    };

    const formData = {
        nom : nom.value,
        prénom : prénom.value,
        objet : objet.value,
        typeBranch : typeBranch ? typeBranch.value : "",
        police : police ? police.value : "",
        compteur : compteur ? compteur.value : "",
    }
    localStorage.setItem("data", JSON.stringify(formData));
    window.location.href = "table.html";
};

//handle table

let formData = [];

const handleTable = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    if(data){
        localStorage.removeItem("data");
        const newData = {
            ...data,
            pièces : [
                ...formData,
            ]
        }
        localStorage.setItem("data", JSON.stringify(newData));
        window.location.href = "devis.html";
    }
};

//handle Check

const handleCheck = (btn) => {

    const row = btn.parentElement.parentElement;
    const designation = row.cells[0].innerHTML;
    const prix_unitaire = row.cells[1].innerHTML;
    const quantité = row.cells[2].querySelector('input').value;
    if(quantité == 0){
        window.alert("Veuillez choisir une quantité");
        row.cells[3].querySelector("input").checked = false;
    }else{
        formData.push({
            designation,
            prix_unitaire,
            quantité
        });
    }
};

//handle devis table

const handleDevis = () => {
    const data = JSON.parse(localStorage.getItem("data"));
   

    let somme = 0;
   
    if(tdevis){
        tdevis.innerHTML = "";
        if(data.pièces && data.pièces.length>0){
            data.pièces.forEach(item => {
                tdevis.innerHTML += `
                <tr>
                    <td>${item.designation}</td>
                    <td>${item.prix_unitaire}</td>
                    <td>${item.quantité}</td>
                    <td>${Number(item.prix_unitaire) * Number(item.quantité)}</td>
                </tr>
            `;
                somme += Number(item.prix_unitaire) * Number(item.quantité);
            });
    
            const frais_intervention = somme * fraisInterv;
            const montant_tva = (somme + (somme * fraisInterv)) * TVA;
    
             tdevis.innerHTML += `
                <tr>
                    <td colspan="3">Total HT</td>
                    <td>${somme.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="3">Frais d'intervention (15%)</td>
                    <td>${frais_intervention.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="3">T.V.A 20%</td>
                    <td>${montant_tva.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="3">TOTAL GENERAL TTC</td>
                    <td>${(somme + frais_intervention + montant_tva).toFixed(2)}</td>
                </tr>
             `;
    
        }
    }
   
}

window.onload = handleDevis();


//export excel format

const handleExportTable = () => {
    const table = document.getElementById("dataTable");
    if (!table) {
        alert("Table not found!");
        return;
    }

    const worksheet = XLSX.utils.table_to_sheet(table); 
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    XLSX.writeFile(workbook, "facture EG.xlsx");
};



