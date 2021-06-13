'use strict'

var express = require('express');
var CompanyController = require('../controllers/CompanyController');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/service' });

// Rutas para el controlador de usuarios
api.post('/company', CompanyController.create);
api.put('/company/update/:id', md_auth.ensureAuth, CompanyController.update);
api.post('/company/upload-image/:id', [md_auth.ensureAuth, md_upload], CompanyController.uploadImagen);
api.get('/company/get-image/:imageFile', CompanyController.getImagen);
api.get('/companys/:page?', md_auth.ensureAuth, CompanyController.findByAll);
api.get('/company/:id', md_auth.ensureAuth, CompanyController.findById);
api.delete('/company/:id', md_auth.ensureAuth, CompanyController.destroy);

module.exports = api;