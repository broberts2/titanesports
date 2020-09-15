const ORIGIN = {
  ["http://localhost:3000"]: "TitanDraft",
};

module.exports = (io) =>
  io.on("connection", (socket) => {
    const Emitters = require("./emitters")(io)(socket)(
      ORIGIN[socket.handshake.headers.origin],
      "room"
    );
    require("./events")(socket)(Emitters)(
      ORIGIN[socket.handshake.headers.origin],
      "room"
    );
  });
