const RIOT = require("../controllers/RIOT");
const Guard = require("../guard");

module.exports = (app, subdomain, pretext) => {
	app.get(
		`/${subdomain}/${pretext}/get_games_played_last_season`,
		async (req, res) => {
			const result = await RIOT.getGamesPlayedLastSeason(req);
			res.json(result);
		}
	);
	app.get(
		`/${subdomain}/${pretext}/fetchTournamentGameData`,
		async (req, res) => {
			const result = await RIOT.fetchTournamentGameData(req);
			res.json(result);
		}
	);
	app.post(`/${subdomain}/${pretext}/createCodes`, async (req, res) => {
		const result = await RIOT.createCodes(req);
		res.json(result);
	});
};
