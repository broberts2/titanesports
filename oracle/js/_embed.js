const Discord = require("discord.js");

module.exports = obj =>
  new Discord.MessageEmbed()
    .setColor(obj.status)
    .setTitle("Oracle")
    .setDescription(obj.description)
    .setThumbnail(
      "https://www.vippng.com/png/full/475-4754894_stars-of-memoria-memory-cookies-best-friend-joins.png"
    )
    // .addFields(
    //   { name: "Regular field title", value: "Some value here" },
    //   { name: "\u200B", value: "\u200B" }
    // )
    .setTimestamp()
    .setFooter(
      "Titan E-Sports Butler",
      "https://www.vippng.com/png/full/475-4754894_stars-of-memoria-memory-cookies-best-friend-joins.png"
    );
