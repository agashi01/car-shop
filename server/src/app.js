const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors')
const cars = require('./cars')
const dealers = require('./dealers')
const auth = require('./auth')

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'Alienilahet2005',
    database: 'car_shop',
  },
});

const app = express()
app.use(cors())


app.use(bodyParser.json())



app.get('/', (req, res) => { return res.status(200).json("Server is up and running!") })

app.post('/sign-up', (req, res) => auth.signUp(db)(req, res));
app.post('/log-in', (req, res) => auth.logIn(db)(req, res));

app.post('/cars', (req, res) => cars.createCar(db)(req, res))
app.get('/cars', (req, res) => cars.readAll(db)(req, res))
app.get('/cars/:id', (req, res) => cars.readCar(db)(req, res))
app.put('/cars/:id', (req, res) => cars.updateCar(db)(req, res))
app.delete('/cars/:id', (req, res) => cars.deleteCar(db)(req, res))
app.post('/dealers', (req, res) => dealers.createDealer(db)(req, res))
app.get('/dealers', (req, res) => dealers.readAll(db)(req, res))
app.get('/dealers/:id', (req, res) => dealers.readDealer(db)(req, res))
app.put('/dealers/:id', (req, res) => dealers.updateDealer(db)(req, res))
app.delete('/dealers/:id', (req, res) => dealers.deleteDealer(db)(req, res))



app.use((err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  })
});


app.listen(3000, () => console.log("Server is running on port 3000"))

