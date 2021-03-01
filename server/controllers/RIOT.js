const config = require("../config");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports = {
	getGamesPlayedLastSeason: async (req) => {
		const acct = await fetch(
			`https://na1.api.riotgames.com/lol/summoner/v4/summoners/${req.query.id}?api_key=${config.riotGeneralApiKey}`
		).then((res) => res.json());
		const getGames = async (index = 0, t = []) => {
			const matchesBatch = await fetch(
				`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${acct.accountId}?beginIndex=${index}&api_key=${config.riotGeneralApiKey}`
			).then((res) => res.json());
			if (matchesBatch.endIndex >= matchesBatch.totalGames) {
				return t.concat(matchesBatch.matches);
			} else {
				return getGames((index += 100), t.concat(matchesBatch.matches));
			}
		};
		const seasonStart = new Date(2020, 0, 10);
		const seasonEnd = new Date(2020, 10, 10);
		const res = await getGames().then((games) =>
			games.filter((g) => {
				const datePlayed = new Date(g.timestamp);
				if (
					(g.queue === 420 || g.queue === 4) &&
					seasonEnd > datePlayed &&
					seasonStart < datePlayed
				) {
					return g;
				}
			})
		);
		return {
			name: acct.name,
			seasonStart: seasonStart,
			seasonEnd: seasonEnd,
			gamesPlayed: res.length,
		};
	},
	createCodes: async (req) => {
		const code = await fetch(
			`https://americas.api.riotgames.com/lol/tournament/v4/codes?tournamentId=${config.tournamentId}&api_key=${config.riotTournamentKey}`,
			{
				headers: { ["Content-Type"]: "application/json" },
				body: JSON.stringify({
					metadata: req.body.metadata,
					mapType: "SUMMONERS_RIFT",
					pickType: "TOURNAMENT_DRAFT",
					spectatorType: "ALL",
					teamSize: 5,
				}),
			}
		).then((res) => res.json());
		return code;
	},
	callback: async (req) => {
		console.log(req.body);
		return "Success!";
	},
};
