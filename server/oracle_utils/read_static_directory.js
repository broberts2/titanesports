const fs = require("fs");

module.exports = (dir) => fs.readdirSync(`${__dirname}/../../static/${dir}`);
