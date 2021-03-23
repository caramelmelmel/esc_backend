const express = require('express')
const bodyParser = require('body-parser')
const { request, response } = require('express')
const app = express()
//const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//hoempage
app.get('/', (request, response) => {
    //response.json({ info: 'Node.js, Express, and Postgres API' })
    response.send('Managed to send to Singhealth')
  })

//login page staff 
app.get('/stafflogin',(request,response)=>
{
    response.send([1,2,3])
})
//route 
app.get('/api/stafflogin/:id',(request,response)=>{
    response.send(request.params.id)
})
//query parameters
//call http://localhost:5000/api/staff/2018/jan?sortBy=name
//stored in key value pairs 
app.get('/api/staff/:year/:month',(request,response)=>{
    response.send(request.params)
})
//env variables
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })