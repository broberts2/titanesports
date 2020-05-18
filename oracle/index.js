const Discord = require("discord.js");
const config = require("./config");
const client = new Discord.Client();
const parser = require("./parser");

client.login(config.token);

client.on("message", msg => {
  if (msg.channel.type === "dm" && msg.content.length > 0) {
    msg.author.send(
      parser(
        msg,
        client,
        client.guilds.cache
          .get("407423677236510730")
          .members.cache.get(msg.author.id)._roles
      )
    );
  }
});
