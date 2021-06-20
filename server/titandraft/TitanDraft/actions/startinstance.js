const running = {};

module.exports = async (util) => {
  const _ = async () => {
    await util.actions.cycle(util);
    return util.document.finisheddate ? delete running[util.lobby] : _();
  };
  if (!running[util.lobby]) {
    running[util.lobby] = true;
    await util.TitanDraft.update(
      { _id: util.lobby },
      { starteddate: new Date() }
    );
    _();
  } else {
    console.log(`An instance of ${util.lobby} is already running!`);
  }
};
