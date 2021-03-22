const config = require("../config");
const fetch = require("node-fetch");
const Team = require("../models/Team");
const GameData = require("../models/GameData");
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
	fetchTournamentGameData: async (req) => {
		const metaData = await fetch(
			`https://americas.api.riotgames.com/lol/tournament/v4/codes/${req.query.tournamentCode}?api_key=${config.riotTournamentKey}`
		)
			.then((res) => res.json())
			.then((res) => {
				res.metaData = JSON.parse(res.metaData.replace(/'/g, '"'));
				return res;
			});
		const matchId = await fetch(
			`https://na1.api.riotgames.com/lol/match/v4/matches/by-tournament-code/${req.query.tournamentCode}/ids?api_key=${config.riotTournamentKey}`
		)
			.then((res) => res.json())
			.then((res) => res[0]);
		const gameData = await fetch(
			`https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}/by-tournament-code/${req.query.tournamentCode}?api_key=${config.riotTournamentKey}`
		).then((res) => res.json());
		gameData.metaData = metaData;
		gameData.tournamentCode = metaData.code;
		const participantIdentities = gameData.participantIdentities;
		const participants = gameData.participants;
		delete gameData.participantIdentities;
		delete gameData.participants;
		gameData.teams = {
			blue: gameData.teams[0],
			red: gameData.teams[1],
		};
		gameData.teams.blue.discordId = metaData.metaData.team1;
		gameData.teams.red.discordId = metaData.metaData.team2;
		gameData.teams.blue.players = {};
		gameData.teams.red.players = {};
		const pos = (n) => {
			n = n % 5;
			switch (n) {
				case 0:
					return "top";
				case 1:
					return "jungle";
				case 2:
					return "middle";
				case 3:
					return "bottom";
				case 4:
					return "support";
			}
		};
		for (let i = 0; i < participants.length; i++) {
			const _ = pos(i);
			const __ = i < 5 ? "blue" : "red";
			gameData.teams[__].players[_] =
				participants[participantIdentities[i].participantId - 1];
			if (gameData.teams[__].players[_]) {
				delete participantIdentities[i].player.summonerName;
				gameData.teams[__].players[_].identity = participantIdentities[i];
			}
		}
		try {
			return await GameData.create(gameData);
		} catch (e) {
			return e;
		}
	},
	callback: async (req) => {
		const gameData = await module.exports.fetchTournamentGameData({
			query: { tournamentCode: req.body.shortCode },
		});
		const team1 = await Team.find({
			discordId: gameData.metaData.metaData.team1,
		});
		const team2 = await Team.find({
			discordId: gameData.metaData.metaData.team2,
		});
		if (team1 && team2) {
			const img = `https://titan-esports.org:7000/${
				gameData.teams[0].win === "Win" ? team1.logo : team2.logo
			}`;
			// OracleUtils.SendMessage({
			// 	channel: "801661248361725994",
			// 	message: `${team1.name} vs ${team2.name}\n\nGame ${
			// 		metaData.gameNum
			// 	} Results\n\n${
			// 		gameData.teams[0].win === "Win" ? team1.name : team2.name
			// 	} - wins!`,
			// 	status: null,
			// 	img,
			// });
		}
		return "Success!";
	},
};
