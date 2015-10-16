'use strict';

// Load Modules

var Vision = require('vision');
var Inert = require('inert');
var Path = require('path');

exports.register = function (server, options, next) {

    server.dependency(['vision', 'inert'], function (server, next) {
        server.views({
            engines: {
                html: require('handlebars')
            },
            path: '../views',
            partialsPath: '../views/partials',
            relativeTo: __dirname
        });

        server.route({
            method: 'GET',
            path: '/{assetpath*}',
            config: {
                handler: {
                    directory: {
                        path: './assets/'
                    }
                }
            }
        });

        server.route([
            {
                method: 'GET',
                path: '/home',
                config: {
                    handler: {
                        view: {
                            template: 'home',
                            context: {
                                path: Path.join(__dirname, '../views/home.html')
                            }
                        }
                    }
                }
            },
            {
                method: 'GET',
                path: '/login',
                config: {
                    handler: {
                        view: {
                            template: 'login'
                        }
                    }
                }
            }
        ]);

        next();
    });

    next();
};

exports.register.attributes = {
    name: 'Home'
};
