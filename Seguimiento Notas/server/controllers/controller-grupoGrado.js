const { conection_pg } = require('../database/config');
const { response } = require('express');

const add = async (req, res = response) => {
    const { id_grupo, id_grado } = req.body;
    const queryInsert = `INSERT INTO escuela.grupo_grado(id_grupo, id_grado) VALUES ($1, $2)`;
    try {
        await conection_pg.query(queryInsert, [id_grupo, id_grado]);
        return res.status(201).json({ ok: true, message: "Relacion creada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const update = async (req, res = response) => {
    const { id_grupogrado, id_grupo, id_grado } = req.body;
    const queryUpdate = `UPDATE escuela.grupo_grado	SET id_grupo=$1, id_grado=$2 WHERE id_grupogrado = $3`;

    try {
        await conection_pg.query(queryUpdate, [id_grupo, id_grado, id_grupogrado]);
        return res.status(201).json({ ok: true, message: "Relacion actualizada correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

const list = async (req, res = response) => {
    const query = `SELECT * FROM escuela.grupo_grado`;
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
    const { id_grupogrado } = req.body;
    const query = `SELECT * FROM escuela.grupo_grado WHERE id_grupogrado = $1`;
    try {
        const { rowCount, rows } = await conection_pg.query(query, [id_grupogrado]);
        if (rowCount === 0) return res.status(400).json({ ok: false, message: "No se encontraron datos." });

        return res.status(200).json({ ok: true, message: "Datos consultados correctamente", rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: "Ocurrio un error", error });
    };
};

module.exports = { add, update, list, search };