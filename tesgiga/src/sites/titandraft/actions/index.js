import banchampion from "./banchampion";

export default (state, setState) => ({
  banchampion: (champion) => banchampion(state, setState, champion),
});
