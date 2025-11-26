const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const header = req.headers['authorization'];
    
    if (!header) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    // El formato suele ser: "Bearer eyJhbGc..."
    const [tipo, token] = header.split(' ');

    if (tipo !== 'Bearer' || !token) {
        return res.status(403).json({ error: 'Formato de token inválido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }

        req.usuario = decoded; 
        
        next();
    });
}

module.exports = verificarToken;