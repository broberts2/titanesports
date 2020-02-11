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

module.exports = (report, tournamentCode, t1, t2, tesSeason, league) => {
  let participants1 = {};
  let participants2 = {};
  const calcLcs = index => {
    if (index === 0 || index === 5) return "TOP";
    else if (index === 1 || index === 6) return "JUNGLE";
    else if (index === 2 || index === 7) return "MIDDLE";
    else if (index === 3 || index === 8) return "BOTTOM";
    else if (index === 4 || index === 9) return "SUPPORT";
  };
  let playerInfoObj = (player, stats, timeline, index) => ({
    platformId: player.platformId,
    accountId: player.accountId,
    summonerName: player.summonerName,
    summonerId: player.summonerId,
    currentPlatformId: player.currentPlatformId,
    currentAccountId: player.currentAccountId,
    matchHistoryUri: player.matchHistoryUri,
    profileIcon: player.profileIcon,
    stats,
    position: timeline.lane,
    lcsPosition: calcLcs(index)
  });
  report.participantIdentities.map((el, i) => {
    report.participants.map(el2 => {
      if (el.participantId === el2.participantId) {
        if (el2.teamId === 100) {
          participants1[el.player.summonerName] = playerInfoObj(
            el.player,
            el2.stats,
            el2.timeline,
            i
          );
        } else {
          participants2[el.player.summonerName] = playerInfoObj(
            el.player,
            el2.stats,
            el2.timeline,
            i
          );
        }
      }
    });
  });
  return {
    gameVersion: report.gameVersion,
    gameTime: Math.round((report.gameDuration / 60).toFixed(2) * 100) / 100,
    gameCreation: report.gameCreation,
    tournamentCode,
    tesSeason,
    league,
    team1: template(report, t1, 0, participants1),
    team2: template(report, t2, 1, participants2)
  };
};
