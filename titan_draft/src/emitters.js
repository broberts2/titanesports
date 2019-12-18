const openSocket = require("socket.io-client");
const config = require("../../server/config");
const path = config.production
  ? "https://titan-esports.org:7001"
  : "http://localhost:7001";
const socket = openSocket(path);
let params = {};
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
  params[key] = value;
});

socket.emit("join", params);

let music = new Audio(require("./audio/music.mp3"));
music.volume = 0.1;
music.loop = true;

module.exports = {
  emit_blue_ready: () => socket.emit("blue_ready"),
  emit_red_ready: () => socket.emit("red_ready"),
  emit_update: data => socket.emit("update", data),
  update: cb => {
    socket.on("update", data => {
      let state = {
        blueTime: data.draft.blueTime,
        redTime: data.draft.redTime,
        active: data.active,
        glowColor: data.draft.finished
          ? "transparent"
          : data.draft.team > 0
          ? "red"
          : "blue",
        data: data.draft.data,
        blue_ready: data.draft.blue_ready,
        red_ready: data.draft.red_ready,
        running: data.draft.running,
        finished: data.draft.finished,
        turn: data.draft.turn,
        team: data.draft.team,
        t1_name: data.draft.t1_name,
        t1_logo: data.draft.t1_logo,
        t2_name: data.draft.t2_name,
        t2_logo: data.draft.t2_logo,
        modal: false
      };
      if (data.blue_captain) {
        state.blue_captain = true;
      } else if (data.red_captain) {
        state.red_captain = true;
      }
      cb(state);
      if (data.champion && data.pick) {
        let audio = new Audio(
          data.champion[data.action === "pick" ? "pickAudio" : "banAudio"]
        );
        console.log(
          data.champion[data.action === "pick" ? "pickAudio" : "banAudio"]
        );
        audio.volume = 0.2;
        audio.play();
      }
    });
    socket.on("play-music", () => music.play());
    socket.on("invalid code", () => {
      cb({
        error: "Lobby not found"
      });
    });
  }
};
