'use strict';

// Load Modules

var Users = require('./users.json');
var AuthBasic = require('hapi-auth-basic');

// Declare internals

var internals = {};

internals.validate = function (request, username, password, callback) {

    var user = Users[username];
    if (!user || user.password !== password ) {
        return callback(null, false);
    }

    return callback(null, true, user);
};

exports.register = function (server, options, next) {

    server.register(AuthBasic, function (err) {

        if (err) {
            next(err);
        };

        server.auth.strategy('simple', 'basic', { validateFunc: internals.validate });
        server.route({
            method: 'GET',
            path: '/private',
            config: {
                auth: 'simple',
                description: 'Returns a greeting message to the authenticated user',
                handler: function (request, reply) {

                    var html = '<div>Hello ' + request.auth.credentials.username +  '</div>';
                    reply(html);
                }
            }
        });

        next();
    });
};

exports.register.attributes = {
    name: 'Private'
};
