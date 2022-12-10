const { conection_pg } = require('../database/config');
const { response } = require('express');

const add = async (req, res = response) => {
    const { documento_estudiante, id_asignatura, nota, fecha } = req.body;
    const queryInsert = `INSERT INTO escuela.estudiante_calificaciones(documento_estudiante, id_asignatura, nota, fecha) VALUES ($1, $2, $3, $4)`;
    try {
        await conection_pg.query(queryInsert, [documento_estudiante, id_asignatura, nota, fecha]);
        return res.status(201).json({ ok: true, message: "Relación creada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const update = async (req, res = response) => {
    const { id_calificacion, documento_estudiante, id_asignatura, nota, fecha } = req.body;
    const queryUpdate = `UPDATE escuela.estudiante_calificaciones SET documento_estudiante=$1, id_asignatura=$2, nota=$3, fecha=$4 WHERE id_calificacion = $5`;

    try {
        await conection_pg.query(queryUpdate, [documento_estudiante, id_asignatura, nota, fecha, id_calificacion]);
        return res.status(201).json({ ok: true, message: "Relación actualizada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const list = async (req, res = response) => {
    const query = `SELECT * FROM escuela.estudiante_calificaciones`;
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
    const { id_calificacion } = req.body;
    const query = `SELECT * FROM escuela.estudiante_calificaciones WHERE id_calificacion = $1`;
    try {
        const { rowCount, rows } = await conection_pg.query(query, [id_calificacion]);
        if (rowCount === 0) return res.status(400).json({ ok: false, message: "No se encontraron datos." });

        return res.status(200).json({ ok: true, message: "Datos consultados correctamente", rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

module.exports = { add, update, list, search };