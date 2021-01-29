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
    required: false,
  },
  summonerId: {
    type: String,
    unique: true,
    required: false,
  },
  badges: {
    type: Array,
    unique: false,
    required: false,
  },
  memberOf: {
    type: Array,
    unique: false,
    required: false,
  }
});

module.exports = mongoose.model("Account", Account);
