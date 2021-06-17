const Team = require("../../controllers/leagueoflegends/Team");
const ResponseHandler = require("../../response_handler");

module.exports = (app, subdomain, pretext) => {
  app.post(`/${subdomain}/${pretext}/createTeam`, async (req, res) => {
    const result = await Team.createTeam(req);
    res.json(result);
  });
  app.put(`/${subdomain}/${pretext}/updateTeam`, async (req, res) => {
    const result = await Team.updateTeam(req);
    res.json(result);
  });
  app.get(`/${subdomain}/${pretext}/get_team_by_id`, async (req, res) => {
    const result = await Team.getTeamById(req);
    res.json(result);
  });
  app.get(`/${subdomain}/${pretext}/getTeams`, async (req, res) => {
    const result = await Team.getTeams(req);
    res.json(result);
  });
  app.delete(`/${subdomain}/${pretext}/deleteTeam`, async (req, res) => {
    const result = await Team.deleteTeam(req);
    res.json(result);
  });
};
