const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const config = require("../config");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: false,
    required: true
  },
  level: {
    type: Number,
    unique: false,
    required: true
  },
  memberships: {
    type: Array,
    unique: false,
    required: true
  },
  leagues: {
    type: Object,
    unique: false,
    required: false
  },
  iconId: {
    type: String,
    unique: false,
    required: true
  },
  captainTeam: {
    type: String,
    unique: false,
    required: false
  },
  email: {
    type: String,
    unique: false,
    required: false
  },
  suspended: {
    type: Boolean,
    unique: false,
    required: true
  },
  verified: {
    type: Boolean,
    unique: false,
    required: true
  },
  isAdmin: {
    type: Boolean,
    unique: false,
    required: true
  },
  biography: {
    type: String,
    unique: false,
    required: false
  },
  inbox: {
    type: Object,
    unique: false,
    required: false
  },
  communityTitle: {
    type: String,
    unique: false,
    required: false
  },
  profileVideo: {
    type: String,
    unique: false,
    required: false
  },
  opgg: {
    type: String,
    unique: false,
    required: false
  }
});

userSchema.methods.getToken = user => {
  if (user) {
    return jwt.sign(
      {
        username: user.username
      },
      config.secret,
      {
        expiresIn: 60 * 60 * 1140
      }
    );
  } else {
    throw new Error("Passwords don't match");
  }
};

module.exports = mongoose.model("User", userSchema);
