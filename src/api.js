const endpoint = require("./config").endpoint;
const fetch = require("node-fetch");
const api_key = require("./config").apiKey;
const request = (url, obj) =>
  fetch(
    endpoint + "/api" + url,
    Object.assign(
      {
        headers: {
          authorization: api_key,
          "Content-Type": "application/json"
        }
      },
      obj
    )
  ).then(res => res.json());

module.exports = {
  all_summoner_masteries: summonerId =>
    request(`/all_summoner_masteries?summonerId=${summonerId}`, {
      method: "get"
    }),
  summoner_champion_mastery: (summonerId, championId) =>
    request(
      `/summoner_champion_mastery?summonerId=${summonerId}&championId=${championId}`,
      {
        method: "get"
      }
    ),
  summoner_total_mastery: summonerId =>
    request(`/summoner_total_mastery?summonerId=${summonerId}`, {
      method: "get"
    }),
  champion_rotation: () =>
    request(`/champion_rotations`, {
      method: "get"
    }),
  challenger_league_queue: queue =>
    request(`/challenger_league_queue?queue=${queue}`, {
      method: "get"
    }),
  grandmaster_league_queue: queue =>
    request(`/grandmaster_league_queue?queue=${queue}`, {
      method: "get"
    }),
  master_league_queue: queue =>
    request(`/master_league_queue?queue=${queue}`, {
      method: "get"
    }),
  get_league: leagueId =>
    request(`/get_league?leagueId=${leagueId}`, {
      method: "get"
    }),
  enabled_positional_rank_queues: leagueId =>
    request(`/enabled_positional_rank_queues`, {
      method: "get"
    }),
  all_league_positions: summonerId =>
    request(`/all_league_positions?summonerId=${summonerId}`, {
      method: "get"
    }),
  all_positional_league_entries: body =>
    request(`/all_positional_league_entries`, {
      method: "post",
      body: JSON.stringify(body)
    }),
  league_status_by_shard: () =>
    request(`/league_status_by_shard`, {
      method: "get"
    }),
  match_by_id: matchId =>
    request(`/match_by_id?matchId=${matchId}`, {
      method: "get"
    }),
  matchlist_by_account_id: accountId =>
    request(`/matchlist_by_account_id?accountId=${accountId}`, {
      method: "get"
    }),
  match_timeline_by_match_id: matchId =>
    request(`/match_timeline_by_match_id?matchId=${matchId}`, {
      method: "get"
    }),
  match_ids_by_tournament_code: tournamentCode =>
    request(`/match_ids_by_tournament_code?tournamentCode=${tournamentCode}`, {
      method: "get"
    }),
  match_by_match_id_and_tournament_code: (matchId, tournamentCode) =>
    request(
      `/match_by_match_id_and_tournament_code?matchId=${matchId}&tournamentCode=${tournamentCode}`,
      {
        method: "get"
      }
    ),
  league_position_in_all_queues_by_summoner_id: summonerId =>
    request(
      `/league_position_in_all_queues_by_summoner_id?summonerId=${summonerId}`,
      {
        method: "get"
      }
    ),
  featured_games: () =>
    request(`/featured_games`, {
      method: "get"
    }),
  summoner_by_account_id: accountId =>
    request(`/summoner_by_account_id?accountId=${accountId}`, {
      method: "get"
    }),
  summoner_by_name: summonerName =>
    request(`/summoner_by_name?summonerName=${summonerName}`, {
      method: "get"
    }),
  summoner_by_puuid: PUUID =>
    request(`/summoner_by_puuid?PUUID=${PUUID}`, {
      method: "get"
    }),
  summoner_by_summoner_id: summonerId =>
    request(`/summoner_by_summoner_id?summonerId=${summonerId}`, {
      method: "get"
    }),
  third_party_code_by_summoner_id: summonerId =>
    request(`/third_party_code_by_summoner_id?summonerId=${summonerId}`, {
      method: "get"
    }),
  create_tournament_code: (tournamentId, body) =>
    request(`/create_tournament_code?tournamentId=${tournamentId}`, {
      method: "post",
      body: JSON.stringify(body)
    }),
  lobby_events_by_tournament_code: body =>
    request(`/lobby_events_by_tournament_code`, {
      method: "post",
      body: JSON.stringify(body)
    }),
  create_tournament_provider: body =>
    request(`/create_tournament_provider`, {
      method: "post",
      body: JSON.stringify(body)
    }),
  create_tournament: body =>
    request(`/create_tournament`, {
      method: "post",
      body: JSON.stringify(body)
    })
};
