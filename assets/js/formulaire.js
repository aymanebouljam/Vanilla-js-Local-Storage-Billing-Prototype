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
        compteurContainer.innerHTML = "";

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
    const reviraine = event.target;
    const motifContainer = document.getElementById("motifContainer");
    const surfaceContainer = document.getElementById("surfaceContainer");
    const riveraineContainer = document.getElementById("riveraineContainer");
    if(reviraine.checked){
        motifContainer.innerHTML = "";
        surfaceContainer.innerHTML = `
            <input type="text" class="form-control" placeholder="Longueur" id="longueur" required>
            <input type="text" class="form-control"  placeholder="Largeur" id="largeur"  required>
            <input type="text" class="form-control w-100"  placeholder="Nombre des niveaux" id="étages"  required>
        `;
        riveraineContainer.innerHTML = `
             <input type="text" id="mtriveraine" class="form-control w-50" placeholder="Montant de la taxe riveraine" required>
        `;

    }else if(!reviraine.checked){
        motifContainer.innerHTML = `
            <input type="text" class="form-control" id="motif" placeholder="Motif de dispense">
        `;
        surfaceContainer.innerHTML = "";
        riveraineContainer.innerHTML = "";
    }
}

//handle Form
const handleForm = (event) => {
    event.preventDefault();
    localStorage.removeItem("data");
    const typeBranch = document.getElementById("typeBranch");
    const compteur = document.getElementById("compteur");
    const police = document.getElementById("police");
    const motif = document.getElementById("motif");
    const mtriveraine = document.getElementById("mtriveraine");
    const longueur = document.getElementById("longueur");
    const largeur = document.getElementById("largeur");
    const étages = document.getElementById("étages");
    const porteNiche = document.getElementById("porteNiche");


let poseAppareils = 0;
  if(objet.value === "déplacement de la niche"){
        poseAppareils = 1;
   
  }else{
        poseAppareils = compteur ? Number(compteur.value) + 1 : 3;
  }

    const formData = {
        nom : nom.value,
        prénom : prénom.value,
        objet : objet.value,
        typeBranch : typeBranch ? typeBranch.value : "déplacement de la niche",
        police : police ? police.value : "",
        compteur : compteur ? Number(compteur.value) : 2,
        poseAppareils : poseAppareils,
        mtriveraine : mtriveraine ? Number(mtriveraine.value) : 0,
        motif : motif ? motif.value : "",
        longueur : longueur ? Number(longueur.value) : 0,
        largeur : largeur ? Number(largeur.value) : 0,
        étages : étages ? parseInt(étages.value) : 0,
        porteNiche : porteNiche.checked ? 1 : 0,
    }
    localStorage.setItem("data", JSON.stringify(formData));
    if(objet.value === "déplacement de la niche"){
        if(confirm("Voulez-vous ajouter des pièces supplémentaires ?")){
            window.location.href = "table.html";
        }else{
            window.location.href = "devis.html";
        }
    }else{
        window.location.href = "table.html";
    }
   
};
