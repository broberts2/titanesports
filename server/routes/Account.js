const Account = require("../controllers/Account");

module.exports = (app, pretext) => {
  app.post(`/${pretext}/post`, async (req, res) => {
    const result = await Account.post(req);
    res.json(result);
  });
  app.put(`/${pretext}/put`, async (req, res) => {
    const result = await Account.put(req);
    res.json(result);
  });
  app.get(`/${pretext}/get`, async (req, res) => {
    const result = await Account.get(req);
    res.json(result);
  });
  app.delete(`/${pretext}/delete`, async (req, res) => {
    const result = await Account.delete(req);
    res.json(result);
  });
};
