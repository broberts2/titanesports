const config = require("../config");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const Oracle = new Discord.Client();
const Permissions = require("../controllers/Permissions");
const Account = require("../models/Account");

Oracle.login(config.oracle.token);

module.exports = {
  OATH2: async (req) => {
    const res = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: config.oracle.client_id,
        client_secret: config.oracle.client_secret,
        grant_type: 'authorization_code',
        redirect_uri: `${config.endpoint}/Oracle/OATH2`,
        code: req.query.code,
        scope: 'the scopes',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => res.json())
    return `${config.client}?auth_token=${res.access_token}&refresh_token=${res.refresh_token}`;
  },
  getUser: async (req) => {
    const res = await Oracle.guilds.fetch(config.guildId).then(guild => guild.members.fetch(req.query.id)).then(res => res.user);
    const discData = await Oracle.guilds.fetch(config.guildId).then(guild => guild.members.fetch(res.id));
    const {badges, memberOf, discordId, titanPoints} = await Account.findOne({discordId: res.id});
    return Object.assign({badges, memberOf, discordId, titanPoints}, res, {nickname: discData.nickname, avatarUrl: `https://cdn.discordapp.com/avatars/${res.id}/${res.avatar}.png`});
  },
  getAllUsers: async (req) => {
    const userList = await Oracle.guilds.fetch(config.guildId).then(guild => guild.members.fetch());
    return userList;
  },
  identify: async (req) => {
    const res = await fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `Bearer ${req.query.access_token}`,
      }
    }).then(res => res.json())
    res.discordId = res.id;
    const discData = await Oracle.guilds.fetch(config.guildId).then(guild => guild.members.fetch(res.id));
    return Object.assign(res, {nickname: discData.nickname, avatarUrl: `https://cdn.discordapp.com/avatars/${res.id}/${res.avatar}.png`});
  },
  authAction: async (req) => {
    if(req.query.token) {
      const user = await fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `Bearer ${req.query.token}`,
        }
      }).then(res => res.json())
      const permissionSet = await Permissions.get();
      const memebers = await Oracle.guilds.fetch(config.guildId).then(res => res.members);
      const roles = await memebers.fetch(user.id).then(res => res._roles);
      return permissionSet[req.query.action].some(a => roles.includes(a));
    }
    return false
  }
};