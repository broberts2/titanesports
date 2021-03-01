const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Permissions = new Schema({
	createArticles: {
		type: Array,
		unique: false,
		required: true,
	},
	publishArticles: {
		type: Array,
		unique: false,
		required: true,
	},
	editArticles: {
		type: Array,
		unique: false,
		required: true,
	},
	deleteArticles: {
		type: Array,
		unique: false,
		required: true,
	},
	editSite: {
		type: Array,
		unique: false,
		required: true,
	},
	editPermissions: {
		type: Array,
		unique: false,
		required: true,
	},
	editTitanDraft: {
		type: Array,
		unique: false,
		required: true,
	},
	verifySummoners: {
		type: Array,
		unique: false,
		required: true,
	},
	editBadges: {
		type: Array,
		unique: false,
		required: true,
	},
	oracleFlashPoll: {
		type: Array,
		unique: false,
		required: true,
	},
	oracleGetAllUsers: {
		type: Array,
		unique: false,
		required: true,
	},
	oracleGetAllRoles: {
		type: Array,
		unique: false,
		required: true,
	},
	oracleCreateCodes: {
		type: Array,
		unique: false,
		required: true,
	},
});

module.exports = mongoose.model("Permissions", Permissions);
