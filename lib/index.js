"use strict";

var packageData = require('../package.json');
var unirest = require('unirest');

var headerUserAgent = packageData.name + ' (v' + packageData.version + ')';

function RLSClient(options){
    var self = this;
    var apiUrl = options.url || "https://api.rocketleaguestats.com/v1";
    var token = options.token;

    if(typeof token === 'undefined')
        throw new Error("Token is undefined, please set a token.");

    function call(endpointUrl, callback, queryObj){
        var Request = unirest.get(apiUrl + endpointUrl);

        Request.headers({
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'User-Agent': headerUserAgent
        });

        if(typeof queryObj !== 'undefined')
            Request.query(queryObj);

        Request.end(function(response){
            callback(response.status, response.body);
        });
    }

    self.getPlatformsData = function (callback) {
        call('/data/platforms', callback);
    };

    self.getSeasonsData = function (callback) {
        call('/data/seasons', callback);
    };

    self.getPlaylistsData = function (callback) {
        call('/data/seasons', callback);
    };

    self.getTiersData = function (callback) {
        call('/data/tiers', callback);
    };

    self.getPlayer = function (uniqueId, platformId, callback) {
        call('/player', callback, {
            unique_id: uniqueId,
            platform_id: platformId
        });
    };

    self.searchPlayers = function (displayName, callback, page) {
        call('/search/players', callback, {
            display_name: displayName,
            page: page || 0
        });
    };

    self.getRankedLeaderboard = function (playlistId, callback) {
        call('/leaderboard/ranked', callback, {
            playlist_id: playlistId
        });
    };

    self.getStatLeaderboard = function (statType, callback) {
        call('/leaderboard/stat', callback, {
            type: statType
        });
    };
}

module.exports.Client = RLSClient;
module.exports.platforms = Object.freeze({
    STEAM: 1,
    PS4: 2,
    XB1: 3
});
module.exports.rankedPlaylists = Object.freeze({
    DUEL: 10,
    DOUBLES: 11,
    SOLO_STANDARD: 12,
    STANDARD: 13
});
module.exports.statType = Object.freeze({
    WINS: "wins",
    GOALS: "goals",
    MVPS: "mvps",
    SAVES: "saves",
    SHOTS: "shots",
    ASSISTS: "assists"
});