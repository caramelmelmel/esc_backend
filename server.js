
const passport = require('passport')
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const express = require('express');
const app = express()
const router = express.Router()
//const babelpfill = require('babel-polyfill')
const cors = require('cors');
const dotenv = require('dotenv')
const port = 3000;
const {Pool,Client} = require('pg');

//import the routes here 
//const tenantroute = require('./routes/tenantRoute')(app)
//const staffroute = require('./routes/staffRoute')(app)
dotenv.config();

const tenant = require('./routes/tenantRoute')

const staff = require('./routes/staffRoute')

const bodyParser = require("body-parser");
const pool = new Pool({
  user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
	ssl: false
});


//8081 is to listen


app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// parse requests of content-type - application/x-www-form-urlencoded
// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
//tenant routes
//console.log(`${tenantctrller.createTenant}`)
app.use('/tenant',tenant);
app.use('/staff',staff);

//staff routes 


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
