const TitanDraft = require("../controllers/TitanDraft");

const ORIGIN = {
  ["http://localhost:3000"]: "TitanDraft",
};

module.exports = (io) =>
  io.on("connection", (socket) => {
    socket.on("join", async (msg) => {
      const Emitters = require("./emitters")(io)(socket)(
        ORIGIN[socket.handshake.headers.origin],
        msg.draft
      );
      require("./events")(socket)(Emitters)(
        ORIGIN[socket.handshake.headers.origin],
        msg.draft
      );
      const draftData = await TitanDraft.get({ query: { id: msg.draft } });
      Emitters.getDraft(draftData);
    });
  });
