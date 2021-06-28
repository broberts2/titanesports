const running = {};

module.exports = async (util) => {
  const _ = async () => {
    await util.actions.cycle(util);
    return util.document.finisheddate ? delete running[util.lobby] : _();
  };
  if (!running[util.lobby]) {
    running[util.lobby] = true;
    const state = util.document.state;
    state.draft.actingteam = util.OrderSet[0].team;
    await util.TitanDraft.update(
      { _id: util.lobby },
      { starteddate: new Date(), state }
    );
    util.document = await util.TitanDraft.findOne({ _id: util.lobby });
    util.actions.broadcast(util);
    _();
  } else {
    console.log(`An instance of ${util.lobby} is already running!`);
  }
};
