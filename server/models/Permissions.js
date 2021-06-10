const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Permissions = new Schema({
  permissions: {
    type: Object,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Permissions", Permissions);
