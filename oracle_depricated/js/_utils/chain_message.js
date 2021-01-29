const _Colors = require("../_colors");
const _embed = require("../_embed");

const _review_channel = "708512917011824750";

module.exports = (submission, approve, deny) => (client, msg, _director) =>
  client.channels.cache
    .get(_review_channel)
    .send(submission)
    .then(msg2 => {
      msg2.react("👍").then(() => msg2.react("👎"));
      msg2
        .awaitReactions(
          reaction => ["👍", "👎"].includes(reaction.emoji.name),
          {
            max: 5
          }
        )
        .then(collected => {
          if (collected.get("👍").count > collected.get("👎").count) {
            client.guilds.cache;
            // .get("407423677236510730")
            // .members.cache.get(_director)
            client.channels.cache
              .get("700894664445788260")
              .send(submission)
              .then(msg3 => {
                msg3.react("👍").then(() => msg3.react("👎"));
                msg3
                  .awaitReactions(
                    reaction => ["👍", "👎"].includes(reaction.emoji.name),
                    {
                      max: 5
                    }
                  )
                  .then(async collected => {
                    if (collected.get("👍").count > collected.get("👎").count) {
                      const _approve = await approve();
                      msg.author.send(_approve);
                      msg3.delete();
                    } else {
                      msg.author.send(deny);
                      msg3.delete();
                    }
                  });
              });
            msg2.delete();
          } else {
            msg.author.send(deny);
            msg2.delete();
          }
        });
    });
