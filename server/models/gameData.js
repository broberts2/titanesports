const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameDataSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  data: {
    type: Object,
    unique: false,
    required: false,
  },
});

module.exports = mongoose.model("GameData", gameDataSchema);
