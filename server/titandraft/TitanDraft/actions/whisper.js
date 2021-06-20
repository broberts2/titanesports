module.exports = (util) => {
  util.socket.emit("whisper", util.document);
};
