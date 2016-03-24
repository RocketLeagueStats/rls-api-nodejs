var assert = require('assert'),
    RLSClient = require('../lib/index');


var client = new RLSClient({
    url: "http://localhost:8080/"
});

client.authenticate("asd");

/*describe('RLSClient', function() {
    describe('#authenticate(token)', function () {
        it('should return token', function () {
            assert.ok(client.authenticate("Key") == "Token: Key");
        });
    });
});*/