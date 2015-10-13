'use strict';

// Load Modules

var Hapi = require('hapi');
var Version = require('./version');

exports.init = function (port, callback) {

    var server = new Hapi.Server();

    server.connection({
        host: 'localhost',
        port: port
    });

    server.register(Version, function (err) {

        if (err) {
            return callback(err, server);
        }

        server.start(function (err) {

            return callback(err, server);
        });
    });
};
