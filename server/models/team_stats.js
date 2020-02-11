const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({});

module.exports = mongoose.model("TeamStats", eventSchema);
