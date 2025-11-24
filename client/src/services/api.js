import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const generarPdfRequest = async (datos) => {
  const response = await api.post('/documentos/generar', datos, {
    responseType: 'blob',
  });
  return response.data;
};

export default api;