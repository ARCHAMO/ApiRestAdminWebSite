'use strict';

let fs = require('fs');
let path = require('path');
let CompanyModel = require('../models/CompanyModel');

function create(req, res) {
    let company = new CompanyModel();
    let params = req.body;

    company.razonSocial = params.razonSocial;
    company.nit = params.nit;
    company.mision = params.mision
    company.vision = params.vision;
    company.telefono = params.telefono;
    company.email = params.email;
    company.celular = params.celular;
    company.direccion = params.direccion;
    company.tituloBienvenida = params.tituloBienvenida;
    company.descripcionBienvenida = params.descripcionBienvenida;
    company.logo = params.logo;

    // Se realizan todas las validaciones necesarias
    company.save((err, objectStored) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error al guardar la compañia'
            });
        } else {
            if (!objectStored) {
                res.status(404).send({
                    message: 'No se ha registrado la compañia'
                });
            } else {
                res.status(200).send({
                    service: objectStored
                });
            }
        }
    });
}

function update(req, res) {
    let id = req.params.id;
    let updateParams = req.body;

    CompanyModel.findByIdAndUpdate(id, updateParams, (err, objectUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar la compañia'
            });
        } else {
            if (!objectUpdate) {
                res.status(404).send({
                    message: 'No se ha podido actualizar la compañia'
                });
            } else {
                res.status(200).send({
                    service: objectUpdate
                });
            }
        }
    });
}

function uploadImagen(req, res) {
    let id = req.params.id;

    if (req.files) {
        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[2];

        let extSplit = fileName.split('\.');
        let fileExt = extSplit[1];

        if (fileExt.toLowerCase() == 'png' || fileExt.toLowerCase() == 'jpg' || fileExt.toLowerCase() == 'gif') {
            CompanyModel.findByIdAndUpdate(id, { image: fileName }, (err, objectUpdate) => {
                if (!objectUpdate) {
                    res.status(404).send({
                        message: 'No se ha podido actualizar la compañia'
                    });
                } else {
                    res.status(200).send({
                        service: objectUpdate,
                        image: fileName
                    });
                }
            });
        } else {
            res.status(200).send({ message: 'Extension de archivo no valida.' })
        }
    } else {
        res.status(200).send({
            message: 'No has subido ninguna imagen.'
        });
    }
}

function getImagen(req, res) {
    let imageFile = req.params.imageFile;
    let pathFile = './uploads/company/' + imageFile;
    fs.exists(pathFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).send({ message: 'No existe imagen con ese nombre...' })
        }
    })
}

function findByAll(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    let itemsPerPage = 10;

    CompanyModel.paginate({}, {}, function (error, result) {
        if (error) {
            res.status(500).send({
                success: false,
                message: 'Error en la peticion'
            });
        } else {
            if (!result) {
                res.status(404).send({
                    success: false,
                    message: 'No hay compañias registradas'
                });
            } else {
                result.success = true;
                return res.status(200).send(result);
            }
        }
    });
}

function findById(req, res) {
    let id = req.params.id;

    CompanyModel.findById(id, (error, company) => {
        if (error) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!company) {
                res.status(404).send({ message: 'La compañia no existe.' });
            } else {
                res.status(200).send({ company });
            }
        }
    });
}

function destroy(req, res) {
    let id = req.params.id;

    CompanyModel.findByIdAndRemove(id, function (error, objectRemove) {
        if (error) {
            res.status(500).send({ message: 'Error eliminando la compañia.' });
        } else {
            if (!objectRemove) {
                res.status(404).send({ message: 'La compañia no existe.' });
            } else {
                res.status(200).send({ objectRemove });
            }
        }
    });
}

module.exports = {
    create,
    update,
    uploadImagen,
    getImagen,
    findByAll,
    findById,
    destroy
};