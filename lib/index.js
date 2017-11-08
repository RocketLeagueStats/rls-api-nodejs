"use strict";

var packageData = require('../package.json');
var request = require('request');
var limit = require("simple-rate-limiter");
var headerUserAgent = packageData.name + ' (v' + packageData.version + ')';

function RLSClient(options) {
    var self = this;
    var apiUrl = options.url || "https://api.rocketleaguestats.com/v1";
    var token = options.token;

    if (typeof token === 'undefined') {
        throw new Error("Token is undefined, please set a token.");
    }

    self._call = limit(function(endpointUrl, callback, callbackError, queryObj) {
        request.get({
            url: apiUrl + endpointUrl,
            qs: queryObj,
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'User-Agent': headerUserAgent
            }
        }, function(error, response, body) {
            if (response && response.statusCode === 429) {
                var errorMessage = JSON.parse(body);

                throw new Error("Request has been ratelimited: '" + errorMessage.message + "'.");
            }

            if (response && body) {
                callback(response.statusCode, JSON.parse(body));
            } else {
                callbackError(error);
            }
        });
    }).to(2).per(1000).withFuzz(1);

    self.getPlatformsData = function(callback, callbackError) {
        if (!callback) {
            throw new Error('No callback was specified.');
        }

        self._call('/data/platforms', callback, callbackError);
    };

    self.getSeasonsData = function(callback, callbackError) {
        if (!callback) {
            throw new Error('No callback was specified.');
        }

        self._call('/data/seasons', callback, callbackError);
    };

    self.getPlaylistsData = function(callback, callbackError) {
        if (!callback) {
            throw new Error('No callback was specified.');
        }

        self._call('/data/playlists', callback, callbackError);
    };

    self.getTiersData = function(callback, callbackError) {
        if (!callback) {
            throw new Error('No callback was specified.');
        }

        self._call('/data/tiers', callback, callbackError);
    };

    self.getPlayer = function(uniqueId, platformId, callback, callbackError) {
        if (!callback) {
            throw new Error('No callback was specified.');
        }

        self._call('/player', callback, callbackError, {
            unique_id: uniqueId,
            platform_id: platformId
        });
    };

    self.searchPlayers = function(displayName, page, callback, callbackError) {
        if (!callback) {
            throw new Error('No callback was specified.');
        }

        self._call('/search/players', callback, callbackError, {
            display_name: displayName,
            page: page || 0
        });
    };

    self.getRankedLeaderboard = function(playlistId, callback, callbackError) {
        if (!callback) {
            throw new Error('No callback was specified.');
        }

        self._call('/leaderboard/ranked', callback, callbackError, {
            playlist_id: playlistId
        });
    };

    self.getStatLeaderboard = function(statType, callback, callbackError) {
        if (!callback) {
            throw new Error('No callback was specified.');
        }

        self._call('/leaderboard/stat', callback, callbackError, {
            type: statType
        });
    };

    return self;
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