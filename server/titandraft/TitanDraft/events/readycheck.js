module.exports = (util) => {
  util.socket.on("readycheck", async (data) => {
    util.document = await util.TitanDraft.findOne({ _id: util.lobby });
    util.document.state[data].ready = true;
    await util.TitanDraft.update(
      { _id: util.lobby },
      {
        state: util.document.state,
        primed:
          util.document.state.blueteam.ready &&
          util.document.state.redteam.ready,
      }
    );
    util.io.in(util.lobby).emit("readycheck", util.document);
    if (
      util.document.state.blueteam.ready &&
      util.document.state.redteam.ready
    ) {
      util.actions.broadcasttransition(util, "DraftUI");
      setTimeout(() => util.actions.startinstance(util), 5000);
    }
  });
};
