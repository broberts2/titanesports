const fetch = require("node-fetch");
const tournament_key = "RGAPI-9235e664-6e10-468e-a499-34a50275627a";
const version = "9.24.2";
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const get_match_id = async (tournament_code) => {
  let match_id = await fetch(
    `https://na1.api.riotgames.com/lol/match/v4/matches/by-tournament-code/${tournament_code}/ids?api_key=${tournament_key}`
  ).then((res) => res.json());
  return match_id;
};

const decorations = async (obj) => {
  let champs = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  ).then((res) => res.json());
  champs = champs.data;
  let participants = obj.participants.map((el) => {
    Object.values(champs).map((el2) => {
      if (el.championId === parseInt(el2.key)) {
        el["champion"] = el2.id;
      }
    });
    obj.participantIdentities.map((el2) => {
      if (el.participantId === el2.participantId) {
        el["playerName"] = el2.player.summonerName;
      }
    });
    return el;
  });
  obj.participants = participants;
  delete obj.participantIdentities;
  return obj;
};

const get_match = async (id, tournament_code) => {
  let match = await fetch(
    `https://na1.api.riotgames.com/lol/match/v4/matches/${id}/by-tournament-code/${tournament_code}?api_key=${tournament_key}`
  ).then((res) => res.json());
  let metaData = await fetch(
    `https://americas.api.riotgames.com/lol/tournament/v4/codes/${tournament_code}?api_key=${tournament_key}`
  ).then((res) => res.json());
  match = decorations(
    Object.assign(match, { metaData: JSON.parse(metaData.metaData) })
  );
  return match;
};

const fetchCodes = async () => {
  const codes = require("./codes.js");
  const res = await Promise.all(
    codes.map(async (code) => {
      const match_id = await get_match_id(code);
      const match = await get_match(match_id[0], code);
      return match;
    })
  );
  return JSON.stringify({games:"res"});
};

(async () => {
  const json_data = await fetchCodes();
  exec(`python3 get_data.py ${json_data}`)
})();
