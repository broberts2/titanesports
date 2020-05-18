const __fetch__ = async url =>
  await fetch(`https://127.0.0.1:2999/liveclientdata/${url}`, {
    method: "GET"
  }).then(res => res.json()).then(data => data);

const Api = {
  activeplayer: () => __fetch__(`activeplayer`),
  activeplayername: () => __fetch__(`activeplayername`),
  activeplayerabilities: () => __fetch__(`activeplayerabilities`),
  activeplayerrunes: () => __fetch__(`​activeplayerrunes`),
  playerlist: () => __fetch__(`​playerlist`),
  playerscores: summonerName =>
    summonerName
      ? __fetch__(`playerscores?summonerName=${summonerName}`)
      : new Error("Invalid or missing parameter for 'summonerName'"),
  playersummonerspells: summonerName =>
    summonerName
      ? __fetch__(`playersummonerspells?summonerName=${summonerName}`)
      : new Error("Invalid or missing parameter for 'summonerName'"),
  playermainrunes: summonerName =>
    summonerName
      ? __fetch__(`playermainrunes?summonerName=${summonerName}`)
      : new Error("Invalid or missing parameter for 'summonerName'"),
  playeritems: summonerName =>
    summonerName
      ? __fetch__(`playeritems?summonerName=${summonerName}`)
      : new Error("Invalid or missing parameter for 'summonerName'"),
  eventdata: () => __fetch__(`eventdata`).then(data => data.Events),
  gamestats: () => __fetch__(`gamestats`)
};
