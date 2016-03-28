var rls = require('rls-api');

var client = new rls.Client({
    token: "79EFE805EF12FFF55DADF76CE542E3D7D347C76E2E31306286C691CC4B875BAC"
});

client.getPlatformsData(function(status, data){
    if(status == 200){
        console.log("-- Platforms data:");
        console.log(data);
    }
});

client.getSeasonsData(function(status, data){
    if(status == 200){
        console.log("-- Seasons data:");
        console.log(data);
    }
});

client.getPlaylistsData(function(status, data){
    if(status == 200){
        console.log("-- Playlists data:");
        console.log(data);
    }
});

client.getTiersData(function(status, data){
    if(status == 200){
        console.log("-- Tiers data:");
        console.log(data);
    }
});

// rls.platforms.STEAM - rls.platforms.PS4 - rls.platforms.XB1

client.getPlayer("76561198033338223", rls.platforms.STEAM, function(status, data){
    if(status == 200){
        console.log("-- Player Data:");
        console.log("   Display name: " + data.displayName);
        console.log("   Goals: " + data.stats.goals);
    }
});

client.searchPlayers("Mike", function(status, data){
    if(status == 200){
        console.log("-- Player Search Data:");
        console.log("   Results: " + data.results);
        console.log("   Total Results: " + data.totalResults);
    }
});

client.getRankedLeaderboard(rls.rankedPlaylists.DUEL, function(status, data){
    if(status == 200){
        console.log("-- Ranked Leaderboard:");
        console.log("   Leaderboard count: " + data.length);
        console.log("   Duel Number #1 Player: " + data[0].displayName);
    }
});

client.getStatLeaderboard(rls.statType.GOALS, function(status, data){
    if(status == 200){
        console.log("-- Stat Goals Leaderboard:");
        console.log("   Leaderboard count: " + data.length);
        console.log("   Goals #1 Player: " + data[0].displayName);
    }
});