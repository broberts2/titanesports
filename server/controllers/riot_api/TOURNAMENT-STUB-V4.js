const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

module.exports = {
  // Create a mock tournament code for the given tournament.
  createTournamentCode: (req, res) =>
    Fetch.POST(
      `https://americas.api.riotgames.com/lol/tournament-stub/v4/codes?tournamentId=${req
        .query.tournamentId}&api_key=${apiKey}`,
      req.body
    ),
  // Gets a mock list of lobby events by tournament code
  lobbyEventsByTournamentCode: (req, res) =>
    Fetch.GET(
      `https://americas.api.riotgames.com/lol/tournament-stub/v4/lobby-events/by-code/${req
        .query.tournamentCode}?api_key=${apiKey}`
    ),
  // Creates a mock tournament provider and returns its ID
  tournamentProvider: (req, res) =>
    Fetch.POST(
      `https://americas.api.riotgames.com/lol/tournament-stub/v4/providers?api_key=${apiKey}`,
      req.body
    ),
  // Creates a mock tournament and returns its ID.
  createTournament: (req, res) =>
    Fetch.POST(
      `https://americas.api.riotgames.com/lol/tournament-stub/v4/tournaments?api_key=${apiKey}`,
      req.body
    )
};
