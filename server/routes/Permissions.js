const Permissions = require("../controllers/Permissions");

module.exports = (app, pretext) => {
  app.post(`/${pretext}/post`, async (req, res) => {
    const result = await Permissions.post(req);
    res.json(result);
  });
  app.put(`/${pretext}/put`, async (req, res) => {
    const result = await Permissions.put(req);
    res.json(result);
  });
  app.get(`/${pretext}/get`, async (req, res) => {
    const result = await Permissions.get(req);
    res.json(result);
  });
  app.delete(`/${pretext}/delete`, async (req, res) => {
    const result = await Permissions.delete(req);
    res.json(result);
  });
};
