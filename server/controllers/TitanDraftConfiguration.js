const TitanDraftConfiguration = require("../models/TitanDraftConfiguration");
const ChampionData = require("../controllers/ChampionData");
const ObjectId = require("mongodb").ObjectID;

module.exports = {
  post: async (req) => {
    const CHAMPION_DATA = await ChampionData.get({ query: {} });
    return await TitanDraftConfiguration.create({
      SEASON: req.body.SEASON,
      THEME: req.body.THEME,
      LOGO: req.body.LOGO,
      SEASON_LOGO: req.body.SEASON_LOGO,
      PREGAME_VIDEO_BACKGROUND: req.body.PREGAME_VIDEO_BACKGROUND,
      BACKGROUND_MUSIC: req.body.BACKGROUND_MUSIC,
      VS: req.body.VS,
      TEAM_1: req.body.TEAM_1,
      TEAM_2: req.body.TEAM_2,
      HEADER: req.body.HEADER,
      TIMER: req.body.TIMER,
      BACKGROUND: req.body.BACKGROUND,
      MODAL: req.body.MODAL,
      DRAFT_ORDER: req.body.DRAFT_ORDER,
      CHAMPION_DATA,
    });
  },
  get: async () => await TitanDraftConfiguration.findOne({}),
  put: async (id, obj) =>
    await TitanDraftConfiguration.update({ _id: id }, obj),
};
