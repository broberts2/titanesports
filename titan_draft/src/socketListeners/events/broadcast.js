export default (socket, _this) =>
  socket.on("broadcast", (data) => {
    if (data.draftData.STARTED && !_this.state.backgroundMusic.isPlaying) {
      _this.state.backgroundMusic.play();
    } else if (
      _this.state.backgroundMusic.isPlaying &&
      data.draftData.EVENTS_LOG.length >= 20
    ) {
      _this.state.backgroundMusic.pause();
    }
    _this.setState({
      timerResetKey: !_this.state.timerResetKey,
      draftData: data.draftData,
      modalVisible: false,
      action: data.action,
      actionTeam: data.team,
      flipCardImg: data.flipCardImg,
    });
    _this.state.playChampionSound(_this, data.championName, "pick");
    setTimeout(() => _this.setState({ flipCardImg: null }), 4000);
  });
