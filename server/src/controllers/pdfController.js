// server/src/controllers/pdfController.js
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const puppeteer = require('puppeteer');

const generarPdf = async (req, res) => {
  try {
    // 1. RECIBIR DATOS: Ahora recibimos también 'tipoDoc' y 'titulo' desde el Frontend
    const { nombre, cargo, tareas, dni, tipoDoc, titulo } = req.body;

    console.log(`📄 Solicitud recibida: ${tipoDoc} - ${titulo}`);

    // 2. SELECCIONAR PLANTILLA: Aquí está la magia nueva
    let nombrePlantilla = 'reporte.ejs'; // Por defecto usamos esta

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

    // 4. SEGURIDAD: Verificar que el archivo .ejs realmente exista
    if (!fs.existsSync(rutaPlantilla)) {
        console.warn(`⚠️ No encontré ${nombrePlantilla}, usaré reporte.ejs por emergencia.`);
        // Opcional: Forzar el uso de reporte.ejs si falla la específica
        // rutaPlantilla = path.join(__dirname, '..', 'templates', 'reporte.ejs');
    }

    // 5. RENDERIZAR HTML
    const html = await ejs.renderFile(rutaPlantilla, { 
        nombre, 
        cargo, 
        tareas, 
        dni,
        tituloDoc: titulo // Pasamos el título para que salga en el encabezado del PDF
    });

    // 6. GENERAR PDF (Puppeteer)
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
    console.error("❌ Error generando PDF:", error);
    res.status(500).send("Error interno: " + error.message);
  }
};

module.exports = { generarPdf };