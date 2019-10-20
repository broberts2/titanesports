const Controllers = require("./controllers");
const responder = require("./responder");

module.exports = app => {
  app.post("/u/createUser", async (req, res) =>
    responder(() => Controllers.UserHandling.createUser(req), res)
  );
  app.get("/u/loginUser", async (req, res) =>
    responder(Controllers.UserHandling.loginUser(req), res)
  );
};
