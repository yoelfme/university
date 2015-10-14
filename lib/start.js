'use strict';

// Load Modules

var Hoek = require('hoek');
var Sever = require('./');

Sever.init(8000, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server listening at: ' + server.info.uri);
});
