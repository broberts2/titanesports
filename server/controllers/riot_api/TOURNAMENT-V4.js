const Fetch = require("../fetch");
const tournamentApiKey = require("../../config").tournamentApiKey;

const endpoint = "https://americas.api.riotgames.com";

module.exports = {
  // Creates a tournament code for the given tournament.
  createTournamentCode: async (req, res) =>
    Fetch.POST(
      `${endpoint}/lol/tournament/v4/codes?tournamentId=${req.query
        .tournamentId}&api_key=${tournamentApiKey}`,
      req.body
    ),
  // Returns the tournament code DTO associated with a tournament code string.
  getTournamentMatchByCode: async (req, res) =>
    Fetch.GET(
      `${endpoint}/lol/tournament/v4/codes/${req.query
        .tournamentCode}?tournamentId=${req.query
        .tournamentId}&api_key=${tournamentApiKey}`
    ),
  // Update the pick type, map, spectator type, or allowed summoners for a code.
  updateTournamentCode: async (req, res) =>
    Fetch.PUT(
      `${endpoint}/lol/tournament/v4/codes/${req.query
        .tournamentCode}?tournamentId=${req.query
        .tournamentId}&api_key=${tournamentApiKey}`,
      req.body
    ),
  // Gets a list of lobby events by tournament code.
  lobbyEventsByCode: async (req, res) =>
    Fetch.GET(
      `${endpoint}/lol/tournament/v4/lobby-events/by-code/${req.query
        .tournamentCode}?api_key=${tournamentApiKey}`
    ),
  // Creates a tournament provider and returns its ID.
  createTournamentProvider: async (req, res) =>
    Fetch.POST(
      `${endpoint}/lol/tournament/v4/providers?api_key=${tournamentApiKey}`
    ),
  // Creates a tournament and returns its ID.
  createTournament: async (req, res) =>
    Fetch.POST(
      `${endpoint}/lol/tournament/v4/tournaments?api_key=${tournamentApiKey}`
    )
};
