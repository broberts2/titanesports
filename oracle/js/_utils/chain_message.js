const _Colors = require("../_colors");
const _embed = require("../_embed");

// Currently Staff Channel
const _review_channel = "444291643185692684";

const _director = "84522855248691200";

module.exports = (submission, approve, deny) => (client, msg, content) =>
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
            client.guilds.cache
              .get("407423677236510730")
              .members.cache.get(_director)
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
                  .then(collected => {
                    if (collected.get("👍").count > collected.get("👎").count) {
                      msg.author.send(approve);
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
