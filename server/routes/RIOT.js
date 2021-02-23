const RIOT = require("../controllers/RIOT");

module.exports = (app, pretext) => {
	app.get(`/${pretext}/get_games_played_last_season`, async (req, res) => {
		const result = await RIOT.getGamesPlayedLastSeason(req);
		res.json(result);
	});
};
