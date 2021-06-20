module.exports = (util) => {
  util.io.in(util.lobby).emit("broadcasttimer", util.document.timer);
};
