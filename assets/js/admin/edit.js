// fill the form
const fillForm = () => {
    const piècesList = JSON.parse(localStorage.getItem("piècesList"));

    const urlParams = new URLSearchParams(window.location.search);
    const uncoded_param = urlParams.get("designation");
    const param = decodeURIComponent(uncoded_param);

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

const editPiece= (event) => {
    event.preventDefault();
    const designation = document.getElementById("désignation");
    const prix_unitaire = document.getElementById("prix_unitaire");

    const piècesList = JSON.parse(localStorage.getItem("piècesList"));

    const urlParams = new URLSearchParams(window.location.search);
    const uncoded_param = urlParams.get("designation");
    const param = decodeURIComponent(uncoded_param);

    if(piècesList){
        const newData = piècesList.map(pièce => {
            if(pièce.designation.toLowerCase() === param.toLowerCase()){
                return {...pièce, designation : designation.value, prix_unitaire : prix_unitaire.value};
            }else{
                return pièce;
            }
        });
        localStorage.setItem("piècesList", JSON.stringify(newData));
        window.location = "admin.html";
    }
}