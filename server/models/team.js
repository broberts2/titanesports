const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  members: {
    type: Array,
    unique: false,
    required: true
  },
  subs: {
    type: Array,
    unique: false,
    required: true
  },
  iconId: {
    type: Number,
    unique: false,
    required: true
  },
  captain: {
    type: String,
    unique: false,
    required: true
  },
  pr: {
    type: String,
    unique: false,
    required: true
  }
});

module.exports = mongoose.model("Team", teamSchema);
