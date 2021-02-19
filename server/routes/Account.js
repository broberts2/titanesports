const Account = require("../controllers/Account");
const Guard = require("../guard");

module.exports = (app, pretext) => {
	app.post(`/${pretext}/post`, async (req, res) => {
		const result = await Account.post(req);
		res.json(result);
	});
	app.post(`/${pretext}/initializeAccounts`, async (req, res) => {
		const result = await Account.initializeAccounts(req);
		res.json(result);
	});
	app.put(`/${pretext}/put`, async (req, res) => {
		const result = await Account.put(req);
		res.json(result);
	});
	app.put(`/${pretext}/verify`, async (req, res) => {
		const result = await Guard(req, "verifySummoners", Account.verify);
		res.json(result);
	});
	app.put(`/${pretext}/updateSelf`, async (req, res) => {
		if (req.body.id === req.body.myId) {
			const result = await Account.put(req);
			res.json(result);
		} else {
			res.json("Unauthorized.");
		}
	});
	app.get(`/${pretext}/get`, async (req, res) => {
		const result = await Account.get(req);
		res.json(result);
	});
	app.delete(`/${pretext}/delete`, async (req, res) => {
		const result = await Account.delete(req);
		res.json(result);
	});
};
