const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  content: {
    type: Object,
    unique: false,
    required: false
  },
  author: {
    type: String,
    unique: false,
    required: true
  },
  date_created: {
    type: Date,
    unique: false,
    required: true
  },
  date_published: {
    type: Date,
    unique: false,
    required: false
  },
  img_path: {
    type: String,
    unique: false,
    required: false
  },
  icon: {
    type: Array,
    unique: false,
    required: false
  },
  status: {
    type: Number,
    unique: false,
    required: true
  }
});

module.exports = mongoose.model("Article", articleSchema);
