const piècesList = JSON.parse(localStorage.getItem("piècesList"));

//Redirect
const checkData = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    if(!data){
        window.location.href = "formulaire.html";
    }
}

//fetch table
const fetchData = (liste) =>{
    const data = JSON.parse(localStorage.getItem("data"));
    const tbody = document.getElementById("tableBody");
    if(tbody){
         tbody.innerHTML = "";
         if(liste.length > 0){
             liste.forEach(item => {
                if(item.designation.toLowerCase() === "POSE Appareils".toLowerCase()){
                    tbody.innerHTML += `
                    <tr>
                        <td>${item.designation}</td>
                        <td>${item.prix_unitaire}</td>
                        <td>
                            <input type="number" id="quantité" value="${data.poseAppareils}" min="0" class="form-control border border-dark w-50 mx-auto">
                        </td>
                        <td><input type="checkbox" class="checkbox form-check-input border border-3 border-dark" id ="checkbox" checked='true'"></td>
                    </tr>
                `;
                }else{
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
                }
             });
         }
    }
 }
 
 window.onload = () => {
    checkData();
    fetchData(piècesList);
 }
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
       if(designation.toLocaleLowerCase().includes("tuyau poly hd")){
            const pose = piècesList.find(pièce => pièce.designation.toLocaleLowerCase().includes("pose tuyau pol hd "+designation.slice(-2)));
            formData.push({
                designation,
                prix_unitaire : parseInt(prix_unitaire),
                quantité : parseInt(quantité),
            },{
                designation : pose.designation,
                prix_unitaire : parseInt(pose.prix_unitaire),
                quantité: parseInt(quantité),
            });
       }else{
        formData.push({
            designation,
            prix_unitaire : parseInt(prix_unitaire),
            quantité : parseInt(quantité),
        });
       }
    }
};

//handle table

let formData = [];

const handleTable = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const piècesList = JSON.parse(localStorage.getItem("piècesList"));
    let prix_unitaire = 0;
    piècesList.forEach(pièce => {
        if(pièce.designation.toLowerCase() === "POSE Appareils".toLocaleLowerCase()){
            prix_unitaire = pièce.prix_unitaire;
        }
    });

    if(data && piècesList){
        if(formData.length === 0){
            window.alert("Veuillez choisir les pièces nécessaires");
            return;
        }
        localStorage.removeItem("data");
        const newData = {
            ...data,
            pièces : [
                ...formData,
                {designation : "POSE Appareils", prix_unitaire : prix_unitaire, quantité : data.poseAppareils},
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
                    "sPrevious": "<",
                    "sNext": ">",
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
