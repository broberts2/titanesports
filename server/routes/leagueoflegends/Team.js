const Team = require("../controllers/Team");

module.exports = (app, subdomain, pretext) => {
	app.post(`/${subdomain}/${pretext}/post`, async (req, res) => {
		const result = await Team.post(req);
		res.json(result);
	});
	app.put(`/${subdomain}/${pretext}/put`, async (req, res) => {
		const result = await Team.put(req);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/get_team_by_id`, async (req, res) => {
		const result = await Team.getTeamById(req);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/get_all_teams`, async (req, res) => {
		const result = await Team.getAllTeams(req);
		res.json(result);
	});
	app.delete(`/${subdomain}/${pretext}/delete`, async (req, res) => {
		const result = await Team.delete(req);
		res.json(result);
	});
};
