'use strict';

var Package = require('../package.json');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            handler: function (request, reply) {

                var response = {
                    version: Package.version
                };

                reply(response);
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'version'
};
