const TitanDraft = require("../models/TitanDraft");
const ChampionData = require("../controllers/leagueoflegends/Dragontail");
const OrderSet = require("./orderset");

module.exports = (io, socket, lobby, token) => {
  const util = {
    events: {},
    actions: {},
    TitanDraft,
    ChampionData: ChampionData.getChampionData(),
    fetchDataByChampion: (champion) => ChampionData.getChampionData(champion),
    OrderSet,
    io,
    socket,
    lobby,
    token,
  };
  const _e = require("./TitanDraft/events/index");
  const _a = require("./TitanDraft/actions/index");
  Object.keys(_e).map((key) => (util.events[key] = _e[key]));
  Object.keys(_a).map((key) => (util.actions[key] = _a[key]));
  _e.onjoin(util);
};
