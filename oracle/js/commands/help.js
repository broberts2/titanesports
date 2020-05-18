const _help = [
  require("./addplayer")().help,
  require("./showroles")().help,
  require("./showchannels")().help
];

module.exports = client => ({
  exec: () => "?help - Help is not a command.",
  help: _help.join("~~~").replace(/~~~/g, "\n\n"),
  roles: {},
  status: 0
});
