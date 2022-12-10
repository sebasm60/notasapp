const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) return res.status(401).json({ ok: false, message: ' Acceso denegado' });

    try {
        const { id_cuenta, user, documento, rol } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.id_cuenta = id_cuenta;
        req.user = user;
        req.documento = documento;
        req.rol = rol;

    } catch (error) {
        return res.status(401).json({ ok: false, message: "Token no válido", error });
    };

    next();
};

module.exports = { validarJWT };