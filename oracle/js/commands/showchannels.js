module.exports = (client, roles) => ({
  exec: () =>
    client.channels.cache
      .map(el => `${el.id} - ${el.name}\n`)
      .join("~~~")
      .replace(/~~~/g, ""),
  help: "!showchannels - Shows discord channel id's and monikers.",
  status: 0,
  roles: { id: "562850250235052053", id1: "407684891069906974" }
});
