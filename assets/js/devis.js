//Redirect
const checkData = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    if(!data){
        window.location.href = "formulaire.html";
    }
}

//handle devis table
const handleDevis = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const tdevis = document.getElementById("tableDevis");
    const elements = JSON.parse(localStorage.getItem("fixe"));
    let somme = 0;
    let installationPrise;
    let tva;
    let frais_intervention;
    let pose20;
    let pose25;
    let pose50;

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
                case element.designation.toLowerCase().includes("'Pose Tuyau pol HD 20".toLowerCase()):
                    pose20 = element.valeur;
                    break;
                case element.designation.toLowerCase().includes("'Pose Tuyau pol HD 25".toLowerCase()):
                    pose25 = element.valeur;
                    break;
                case element.designation.toLowerCase().includes("'Pose Tuyau pol HD 50".toLowerCase()):
                    pose50 = element.valeur;
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
            const frais_intervention = somme * fraisInterv;
            const montant_tva = (somme + (somme * fraisInterv)) * tva;
    
             tdevis.innerHTML += `
                <tr>
                    <td>Installation de la prise</td>
                    <td>1</td>
                    <td>${installationPrise}</td>
                    <td>${installationPrise}</td>
                </tr>
                <tr>
                    <td>Total HT</td>
                    <td></td>
                    <td></td>
                    <td>${somme.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Frais d'intervention (15%)</td>
                    <td></td>
                    <td></td>
                    <td>${frais_intervention.toFixed(2)}</td>
                </tr>
                 <tr>
                    <td>T.V.A 20%</td>
                    <td></td>
                    <td></td>
                    <td>${tva.toFixed(2)}</td>
                </tr>
                 <tr>
                    <td>Taxe riveraine</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>TOTAL GENERAL TTC</td>
                    <td></td>
                    <td></td>
                    <td>${(somme + frais_intervention + montant_tva).toFixed(2)}</td>
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

    // Add header information (leaves empty rows to separate from the table)
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

    // Add table data (starting after header + extra empty rows)
    let tableStartRow = headers.length + 1;
    const rows = table.querySelectorAll("tr");
    
    rows.forEach((row) => {
        const cells = row.querySelectorAll("td, th");
        const excelRow = worksheet.addRow([...cells].map(cell => cell.innerText));

        // Apply border to each cell in the row
        cells.forEach((_, colIndex) => {
            const cell = excelRow.getCell(colIndex + 1);
            cell.border = borderStyle; 
            cell.font = globalFont; 
            cell.alignment = { horizontal: "center", vertical: "middle" };
        });
    });

    // Adjust column widths
    worksheet.columns.forEach(col => {
        col.width = 35;
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, "facture_EG.xlsx");
    });
}


