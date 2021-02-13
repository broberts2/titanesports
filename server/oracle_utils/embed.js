const Discord = require("discord.js");

const Colors = (status) => {
  switch(status) {
    case "flash":
      return "#ff0080";
    default:
      return "#360059";
  }
};

module.exports = (obj) =>
  new Discord.MessageEmbed()
    .setColor(Colors(obj.status))
    .setTitle("Oracle")
    .setDescription(obj.description)
    .setThumbnail("https://i.gifer.com/XDZT.gif")
    .setImage(obj.img)
    .setTimestamp()
    .setFooter(
      "Titan E-Sports Butler",
      "https://www.vippng.com/png/full/475-4754894_stars-of-memoria-memory-cookies-best-friend-joins.png"
    );