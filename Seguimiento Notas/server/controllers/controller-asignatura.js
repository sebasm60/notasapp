const { conection_pg } = require('../database/config');
const { response } = require('express');

const add = async (req, res = response) => {
    const { nombre, estado } = req.body;
    const queryInsert = `INSERT INTO escuela.asignatura(nombre, estado) VALUES ($1, $2)`;
    const querySearchAsignatura = `SELECT * FROM escuela.asignatura WHERE nombre = $1`;

    try {
        const responseAsignatura = await conection_pg.query(querySearchAsignatura, [nombre]);
        if (responseAsignatura.rowCount > 0) return res.status(400).json({ ok: false, message: "Ya esiste una asignatura con este nombre." });

        await conection_pg.query(queryInsert, [nombre, estado]);
        return res.status(201).json({ ok: true, message: "Asignatura creada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const update = async (req, res = response) => {
    const { id, nombre, estado } = req.body;
    const queryUpdate = `UPDATE escuela.asignatura	SET nombre=$1, estado=$2 WHERE id = $3`;

    try {
        await conection_pg.query(queryUpdate, [nombre, estado, id]);
        return res.status(201).json({ ok: true, message: "Asignatura actualizada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const list = async (req, res = response) => {
    const query = `SELECT * FROM escuela.asignatura`;
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
    const { id } = req.body;
    const query = `SELECT * FROM escuela.asignatura WHERE id = $1`;
    try {
        const { rowCount, rows } = await conection_pg.query(query, [id]);
        if (rowCount === 0) return res.status(400).json({ ok: false, message: "No se encontraron datos." });

        return res.status(200).json({ ok: true, message: "Datos consultados correctamente", rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

module.exports = { add, update, list, search };