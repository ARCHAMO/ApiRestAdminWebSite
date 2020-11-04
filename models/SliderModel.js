'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var SliderSchema = Schema({
    titulo: String,
    subTitulo: String,
    textoBoton: String,
    rutaBoton: String,
    iconoBoton: String,
    urlImagen: String,
    orden: Number,
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
SliderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('SliderFront', SliderSchema);