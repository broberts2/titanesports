const Controllers = require("./controllers");
const ChampionData = require("./champion_data");

module.exports = app => {
  app.post("/api/createDraft", async (req, res) => {
    const draft = await Controllers.DraftHandling.createDraft(req);
    res.json(draft);
  });
  app.get("/api/getDraft", async (req, res) => {
    const draft = await Controllers.DraftHandling.getDraft(req);
    res.json(draft);
  });
  app.get("/api/getChampionData", async (req, res) => {
    res.json(ChampionData);
  });
  app.put("/api/updateDraft", async (req, res) => {
    const draft = await Controllers.DraftHandling.updateDraft(req);
    res.json(draft);
  });
};
