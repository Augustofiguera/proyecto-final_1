require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParse = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');


(async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL_TEST);
    console.log('conectado a mongdb');
  } catch (error) {
    console.log(error);
  }
})()
app.use(cors());
app.use(express.json());
app.use(cookieParse());
//rutas del frontend 
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/registro', express.static(path.resolve('views', 'registro')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));





app.use(morgan('tiny'));
// rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);




module.exports = app;