const template = (report, teamName, index, participants) => ({
  teamName,
  inhibitorKills: report.teams[index].inhibitorKills,
  towerKills: report.teams[index].towerKills,
  dragonKills: report.teams[index].dragonKills,
  baronKills: report.teams[index].baronKills,
  riftHeraldKills: report.teams[index].riftHeraldKills,
  firstDragon: report.teams[index].firstDragon,
  firstBaron: report.teams[index].firstBaron,
  firstInhibitor: report.teams[index].firstInhibitor,
  firstTower: report.teams[index].firstTower,
  firstBlood: report.teams[index].firstBlood,
  win: report.teams[index].win === "Win" ? true : false,
  participants
});

const sanitize = (report, t1, t2) => {
  report = report.gameData;
  let participants1 = {};
  let participants2 = {};
  report.participantIdentities.map(el => {
    report.participants.map(el2 => {
      if (el.participantId === el2.participantId) {
        if (el2.teamId === 100) {
          participants1[el.player.summonerName] = {};
        } else {
          participants2[el.player.summonerName] = {};
        }
      }
    });
  });
  //return report;
  return {
    gameTime: report.gameDuration,
    team1: template(report, t1, 0, participants1),
    team2: template(report, t2, 1, participants2)
  };
};

module.exports = async (cb, t1, t2, res) => {
  let report = typeof cb === "function" ? await cb() : await cb;
  report = sanitize(report, t1, t2);
  res.json(report);
};
