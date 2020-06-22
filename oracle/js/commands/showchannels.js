module.exports = (client, roles) => ({
  exec: (command, League, specialRoles) =>
    client.channels.cache.map((el) => `${el.id} - ${el.name}\n`).join(""),
  help: "!showchannels - Displays all channels and their respective id's.",
  status: 0,
  roles: {
    standard: ["562850250235052053", "407684891069906974"],
    special: [],
  },
});
