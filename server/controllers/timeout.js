const db_connector = require("../db_util");

module.exports = prms =>
  new Promise(async (resolve, reject) => {
    let value;
    db_connector();
    value = await prms;
    resolve(value);
  });
