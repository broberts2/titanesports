const Draft = require("./controllers/draftHandling");
const Ruleset = require("./ruleset");
const ChampionData = require("./champion_data");

const update = async (socket, msg) => {
  let draft = await Draft.getDraft({
    query: {
      id: msg.room
    }
  });
  if (draft.draft && draft.draft.running) {
    socket.emit("play-music");
  }
  if (draft.code > 200) {
    socket.emit("invalid code");
  } else {
    socket.join(msg.room);
    if (draft.draft.blue_token === msg.blue_token) {
      draft.blue_captain = true;
    } else if (draft.draft.red_token === msg.red_token) {
      draft.red_captain = true;
    }
    draft.active = Ruleset[draft.draft.type][0].card;
    socket.emit("update", draft);
  }
};

const spawn = (objId, io, updater) => {
  io.sockets.in(objId).emit("play-music");
  const cycle = async () => {
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
    let draft = await Draft.getDraft({
      query: {
        id: objId
      }
    });
    if (draft && !draft.draft.finished) {
      if (
        (draft.draft.redTime <= 0 && draft.draft.team === 1) ||
        (draft.draft.blueTime <= 0 && draft.draft.team === 0)
      ) {
        const index = Object.values(ChampionData).filter(el =>
          el.name === "Urf" ? el : null
        )[0];
        updater(index.id);
      } else {
        await Draft.updateDraft({
          query: { id: objId },
          body:
            draft.draft.team === 0
              ? {
                  blueTime: draft.draft.blueTime - 1
                }
              : {
                  redTime: draft.draft.redTime - 1
                }
        });
      }
      return cycle();
    } else {
      await Draft.removeDraft({
        query: {
          id: objId
        }
      });
    }
  };
  cycle();
};

module.exports = io => {
  io.on("connection", socket => {
    socket.on("join", async msg => {
      const updater = async index => {
        let draft = await Draft.getDraft({
          query: {
            id: msg.room
          }
        });
        let data = draft.draft.data;
        const champion = Object.values(ChampionData).filter(el =>
          el.id === index ? el : null
        )[0];
        const action =
          Ruleset[draft.draft.type][draft.draft.turn].card < 10
            ? "pick"
            : "ban";
        const active = Ruleset[draft.draft.type][draft.draft.turn + 1]
          ? Ruleset[draft.draft.type][draft.draft.turn + 1].card
          : -1;
        data[draft.draft.team > 0 ? "red" : "blue"][action][
          Ruleset[draft.draft.type][draft.draft.turn].card % 5
        ] = champion;
        await Draft.updateDraft({
          query: { id: msg.room },
          body: {
            data,
            turn: draft.draft.turn + 1,
            team: Ruleset[draft.draft.type][draft.draft.turn + 1]
              ? Ruleset[draft.draft.type][draft.draft.turn + 1].team
              : Ruleset[draft.draft.type][draft.draft.turn].team,
            finished: Ruleset[draft.draft.type][draft.draft.turn + 1]
              ? false
              : true,
            blueTime: draft.draft.team > 0 ? 60 : -1,
            redTime: draft.draft.team > 0 ? -1 : 60
          }
        });
        draft = await Draft.getDraft({
          query: {
            id: msg.room
          }
        });
        draft.champion = champion;
        draft.pick = Ruleset[draft.draft.type][draft.draft.turn]
          ? Ruleset[draft.draft.type][draft.draft.turn].card < 10
            ? "pick"
            : "ban"
          : "pick";
        draft.action = action;
        draft.active = active;
        io.sockets.in(msg.room).emit("update", draft);
      };
      update(socket, msg);
      socket.on("blue_ready", async () => {
        let draft = await Draft.getDraft({
          query: {
            id: msg.room
          }
        });
        await Draft.updateDraft({
          query: { id: msg.room },
          body: {
            blue_ready: true,
            running: draft.draft.red_ready ? true : false
          }
        });
        draft = await Draft.getDraft({
          query: {
            id: msg.room
          }
        });
        if (draft.draft.running) spawn(msg.room, io, updater);
        io.sockets.in(msg.room).emit("update", draft);
      });
      socket.on("red_ready", async () => {
        let draft = await Draft.getDraft({
          query: {
            id: msg.room
          }
        });
        await Draft.updateDraft({
          query: { id: msg.room },
          body: {
            red_ready: true,
            running: draft.draft.blue_ready ? true : false
          }
        });
        draft = await Draft.getDraft({
          query: {
            id: msg.room
          }
        });
        if (draft.draft.running) spawn(msg.room, io, updater);
        io.sockets.in(msg.room).emit("update", draft);
      });
      socket.on("update", async index => {
        updater(index);
      });
    });
  });
};
