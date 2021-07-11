const fetch = require("node-fetch");

module.exports = async (req) => {
	const id = await fetch("https://discord.com/api/users/@me", {
		headers: {
			authorization: `Bearer ${req.query.token}`,
		},
	})
		.then((res) => res.json())
		.then((res) => res.id);
	return id;
};
