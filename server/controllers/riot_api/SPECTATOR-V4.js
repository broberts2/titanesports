const Fetch = require("../fetch");
const apiKey = require("../../config").apiKey;

module.exports = {
  // Get all the positional league entries.
  featuredGames: async (req, res) =>
    Fetch.GET(
      `https://na1.api.riotgames.com/lol/spectator/v4/featured-games?api_key=${apiKey}`
    )
};
