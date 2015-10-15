'use strict';

// Load Modules

var Glue = require('glue');
var Hoek = require('hoek');
var Manifest = require('../config/manifest.json');

// Declare internals

var internals = {};

internals.composeOptions = {
    relativeTo: __dirname
};

exports.init = function (options, callback) {

    var config = Hoek.applyToDefaults(Manifest, options);

    Glue.compose(config, internals.composeOptions, function (err, server) {

        if (err) {
            return callback(err, server);
        }

        server.start(function (err) {

            return callback(err, server);
        });

    });
};
