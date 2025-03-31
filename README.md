# Water Billing System

A JavaScript-based application designed for a local water department to manage water connection services and fittings. This app allows the generation of invoices for water installation, fittings, and associated services, with the ability to export these invoices as both Excel and PDF files.

## Features
- **Generate detailed invoices** for water connections and fittings.
- **Manage unit prices** for fittings and water connection services.
- **Export invoices** to Excel and PDF formats.
- Fully functional offline and works locally.

## Technologies Used
- **JavaScript** (for functionality)
- **HTML/CSS** (for layout and design)
- **ExcelJS** (for Excel export functionality)
- **PDF.js** (for PDF generation)

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/aymanebouljam/Water-billing-vanilla-js.git
   ```
2. **Navigate to the project folder:**
   ```bash
   cd Water-billing-vanilla-js
   ```
3. **Open the index.html file in your browser to start using the app:** You can simply double-click the index.html file, or open it from your browser's "Open File" dialog to launch the app locally.
4. **Seed the local storage:**  
   - Open your browser and visit:  
     ```bash
     /assets/db/seed.html
     ```
   - Click on the **"pièces"** and **"frais"** buttons to populate the local storage with necessary data.

## Usage
- **Input Service Details:** Enter customer information, water connection type in the provided fields.
- **Select Fittings:** Choose the **fittings** required for the installation. Prices are automatically fetched from the database.
- **Generate Invoices:** After filling in the details, generate and download invoices in Excel or PDF format by clicking the respective export buttons.
