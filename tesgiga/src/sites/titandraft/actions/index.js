import banchampion from "./banchampion";

export default (socket) => ({
  banchampion: (champion) => banchampion(socket, champion),
});
