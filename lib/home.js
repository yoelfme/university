'use strict';

// Load Modules

var Vision = require('vision');
var Path = require('path');

// Declare internals

var internals = {};

internals.handler = function (request, reply) {

    reply.view('home', {
        path: Path.join(__dirname, '../views/home.html')
    });
};

exports.register = function (server, options, next) {

    server.register(Vision, function (err) {

        if (err) {
            return next(err);
        };

        server.views({
            engines: {
                html: require('handlebars')
            },
            path: Path.join(__dirname, '../views')
        });

        server.route({
            method: 'GET',
            path: '/home',
            config: {
                handler: internals.handler
            }
        });

        next();
    });
};

exports.register.attributes = {
    name: 'Home'
};
