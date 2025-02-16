const piècesList = JSON.parse(localStorage.getItem("piècesList"));

// handle create form
const createPiece = (event) => {
    event.preventDefault();
    const designation = document.getElementById("désignation").value;
    const prix_unitaire = document.getElementById("prix_unitaire").value;
    if(piècesList){
        const newData = [...piècesList, {designation,prix_unitaire}];
        localStorage.setItem("piècesList", JSON.stringify(newData));
        window.location.href = "admin.html";
    }
}