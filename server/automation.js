const ChampionMastery = require("./controllers/riot_api/CHAMPION-MASTERY-V4");
const Champion = require("./controllers/riot_api/CHAMPION-V3");
const Leagues = require("./controllers/riot_api/LEAGUE-V4");
const LolStatus = require("./controllers/riot_api/LOL-STATUS-V3");
const Match = require("./controllers/riot_api/MATCH-V4");
const Spectator = require("./controllers/riot_api/SPECTATOR-V4");
const Summoner = require("./controllers/riot_api/SUMMONER-V4");
const ThirdParty = require("./controllers/riot_api/THIRD-PARTY-CODE-V4");
const Tournament = require("./controllers/riot_api/TOURNAMENT-V4");
const User = require("./controllers/userHandling");
const Team = require("./controllers/teamHandling");
const ranksByNum = require("./ranksByNum");
const fetch = require("node-fetch");
const config = require("./config");

const USER_CYCLE_WAIT = 5000;
const TEAM_CYCLE_WAIT = 5000;
const TOTAL_CYCLE_WAIT = 10000;

const getChampNames = (array, data) => {
  array = array.map(el => {
    for (let key in data) {
      if (parseInt(data[key].key) === el) {
        return data[key].id;
      }
    }
  });
  return array;
};

const find5MostPlayed = matchData => {
  let champs = {};
  matchData.map(el => {
    if (champs[el.champion] === undefined) {
      champs[el.champion] = 1;
    } else {
      champs[el.champion] += 1;
    }
  });
  let mostPlayed = [];
  for (let i = 0; i < 5 && Object.keys(champs).length > 0; i++) {
    let highest;
    for (let key in champs) {
      if (champs[key] > champs[highest] ? champs[highest] : -1) {
        highest = key;
      }
    }
    mostPlayed.push(parseInt(highest));
    delete champs[highest];
  }
  return mostPlayed;
};

const proccessor = async () => {
  const users = await User.getAllUsers();
  const teams = await Team.getAllTeams();
  const champion_array = require(`/var/www/html/static/${config.currentVersion}/data/en_US/champion.json`);
  return await Promise.all(
    users.map(async (user, i) => {
      // await User.updateUser({
      //   query: { u: user.username },
      //   body: {
      //     data: {
      //       lolSummonerId: lolId,
      //       lolAccountId: lolAId
      //     }
      //   }
      // });
      await new Promise(resolve =>
        setTimeout(() => resolve(), USER_CYCLE_WAIT * i)
      );
      let accountData = await Summoner.summonerBySummonerId({
        query: { summonerId: user.lolSummonerId }
      });
      let leagueData = await Leagues.allLeaguePositions({
        query: { summonerId: user.lolSummonerId }
      });
      let matchHistory = await Match.accountMatchList({
        query: { accountId: user.lolAccountId }
      });
      leagueData = JSON.parse(leagueData);
      accountData = JSON.parse(accountData);
      matchHistory = JSON.parse(matchHistory);
      if (leagueData[0] === undefined) {
        leagueData = {
          soloTier: "Unranked",
          soloDivision: "Unranked",
          soloLp: 0
        };
      } else {
        leagueData =
          leagueData[0].queueType === "RANKED_SOLO_5x5"
            ? leagueData
            : leagueData.reverse();
        // const top5Solo = getChampNames(
        //   find5MostPlayed(matchHistory.matches),
        //   champion_array
        // );
        const response = await User.updateUser({
          query: { u: user.username },
          body: {
            data: {
              soloTier: leagueData[0].tier,
              soloDivision: leagueData[0].rank,
              soloLp: leagueData[0].leaguePoints,
              summonerLevel: accountData.summonerLevel,
              iconId: accountData.profileIconId,
              soloMostPlayed: ["Aatrox", "Aatrox", "Aatrox", "Aatrox", "Aatrox"]
            }
          }
        });
      }
    })
  );
  await Promise.all(
    teams.map(async team => {
      let ranks = await Promise.all(
        team.members.map(async el => {
          const user = await User.getUser({
            query: {
              u: el
            }
          });
          return ranksByNum(user.soloTier, user.soloDivision, 0);
        })
      );
      ranks = ranks.filter(el => {
        return el != null;
      });
      const rankSize = ranks.length;
      if (rankSize > 0) {
        ranks = ranks.reduce((a, b) => a + b) / rankSize;
        Team.modifyTeam({
          query: {
            t: team.name
          },
          body: {
            data: {
              pr: String(Math.round(ranks))
            }
          }
        });
      }
      await new Promise(resolve => setTimeout(resolve(), TEAM_CYCLE_WAIT));
    })
  );
  console.log("Database Updated", new Date());
  return new Promise(resolve => setTimeout(resolve(), TOTAL_CYCLE_WAIT));
};

module.exports = () => {
  const fun = async () => {
    await Promise.all([
      new Promise(async (resolve, reject) => {
        try {
          await proccessor();
        } catch (e) {
          console.log(e);
        }
        resolve();
      })
    ]);
    return fun();
  };
  fun();
};
