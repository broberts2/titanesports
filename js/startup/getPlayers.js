let players = [];

const pos_router = (role, tier) => {
  if (role === "BOTTOM") {
    role = "BOT";
  } else if (role === "MIDDLE") {
    role = "MID";
  }
  return (
    "Universal" +
    "-" +
    role.charAt(0).toUpperCase() +
    role.toLowerCase().slice(1)
  );
  // return (
  //   tier.charAt(0).toUpperCase() +
  //   tier.toLowerCase().slice(1) +
  //   "-" +
  //   role.charAt(0).toUpperCase() +
  //   role.toLowerCase().slice(1)
  // );
};

const _openNew = username => {
  let win = window.open(config.opgg + username, "_blank");
  win.focus();
};

const _sort_players = field => {
  if (field === "membership") {
    players = players.sort(
      (a, b) =>
        a.memberships[0].toLowerCase() < b.memberships[0].toLowerCase() ? -1 : 1
    );
  } else {
    players = players.sort(
      (a, b) => (a[field].toLowerCase() < b[field].toLowerCase() ? -1 : 1)
    );
  }
  _populate_table();
};

const _populate_table = query => {
  const element = _accessNestedById("playerSearchModal", "players");
  const div = `<table class="table">
    <thead>
      <tr>
        <th scope="col" onclick="_sort_players('username')">Summoner</th>
        <th scope="col" onclick="_sort_players('titanRole')">Position</th>
        <th scope="col" onclick="_sort_players('membership')">Membership</th>
      </tr>
    </thead>
    <tbody>
    ${players
      .map(
        (el, i) =>
          !query ||
          (query && query.length === 0) ||
          el.username.toLowerCase().includes(query.toLowerCase())
            ? `<tr onclick="_openNew('${el.username}')">
    <td><img style="border-radius: 50%; width: 50px;" src="./static/${config.version}/img/profileicon/${el.iconId}.png"/> ${el.username}</td>
    <td><img style="width: 50px;" src="./static/img/positions/Position_${pos_router(
      el.titanRole,
      el.soloTier
    )}.png" /></td>
    <td>${el.memberships[0]}</td>
  </tr>`
            : null
      )
      .filter(el => (el ? el : null))
      .join("")}
    </tbody>
  </table>`;
  element.innerHTML = div;
};

const getPlayers = async u => {
  const modifier = u ? `/u/get_user?u=${u}` : "/u/get_users";
  const res = await _request("playerSearch-content", {}, () =>
    _http_get({
      url: config.server + modifier
    })
  );
  if (res.code < 300) {
    players = res.msg;
    _sort_players("username");
  }
};

getPlayers();
