module.exports = async (util, data) => {
  util.document.state.draft.actingteam = "none";
  await util.TitanDraft.update({ _id: util.lobby }, { paused: true });
  util.document = await util.TitanDraft.findOne({ _id: util.lobby });
  const { team, action, index } = util.OrderSet[
    !util.document.history || Object.keys(util.document.history).length < 1
      ? 0
      : Object.keys(util.document.history).length
  ];
  util.document.state[team][action][index].img = `${data}`;
  util.document.state[team][action][
    index
  ].title = `${util.ChampionData[data].name}`;
  util.document.state[team][action][
    index
  ].subtitle = `${util.ChampionData[data].title}`;
  const _ = {
    time: new Date(),
    team,
    action,
    data,
    index,
  };
  if (util.document.history) {
    util.document.history[Object.keys(util.document.history).length] = _;
  } else {
    util.document.history = {};
    util.document.history[0] = _;
  }
  util.document.state.draft.actingteam = util.OrderSet[
    Object.keys(util.document.history).length
  ]
    ? util.OrderSet[Object.keys(util.document.history).length].team
    : "none";
  await util.TitanDraft.update(
    { _id: util.lobby },
    {
      paused: false,
      timer: 46,
      state: util.document.state,
      history: util.document.history,
      finisheddate:
        Object.values(util.document.history).length >=
        Object.values(util.OrderSet).length - 1
          ? new Date()
          : util.document.finisheddate
          ? util.document.finisheddate
          : null,
    }
  );
  util.actions.sendnextaction(util);
  util.actions.broadcast(util);
  if (util.document.history) {
    util.io
      .in(util.lobby)
      .emit(
        "sendchampiondatasingle",
        util.fetchDataByChampion(
          util.document.history[Object.keys(util.document.history).length - 1]
            .data
        )
      );
  }
};
