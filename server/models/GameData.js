const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameData = new Schema({
	gameId: {
		type: Number,
		unique: true,
		required: true,
	},
	platformId: {
		type: String,
		unique: false,
		required: true,
	},
	gameCreation: {
		type: Number,
		unique: false,
		required: true,
	},
	gameDuration: {
		type: Number,
		unique: false,
		required: true,
	},
	queueId: {
		type: Number,
		unique: false,
		required: true,
	},
	mapId: {
		type: Number,
		unique: false,
		required: true,
	},
	seasonId: {
		type: Number,
		unique: false,
		required: true,
	},
	gameVersion: {
		type: String,
		unique: false,
		required: true,
	},
	gameMode: {
		type: String,
		unique: false,
		required: true,
	},
	gameType: {
		type: String,
		unique: false,
		required: true,
	},
	teams: {
		type: Object,
		unique: false,
		required: true,
	},
	metaData: {
		type: Object,
		unique: false,
		required: true,
	},
	tournamentCode: {
		type: String,
		unique: true,
		required: true,
	},
});

module.exports = mongoose.model("GameData", GameData);
