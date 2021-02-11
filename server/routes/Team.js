const Team = require("../controllers/Team");

module.exports = (app, pretext) => {
  app.post(`/${pretext}/post`, async (req, res) => {
    const result = await Team.post(req);
    res.json(result);
  });
  app.put(`/${pretext}/put`, async (req, res) => {
    const result = await Team.put(req);
    res.json(result);
  });
  app.get(`/${pretext}/get`, async (req, res) => {
    const result = await Team.get(req);
    res.json(result);
  });
  app.delete(`/${pretext}/delete`, async (req, res) => {
    const result = await Team.delete(req);
    res.json(result);
  });
};
