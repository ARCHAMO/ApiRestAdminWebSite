'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var UserSchema = Schema({
    primerNombre: String,
    segundoNombre: String,
    primerApellido: String,
    segundoApellido: String,
    email: String,
    password: String,
    image: String,
    role: String
},
    {
        timestamps: {
            createdAt: 'fechaCreacion',
            updatedAt: 'fechaModificacion'
        }
    }
);
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);