'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = Schema({
    titulo: String,
    subTitulo: String,
    textoBoton: String,
    rutaBoton: String,
    iconoBoton: String,
    icono: String,
    urlImagen: String,
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

module.exports = mongoose.model('Service', ServiceSchema);