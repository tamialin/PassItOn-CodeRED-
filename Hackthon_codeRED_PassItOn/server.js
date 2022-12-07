const express = require('express');
const app = express();
const morgan = require('morgan')
const {config} = require('./config')

const PORT = process.env.PORT || 5500;

const {jobs} = require('./events.js');
const {users} = require('./users.js');


/*
const mysql = require("mysql")
console.log("connecting to the database!")
const connection = mysql.createConnection(config)
    
  connection.connect()
  console.log("connected to the database!")
  connection.query('SELECT * FROM master', (err, rows) => {
    console.log("querying the database!")
    if (err) throw err
  
    console.log(rows[0])
  })
  
  connection.end()

  const registered = (info) => {
    if (firstname in datatable && lastname in datatable) // fill in later 
    {
        return true 
    }else
    return False
}
*/


app.use(morgan('dev'))

const loginRouter = express.Router()
app.use('/login', loginRouter)

const jobRouter = express.Router();
app.use('/jobs', jobRouter)

jobRouter.param('jobId', (req, res, next, id) => {
    const jobId = Number(id)
    if (jobId <= jobs.length){
        req.id = jobId
        next()
    }else{
        res.status(404).send('Job Id not found!')        //connect to database
}
})



jobRouter.get('/', (req, res, next) => {
        res.send(jobs)
})// connect to database to find all jobs 

jobRouter.get('/:jobId', (req, res, next) => { // Connect to database so this is job
    console.log(jobs[req.id])
    res.send(jobs[req.id])
})

jobRouter.post('/', (req, res, next) =>{ 
    console.log(req.query)
    const company = req.query.company;
    const title = req.query.title
    const description = req.query.description
    const time = req.query.time
    const location = req.query.location
    if (company && title && description && time && location ) {
        jobs.push({company: company, title: title, description: description, time: time, location: location })
        res.send({company: company, title: title, description: description, time: time, location: location })
        //push to the database
    }else{
        res.status(400).send("Wrong format")
    }
})
// Test: POST http://localhost:5500/jobs?company=Malsplace&title=Help_for_all&description=A_very_good_place_to_be_able_to_help_people_run_a_place_and_helps_lots_of_people&time=3_hours_a_day_for_1_week&location=144045_west_lake_av.&picture=add_this_later

jobRouter.put('/:jobId', (req,res,next) => {
    const company = req.query.company;
    const title = req.query.title
    const description = req.query.description
    const time = req.query.time
    const location = req.query.location
    const job = jobs[req.id]
    if (company){
        job.company = company
    }
    if (title){
        job.title = title
    }
    if (description){
        job.description = description
    }
    if (time){
        job.time = time
    }
    if (location){
        job.location = location
    }
    res.send(job)
})

jobRouter.delete('/:jobId', (req, res, next) => {
    jobs.splice(req.id, 1)
    res.status(204).send(jobs)
})


loginRouter.post("/return", (req, res, next) =>{
    console.log("started query")
    const email = req.query.email
    const password = req.query.password
    res.send("Success")
})

loginRouter.post('/first', (req, res, next ) => {
    const firstname = req.query.firstname
    const lastname = req.query.lastname
    const email = req.query.email
    const password = req.query.password
    if (email  != null& password!= null & firstname!= null & lastname!= null){
        users.push({firstname: firstname, lastname: lastname, email: email, password: password})
        res.send({firstname: firstname, lastname: lastname, email: email, password: password})
    }else{
        console.log("Broken")
    }
})



app.listen(PORT)

app.use(express.static('public'));