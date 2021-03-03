const GameData = require("../controllers/GameData");
const Guard = require("../guard");

module.exports = (app, pretext) => {
	app.post(`/${pretext}/postGameData`, async (req, res) => {
		const result = await GameData.postGameData(req);
		res.json(result);
	});
	app.post(`/${pretext}/query`, async (req, res) => {
		const result = await GameData.query(req);
		res.json(result);
	});
};
