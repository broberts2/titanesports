const ChampionData = require("../../controllers/ChampionData");

module.exports = (app, subdomain, pretext) => {
	app.post(`/${subdomain}/${pretext}/post`, async (req, res) => {
		const result = await ChampionData.post(req);
		res.json(result);
	});
	app.put(`/${subdomain}/${pretext}/put`, async (req, res) => {
		const result = await ChampionData.put(req);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/get`, async (req, res) => {
		const result = await ChampionData.get(req);
		res.json(result);
	});
	app.delete(`/${subdomain}/${pretext}/delete`, async (req, res) => {
		const result = await ChampionData.delete(req);
		res.json(result);
	});
};
