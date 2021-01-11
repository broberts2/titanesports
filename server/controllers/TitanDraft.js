const TitanDraft = require("../models/TitanDraft");
const TitanDraftConfiguration = require("../controllers/TitanDraftConfiguration");
const ChampionData = require("../controllers/ChampionData");
const ObjectId = require("mongodb").ObjectID;

module.exports = {
  post: async (req) => {
    const DRAFT_CONFIG = await TitanDraftConfiguration.get({});
    const CHAMPION_DATA = await ChampionData.get({});
    const __draft__ = await TitanDraft.create({
      INCEPTION_DATE: new Date(),
      TIMER: Object.assign(DRAFT_CONFIG.TIMER, {
        START_TIME: DRAFT_CONFIG.TIMER.START_TIME,
        TIME: DRAFT_CONFIG.TIMER.START_TIME,
      }),
      TEAM_ACTIVE: 0,
      BACKGROUND_MUSIC: DRAFT_CONFIG.BACKGROUND_MUSIC,
      LAST_TEAM_ACTIVE: 0,
      SEASON: DRAFT_CONFIG.SEASON,
      THEME: DRAFT_CONFIG.THEME,
      LOGO: DRAFT_CONFIG.LOGO,
      SEASON_LOGO: DRAFT_CONFIG.SEASON_LOGO,
      PREGAME_VIDEO_BACKGROUND: DRAFT_CONFIG.PREGAME_VIDEO_BACKGROUND,
      VS: DRAFT_CONFIG.VS,
      TEAM_1: Object.assign(DRAFT_CONFIG.TEAM_1, {
        CAPTAIN_TOKEN: "123blue_team",
        READY: false,
        LOGO: req.body.TEAM_1.LOGO,
      }),
      TEAM_2: Object.assign(DRAFT_CONFIG.TEAM_2, {
        CAPTAIN_TOKEN: "123red_team",
        READY: false,
        LOGO: req.body.TEAM_2.LOGO,
      }),
      HEADER: DRAFT_CONFIG.HEADER,
      TIMER: DRAFT_CONFIG.TIMER,
      BACKGROUND: DRAFT_CONFIG.BACKGROUND,
      MODAL: DRAFT_CONFIG.MODAL,
      DRAFT_ORDER: DRAFT_CONFIG.DRAFT_ORDER,
      CHAMPION_DATA,
      EVENTS_LOG: [],
    });
    await TitanDraft.update(
      { _id: __draft__._id },
      {
        LINKS: {
          TEAM_1: `http://localhost:3000?draft=${__draft__.id}&blue_token=${__draft__.TEAM_1.CAPTAIN_TOKEN}`,
          TEAM_2: `http://localhost:3000?draft=${__draft__.id}&red_token=${__draft__.TEAM_2.CAPTAIN_TOKEN}`,
          SPECTATOR: `http://localhost:3000?draft=${__draft__.id}`,
        },
      }
    );
    const draft = await TitanDraft.findOne({ _id: __draft__.id });
    return draft;
  },
  get: async (req) => await TitanDraft.findOne({ _id: req.query.id }),
  put: async (req) =>
    await TitanDraft.update({ _id: req.body.id }, req.body.obj),
  delete: async (req) => await TitanDraft.remove({ _id: req.body.id }),
};
