"use strict";

var unirest = require('unirest');

function RLSClient(options){
    var self = this;
    var apiUrl = options.url || "https://api.rocketleaguestats.com/";

    self.authenticate = function (authenticationToken) {
        return "Token: " + authenticationToken;
    };
}

module.exports = RLSClient;