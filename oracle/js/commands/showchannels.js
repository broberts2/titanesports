module.exports = (client, roles) => ({
  exec: (command, League, specialRoles) =>
    client.channels.cache.map((el) => `${el.id} - ${el.name}\n`).join(""),
  help: "!showchannels - Sends an array of all guild channels to console.",
  status: 0,
  roles: {
    standard: ["562850250235052053", "407684891069906974"],
    special: [],
  },
});
