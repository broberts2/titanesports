const ROUTES = {
  TitanDraft: require("./routes/TitanDraft"),
  TitanDraftConfiguration: require("./routes/TitanDraftConfiguration"),
  WebsiteConfiguration: require("./routes/WebsiteConfiguration"),
  ChampionData: require("./routes/ChampionData"),
  Article: require("./routes/Article"),
  Permissions: require("./routes/Permissions"),
  Oracle: require("./routes/Oracle"),
  Badge: require("./routes/Badge")
};

module.exports = (app) => {
  for (let key in ROUTES) {
    ROUTES[key](app, key);
  }
};
