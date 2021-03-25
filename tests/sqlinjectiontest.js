//this moduloe is solely for testing 

connection.query("SELECT * FROM staff where name = '' AND email = ''",[
    req.body.staff,
    req.body.account_number
],function(error,results){});

