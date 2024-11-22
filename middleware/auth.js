const jwt = require('jsonwebtoken');

function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: 'ACESSO NEGADO' });
    }

    try {
        const secret = process.env.SECRET;
        const decoded = jwt.verify(token, secret);

        req.user = {
            id: decoded.id, // ID do usuário extraído do token
        };

        jwt.verify(token, secret);
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token inválido' });
    }
}

module.exports = ensureAuthenticated; // Exporte diretamente a função