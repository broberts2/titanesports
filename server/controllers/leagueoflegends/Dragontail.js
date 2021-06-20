const fs = require("fs");
const config = require("../../config");

const ChampionData = (champion) => {
  const root = fs.readFileSync(
    `${__dirname}/../../../dragontail-${config.gameVersion}/${
      config.gameVersion
    }/data/en_US/champion${champion ? `/${champion}.json` : ".json"}`
  );
  return JSON.parse(root).data;
};

module.exports = {
  getChampionData: (champion) => {
    return ChampionData(champion);
  },
};
