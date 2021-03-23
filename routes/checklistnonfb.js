const express = require('express');
const app = express();

app.get('/checklistnonfb',(req,res)=>{
    res.send({
    checklist_id:1,
    store_name:'TOCTOU Pharmacy',
    institution_name:'SKH'
})
})
app.listen(3000);