const TitanDraftConfiguration = require("../../controllers/TitanDraftConfiguration");

const ConfigID = "5faf2c5f28e55d0812a77ee9";

module.exports = (app, subdomain, pretext) => {
	app.get(`/${subdomain}/${pretext}/get`, async (req, res) => {
		const result = await TitanDraftConfiguration.get(ConfigID);
		res.json(result);
	});
	app.post(`/${subdomain}/${pretext}/post`, async (req, res) => {
		const result = await TitanDraftConfiguration.post(req);
		res.json(result);
	});
	app.put(`/${subdomain}/${pretext}/put`, async (req, res) => {
		const result = await TitanDraftConfiguration.put(req);
		res.json(result);
	});
	app.delete(`/${subdomain}/${pretext}/delete`, async (req, res) => {
		const result = await TitanDraftConfiguration.delete(req);
		res.json(result);
	});
};
