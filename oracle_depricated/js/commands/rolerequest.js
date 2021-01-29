const _embed = require("../_embed");
const _Colors = require("../_colors");

const _roleChannel = "669430659198091264";

module.exports = (client, roles) => ({
  exec: async (command, League, specialRoles) => {
    if (
      client.guilds.cache
        .get("407423677236510730")
        .roles.cache.find((role) => role.name === command.args[0])
    ) {
      client.channels.cache
        .get(_roleChannel)
        .send(
          _embed({
            description: `A role request for '${command.args[0]}' by ${command.msg.author}.`,
            status: _Colors[1],
          })
        )
        .then((msg2) => {
          msg2.react("👍").then(() => msg2.react("👎"));
          msg2
            .awaitReactions(
              (reaction) => ["👍", "👎"].includes(reaction.emoji.name),
              {
                max: 5,
              }
            )
            .then(async (collected) => {
              if (collected.get("👍").count > collected.get("👎").count) {
                client.guilds.cache
                  .get("407423677236510730")
                  .members.cache.get(command.msg.author.id)
                  .roles.add(
                    client.guilds.cache
                      .get("407423677236510730")
                      .roles.cache.find((role) => role.name === command.args[0])
                  );
                command.msg.author.send(
                  _embed({
                    description: `Your role request has been approved!.`,
                    status: _Colors[0],
                  })
                );
                msg2.delete();
              } else {
                command.msg.author.send(
                  _embed({
                    description: `Your role request has been denied.`,
                    status: _Colors[2],
                  })
                );
                msg2.delete();
              }
            });
        });
      return `Your role request for '${command.args[0]}' is up for review!`;
    } else {
      return new Error(
        `I was unable to find the role '${command.args[0]}'. Tip - Arguments are case sensitive.`
      );
    }
  },
  help:
    "!rolerequest - Requests specified role. Replace spaces with '+' character.\n\n```!rolerequest <exact_role_name>```",
  status: 0,
  roles: { standard: [], special: [] },
});
