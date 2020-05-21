module.exports = (client, roles) => ({
  exec: () =>
    console.log(client.channels.cache.map(el => `${el.id} - ${el.name}\n`)),
  help: "!showchannels - Sends an array of all guild channels to console.",
  status: 0,
  roles: { id: "562850250235052053", id1: "407684891069906974" }
});
