let teams = [];

const _populate_teams_table = query => {
  const element = _accessNestedById("teamSearchModal", "teams");
  const div = `<table class="table">
    <thead>
      <tr>
        <th scope="col">Team</th>
        <th scope="col">Captain</th>
        <th scope="col">Members</th>
        <th scope="col">Power Ranking</th>
      </tr>
    </thead>
    <tbody>
    ${teams
      .map(
        (el, i) =>
          !query ||
          (query && query.length === 0) ||
          el.name.toLowerCase().includes(query.toLowerCase())
            ? `<tr>
    <td><img style="border-radius: 50%; width: 50px;" src="/static/${config.version}/img/profileicon/${el.iconId}.png"/> ${el.name}</td>
    <td>${el.captain}</td>
    <td>${el.members.length}</td>
    <td>${el.pr}</td>
  </tr>`
            : null
      )
      .filter(el => (el ? el : null))
      .join("")}
    </tbody>
  </table>`;
  element.innerHTML = div;
};

const getTeams = async t => {
  const res = await _request("teamSearch-content", {}, () =>
    _http_get({
      url: config.server + "/t/get_teams"
    })
  );
  if (res.code < 300) {
    teams = res.msg;
    _populate_teams_table();
  }
};

getTeams();
