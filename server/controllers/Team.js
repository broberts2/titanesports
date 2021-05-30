const Team = require("../models/Team");
const Oracle = require("./admin/Oracle");

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
		const memberTop = team.memberTopId
			? await Oracle.getUser({ query: { id: team.memberTopId } })
			: null;
		const memberJungle = team.memberJungleId
			? await Oracle.getUser({
					query: { id: team.memberJungleId },
			  })
			: null;
		const memberMiddle = team.memberMidId
			? await Oracle.getUser({
					query: { id: team.memberMidId },
			  })
			: null;
		const memberBottom = team.memberBottomId
			? await Oracle.getUser({
					query: { id: team.memberBottomId },
			  })
			: null;
		const memberSupport = team.memberSupportId
			? await Oracle.getUser({
					query: { id: team.memberSupportId },
			  })
			: null;
		const subs = team.subsIds
			? await Promise.all(
					team.subsIds.map(
						async (id) =>
							await Oracle.getUser({
								query: { id },
							})
					)
			  )
			: null;
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
