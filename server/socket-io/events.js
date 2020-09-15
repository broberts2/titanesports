const EVENTS = {
  TitanDraft: require("./events/TitanDraft"),
};

const EMITTERS = {
  TitanDraft: require("./emitters/TitanDraft"),
};

module.exports = (socket) => (emitters) => (key, room) => {
  socket.join(room);
  EMITTERS[key].map((el) =>
    socket.on(el.name, (data) => EVENTS[key][el.name](data, emitters))
  );
};
