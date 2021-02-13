const Embed = require("./embed");
const ReactionIndex = require("./reaction_index");
const SendMessage = require("./send_message");
const CollectReactions = require("./collect_reactions");

module.exports = (Oracle) => ({
    SendMessage: SendMessage(Oracle, Embed),
    ReactionIndex,
    CollectReactions: CollectReactions(ReactionIndex)
});