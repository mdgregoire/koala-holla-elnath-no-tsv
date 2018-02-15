const pg = require('pg');
const Pool = pg.Pool;

const config= {
    database: 'koala',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillies: 5000
};

const pool = new Pool(config);

module.exports = pool;