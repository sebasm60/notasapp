const { conection_pg } = require('../database/config');
const { response } = require('express');

const add = async (req, res = response) => {
    const { documento, nombres, apellidos, genero, estado, rol } = req.body;
    const queryInsert = `INSERT INTO escuela.profesores(documento, nombres, apellidos, genero, estado, rol) VALUES ($1, $2, $3, $4, $5, $6)`;
    const querySearchDocumento = `SELECT * FROM escuela.profesores where documento = ${documento}`;

    try {
        const responseDocumento = await conection_pg.query(querySearchDocumento);
        if (responseDocumento.rowCount > 0) return res.status(400).json({ ok: false, message: "Este documento ya se encuentra registrado." });

        await conection_pg.query(queryInsert, [documento, nombres, apellidos, genero, estado, rol]);
        return res.status(201).json({ ok: true, message: "Profesor creado correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const update = async (req, res = response) => {
    const { documento, nombres, apellidos, genero, estado, rol } = req.body;
    const queryUpdate = `UPDATE escuela.profesores	SET nombres=$1, apellidos=$2, genero=$3, estado=$4, rol=$5 WHERE documento = $6`;

    try {
        await conection_pg.query(queryUpdate, [nombres, apellidos, genero, estado, rol, documento]);
        return res.status(201).json({ ok: true, message: "Profesor actualizado correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const list = async (req, res = response) => {
    const query = `SELECT * FROM escuela.profesores`;
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
    const query = `SELECT * FROM escuela.profesores WHERE documento = $1`;
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