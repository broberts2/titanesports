const _help = {
  "Administrative Commands": ["showroles", "showchannels", "swapstandings"],
  "Captain Commands": ["addplayer", "dropplayer", "swapposition"],
  "Common Commands": ["rolerequest"],
};

module.exports = (client) => ({
  exec: () =>
    "!Help does not exist. Perhaps you were looking for\n\n```?help```",
  help: (() => {
    let str =
      "--------------------------- Commands Index ----------------------------";
    for (key in _help) {
      str += `${`\n\n${key}:\n`}${
        "```" + _help[key].map((el) => `!${el}`).join("\n") + "```"
      }`;
    }
    return str;
  })(),
  roles: {},
  status: 0,
});
