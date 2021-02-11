const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Article = new Schema({
  published: {
    type: Boolean,
    unique: false,
    required: true,
  },
  authorid: {
    type: String,
    unique: false,
    required: false,
  },
  tags: {
    type: Array,
    unique: false,
    required: false,
  },
  title: {
    type: String,
    unique: false,
    required: false,
  },
  subject: {
    type: String,
    unique: false,
    required: false,
  },
  iconImgUrl: {
    type: String,
    unique: false,
    required: false,
  },
  tileimgurl: {
    type: String,
    unique: false,
    required: false,
  },
  bannerimgurl: {
    type: String,
    unique: false,
    required: false,
  },
  contentblocks: {
    type: Object,
    unique: false,
    required: false,
  },
  createddate: {
    type: Date,
    unique: false,
    required: false,
  },
  modifieddate: {
    type: Date,
    unique: false,
    required: false,
  },
});

module.exports = mongoose.model("Article", Article);
