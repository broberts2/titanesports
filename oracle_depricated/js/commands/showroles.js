module.exports = (client, roles) => ({
  exec: (command, League, specialRoles) =>
    client.guilds.cache
      .get("407423677236510730")
      .roles.cache.map((el) => `${el.id} - ${el.name}\n`)
      .join()
      .replace(/,/g, ""),
  help: "!showroles - Shows guild roles with id and moniker.",
  status: 0,
  roles: {
    standard: ["562850250235052053", "407684891069906974"],
    special: [],
  },
});
