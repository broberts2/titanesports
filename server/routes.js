const ROUTES = {
  TitanDraft: require("./routes/TitanDraft"),
  TitanDraftConfiguration: require("./routes/TitanDraftConfiguration"),
  ChampionData: require("./routes/ChampionData"),
};

module.exports = (app) => {
  for (let key in ROUTES) {
    ROUTES[key](app, key);
  }
};
