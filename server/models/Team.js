const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Team = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  banner: {
    type: String,
    unique: false,
    required: false,
  },
  league: {
    type: String,
    unique: false,
    required: false,
  },
  logo: {
    type: String,
    unique: false,
    required: false,
  },
  memberTopId: {
    type: String,
    unique: false,
    required: false,
  },
  memberJungleId: {
    type: String,
    unique: false,
    required: false,
  },
  memberMidId: {
    type: String,
    unique: false,
    required: false,
  },
  memberBottomId: {
    type: String,
    unique: false,
    required: false,
  },
  memberSupportId: {
    type: String,
    unique: false,
    required: false,
  },
  subsIds: {
    type: Array,
    unique: false,
    required: false,
  },
  roster: {
    type: Array,
    unique: false,
    required: false,
  },
  badges: {
    type: Array,
    unique: false,
    required: false,
  },
});

module.exports = mongoose.model("Team", Team);
