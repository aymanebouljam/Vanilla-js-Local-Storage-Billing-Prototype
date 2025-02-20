//form inputs 
const nom = document.getElementById("nom");
const prénom= document.getElementById("prénom");
const objet = document.getElementById("objet");
const compteurContainer = document.getElementById("compteur-container");
const policeContainer = document.getElementById("police-container");
const typeContainer = document.getElementById("type-container");


//handle select
const handleSelect = (event) => {
    const selected = event.target.value;
    typeContainer.innerHTML = "";
    policeContainer.innerHTML = "";
    

    if(selected === "nouveau branchement"){
        typeContainer.innerHTML = `
            <select class="form-control border-2"  id="typeBranch" onchange="handleType(event)" required>
                <option value="">-- Type de Branchement --</option>
                <option value="branchement en poly 25">Branchement 25</option>
                <option value="branchement en poly 50">Branchement 50</option>
            </select>
        `;
    }else if(selected === "modification de branchement"){
        typeContainer.innerHTML = `
        <select class="form-control border-2"  id="typeBranch" onchange="handleType(event)" required>
            <option value="">-- Type de Branchement --</option>
            <option value="modification de branchement de 1/2 à 3/4">Modification 20 à 25</option>
            <option value='modification de branchement de 1/2 à 1"1/2'>Modification 20 à 50</option>
            <option value='modification de branchement de 3/4 à 1"1/2'>Modification 25 à 50</option>
        </select>
    `;
        policeContainer.innerHTML = ` 
            <input type="text" placeholder="N° de Police" class="form-control" id="police" required>
        `;
    }else if(selected === "déplacement de la niche"){
        policeContainer.innerHTML = ` 
        <input type="text" placeholder="N° de Police" class="form-control" id="police" required>
        `;
    }
};

// handle Type
const handleType = (event) => {
    compteurContainer.innerHTML = "";
    const type = event.target.value;
    if(type === "branchement en poly 25" || type === "modification de branchement de 1/2 à 3/4"){
        compteurContainer.innerHTML = "";

    }else{
        compteurContainer.innerHTML = `
        <label class="form-label fs-5">Nombre de compteurs :</label>
        <input type="number" value="2" min="0" id="compteur" class="form-control w-25" required>
    `;

    }
};

//handle riveraine
const handleRiveraine = (event) => {
    const reviraine = Number(event.target.value);
    const motifContainer = document.getElementById("motifContainer");
    const surfaceContainer = document.getElementById("surfaceContainer");
    const riveraineContainer = document.getElementById("riveraineContainer");
    if(reviraine !== 0){
        motifContainer.innerHTML = "";
        surfaceContainer.innerHTML = `
            <input type="text" class="form-control" placeholder="Longueur" id="longueur" required>
            <input type="text" class="form-control"  placeholder="Largeur" id="largeur"  required>
            <input type="text" class="form-control w-100"  placeholder="Nombre des niveaux" id="étages"  required>
        `;
        riveraineContainer.innerHTML += `
             <input type="text" id="mtriveraine" class="form-control w-50" placeholder="Montant de la taxe riveraine" required>
        `;

    }else if(reviraine == 0){
        motifContainer.innerHTML = `
            <input type="text" class="form-control" id="motif" placeholder="Motif de dispense">
        `;
        surfaceContainer.innerHTML = "";
    }
}

//handle Form
const handleForm = (event) => {
    event.preventDefault();
    localStorage.removeItem("data");
    const typeBranch = document.getElementById("typeBranch");
    const compteur = document.getElementById("compteur");
    const police = document.getElementById("police");
    const riveraine = document.getElementById("riveraine");
    const motif = document.getElementById("motif");
    const mtriveraine = document.getElementById("mtriveraine");
    const longueur = document.getElementById("longueur");
    const largeur = document.getElementById("largeur");
    const étages = document.getElementById("étages");
  
let poseAppareils = 0;
  if(objet.value === "déplacement de la niche"){
        poseAppareils = 1;
  }else{
        poseAppareils = compteur ? compteur + 1 : 3;
  }

    const formData = {
        nom : nom.value,
        prénom : prénom.value,
        objet : objet.value,
        typeBranch : typeBranch ? typeBranch.value : "déplacement de la niche",
        police : police ? police.value : "",
        compteur : compteur ? Number(compteur.value) : 2,
        poseAppareils : poseAppareils,
        riveraine : Number(riveraine.value),
        mtriveraine : Number(mtriveraine.value),
        motif : motif ? motif.value : "",
        longueur : longueur ? Number(longueur.value) : "",
        largeur : largeur ? Number(largeur.value) : "",
        étages : étages ? parseInt(étages.value) : "",
    }
    localStorage.setItem("data", JSON.stringify(formData));
    window.location.href = "table.html";
};
