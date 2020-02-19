const Controllers = require("./controllers");
const responder = require("./responder");

module.exports = (app, security) => {
  app.post("/createUser", async (req, res) =>
    responder(Controllers.UserHandling.createUser(req), res)
  );
  app.post("/compareResetKey", async (req, res) =>
    responder(Controllers.UtilityHandling.compareResetKey(req), res)
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
  app.get("/emailResetKey", async (req, res) =>
    responder(Controllers.UtilityHandling.emailResetKey(req), res)
  );
  app.get("/getSlayersGuild", async (req, res) =>
    responder(Controllers.YoutubeAPI.getSlayersGuild(req), res)
  );
  app.get("/getEvents", async (req, res) =>
    responder(Controllers.EventHandling.getEvents(req), res)
  );
  app.get("/getArticles", async (req, res) =>
    responder(Controllers.ArticleHandling.getArticles(req), res)
  );
  app.get("/getArticle", async (req, res) =>
    responder(Controllers.ArticleHandling.getArticle(req), res)
  );
  app.get("/getDraftLogos", async (req, res) =>
    responder({ logos: require("../titan_draft/logo_index.js") }, res)
  );
  security.put("/updateSlayersGuild", async (req, res) =>
    responder(Controllers.YoutubeAPI.updateSlayersGuild(req, 5, true), res)
  );
  security.get("/validateToken", async (req, res) =>
    responder(Controllers.UserHandling.validateToken(req), res)
  );
  security.get("/createTournamentCode", async (req, res) =>
    responder(Controllers.RiotAPI.createTournamentCode(req, 3), res)
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
  security.put("/updateSelfPassword", async (req, res) =>
    responder(Controllers.UserHandling.updateSelfPassword(req), res)
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
  security.post("/createEvent", async (req, res) =>
    responder(Controllers.EventHandling.createEvent(req, 3), res)
  );
  security.put("/updateEvent", async (req, res) =>
    responder(Controllers.EventHandling.updateEvent(req, 3), res)
  );
  security.delete("/removeEvent", async (req, res) =>
    responder(Controllers.EventHandling.removeEvent(req, 3), res)
  );
  security.post("/createArticle", async (req, res) =>
    responder(Controllers.ArticleHandling.createArticle(req, 3), res)
  );
  security.put("/updateArticle", async (req, res) =>
    responder(Controllers.ArticleHandling.updateArticle(req, 3), res)
  );
  security.put("/setArticleStatus", async (req, res) =>
    responder(Controllers.ArticleHandling.setArticleStatus(req, 1), res)
  );
  security.delete("/removeArticle", async (req, res) =>
    responder(Controllers.ArticleHandling.removeArticle(req, 3), res)
  );
  security.post("/saveGameToDatabase", async (req, res) =>
    responder(Controllers.RiotAPI.saveGameToDatabase(req, res, 3))
  );
};
