const ChampionData = require("../models/ChampionData");

module.exports = {
  post: async (req) => await ChampionData.create(req.body),
  get: async (req) =>
    req.query && req.query.champion
      ? await ChampionData.findOne({ name: req.query.champion })
      : await ChampionData.find({}),
};
