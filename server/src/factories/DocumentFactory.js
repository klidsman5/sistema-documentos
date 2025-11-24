// server/src/factories/DocumentFactory.js

class DocumentFactory {
    
    // Este es nuestro "Catálogo" de configuraciones
    static getDocumentConfig(tipoDoc) {
        
        // Diccionario de estrategias (Mapa)
        const documentos = {
            'personal_dj': {
                template: 'ats.ejs',
                tituloDefault: 'DECLARACIÓN JURADA DE PERSONAL'
            },
            'afp_pago': {
                template: 'afp.ejs',
                tituloDefault: 'CONSTANCIA DE PAGO AFP'
            },
            // ¿Quieres uno nuevo? Lo agregas aquí y listo.
            'planilla_elec': {
                template: 'planilla.ejs',
                tituloDefault: 'PLANILLA ELECTRÓNICA'
            }
        };

        // Retornamos la configuración específica o una por defecto (Fallback)
        return documentos[tipoDoc] || {
            template: 'reporte.ejs',
            tituloDefault: 'REPORTE GENERAL'
        };
    }
}

module.exports = DocumentFactory;