module.exports = async (util) => {
  util.socket.on("sendchampiondatasingle", (data) =>
    util.actions.sendchampiondata(util, "Azir")
  );
};
