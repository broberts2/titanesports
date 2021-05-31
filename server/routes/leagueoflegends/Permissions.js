const Permissions = require("../../controllers/Permissions");
const ResponseHandler = require("../../response_handler");

module.exports = (app, subdomain, pretext) => {
	app.post(`/${subdomain}/${pretext}/post`, async (req, res) => {
		const result = await Permissions.post(req);
		res.json(result);
	});
	app.put(`/${subdomain}/${pretext}/put`, async (req, res) => {
		const result = await Permissions.put(req);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/get`, async (req, res) => {
		const result = await Permissions.get(req);
		res.json(result);
	});
	app.delete(`/${subdomain}/${pretext}/delete`, async (req, res) => {
		const result = await Permissions.delete(req);
		res.json(result);
	});
};
