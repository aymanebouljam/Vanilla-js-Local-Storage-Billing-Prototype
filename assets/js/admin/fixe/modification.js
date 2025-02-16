// fill the form
const fillForm = () => {
    const elements = JSON.parse(localStorage.getItem("fixe"));

    const urlParams = new URLSearchParams(window.location.search);
    const uncoded_param = urlParams.get("designation");
    const param = decodeURIComponent(uncoded_param);

    const designation = document.getElementById("désignation");
    const valeur = document.getElementById("valeur");

    if(elements){
        elements.forEach(element => {
            if(element.designation.toLowerCase() === param.toLowerCase()){
                designation.value = element.designation;
                valeur.value = element.valeur;
            }
        })
    }
}

window.onload = ()=>fillForm();


// Modify fixed elements

const modifierElement= (event) => {
    event.preventDefault();
    const designation = document.getElementById("désignation");
    const valeur = document.getElementById("valeur");

    const elements= JSON.parse(localStorage.getItem("fixe"));

    const urlParams = new URLSearchParams(window.location.search);
    const uncoded_param = urlParams.get("designation");
    const param = decodeURIComponent(uncoded_param);

    if(elements){
        const newData = elements.map(element => {
            if(element.designation.toLowerCase() === param.toLowerCase()){
                return {...element, designation : designation.value, valeur : valeur.value};
            }else{
                return element;
            }
        });
        localStorage.setItem("fixe", JSON.stringify(newData));
        window.location.href = "dash.html";
    }
}