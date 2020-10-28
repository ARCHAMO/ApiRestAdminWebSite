'use strict';

let fs = require('fs');
let path = require('path');
let SliderModel = require('../models/SliderModel');

function create(req, res) {
    let slider = new SliderModel();
    let params = req.body;

    slider.titulo = params.titulo;
    slider.subTitulo = params.subTitulo;
    slider.textoBoton = params.textoBoton;
    slider.rutaBoton = params.rutaBoton;
    slider.iconoBoton = params.iconoBoton;
    slider.orden = params.orden;

    // Se realizan todas las validaciones necesarias
    slider.save((err, objectStored) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Error al guardar el slider'
            });
        } else {
            if (!objectStored) {
                res.status(404).send({
                    message: 'No se ha registrado el slider'
                });
            } else {
                res.status(200).send({
                    slider: objectStored
                });
            }
        }
    });
}

function update(req, res) {
    let id = req.params.id;
    let updateParams = req.body;

    SliderModel.findByIdAndUpdate(id, updateParams, (err, objectUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el slider'
            });
        } else {
            if (!objectUpdate) {
                res.status(404).send({
                    message: 'No se ha podido actualizar el slider'
                });
            } else {
                res.status(200).send({
                    slider: objectUpdate
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
            SliderModel.findByIdAndUpdate(id, { image: fileName }, (err, objectUpdate) => {
                if (!objectUpdate) {
                    res.status(404).send({
                        message: 'No se ha podido actualizar el slider'
                    });
                } else {
                    res.status(200).send({
                        slider: objectUpdate,
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
    let pathFile = './uploads/slider/' + imageFile;
    fs.exists(pathFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).send({ message: 'No existe imagen con ese nombre...' })
        }
    })
}

function findByAll(req, res) {
    let page;
    if (req.params.page) {
        page = req.params.page;
    } else {
        page = 1;
    }
    let itemsPerPage = 10;

    SliderModel.find().sort('orden').paginate(page, itemsPerPage, function (error, sliders, total) {
        if (error) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!sliders) {
                res.status(404).send({ message: 'No hay slider registrados' });
            } else {
                return res.status(200).send({
                    items: total,
                    sliders: sliders
                });
            }
        }
    })
}

function findById(req, res) {
    let id = req.params.id;

    SliderModel.findById(id, (error, slider) => {
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

    SliderModel.findByIdAndRemove(id, function (error, objectRemove) {
        if (error) {
            res.status(500).send({ message: 'Error eliminando el slider.' });
        } else {
            if (!objectRemove) {
                res.status(404).send({ message: 'El slider no existe.' });
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