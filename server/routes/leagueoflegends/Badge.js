const Badge = require("../../controllers/Badge");
const ResponseHandler = require("../../response_handler");
const Guard = require("../../guard");

module.exports = (app, subdomain, pretext) => {
	app.post(`/${subdomain}/${pretext}/post`, async (req, res) => {
		const result = await Guard(req, "editBadges", Badge.post);
		res.json(result);
	}),
		app.get(`/${subdomain}/${pretext}/getBadgeById`, async (req, res) => {
			const result = await Badge.getBadgeById(req);
			res.json(result);
		}),
		app.post(`/${subdomain}/${pretext}/getBadgeBatchById`, async (req, res) => {
			const result = await Badge.getBadgeBatchById(req);
			res.json(result);
		});
};
