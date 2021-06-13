'use strict'

var express = require('express');
var TypeProjectController = require('../controllers/TypeProjectController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// Rutas para el controlador de usuarios
api.post('/typeproject', TypeProjectController.create);
api.put('/typeproject/update/:id', md_auth.ensureAuth, TypeProjectController.update);
api.get('/typeprojects/:page?', md_auth.ensureAuth, TypeProjectController.findByAll);
api.get('/typeproject/:id', md_auth.ensureAuth, TypeProjectController.findById);
api.delete('/typeproject/:id', md_auth.ensureAuth, TypeProjectController.destroy);

module.exports = api;