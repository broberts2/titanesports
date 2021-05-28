const GameData = require("../models/GameData");
const config = require("../config");
const fetch = require("node-fetch");

module.exports = {
	postGameData: async (req) => {
		return await GameData.create(req.body);
	},
	query: async (req) => {
		const data = await GameData.find(req.body);
		return data;
	},
};
