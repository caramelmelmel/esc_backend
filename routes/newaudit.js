const express = require('express');
app = express();

app.get('/newaudit',(req,res)=>{
    res.send({
        store_name: "kopitiam",
        resolved: true
    })
});
