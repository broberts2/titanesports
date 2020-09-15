const EMITTERS = {
  TitanDraft: require("./emitters/TitanDraft"),
};

module.exports = (io) => (socket) => (key, room) => {
  const obj = {};
  EMITTERS[key].map((el) => {
    obj[el] = (data) =>
      el.type === "broadcast"
        ? io.sockets.in(room).emit(el.name, data)
        : socket.emit(el.name, data);
  });
  return obj;
};
