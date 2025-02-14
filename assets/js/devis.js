//handle devis table

const handleDevis = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const fraisInterv = 0.15;
    const TVA = 0.20;
    const tdevis = document.getElementById("tableDevis");

    let somme = 0;
   
    if(tdevis){
        tdevis.innerHTML = "";
        if(data.pièces && data.pièces.length>0){
            data.pièces.forEach(item => {
                tdevis.innerHTML += `
                <tr>
                    <td>${item.designation}</td>
                    <td>${item.prix_unitaire}</td>
                    <td>${item.quantité}</td>
                    <td>${Number(item.prix_unitaire) * Number(item.quantité)}</td>
                </tr>
            `;
                somme += Number(item.prix_unitaire) * Number(item.quantité);
            });
    
            const frais_intervention = somme * fraisInterv;
            const montant_tva = (somme + (somme * fraisInterv)) * TVA;
    
             tdevis.innerHTML += `
                <tr>
                    <td colspan="3">Total HT</td>
                    <td>${somme.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="3">Frais d'intervention (15%)</td>
                    <td>${frais_intervention.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="3">T.V.A 20%</td>
                    <td>${montant_tva.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="3">TOTAL GENERAL TTC</td>
                    <td>${(somme + frais_intervention + montant_tva).toFixed(2)}</td>
                </tr>
             `;
    
        }
    }
   
}

window.onload = handleDevis();


//export excel format

const handleExportTable = () => {
    const table = document.getElementById("dataTable");
    if (!table) {
        alert("Table not found!");
        return;
    }

    const worksheet = XLSX.utils.table_to_sheet(table); 
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    XLSX.writeFile(workbook, "facture EG.xlsx");
};

