const Embed = require("./embed");
const ReactionIndex = require("./reaction_index");
const SendMessage = require("./send_message");
const CollectReactions = require("./collect_reactions");
const readStaticDirectory = require("./read_static_directory");

module.exports = (Oracle) => ({
  SendMessage: SendMessage(Oracle, Embed),
  ReactionIndex,
  readStaticDirectory,
  CollectReactions: CollectReactions(ReactionIndex),
});
