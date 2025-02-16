const elements = JSON.parse(localStorage.getItem("fixe"));

// handle create form
const ajouterElement = (event) => {
    event.preventDefault();
    const designation = document.getElementById("désignation").value;
    const valeur = document.getElementById("valeur").value;
    console.log(designation, valeur);
    if(elements){
        const newData = [...elements, {designation,valeur}];
        localStorage.setItem("fixe", JSON.stringify(newData));
        window.location.href = "dash.html";
    }
}