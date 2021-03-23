const express = require('express');
const { reset } = require('nodemon');
const app = express();

app.get('/checklistfb',(req,res)=>{
    res.send({
    checklist_id:1,
    store_name:'kopitiam',
    institution_name:'SKH'
})
})
app.listen(3000);
//console.log('Managed to connect to port');
