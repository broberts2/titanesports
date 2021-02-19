const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WebsiteConfiguration = new Schema({
	LOGO: {
		type: String,
		unique: false,
		required: true,
	},
	SEASON_LOGO: {
		type: String,
		unique: false,
		required: true,
	},
	THEME: {
		type: String,
		unique: false,
		required: true,
	},
	HOME_VIDEOS: {
		type: Array,
		unique: false,
		required: true,
	},
	HOME_PAGE_DIVIDER_IMAGE: {
		type: String,
		unique: false,
		required: false,
	},
	HOME_PAGE_PANEL_TITAN_DRAFT: {
		type: String,
		unique: false,
		required: true,
	},
	HOME_PAGE_PANEL_STATISTICS: {
		type: String,
		unique: false,
		required: true,
	},
	HOME_PAGE_PANEL_COMMUNITY_ARTICLES: {
		type: String,
		unique: false,
		required: true,
	},
	HOME_PAGE_PANEL_ROSTER_STAFF: {
		type: String,
		unique: false,
		required: true,
	},
	HOME_PAGE_PANEL_ABOUT_US: {
		type: String,
		unique: false,
		required: true,
	},
	HOME_MESSAGE: {
		type: String,
		unique: false,
		required: true,
	},
	HOME_MESSAGE_IMAGE: {
		type: String,
		unique: false,
		required: true,
	},
});

module.exports = mongoose.model("WebsiteConfiguration", WebsiteConfiguration);
