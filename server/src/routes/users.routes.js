const express = require('express');
const router = express.Router();
const prisma = require('../config/db'); 
const verificarToken = require('../middlewares/verificarToken'); 
const { 
    obtenerPerfil,
    obtenerUsuarios, 
    actualizarUsuario, 
    eliminarUsuario 
} = require('../controllers/userController');


router.get('/perfil', verificarToken, obtenerPerfil);
router.get('/lista', verificarToken, obtenerUsuarios);
router.put('/editar/:id', verificarToken, actualizarUsuario);
router.delete('/eliminar/:id', verificarToken, eliminarUsuario);

module.exports = router;