const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

module.exports = {
  // Get match by match ID.
  matchById: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/match/v4/matches/${req.query
        .matchId}?api_key=${apiKey}`
    ),
  // Get matchlist for games played on given account ID and platform ID and filtered using given filter parameters, if any.
  accountMatchList: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${req
        .query.accountId}?api_key=${apiKey}`
    ),
  // Get match timeline by match ID.
  matchTimelineById: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/${req.query
        .matchId}?api_key=${apiKey}`
    ),
  // Get match IDs by tournament code.
  matchIdsByTournamentCode: (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/match/v4/matches/by-tournament-code/${req
        .query.tournamentCode}/ids?api_key=${apiKey}`
    ),
  // Get match by match ID and tournament code.
  matchIdAndTournamentCode: (req, res) =>
    Fetch.GET(
      `/lol/match/v4/matches/${req.query.matchId}/by-tournament-code/${req.query
        .tournamentCode}?api_key=${apiKey}`
    )
};
