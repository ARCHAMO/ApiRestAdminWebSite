'use strict';

let fs = require('fs');
let path = require('path');
let TypeProjectModel = require('../models/TypeProject');

function create(req, res) {
    let typeProject = new TypeProjectModel();
    let params = req.body;

    typeProject.nombre = params.nombre;

    // Se realizan todas las validaciones necesarias
    typeProject.save((err, objectStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el tipo de proyecto'
            });
        } else {
            if (!objectStored) {
                res.status(404).send({
                    message: 'No se ha registrado el tipo de proyecto'
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

    TypeProjectModel.findByIdAndUpdate(id, updateParams, (err, objectUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el tipo de proyecto'
            });
        } else {
            if (!objectUpdate) {
                res.status(404).send({
                    message: 'No se ha podido actualizar el tipo de proyecto'
                });
            } else {
                res.status(200).send({
                    service: objectUpdate
                });
            }
        }
    });
}

function findByAll(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    let itemsPerPage = 10;

    TypeProjectModel.paginate({}, {}, function (error, result) {
        if (error) {
            res.status(500).send({
                success: false,
                message: 'Error en la peticion'
            });
        } else {
            if (!result) {
                res.status(404).send({
                    success: false,
                    message: 'No hay tipos de proyectos'
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

    TypeProjectModel.findById(id, (error, typeProject) => {
        if (error) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!typeProject) {
                res.status(404).send({ message: 'El tipo de proyecto no existe.' });
            } else {
                res.status(200).send({ typeProject });
            }
        }
    });
}

function destroy(req, res) {
    let id = req.params.id;

    TypeProjectModel.findByIdAndRemove(id, function (error, objectRemove) {
        if (error) {
            res.status(500).send({ message: 'Error eliminando el tipo de proyecto.' });
        } else {
            if (!objectRemove) {
                res.status(404).send({ message: 'El tipo de proyecto no existe.' });
            } else {
                res.status(200).send({ objectRemove });
            }
        }
    });
}

module.exports = {
    create,
    update,
    findByAll,
    findById,
    destroy
};