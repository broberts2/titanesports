const config = require("../config");
const fetch = require("node-fetch");
const Team = require("../models/Team");
const fs = require("fs");
const OracleUtils = require("./Oracle").OracleUtils;

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
	fetchGameData: async (req) => {
		const matchId = await fetch(
			`https://na1.api.riotgames.com/lol/match/v4/matches/by-tournament-code/${req.query.tournamentCode}/ids?api_key=${config.riotTournamentKey}`
		).then((res) => res.json());
		if (matchId[0]) {
			const data = await fetch(
				`https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${config.riotGeneralApiKey}`
			).then((res) => res.json());
			return data;
		} else {
			return matchId;
		}
	},
	callback: async (req) => {
		console.log(req.body);
		const gameData = await module.exports.fetchGameData({
			query: { tournamentCode: req.body.shortCode },
		});
		const team1 = await Team.findOne({ _id: gameData.metadata.team1 });
		const team2 = await Team.findOne({ _id: gameData.metadata.team2 });
		if (team1 && team2) {
			OracleUtils.SendMessage({
				channel: "801661248361725994",
				message: `${team1.name} vs ${team2.name}\n\nGame ${
					gameData.metadata.gameNum
				} Results\n\n${
					gameData.teams[0].win ? team1.name : team2.name
				} - wins!`,
				status: null,
				img: `https://titan-esports.org:7000/${
					gameData.teams[0].win ? team1.logo : team2.logo
				}`,
			});
		}
		return "Success!";
	},
};
