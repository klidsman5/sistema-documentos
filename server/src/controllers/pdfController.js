const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const puppeteer = require('puppeteer');

const generarPdf = async (req, res) => {
  try {
    // 1. RECIBIR DATOS
    const { nombre, cargo, tareas, dni, tipoDoc, titulo } = req.body;

    console.log(`Solicitud recibida: ${tipoDoc} - ${titulo}`);

    // SELECCIONAR PLANTILLA
    let nombrePlantilla = 'reporte.ejs'; 

    // Si el código del documento es 'personal_dj', cambiamos de archivo
    if (tipoDoc === 'personal_dj') {
        nombrePlantilla = 'ats.ejs'; 
    } 
    // Si el código es 'afp_pago', usamos otro
    else if (tipoDoc === 'afp_pago') {
        nombrePlantilla = 'afp.ejs';
    }

    // 3. DEFINIR RUTA COMPLETA
    const rutaPlantilla = path.join(__dirname, '..', 'templates', nombrePlantilla);

    // Verificar que el archivo .ejs realmente exista
    if (!fs.existsSync(rutaPlantilla)) {
        console.warn(`No encontré ${nombrePlantilla}, usaré reporte.ejs por emergencia.`);
        
    }

    const html = await ejs.renderFile(rutaPlantilla, { 
        nombre, 
        cargo, 
        tareas, 
        dni,
        tituloDoc: titulo 
    });

    // 6. GENERAR PDF 
    const browser = await puppeteer.launch({ 
        headless: true, 
        args: ['--no-sandbox'] 
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({ 
        format: 'A4', 
        printBackground: true,
        margin: { top: '20px', bottom: '20px' }
    });

    await browser.close();

    // 7. ENVIAR AL CLIENTE
    res.contentType('application/pdf');
    res.send(pdfBuffer);

  } catch (error) {
    console.error("Error generando PDF:", error);
    res.status(500).send("Error interno: " + error.message);
  }
};

module.exports = { generarPdf };