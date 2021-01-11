const exit = (data, id) =>
  data && data.EVENTS_LOG.length >= 20 ? clearInterval(id) : null;

const countdown = (db, data) => {
  if (data.TEAM_ACTIVE > 0) {
    data.TIMER.TIME = data.TIMER.TIME - 1;
    if (data.TIMER.TIME < 0) {
      return true;
    } else {
      db.write(data);
    }
  } else if (data.TEAM_ACTIVE < 1 && data.TIMER.TIME < data.TIMER.START_TIME) {
    data.TIMER.TIME = data.TIMER.START_TIME;
    db.write(data);
  }
  return false;
};

const timeOutAction = async (db, data, emitters, next) => {
  const draftOrder = Object.values(data.DRAFT_ORDER);
  data.EVENTS_LOG.push(
    Object.assign(draftOrder[data.EVENTS_LOG.length], {
      champion: "Urf",
      time: new Date(),
    })
  );
  data.LAST_TEAM_ACTIVE = data.TEAM_ACTIVE;
  data.TEAM_ACTIVE = 0;
  const _obj =
    data[`TEAM_${draftOrder[data.EVENTS_LOG.length - 1].team}`][
      draftOrder[data.EVENTS_LOG.length - 1].action === "pick" ? "PICK" : "BAN"
    ];
  if (!_obj) {
    data[`TEAM_${draftOrder[data.EVENTS_LOG.length - 1].team}`][
      draftOrder[data.EVENTS_LOG.length - 1].action === "pick" ? "PICK" : "BAN"
    ] = {};
  }
  data[`TEAM_${draftOrder[data.EVENTS_LOG.length - 1].team}`][
    draftOrder[data.EVENTS_LOG.length - 1].action === "pick" ? "PICK" : "BAN"
  ][
    Object.keys(
      data[`TEAM_${draftOrder[data.EVENTS_LOG.length - 1].team}`][
        draftOrder[data.EVENTS_LOG.length - 1].action === "pick"
          ? "PICK"
          : "BAN"
      ]
    ).length
  ] = "Urf";
  await db.write(data);
  emitters.broadcast({
    championName: "Urf",
    action:
      draftOrder[data.EVENTS_LOG.length - 1].action === "ban"
        ? "banChampion"
        : "pickChampion",
    team: data.LAST_TEAM_ACTIVE,
    draftData: data,
    flipCardImg: (() => {
      for (let i = 0; i < data.CHAMPION_DATA.length; i++) {
        if (data.CHAMPION_DATA[i].name === "Urf") {
          return data.CHAMPION_DATA[i].loadingImg;
        }
      }
    })(),
  });
  next(data, emitters);
};

const logic = async (id, db, emitters, next) => {
  const data = await db.read();
  if (exit(data, id)) {
    return;
  } else if (countdown(db, data)) {
    await timeOutAction(db, data, emitters, next);
  }
};

module.exports = async (db, emitters, next) => {
  const interval = setInterval(
    async () => await logic(interval, db, emitters, next),
    1000
  );
  const draftData = await db.read();
  draftData.STARTED = true;
  emitters.broadcast({ draftData });
  setTimeout(async () => {
    const draftData = await db.read();
    draftData.TEAM_ACTIVE = draftData.DRAFT_ORDER["0"].team;
    draftData.TIMER.ACTIVE_TIME = new Date();
    await db.write(draftData);
    emitters.broadcast({ draftData });
  }, 22000);
};
