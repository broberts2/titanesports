const Oracle = require("../../controllers/admin/Oracle");
const Guard = require("../../guard");

module.exports = (app, subdomain, pretext) => {
	app.get(`/${subdomain}/${pretext}/OATH2`, async (req, res) => {
		const result = await Oracle.OATH2(req, subdomain);
		res.redirect(result);
	});
};
