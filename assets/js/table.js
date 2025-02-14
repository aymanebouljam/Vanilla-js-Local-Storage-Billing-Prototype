const data = [
    { "designation": "Collier AC PVC 60*20", "prix_unitaire": 75.01 },
    { "designation": "Collier AC PVC 63*20", "prix_unitaire": 65.03 },
    { "designation": "Collier AC PVC 80*40", "prix_unitaire": 72.81 },
    { "designation": "Collier AC PVC 60*40", "prix_unitaire": 70.04 },
    { "designation": "Collier AC PVC 100*40", "prix_unitaire": 79.39 },
    { "designation": "Collier AC PVC 110*40", "prix_unitaire": 75.99 },
    { "designation": "Robinet PEC 20*3/4", "prix_unitaire": 139.85 },
    { "designation": "Robinet PEC 40*1*1/2", "prix_unitaire": 310.86 },
    { "designation": "Tuyau Poly HD 10b40", "prix_unitaire": 3.87 },
    { "designation": "Tuyau Poly HD 10b25", "prix_unitaire": 3.81 },
    { "designation": "Tuyau Poly HD 10b20", "prix_unitaire": 7.5 },
    { "designation": "Couvercle tabernacle", "prix_unitaire": 7.5 },
    { "designation": "Tube PVC 6K DN 75", "prix_unitaire": 52.09 },
    { "designation": "Bouche à clef", "prix_unitaire": 19.90 },
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
    { "designation": "Pose Tuyau pol HD 25", "prix_unitaire": 26.70 },
    { "designation": "POSE Appareils", "prix_unitaire": 133.56 },
    { "designation": "Installation de la prise", "prix_unitaire": 191.37 }
]
;

//fetch table
const fetchData = (liste) =>{
    const tbody = document.getElementById("tableBody");
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
         }
    }
 }
 
 window.onload = fetchData(data);
 
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

//handle table

let formData = [];

const handleTable = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    if(data){
        if(formData.length === 0){
            window.alert("Veuillez choisir les pièces nécessaires");
            return;
        }
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

// Pagination

$(document).ready(function() {
    $('#piècesTable').DataTable({
        language: {
                "sProcessing": "Traitement en cours...",
                "sSearch": "Rechercher&nbsp;:",
                "sLengthMenu": "Afficher _MENU_ éléments",
                "sInfo": "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
                "sInfoEmpty": "Affichage de l'élément 0 à 0 sur 0 éléments",
                "sInfoFiltered": "(filtré de _MAX_ éléments au total)",
                "sLoadingRecords": "Chargement en cours...",
                "sZeroRecords": "Aucun élément à afficher",
                "sEmptyTable": "Aucune donnée disponible dans le tableau",
                "oPaginate": {
                    "sFirst": "Premier",
                    "sPrevious": "Précédent",
                    "sNext": "Suivant",
                    "sLast": "Dernier"
                    }
        },
        lengthChange: false,
        pageLength: 3,
        initComplete: function() {
            $('#piècesTable').fadeIn(); 
        }
    });
});
