const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Applications = new Schema({
	origin: {
		type: String,
		unique: false,
		required: true,
	},
	JSON: {
		type: String,
		unique: false,
		required: true,
	},
	category: {
		type: String,
		unique: false,
		required: true,
	},
});

module.exports = mongoose.model("Applications", Applications);
