'use strict'

var express = require('express');
var SliderController = require('../controllers/SliderController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/sliders' });

// Rutas para el controlador de usuarios
api.post('/slider', SliderController.create);
api.put('/slider/update/:id', md_auth.ensureAuth, SliderController.update);
api.post('/slider/upload-image/:id', [md_auth.ensureAuth, md_upload], SliderController.uploadImagen);
api.get('/slider/get-image/:imageFile', SliderController.getImagen);
api.get('/sliders/:page?', md_auth.ensureAuth, SliderController.findByAll);
api.get('/slider/:id', md_auth.ensureAuth, SliderController.findById);
api.delete('/slider/:id', md_auth.ensureAuth, SliderController.destroy);

module.exports = api;