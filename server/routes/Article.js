const TitanDraft = require("../controllers/Article");

module.exports = (app, pretext) => {
  app.post(`/${pretext}/post`, async (req, res) => {
    const result = await Article.post(req);
    res.json(result);
  });
  app.put(`/${pretext}/put`, async (req, res) => {
    const result = await Article.put(req);
    res.json(result);
  });
  app.get(`/${pretext}/get`, async (req, res) => {
    const result = await Article.get(req);
    res.json(result);
  });
  app.delete(`/${pretext}/delete`, async (req, res) => {
    const result = await Article.delete(req);
    res.json(result);
  });
};
