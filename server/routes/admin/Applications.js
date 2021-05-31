const Applications = require("../../controllers/admin/Applications");
const ResponseHandler = require("../../response_handler");
const Guard = require("../../guard");

module.exports = (app, subdomain, pretext) => {
	app.post(`/${subdomain}/${pretext}/postApplication`, async (req, res) => {
		ResponseHandler(Applications.post, req, res);
	});
	app.get(`/${subdomain}/${pretext}/getApplications`, async (req, res) => {
		ResponseHandler(Applications.get, req, res);
	});
};
