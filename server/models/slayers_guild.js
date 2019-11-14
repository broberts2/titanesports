const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slayersGuildSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  videos: {
    type: Array,
    unique: false,
    required: false
  }
});

module.exports = mongoose.model("SlayersGuild", slayersGuildSchema);
