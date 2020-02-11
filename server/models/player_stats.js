const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerStatsSchema = new Schema({
  lolAccountId: {
    type: String,
    unique: false,
    required: true
  },
  summonerName: {
    type: String,
    unique: false,
    required: true
  },
  summonerId: {
    type: String,
    unique: false,
    required: true
  },
  stats: {
    type: Object,
    unique: false,
    required: true
  }
});

module.exports = mongoose.model("PlayerStats", playerStatsSchema);
