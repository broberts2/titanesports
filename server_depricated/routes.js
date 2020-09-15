const Controllers = require("./controllers");
const responder = require("./responder");

module.exports = (app, security) => {
  app.post("/createUser", async (req, res) =>
    responder(Controllers.UserHandling.createUser(req), res)
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
  app.get("/getDraftLogos", async (req, res) =>
    responder({ logos: require("../titan_draft/logo_index.js") }, res)
  );
  security.get("/validateToken", async (req, res) =>
    responder(Controllers.UserHandling.validateToken(req), res)
  );
  security.get("/createTournamentCode", async (req, res) =>
    responder(Controllers.RiotAPI.createTournamentCode(req, 3), res)
  );
  security.get("/getGameStatsByCode", async (req, res) =>
    responder(Controllers.RiotAPI.getGameStatsByCode(req, 3), res)
  );
  security.delete("/removeUser", async (req, res) =>
    responder(Controllers.UserHandling.removeUser(req, 3), res)
  );
};
