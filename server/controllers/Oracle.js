const config = require("../config");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const Oracle = new Discord.Client();
const Permissions = require("../controllers/Permissions");
const Account = require("../models/Account");
const OracleUtils = require("../oracle_utils/index")(Oracle);

Oracle.login(config.oracle.token);

module.exports = {
	OATH2: async (req) => {
		const res = await fetch("https://discord.com/api/oauth2/token", {
			method: "POST",
			body: new URLSearchParams({
				client_id: config.oracle.client_id,
				client_secret: config.oracle.client_secret,
				grant_type: "authorization_code",
				redirect_uri: `${config.endpoint}/Oracle/OATH2`,
				code: req.query.code,
				scope: "the scopes",
			}),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		}).then((res) => res.json());
		return `${config.client}?auth_token=${res.access_token}&refresh_token=${res.refresh_token}`;
	},
	getUser: async (req) => {
		const res = await Oracle.guilds
			.fetch(config.guildId)
			.then((guild) => guild.members.fetch(req.query.id))
			.then((res) => res.user);
		const discData = await Oracle.guilds
			.fetch(config.guildId)
			.then((guild) => guild.members.fetch(res.id));
		const {
			badges,
			memberOf,
			discordId,
			titanPoints,
			profileBanner,
			profileIcon,
			summonerId,
		} = await Account.findOne({
			discordId: res.id,
		});
		let opGG;
		let summonerName;
		if (summonerId) {
			const summoner = await fetch(
				`https://na1.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${config.riotGeneralApiKey}`
			)
				.then((res) => res.json())
				.then((res) => res.name);
			opGG = `https://na.op.gg/summoner/userName=${summoner}`;
			summonerName = summoner;
		}
		return Object.assign(
			{
				summonerName,
				badges,
				memberOf,
				discordId,
				titanPoints,
				profileBanner,
				profileIcon,
				summonerId,
				opGG,
			},
			res,
			{
				nickname: discData.nickname,
				avatarUrl: `https://cdn.discordapp.com/avatars/${res.id}/${res.avatar}.png`,
			}
		);
	},
	getAllUsers: async (req) => {
		const userList = await Oracle.guilds
			.fetch(config.guildId)
			.then((guild) => guild.members.fetch());
		return userList;
	},
	getAllChannels: async (req) => {
		const channelList = await Oracle.guilds
			.fetch(config.guildId)
			.then((guild) => guild.channels.cache);
		return channelList;
	},
	identify: async (req) => {
		const res = await fetch("https://discord.com/api/users/@me", {
			headers: {
				authorization: `Bearer ${req.query.access_token}`,
			},
		}).then((res) => res.json());
		res.discordId = res.id;
		const discData = await Oracle.guilds
			.fetch(config.guildId)
			.then((guild) => guild.members.fetch(res.id));
		return Object.assign(res, {
			nickname: discData.nickname,
			avatarUrl: `https://cdn.discordapp.com/avatars/${res.id}/${res.avatar}.png`,
		});
	},
	createFlashPoll: async (req) => {
		(async () => {
			const rns = await OracleUtils.SendMessage(
				{
					channel: req.body.channelId,
					message: `${req.body.question}\n\n${req.body.answerArray
						.map((el, i) => `${OracleUtils.ReactionIndex[i]} ${el}`)
						.join("\n")}`,
					status: "flash",
					img: req.body.imgUrl,
				},
				req.body.answerArray.map((_, i) => OracleUtils.ReactionIndex[i])
			).then(async (msg) => {
				const reactions = await OracleUtils.CollectReactions(
					msg,
					req.body.time
				);
				msg.delete();
				return reactions;
			});
			let winners = [];
			let index = 0;
			for (const key in rns) {
				if (rns[key] > 0) {
					const max =
						winners.length > 0
							? Math.max.apply(
									Math,
									winners.map((el) => Object.values(el)[0])
							  )
							: -1;
					if (rns[key] > max) {
						winners = [
							{ [key]: rns[key], index, text: req.body.answerArray[index] },
						];
					} else if (rns[key] === max) {
						winners.push({
							[key]: rns[key],
							index,
							text: req.body.answerArray[index],
						});
					}
				}
				index++;
			}
			const winMsg = () => {
				if (winners.length > 1) {
					const winnersArray = winners.map((el) => ({
						icon: Object.keys(el)[0],
						text: el.text,
						count: Object.values(el)[0],
					}));
					return `It's a tie between${winnersArray
						.map(
							(el, i) =>
								` ${i >= winners.length - 1 ? "and " : ""}${el.icon} "${
									el.text
								}"`
						)
						.join(winners.length < 2 ? "" : ",")} with ${
						winnersArray[0].count
					} vote${winners.length > 1 ? "s" : ""}!`;
				} else if (winners.length > 0) {
					const obj = {
						icon: Object.keys(winners[0])[0],
						text: winners[0].text,
						count: Object.values(winners[0])[0],
					};
					return `${obj.icon} "${obj.text}" wins with ${obj.count} vote${
						obj.count > 1 ? "(s)" : ""
					}!`;
				}
				return `Well that's awkward. Nobdy voted!`;
			};
			OracleUtils.SendMessage({
				channel: req.body.channelId,
				message: `${req.body.question}\n\n${req.body.answerArray
					.map(
						(el, i) =>
							`${OracleUtils.ReactionIndex[i]} (${Object.values(rns)[i]}) ${el}`
					)
					.join("\n")}\n\n${winMsg()}`,
				status: null,
				img: req.body.imgUrl,
			});
		})();
		return "Success!";
	},
	authAction: async (req) => {
		if (req.query.token) {
			const user = await fetch("https://discord.com/api/users/@me", {
				headers: {
					authorization: `Bearer ${req.query.token}`,
				},
			}).then((res) => res.json());
			const permissionSet = await Permissions.get();
			const memebers = await Oracle.guilds
				.fetch(config.guildId)
				.then((res) => res.members);
			const roles = await memebers.fetch(user.id).then((res) => res._roles);
			return permissionSet[req.query.action].some((a) => roles.includes(a));
		}
		return false;
	},
};
