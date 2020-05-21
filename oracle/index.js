const Discord = require("discord.js");
const config = require("./config");
const client = new Discord.Client();
const parser = require("./parser");

client.login(config.token);

client.on("message", async msg => {
  if (
    (msg.mentions.users.map(el => el.id).includes("711694390078341171") ||
      msg.mentions.roles.map(el => el.id).includes("711712219758592071") ||
      msg.channel.type === "dm") &&
    msg.content.length > 0
  ) {
    const message = await parser(
      msg,
      client,
      client.guilds.cache
        .get("407423677236510730")
        .members.cache.get(msg.author.id)._roles
    );
    if (msg.channel.type === "dm") {
      msg.author.send(message);
    } else {
      await client.channels.cache
        .get(msg.channel.id)
        .send(`<@${msg.author.id}>`);
      client.channels.cache.get(msg.channel.id).send(message);
    }
  }
});

console.log(
  `--------------------------------------\n\tRunning Oracle Bot\n--------------------------------------`
);
