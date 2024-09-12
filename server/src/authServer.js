const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const knex = require('knex')
const auth = require('./auth.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config()
const db = knex({
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
})

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'guest'],
    credentials: true
};

app.use(cors(corsOptions));

app.options('*',cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

app.post('token',auth.token(db))
app.post("/sign-up", auth.signUp(db));
app.post("/log-in", auth.logIn(db, jwt));

app.listen(4000, () => console.log('server is listening in port 4000'))