// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const documentosRoutes = require('./src/routes/documentos.routes'); 
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/users.routes');

const app = express();

// Middlewares
app.use(cors());//peticiones entre diferentes dominios
app.use(express.json());//covierte el json a un objeto de js

// USAR LAS RUTAS

app.use('/api/documentos', documentosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// Ruta de prueba
app.get('/', (req, res) => {//para verificar si el servidor esta corriendo
  res.send('Servidor OK');
});

const PORT = process.env.PORT|| 3000;;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
