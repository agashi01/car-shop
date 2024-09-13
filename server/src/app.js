require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const knex = require("knex");
const cors = require("cors");
const cars = require("./cars");
const dealers = require("./dealers");
const path = require("path");
const multer = require("multer");
const runOnce = require("./RunOnce");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

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
  },
});

const upload = multer({ storage });

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "guest"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/static", express.static(path.join(__dirname, "../", "public")));

app.options("*", cors(corsOptions));

const authenticate = (req, res, next) => {
  app.disable("x-powered-by");

  if (req.headers.guest === true) {
    next();
  } else if (req.headers.guest === "false") {
    const authorization = req.headers.authorization;
    const token = authorization && authorization.split(" ")[1];
    if (!token) return res.status(400).json("you dont have a token in authorization");
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json("Token has expired");
        } else if (err.name === "JsonWebTokenError") {
          return res.status(403).json("Invalid token");
        } else {
          return res.status(403).json("Token verification failed");
        }
      }

      req.user = user;
      next();
    });
  } else {
    console.log(req.headers);
    return res.status(404).json("guest parameter is missing");
  }
};

app.use(authenticate);

app.get("/", (req, res) => {
  return res.status(200).json("Server is up and running!");
});

app.post("/runOnce", runOnce.runOnce(db));

app.get("/transmission", (req, res) => cars.transmission(db)(req, res));
app.get("/fuelType", (req, res) => cars.fuelType(db)(req, res));
app.get("/vehicleType", (req, res) => cars.vehicleType(db)(req, res));
app.get("/dealerModel", (req, res) => cars.dealerModel(db)(req, res));
app.get("/dealerMake", (req, res) => cars.dealerMake(db)(req, res));
app.get("/model", (req, res) => cars.model(db)(req, res));
app.post("/cars", upload.array("files", 10), (req, res) =>
  cars.createCar(db, cloudinary)(req, res)
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

app.use((err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
