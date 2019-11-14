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
    team1: {
      teamName: t1,
      inhibitorKills: report.teams[0].inhibitorKills,
      towerKills: report.teams[0].towerKills,
      dragonKills: report.teams[0].dragonKills,
      baronKills: report.teams[0].baronKills,
      riftHeraldKills: report.teams[0].riftHeraldKills,
      firstDragon: report.teams[0].firstDragon,
      firstBaron: report.teams[0].firstBaron,
      firstInhibitor: report.teams[0].firstInhibitor,
      firstTower: report.teams[0].firstTower,
      firstBlood: report.teams[0].firstBlood,
      win: report.teams[0].win === "Win" ? true : false,
      participants: participants1
    },
    team2: {
      teamName: t2,
      inhibitorKills: report.teams[1].inhibitorKills,
      towerKills: report.teams[1].towerKills,
      dragonKills: report.teams[1].dragonKills,
      baronKills: report.teams[1].baronKills,
      riftHeraldKills: report.teams[1].riftHeraldKills,
      firstDragon: report.teams[1].firstDragon,
      firstBaron: report.teams[1].firstBaron,
      firstInhibitor: report.teams[1].firstInhibitor,
      firstTower: report.teams[1].firstTower,
      firstBlood: report.teams[1].firstBlood,
      win: report.teams[1].win === "Win" ? true : false,
      participants: participants2
    }
  };
};

module.exports = async (cb, t1, t2, res) => {
  let report = typeof cb === "function" ? await cb() : await cb;
  report = sanitize(report, t1, t2);
  res.json(report);
};
