'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var TypeProjectSchema = Schema({
    nombre: String,
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
TypeProjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('TypeProject', TypeProjectSchema);