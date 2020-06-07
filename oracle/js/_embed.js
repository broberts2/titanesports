const Discord = require("discord.js");

module.exports = (obj) =>
  new Discord.MessageEmbed()
    .setColor(obj.status)
    .setTitle("Oracle")
    .setDescription(obj.description)
    .setThumbnail(
      "https://i.pinimg.com/originals/70/eb/0b/70eb0b53eb57c91db403928c5d02a19a.gif"
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
