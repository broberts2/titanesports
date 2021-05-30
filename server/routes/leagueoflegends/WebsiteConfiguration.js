const WebsiteConfiguration = require("../../controllers/WebsiteConfiguration");
const Guard = require("../../guard");

module.exports = (app, subdomain, pretext) => {
	app.get(`/${subdomain}/${pretext}/get`, async (req, res) => {
		const result = await WebsiteConfiguration.get(req);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/queryStaticFiles`, async (req, res) => {
		const result = await Guard(
			req,
			"editSite",
			WebsiteConfiguration.queryStaticFiles
		);
		res.json(result);
	});
	app.post(`/${subdomain}/${pretext}/post`, async (req, res) => {
		const result = await Guard(req, "editSite", WebsiteConfiguration.post);
		res.json(result);
	});
	app.put(`/${subdomain}/${pretext}/put`, async (req, res) => {
		const result = await Guard(req, "editSite", WebsiteConfiguration.put);
		res.json(result);
	});
	app.delete(`/${subdomain}/${pretext}/delete`, async (req, res) => {
		const result = await Guard(req, "editSite", WebsiteConfiguration.delete);
		res.json(result);
	});
};
