'use strict';

// Load Modules

var Users = require('./users.json');

// Declare internals

var internals = {};

internals.validate = function (request, username, password, callback) {

    var user = Users[username];
    if (!user || user.password !== password ) {
        return callback(null, false);
    }

    return callback(null, true, user);
};

internals.setAuth = function (server, next) {

    server.auth.strategy('simple', 'basic', { validateFunc: internals.validate });

    return next();
};

exports.register = function (server, options, next) {

    server.dependency('hapi-auth-basic', internals.setAuth);

    return next();
};

exports.register.attributes = {
    name: 'Auth'
};
