require('dotenv').config();
const express = require('express')

const db =require('./db/db')
const app = express()
const Banroutes =require('./routes/Bankroutre')
const adminroute =require('./routes/adminroutes')
const cors = require("cors");
const port = process.env.PORT


app.use(express.json())
app.use(express.urlencoded({ extended: true}))



const logger = function (req, res, next) {
  console.log(`https://createbankdata.herokuapp.com${req.url}`)
  next()
}

app.use(logger)
app.use(cors({
  origin: 'https://createbankdata.herokuapp.com',
  methods:'GET,POST,PUT,PATCH,DELETE',
  credentials:true
}))



app.use('/',Banroutes)
app.use('/api/v1',adminroute)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
