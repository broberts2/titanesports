const endpoint = require("./config").endpoint;
const fetch = require("node-fetch");
const api_key = require("./config").apiKey;
const request = (url, body) =>
  fetch(
    endpoint + "/api" + url,
    Object.assign(
      {
        headers: {
          authorization: api_key
        }
      },
      body
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
      body
    }),
  league_status_by_shard: test =>
    request(`/league_status_by_shard?test=${test}`, {
      method: "get"
    }),
  match_by_id: test =>
    request(`/match_by_id?test=${test}`, {
      method: "get"
    }),
  matchlist_by_account_id: test =>
    request(`/matchlist_by_account_id?test=${test}`, {
      method: "get"
    }),
  match_timeline_by_match_id: test =>
    request(`/match_timeline_by_match_id?test=${test}`, {
      method: "get"
    }),
  match_ids_by_tournament_code: test =>
    request(`/match_ids_by_tournament_code?test=${test}`, {
      method: "get"
    }),
  match_by_match_id_and_tournament_code: test =>
    request(`/match_by_match_id_and_tournament_code?test=${test}`, {
      method: "get"
    }),
  league_position_in_all_queues_by_summoner_id: test =>
    request(`/league_position_in_all_queues_by_summoner_id?test=${test}`, {
      method: "get"
    }),
  featured_games: test =>
    request(`/featured_games?test=${test}`, {
      method: "get"
    }),
  summoner_by_account_id: test =>
    request(`/summoner_by_account_id?test=${test}`, {
      method: "get"
    }),
  summoner_by_name: test =>
    request(`/summoner_by_name?test=${test}`, {
      method: "get"
    }),
  summoner_by_puuid: test =>
    request(`/summoner_by_puuid?test=${test}`, {
      method: "get"
    }),
  summoner_by_summoner_id: test =>
    request(`/summoner_by_summoner_id?test=${test}`, {
      method: "get"
    }),
  third_party_code_by_summoner_id: test =>
    request(`/third_party_code_by_summoner_id?test=${test}`, {
      method: "get"
    }),
  create_tournament: body =>
    request(`/create_tournament`, {
      method: "post",
      body
    }),
  lobby_events_by_tournament_code: body =>
    request(`/lobby_events_by_tournament_code`, {
      method: "post",
      body
    }),
  create_tournament_provider: body =>
    request(`/create_tournament_provider`, {
      method: "post",
      body
    }),
  create_tournament: body =>
    request(`/create_tournament`, {
      method: "post",
      body
    })
};
