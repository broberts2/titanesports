const ResponseHandler = require("../../response_handler");
const TitanDraft = require("../../controllers/titandraft/TitanDraft");
const Guard = require("../../guard");

module.exports = (app, subdomain, pretext) => {
  app.post(`/${subdomain}/${pretext}/createDraft`, async (req, res) => {
    ResponseHandler(TitanDraft.createDraft, req, res);
  });
};
