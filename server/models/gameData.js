const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameDataSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  data: {
    type: Object,
    unique: false,
    required: false,
  },
  team1: {
    type: String,
    unique: false,
    required: false,
  },
  team2: {
    type: String,
    unique: false,
    required: false,
  },
  weekNum: {
    type: String,
    unique: false,
    required: false,
  },
  gameNum: {
    type: String,
    unique: false,
    required: false,
  },
  seasonNum: {
    type: String,
    unique: false,
    required: false,
  },
  league: {
    type: String,
    unique: false,
    required: false,
  },
});

module.exports = mongoose.model("GameData", gameDataSchema);
