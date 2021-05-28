const Oracle = require("../controllers/Oracle");
const Guard = require("../guard");

module.exports = (app, subdomain, pretext) => {
	app.get(`/${subdomain}/${pretext}/OATH2`, async (req, res) => {
		const result = await Oracle.OATH2(req);
		res.redirect(result);
	}),
		app.get(`/${subdomain}/${pretext}/identify`, async (req, res) => {
			const result = await Oracle.identify(req);
			res.json(result);
		});
	app.get(`/${subdomain}/${pretext}/getUser`, async (req, res) => {
		const result = await Oracle.getUser(req);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/getAllUsers`, async (req, res) => {
		const result = await Guard(req, "oracleGetAllUsers", Oracle.getAllUsers);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/getAllRoles`, async (req, res) => {
		const result = await Guard(req, "oracleGetAllRoles", Oracle.getAllRoles);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/getAllChannels`, async (req, res) => {
		const result = await Oracle.getAllChannels(req);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/auth_action`, async (req, res) => {
		const result = await Oracle.authAction(req);
		res.json(result);
	});
	app.post(`/${subdomain}/${pretext}/create_flash_poll`, async (req, res) => {
		const result = await Guard(req, "oracleFlashPoll", Oracle.createFlashPoll);
		res.json(result);
	});
	app.post(
		`/${subdomain}/${pretext}/create_tournament_codes`,
		async (req, res) => {
			const result = await Guard(
				req,
				"oracleCreateCodes",
				Oracle.createTournamentCodes
			);
			res.json(result);
		}
	);
};
