const Oracle = require("../controllers/Oracle");

module.exports = (app, pretext) => {
  app.get(`/${pretext}/OATH2`, async (req, res) => {
    const result = await Oracle.OATH2(req);
    res.redirect(result);
  }),
  app.get(`/${pretext}/identify`, async (req, res) => {
    const result = await Oracle.identify(req);
    res.json(result);
  });
  app.get(`/${pretext}/getUser`, async (req, res) => {
    const result = await Oracle.getUser(req);
    res.json(result);
  });
  app.get(`/${pretext}/auth_action`, async (req, res) => {
    const result = await Oracle.authAction(req);
    res.json(result);
  });
};
