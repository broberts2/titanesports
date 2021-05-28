const Discord = require("discord.js");

const _br_ = (msg, reactions) => {
	reactions.map((r) => msg.react(r));
	return msg;
};

module.exports = (Oracle, embed) => (message, reactions) =>
	Oracle.channels
		.fetch(message.channel)
		.then((channel) =>
			channel
				.send(
					embed({
						description: message.message,
						status: message.status,
						img: message.img,
					})
				)
				.then((msg) => (reactions ? _br_(msg, reactions) : msg))
		);
