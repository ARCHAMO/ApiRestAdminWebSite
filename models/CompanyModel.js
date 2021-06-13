'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var CompanySchema = Schema({
    razonSocial: String,
    nit: String,
    mision: String,
    vision: String,
    telefono: String,
    email: String,
    celular: String,
    direccion: String,
    tituloBienvenida: String,
    descripcionBienvenida: String,
    logo: String,
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
CompanySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Company', CompanySchema);