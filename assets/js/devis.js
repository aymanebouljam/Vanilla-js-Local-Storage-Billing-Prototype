//Redirect
const checkData = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    if(!data){
        window.location.href = "formulaire.html";
    }
}
// global total
let total = 0;

//handle devis table
const handleDevis = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const tdevis = document.getElementById("tableDevis");
    const elements = JSON.parse(localStorage.getItem("fixe"));
    let installationPrise;
    let tva;
    let frais_intervention;
    let somme = 0;
    if(elements){
        elements.forEach(element => {
            switch(true){
                case element.designation.toLowerCase().includes("Installation de la prise".toLowerCase()):
                    installationPrise = element.valeur;
                    break;
                case element.designation.toLowerCase().includes("Tva".toLowerCase()):
                    tva = element.valeur;
                    break;
                case element.designation.toLowerCase().includes("Frais intervention".toLowerCase()):
                    frais_intervention = element.valeur;
                    break;
                default:
                    break;
            }
        })
    }
   
    if(tdevis){
        tdevis.innerHTML = "";
        if(data.pièces && data.pièces.length>0){
            data.pièces.forEach(item => {
                tdevis.innerHTML += `
                <tr>
                    <td>${item.designation}</td>
                    <td>${item.prix_unitaire}</td>
                    <td>${item.quantité}</td>
                    <td>${(Number(item.prix_unitaire) * Number(item.quantité)).toFixed(2)}</td>
                </tr>
            `;
                somme += Number(item.prix_unitaire) * Number(item.quantité);
            });
            const intervention = somme * frais_intervention;
            const montant_tva = (somme + (somme * frais_intervention)) * tva;
            total = somme + intervention + montant_tva;
        
             tdevis.innerHTML += `
                <tr>
                    <td>Installation de la prise</td>
                    <td>${installationPrise}</td>
                    <td>1</td>
                    <td>${installationPrise}</td>
                </tr>
                <tr>
                    <td>Total HT</td>
                    <td></td>
                    <td></td>
                    <td>${somme.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Frais d'intervention (${frais_intervention * 10}%)</td>
                    <td></td>
                    <td></td>
                    <td>${intervention.toFixed(2)}</td>
                </tr>
                 <tr>
                    <td>T.V.A ${tva * 10}%</td>
                    <td></td>
                    <td></td>
                    <td>${montant_tva.toFixed(2)}</td>
                </tr>
                 <tr>
                    <td>Taxe rivéraine</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>TOTAL GÉNÉRAL TTC</td>
                    <td></td>
                    <td></td>
                    <td>${(total).toFixed(2)}</td>
                </tr>
             `;
    
        }
    }
   
}
window.onload = () => {
    checkData();
    handleDevis();
};

//export excel format

function handleExportTable() {
    const data = JSON.parse(localStorage.getItem("data"));
    const table = document.getElementById("dataTable");
    const nom = data.nom;
    const prénom = data.prénom;
    const police = data.police;
    const typeBranch = data.typeBranch;
    const compteur = data.compteur;
    const nourice = typeBranch === "déplacement de la niche" ? "" : `nourice à ${compteur} compteurs`;
    const currentDate = new Date();
    const year = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;


    if (!data) {
        alert("Veuillez Créer un devis!");
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Facture EG");

    const borderStyle = {
        top: { style: "medium" },
        left: { style: "medium" },
        bottom: { style: "medium" },
        right: { style: "medium" }
    };

    const globalFont = { size: 14, bold: false };

    const headers = [
        ["ROYAUME DU MAROC"],
        ["Facture EG N°"],
        ["OFFICE NATIONAL DE L'ELECTRICITE ET DE L'EAU POTABLE"],
        [`BOUIZAKARNE LE: ${year}`],
        ["BRANCHE EAU"],
        ["DIRECTION REGIONALE: GUELMIM"],
        ["CENTRE: BOUIZAKARNE"],
        ["C.C.P.N°: 106-28-C"],
        [`OBJET: ${typeBranch.toUpperCase()} ${nourice}`],
        [`(Nom du Tiers): ${nom.toUpperCase()} ${prénom.toUpperCase()}`],
        [`POLICE: ${police}`],
        [""], 
        [""], 
    ];

    headers.forEach((text, rowIndex) => {
        const row = worksheet.addRow(text);
        row.font = globalFont;
        worksheet.mergeCells(`A${rowIndex + 1}:D${rowIndex + 1}`);
        row.getCell(1).alignment = { horizontal: "left" };
    });

    let tableStartRow = headers.length + 1;
    const rows = table.querySelectorAll("tr");
    
    rows.forEach((row) => {
        const cells = row.querySelectorAll("td, th");
        const excelRow = worksheet.addRow([...cells].map(cell => cell.innerText));

        cells.forEach((_, colIndex) => {
            const cell = excelRow.getCell(colIndex + 1);
            cell.border = borderStyle; 
            cell.font = globalFont; 
            cell.alignment = { horizontal: "center", vertical: "middle" };
        });
    });

    worksheet.columns.forEach((col,index) => {
        if (index === 1 || index === 2) {  
            col.width = 15;  
        } else if(index === 0) {
            col.width = 40;
        } else{
            col.width = 20;
        }
    });
   
    worksheet.headerFooter = {
        oddFooter: `Arrêté la présente facture à la somme de: ${total} Dirhams`
    };
        
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, "facture_EG.xlsx");
    });
}


