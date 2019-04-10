const express = require("express");
const app = express();
const config = require("./config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(config.db);
const PORT = process.env.PORT || config.port;
const path = require("path");
const protected = require("./controllers/protected").protected;
const routifyPromise = require("./controllers/util").routifyPromise;
const security = express.Router();

const ChampionMastery = require("./controllers/riot_api/CHAMPION-MASTERY-V4");
const Champion = require("./controllers/riot_api/CHAMPION-V3");
const Leagues = require("./controllers/riot_api/LEAGUE-V4");
const LolStatus = require("./controllers/riot_api/LOL-STATUS-V3");
const Match = require("./controllers/riot_api/MATCH-V4");
const Spectator = require("./controllers/riot_api/SPECTATOR-V4");
const Summoner = require("./controllers/riot_api/SUMMONER-V4");
const ThirdParty = require("./controllers/riot_api/THIRD-PARTY-CODE-V4");

const { createUser } = require("./controllers/userHandling");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", security);
security.use(protected);

security.get("/test", (req, res) => res.json("success"));
security.get(
  "/summoner_total_mastery",
  routifyPromise(ChampionMastery.summonerMasteriesAll)
);
security.get(
  "/summoner_total_mastery",
  routifyPromise(ChampionMastery.summonerChampionMastery)
);
security.get(
  "/summoner_total_mastery",
  routifyPromise(ChampionMastery.summonerTotalMastery)
);
security.get("/champion_rotations", routifyPromise(Champion.championRotations));
security.get(
  "/challenger_league_queue",
  routifyPromise(Leagues.challengerLeagueQueue)
);
security.get(
  "/grandmaster_league_queue",
  routifyPromise(Leagues.grandmasterLeagueQueue)
);
security.get("/get_league", routifyPromise(Leagues.league));
security.get("/master_league_queue", routifyPromise(Leagues.masterLeagueQueue));
security.get(
  "/enabled_positional_rank_queues",
  routifyPromise(Leagues.enabledPositionalRankQueues)
);
security.get(
  "/all_league_positions",
  routifyPromise(Leagues.allLeaguePositions)
);
security.post(
  "/all_positional_league_entries",
  routifyPromise(Leagues.allPositionalLeagueEntries)
);
security.get(
  "/league_status_by_shard",
  routifyPromise(LolStatus.leagueStatusByShard)
);
security.get("/match_by_id", routifyPromise(Match.matchById));
security.get(
  "/matchlist_by_account_id",
  routifyPromise(Match.accountMatchList)
);
security.get(
  "/match_timeline_by_match_id",
  routifyPromise(Match.matchTimelineById)
);
security.get(
  "/match_ids_by_tournament_code",
  routifyPromise(Match.matchIdsByTournamentCode)
);
security.get(
  "/match_by_match_id_and_tournament_code",
  routifyPromise(Match.matchIdAndTournamentCode)
);
security.get(
  "/league_position_in_all_queues_by_summoner_id",
  routifyPromise(Spectator.leaguePositionInAllQueues)
);
security.get("/featured_games", routifyPromise(Spectator.featuredGames));
security.get(
  "/summoner_by_account_id",
  routifyPromise(Summoner.summonerByAccountId)
);
security.get("/summoner_by_name", routifyPromise(Summoner.summonerByName));
security.get("/summoner_by_puuid", routifyPromise(Summoner.summonerByPUUID));
security.get(
  "/summoner_by_summoner_id",
  routifyPromise(Summoner.summonerBySummonerId)
);
security.get(
  "/third_party_code_by_summoner_id",
  routifyPromise(ThirdParty.thirdPartyCode)
);
security.post("/user", routifyPromise(createUser));

app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
