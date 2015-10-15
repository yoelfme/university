'use strict';

// Load Modules

var Server = require('../lib');
var Vision = require('vision');
var Path = require('path');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Code = require('code');

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

// Declare internals

var internals = {
    path: Path.join(__dirname, '../views/home')
};

internals.serverOptions = {
    connections: [
        {
            host: 'localhost',
            port: null
        }
    ]
};

describe('Home Plugin', function () {

    it('Return page home with path of file :)', function (done) {

        Server.init(internals.serverOptions, function (err, server) {

            expect(err).to.not.exist();

            server.inject('/home', function (response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result).to.contains(internals.path);

            });
        });

        done();
    });

    it('Vision register fail :(', function (done) {

        var register = Vision.register;

        Vision.register = function (server, options, next) {

            return next(new Error('Registration Fail!'));
        };

        Vision.register.attributes = {
            name: 'Fake Vision'
        };

        Server.init(internals.serverOptions, function (err, server) {

            Vision.register = register;
            expect(err).to.exist();
            done();
        });
    });
});
