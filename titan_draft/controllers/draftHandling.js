const Draft = require("../models/draft");
const Champion_Data = require("../champion_data");
const LogoIndex = require("../logo_index");
const ObjectId = require("mongodb").ObjectID;
const uid = require("rand-token").uid;

const config = require("../../server/config");
const server = config.production
  ? "https://titan-esports.org:7001"
  : "http://localhost:7001";

module.exports = {
  createDraft: async req => {
    try {
      let draft = await Draft.create({
        team: 0,
        turn: 0,
        blue_ready: false,
        red_ready: false,
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
        blueTime: 60,
        redTime: -1,
        blue_token: uid(16),
        red_token: uid(16),
        type: req.body.type,
        created: new Date(),
        running: false,
        finished: false,
        t1_logo: req.body.t1_logo,
        t2_logo: req.body.t2_logo,
        t1_name: req.body.t1_name,
        t2_name: req.body.t2_name
      });
      draft.code = 200;
      draft.msg = `Draft Creation Successful!`;
      return {
        code: draft.code,
        msg: draft.msg,
        special: {
          b: `${server}?room=${draft._id}&blue_token=${draft.blue_token}`,
          r: `${server}?room=${draft._id}&red_token=${draft.red_token}`,
          s: `${server}?room=${draft._id}`
        }
      };
    } catch (e) {
      console.log(e);
      return e;
    }
  },
  updateDraft: async req => {
    let draft = await Draft.update({ _id: req.query.id }, req.body);
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
    const draft = await Draft.findOne({ _id: req.query.id });
    if (!draft) {
      return { code: 11102, msg: "Get Draft Error." };
    }
    try {
      return { code: 200, msg: "Get Draft Successful!", draft };
    } catch (e) {
      return { code: 11102, msg: "Get Draft Error." };
    }
  },
  removeDraft: async req => {
    let draft = await Draft.remove({ _id: req.query.id });
    if (!draft) {
      return { code: 11102, msg: "Delete Draft Error." };
    }
    try {
      draft.code = 200;
      draft.msg = "Draft Deleted!";
      return draft;
    } catch (e) {
      return { code: 11102, msg: "Delete Draft Error." };
    }
  }
};
