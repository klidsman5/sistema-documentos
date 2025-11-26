// client/src/services/api.js
import axios from 'axios';

//instancia usando la Variable de Entorno
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// Antes de enviar cualquier petición, inyectamos el Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Funciones de la API
export const generarPdfRequest = async (datos) => {
  const response = await api.post('/documentos/generar', datos, {
    responseType: 'blob', // Importante para descargar archivos
  });
  return response.data;
};

export default api;