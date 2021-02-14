const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema({
  discordId: {
    type: String,
    unique: true,
    required: true,
  },
  titanPoints: {
    type: Number,
    unique: false,
    required: true,
  },
  summonerId: {
    type: String,
    index: { unique: true, sparse: true },
    required: false,
  },
  profileBanner: {
    type: String,
    unique: false,
    required: false,
  },
  profileIcon: {
    type: String,
    unique: false,
    required: false,
  },
  badges: {
    type: Array,
    unique: false,
    required: false,
  }
});

module.exports = mongoose.model("Account", Account);
