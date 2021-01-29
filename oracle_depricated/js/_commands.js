module.exports = (client, roles) => ({
  addplayer: require("./commands/addplayer")(client, roles),
  showroles: require("./commands/showroles")(client, roles),
  showchannels: require("./commands/showchannels")(client, roles),
  swapstandings: require("./commands/swapstandings")(client, roles),
  dropplayer: require("./commands/dropplayer")(client, roles),
  rolerequest: require("./commands/rolerequest")(client, roles),
  createcodes: require("./commands/createcodes")(client, roles),
  fetchcode: require("./commands/fetchcode")(client, roles),
  swapposition: require("./commands/swapposition")(client, roles),
  showdocuments: require("./commands/showdocuments")(client, roles),
  flashpoll: require("./commands/flashpoll")(client, roles),
  help: require("./commands/help")(),
});