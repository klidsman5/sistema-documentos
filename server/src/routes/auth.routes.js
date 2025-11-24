// server/src/routes/auth.routes.js
const express = require('express');
const router = express.Router();

// 1. Importamos el controlador de autenticación (el cocinero de usuarios)
const { registrarUsuario, loginUsuario } = require('../controllers/authController');

// 2. Definimos las rutas (El Menú)

// POST para crear cuenta nueva
// URL Final: http://localhost:3000/api/auth/register
router.post('/register', registrarUsuario);

// POST para iniciar sesión
// URL Final: http://localhost:3000/api/auth/login
router.post('/login', loginUsuario);

module.exports = router;