const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Team = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  logo: {
    type: String,
    unique: false,
    required: true,
  },
  members: {
    type: Array,
    unique: false,
    required: false,
  }
});

module.exports = mongoose.model("Team", Team);
