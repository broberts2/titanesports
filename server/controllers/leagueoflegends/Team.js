const Team = require("../../models/Team");
const Account = require("../../models/Account");
const Oracle = require("../admin/Oracle");

module.exports = {
	createTeam: async (req) => {
		const roleId = await Oracle.createRole({
			body: {
				name: `${req.body.name} - ${
					req.body.league === "Divinity League" ? "Divinity" : "Conqueror"
				}`,
				color: req.body.league === "Divinity League" ? "YELLOW" : "RED",
			},
		}).then((role) => role.id);
		req.body.roster.map((userId) =>
			Oracle.assignRole({
				body: { userId, roleId },
			})
		);
		const team = await Team.create(Object.assign(req.body, { roleId }));
		await Promise.all(
			req.body.roster.map(async (discordId) => {
				const user = await Account.find({ discordId });
				await Account.updateOne(
					{ discordId },
					req.body.league === "Divinity League"
						? { divinityTeamId: team._id }
						: { conquerorTeamId: team._id }
				);
			})
		);
		return team;
	},
	getTeams: async (req) =>
		await Team.find(
			req.query && req.query.query
				? typeof req.query.query === "string"
					? JSON.parse(req.query.query)
					: req.query.query
				: {}
		),
	updateTeam: async (req) => {
		const ThisTeam = await Team.findOne({ _id: req.body._id });
		await Promise.all(
			ThisTeam.roster.map(
				async (el) =>
					await Oracle.unassignRole({
						body: { userId: el, roleId: ThisTeam.roleId },
					})
			)
		);
		await Promise.all(
			req.body.roster.map(
				async (el) =>
					await Oracle.assignRole({
						body: { userId: el, roleId: ThisTeam.roleId },
					})
			)
		);
		await Promise.all(
			ThisTeam.roster.map(async (discordId) => {
				const user = await Account.find({ discordId });
				await Account.updateOne(
					{ discordId },
					req.body.league === "Divinity League"
						? { divinityTeamId: null }
						: { conquerorTeamId: null }
				);
			})
		);
		await Promise.all(
			req.body.roster.map(async (discordId) => {
				await Account.updateOne(
					{ discordId },
					req.body.league === "Divinity League"
						? { divinityTeamId: ThisTeam._id }
						: { conquerorTeamId: ThisTeam._id }
				);
			})
		);
		return await Team.updateOne({ _id: req.body._id }, req.body);
	},
	deleteTeam: async (req) => {
		const ThisTeam = await Team.findOne({ _id: req.body._id });
		await Promise.all(
			ThisTeam.roster.map(async (el) => {
				await Account.updateOne(
					{ discordId: el },
					ThisTeam.league === "Divinity League"
						? { divinityTeamId: null }
						: { conquerorTeamId: null }
				);
				Oracle.unassignRole({
					body: { userId: el, roleId: ThisTeam.roleId },
				});
			})
		);
		Oracle.deleteRole({
			body: {
				id: ThisTeam.roleId,
			},
		});
		return await Team.remove({ _id: req.body._id });
	},
};
