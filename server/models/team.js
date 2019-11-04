const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  members: {
    type: Object,
    unique: false,
    required: false
  },
  iconId: {
    type: Number,
    unique: false,
    required: false
  },
  teamImage: {
    type: String,
    unique: false,
    required: false
  },
  captain: {
    type: String,
    unique: false,
    required: false
  },
  stats: {
    type: Object,
    unique: false,
    required: false
  },
  legacy: {
    type: Object,
    unique: false,
    required: false
  },
  league: {
    type: Number,
    unique: false,
    required: false
  }
});

module.exports = mongoose.model("Team", teamSchema);
