const TitanDraftConfiguration = require("../controllers/TitanDraftConfiguration");

const ConfigID = "5faf2c5f28e55d0812a77ee9";

module.exports = (app, pretext) => {
  app.get(`/${pretext}/get`, async (req, res) => {
    const result = await TitanDraftConfiguration.get(ConfigID);
    res.json(result);
  });
  app.post(`/${pretext}/post`, async (req, res) => {
    const result = await TitanDraftConfiguration.post(req);
    res.json(result);
  });
  app.put(`/${pretext}/put`, async (req, res) => {
    const result = await TitanDraftConfiguration.put(req);
    res.json(result);
  });
  app.delete(`/${pretext}/delete`, async (req, res) => {
    const result = await TitanDraftConfiguration.delete(req);
    res.json(result);
  });
};
