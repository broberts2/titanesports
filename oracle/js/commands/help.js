const _help = [
  require("./addplayer")().help,
  require("./showroles")().help,
  require("./showchannels")().help,
  require("./swapstandings")().help
];

module.exports = client => ({
  exec: () =>
    "!Help does not exist. Perhaps you were looking for\n\n```?help```",
  help: _help
    .join("~~~")
    .replace(
      /~~~/g,
      "\n\n----------------------------------------------------------------------------\n\n"
    ),
  roles: {},
  status: 0
});
