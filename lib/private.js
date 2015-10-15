'use strict';

// Declare internals

var internals = {};

internals.setRoute = function (server, next) {

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

    return next();
};

exports.register = function (server, options, next) {

    server.dependency('Auth', internals.setRoute);

    return next();
};

exports.register.attributes = {
    name: 'Private'
};
