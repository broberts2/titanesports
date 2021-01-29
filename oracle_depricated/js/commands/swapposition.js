const _embed = require("../_embed");
const _Colors = require("../_colors");
const _team_index = require("../team_index");
const _rolescheck = require("../_utils/_roles_check");
const _pos = require("../_utils/_pos");
const _pos_standings_and_rosters = require("../_utils/_pos_standings_and_rosters");
const _validate = require("../_utils/_validate");

const _review_channel = "669430659198091264";

module.exports = (client, roles) => ({
  exec: async (command, League, specialRoles) => {
    let role = _rolescheck(
      _team_index.gladiator.concat(_team_index.olympian),
      roles
    );
    if (role) {
      role = client.guilds.cache
        .get("407423677236510730")
        .roles.cache.get(role);
      if (command.args.length === 2) {
        const _validated = await _validate(role, command, League.document);
        if (_validated) {
          const range = "A1:AN26";
          const sheet = await League.document.getTeamBySheet(role.name);
          await sheet.loadCells(range);
          const sheet2 = await League.document.getTeamBySheet(
            "Standings and Rosters"
          );
          await sheet2.loadCells(range);

          const sheetCellSwap = [
            sheet.getCell(1, _pos(command.args[0])),
            sheet.getCell(1, _pos(command.args[1])),
          ];
          const getRowNum = (() => {
            for (let i = 0; i < 26; i++) {
              if (sheet2.getCell(i, 1).value === role.name) {
                return i;
              }
            }
          })();
          const sheet2CellSwap = [
            sheet2.getCell(
              getRowNum,
              _pos_standings_and_rosters(command.args[0])
            ),
            sheet2.getCell(
              getRowNum,
              _pos_standings_and_rosters(command.args[1])
            ),
          ];
          const sheetCellValue1 = sheetCellSwap[0].value;
          const sheetCellValue2 = sheetCellSwap[1].value;
          const sheetCellValue3 = sheet2CellSwap[0].value;
          const sheetCellValue4 = sheet2CellSwap[1].value;
          sheetCellSwap[0].value = sheetCellValue2;
          sheetCellSwap[1].value = sheetCellValue1;
          sheet2CellSwap[0].value = sheetCellValue4;
          sheet2CellSwap[1].value = sheetCellValue3;
          await sheet.saveUpdatedCells();
          await sheet2.saveUpdatedCells();
          client.channels.cache.get(_review_channel).send(
            _embed({
              description: `A position swap was made:\n\nPerformed By: ${command.msg.author}\nDetails:\n${sheetCellValue2}\t\t---> ${command.args[0]}\n${sheetCellValue1}\t\t---> ${command.args[1]}`,
              status: _Colors[0],
            })
          );
          return `Swap successful!`;
        } else {
          return new Error(
            `Something was wrong with your submission. Please contact a staff member.`
          );
        }
        return `Your roster change to add a player is up for review!\n\nLeague: ${
          roles.includes("562850378727817236") ? "Gladiator" : "Olympian"
        }\nTeam: ${role.name}\nPlayer: ${command.args[0]}\nPosition: ${
          command.args[1]
        }\nOP.GG: ${command.args[2]}`;
      } else {
        return new Error(
          "Hmm, I wasn't able to parse your arguments. You should probably get with a staff member for help or use:\n```?swapposition```."
        );
      }
    } else {
      return new Error(
        "Hmm, I couldn't find your team in discord. You should probably get with a staff member for help."
      );
    }
  },
  help:
    "!swapposition - Swaps two positions within a team.\n\n```!swapposition <position1> <position2>```\nValid inputs:\nposition1: 'top', 'jungle', 'middle', 'bottom', 'support', 'sub1', 'sub2', 'sub3'\nposition2: 'top', 'jungle', 'middle', 'bottom', 'support', 'sub1', 'sub2', 'sub3'",
  status: 0,
  roles: {
    standard: ["562850378727817236", "631972855218700301"],
    special: [],
  },
});
