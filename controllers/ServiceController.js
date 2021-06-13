'use strict';

let fs = require('fs');
let path = require('path');
let ServiceModel = require('../models/ServiceModel');

function create(req, res) {
    let service = new ServiceModel();
    let params = req.body;

    service.titulo = params.titulo;
    service.subTitulo = params.subTitulo;
    service.textoBoton = params.textoBoton;
    service.rutaBoton = params.rutaBoton;
    service.iconoBoton = params.iconoBoton;
    service.icono = params.icono;
    service.urlImagen = params.urlImagen;
    service.orden = params.orden;

    // Se realizan todas las validaciones necesarias
    service.save((err, objectStored) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error al guardar el servicio'
            });
        } else {
            if (!objectStored) {
                res.status(404).send({
                    message: 'No se ha registrado el servicio'
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

    ServiceModel.findByIdAndUpdate(id, updateParams, (err, objectUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el servicio'
            });
        } else {
            if (!objectUpdate) {
                res.status(404).send({
                    message: 'No se ha podido actualizar el servicio'
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
            ServiceModel.findByIdAndUpdate(id, { image: fileName }, (err, objectUpdate) => {
                if (!objectUpdate) {
                    res.status(404).send({
                        message: 'No se ha podido actualizar el servicio'
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
    let pathFile = './uploads/service/' + imageFile;
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

    ServiceModel.paginate({}, {}, function (error, result) {
        if (error) {
            res.status(500).send({
                success: false,
                message: 'Error en la peticion'
            });
        } else {
            if (!result) {
                res.status(404).send({
                    success: false,
                    message: 'No hay servicios registrados'
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

    ServiceModel.findById(id, (error, slider) => {
        if (error) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!slider) {
                res.status(404).send({ message: 'El slider no existe.' });
            } else {
                res.status(500).send({ slider });
            }
        }
    });
}

function destroy(req, res) {
    let id = req.params.id;

    ServiceModel.findByIdAndRemove(id, function (error, objectRemove) {
        if (error) {
            res.status(500).send({ message: 'Error eliminando el servicio.' });
        } else {
            if (!objectRemove) {
                res.status(404).send({ message: 'El servicio no existe.' });
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