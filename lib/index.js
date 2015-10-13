'use strict';

// Load Modules

var Hapi = require('hapi');
var Hoek = require('hoek');
var Version = require('./version');

var internals = {}

internals.init = function () {
    var server = new Hapi.Server();

    server.connection({
        host: 'localhost',
        port: 8000
    });

    server.register(Version, function (err) {
        Hoek.assert(!err, err);
    });



    server.start(function (err) {
        Hoek.assert(!err, err);
        console.log('Server listening at: ' + server.info.uri);
    });
};

internals.init();