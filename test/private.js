'use strict';

// Load Modules

var Hapi = require('hapi');
var Basic = require('hapi-auth-basic');
var Server = require('../lib');
var Private = require('../lib/private');
var Users = require('../lib/users.json');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Code = require('code');

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

// Declare internals

var internals = {};

internals.header = function (username, password) {

    var credentials = new Buffer(username + ':' + password);

    return 'Basic ' + credentials.toString('base64');
};

internals.request = function (authorization) {

    return {
        method: 'GET',
        url: '/private',
        headers: {
            authorization: authorization
        }
    };
};

describe('Private Plugin', function () {

    it('Register well :)', function (done) {

        var server = new Hapi.Server();
        server.connection();

        server.register(Private, function (err) {

            expect(err).to.not.exist();
            done();
        });
    });

    it('Register bad :(', function (done) {

        var register = Private.register;
        Private.register = function (server, options, next) {

            return next(new Error('Fail Registration'));
        };

        Private.register.attributes = {
            name: 'fake private'
        };

        Server.init(null, function (err) {

            Private.register = register;
            expect(err).to.exist();
            done();
        });
    });

    it('Authentication successfully :)', function (done) {

        Server.init(null, function (err, server) {

            expect(err).to.not.exist();

            var request = internals.request(internals.header(Users.Yoel.username, Users.Yoel.password));

            server.inject(request, function (response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result).to.equal('<div>Hello Yoel</div>');

                server.stop(done);
            });

        });
    });

    it('Authentication failed :(', function (done) {

        Server.init(null, function (err, server) {

            expect(err).to.not.exist();

            var request = internals.request(internals.header('User unknown', ''));
            server.inject(request, function (response) {

                expect(response.statusCode).to.equal(401);

                server.stop(done);
            });
        });
    });

    it('Register Auth Basic Plugin bad :(', function (done) {

        var register = Basic.register;

        Basic.register = function (server, options, next) {

            return next(new Error('Registration Fail'));
        };

        Basic.register.attributes = {
            name: 'fake auth basic'
        };

        Server.init(null, function (err, server) {

            Basic.register = register;
            expect(err).to.exist();
            done();
        });
    });
});
