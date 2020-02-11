const config = require("../config");
const fetch = require("node-fetch");
const GameStats = require("../models/game_stats");
const PlayerStats = require("../models/player_stats");
const ObjectId = require("mongodb").ObjectID;
const riotSanitizer = require("../riotSanitizer");

module.exports = {
  createTournamentCode: async (req, res, level) => {
    if (req.user_info.level > level) {
      return res.json({
        msg: "Access Denied",
        code: 403
      });
    }
    const _get_code = async () =>
      await fetch(
        `https://americas.api.riotgames.com/lol/tournament/v4/codes?tournamentId=529491&api_key=${config.tournamentApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            mapType: "SUMMONERS_RIFT",
            metadata: "",
            pickType: "TOURNAMENT_DRAFT",
            spectatorType: "LOBBYONLY",
            teamSize: 5
          })
        }
      )
        .then(res => res.json())
        .then(arr => arr[0]);
    let codes = [];
    const n = req.query.n && req.query.n > 0 ? req.query.n : 1;
    for (let i = 0; i < n; i++) {
      codes.push(_get_code);
    }
    codes = await Promise.all(codes.map(el => el()));
    return res.json({
      code: 200,
      msg: "Code Generation Successful!",
      codes
    });
  },
  saveGameToDatabase: async (req, res, level) => {
    if (req.user_info.level > level) {
      return res.json({
        msg: "Access Denied",
        code: 403
      });
    }
    const matchId = await fetch(
      `https://na1.api.riotgames.com/lol/match/v4/matches/by-tournament-code/${req.body.code}/ids?api_key=${config.tournamentApiKey}`
    ).then(res => res.json());
    const gameData = await fetch(
      `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}/by-tournament-code/${req.body.code}?api_key=${config.tournamentApiKey}`
    ).then(res => res.json());
    try {
      const data = await GameStats.create(
        riotSanitizer(
          gameData,
          req.body.code,
          req.body.t1,
          req.body.t2,
          req.body.tesSeason,
          req.body.league
        )
      );
      let prmsArray = [];
      const calcAvg = (history, stats) => {
        const _history = Object.values(history);
        const averageObj = {};
        _history.reduce((a, b) => {
          for (let key in a) {
            averageObj[key] = a[key] + b[key];
          }
        });
        for (let key in averageObj) {
          averageObj[key] = averageObj[key] / _history.length;
        }
        return averageObj;
      };
      for (let i = 1; i <= 2; i++) {
        try {
          Object.values(data[`team${i}`].participants).map(el =>
            prmsArray.push(
              new Promise(async (resolve, reject) => {
                const statObj = await PlayerStats.findOne({
                  lolAccountId: el.accountId
                });
                el.stats.tournamentCode = req.body.code;
                el.stats.league = req.body.league;
                if (statObj) {
                  let history =
                    statObj.stats[`season_${data.tesSeason}`].history;
                  history[data._id] = el.stats;
                  const average = calcAvg(history, el.stats);
                  await PlayerStats.update(
                    { lolAccountId: el.accountId },
                    {
                      stats: {
                        [`season_${data.tesSeason}`]: {
                          average,
                          history
                        }
                      }
                    }
                  );
                } else {
                  await PlayerStats.create({
                    lolAccountId: el.accountId,
                    summonerName: el.summonerName,
                    summonerId: el.summonerId,
                    stats: {
                      [`season_${data.tesSeason}`]: {
                        average: el.stats,
                        history: {
                          [data._id]: el.stats
                        }
                      }
                    }
                  });
                }
                resolve();
              })
            )
          );
        } catch (e) {
          console.log(e);
        }
      }
      await Promise.all(prmsArray);
      return res.json({
        code: 200,
        msg: "Game Stats Save Successful!",
        data
      });
    } catch (e) {
      return res.json({ code: e.code, msg: e.errmsg });
    }
  }
};
