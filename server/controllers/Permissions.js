const Permissions = require("../models/Permissions");

module.exports = {
  get: async () => await Permissions.findOne({}).then((res) => res.permissions),
};
