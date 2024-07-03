const { Pool } = require('pg');
const functions = require('firebase-functions');

const pool = new Pool({
  user: functions.config().pg.user,
  host: functions.config().pg.host,
  database: functions.config().pg.database,
  password: functions.config().pg.password,
  port: functions.config().pg.port,
});
console.log(functions.config().pg);

module.exports = pool;
