const express = require('express')

// const { apiRouter } = require("./src/routes/index");
const apiRouter = require('./src/routes'); 
const connectDB = require("./src/config/db");





const app = express()

// Route imports



const port = 3000

app.get('/', (req, res) => {
  res.send('server is working')
})

// Route usage

connectDB();

app.use("/api",apiRouter) //main router for all api routs

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
