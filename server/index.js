const express = require("express");
const app = express();
const config = require("./config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(config.db);
const PORT = process.env.PORT || config.port;
const path = require("path");
const protected = require("./controllers/protected").protected;
const {
  routifyPromise,
  routifyPromiseStandard,
  routifyPromiseNoRestrict
} = require("./controllers/util");
const security = express.Router();
const cors = require("cors");
const restrict = require("./controllers/restrict");
const automation = require("./automation");

const ChampionMastery = require("./controllers/riot_api/CHAMPION-MASTERY-V4");
const Champion = require("./controllers/riot_api/CHAMPION-V3");
const Leagues = require("./controllers/riot_api/LEAGUE-V4");
const LolStatus = require("./controllers/riot_api/LOL-STATUS-V3");
const Match = require("./controllers/riot_api/MATCH-V4");
const Spectator = require("./controllers/riot_api/SPECTATOR-V4");
const Summoner = require("./controllers/riot_api/SUMMONER-V4");
const ThirdParty = require("./controllers/riot_api/THIRD-PARTY-CODE-V4");
const TournamentStub = require("./controllers/riot_api/TOURNAMENT-STUB-V4");

const User = require("./controllers/userHandling");

app.use(bodyParser.json());

app.use(
  cors({
    credentials: true
  })
);

app.use("/api", security);
security.use(protected);

security.get(
  "/all_summoner_masteries",
  routifyPromise(3, ChampionMastery.summonerMasteriesAll)
);
security.get(
  "/summoner_champion_mastery",
  routifyPromise(3, ChampionMastery.summonerChampionMastery)
);
security.get(
  "/summoner_total_mastery",
  routifyPromise(3, ChampionMastery.summonerTotalMastery)
);
security.get(
  "/champion_rotations",
  routifyPromise(3, Champion.championRotations)
);
security.get(
  "/challenger_league_queue",
  routifyPromise(3, Leagues.challengerLeagueQueue)
);
security.get(
  "/grandmaster_league_queue",
  routifyPromise(3, Leagues.grandmasterLeagueQueue)
);
security.get("/get_league", routifyPromise(3, Leagues.league));
security.get(
  "/master_league_queue",
  routifyPromise(3, Leagues.masterLeagueQueue)
);
security.get(
  "/enabled_positional_rank_queues",
  routifyPromise(3, Leagues.enabledPositionalRankQueues)
);
security.get(
  "/all_league_positions",
  routifyPromise(3, Leagues.allLeaguePositions)
);
security.post(
  "/all_positional_league_entries",
  routifyPromise(Leagues.allPositionalLeagueEntries)
);
security.get(
  "/league_status_by_shard",
  routifyPromise(3, LolStatus.leagueStatusByShard)
);
security.get("/match_by_id", routifyPromise(3, Match.matchById));
security.get(
  "/matchlist_by_account_id",
  routifyPromise(3, Match.accountMatchList)
);
security.get(
  "/match_timeline_by_match_id",
  routifyPromise(3, Match.matchTimelineById)
);
security.get(
  "/match_ids_by_tournament_code",
  routifyPromise(3, Match.matchIdsByTournamentCode)
);
security.get(
  "/match_by_match_id_and_tournament_code",
  routifyPromise(3, Match.matchIdAndTournamentCode)
);
security.get(
  "/league_position_in_all_queues_by_summoner_id",
  routifyPromise(3, Spectator.leaguePositionInAllQueues)
);
security.get("/featured_games", routifyPromise(3, Spectator.featuredGames));
security.get(
  "/summoner_by_account_id",
  routifyPromise(3, Summoner.summonerByAccountId)
);
security.get("/summoner_by_name", routifyPromise(3, Summoner.summonerByName));
security.get("/summoner_by_puuid", routifyPromise(3, Summoner.summonerByPUUID));
security.get(
  "/summoner_by_summoner_id",
  routifyPromise(3, Summoner.summonerBySummonerId)
);
security.get(
  "/third_party_code_by_summoner_id",
  routifyPromise(3, ThirdParty.thirdPartyCode)
);
security.post(
  "/create_tournament_code",
  routifyPromise(3, TournamentStub.createTournamentCode)
);
security.get(
  "/lobby_events_by_tournament_code",
  routifyPromise(3, TournamentStub.lobbyEventsByTournamentCode)
);
security.post(
  "/create_tournament_provider",
  routifyPromise(3, TournamentStub.tournamentProvider)
);
security.post(
  "/create_tournament",
  routifyPromise(3, TournamentStub.createTournament)
);
security.get("/verify_user", routifyPromiseStandard(0, User.verifyUser));
security.put("/update_user", routifyPromiseStandard(3, User.updateUser));
security.put("/update_self", routifyPromiseNoRestrict(User.updateSelf));
security.get("/get_self", routifyPromiseNoRestrict(User.getSelf));
security.delete("/delete_user", routifyPromiseStandard(3, User.deleteUser));

app.post("/u/create_user", routifyPromiseNoRestrict(User.createUser));
app.get("/u/login_user", routifyPromiseNoRestrict(User.loginUser));
app.get("/u/get_user", routifyPromiseNoRestrict(User.getUser));

automation(() => console.log("yo"));

app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
