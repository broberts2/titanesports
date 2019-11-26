const Draft = require("../models/draft");
const Champion_Data = require("../champion_data");
const LogoIndex = require("../logo_index");
const ObjectId = require("mongodb").ObjectID;

const config = "../server/config";
const server = config.production
  ? "https://titan-esports.org:7001"
  : "http://localhost:7001";

module.exports = {
  createDraft: async req => {
    try {
      let draft = await Draft.create({
        team: 0,
        turn: 0,
        data: {
          blue: {
            pick: {
              0: null,
              1: null,
              2: null,
              3: null,
              4: null
            },
            ban: {
              0: null,
              1: null,
              2: null,
              3: null,
              4: null
            }
          },
          red: {
            pick: {
              0: null,
              1: null,
              2: null,
              3: null,
              4: null
            },
            ban: {
              0: null,
              1: null,
              2: null,
              3: null,
              4: null
            }
          }
        },
        code: req.query.code,
        blue_token: "123456789",
        red_token: "987654321",
        ruleset: req.body.type,
        created: new Date(),
        running: false,
        finished: false,
        t1_logo: LogoIndex[req.body.t1_logo],
        t2_logo: LogoIndex[req.body.t2_logo]
      });
      draft.code = 200;
      draft.msg = "Draft Creation Successful!";
      return {
        blue_link: `${server}?id=${req.query.code}&blue_token=${"123456789"}`,
        red_link: `${server}?id=${req.query.code}&red_token=${"987654321"}`,
        spectator_link: `${server}?id=${req.query.code}`
      };
    } catch (e) {
      return e;
    }
  },
  updateDraft: async req => {
    let draft = await Draft.udpate({ code: req.query.code });
    if (!draft) {
      return { code: 11102, msg: "Get Draft Error." };
    }
    try {
      draft.code = 200;
      draft.msg = "Draft Updated!";
      return draft;
    } catch (e) {
      return { code: 11102, msg: "Get Draft Error." };
    }
  },
  getDraft: async req => {
    const draft = await Draft.find({ code: req.query.code });
    if (!draft) {
      return { code: 11102, msg: "Get Draft Error." };
    }
    try {
      return { code: 200, msg: "Get Draft Successful!", draft };
    } catch (e) {
      return { code: 11102, msg: "Get Draft Error." };
    }
  }
};
