const fetch = require("node-fetch");
const tournament_key = "RGAPI-9235e664-6e10-468e-a499-34a50275627a";
const version = "9.24.2";
const fs = require("fs");

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
  return res;
};

const replacementFunction = (array) => {
  let inputStream = "";
  array.map((game) => {
    let _player_data = {};
    game.participants.map((participant) => {
      let player_data = {};
      const player_name = participant["playerName"];
      if (participant.teamId == "100") {
      	player_team = game["metaData"]["team1"];
      } else if (participant.teamId == "200") {
      	player_team = game["metaData"]["team2"];
      }
      const player_position = participant["timeline"]["lane"];
      const game_status = participant["stats"]["win"];
      const game_duration = game["gameDuration"];
      let player_champion;
      if (participant.champion) {
        player_champion = participant["champion"];
        player_data["playerChampion"] = player_champion;
      } else if (participant.championId == "875"){
        player_champion = "Sett";
        player_data["playerChampion"] = player_champion;
      }
      const player_kills = participant["stats"]["kills"];
      const player_deaths = participant["stats"]["deaths"];
      const player_assists = participant["stats"]["assists"];
      const player_cs = participant["stats"]["totalMinionsKilled"];
      const player_jngcs = participant["stats"]["neutralMinionsKilled"];
      const player_gold = participant["stats"]["goldEarned"];
      const player_damage = participant["stats"]["totalDamageDealtToChampions"];
      const player_magic_damage =
        participant["stats"]["magicDamageDealtToChampions"];
      const player_physical_damage =
        participant["stats"]["physicalDamageDealtToChampions"];
      const player_true_damage =
        participant["stats"]["trueDamageDealtToChampions"];
      const player_dmg_taken = participant["stats"]["totalDamageTaken"];
      const player_healing = participant["stats"]["totalHeal"];
      const player_dmg_mitigated = participant["stats"]["damageSelfMitigated"];
      const player_team_jng =
        participant["stats"]["neutralMinionsKilledTeamJungle"];
      const player_enemy_jng =
        participant["stats"]["neutralMinionsKilledEnemyJungle"];
      const player_turrets = participant["stats"]["turretKills"];
      const player_turret_dmg = participant["stats"]["damageDealtToTurrets"];
      const player_inhibitors = participant["stats"]["inhibitorKills"];
      const player_obj_dmg = participant["stats"]["damageDealtToObjectives"];
      const player_cc_score = participant["stats"]["timeCCingOthers"];
      const player_total_cc =
        participant["stats"]["totalTimeCrowdControlDealt"];
      const player_vision_score = participant["stats"]["visionScore"];
      const player_wards = participant["stats"]["wardsPlaced"];
      const player_wards_killed = participant["stats"]["wardsKilled"];
      const player_vision_wards =
        participant["stats"]["visionWardsBoughtInGame"];
      const player_first_blood = participant["stats"]["firstBloodKill"];
      const player_first_blood_assist =
        participant["stats"]["firstBloodAssist"];
      const player_first_tower = participant["stats"]["firstTowerKill"];
      const player_first_tower_assist =
        participant["stats"]["firstTowerAssist"];
      const player_double_kills = participant["stats"]["doubleKills"];
      const player_triple_kills = participant["stats"]["tripleKills"];
      const player_quadra_kills = participant["stats"]["quadraKills"];
      const player_penta_kills = participant["stats"]["pentaKills"];
      const _arr = [
        { first: "cs", second: "creepsPerMinDeltas" },
        { first: "xp", second: "xpPerMinDeltas" },
        { first: "gold", second: "goldPerMinDeltas" },
      ];
      _arr.map((obj) => {
        player_data[`${obj.first}_10min`] = participant["timeline"][
          `${obj.second}`
        ]["0-10"]
          ? participant["timeline"][`${obj.second}`]["0-10"]
          : "";
        player_data[`${obj.first}_20min`] = participant["timeline"][
          `${obj.second}`
        ]["10-20"]
          ? participant["timeline"][`${obj.second}`]["10-20"]
          : "";
        player_data[`${obj.first}_30min`] = participant["timeline"][
          `${obj.second}`
        ]["20-30"]
          ? participant["timeline"][`${obj.second}`]["20-30"]
          : "";
        player_data[`${obj.first}_40min`] = participant["timeline"][
          `${obj.second}`
        ]["30-40"]
          ? participant["timeline"][`${obj.second}`]["30-40"]
          : "";
        player_data[`${obj.first}_50min`] = participant["timeline"][
          `${obj.second}`
        ]["40-50"]
          ? participant["timeline"][`${obj.second}`]["40-50"]
          : "";
      });
      player_data["playerName"] = participant["playerName"];
      player_data["teamId"] = player_team;
      player_data["lane"] = player_position;
      player_data["win"] = game_status;
      player_data["gameDuration"] = game_duration;
      player_data["kills"] = player_kills;
      player_data["deaths"] = player_deaths;
      player_data["assists"] = player_assists;
      player_data["totalMinionsKilled"] = player_cs;
      player_data["neutralMinionsKilled"] = player_jngcs;
      player_data["goldEarned"] = player_gold;
      player_data["totalDamageDealtToChampions"] = player_damage;
      player_data["magicDamageDealtToChampions"] = player_magic_damage;
      player_data["physicalDamageDealtToChampions"] = player_physical_damage;
      player_data["trueDamageDealtToChampions"] = player_true_damage;
      player_data["totalDamageTaken"] = player_dmg_taken;
      player_data["totalHeal"] = player_healing;
      player_data["damageSelfMitigated"] = player_dmg_mitigated;
      player_data["neutralMinionsKilledTeamJungle"] = player_team_jng;
      player_data["neutralMinionsKilledEnemyJungle"] = player_enemy_jng;
      player_data["turretKills"] = player_turrets;
      player_data["damageDealtToTurrets"] = player_turret_dmg;
      player_data["inhibitorKills"] = player_inhibitors;
      player_data["damageDealtToObjectives"] = player_obj_dmg;
      player_data["timeCCingOthers"] = player_cc_score;
      player_data["totalTimeCrowdControlDealt"] = player_total_cc;
      player_data["visionScore"] = player_vision_score;
      player_data["wardsPlaced"] = player_wards;
      player_data["wardsKilled"] = player_wards_killed;
      player_data["visionWardsBoughtInGame"] = player_vision_wards;
      player_data["firstBloodKill"] = player_first_blood;
      player_data["firstBloodAssist"] = player_first_blood_assist;
      player_data["firstTowerKill"] = player_first_tower;
      player_data["firstTowerAssist"] = player_first_tower_assist;
      player_data["doubleKills"] = player_double_kills;
      player_data["tripleKills"] = player_triple_kills;
      player_data["quadraKills"] = player_quadra_kills;
      player_data["pentaKills"] = player_penta_kills;
      _player_data[player_data.playerName] = player_data;
    });
    Object.values(_player_data).map(
      (player) => (inputStream += Object.values(player).join() + "\n")
    );
  });
  fs.writeFile(`data.csv`, inputStream, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

(async () => {
  const json_data = await fetchCodes();
  replacementFunction(json_data);
})();
