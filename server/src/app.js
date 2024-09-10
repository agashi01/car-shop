require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const knex = require("knex");
const cors = require("cors");
const cars = require("./cars");
const dealers = require("./dealers");
const path = require("path");
const multer = require("multer");
const runOnce = require('./RunOnce')
const axios = require('axios')
const cloudinary = require('cloudinary').v2
const jwt = require('jsonwebtoken')
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
})

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
});



const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "../public/cars"));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage })

const corsOptions = {
  origin: 'http://localhost:5173', // Update with the origin of your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'guest'], // Allow the guest header
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

const authenticate = (req, res, next) => {
  app.disable('x-powered-by')
  console.log('blood')
  next()

//   if (req.headers.guest) {
//     next()
//   } else if (req.headers.guest === false) {
//     // jwt.verify(req.cookie.token, process.env.APISECRET, (err, user) => {
//     //   if (err)
//     //     return res.status(400).json(`this is the error ${err}`)
//     //   req.user = user
      
//     // })
//     next()
//   } else {
//     console.log(req.headers)
//     res.status(404).json('guest parameter is missing')
//   }
}

// app.use(authenticate)

app.get("/", (req, res) => {
  return res.status(200).json("Server is up and running!");
});

app.post("/runOnce", runOnce.runOnce(db))

app.post('/test',(req,res)=>{
  console.log(req.headers,'hi')
})

app.get("/transmission", (req, res) => cars.transmission(db)(req, res));
app.get("/fuelType", (req, res) => cars.fuelType(db)(req, res));
app.get("/vehicleType", (req, res) => cars.vehicleType(db)(req, res));
app.get("/dealerModel", (req, res) => cars.dealerModel(db)(req, res));
app.get("/dealerMake", (req, res) => cars.dealerMake(db)(req, res));
app.get("/model", (req, res) => cars.model(db)(req, res));
app.post("/cars", upload.array("files", 10), (req, res) =>
  cars.createCar(db, axios, cloudinary, fs)(req, res)
);

app.get("/make", (req, res) => cars.make(db)(req, res));
app.get("/cars/guest", (req, res) => cars.readAllGuest(db)(req, res));
app.get("/cars", (req, res) => cars.readAll(db)(req, res));
app.get("/cars/:id", (req, res) => cars.readCar(db)(req, res));
app.put("/cars", (req, res) => cars.updateCar(db)(req, res));
app.delete("/cars", (req, res) => cars.deleteCar(db)(req, res));
app.post("/dealers", (req, res) => dealers.createDealer(db)(req, res));
app.get("/dealers", (req, res) => dealers.readAll(db)(req, res));
app.get("/dealers/:id", (req, res) => dealers.readDealer(db)(req, res));
app.put("/dealers/:id", (req, res) => dealers.updateDealer(db)(req, res));
app.delete("/dealers/:id", (req, res) => dealers.deleteDealer(db)(req, res));

app.use("/static", express.static(path.join(__dirname, "../", "public")));

app.use((err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
