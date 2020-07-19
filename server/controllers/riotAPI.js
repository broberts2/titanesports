const config = require("../config");
const fetch = require("node-fetch");
const ObjectId = require("mongodb").ObjectID;
const GameData = require("../models/gameData");

module.exports = {
  createTournamentCode: async (req, level) => {
    if (req.user_info.level > level) {
      return {
        msg: "Access Denied",
        code: 403,
      };
    }
    const _metadata = (gameNum) =>
      JSON.stringify({
        team1: req.query.team1
          ? parseInt(gameNum) % 2 === 0
            ? req.query.team2
            : req.query.team1
          : "",
        team2: req.query.team2
          ? parseInt(gameNum) % 2 === 0
            ? req.query.team1
            : req.query.team2
          : "",
        weekNum: req.query.weekNum ? req.query.weekNum : "",
        gameNum: gameNum ? gameNum : "",
        seasonNum: req.query.seasonNum ? req.query.seasonNum : "",
        league: req.query.league ? req.query.league : "",
      });
    const _get_code = async (gameNum) =>
      await fetch(
        `https://americas.api.riotgames.com/lol/tournament/v4/codes?tournamentId=529491&api_key=${config.tournamentApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mapType: "SUMMONERS_RIFT",
            metadata: _metadata(gameNum),
            pickType: "TOURNAMENT_DRAFT",
            spectatorType: "ALL",
            teamSize: 5,
          }),
        }
      )
        .then((res) => res.json())
        .then((arr) => {
          return arr[0];
        });
    let codes = [];
    const n = req.query.n && req.query.n > 0 ? req.query.n : 1;
    for (let i = 0; i < n; i++) {
      codes.push(_get_code);
    }
    codes = await Promise.all(
      codes.map(async (el, i) => {
        const code = await el(i + 1);
        await GameData.create({
          code,
          team1: req.query.team1 ? req.query.team1 : null,
          team2: req.query.team2 ? req.query.team2 : null,
          weekNum: req.query.weekNum ? req.query.weekNum : null,
          gameNum: i + 1,
          seasonNum: req.query.seasonNum ? req.query.seasonNum : null,
          league: req.query.league ? req.query.league : null,
        });
        return code;
      })
    );
    console.log(codes);
    return {
      code: 200,
      msg: "Code Generation Successful!",
      codes,
    };
  },
  getGameStatsByCode: async (req, res, level) => {
    const data = await GameData.findOne({ code: req.query.code });
    console.log(data);
    if (data) {
      return {
        code: 200,
        msg: "Code Generation Successful!",
        data,
      };
    } else {
      return {
        code: 200,
        msg: "Code does not exist",
      };
    }
  },
};
