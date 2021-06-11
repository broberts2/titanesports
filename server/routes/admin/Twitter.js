const Twitter = require("../../controllers/admin/Twitter");
const ResponseHandler = require("../../response_handler");
const Guard = require("../../guard");

module.exports = (app, subdomain, pretext) => {
  app.post(`/${subdomain}/${pretext}/postTweet`, async (req, res) => {
    ResponseHandler(Twitter.post, req, res);
  });
};
