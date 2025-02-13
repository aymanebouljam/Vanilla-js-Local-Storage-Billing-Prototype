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

// Elements
const tbody = document.getElementById("tableBody");

//form
const nom = document.getElementById("nom");
const prénom= document.getElementById("prénom");
const objet = document.getElementById("objet");
const typeBranch = document.getElementById("typeBranch");
const quantité = document.getElementById("quantité");
const checkbox = document.getElementsByClassName("checkbox");
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
                            <input type="number" id="quantité" value="0" min="0" class="form-control border border-dark w-50 mx-auto">
                        </td>
                        <td><input type="checkbox" class="checkbox form-check-input border border-3 border-dark" id ="checkbox" onclick="handleCheck(this)"></td>
                    </tr>
                `;
            });
        }else{
            tbody.innerHTML = `
                <tr>
                   <td colspan="3" class="fs-5">Aucune pièce correspondante trouvée</td>
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
    if(selected === "nouveau branchement"){
        typeBranch.innerHTML = `
            <option value="">-- Type de Branchement --</option>
            <option value="branchement 20">Branchement 20</option>
            <option value="branchement 25">Branchement 25</option>
            <option value="branchement 50">Branchement 50</option>
        `;
    }else if(selected === "modification de branchement"){
        typeBranch.innerHTML = `
        <option value="">-- Type de Branchement --</option>
        <option value="branchement 20/25">Modification 20 => 25</option>
        <option value="branchement 20/50">Modification 20 => 50</option>
        <option value="branchement 25/50">Modification 25 => 50</option>
    `;
    }
}

//handle Form

const handleForm = (event) => {
    event.preventDefault();
    localStorage.removeItem("data");
    const formData = {
        [nom.id] : nom.value,
        [prénom.id] : prénom.value,
        [objet.id] : objet.value,
        [typeBranch.id] : typeBranch.value,
    }
    localStorage.setItem("data", JSON.stringify(formData));
    window.location.href = "table.html";
};

//handle table

let formData = {};

const handleTable = (btn) => {
    const data = JSON.parse(localStorage.getItem("data"));
    if(data){
        // localStorage.removeItem("data");
        const newData = {
            ...data,
            pièces : [
                formData,
            ]
        }

        localStorage.setItem("data", JSON.stringify(newData));
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
        formData = {
            ...formData,
            designation,
            prix_unitaire,
            quantité
        };
    }
};