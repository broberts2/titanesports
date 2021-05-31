import config from "../config";

const _ = config.production
	? config.productionEndpoint
	: config.developementEndpoint;

export default {
	discord: "https://discord.gg/uZ8Q7ncrV4",
	twitch: "https://www.twitch.tv/titanesportz",
	twitter: "https://twitter.com/titanesportz",
	reddit: "https://www.reddit.com/user/TES_League/",
	youtube: "https://www.youtube.com/channel/UCo5klVtSLp2YLch8ye_FBRw",
	facebook: "https://www.facebook.com/titanesportz/",
	images: {
		logo: `${_}/static/images/logo.png`,
		lol: `${_}/static/images/lol.png`,
		valorant: `${_}/static/images/valorant.png`,
		worldofwarcraft: `${_}/static/images/worldofwarcraft.png`,
		valheim: `${_}/static/images/valheim.png`,
	},
	backgrounds: {
		violet: `${_}/static/backgrounds/violet.png`,
	},
};
