module.exports = (ReactionIndex) => async (msg, time) => await msg.awaitReactions(
    (reaction) => Object.values(ReactionIndex).some((el) => reaction.emoji.name === el ), { time }
).then(collected => {
    const obj = {};
    collected.forEach((value, key) => obj[key] = value.count - 1);
    return obj;
})