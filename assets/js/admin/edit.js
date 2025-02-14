const piècesList = JSON.parse(localStorage.getItem("piècesList"));


// fill the form
const urlParams = new URLSearchParams(window.location.search);

const uncoded_param = urlParams.get("designation");
const param = decodeURIComponent(uncoded_param);

const fillForm = () => {
    const designation = document.getElementById("désignation");
    const prix_unitaire = document.getElementById("prix_unitaire");

    if(piècesList){
        piècesList.forEach(pièce => {
            if(pièce.designation.toLowerCase() === param.toLowerCase()){
                designation.value = pièce.designation;
                prix_unitaire.value = pièce.prix_unitaire;
            }
        })
    }
}

window.onload = ()=>fillForm();