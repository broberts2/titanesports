const searchTeam = () => {
  const query = document.getElementById("teamSearch-input").value;
  _populate_teams_table(query);
};
