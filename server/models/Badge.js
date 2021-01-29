const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Badge = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  primaryImage: {
    type: String,
    unique: false,
    required: false,
  },
  crown: {
    type: String,
    unique: false,
    required: true,
  },
  rarity: {
    type: String,
    unique: false,
    required: true,
  },
  description: {
    type: String,
    unique: false,
    required: true,
  },
  points: {
    type: Number,
    unique: false,
    required: true,
  },
});

module.exports = mongoose.model("Badge", Badge);
