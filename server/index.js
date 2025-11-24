// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// 1. IMPORTAR EL ARCHIVO DE RUTAS (Asegúrate que esta ruta sea correcta)
// Busca en: carpeta src -> carpeta routes -> archivo documentos.routes.js
const documentosRoutes = require('./src/routes/documentos.routes'); // <--- ¡ESTA LÍNEA ES VITAL!
const authRoutes = require('./src/routes/auth.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 2. USAR LAS RUTAS

app.use('/api/documentos', documentosRoutes);
app.use('/api/auth', authRoutes);
// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor OK');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});