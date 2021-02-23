const ROUTES = {
	TitanDraft: require("./routes/TitanDraft"),
	Account: require("./routes/Account"),
	TitanDraftConfiguration: require("./routes/TitanDraftConfiguration"),
	WebsiteConfiguration: require("./routes/WebsiteConfiguration"),
	ChampionData: require("./routes/ChampionData"),
	Article: require("./routes/Article"),
	Permissions: require("./routes/Permissions"),
	Oracle: require("./routes/Oracle"),
	Badge: require("./routes/Badge"),
	Team: require("./routes/Team"),
	RIOT: require("./routes/RIOT"),
};

module.exports = (app) => {
	for (let key in ROUTES) {
		ROUTES[key](app, key);
	}
};
