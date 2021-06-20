module.exports = (util) => {
  util.io.in(util.lobby).emit("broadcast", util.document);
};
