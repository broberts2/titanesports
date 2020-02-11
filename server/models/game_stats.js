const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  gameVersion: {
    type: String,
    unique: false,
    required: true
  },
  gameTime: {
    type: Number,
    unique: false,
    required: true
  },
  gameCreation: {
    type: Number,
    unique: false,
    required: true
  },
  tournamentCode: {
    type: String,
    unique: true,
    required: true
  },
  tesSeason: {
    type: Number,
    unique: false,
    required: true
  },
  team1: {
    type: Object,
    unique: false,
    required: true
  },
  team2: {
    type: Object,
    unique: false,
    required: true
  }
});

module.exports = mongoose.model("GameStats", eventSchema);
