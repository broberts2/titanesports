const _help = {
  "Administrative Commands": ["showroles", "showchannels", "flashpoll"],
  "Director and Roster Staff Commands": [
    "swapstandings",
    "createcodes",
    "fetchcode",
  ],
  "Captain & Roster Staff Commands": ["dropplayer"],
  "Captain Commands": ["addplayer", "swapposition"],
  "Common Commands": ["rolerequest", "showdocuments"],
};

module.exports = (client) => ({
  exec: (command, League, specialRoles) =>
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
  roles: {
    standard: [],
    special: [],
  },
  status: 0,
});
