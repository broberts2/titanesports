const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../config");

const ChampionData = new Schema({
  suspended: {
    type: Boolean,
    unique: false,
    required: true,
  },
  name: {
    type: String,
    unique: false,
    required: true,
  },
  loadingImg: {
    type: String,
    unique: false,
    required: true,
  },
  splashImg: {
    type: String,
    unique: false,
    required: true,
  },
  tileImg: {
    type: String,
    unique: false,
    required: true,
  },
  pickAudio: {
    type: String,
    unique: false,
    required: true,
  },
  banAudio: {
    type: String,
    unique: false,
    required: true,
  },
  seasonStats: {
    type: Object,
    unique: false,
    required: false,
  },
});

module.exports = mongoose.model("ChampionData", ChampionData);
