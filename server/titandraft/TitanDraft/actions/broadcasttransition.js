module.exports = (util, action) => {
  util.io.in(util.lobby).emit("broadcasttransition", action);
};
