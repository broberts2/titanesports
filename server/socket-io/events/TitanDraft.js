const TitanDraft = require("../../controllers/TitanDraft");
const SpawnInstance = require("../../titanDraftInstance/instance");

const __helper__ = (pickBan) => async (data, emitters, room) => {
  let flipCardImg = null;
  const draftData = await TitanDraft.get({
    query: {
      id: room,
    },
  });
  draftData.CHAMPION_DATA.map((el) => {
    if (el.name === data.champion) {
      el.suspended = true;
      flipCardImg = el.loadingImg;
    }
    return el;
  });
  if (!draftData[`TEAM_${data.team}`][pickBan])
    draftData[`TEAM_${data.team}`][pickBan] = {};
  draftData[`TEAM_${data.team}`][pickBan][
    Object.keys(draftData[`TEAM_${data.team}`][pickBan]).length
  ] = data.champion;
  draftData.LAST_TEAM_ACTIVE = draftData.TEAM_ACTIVE;
  draftData.TEAM_ACTIVE = 0;
  draftData.EVENTS_LOG.push(
    Object.assign(draftData.DRAFT_ORDER[draftData.EVENTS_LOG.length], {
      champion: data.champion,
      time: new Date(),
    })
  );
  delete draftData._id;
  await TitanDraft.put({
    body: {
      id: room,
      obj: draftData,
    },
  });
  return {
    team: data.team,
    championName: data.champion,
    draftData,
    flipCardImg,
  };
};

const __next__ = async (data, emitters, room) => {
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 5000));
  const e = data.DRAFT_ORDER[`${data.EVENTS_LOG.length}`];
  data.LAST_TEAM_ACTIVE = data.TEAM_ACTIVE;
  if (e) {
    data.TEAM_ACTIVE = e.team;
    data.TIMER.TIME = data.TIMER.START_TIME;
    await TitanDraft.put({
      body: {
        id: room,
        obj: data,
      },
    });
    emitters.broadcast({
      draftData: data,
    });
  }
};

module.exports = {
  validateKey: async (data, emitters, room) => {
    const draftData = await TitanDraft.get({
      query: {
        id: room,
      },
    });
    const check = () => {
      if (data.blue_token === draftData.TEAM_1.CAPTAIN_TOKEN) {
        return 1;
      } else if (data.red_token === draftData.TEAM_2.CAPTAIN_TOKEN) {
        return 2;
      }
    };
    emitters.validateKey(check());
  },
  pickChampion: async (data, emitters, room) => {
    const _data = await __helper__("PICK")(data, emitters, room);
    emitters.broadcast({
      championName: _data.championName,
      action: "pickChampion",
      team: _data.team,
      draftData: _data.draftData,
      flipCardImg: _data.flipCardImg,
    });
    __next__(_data.draftData, emitters, room);
  },
  banChampion: async (data, emitters, room) => {
    const _data = await __helper__("BAN")(data, emitters, room);
    emitters.broadcast({
      championName: _data.championName,
      action: "banChampion",
      team: _data.team,
      draftData: _data.draftData,
      flipCardImg: _data.flipCardImg,
    });
    __next__(_data.draftData, emitters, room);
  },
  startDraft: async (data, emitters, room) => {
    const draftData = await TitanDraft.get({
      query: {
        id: room,
      },
    });
    draftData[`TEAM_${data.team}`].READY = true;
    await TitanDraft.put({
      body: {
        id: room,
        obj: draftData,
      },
    });
    if (
      draftData.TEAM_1.READY &&
      draftData.TEAM_2.READY &&
      !draftData.STARTED
    ) {
      draftData.STARTED = true;
      draftData.TEAM_ACTIVE = 0;
      await TitanDraft.put({
        body: {
          id: room,
          obj: draftData,
        },
      });
      SpawnInstance(
        {
          read: async () =>
            await TitanDraft.get({
              query: {
                id: room,
              },
            }),
          write: async (obj) =>
            await TitanDraft.put({
              body: {
                id: room,
                obj,
              },
            }),
        },
        emitters,
        (data, emitters) => __next__(data, emitters, room)
      );
    } else {
      emitters.broadcast({
        draftData,
      });
    }
  },
};
