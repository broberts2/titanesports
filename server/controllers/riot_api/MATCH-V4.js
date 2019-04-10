const Fetch = require("../fetch");

module.exports = {
  // Get match by match ID.
  matchById: (req, res) =>
    Fetch.GET(`/lol/match/v4/matches/${req.query.matchId}`),
  // Get matchlist for games played on given account ID and platform ID and filtered using given filter parameters, if any.
  accountMatchList: (req, res) =>
    Fetch.GET(`/lol/match/v4/matchlists/by-account/${req.query.accountId}`),
  // Get match timeline by match ID.
  matchTimelineById: (req, res) =>
    Fetch.GET(`/lol/match/v4/timelines/by-match/${req.query.matchId}`),
  // Get match IDs by tournament code.
  matchIdsByTournamentCode: (req, res) =>
    Fetch.GET(
      ` /lol/match/v4/matches/by-tournament-code/${req.query
        .tournamentCode}/ids`
    ),
  // Get match by match ID and tournament code.
  matchIdAndTournamentCode: (req, res) =>
    Fetch.GET(
      `/lol/match/v4/matches/${req.query.matchId}/by-tournament-code/${req.query
        .tournamentCode}`
    )
};
