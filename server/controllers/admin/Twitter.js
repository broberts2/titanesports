const config = require("../../config");
const fetch = require("node-fetch");
const Twit = require("twit");
const fs = require("fs");

const T = new Twit({
  consumer_key: config.twitter.apikey,
  consumer_secret: config.twitter.apisecretkey,
  access_token: config.twitter.accesstoken,
  access_token_secret: config.twitter.accesstokensecret,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});
//
// module.exports = {
//   post: async (req) => {
//     const res = await new Promise((resolve) => {
//       T.post(
//         "statuses/update",
//         { status: req.body.tweet },
//         (err, data, response) => {
//           resolve(response);
//         }
//       );
//     });
//     return res;
//   },
// };

module.exports = {
  post: async (req) => {
    const res = await new Promise((resolve) => {
      const b64content = req.body.img
        ? fs.readFileSync(
            `${__dirname}/../../../static/images/${req.body.img}`,
            {
              encoding: "base64",
            }
          )
        : null;
      if (b64content) {
        T.post(
          "media/upload",
          { media_data: b64content },
          (err, data, response) => {
            const mediaIdStr = data.media_id_string;
            const altText = "";
            const meta_params = {
              media_id: mediaIdStr,
              alt_text: { text: altText },
            };
            T.post(
              "media/metadata/create",
              meta_params,
              (err, data, response) => {
                if (!err) {
                  const params = {
                    status: req.body.tweet,
                    media_ids: [mediaIdStr],
                  };
                  T.post(
                    "statuses/update",
                    { status: req.body.tweet },
                    (err, data, response) => {
                      resolve(response);
                    }
                  );
                }
              }
            );
          }
        );
      } else {
        T.post("statuses/update", params, (err, data, response) => {
          resolve(response);
        });
      }
    });
    return res;
  },
};
