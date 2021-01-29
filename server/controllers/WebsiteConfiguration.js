const WebsiteConfiguration = require("../models/WebsiteConfiguration");
const fs = require("fs");

module.exports = {
  post: async (req) => {
    return await WebsiteConfiguration.create({
      LOGO: req.body.LOGO,
      SEASON_LOGO: req.body.SEASON_LOGO,
      THEME: req.body.THEME,
      HOME_VIDEOS: req.body.HOME_VIDEOS,
      HOME_PAGE_DIVIDER_IMAGE: req.body.HOME_PAGE_DIVIDER_IMAGE,
      HOME_PAGE_PANEL_TITAN_DRAFT: req.body.HOME_PAGE_PANEL_TITAN_DRAFT,
      HOME_PAGE_PANEL_STATISTICS: req.body.HOME_PAGE_PANEL_STATISTICS,
      HOME_PAGE_PANEL_COMMUNITY_ARTICLES: req.body.HOME_PAGE_PANEL_COMMUNITY_ARTICLES,
      HOME_PAGE_PANEL_ROSTER_STAFF: req.body.HOME_PAGE_PANEL_ROSTER_STAFF,
      HOME_PAGE_PANEL_ABOUT_US: req.body.HOME_PAGE_PANEL_ABOUT_US,
    });
  },
  queryStaticFiles: async (req) => {
    const _ = (dir, obj = {}) => {
      fs.readdirSync(dir).forEach((file) => {
        if (fs.statSync(dir + "/" + file).isDirectory()) {
          obj[file] = fs.readdirSync(dir + "/" + file).length > 0 ? {} : null;
          if(obj[file]) _(dir + "/" + file, obj[file]);
        } else {
          obj[file.split(".")[0]] = file;
        }
      });
      return obj;
    };
    const res = _(`${__dirname}/../../media`);
    delete res.audio.champion_audio;
    return res;
  },
  get: async () => await WebsiteConfiguration.findOne({}),
  put: async req => {
    const _ = await WebsiteConfiguration.findOne({});
    const res = await WebsiteConfiguration.updateOne({_id: _.id }, req.body);
    return "Success!";
  }
};