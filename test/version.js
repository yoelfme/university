'use strict';

// Load Modules

var Hapi = require('hapi');
var Index = require('../lib');
var Version = require('../lib/version');
var Package = require('../package.json');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Code = require('code');

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('Version Plugin', function () {

    it('Register well :)', function (done) {

        var server = new Hapi.Server();
        server.connection();

        server.register(Version, function (err) {

            expect(err).to.not.exist();
            done();
        });
    });

    it('response is equal to package version', function (done) {

        Index.init(8000, function (err, server) {

            expect(server.info.port).to.equal(8000);

            server.inject('/version', function (response) {

                expect(response.statusCode).to.equal(200);
                expect(response.result).to.deep.equal({ version: Package.version });

                done();
            });
        });

    });
});