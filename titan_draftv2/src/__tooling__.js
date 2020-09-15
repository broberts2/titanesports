export default (_this) => {
  setTimeout(() => {
    _this.setState({ team_active: 1, last_team_active: 0 });
    setTimeout(() => {
      _this.setState({ team_active: 0, last_team_active: 1 });
      setTimeout(() => {
        _this.setState({ team_active: 2, last_team_active: 1 });
        setTimeout(() => {
          _this.setState({ team_active: 0, last_team_active: 0 });
        }, 8000);
      }, 1250);
    }, 8000);
  }, 10000);
};
