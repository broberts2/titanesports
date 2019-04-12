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

const proccessor = async () => {
  const users = await User.getAllUsers();
  console.log(users);
};

module.exports = () => {
  const fun = async () => {
    await Promise.all([
      new Promise(async (resolve, reject) => {
        await proccessor();
        resolve();
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 15000);
      })
    ]);
    console.log("yolo");
    return fun();
  };
  fun();
};
