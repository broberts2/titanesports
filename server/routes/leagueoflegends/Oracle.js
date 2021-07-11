const Oracle = require("../../controllers/admin/Oracle");
const ResponseHandler = require("../../response_handler");
const Guard = require("../../guard");

module.exports = (app, subdomain, pretext, multer) => {
	app.get(`/${subdomain}/${pretext}/OATH2`, async (req, res) => {
		const result = await Oracle.OATH2(req, subdomain);
		res.redirect(result);
	});
	app.post(
		`/${subdomain}/${pretext}/videoSubmission`,
		multer({ dest: `../static/uploads/communityclips` }).any(),
		async (req, res) => {
			ResponseHandler(Oracle.uploadMedia, req, res);
		}
	);
};
