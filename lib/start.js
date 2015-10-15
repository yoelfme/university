'use strict';

// Load Modules

var Hoek = require('hoek');
var Sever = require('./');

// Declare internals

var internals = {};

internals.composeOptions = {
    connections: [
        {
            host: 'localhost',
            port: 8000
        }
    ]
};

Sever.init(internals.composeOptions, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server listening at: ' + server.info.uri);
});
