const express = require('express');
const bodyParser = require('body-parser')
const {request,response} = require('express')
const app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended = true,
    })
)
//app homepage
app.get('/home')

