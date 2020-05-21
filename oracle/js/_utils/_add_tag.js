module.exports = (client, string, _role_) => {
  client.guilds.cache.get("407423677236510730").members.cache.map(el => {
    if (el.user.username.split(" | ")[0].includes(string)) {
      console.log(el.user.username, _role_);
      el.roles.add(
        client.guilds.cache
          .get("407423677236510730")
          .roles.cache.find(role => role.name === _role_)
      );
    }
  });
};
