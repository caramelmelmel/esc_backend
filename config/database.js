require('dotenv').config()

const { Pool } = require('pg')
const pool = new Pool({
    user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
	ssl: false
})

/*module.exports = {
	HOST: process.env.PGHOST,
	USER:process.env.PGUSER,
	PASSWORD: process.env.PGPASSWORD,
	DB: process.env.PGDATABASE,
	dialect: "postgres",
	pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
	}
  };*/
module.exports = pool;