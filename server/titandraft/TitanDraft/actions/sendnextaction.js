module.exports = (util, type) => {
  const len = util.document.history
    ? Object.keys(util.document.history).length
    : 0;
  const a = len !== null ? util.OrderSet[len] : null;
  type === "whisper"
    ? util.socket.emit("sendnextaction", a)
    : util.io.in(util.lobby).emit("sendnextaction", a);
};
