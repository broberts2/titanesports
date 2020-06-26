const _embed = require("../_embed");
const _Colors = require("../_colors");

const __reactionIndex__ = {
  1: "1️⃣",
  2: "2️⃣",
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
  6: "6️⃣",
  7: "7️⃣",
  8: "8️⃣",
  9: "9️⃣",
  10: "🔟",
};

const _buildReactions = (msg, args) => {
  args.map(async (el, i) => await msg.react(__reactionIndex__[i + 1]));
  return msg;
};

const _buildOptions_ = (arr) =>
  arr.map((el, i) => `${i + 1}) ${el}`).join("\n");

const _getWinner_ = async (msg, time, options) =>
  await msg
    .awaitReactions(
      (reaction) =>
        Object.values(__reactionIndex__).some(
          (el) => reaction.emoji.name === el
        ),
      {
        time: parseInt(time) * 1000,
      }
    )
    .then((collected) => {
      let obj = {
        highestValue: 0,
        winners: [{ name: 0, value: 0, text: "" }],
      };
      let text,
        voteNums = [];
      options.map((el, i) => {
        voteNums.push(collected.get(__reactionIndex__[i + 1]).count - 1);
        if (
          collected.get(__reactionIndex__[i + 1]).count - 1 >=
          obj.highestValue
        ) {
          obj.winners.push({
            name: __reactionIndex__[i + 1],
            value: collected.get(__reactionIndex__[i + 1]).count - 1,
            text: el,
          });
          obj.highestValue = collected.get(__reactionIndex__[i + 1]).count - 1;
        }
      });
      obj.winners = obj.winners.filter((el) =>
        el.value === obj.highestValue ? el : null
      );
      if (obj.highestValue === 0) {
        text = `There weren't enough votes 🤔.`;
      } else if (obj.winners.length === 1) {
        text = `${obj.winners[0].name} ${obj.winners[0].text} wins with ${obj.highestValue} vote(s)!`;
      } else {
        text = `There's a ${
          obj.winners.length
        } way tie between:\n${obj.winners
          .map((el, i) => `${el.name} ${el.text} with ${el.value} vote(s)`)
          .join("\n")}`;
      }
      return {
        text,
        voteNums,
      };
    });

module.exports = (client) => ({
  exec: async (command, League, specialRoles) => {
    const options = command.args.slice(4, command.args.length);
    if (options.length > 0) {
      if (options.length <= 10) {
        let seconds = command.args[2];
        client.channels.cache
          .get(command.args[0])
          .send(
            _embed({
              description: `${command.args[1]}\n\n(Flash-poll will close in ${
                command.args[2]
              } seconds)\n\n${_buildOptions_(options)}`,
              status: _Colors[0],
              img: command.args[3],
            })
          )
          .then((msg) => _buildReactions(msg, options))
          .then((msg) =>
            _getWinner_(msg, command.args[2], options).then((obj) => {
              msg.delete();
              client.channels.cache.get(command.args[0]).send(
                _embed({
                  description: `"${
                    command.args[1]
                  }"\n(Poll Finished)\n\n${options
                    .map((el, i) => `${i + 1}) ${el} (${obj.voteNums[i]})`)
                    .join("\n")}\n\n${obj.text}`,
                  status: _Colors[3],
                  img: command.args[3],
                })
              );
            })
          );
        return "Poll creation successful!";
      } else {
        return new Error("You have too many selections.");
      }
    } else {
      return new Error("You do not have enough selections.");
    }
  },
  help:
    "!flashpoll - Creates a timed poll and then displays results upon expiration.\n\n```!flashpoll <channel_id> <question_text> <time_in_seconds> <img_url> <option_1_text> ... <option_n_text>```",
  roles: {
    standard: ["664717783971397642", "407684891069906974"],
    special: [],
  },
  status: 0,
});
