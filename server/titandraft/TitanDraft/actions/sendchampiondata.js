module.exports = (util, champion) => {
  util.socket.emit(
    champion ? "sendchampiondatasingle" : "sendchampiondata",
    champion ? util.fetchDataByChampion(champion) : util.ChampionData
  );
};
