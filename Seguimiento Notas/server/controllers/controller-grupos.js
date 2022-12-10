const { conection_pg } = require('../database/config');
const { response } = require('express');

const add = async (req, res = response) => {
    const { grupo } = req.body;
    const queryInsert = `INSERT INTO escuela.grupo(grupo) VALUES ($1)`;

    try {
        await conection_pg.query(queryInsert, [grupo]);
        return res.status(201).json({ ok: true, message: "Grupo creado correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const update = async (req, res = response) => {
    const { id_grupo, grupo } = req.body;
    const queryUpdate = `UPDATE escuela.grupo SET grupo=$1 WHERE id_grupo = $2`;

    try {
        await conection_pg.query(queryUpdate, [grupo, id_grupo]);
        return res.status(201).json({ ok: true, message: "Grupo actualizado correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const list = async (req, res = response) => {
    const query = `SELECT * FROM escuela.grupo`;
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
    const { id_grupo } = req.body;
    const query = `SELECT * FROM escuela.grupo WHERE id_grupo = $1`;
    try {
        const { rowCount, rows } = await conection_pg.query(query, [id_grupo]);
        if (rowCount === 0) return res.status(400).json({ ok: false, message: "No se encontraron datos." });

        return res.status(200).json({ ok: true, message: "Datos consultados correctamente", rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

module.exports = { add, update, list, search };