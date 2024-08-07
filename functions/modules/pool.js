const pg = require('pg');

// const pool = new Pool({
//   host: PGHOST,
//   database: PGDATABASE,
//   username: PGUSER,
//   password: PGPASSWORD,
//   port: 5432,
//   ssl: {
//     require: true,
//   },
// });
// async function getPgVersion() {
//   const client = await pool.connect();
//   try {
//     const result = await client.query('SELECT version()');
//     console.log(result.rows[0]);
//   } finally {
//     client.release();
//   }
// }
// getPgVersion();

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.database_url,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;

// } else if (process.env.GCLOUD_SQL_CONNECTION_NAME) {
//   // This is for Google Cloud SQL
//   pool = new pg.Pool({
//     user: process.env.DB_USER,
//     host: `/cloudsql/${process.env.GCLOUD_SQL_CONNECTION_NAME}`, // Cloud SQL instance connection name
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: 5432, // Default PostgreSQL port
//   });
// } else {
//   // This is for local development
//   pool = new pg.Pool({
//     host: 'localhost',
//     port: 5432,
//     database: 'tv_tracker',
//   });
// }

module.exports = pool;
