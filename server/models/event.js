const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  date: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    unique: false,
    required: true
  },
  icon: {
    type: String,
    unique: false,
    required: true
  },
  events: {
    type: Array,
    unique: false,
    required: false
  }
});

module.exports = mongoose.model("Event", eventSchema);
