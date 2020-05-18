const _embed = require("../_embed");
const _Colors = require("../_colors");
const _team_index = require("./team_index");
const _chain_message = require("../_utils/chain_message");

const _rolescheck = (ar1, ar2) => {
  for (let i = 0; i < ar1.length; i++) {
    for (let j = 0; j < ar2.length; j++) {
      if (ar1[i] === ar2[j]) return ar1[i];
    }
  }
  return false;
};

module.exports = (client, roles) => ({
  exec: msg => {
    let content = msg.content.split(" ");
    content.shift();
    content.shift();
    let role = _rolescheck(
      _team_index.gladiator.concat(_team_index.olympian),
      roles
    );
    if (role) {
      role = client.guilds.cache
        .get("407423677236510730")
        .roles.cache.get(role);
      if (content.length === 3) {
        _chain_message(
          _embed({
            description: `A new roster addition has been requested:\n\nTeam: ${role}\nPlayer: ${
              content[0]
            }\nPosition: ${content[1]}\nOP.GG: ${content[2]}`,
            status: _Colors[1]
          }),
          _embed({
            description: `Your roster addition request has been approved!\n\nTeam: ${role}\nPlayer: ${
              content[0]
            }\nPosition: ${content[1]}\nOP.GG: ${content[2]}`,
            status: _Colors[0]
          }),
          _embed({
            description: `Your roster addition request has been denied.\n\nTeam: ${role}\nPlayer: ${
              content[0]
            }\nPosition: ${content[1]}\nOP.GG: ${content[2]}`,
            status: _Colors[2]
          })
        )(client, msg, content);
        return `Your roster change to add a player is up for review!\n\nTeam: ${role}\nPlayer: ${
          content[0]
        }\nPosition: ${content[1]}\nOP.GG: ${content[2]}`;
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
    "!addplayer - Sends request to add player to team of sender.\n\n```!addplayer - <summoner_name> <position> <op.gg>```",
  status: 1,
  roles: { id: "562850378727817236", id2: "631972855218700301" }
});
