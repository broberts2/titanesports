// GET
globals.api.getArticle = data =>
  globals.fns._t(
    globals.fns._get(
      `${globals.constants.serverPath}/getArticle?id=${data.id}`,
      data
    )
  );

globals.api.getArticles = () =>
  globals.fns._t(
    globals.fns._get(`${globals.constants.serverPath}/getArticles`)
  );

globals.api.getDraftLogos = () =>
  globals.fns._t(
    globals.fns._get(`${globals.constants.serverPath}/getDraftLogos`)
  );

globals.api.getSlayersGuild = () =>
  globals.fns._t(
    globals.fns._get(`${globals.constants.serverPath}/getSlayersGuild`)
  );

globals.api.loginUser = data =>
  globals.fns._t(
    globals.fns._get(`${globals.constants.serverPath}/loginUser`, data)
  );

globals.api.getEvents = () =>
  globals.fns._t(globals.fns._get(`${globals.constants.serverPath}/getEvents`));

globals.api.getAllUsers = data =>
  globals.fns._t(
    globals.fns._get(`${globals.constants.serverPath}/getAllUsers`, data)
  );

globals.api.getUser = data =>
  globals.fns._t(
    globals.fns._get(
      `${globals.constants.serverPath}/getUser?u=${data.id}`,
      data
    )
  );

globals.api.getAllTeams = () =>
  globals.fns._t(
    globals.fns._get(`${globals.constants.serverPath}/getAllTeams`)
  );

globals.api.getIconsList = data =>
  globals.fns._t(
    globals.fns._get(`${globals.constants.serverPath}/getIconsList`, data)
  );

globals.api.getProfileVideos = data =>
  globals.fns._t(
    globals.fns._get(`${globals.constants.serverPath}/getProfileVideos`, data)
  );

globals.api.emailResetKey = data =>
  globals.fns._t(
    globals.fns._get(`${globals.constants.serverPath}/emailResetKey`, data)
  );

globals.api.validateToken = () =>
  globals.fns._t(
    globals.fns._get(`${globals.constants.serverPath}/s/validateToken`)
  );

globals.api.getPlayerStatsByLolId = data =>
  globals.fns._t(
    globals.fns._get(
      `${globals.constants.titanDraftPath}/s/getPlayerStatsByLolId`,
      data
    )
  );

globals.api.getGameStatsByCode = data =>
  globals.fns._t(
    globals.fns._get(
      `${globals.constants.titanDraftPath}/s/getGameStatsByCode`,
      data
    )
  );

globals.api.createTournamentCode = data =>
  globals.fns._t(
    globals.fns._get(
      `${globals.constants.serverPath}/s/createTournamentCode`,
      data
    )
  );

// POST
globals.api.createUser = data =>
  globals.fns._t(
    globals.fns._post(`${globals.constants.serverPath}/createUser`, data)
  );

globals.api.compareResetKey = data =>
  globals.fns._t(
    globals.fns._post(`${globals.constants.serverPath}/compareResetKey`, data)
  );

globals.api.createDraft = data =>
  globals.fns._t(
    globals.fns._post(
      `${globals.constants.titanDraftPath}/api/createDraft`,
      data
    )
  );

globals.api.saveGameToDatabase = data =>
  globals.fns._t(
    globals.fns._post(
      `${globals.constants.titanDraftPath}/s/saveGameToDatabase`,
      data
    )
  );

globals.api.createTeam = data =>
  globals.fns._t(
    globals.fns._post(`${globals.constants.serverPath}/createTeam`, data)
  );

globals.api.createEvent = data =>
  globals.fns._t(
    globals.fns._post(`${globals.constants.serverPath}/createEvent`, data)
  );

globals.api.createArticle = data =>
  globals.fns._t(
    globals.fns._post(`${globals.constants.serverPath}/createArticle`, data)
  );

// PUT
globals.api.updateSlayersGuild = data =>
  globals.fns._t(
    globals.fns._put(
      `${globals.constants.serverPath}/s/updateSlayersGuild`,
      data
    )
  );

globals.api.updateUser = data =>
  globals.fns._t(
    globals.fns._put(`${globals.constants.serverPath}/updateUser`, data)
  );

globals.api.updateTeam = data =>
  globals.fns._t(
    globals.fns._put(`${globals.constants.serverPath}/updateTeam`, data)
  );

globals.api.updateSelf = data =>
  globals.fns._t(
    globals.fns._put(`${globals.constants.serverPath}/updateSelf`, data)
  );

globals.api.updateSelfPassword = data =>
  globals.fns._t(
    globals.fns._put(`${globals.constants.serverPath}/updateSelfPassword`, data)
  );

globals.api.movePlayerToTeam = data =>
  globals.fns._t(
    globals.fns._put(`${globals.constants.serverPath}/movePlayerToTeam`, data)
  );

globals.api.updateEvent = data =>
  globals.fns._t(
    globals.fns._put(`${globals.constants.serverPath}/updateEvent`, data)
  );

// DELETE
globals.api.removePlayerFromTeam = data =>
  globals.fns._t(
    globals.fns._delete(
      `${globals.constants.serverPath}/removePlayerFromTeam`,
      data
    )
  );

globals.api.removeEvent = () =>
  globals.fns._t(
    globals.fns._delete(`${globals.constants.serverPath}/removeEvent`)
  );

globals.api.removeUser = data =>
  globals.fns._t(
    globals.fns._delete(
      `${globals.constants.serverPath}/s/removeUser?id=${data.id}`
    )
  );
