const test = require("ava");
const api = require("./src/api");

test("route_test-all_summoner_masteries", async t => {
  const res = await api.all_summoner_masteries(
    "rKt37Nlqd5IvFtSDHb2jm7ROqtvue0u6Ai7KZEYSMwk-GSM"
  );
  t.true(Array.isArray(res));
});

test("route_test-summoner_champion_mastery", async t => {
  const res = await api.summoner_champion_mastery(
    "rKt37Nlqd5IvFtSDHb2jm7ROqtvue0u6Ai7KZEYSMwk-GSM",
    32
  );
  t.true(res.summonerId !== undefined);
});

test("route_test-summoner_total_mastery", async t => {
  const res = await api.summoner_total_mastery(
    "rKt37Nlqd5IvFtSDHb2jm7ROqtvue0u6Ai7KZEYSMwk-GSM"
  );
  t.true(typeof res === "number");
});

test("route_test-champion_rotation", async t => {
  const res = await api.champion_rotation();
  t.true(Array.isArray(res.freeChampionIds));
});

test("route_test-challenger_league_queue", async t => {
  const res = await api.challenger_league_queue("RANKED_SOLO_5x5");
  t.true(Array.isArray(res.entries));
});

test("route_test-grandmaster_league_queue", async t => {
  const res = await api.challenger_league_queue("RANKED_SOLO_5x5");
  t.true(Array.isArray(res.entries));
});

test("route_test-master_league_queue", async t => {
  const res = await api.challenger_league_queue("RANKED_SOLO_5x5");
  t.true(Array.isArray(res.entries));
});

test("route_test-get_league", async t => {
  const res = await api.get_league("974b70e3-28eb-3b60-9e9f-82a8efa19f10");
  t.true(Array.isArray(res.entries));
});

test("route_test-enabled_positional_rank_queues", async t => {
  const res = await api.enabled_positional_rank_queues(
    "974b70e3-28eb-3b60-9e9f-82a8efa19f10"
  );
  t.true(Array.isArray(res));
});

test("route_test-all_league_positions", async t => {
  const res = await api.all_league_positions(
    "rKt37Nlqd5IvFtSDHb2jm7ROqtvue0u6Ai7KZEYSMwk-GSM"
  );
  t.true(Array.isArray(res));
});

test("route_test-all_positional_league_entries", async t => {
  const res = await api.all_positional_league_entries("test");
  t.true();
});

test("route_test-league_status_by_shard", async t => {
  const res = await api.league_status_by_shard("test");
  t.true();
});

test("route_test-match_by_id", async t => {
  const res = await api.match_by_id("test");
  t.true();
});

test("route_test-matchlist_by_account_id", async t => {
  const res = await api.matchlist_by_account_id("test");
  t.true();
});

test("route_test-match_timeline_by_match_id", async t => {
  const res = await api.match_timeline_by_match_id("test");
  t.true();
});

test("route_test-match_ids_by_tournament_code", async t => {
  const res = await api.match_ids_by_tournament_code("test");
  t.true();
});

test("route_test-match_by_match_id_and_tournament_code", async t => {
  const res = await api.match_by_match_id_and_tournament_code("test");
  t.true();
});

test("route_test-league_position_in_all_queues_by_summoner_id", async t => {
  const res = await api.league_position_in_all_queues_by_summoner_id("test");
  t.true();
});

test("route_test-featured_games", async t => {
  const res = await api.featured_games("test");
  t.true();
});

test("route_test-summoner_by_account_id", async t => {
  const res = await api.summoner_by_account_id("test");
  t.true();
});

test("route_test-summoner_by_name", async t => {
  const res = await api.summoner_by_name("test");
  t.true();
});

test("route_test-summoner_by_puuid", async t => {
  const res = await api.summoner_by_puuid("test");
  t.true();
});

test("route_test-summoner_by_summoner_id", async t => {
  const res = await api.summoner_by_summoner_id("test");
  t.true();
});

test("route_test-third_party_code_by_summoner_id", async t => {
  const res = await api.third_party_code_by_summoner_id("test");
  t.true();
});

test("route_test-create_tournament", async t => {
  const res = await api.create_tournament("test");
  t.true();
});

test("route_test-lobby_events_by_tournament_code", async t => {
  const res = await api.lobby_events_by_tournament_code("test");
  t.true();
});

test("route_test-create_tournament_provider", async t => {
  const res = await api.create_tournament_provider("test");
  t.true();
});

test("route_test-create_tournament", async t => {
  const res = await api.create_tournament("test");
  t.true();
});
