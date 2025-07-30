
const express = require('express')

const cors = require('cors');
const dotenv = require("dotenv");
require("dotenv").config();




const port = process.env.PORT

console.log(port)
// const { apiRouter } = require("./src/routes/index");
const apiRouter = require('./src/routes'); 
const connectDB = require("./src/config/db");





const app = express()
app.use(express.json());

// Route imports
app.use(cors());




app.get('/', (req, res) => {
  res.send('server is working')
})

// Route usage



app.use("/api",apiRouter) //main router for all api routs

connectDB().then(() => {
  app.listen(port, () => {
    console.log(` Server running at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error(" Failed to connect to DB:", err);
});
