// const elements = [
//     {designation:"Pose Tuyau pol HD 20", valeur : 26.70},
//     {designation:"Pose Tuyau pol HD 25", valeur : 26.70},
//     {designation:"Pose Tuyau pol HD 50", valeur : 26.70},
//     {designation:"Pose Appareils", valeur : 133.56},
//     {designation:"Installation de la prise", valeur : 191.37},
//     {designation: "T.V.A", valeur : 0.20},
//     {designation:"Frais intervention", valeur : 0.15},
// ];

// localStorage.setItem("fixe", JSON.stringify(elements));


const elements = JSON.parse(localStorage.getItem("fixe"));

//fetch data
const fetchList = () =>{
    const tableBody = document.getElementById("fixeBody");
    if(tableBody){
        tableBody.innerHTML = "";
    }
    if(elements){
        if(elements.length > 0){
            elements.forEach(element => {
                tableBody.innerHTML += `
                <tr>
                    <td>${element.designation}</td>
                    <td>${element.valeur}</td>
                    <td>
                        <button class="btn btn-outline-dark btn-sm me-2" id ="modifier" onclick="window.location.href = 'modification.html?designation=${element.designation}';">Modifier</button> 
                        <button class="btn btn-outline-danger btn-sm" id ="supprimer" data-designation = ${element.designation} onclick="handleDelete(event)">Supprimer</button> 
                    </td>
                </tr>
            `;
            })
        }
    }
}

window.onload = () => fetchList();

// Pagination

$(document).ready(function() {
    $('#fixeTable').DataTable({
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
            $('#fixeTable').fadeIn(); 
        }
    });
});

// Handle item deletion

const handleDelete = (event) => {
    if(confirm("Souhaitez-vous vraiment supprimer cet élement ? ")){
        const designation = event.target.dataset.designation;
        const newData = elements.filter(element => element.designation.toLowerCase() !== designation.toLowerCase());
        localStorage.setItem("fixe", JSON.stringify(newData));
        window.location.reload();
    }
}