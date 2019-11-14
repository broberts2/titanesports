const config = require("../config");
const fetch = require("node-fetch");

module.exports = {
  fetchGameData: async req => {
    const matchId = await fetch(
      `https://na1.api.riotgames.com/lol/match/v4/matches/by-tournament-code/${req.query.code}/ids?api_key=${config.tournamentApiKey}`
    ).then(res => res.json());
    let gameData = await fetch(
      `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}/by-tournament-code/${req.query.code}?api_key=${config.tournamentApiKey}`
    ).then(res => res.json());
    return {
      gameData,
      code: gameData.status ? gameData.status.status_code : 200,
      msg: gameData.status ? gameData.status.message : "Success!"
    };
  }
};
