const DataDragon = require("../controllers/DataDragon");

module.exports = (app, subdomain, pretext) => {
	app.get(`/${subdomain}/${pretext}/getChampionDataById`, async (req, res) => {
		const result = await DataDragon.getChampionDataById(req);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/getChampionData`, async (req, res) => {
		const result = await DataDragon.getChampionData(req);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/getItemDataById`, async (req, res) => {
		const result = await DataDragon.getItemDataById(req);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/getItemData`, async (req, res) => {
		const result = await DataDragon.getItemData(req);
		res.json(result);
	});
};
