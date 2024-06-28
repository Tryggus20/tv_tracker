const pg = require('pg');
let pool;

if (process.env.DATABASE_URL) {
  // This is for Heroku or other environments where DATABASE_URL is provided
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else if (process.env.GCLOUD_SQL_CONNECTION_NAME) {
  // This is for Google Cloud SQL
  pool = new pg.Pool({
    user: process.env.DB_USER,
    host: `/cloudsql/${process.env.GCLOUD_SQL_CONNECTION_NAME}`, // Cloud SQL instance connection name
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432, // Default PostgreSQL port
  });
} else {
  // This is for local development
  pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'tv_tracker',
  });
}

module.exports = pool;
