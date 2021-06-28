const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../config");

const TitanDraft = new Schema({
  tournamentcode: {
    type: String,
    unique: false,
    required: false,
  },
  bluetoken: {
    type: String,
    unique: false,
    required: true,
  },
  redtoken: {
    type: String,
    unique: false,
    required: true,
  },
  timer: {
    type: Number,
    unique: false,
    required: true,
  },
  state: {
    type: Object,
    unique: false,
    required: false,
  },
  paused: {
    type: Boolean,
    unique: false,
    required: false,
  },
  primed: {
    type: Boolean,
    unique: false,
    required: false,
  },
  history: {
    type: Object,
    unique: false,
    required: false,
  },
  starteddate: {
    type: Date,
    unique: false,
    required: false,
  },
  createddate: {
    type: Date,
    unique: false,
    required: true,
  },
  finisheddate: {
    type: Date,
    unique: false,
    required: false,
  },
});

module.exports = mongoose.model("TitanDraft", TitanDraft);
