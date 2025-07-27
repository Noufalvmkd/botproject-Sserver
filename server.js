const express = require('express')

// const { apiRouter } = require("./src/routes/index");
const apiRouter = require('./src/routes'); 
const connectDB = require("./src/config/db");





const app = express()
app.use(express.json());

// Route imports



const port = 3000

app.get('/', (req, res) => {
  res.send('server is working')
})

// Route usage



app.use("/api",apiRouter) //main router for all api routs

connectDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
