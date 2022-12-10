const { conection_pg } = require('../database/config');
const { generarJWT } = require('../helpers/jwt');
const { response } = require('express');
const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');

const Signup = async (req, res = response) => {
    let { documento, pass, user, rol } = req.body;
    const queryInsert = `INSERT INTO escuela.cuentas(id_cuenta, documento, "user", pass, rol) VALUES ($1, $2, $3, $4, $5)`;
    const querySearchDocumento = `SELECT * FROM escuela.personas WHERE documento = '${documento}'`;
    const querySearchUsuario = `SELECT * FROM escuela.cuentas WHERE user = '${user}'`;
    const querySearchCuenta = `SELECT * FROM escuela.cuentas WHERE documento = '${documento}'`;

    try {
        const responseDocumento = await conection_pg.query(querySearchDocumento);
        if (responseDocumento.rowCount === 0) return res.status(400).json({ ok: false, message: "El usuario no se encuentra en la base de datos." });

        const responseDocumentoCuenta = await conection_pg.query(querySearchCuenta);
        if (responseDocumentoCuenta.rowCount > 0) return res.status(400).json({ ok: false, message: "Este documento ya se encuentra asociado a un user." });

        const responseCuenta = await conection_pg.query(querySearchUsuario);
        if (responseCuenta.rowCount > 0) return res.status(400).json({ ok: false, message: "Este usuario se encuentra en uso." });

        const id = v4();
        const salt = bcrypt.genSaltSync();
        pass = bcrypt.hashSync(pass, salt);

        await conection_pg.query(queryInsert, [id, documento, user, pass, rol]);
        const token = await generarJWT(user, id, documento, rol);

        return res.status(201).json({ ok: true, title: "Registro exitoso", message: "Usuario creado correctamente", token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const Login = async (req, res = response) => {

    let { pass, user } = req.body;
    const querySearch = `SELECT * FROM escuela.cuentas WHERE "user" = '${user}'`;

    try {
        const { rows, rowCount, fields } = await conection_pg.query(querySearch);
        if (rowCount === 0) return res.status(400).json({ ok: false, title: "Error al iniciar sesión", message: "Usuario o contraseña incorrectos." });

        const comparePass = bcrypt.compareSync(pass, rows[0].pass);

        if (!comparePass) return res.status(400).json({ ok: false, title: "Error al iniciar sesión", message: "Usuario o contraseña incorrectos." });

        const token = await generarJWT(rows[0].user, rows[0].id_cuenta, rows[0].documento, rows[0].rol);

        return res.status(200).json({
            ok: true,
            title: 'Sesión iniciada correctamente.',
            message: 'Bienvenido de nuevo.',
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const renewToken = async (req, res = response) => {

    const { id_cuenta, user, documento, rol } = req;

    const token = await generarJWT(id_cuenta, user, documento, rol);

    return res.status(201).json({ ok: true, title: "token", message: "token", token });
};

module.exports = { Login, Signup, renewToken };