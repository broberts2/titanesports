const TitanDraft = require("../../models/TitanDraft");
const _ = require("rand-token");

module.exports = {
  createDraft: async (req) => {
    const response = await TitanDraft.create({
      tournamentcode: req.body.tournamentcode,
      state: req.body.state,
      bluetoken: _.generate(32),
      redtoken: _.generate(32),
      timer: 45,
      paused: false,
      createddate: new Date(),
    });
    return response;
  },
};
