const config = require("../config");
const fs = require("fs");

module.exports = {
  getIconCount: async (req, res) => {
    try {
      const length = await new Promise((resolve, reject) =>
        fs.readdir(
          `${__dirname}/../../static/9.9.1/img/profileicon/`,
          (err, files) => {
            resolve(files);
          }
        )
      );
      return length;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getChampionCount: async (req, res) => {
    try {
      const length = await new Promise((resolve, reject) =>
        fs.readdir(
          `${__dirname}/../../static/9.9.1/img/champion/`,
          (err, files) => {
            resolve(files);
          }
        )
      );
      return length;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
