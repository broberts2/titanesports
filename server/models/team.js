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
    required: false
  },
  subs: {
    type: Array,
    unique: false,
    required: false
  },
  iconId: {
    type: Number,
    unique: false,
    required: false
  },
  captain: {
    type: String,
    unique: false,
    required: false
  },
  pr: {
    type: String,
    unique: false,
    required: false
  }
});

module.exports = mongoose.model("Team", teamSchema);
