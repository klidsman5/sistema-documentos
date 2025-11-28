// server/src/controllers/userController.js
const prisma = require('../config/db');


// GET perfil
const obtenerPerfil = async (req, res) => {
    try {
        const idUsuario = req.usuario.id;

        const usuarioReal = await prisma.user.findUnique({
            where: { id: idUsuario },
            select: {
                id: true,
                nombre: true,
                email: true,
                rol: true,
                createdAt: true
            }
        });

        res.json(usuarioReal);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener perfil' });
    }
};

// GET
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await prisma.user.findMany({
            select: {
                id: true,
                nombre: true,
                email: true,
                rol: true,
                createdAt: true
            }
        });
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
};

//PUT
const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, rol } = req.body; 

    try {
        const usuarioActualizado = await prisma.user.update({
            where: { id: Number(id) },
            data: { 
                nombre: nombre,
                rol: rol
            }
        });
        
        res.json({ message: "Usuario actualizado", usuario: usuarioActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar usuario (quizás el ID no existe)' });
    }
};

// DELETE
const eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({
            where: { id: Number(id) }
        });
        
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};

module.exports = { 
    obtenerPerfil,
    obtenerUsuarios, 
    actualizarUsuario, 
    eliminarUsuario 
};