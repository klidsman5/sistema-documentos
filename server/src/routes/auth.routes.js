const express = require('express');
const router = express.Router();

//controlador de autenticación
const { registrarUsuario, loginUsuario } = require('../controllers/authController');


router.post('/register', registrarUsuario);

router.post('/login', loginUsuario);

module.exports = router;