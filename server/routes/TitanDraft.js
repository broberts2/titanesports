const TitanDraft = require("../controllers/TitanDraft");

module.exports = (app, pretext) => {
  app.post(`/${pretext}/post`, async (req, res) => {
    const result = await TitanDraft.post(req);
    res.json(result);
  });
  app.put(`/${pretext}/put`, async (req, res) => {
    const result = await TitanDraft.put(req);
    res.json(result);
  });
  app.get(`/${pretext}/get`, async (req, res) => {
    const result = await TitanDraft.get(req);
    res.json(result);
  });
  app.delete(`/${pretext}/delete`, async (req, res) => {
    const result = await TitanDraft.delete(req);
    res.json(result);
  });
};
