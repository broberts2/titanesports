const GameData = require("../models/GameData");

module.exports = {
	postGameData: async (req) => {
		return await GameData.create(req.body);
	},
	query: async (req) => {
		return await GameData.find(req.body);
	},
};
