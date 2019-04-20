const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  imgURL: {
    type: String,
    unique: false,
    required: true
  },
  p: {
    type: String,
    unique: false,
    required: true
  },
  date: {
    type: String,
    unique: false,
    required: true
  },
  metaData: {
    type: Object,
    unique: false,
    required: true
  },
  approved: {
    type: Boolean,
    unique: false,
    required: true
  }
});

module.exports = mongoose.model("Article", articleSchema);
