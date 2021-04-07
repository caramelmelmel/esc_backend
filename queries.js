const Pool = require('pg').Pool
const pool = new Pool({
  user: 'final_try',
  host: 'localhost',
  database: 'sinkmysoul',
  password: 'password',
  port: 5432,
})