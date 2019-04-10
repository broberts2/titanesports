const Fetch = require("../fetch");

module.exports = {
  // Get match by match ID.
  matchById: matchId => Fetch.GET(`/lol/match/v4/matches/${matchId}`),
  // Get matchlist for games played on given account ID and platform ID and filtered using given filter parameters, if any.
  accountMatchList: accountId =>
    Fetch.GET(`/lol/match/v4/matchlists/by-account/${encryptedAccountId}`),
  // Get match timeline by match ID.
  matchTimelineById: matchId =>
    Fetch.GET(`/lol/match/v4/timelines/by-match/${matchId}`),
  // Get match IDs by tournament code.
  matchIdsByTournamentCode: tournamentCode =>
    Fetch.GET(
      ` /lol/match/v4/matches/by-tournament-code/${tournamentCode}/ids`
    ),
  // Get match by match ID and tournament code.
  matchIdAndTournamentCode: (matchId, tournmentCode) =>
    Fetch.GET(
      `/lol/match/v4/matches/{matchId}/by-tournament-code/${tournamentCode}`
    )
};
