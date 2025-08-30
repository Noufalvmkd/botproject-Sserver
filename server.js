
const express = require('express')
const app = express()

const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config(); // load .env

// Read allowed origins from environment variable (comma-separated)
const allowedOrigins = process.env.CLIENT_URLS.split(",");

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow requests like Postman, curl
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // allow this origin
    } else {
      callback(new Error("CORS policy does not allow this origin."), false);
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));




const port = process.env.PORT

console.log(port)
// const { apiRouter } = require("./src/routes/index");
const apiRouter = require('./src/routes'); 
const connectDB = require("./src/config/db");
const cookieParser = require('cookie-parser');






app.use(cookieParser());
app.use(express.json());

// Route imports
// app.use(cors());
// app.use(cors({ origin: 'http://localhost:5174', credentials: true }));




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
