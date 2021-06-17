const Account = require("../../models/Account");
const Oracle = require("../admin/Oracle");

module.exports = {
  post: async (req) => {
    return await Account.create({
      discordId: req.body.discordId,
      titanPoints: 0,
    });
  },
  get: async () => await Account.findOne({}),
  updateUser: async (req) =>
    await Account.updateOne({ discordId: req.body.id }, req.body),
};
