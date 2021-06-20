const TitanDraft = require("../titandraft/index");
const _ = (shake) => shake.split("//")[1].split(".")[0];

module.exports = (io) =>
  io.on("connection", (socket) => {
    socket.on("join", async (msg) => {
      switch (_(socket.handshake.headers.origin)) {
        case "titandraft":
          return TitanDraft(io, socket, msg.lobby, msg.token);
      }
    });
  });
