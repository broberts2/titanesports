const playChampionSound = (_this, champion, pickBan) => {
  for (let i = 0; i < _this.state.draftData.CHAMPION_DATA.length; i++) {
    if (_this.state.draftData.CHAMPION_DATA[i].name === champion) {
      const sound = new Audio(
        _this.state.ENDPOINT +
          "/static/" +
          _this.state.draftData.CHAMPION_DATA[i][`${pickBan}Audio`]
      );
      sound.volume = 0.2;
      return sound.play();
    }
  }
};

module.exports = (_this, ENDPOINT) => ({
  setModalStatus: (modalVisible, modalContent) =>
    _this.setState({ modalVisible, modalContent }),
  setLoadPrimary: () => _this.setState({ loadPrimary: true }),
  pickChampion: (champion, team) =>
    _this.props.socket.emit("pickChampion", { team, champion }),
  banChampion: (champion, team) =>
    _this.props.socket.emit("banChampion", { team, champion }),
  playChampionSound: (_this, champion, pickBan) =>
    playChampionSound(_this, champion, pickBan),
  startDraft: () =>
    _this.props.socket.emit("startDraft", { team: _this.state.keyValid }),
  validateKey: () => {
    const urlParams = new URLSearchParams(window.location.search);
    _this.props.socket.emit("validateKey", {
      room: urlParams.get("draft"),
      blue_token: urlParams.get("blue_token"),
      red_token: urlParams.get("red_token"),
    });
  },
});
