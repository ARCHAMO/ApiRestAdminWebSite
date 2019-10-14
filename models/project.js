'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    titulo: String,
    subTitulo: String,
    icono1: String,
    icono2: String,
    urlImagen: String,
    typeProjectId: { type: Schema.Types.ObjectId, ref: 'TypeProject' },
    userCreacionId: { type: Schema.Types.ObjectId, ref: 'User' },
    userModificacionId: { type: Schema.Types.ObjectId, ref: 'User' }
},
    {
        timestamps: {
            createdAt: 'fechaCreacion',
            updatedAt: 'fechaModificacion'
        }
    }
);

module.exports = mongoose.model('Project', ProjectSchema);