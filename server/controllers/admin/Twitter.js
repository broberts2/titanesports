const config = require("../../config");
const fetch = require("node-fetch");
const Twit = require("twit");

const T = new Twit({
  consumer_key: config.twitter.apikey,
  consumer_secret: config.twitter.apisecretkey,
  access_token: config.twitter.accesstoken,
  access_token_secret: config.twitter.accesstokensecret,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

module.exports = {
  post: async (req) => {
    const res = await new Promise((resolve) => {
      T.post(
        "statuses/update",
        { status: req.body.tweet },
        (err, data, response) => {
          resolve(response);
        }
      );
    });
    return res;
  },
};
