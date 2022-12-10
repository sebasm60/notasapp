const { conection_pg } = require('../database/config');
const { response } = require('express');

const add = async (req, res = response) => {
    const { documento, nombres, apellidos, genero, estado, rol, telefono, correo, direccion } = req.body;
    const queryInsert = `INSERT INTO escuela.acudientes(documento, nombres, apellidos, genero, estado, rol, telefono, correo, direccion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const querySearchDocumento = `SELECT * FROM escuela.acudientes where documento = ${documento}`;

    try {
        const responseDocumento = await conection_pg.query(querySearchDocumento);
        if (responseDocumento.rowCount > 0) return res.status(400).json({ ok: false, title: "Lo sentimos", message: "Este documento ya se encuentra registrado." });

        await conection_pg.query(queryInsert, [documento, nombres, apellidos, genero, estado, rol, telefono, correo, direccion]);
        return res.status(201).json({ ok: true, message: "Acudiente creado correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, title: "Oops!", message: "Lo sentimos algo ha salido mal.", error });
    };
};

const update = async (req, res = response) => {
    const { documento, nombres, apellidos, genero, estado, rol, telefono, correo, direccion } = req.body;
    const queryUpdate = `UPDATE escuela.acudientes	SET nombres=$1, apellidos=$2, genero=$3, estado=$4, rol=$5, telefono=$6, correo=$7, direccion=$8 WHERE documento = $9`;

    try {
        await conection_pg.query(queryUpdate, [nombres, apellidos, genero, estado, rol, telefono, correo, direccion, documento]);
        return res.status(201).json({ ok: true, message: "Acudiente actualizado correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const list = async (req, res = response) => {
    const query = `SELECT * FROM escuela.acudientes`;
    try {
        const { rowCount, rows } = await conection_pg.query(query);
        if (rowCount === 0) return res.status(400).json({ ok: false, message: "La base de datos esta vacia.." });

        return res.status(200).json({ ok: true, message: "Datos consultados correctamente", rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const search = async (req, res = response) => {
    const { documento } = req.body;
    const query = `SELECT * FROM escuela.acudientes WHERE documento = $1`;
    try {
        const { rowCount, rows } = await conection_pg.query(query, [documento]);
        if (rowCount === 0) return res.status(400).json({ ok: false, message: "No se encontraron datos." });

        return res.status(200).json({ ok: true, message: "Datos consultados correctamente", rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

module.exports = { add, update, list, search };