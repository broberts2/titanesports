const Controllers = require("./controllers");
const responder = require("./responder");
const riotSanitizer = require("./riotSanitizer");

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
  app.get("/getAllTeams", async (req, res) =>
    responder(Controllers.TeamHandling.getAllTeams(req), res)
  );
  app.get("/getIconsList", async (req, res) =>
    responder(Controllers.UtilityHandling.getIconsList(req), res)
  );
  app.get("/getProfileVideos", async (req, res) =>
    responder(Controllers.UtilityHandling.getProfileVideos(req), res)
  );
  app.get("/getSlayersGuild", async (req, res) =>
    responder(Controllers.YoutubeAPI.getSlayersGuild(req), res)
  );
  security.get("/updateSlayersGuild", async (req, res) =>
    responder(Controllers.YoutubeAPI.updateSlayersGuild(req, 5, true), res)
  );
  security.get("/validateToken", async (req, res) =>
    responder(Controllers.UserHandling.validateToken(req), res)
  );
  security.put("/updateUser", async (req, res) =>
    responder(Controllers.UserHandling.updateUser(req, 3), res)
  );
  security.put("/updateTeam", async (req, res) =>
    responder(Controllers.TeamHandling.updateTeam(req, 3), res)
  );
  security.put("/updateSelf", async (req, res) =>
    responder(Controllers.UserHandling.updateSelf(req), res)
  );
  security.put("/movePlayerToTeam", async (req, res) =>
    responder(Controllers.TeamHandling.movePlayerToTeam(req), res)
  );
  security.delete("/removePlayerFromTeam", async (req, res) =>
    responder(Controllers.TeamHandling.removePlayerFromTeam(req), res)
  );
  security.post("/createTeam", async (req, res) =>
    responder(Controllers.TeamHandling.createTeam(req, 3), res)
  );
  security.get("/gameData", async (req, res) =>
    riotSanitizer(
      Controllers.RiotAPI.fetchGameData(req, 3),
      req.query.t1,
      req.query.t2,
      res
    )
  );
};
