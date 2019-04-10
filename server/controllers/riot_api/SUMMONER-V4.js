const Fetch = require("../fetch");

module.exports = {
  // Get a summoner by account ID.
  summonerByAccountId: accountId =>
    Fetch.GET(`/lol/summoner/v4/summoners/by-account/${accountId}`),
  // Get a summoner by summoner name.
  summonerByName: summonerName =>
    Fetch.GET(`/lol/summoner/v4/summoners/by-name/${summonerName}`),
  // Get a summoner by PUUID.
  summonerByPUUID: PUUID =>
    Fetch.GET(`/lol/summoner/v4/summoners/by-puuid/${PUUID}`),
  // Get a summoner by summoner ID.
  summonerBySummonerId: accountId =>
    Fetch.GET(`/lol/summoner/v4/summoners/${accountId}`)
};
