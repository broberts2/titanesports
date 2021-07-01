const Oracle = require("../../controllers/admin/Oracle");
const ResponseHandler = require("../../response_handler");
const Guard = require("../../guard");

module.exports = (app, subdomain, pretext) => {
  app.get(`/${subdomain}/${pretext}/OATH2`, async (req, res) => {
    const result = await Oracle.OATH2(req, subdomain);
    res.redirect(result);
  });
  app.get(`/${subdomain}/${pretext}/identify`, async (req, res) => {
    ResponseHandler(Oracle.identify, req, res);
  });
  app.get(`/${subdomain}/${pretext}/getUsers`, async (req, res) => {
    const result = await Guard(req, "getAllUsers", Oracle.getUsers);
    res.json(result);

    // ResponseHandler(Oracle.identify, req, res);
  });
  app.get(`/${subdomain}/${pretext}/getAllRoles`, async (req, res) => {
    const result = await Guard(req, "oracleGetAllRoles", Oracle.getAllRoles);
    res.json(result);

    // ResponseHandler(Oracle.identify, req, res);
  });
  app.get(`/${subdomain}/${pretext}/getAllChannels`, async (req, res) => {
    const result = await Oracle.getAllChannels(req);
    res.json(result);

    // ResponseHandler(Oracle.identify, req, res);
  });
  app.get(`/${subdomain}/${pretext}/auth_action`, async (req, res) => {
    const result = await Oracle.authAction(req);
    res.json(result);

    // ResponseHandler(Oracle.identify, req, res);
  });
  app.get(`/${subdomain}/${pretext}/getMyPermissions`, async (req, res) => {
    const result = await Oracle.getMyPermissions(req);
    res.json(result);

    // ResponseHandler(Oracle.identify, req, res);
  });
  app.get(`/${subdomain}/${pretext}/getTeamLogos`, async (req, res) => {
    const result = await Oracle.getTeamLogos();
    res.json(result);

    // ResponseHandler(Oracle.identify, req, res);
  });
  app.post(`/${subdomain}/${pretext}/create_flash_poll`, async (req, res) => {
    const result = await Guard(req, "oracleFlashPoll", Oracle.createFlashPoll);
    res.json(result);

    // ResponseHandler(Oracle.identify, req, res);
  });
  app.post(
    `/${subdomain}/${pretext}/create_tournament_codes`,
    async (req, res) => {
      const result = await Guard(
        req,
        "oracleCreateCodes",
        Oracle.createTournamentCodes
      );
      res.json(result);

      // ResponseHandler(Oracle.identify, req, res);
    }
  );
};
