

const express = require('express');
const babelpfill = require('babel-polyfill')
const cors = require('cors');
const dotenv = require('dotenv')
const port = 3000;
//import the routes here 
const tenantroute = require('./routes/tenantRoute')

dotenv.config();

//import the route 
const app = express()

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/singhealth',tenantroute)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
