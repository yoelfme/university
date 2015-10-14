'use strict';

// Load Modules

var Server = require('../lib');
var Version = require('../lib/version');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Code = require('code');

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('Server', function () {

    it('Server start well :)', function (done) {

        Server.init(null, function (err, server) {

            expect(err).to.not.exist();
            server.stop(done);
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

        Server.init(null, function (err, server) {

            expect(err).to.exist();
            Version.register = register;
            server.stop(done);
        });
    });
});
