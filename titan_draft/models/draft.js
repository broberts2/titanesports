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
  type: {
    type: String,
    unique: false,
    required: true
  },
  t1_logo: {
    type: String,
    unique: false,
    required: true
  },
  t2_logo: {
    type: String,
    unique: false,
    required: true
  },
  t1_name: {
    type: String,
    unique: false,
    required: true
  },
  t2_name: {
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
  blue_ready: {
    type: Boolean,
    unique: false,
    required: true
  },
  red_ready: {
    type: Boolean,
    unique: false,
    required: true
  },
  blue_token: {
    type: String,
    unique: false,
    required: true
  },
  red_token: {
    type: String,
    unique: false,
    required: true
  },
  blueTime: {
    type: Number,
    unique: false,
    required: true
  },
  redTime: {
    type: Number,
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
