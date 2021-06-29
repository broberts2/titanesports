const ResponseHandler = require("../../response_handler");
const Guard = require("../../guard");

module.exports = (app, subdomain, pretext, OBS) => {
	app.post(`/${subdomain}/${pretext}/startOBS`, async (req, res) => {
		ResponseHandler(OBS.startOBS, req, res);
	});
	app.post(`/${subdomain}/${pretext}/exitOBS`, async (req, res) => {
		ResponseHandler(OBS.exitOBS, req, res);
	});
	app.get(`/${subdomain}/${pretext}/queryOBSStatus`, async (req, res) => {
		ResponseHandler(OBS.queryOBSStatus, req, res);
	});
};
