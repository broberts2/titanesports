module.exports = async (util) =>
  await new Promise((r) =>
    setTimeout(async () => {
      util.document = await util.TitanDraft.findOne({ _id: util.lobby });
      if (
        util.document.timer > 0 &&
        !util.document.paused &&
        util.document.state.draft.actingteam !== "none"
      ) {
        await util.TitanDraft.update(
          { _id: util.lobby },
          { timer: --util.document.timer }
        );
        util.actions.broadcasttimer(util);
        r();
      } else if (
        !util.document.paused &&
        util.document.state.draft.actingteam !== "none"
      ) {
        util.actions.championaction(util, "Aatrox");
        r();
      }
      r();
    }, 1000)
  );
