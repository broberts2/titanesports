const Permissions = require("../../controllers/Permissions");
const ResponseHandler = require("../../response_handler");

module.exports = (app, subdomain, pretext) => {
  app.get(`/${subdomain}/${pretext}/get`, async (req, res) => {
    const result = await Permissions.get(req);
    res.json(result);
  });
};
