const _do = (_this, obj, t) =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(_this.setState(obj)), t)
  );

const AUTO = (_this) => ({
  full: async () => {
    await _do(
      _this,
      {
        team_active: 1,
        last_team_active: 0,
        timerResetKey: !_this.state.timerResetKey,
      },
      18000
    );
    await _do(_this, { team_active: 0, last_team_active: 1 }, 8000);
    await _do(_this, { team_active: 2, last_team_active: 1 }, 1000);
    await _do(_this, { team_active: 0, last_team_active: 2 }, 8000);
    await _do(_this, { team_active: 1, last_team_active: 1 }, 1000);
  },
  init: async () => {
    _do(
      _this,
      {
        team_active: 1,
        last_team_active: 0,
        timerResetKey: !_this.state.timerResetKey,
      },
      18000
    );
  },
});

export default (_this) => {
  // AUTO(_this).full();
};
