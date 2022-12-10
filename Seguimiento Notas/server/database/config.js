const { Pool } = require('pg');

const config = {
    user: 'postgres',
    host: 'localhost',
    password: '123456',
    database: 'escuela',
};

const pool = new Pool(config);

module.exports = {
    conection_pg: pool,
};