import Config from "../../config";

export default (socket, _this) =>
  socket.on("getDraft", async (draftData) => {
    const ENDPOINT = Config.production
      ? Config.productionEndpoint
      : Config.developementEndpoint;
    const music = new Audio(ENDPOINT + "/" + draftData.BACKGROUND_MUSIC);
    const MUSIC_VOLUME = 0.1;
    music.volume = MUSIC_VOLUME;
    music.loop = true;
    const backgroundMusic = {
      isPlaying: !music.paused,
      play: () => music.play(),
      pause: () => (music.paused = true),
    };
    _this.setState(
      Object.assign(require("../../_stateMethods")(_this, ENDPOINT), {
        backgroundMusic,
        draftData,
        ENDPOINT,
        modalVisible: false,
        loadPrimary: false,
        timerResetKey: false,
        action: "",
        actionTeam: 0,
      })
    );
    _this.state.validateKey();
  });
