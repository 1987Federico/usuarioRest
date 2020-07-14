const express = require('express');
const app = express();
const user = require('../controllers/usuario');
const login = require('../controllers/login');
const bodyParser = require('body-parser');
const categoria = require('../controllers/categoria');
const producto = require ('../controllers/producto');
const archivo = require ('../controllers/uploads');
const imagen = require ('../controllers/imagen');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//configuracion de rutas
app.use(user);
app.use(login);
app.use(categoria);
app.use(producto);
app.use(archivo);
app.use(imagen);

module.exports = app;