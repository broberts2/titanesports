module.exports = async (util) => {
  util.socket.on("ban", (data) => util.actions.championaction(util, data));
};
