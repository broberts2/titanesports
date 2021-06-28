export default (state, setState, ChampionData, setSingleChampionData) => {
  if (ChampionData) {
    const audio = new Audio(ChampionData.pick);
    audio.volume = 0.1;
    audio.type = "audio/ogg";
    audio.play();
    return setSingleChampionData(ChampionData);
  }
};
