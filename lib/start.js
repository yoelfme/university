'use strict';

// Load Modules

var Hoek = require('hoek');
var Sever = require('./');
var Config = require('./config');

// Declare internals

var internals = {};

internals.composeOptions = {
    connections: [
        {
            host: 'localhost',
            port: 8000,
            labels: ['web']
        },
        {
            host: 'localhost',
            port: 8001,
            labels: ['web-tls'],
            tls: Config.tls
        }
    ]
};

Sever.init(internals.composeOptions, function (err, server) {

    Hoek.assert(!err, err);

    // Server connections
    var web = server.select('web');
    var webTls = server.select('web-tls');

    // Logging started server
    console.log('Web listening at: ' + web.info.uri);
    console.log('WebTLS listening at: ' + webTls.info.uri);
});
