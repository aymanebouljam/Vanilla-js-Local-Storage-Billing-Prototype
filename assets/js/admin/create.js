const piècesList = JSON.parse(localStorage.getItem("piècesList"));

// handle create form
const createPiece = (event) => {
    event.preventDefault();
    const designation = document.getElementById("désignation").value;
    const prix_unitaire = document.getElementById("prix_unitaire").value;
    console.log(piècesList);
    if(piècesList){
        const newData = [...piècesList, {designation,prix_unitaire}];
        localStorage.setItem("piècesList", JSON.stringify(newData));
        console.log("added");
        window.location = "admin.html";
    }
}