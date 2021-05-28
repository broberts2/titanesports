const GameData = require("../controllers/GameData");
const Guard = require("../guard");

module.exports = (app, subdomain, pretext) => {
	app.post(`/${subdomain}/${pretext}/postGameData`, async (req, res) => {
		const result = await GameData.postGameData(req);
		res.json(result);
	});
	app.post(`/${subdomain}/${pretext}/query`, async (req, res) => {
		const result = await GameData.query(req);
		res.json(result);
	});
};
