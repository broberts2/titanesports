const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

const endpoint = "https://na1.api.riotgames.com";

module.exports = {
  // Get all the positional league entries.
  featuredGames: async (req, res) =>
    Fetch.GET(`${endpoint}/lol/spectator/v4/featured-games?api_key=${apiKey}`)
};
