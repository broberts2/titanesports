const fs = require("fs");
const config = require("../../config");

const ChampionData = (champion) => {
  let audio;
  const root = fs.readFileSync(
    `${__dirname}/../../../dragontail-${config.gameVersion}/${
      config.gameVersion
    }/data/en_US/champion${champion ? `/${champion}.json` : ".json"}`
  );
  if (champion)
    audio = fs.readFileSync(
      `${__dirname}/../../../dragontail-${config.gameVersion}/championaudio.json`
    );
  return champion
    ? Object.assign(JSON.parse(root).data, JSON.parse(audio)[champion])
    : JSON.parse(root).data;
};

module.exports = {
  getChampionData: (champion) => {
    return ChampionData(champion);
  },
};
