const Team = require("../models/Team");
const Oracle = require("../controllers/Oracle");

module.exports = {
	post: async (req) => {
		return await Team.create({
			name: req.body.name,
			banner: req.body.banner,
			logo: req.body.logo,
			memberTopId: req.body.memberTopId,
			memberJungleId: req.body.memberJungleId,
			memberMidId: req.body.memberMidId,
			memberBottomId: req.body.memberBottomId,
			memberSupportId: req.body.memberSupportId,
			subsIds: req.body.subsIds,
			badges: req.body.badges,
		});
	},
	getAllTeams: async (req) => await Team.find({}),
	getTeamById: async (req) => {
		const team = await Team.findOne({ _id: req.query.id });
		const memberTop = await Oracle.getUser({ query: { id: team.memberTopId } });
		const memberJungle = await Oracle.getUser({
			query: { id: team.memberJungleId },
		});
		const memberMiddle = await Oracle.getUser({
			query: { id: team.memberMidId },
		});
		const memberBottom = await Oracle.getUser({
			query: { id: team.memberBottomId },
		});
		const memberSupport = await Oracle.getUser({
			query: { id: team.memberSupportId },
		});
		const subs = await Promise.all(
			team.subsIds.map(
				async (id) =>
					await Oracle.getUser({
						query: { id },
					})
			)
		);
		return {
			name: team.name,
			banner: team.banner,
			logo: team.logo,
			badges: team.badges,
			memberTop,
			memberJungle,
			memberMiddle,
			memberBottom,
			memberSupport,
			subs,
		};
	},
};
