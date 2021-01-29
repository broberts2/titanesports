const Account = require("../models/Account");

module.exports = {
  post: async (req) => {
    return await Account.create({
      discordId: req.body.discordId
    });
  },
  get: async () => await Account.findOne({}),
};