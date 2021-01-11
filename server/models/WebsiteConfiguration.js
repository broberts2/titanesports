const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../config");

const WebsiteConfiguration = new Schema({});

module.exports = mongoose.model("WebsiteConfiguration", WebsiteConfiguration);
