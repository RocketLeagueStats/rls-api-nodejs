/**
 * This file is used during development of 'rls-api'.
 */

var rls = require('./lib');
var secret = require('./secret.json');

var client = new rls.Client({
    token: secret.api_key
});

client.getPlatformsData(function(status, data){
    if(status === 200){
        console.log("-- Platforms data:");
        console.log(data);
    }
});

client.getSeasonsData(function(status, data){
    if(status === 200){
        console.log("-- Seasons data:");
        console.log(data);
    }
});

client.getPlaylistsData(function(status, data){
    if(status === 200){
        console.log("-- Playlists data:");
        console.log(data);
    }
});

client.getTiersData(function(status, data){
    if(status === 200){
        console.log("-- Tiers data:");
        console.log(data);
    }
});