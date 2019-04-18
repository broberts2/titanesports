const endpoint = require("./config").endpoint;
const fetch = require("node-fetch");
const Cookies = require("js-cookie");
const request = (url, obj) =>
  fetch(
    endpoint + url,
    Object.assign(
      {
        headers: {
          "Content-Type": "application/json",
          titan_key: Cookies.get("titan_key")
        }
      },
      obj
    )
  ).then(res => res.json());

module.exports = {
  all_summoner_masteries: summonerId =>
    request(`/api/all_summoner_masteries?summonerId=${summonerId}`, {
      method: "get"
    }),
  summoner_champion_mastery: (summonerId, championId) =>
    request(
      `/api/summoner_champion_mastery?summonerId=${summonerId}&championId=${championId}`,
      {
        method: "get"
      }
    ),
  summoner_total_mastery: summonerId =>
    request(`/api/summoner_total_mastery?summonerId=${summonerId}`, {
      method: "get"
    }),
  champion_rotation: () =>
    request(`/api/champion_rotations`, {
      method: "get"
    }),
  challenger_league_queue: queue =>
    request(`/api/challenger_league_queue?queue=${queue}`, {
      method: "get"
    }),
  grandmaster_league_queue: queue =>
    request(`/api/grandmaster_league_queue?queue=${queue}`, {
      method: "get"
    }),
  master_league_queue: queue =>
    request(`/api/master_league_queue?queue=${queue}`, {
      method: "get"
    }),
  get_league: leagueId =>
    request(`/api/get_league?leagueId=${leagueId}`, {
      method: "get"
    }),
  enabled_positional_rank_queues: leagueId =>
    request(`/api/enabled_positional_rank_queues`, {
      method: "get"
    }),
  all_league_positions: summonerId =>
    request(`/api/all_league_positions?summonerId=${summonerId}`, {
      method: "get"
    }),
  all_positional_league_entries: body =>
    request(`/api/all_positional_league_entries`, {
      method: "post",
      body: JSON.stringify(body)
    }),
  league_status_by_shard: () =>
    request(`/api/league_status_by_shard`, {
      method: "get"
    }),
  match_by_id: matchId =>
    request(`/api/match_by_id?matchId=${matchId}`, {
      method: "get"
    }),
  matchlist_by_account_id: accountId =>
    request(`/api/matchlist_by_account_id?accountId=${accountId}`, {
      method: "get"
    }),
  match_timeline_by_match_id: matchId =>
    request(`/api/match_timeline_by_match_id?matchId=${matchId}`, {
      method: "get"
    }),
  match_ids_by_tournament_code: tournamentCode =>
    request(
      `/api/match_ids_by_tournament_code?tournamentCode=${tournamentCode}`,
      {
        method: "get"
      }
    ),
  match_by_match_id_and_tournament_code: (matchId, tournamentCode) =>
    request(
      `/api/match_by_match_id_and_tournament_code?matchId=${matchId}&tournamentCode=${tournamentCode}`,
      {
        method: "get"
      }
    ),
  league_position_in_all_queues_by_summoner_id: summonerId =>
    request(
      `/api/league_position_in_all_queues_by_summoner_id?summonerId=${summonerId}`,
      {
        method: "get"
      }
    ),
  featured_games: () =>
    request(`/api/featured_games`, {
      method: "get"
    }),
  summoner_by_account_id: accountId =>
    request(`/api/summoner_by_account_id?accountId=${accountId}`, {
      method: "get"
    }),
  summoner_by_name: summonerName =>
    request(`/api/summoner_by_name?summonerName=${summonerName}`, {
      method: "get"
    }),
  summoner_by_puuid: PUUID =>
    request(`/api/summoner_by_puuid?PUUID=${PUUID}`, {
      method: "get"
    }),
  summoner_by_summoner_id: summonerId =>
    request(`/api/summoner_by_summoner_id?summonerId=${summonerId}`, {
      method: "get"
    }),
  third_party_code_by_summoner_id: summonerId =>
    request(`/api/third_party_code_by_summoner_id?summonerId=${summonerId}`, {
      method: "get"
    }),
  create_tournament_code: (tournamentId, body) =>
    request(`/api/create_tournament_code?tournamentId=${tournamentId}`, {
      method: "post",
      body: JSON.stringify(body)
    }),
  lobby_events_by_tournament_code: body =>
    request(`/api/lobby_events_by_tournament_code`, {
      method: "post",
      body: JSON.stringify(body)
    }),
  create_tournament_provider: body =>
    request(`/api/create_tournament_provider`, {
      method: "post",
      body: JSON.stringify(body)
    }),
  create_tournament: body =>
    request(`/api/create_tournament`, {
      method: "post",
      body: JSON.stringify(body)
    }),
  login_user: (username, password) => {
    const base64encodedData = new Buffer(username + ":" + password).toString(
      "base64"
    );
    return request(`/u/login_user`, {
      method: "get",
      headers: {
        authorization: "Basic " + base64encodedData
      }
    });
  },
  get_user: username => {
    return request(`/u/get_user?u=${username}`, {
      method: "get"
    });
  },
  get_users: () => {
    return request(`/u/get_users`, {
      method: "get"
    });
  },
  get_self: () => {
    return request(`/api/get_self`, {
      method: "get"
    });
  },
  create_cookie: (name, value) => Cookies.set(name, value, { expires: 1 }),
  remove_cookie: name => Cookies.remove(name),
  get_cookie: name => Cookies.get(name)
};
