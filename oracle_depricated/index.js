const Discord = require("discord.js");
const config = require("./config");
const client = new Discord.Client();
const parser = require("./parser");

client.login(config.token);

client.on("message", async (msg) => {
  if (
    (config.oracleIds
      .map(
        (id) =>
          msg.mentions.users.map((el) => el.id).includes(id) ||
          msg.mentions.roles.map((el) => el.id).includes(id)
      )
      .includes(true) ||
      msg.channel.type === "dm") &&
    msg.content.length > 0
  ) {
    // const message = await parser(
    //   msg,
    //   client,
    //   client.guilds.fetch("407423677236510730").then(guild => guild.members.fetch(res.id))._roles
    // );
    const res = await client.guilds.fetch("407423677236510730").then(guild => guild.members.fetch(res.id))._roles;
    console.log(res);
    message.map(async (el) => {
      if (msg.channel.type === "dm") {
        msg.author.send(el);
      } else {
        await client.channels.cache
          .get(msg.channel.id)
          .send(`<@${msg.author.id}>`);
        client.channels.cache.get(msg.channel.id).send(el);
      }
    });
  }
});

console.log(
  `--------------------------------------\n\tRunning Oracle Bot\n--------------------------------------`
);
