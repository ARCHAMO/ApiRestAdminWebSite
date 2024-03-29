'use strict'

var express = require('express');
var PrototiposController = require('../controllers/PrototiposController');
var api = express.Router();

// Rutas para el controlador de usuarios
api.get('/prototipos/widgets', PrototiposController.findWidgets);

module.exports = api;