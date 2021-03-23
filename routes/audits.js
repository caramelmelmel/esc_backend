const express = require('express');
const app = express()
//const { response } = require('express');

var router = require('express').Router();

//for first tests
app.get('/audits',(req,res)=>{
    res.send({
        audit_id:1,
        staff_id:2,
        non_compliance: true,
        audit_score: 96
    });
    console.log('User is at the auditspage');
})

//set the port for tests 
const port = 3000;
app.listen(port);