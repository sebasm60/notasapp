const { conection_pg } = require('../database/config');
const { response } = require('express');

const add = async (req, res = response) => {
    const { documento_estudiante, documento_acudiente } = req.body;
    const queryInsert = `INSERT INTO escuela.estudiante_acudiente(documento_estudiante, documento_acudiente) VALUES ($1, $2)`;
    try {
        await conection_pg.query(queryInsert, [documento_estudiante, documento_acudiente]);
        return res.status(201).json({ ok: true, message: "Relación creada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const update = async (req, res = response) => {
    const { id_acudiente_estudiante, documento_estudiante, documento_acudiente } = req.body;
    const queryUpdate = `UPDATE escuela.estudiante_acudiente SET documento_estudiante=$, documento_acudiente=$2 WHERE id_acudiente_estudiante = $3`;

    try {
        await conection_pg.query(queryUpdate, [documento_estudiante, documento_acudiente, id_acudiente_estudiante]);
        return res.status(201).json({ ok: true, message: "Relación actualizada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const list = async (req, res = response) => {
    const query = `SELECT * FROM escuela.estudiante_acudiente`;
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
    const { id_acudiente_estudiante } = req.body;
    const query = `SELECT * FROM escuela.estudiante_acudiente WHERE id_acudiente_estudiante = $1`;
    try {
        const { rowCount, rows } = await conection_pg.query(query, [id_acudiente_estudiante]);
        if (rowCount === 0) return res.status(400).json({ ok: false, message: "No se encontraron datos." });

        return res.status(200).json({ ok: true, message: "Datos consultados correctamente", rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

module.exports = { add, update, list, search };