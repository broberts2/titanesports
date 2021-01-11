const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../config");

const TitanDraftConfiguration = new Schema({
  SEASON: {
    type: String,
    unique: false,
    required: false,
  },
  THEME: {
    type: String,
    unique: false,
    required: false,
  },
  LOGO: {
    type: String,
    unique: false,
    required: false,
  },
  SEASON_LOGO: {
    type: String,
    unique: false,
    required: false,
  },
  PREGAME_VIDEO_BACKGROUND: {
    type: String,
    unique: false,
    required: false,
  },
  BACKROUND_MUSIC: {
    type: String,
    unique: false,
    required: false,
  },
  VS: {
    type: String,
    unique: false,
    required: false,
  },
  TEAM_1: {
    type: Object,
    unique: false,
    required: false,
  },
  TEAM_2: {
    type: Object,
    unique: false,
    required: false,
  },
  HEADER: {
    type: Object,
    unique: false,
    required: false,
  },
  TIMER: {
    type: Object,
    unique: false,
    required: false,
  },
  BACKGROUND: {
    type: Object,
    unique: false,
    required: false,
  },
  MODAL: {
    type: Object,
    unique: false,
    required: false,
  },
  DRAFT_ORDER: {
    type: Object,
    unique: false,
    required: false,
  },
});

module.exports = mongoose.model(
  "TitanDraftConfiguration",
  TitanDraftConfiguration
);
