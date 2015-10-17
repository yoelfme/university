'use strict';

// Load Modules

var Server = require('../lib');
var Config = require('../lib/config');
var Version = require('../lib/version');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Code = require('code');

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

// Declare internals

var internals = {};

internals.serverOptions = {
    connections: [
        {
            host: 'localhost',
            port: null,
            labels: ['web']
        },
        {
            host: 'localhost',
            port: null,
            labels: ['web-tls'],
            tls: Config.tls
        }
    ]
};

describe('Server', function () {

    it('Server start well :)', function (done) {

        Server.init(internals.serverOptions, function (err, server) {

            expect(err).to.not.exist();
            done();
        });
    });

    it('Server fail :(', { parallel: false }, function (done) {

        var register = Version.register;
        Version.register = function (server, options, next) {

            return next(new Error());
        };

        Version.register.attributes = {
            name: 'test'
        };

        Server.init(internals.serverOptions, function (err, server) {

            expect(err).to.exist();
            Version.register = register;
            done();
        });
    });

    it('Forces re-routing to https', function (done) {

        Server.init(internals.serverOptions, function (err, server) {

            server.select('web').inject('/version', function (res) {

                expect(res.statusCode).to.equal(301);
                expect(res.headers.location).to.equal('https://localhost:8001/version');

                server.stop(done);
            });
        });
    });
});
