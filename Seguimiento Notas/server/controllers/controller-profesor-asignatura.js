const { conection_pg } = require('../database/config');
const { response } = require('express');

const add = async (req, res = response) => {
    const { documento_profesor, id_asignatura } = req.body;
    const queryInsert = `INSERT INTO escuela.profesor_asignatura(documento_profesor, id_asignatura) VALUES ($1, $2)`;

    try {
        await conection_pg.query(queryInsert, [documento_profesor, id_asignatura]);
        return res.status(201).json({ ok: true, message: "Relación creada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const update = async (req, res = response) => {
    const { id_asignatura_profesor, documento_profesor, id_asignatura } = req.body;
    const queryUpdate = `UPDATE escuela.profesor_asignatura	SET documento_profesor=$1, id_asignatura=$2 WHERE id_asignatura_profesor = $3`;

    try {
        await conection_pg.query(queryUpdate, [documento_profesor, id_asignatura, id_asignatura_profesor]);
        return res.status(201).json({ ok: true, message: "Relación actualizada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const list = async (req, res = response) => {
    const query = `SELECT * FROM escuela.profesor_asignatura`;
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
    const { id_asignatura_profesor } = req.body;
    const query = `SELECT * FROM escuela.profesor_asignatura WHERE id_asignatura_profesor = $1`;
    try {
        const { rowCount, rows } = await conection_pg.query(query, [id_asignatura_profesor]);
        if (rowCount === 0) return res.status(400).json({ ok: false, message: "No se encontraron datos." });

        return res.status(200).json({ ok: true, message: "Datos consultados correctamente", rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

module.exports = { add, update, list, search };