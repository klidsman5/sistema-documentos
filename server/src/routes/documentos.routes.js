// server/src/routes/documentos.routes.js
const express = require('express');
const router = express.Router();

// 1. IMPORTACIÓN
// Asegúrate de que el nombre del archivo 'pdfController' sea EXACTO (mayúsculas/minúsculas)
const controlador = require('../controllers/pdfController');

console.log("Cargando rutas de documentos...");
console.log("¿Qué contiene el controlador?", controlador); // <--- ESTO NOS DIRÁ LA VERDAD

// Extraemos la función
const { generarPdf } = controlador;

// 2. VERIFICACIÓN DE SEGURIDAD
if (!generarPdf) {
    throw new Error(" ERROR CRÍTICO: No se encontró la función 'generarPdf' en el controlador. Revisa pdfController.js");
}

// 3. DEFINICIÓN DE RUTA
router.post('/generar', generarPdf);

module.exports = router;