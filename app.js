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
const { userExtractor } = require('./middleware/auth');
const personalRouter = require('./controllers/personals');
const logoutRouter = require('./controllers/logout');
const { MONGO_URI } = require('./config');


(async() => {
  try {
    await mongoose.connect(MONGO_URI);
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
app.use('/principal', express.static(path.resolve('views', 'addProfile')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));
app.use('/ListaDePersonal', express.static(path.resolve('views', 'ListaDePersonal')));





app.use(morgan('tiny'));
// rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/personals',userExtractor,personalRouter);






module.exports = app;