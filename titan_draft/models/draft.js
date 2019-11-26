const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const draftSchema = new Schema({
  team: {
    type: Number,
    unique: false,
    required: true
  },
  turn: {
    type: Number,
    unique: false,
    required: true
  },
  data: {
    type: Object,
    unique: false,
    required: true
  },
  code: {
    type: String,
    unique: false,
    required: true
  },
  type: {
    type: String,
    unique: false,
    required: true
  },
  ruleset: {
    type: String,
    unique: false,
    required: true
  },
  running: {
    type: Boolean,
    unique: false,
    required: true
  },
  finished: {
    type: Boolean,
    unique: false,
    required: true
  },
  created: {
    type: Date,
    unique: false,
    required: true
  }
});

module.exports = mongoose.model("Draft", draftSchema);
