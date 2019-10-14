'use strict'

var mongoose = require('mongoose');

var urlDbNube = 'mongodb+srv://Solman:Solman820901*!@solmaningenieria-atxkp.mongodb.net/test?retryWrites=true&w=majority';

var urlDbLocal = 'mongodb://localhost:27017/desarrollo';
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect(urlDbNube,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (err) {
            throw err;
        } else {
            app.listen(port, function () {
                console.log('Servidor escuchando en http://localhost:' + port);
            })
        }
    });
