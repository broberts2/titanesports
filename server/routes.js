const Controllers = require("./controllers");
const responder = require("./responder");

module.exports = (app, security) => {
  app.post("/createUser", async (req, res) =>
    responder(() => Controllers.UserHandling.createUser(req), res)
  );
  app.get("/loginUser", async (req, res) =>
    responder(Controllers.UserHandling.loginUser(req), res)
  );
  app.get("/getUser", async (req, res) =>
    responder(Controllers.UserHandling.getUser(req), res)
  );
  app.get("/getAllUsers", async (req, res) =>
    responder(Controllers.UserHandling.getAllUsers(req), res)
  );
  app.get("/getIconsList", async (req, res) =>
    responder(Controllers.UtilityHandling.getIconsList(req), res)
  );
  app.get("/getProfileVideos", async (req, res) =>
    responder(Controllers.UtilityHandling.getProfileVideos(req), res)
  );
  security.get("/validateToken", async (req, res) =>
    responder(Controllers.UserHandling.validateToken(req), res)
  );
  security.put("/updateUser", async (req, res) =>
    responder(Controllers.UserHandling.updateUser(req), res)
  );
};
