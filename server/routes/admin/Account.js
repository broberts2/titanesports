const Account = require("../../controllers/admin/Account");
const ResponseHandler = require("../../response_handler");
const Guard = require("../../guard");

module.exports = (app, subdomain, pretext) => {
  app.post(`/${subdomain}/${pretext}/post`, async (req, res) => {
    const result = await Account.post(req);
    res.json(result);
  });
  app.post(`/${subdomain}/${pretext}/initializeAccounts`, async (req, res) => {
    const result = await Account.initializeAccounts(req);
    res.json(result);
  });
  app.put(`/${subdomain}/${pretext}/put`, async (req, res) => {
    const result = await Account.put(req);
    res.json(result);
  });
  app.put(`/${subdomain}/${pretext}/verify`, async (req, res) => {
    const result = await Guard(req, "verifySummoners", Account.verify);
    res.json(result);
  });
  app.put(`/${subdomain}/${pretext}/updateUser`, async (req, res) => {
    const result = await Guard(req, "editAccounts", Account.updateUser);
    res.json(result);
  });
  app.get(`/${subdomain}/${pretext}/get`, async (req, res) => {
    const result = await Account.get(req);
    res.json(result);
  });
  app.delete(`/${subdomain}/${pretext}/delete`, async (req, res) => {
    const result = await Account.delete(req);
    res.json(result);
  });
};
