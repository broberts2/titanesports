const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../config");

const TitanDraft = new Schema({
  STARTED: {
    type: Boolean,
    unique: false,
    required: false,
  },
  INCEPTION_DATE: {
    type: Date,
    unique: false,
    required: false,
  },
  FINISHED: {
    type: Boolean,
    unique: false,
    required: false,
  },
  TEAM_ACTIVE: {
    type: Number,
    unique: false,
    required: false,
  },
  LAST_TEAM_ACTIVE: {
    type: Number,
    unique: false,
    required: false,
  },
  BACKROUND_MUSIC: {
    type: String,
    unique: false,
    required: false,
  },
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
  LINKS: {
    type: Object,
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
  EVENTS_LOG: {
    type: Array,
    unique: false,
    required: false,
  },
  CHAMPION_DATA: {
    type: Array,
    unique: false,
    required: false,
  },
  DRAFT_ORDER: {
    type: Object,
    unique: false,
    required: false,
  },
});

module.exports = mongoose.model("TitanDraft", TitanDraft);
