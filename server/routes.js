const RIOT = require("./controllers/RIOT");
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
	GameData: require("./routes/GameData"),
	DataDragon: require("./routes/DataDragon"),
};

module.exports = (app, riot) => {
	for (let key in ROUTES) {
		ROUTES[key](app, key);
	}
	riot.post(`/RIOT/callback`, async (req, res) => {
		const result = await RIOT.callback(req);
		res.json(result);
	});
};
