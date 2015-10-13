'use strict';

var Hoek = require('hoek');
var Index = require('./index');

Index.init(8000, function (err, server) {

    Hoek.assert(!err, err);
    console.log('Server listening at:' + server.info.uri);
});
