'use strict';

var Hapi = require('hapi');
var Package = require('../package.json');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

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
})

server.start(function () {
    console.log('Server listening at: ' + server.info.uri);
});