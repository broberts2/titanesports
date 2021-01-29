const Badge = require("../controllers/Badge");
const Guard = require("../guard");

module.exports = (app, pretext) => {
  app.post(`/${pretext}/post`, async (req, res) => {
    const result = await Guard(req, "editBadges", Badge.post);
    res.json(result);
  }),
  app.get(`/${pretext}/getBadgeById`, async (req, res) => {
    const result = await Badge.getBadgeById(req);
    res.json(result);
  }),
  app.post(`/${pretext}/getBadgeBatchById`, async (req, res) => {
    const result = await Badge.getBadgeBatchById(req);
    res.json(result);
  })
};
