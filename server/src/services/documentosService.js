// client/src/services/documentosService.js
import api from './api';

export const generarPdfRequest = async (datos) => {
  try {
    // Hacemos la petición POST a '/documentos/generar'
    // IMPORTANTE: 'responseType: blob' es OBLIGATORIO para descargar archivos
    const response = await api.post('/documentos/generar', datos, {
      responseType: 'blob', 
    });
    
    return response.data; // Esto devuelve el archivo binario (el PDF)
  } catch (error) {
    console.error("Error en servicio:", error);
    throw error;
  }
};