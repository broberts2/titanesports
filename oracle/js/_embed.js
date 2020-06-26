const Discord = require("discord.js");

module.exports = (obj) =>
  new Discord.MessageEmbed()
    .setColor(obj.status)
    .setTitle("Oracle")
    .setDescription(obj.description)
    .setThumbnail("https://i.gifer.com/XDZT.gif")
    .setImage(obj.img)
    .setTimestamp()
    .setFooter(
      "Titan E-Sports Butler",
      "https://www.vippng.com/png/full/475-4754894_stars-of-memoria-memory-cookies-best-friend-joins.png"
    );
