
const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- REGISTRO ---
const registrarUsuario = async (req, res) => {
  try {
    const { email, password, nombre, rol } = req.body;

    // 1. Verificar si ya existe
    const existe = await prisma.user.findUnique({ where: { email } });
    if (existe) return res.status(403).json({ error: 'El email ya está registrado' });

    // 2. Encriptar contraseña (Hashing)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Guardar en Base de Datos
    const usuario = await prisma.user.create({
      data: {
        email,
        nombre,
        rol: rol || 'USER',
        password: passwordHash
      }
    });

    res.json({ message: 'Usuario creado con éxito', usuarioId: usuario.id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// --- LOGIN ---
const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar usuario
    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario) return res.status(400).json({ error: 'Credenciales inválidas' });

    // 2. Comparar contraseñas (La que escribió vs La encriptada)
    const valida = await bcrypt.compare(password, usuario.password);
    if (!valida) return res.status(400).json({ error: 'Credenciales inválidas' });

    // 3. Generar el Token 
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol, nombre: usuario.nombre }, // Datos a guardar en el token
      process.env.JWT_SECRET, // La clave secreta del .env
      { expiresIn: '8h' } 
    );

    res.json({ message: 'Bienvenido', token, usuario: { nombre: usuario.nombre, rol: usuario.rol } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el login' });
  }
};

module.exports = { registrarUsuario, loginUsuario };