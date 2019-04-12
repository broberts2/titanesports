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
  const res = await api.all_positional_league_entries({
    positionalQueue: "RANKED_SOLO_5x5",
    tier: "DIAMOND",
    division: "IV",
    position: "MIDDLE",
    page: 0
  });
  t.pass();
});

test("route_test-league_status_by_shard", async t => {
  const res = await api.league_status_by_shard();
  t.true(Array.isArray(res.services));
});

test("route_test-match_by_id", async t => {
  const res = await api.match_by_id("3017772068");
  t.true(Array.isArray(res.participantIdentities));
});

test("route_test-matchlist_by_account_id", async t => {
  const res = await api.matchlist_by_account_id(
    "xKebAldn2yBpgIDE2vfVn3Bh_AT_6e0e6wmPskuhzoFXUA"
  );
  t.true(Array.isArray(res.matches));
});

test("route_test-match_timeline_by_match_id", async t => {
  const res = await api.match_timeline_by_match_id("3017772068");
  t.true(Array.isArray(res.frames));
});

test("route_test-match_ids_by_tournament_code", async t => {
  const res = await api.match_ids_by_tournament_code("NO_ACCESS");
  t.pass();
});

test("route_test-match_by_match_id_and_tournament_code", async t => {
  const res = await api.match_by_match_id_and_tournament_code("NO_ACCESS");
  t.pass();
});

test("route_test-league_position_in_all_queues_by_summoner_id", async t => {
  const res = await api.league_position_in_all_queues_by_summoner_id(
    "RETURNS_DATA_NOT_FOUND"
  );
  t.pass();
});

test("route_test-featured_games", async t => {
  const res = await api.featured_games();
  t.true(Array.isArray(res.gameList));
});

test("route_test-summoner_by_account_id", async t => {
  const res = await api.summoner_by_account_id(
    "xKebAldn2yBpgIDE2vfVn3Bh_AT_6e0e6wmPskuhzoFXUA"
  );
  t.true(res.accountId !== undefined);
});

test("route_test-summoner_by_name", async t => {
  const res = await api.summoner_by_name("Phortwenty");
  t.true(res.accountId !== undefined);
});

test("route_test-summoner_by_puuid", async t => {
  const res = await api.summoner_by_puuid(
    "KhTg4PLLBlc-LG6pHG76QZQTUy-gMYB3IRR0Mo0jKQZ8IQp95JWOJi9zfFWDqDNhSJH3CB3d59hVkg"
  );
  t.true(res.accountId !== undefined);
});

test("route_test-summoner_by_summoner_id", async t => {
  const res = await api.summoner_by_summoner_id(
    "rKt37Nlqd5IvFtSDHb2jm7ROqtvue0u6Ai7KZEYSMwk-GSM"
  );
  t.true(res.accountId !== undefined);
});

test("route_test-third_party_code_by_summoner_id", async t => {
  const res = await api.third_party_code_by_summoner_id("RETURNS_404");
  t.pass();
});

test("route_test-create_tournament_code", async t => {
  const res = await api.create_tournament_code(658, {
    allowedSummonerIds: [
      "rKt37Nlqd5IvFtSDHb2jm7ROqtvue0u6Ai7KZEYSMwk-GSM",
      "UDUEFGpv-AZV6RLPUchHedTmfgblbhluN_QSxad1G4_kwEI"
    ],
    mapType: "SUMMONERS_RIFT",
    metadata: "Some_really_cool_random_description",
    pickType: "DRAFT_MODE",
    spectatorType: "LOBBYONLY",
    teamSize: 1
  });
  t.true(Array.isArray(res));
});

// test("route_test-lobby_events_by_tournament_code", async t => {
//   const res = await api.lobby_events_by_tournament_code(
//     "NA658-TOURNAMENTCODE0001"
//   );
//   t.true(res);
// });

test("route_test-create_tournament_provider", async t => {
  const res = await api.create_tournament_provider({
    region: "NA",
    url: "https://titan-esports.org"
  });
  t.true(res === 568);
});

test("route_test-create_tournament", async t => {
  const res = await api.create_tournament({
    name: "Test Tournament",
    providerId: 568
  });
  t.true(res === 658);
});
