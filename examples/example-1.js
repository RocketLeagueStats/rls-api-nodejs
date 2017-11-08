var rls = require('../lib/index');

var client = new rls.Client({
    token: "your_api_key"
});

client.getPlatformsData(function(status, data){
    if(status === 200){
        console.log("-- Platforms data:");
        console.log(data);
    } else {
        console.log("-- getPlatformsData failed: " + status);
    }
});

client.getSeasonsData(function(status, data){
    if(status === 200){
        console.log("-- Seasons data:");
        console.log(data);
    } else {
        console.log("-- getSeasonsData failed: " + status);
    }
});

client.getPlaylistsData(function(status, data){
    if(status === 200){
        console.log("-- Playlists data:");
        console.log(data);
    } else {
        console.log("-- getPlaylistsData failed: " + status);
    }
});

client.getTiersData(function(status, data){
    if(status === 200){
        console.log("-- Tiers data:");
        console.log(data);
    } else {
        console.log("-- getTiersData failed: " + status);
    }
});

client.getPlayer("76561198033338223", rls.platforms.STEAM, function(status, data){
    if(status === 200){
        console.log("-- Player Data:");
        console.log("   Display name: " + data.displayName);
        console.log("   Goals: " + data.stats.goals);
    } else {
        console.log("-- getPlayer failed: " + status);
    }
});

client.searchPlayers("Mike", 0, function(status, data){
    if(status === 200){
        console.log("-- Player Search Data:");
        console.log("   Results: " + data.results);
        console.log("   Total Results: " + data.totalResults);
    } else {
        console.log("-- searchPlayers failed: " + status);
    }
});

client.getRankedLeaderboard(rls.rankedPlaylists.DUEL, function(status, data){
    if(status === 200){
        console.log("-- Ranked Leaderboard:");
        console.log("   Leaderboard count: " + data.length);
        console.log("   Duel Number #1 Player: " + data[0].displayName);
    } else {
        console.log("-- getRankedLeaderboard failed: " + status);
    }
});

client.getStatLeaderboard(rls.statType.GOALS, function(status, data){
    if(status === 200){
        console.log("-- Stat Goals Leaderboard:");
        console.log("   Leaderboard count: " + data.length);
        console.log("   Goals #1 Player: " + data[0].displayName);
    } else {
        console.log("-- getStatLeaderboard failed: " + status);
    }
});