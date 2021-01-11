const EVENTS = {
  TitanDraft: require("./events/TitanDraft"),
};

const EMITTERS = {
  TitanDraft: require("./emitters/TitanDraft"),
};

module.exports = (socket) => (emitters) => (key, room) => {
  socket.join(room);
  for (let _key in EVENTS[key]) {
    socket.on(_key, (data) => EVENTS[key][_key](data, emitters, room));
  }
};
