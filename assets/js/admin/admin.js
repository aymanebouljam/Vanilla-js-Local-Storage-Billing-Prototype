const piècesList = JSON.parse(localStorage.getItem("piècesList"));

//fetch data
const fetchList = () =>{
    const tableBody = document.getElementById("piècesBody");
    if(tableBody){
        tableBody.innerHTML = "";
    }
    if(piècesList){
        if(piècesList.length > 0){
            piècesList.forEach(pièce => {
                tableBody.innerHTML += `
                <tr>
                    <td>${pièce.designation}</td>
                    <td>${pièce.prix_unitaire}</td>
                    <td>
                        <button class="btn btn-outline-dark btn-sm me-2" id ="modifier" onclick="window.location.href = 'edit.html?designation=${pièce.designation}';">Modifier</button> 
                        <button class="btn btn-outline-danger btn-sm" id ="supprimer" data-designation = "${pièce.designation}" onclick="handleDelete(event)">Supprimer</button> 
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
    $('#adminTable').DataTable({
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
            $('#adminTable').fadeIn(); 
        }
    });
});

// Handle piece deletion

const handleDelete = (event) => {
    if(confirm("Souhaitez-vous vraiment supprimer cette pièce ? ")){
        const designation = event.target.dataset.designation;
        const newData = piècesList.filter(pièce => pièce.designation.toLowerCase() !== designation.toLowerCase());
        localStorage.setItem("piècesList", JSON.stringify(newData));
        window.location.reload();
    }
}