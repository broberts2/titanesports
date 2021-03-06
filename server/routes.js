const RIOT = require("./controllers/leagueoflegends/RIOT");
const ROUTES = {
	admin: {
		Oracle: require("./routes/admin/Oracle"),
		Applications: require("./routes/admin/Applications"),
		Twitter: require("./routes/admin/Twitter"),
		Account: require("./routes/admin/Account"),
	},
	titandraft: {
		TitanDraft: require("./routes/titandraft/TitanDraft"),
	},
	leagueoflegends: {
		ChampionData: require("./routes/leagueoflegends/ChampionData"),
		Article: require("./routes/leagueoflegends/Article"),
		Permissions: require("./routes/leagueoflegends/Permissions"),
		Oracle: require("./routes/leagueoflegends/Oracle"),
		Badge: require("./routes/leagueoflegends/Badge"),
		Team: require("./routes/leagueoflegends/Team"),
		RIOT: require("./routes/leagueoflegends/RIOT"),
		GameData: require("./routes/leagueoflegends/GameData"),
		DataDragon: require("./routes/leagueoflegends/DataDragon"),
	},
	valorant: {},
};

module.exports = (app, riot, multer) => {
	for (let key in ROUTES) {
		for (let subkey in ROUTES[key]) {
			ROUTES[key][subkey](app, key, subkey, multer);
		}
	}
	riot.post(`/RIOT/callback`, async (req, res) => {
		const result = await RIOT.callback(req);
		res.json(result);
	});
};
