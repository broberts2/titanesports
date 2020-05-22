const _embed = require("../_embed");
const _Colors = require("../_colors");
const _team_index = require("./team_index");
const _chain_message = require("../_utils/chain_message");
const _rolescheck = require("../_utils/_roles_check");
const _add_tag = require("../_utils/_add_tag");
const _pos = require("../_utils/_pos");
const _pos_standings_and_rosters = require("../_utils/_pos_standings_and_rosters");
const _validate = require("../_utils/_validate");

module.exports = (client, roles) => ({
  exec: async (command, League) => {
    let role = _rolescheck(
      _team_index.gladiator.concat(_team_index.olympian),
      roles
    );
    if (role) {
      role = client.guilds.cache
        .get("407423677236510730")
        .roles.cache.get(role);
      if (command.args.length === 3) {
        const _validated = await _validate(role, command, League.document);
        if (_validated) {
          _chain_message(
            _embed({
              description: `A new roster addition has been requested:\n\nLeague: ${
                roles.includes("562850378727817236") ? "Gladiator" : "Olympian"
              }\nTeam: ${role.name}\nPlayer: ${command.args[0]}\nPosition: ${
                command.args[1]
              }\nOP.GG: ${command.args[2]}`,
              status: _Colors[1]
            }),
            async () => {
              const range = "A1:AN26";
              const sheet = await League.document.getTeamBySheet(role.name);
              await sheet.loadCells(range);
              const sheet2 = await League.document.getTeamBySheet(
                "Standings and Rosters"
              );
              await sheet2.loadCells(range);
              let cell = sheet.getCell(1, _pos(command.args[1].toLowerCase()));
              cell.value = command.args[0];
              let cell2Row;
              for (let i = 1; i < 26; i += 2) {
                if (sheet2.getCell(i, 1).value === role.name) {
                  cell2Row = i;
                  break;
                }
              }
              const cell2 = sheet2.getCell(
                cell2Row,
                _pos_standings_and_rosters(command.args[1].toLowerCase())
              );
              cell2.value = command.args[0];
              await sheet.saveUpdatedCells();
              await sheet2.saveUpdatedCells();
              await _add_tag(client, command.args[0], role.name);
              return _embed({
                description: `Your roster addition request has been approved!\n\nLeague: ${
                  roles.includes("562850378727817236")
                    ? "Gladiator"
                    : "Olympian"
                }\nTeam: ${role.name}\nPlayer: ${command.args[0]}\nPosition: ${
                  command.args[1]
                }\nOP.GG: ${command.args[2]}`,
                status: _Colors[0]
              });
            },
            _embed({
              description: `Your roster addition request has been denied.\n\nLeague: ${
                roles.includes("562850378727817236") ? "Gladiator" : "Olympian"
              }\nTeam: ${role.name}\nPlayer: ${command.args[0]}\nPosition: ${
                command.args[1]
              }\nOP.GG: ${command.args[2]}`,
              status: _Colors[2]
            })
          )(client, command.msg, League.director);
        } else {
          return new Error(
            `Something was wrong with your submission. Please contact a staff member.`
          );
        }
        return `Your roster change to add a player is up for review!\n\nLeague: ${
          roles.includes("562850378727817236") ? "Gladiator" : "Olympian"
        }\n\nTeam: ${role.name}\nPlayer: ${command.args[0]}\nPosition: ${
          command.args[1]
        }\nOP.GG: ${command.args[2]}`;
      } else {
        return new Error(
          "Hmm, I wasn't able to parse your arguments. You should probably get with a staff member for help or use:\n```?addplayer```."
        );
      }
    } else {
      return new Error(
        "Hmm, I couldn't find your team in discord. You should probably get with a staff member for help."
      );
    }
  },
  help:
    "!addplayer - Sends request to add or replace player on team of sender.\n\n```!addplayer <summoner_name> <position> <op.gg>```\nValid inputs:\nsummoner name: <summoner_id>\nposition: 'top', 'jungle', 'middle', 'bottom', 'support', 'sub1', 'sub2', 'sub3'\nop.gg: <op.gg_url>",
  status: 1,
  roles: { id: "562850378727817236", id2: "631972855218700301" }
});
