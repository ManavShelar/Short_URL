require('dotenv').config()
const express = require('express')
const cors = require("cors");
// const path = require("path")
const urlroute = require('./router/url')
const { connectToDatabase } = require('./connection/connect')
const PORT = 8000
const app = express()

// var corsOptions = {
//   origin: "http://127.0.0.1:5500/"
// };

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/url',urlroute)

app.listen(PORT,()=>{console.log(`Server Started at PORT ${PORT}`)})