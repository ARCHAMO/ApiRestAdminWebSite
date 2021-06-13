'use strict'

var express = require('express');
var ServiceController = require('../controllers/ServiceController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/service' });

// Rutas para el controlador de usuarios
api.post('/service', ServiceController.create);
api.put('/service/update/:id', md_auth.ensureAuth, ServiceController.update);
api.post('/service/upload-image/:id', [md_auth.ensureAuth, md_upload], ServiceController.uploadImagen);
api.get('/service/get-image/:imageFile', ServiceController.getImagen);
api.get('/services/:page?', md_auth.ensureAuth, ServiceController.findByAll);
api.get('/service/:id', md_auth.ensureAuth, ServiceController.findById);
api.delete('/service/:id', md_auth.ensureAuth, ServiceController.destroy);

module.exports = api;