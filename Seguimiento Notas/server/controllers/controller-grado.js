const { conection_pg } = require('../database/config');
const { response } = require('express');

const add = async (req, res = response) => {
    const { grado } = req.body;
    const queryInsert = `INSERT INTO escuela.grado(grado) VALUES ($1)`;
    try {
        await conection_pg.query(queryInsert, [grado]);
        return res.status(201).json({ ok: true, message: "Grado creado correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const update = async (req, res = response) => {
    const { id_grado, grado } = req.body;
    const queryUpdate = `UPDATE escuela.grado	SET grado=$1 WHERE id_grado = $2`;

    try {
        await conection_pg.query(queryUpdate, [grado, id_grado]);
        return res.status(201).json({ ok: true, message: "Grado actualizado correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const list = async (req, res = response) => {
    const query = `SELECT * FROM escuela.grado`;
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
    const { id_grado } = req.body;
    const query = `SELECT * FROM escuela.grado WHERE id_grado = $1`;
    try {
        const { rowCount, rows } = await conection_pg.query(query, [id_grado]);
        if (rowCount === 0) return res.status(400).json({ ok: false, message: "No se encontraron datos." });

        return res.status(200).json({ ok: true, message: "Datos consultados correctamente", rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

module.exports = { add, update, list, search };