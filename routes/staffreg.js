//const router = require('express').Router();
const express =require('express')
app = express();

app.get('/staffprofile',(req,res)=>{
    res.send({
        staff_id:1,
        staff_name:"jeff",
        staff_email:'jeff@example.com',
     } )
})
const port = 3000;
app.listen(port);

