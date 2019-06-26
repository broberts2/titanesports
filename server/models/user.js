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
    unique: true,
    required: true
  },
  level: {
    type: Number,
    unique: true,
    required: true
  },
  lolAccountId: {
    type: String,
    unique: true,
    required: true
  },
  lolSummonerId: {
    type: String,
    unique: true,
    required: true
  },
  soloLp: {
    type: Number,
    unique: true,
    required: true
  },
  soloTier: {
    type: String,
    unique: true,
    required: true
  },
  soloDivision: {
    type: String,
    unique: true,
    required: true
  },
  soloRole: {
    type: String,
    unique: true,
    required: true
  },
  soloMostPlayed: {
    type: Array,
    unique: true,
    required: true
  },
  flexLp: {
    type: Number,
    unique: true,
    required: true
  },
  flexTier: {
    type: String,
    unique: true,
    required: true
  },
  flexDivision: {
    type: String,
    unique: true,
    required: true
  },
  flexRole: {
    type: String,
    unique: true,
    required: true
  },
  flexMostPlayed: {
    type: Array,
    unique: true,
    required: true
  },
  titanRole: {
    type: String,
    unique: true,
    required: true
  },
  memberships: {
    type: Array,
    unique: true,
    required: true
  },
  iconId: {
    type: Number,
    unique: true,
    required: true
  },
  summonerLevel: {
    type: Number,
    unique: true,
    required: true
  },
  captainTeam: {
    type: String,
    unique: false,
    required: false
  },
  mail: {
    type: Array,
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
