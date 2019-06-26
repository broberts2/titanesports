const ChampionMastery = require("./riot_api/CHAMPION-MASTERY-V4");
const Champion = require("./riot_api/CHAMPION-V3");
const Leagues = require("./riot_api/LEAGUE-V4");
const LolStatus = require("./riot_api/LOL-STATUS-V3");
const Match = require("./riot_api/MATCH-V4");
const Spectator = require("./riot_api/SPECTATOR-V4");
const Summoner = require("./riot_api/SUMMONER-V4");
const ThirdParty = require("./riot_api/THIRD-PARTY-CODE-V4");
const Tournament = require("./riot_api/TOURNAMENT-V4");

const Fetch = require("./fetch");
const apiKey = require("../config").apiKey;

module.exports = {
  pastSeasonPeakRankBySummonerName: async (req, res) => {
    let summonerInfo = await Fetch.GET(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req
        .query.summonerName}?api_key=${apiKey}`
    );
    summonerInfo = JSON.parse(summonerInfo);
    let matchId = await Fetch.GET(
      `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerInfo.accountId}?api_key=${apiKey}`
    );
    matchId = JSON.parse(matchId);
    matchId = matchId.matches[0].gameId;
    let thing = await Fetch.GET(
      `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${apiKey}`
    );
    thing = JSON.parse(thing);
    let participantIdentities = thing.participantIdentities;
    thing = thing.participants.map(el => ({
      participantId: el.participantId,
      highestAchievedSeasonTier: el.highestAchievedSeasonTier
    }));
    participantIdentities = participantIdentities.filter(
      el =>
        el.player.summonerName.toLowerCase() ===
        req.query.summonerName.toLowerCase()
          ? el
          : null
    );
    return thing[participantIdentities[0].participantId - 1]
      .highestAchievedSeasonTier;
  },
  pastSeasonPeakRankAverageByTeam: async (req, res) => {
    const ranks = await Promise.all(
      req.body.team.map(async el => {
        const rank = await module.exports.pastSeasonPeakRankBySummonerName({
          query: {
            summonerName: el
          }
        });
        return {
          summoner: el,
          rank
        };
      })
    );
    return ranks;
  }
};
