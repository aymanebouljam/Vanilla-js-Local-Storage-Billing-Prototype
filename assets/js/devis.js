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
    const riveraine = data.riveraine;
    const motif = data.motif;
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
                    <td>${item.quantité}</td>
                    <td>${item.prix_unitaire}</td>        
                    <td>${(Number(item.prix_unitaire) * Number(item.quantité)).toFixed(2)}</td>
                </tr>
            `;
                somme += Number(item.prix_unitaire) * Number(item.quantité);
            });
            const intervention = somme * frais_intervention;
            const montant_tva = (somme + (somme * frais_intervention)) * tva;
            total = somme + intervention + montant_tva + riveraine;
        
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
                    <td>/td>
                    <td>${somme.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Frais d'intervention (${frais_intervention * 100}%)</td>
                    <td></td>
                    <td></td>
                    <td>${intervention.toFixed(2)}</td>
                </tr>
                 <tr>
                    <td>T.V.A ${tva * 100}%</td>
                    <td></td>
                    <td></td>
                    <td>${montant_tva.toFixed(2)}</td>
                </tr>
                 <tr>
                    <td>Taxe rivéraine ${riveraine === 0 ? `Réglée par ${motif ? motif : ""}` : "" }</td>
                    <td></td>
                    <td></td>
                    <td>${riveraine}</td>       
                </tr>
                <tr>
                    <td>TOTAL GÉNÉRAL TTC</td>
                    <td>--------</td>
                    <td>--------</td>
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
    const nourice = typeBranch === "déplacement de la niche" ? "" : `nourice à ${compteur} ${compteur > 1 ?"compteurs" : "compteur"}`;

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
        ["OFFICE NATIONAL DE L'ÉLECTRICITÉ ET DE L'EAU POTABLE"],   
        ["BRANCHE EAU"],
        ["DIRECTION RÉGIONALE: GUELMIM"], 
        ["CENTRE: BOUIZAKARNE"],
        ["C.C.P.N°: 106-28-C"],
        [`BOUIZAKARNE LE: ${year}`],
        ["Facture EG N°...................."],
        [""], 
        [`OBJET: ${typeBranch.toUpperCase()} ${nourice.toUpperCase()}`],
        [""], 
        [`(Nom du Tiers): ${nom.toUpperCase()} ${prénom.toUpperCase()}`],
        [`POLICE: ${police}`],
        [""], 
    ];

    headers.forEach((row, index) => {
        const excelRow = worksheet.addRow(row);
        const cell = excelRow.getCell(1);
    
        worksheet.mergeCells(`A${index + 1}:D${index + 1}`);
    
        cell.alignment = { horizontal: "center" , vertical: "middle",  wrapText: true };
        cell.font = globalFont;
        
        
        if ([6,11,12].includes(index)) {
            cell.alignment = { horizontal: "left" , vertical: "middle",  wrapText: true };
            cell.font = { bold : true };
        }else if([7].includes(index)){
            cell.alignment = { horizontal : "right" , vertical: "middle",  wrapText: true };
            cell.font = { bold : true };
        }else if([9].includes(index)){
            cell.font = { bold : true };
        }
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
            cell.alignment = { 
                horizontal: "center", 
                vertical: "middle",
                wrapText: true 
            };
        });
    });


    const lastRowIndex = worksheet.rowCount; 

    for(let i=16; i<= lastRowIndex; i++){
        worksheet.getCell(`A${i}`).alignment = { horizontal : "left",  vertical: "middle",  wrapText: true };
    };
    const liste = [0,1,2,3,4];
    liste.forEach(n => {
        worksheet.mergeCells(`A${lastRowIndex - n}:C${lastRowIndex - n}`);
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
        oddFooter: `Arrêtée la présente facture à la somme de: ${total.toFixed(2)} Dirhams.`
    };
    
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, "facture_EG.xlsx");
    });
}

// export pdf

function handleExportToPDF() {
    const { jsPDF } = window.jspdf;
    const data = JSON.parse(localStorage.getItem("data"));
    if (!data) {
        alert("Veuillez Créer un devis!");
        return;
    }

    const table = document.getElementById("dataTable");
    const nom = data.nom;
    const prénom = data.prénom;
    const police = data.police;
    const typeBranch = data.typeBranch;
    const compteur = data.compteur;
    const nourice = typeBranch === "déplacement de la niche" ? "" : `nourice à ${compteur} ${compteur > 1 ? "compteurs" : "compteur"}`;

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    const doc = new jsPDF();

    // Define headers
    const headers = [
        { text: "ROYAUME DU MAROC", align: "center" },
        { text: "OFFICE NATIONAL DE L'ÉLECTRICITÉ ET DE L'EAU POTABLE", align: "center" },
        { text: "BRANCHE EAU", align: "center" },
        { text: "DIRECTION RÉGIONALE: GUELMIM", align: "center" },
        { text: "CENTRE: BOUIZAKARNE", align: "center"},
        { text: "C.C.P.N°: 106-28-C", align: "center" },
        { text: `BOUIZAKARNE LE: ${formattedDate}`, align: "left" },
        { text: "Facture EG N°....................", align: "right" },
        { text: "", align: "center" },
        { text: `OBJET: ${typeBranch.toUpperCase()} ${nourice.toUpperCase()}`, align: "center" },
        { text: "", align: "center" },
        { text: `(Nom du Tiers): ${nom.toUpperCase()} ${prénom.toUpperCase()}`, align: "left" },
        { text: `POLICE: ${police}`, align: "left" }
    ];

    // Set global font size
    doc.setFontSize(10);
    doc.setLineHeightFactor(1.0);

   // Add headers to PDF with different alignments
   headers.forEach((header, index) => {
    const pageWidth = doc.internal.pageSize.width;
    const textWidth = doc.getStringUnitWidth(header.text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    
    let x;
    if (header.align === "center") {
        x = (pageWidth - textWidth) / 2;
    } else if (header.align === "left") {
        x = 20; 
    } else if(header.align === "right"){
        x = pageWidth - textWidth - 20;
    }
    
    doc.text(header.text, x, 10 + index * 5);
});


    // Extract table data
    const tableData = [];
    const rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
        const rowData = [];
        const cells = row.querySelectorAll("td, th");
        cells.forEach((cell) => {
            rowData.push(cell.innerText);
        });
        tableData.push(rowData);
    });

    // Add table to PDF
    doc.autoTable({
        head: [tableData[0]], 
        body: tableData.slice(1), 
        startY: 10 + headers.length * 5 + 5,
        didParseCell: function(data) {
           
            const isLastFiveRows = data.row.index >= tableData.length - 6 && data.row.index < tableData.length - 1;
            
           
            if (isLastFiveRows && data.column.index === 0) {
                data.cell.colSpan = 3;
            }
            
          
            if (isLastFiveRows && (data.column.index === 1 || data.column.index === 2)) {
                data.cell.text = '';
                };

            if (data.column.index === 0 && !data.cell.raw.includes("Désignation")) { 
                    data.cell.styles.halign = 'left';
                }
            },
        styles: {
            fontSize: 11,
            cellPadding: 1,
            valign: 'middle',
            halign: 'center',
            overflow: 'linebreak',
            lineWidth: 0.1,
            lineColor: [0, 0, 0]
        },
        headStyles: {
            fillColor: [240, 240, 240],
            textColor: [0, 0, 0],
            fontStyle: 'bold'
        },
        bodyStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0]
        },
        theme: 'grid'
    });

    // Footer
    const finalY = doc.lastAutoTable.finalY || doc.internal.pageSize.height;

    // Set font size for footer
    doc.setFontSize(10);


    const totalText = `Arrêtée la présente facture à la somme de: ${total.toFixed(2)} Dirhams.`;
    doc.text(totalText, 20, finalY + 20);

    // Save the PDF
    doc.save('facture_EG.pdf');

}

