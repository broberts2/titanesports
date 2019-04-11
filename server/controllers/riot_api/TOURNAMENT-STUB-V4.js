const Fetch = require("../fetch");

module.exports = {
  // Create a mock tournament code for the given tournament.
  createTournamentCode: (req, res) =>
    Fetch.POST(
      `/lol/tournament-stub/v4/codes/${req.query.tournamentCode}`,
      req.body
    ),
  // Gets a mock list of lobby events by tournament code
  lobbyEventsByTournamentCode: (req, res) =>
    Fetch.GET(
      `/lol/tournament-stub/v4/lobby-events/by-code/${req.query.tournamentCode}`
    ),
  // Creates a mock tournament provider and returns its ID
  tournamentProvider: (req, res) =>
    Fetch.POST(`/lol/tournament-stub/v4/providers`, req.body),
  // Creates a mock tournament and returns its ID.
  createTournament: (req, res) =>
    Fetch.POST(`/lol/tournament-stub/v4/tournaments`, req.body)
};
