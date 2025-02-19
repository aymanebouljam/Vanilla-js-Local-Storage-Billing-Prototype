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
    const mtriveraine = data.mtriveraine;
    const longueur = data.longueur;
    const largeur= data.largeur;
    const étages = data.étages;
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
            const ht = somme + installationPrise;
            const intervention =  ht * frais_intervention;
            const montant_tva = (ht + (ht * frais_intervention)) * tva;
            total = ht + intervention + montant_tva + (riveraine * mtriveraine);
            
        
             tdevis.innerHTML += `
                <tr>
                    <td>Installation de la prise</td>
                    <td>1</td>
                    <td>${installationPrise.toFixed(2)}</td>     
                    <td>${installationPrise.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Total HT</td>
                    <td></td>
                    <td></td>
                    <td>${(somme + installationPrise).toFixed(2)}</td>
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
                    <td>Taxe riveraine: ${riveraine === 0 ? (motif ? `Réglée par ${motif}` : "") : `${longueur.toFixed(2)} x ${largeur.toFixed(2)} ${étages === 0 ? "RDC" : `R+${étages}` }` }</td>
                    <td>${riveraine.toFixed(2)}</td>
                    <td>${mtriveraine.toFixed(2)}</td>
                    <td>${(riveraine * mtriveraine).toFixed(2)}</td>       
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

// Numbers to words
function numberToFrenchWords(number) {
    const ones = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
    const teens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
    const tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante", "quatre-vingt", "quatre-vingt"];

    if (number === 0) return "zéro";

    if (number < 10) return ones[number];

    if (number < 20) return teens[number - 10];

    if (number < 100) {
        let ten = Math.floor(number / 10);
        let unit = number % 10;
        let separator = unit === 1 && ten !== 8 ? " et " : "-";

        if (ten === 7 || ten === 9) {
            return tens[ten] + separator + teens[unit];
        } else {
            return tens[ten] + (unit ? separator + ones[unit] : "");
        }
    }

    if (number < 1000) {
        let hundred = Math.floor(number / 100);
        let remainder = number % 100;
        let hundredPrefix = hundred > 1 ? ones[hundred] + " cent" : "cent";

        return hundredPrefix + (remainder ? (hundred > 1 && remainder < 10 ? " " : " ") + numberToFrenchWords(remainder) : "");
    }

    if (number < 1000000) {
        let thousand = Math.floor(number / 1000);
        let remainder = number % 1000;
        let thousandPrefix = thousand === 1 ? "mille" : numberToFrenchWords(thousand) + " mille";

        return thousandPrefix + (remainder ? " " + numberToFrenchWords(remainder) : "");
    }

    if (number < 1000000000) {
        let million = Math.floor(number / 1000000);
        let remainder = number % 1000000;
        let millionPrefix = million === 1 ? "un million" : numberToFrenchWords(million) + " millions";

        return millionPrefix + (remainder ? " " + numberToFrenchWords(remainder) : "");
    }

    return number.toString();
}



// Handle decimal
function convertTotalToWords(total) {
    const [integerPart, decimalPart] = total.toFixed(2).split("."); 

    const integerWords = numberToFrenchWords(parseInt(integerPart)) + " Dirhams";
    const decimalValue = parseInt(decimalPart);

    let decimalWords = "";
    if (decimalValue > 0) {
        decimalWords = " et " + numberToFrenchWords(decimalValue) + 
                       (decimalValue === 1 ? " Centime" : " Centimes");
    }

    return integerWords + decimalWords;
}




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
    const year = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;


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

 //
// First Row: "ROYAUME DU MAROC" (Left) & "Facture EG..." (Right)
worksheet.getCell("A1").value = "ROYAUME DU MAROC";
worksheet.getCell("D1").value = "Facture EG N°....................";
worksheet.mergeCells("A1:B1");
worksheet.getCell("A1").alignment = { horizontal: "left", vertical: "middle" };
worksheet.getCell("D1").alignment = { horizontal: "right", vertical: "middle" };
worksheet.getCell("D1").font = { bold: true };

// Second Row: "OFFICE NATIONAL..." (Left) & "BOUIZAKARNE LE..." (Right)
worksheet.getCell("A2").value = "OFFICE NATIONAL DE L'ÉLECTRICITÉ ET DE L'EAU POTABLE";
worksheet.getCell("D2").value = `BOUIZAKARNE LE: ${year}`;
worksheet.mergeCells("A2:B2");
worksheet.getCell("A2").alignment = { horizontal: "left", vertical: "middle" };
worksheet.getCell("D2").alignment = { horizontal: "right", vertical: "middle" };
worksheet.getCell("D2").font = { bold: true };

// Third Row: "BRANCHE EAU"
worksheet.getCell("A3").value = "BRANCHE EAU";
worksheet.mergeCells("A3:D3");
worksheet.getCell("A3").alignment = { horizontal: "left", vertical: "middle" };


// Fourth Row: "DIRECTION RÉGIONALE: GUELMIM"
worksheet.getCell("A4").value = "DIRECTION RÉGIONALE: GUELMIM";
worksheet.mergeCells("A4:D4");
worksheet.getCell("A4").alignment = { horizontal: "left", vertical: "middle" };

// Fifth Row: "CENTRE: BOUIZAKARNE"
worksheet.getCell("A5").value = "CENTRE: BOUIZAKARNE";
worksheet.mergeCells("A5:D5");
worksheet.getCell("A5").alignment = { horizontal: "left", vertical: "middle" };

// Sixth Row: "C.C.P.N°: 106-28-C"
worksheet.getCell("A6").value = "C.C.P.N°: 106-28-C";
worksheet.mergeCells("A6:D6");
worksheet.getCell("A6").alignment = { horizontal: "left", vertical: "middle" };

// Empty Row for Spacing
worksheet.getCell("A7").value = "";
worksheet.mergeCells("A7:D7");

// Eighth Row: "OBJET: ..."
worksheet.getCell("A8").value = `OBJET: ${typeBranch.toUpperCase()} ${nourice.toUpperCase()}`;
worksheet.mergeCells("A8:D8");
worksheet.getCell("A8").alignment = { horizontal: "left", vertical: "middle" };
worksheet.getCell("A8").font = { bold: true };

// Empty Row for Spacing
worksheet.getCell("A9").value = "";
worksheet.mergeCells("A9:D9");

// Tenth Row: "(Nom du Tiers): ..."
worksheet.getCell("A10").value = `(Nom du Tiers): ${nom.toUpperCase()} ${prénom.toUpperCase()}`;
worksheet.mergeCells("A10:D10");
worksheet.getCell("A10").alignment = { horizontal: "center", vertical: "middle" };
worksheet.getCell("A10").font = { bold: true };

// Eleventh Row: "POLICE: ..."
worksheet.getCell("A11").value = `POLICE: ${police}`;
worksheet.mergeCells("A11:D11");
worksheet.getCell("A11").alignment = { horizontal: "center", vertical: "middle" };
worksheet.getCell("A11").font = { bold: true };

// Empty Row for Spacing
worksheet.getCell("A12").value = "";
worksheet.mergeCells("A12:D12");
 //

    let tableStartRow = worksheet.rowCount + 1;

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
    const liste = [0,2,3,4];
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

    const totalInWords = convertTotalToWords(total);
    const capitalizedTotalInWords = totalInWords.charAt(0).toUpperCase() + totalInWords.slice(1);
    worksheet.headerFooter = {
        oddFooter: `Arrêtée la présente facture à la somme de: ${capitalizedTotalInWords}.`
    };
    
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, `${nom}_${prénom}.xlsx`);
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
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;


    const doc = new jsPDF();

   //
   const headers = [
    { text: "", align: "center", x: doc.internal.pageSize.width / 2, y: 98 },
    { text: "ROYAUME DU MAROC", align: "left", x: 20, y: 10 },
    { text: "Facture EG N°....................", align: "right", x: doc.internal.pageSize.width - 20, y: 10 },

    { text: "OFFICE NATIONAL DE L'ÉLECTRICITÉ ET DE L'EAU POTABLE", align: "left", x: 20, y: 18 },
    { text: `BOUIZAKARNE LE: ${formattedDate}`, align: "right", x: doc.internal.pageSize.width - 20, y: 18 },

    { text: "BRANCHE EAU", align: "left", x: 20, y: 26 },

    { text: "DIRECTION RÉGIONALE: GUELMIM", align: "left", x: 20, y: 34 },
    { text: "CENTRE: BOUIZAKARNE", align: "left", x: 20, y: 42 },
    { text: "C.C.P.N°: 106-28-C", align: "left", x: 20, y: 50 },

    { text: "", align: "center", x: doc.internal.pageSize.width / 2, y: 58 }, 

    { text: `OBJET: ${typeBranch.toUpperCase()} ${nourice.toUpperCase()}`, align: "left", x: 20, y: 66 },

    { text: "", align: "center", x: doc.internal.pageSize.width / 2, y: 74 }, 

    { text: `(Nom du Tiers): ${nom.toUpperCase()} ${prénom.toUpperCase()}`, align: "center", x: doc.internal.pageSize.width / 2, y: 82 },

    { text: `POLICE: ${police}`, align: "center", x: doc.internal.pageSize.width / 2, y: 90 },

   
    { text: "", align: "center", x: doc.internal.pageSize.width / 2, y: 98 },
    { text: "", align: "center", x: doc.internal.pageSize.width / 2, y: 106 },
    { text: "", align: "center", x: doc.internal.pageSize.width / 2, y: 114 },
];



// Set global font size and line height
doc.setFontSize(10);
doc.setLineHeightFactor(1.0);

// Add headers to PDF with different alignments
headers.forEach((header,index) => {
    const textWidth = doc.getStringUnitWidth(header.text) * doc.internal.getFontSize() / doc.internal.scaleFactor;

    if ([2,4,10,12,13].includes(index)) { 
        doc.setFont("helvetica", "bold"); 
    } else {
        doc.setFont("helvetica", "normal"); 
    }
    
    // Align text according to the defined positions
    if (header.align === "left") {
        doc.text(header.text, header.x, header.y);
    } else if (header.align === "center") {
        let x = (doc.internal.pageSize.width - textWidth) / 2; 
        doc.text(header.text, x, header.y);
    } else if (header.align === "right") {
        doc.text(header.text, header.x - textWidth, header.y); 
    }
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
           
            const isLastFourRows = (data.row.index >= tableData.length - 6 && data.row.index !== tableData.length - 3) && data.row.index < tableData.length - 1;
     
           
            if (isLastFourRows && data.column.index === 0) {
                data.cell.colSpan = 3;
            }
            
          
            if (isLastFourRows && (data.column.index === 1 || data.column.index === 2)) {
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

    const totalInWords = convertTotalToWords(total);
    const capitalizedTotalInWords = totalInWords.charAt(0).toUpperCase() + totalInWords.slice(1);
    const totalText = `Arrêtée la présente facture à la somme de: ${capitalizedTotalInWords}.`;
    doc.text(totalText, 20, finalY + 20);

    // Save the PDF
    doc.save(`${nom}_${prénom}.pdf`);

}

