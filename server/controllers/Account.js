const Account = require("../models/Account");
const Oracle = require("../controllers/Oracle");

module.exports = {
	post: async (req) => {
		return await Account.create({
			discordId: req.body.discordId,
			titanPoints: 0,
		});
	},
	initializeAccounts: async (req) => {
		const list = await Oracle.getAllUsers(req);
		await Promise.all(
			list.map(async (acct) => {
				try {
					await Account.create({ discordId: acct.user.id, titanPoints: 0 });
				} catch (e) {}
			})
		);
		return "Success";
	},
	get: async () => await Account.findOne({}),
	put: async (req) =>
		await Account.updateOne({ discordId: req.body.id }, req.body),
	verify: async (req) => {
		console.log(req);
		await Account.updateOne(
			{ discordId: req.body.id },
			{ summonerId: req.body.summonerId }
		);
		return "Success";
	},
};
