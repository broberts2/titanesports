const _rolescheck = require("../_utils/_roles_check");
const _team_index = require("../team_index");

const _findPlayerInRow = (sheet, row, name) => {
  for (let i = 0; i < 9; i++) {
    const cell = sheet.getCell(row, i);
    if (cell.value === name) {
      return cell;
    }
  }
};

module.exports = (client, roles) => ({
  exec: async (command, League, specialRoles) => {
    let role = _rolescheck(
      _team_index.gladiator.concat(_team_index.olympian),
      roles
    );
    let _team_;
    if (!role && _rolescheck(roles, specialRoles) && command.args.length > 1) {
      command.args.pop();
      _team_ = command.args.pop();
      if (
        client.guilds.cache
          .get("407423677236510730")
          .roles.cache.map((el) => el.name)
          .includes(_team_)
      ) {
        role = { name: _team_ };
      }
    }
    if (command.args.length === 1) {
      if (League && League.document) {
        if (role) {
          if (!_team_) {
            role = client.guilds.cache
              .get("407423677236510730")
              .roles.cache.get(role);
          }
          await League.document.setup();
          const sheet = await League.document.getTeamBySheet(role.name);
          await sheet.loadCells("A1:I6");
          const sheet2 = await League.document.getTeamBySheet(
            "Standings and Rosters"
          );
          await sheet2.loadCells("A1:AN26");
          const teamSheetCell = _findPlayerInRow(sheet, 1, command.args[0]);
          if (teamSheetCell) {
            teamSheetCell.value = "";
          }
          const standingsCell = (() => {
            for (let i = 0, cell; i < 25; i++) {
              cell = sheet2.getCell(i, 1);
              if (cell.value === role.name) {
                for (let j = 8; j < 40; j++) {
                  cell = sheet2.getCell(i, j);
                  if (cell.value === command.args[0]) {
                    cell.value = "";
                    return cell;
                  }
                }
              }
            }
          })();
          if (teamSheetCell && standingsCell) {
            await sheet.saveUpdatedCells();
            await sheet2.saveUpdatedCells();
          }
          return teamSheetCell && standingsCell
            ? `Player '${command.args[0]}' successfully dropped!`
            : new Error(`Unable to drop player '${command.args[0]}'`);
        } else {
          return new Error(
            "Hmm, I couldn't find your team in discord. You should probably get with a staff member for help."
          );
        }
      } else {
        return new Error("Only team captains can perform this function.");
      }
    } else {
      return new Error(
        "Hmm, I wasn't able to parse your arguments. You should probably get with a staff member for help or use:\n```?dropplayer```."
      );
    }
  },
  help:
    "!dropplayer - Removes player from team.\n\nCaptains\n```!dropplayer <summoner_name>```\nRoster Staff\n```!dropplayer <summoner_name> <team_name> <league>```",
  status: 0,
  roles: {
    standard: ["562850378727817236", "631972855218700301"],
    special: ["432526140310290458", "407684891069906974", "664717783971397642"],
  },
});
