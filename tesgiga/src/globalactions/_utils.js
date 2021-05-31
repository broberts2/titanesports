import _Cookies from "universal-cookie";
import config from "../config";

const Cookies = new _Cookies();

const utils = {
	discordRedirect: () => {
		let endpoint = config.production
			? config.productionDiscordOATH2
			: config.developmentDiscordOATH2;
		endpoint = endpoint.split("<___>");
		return `${endpoint[0]}${window.location.hostname.split(".")[0]}${
			endpoint[1]
		}`;
	},
	discordReturnDirect: () => {
		const params = {};
		window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
			params[key] = value;
		});
		if (params.auth_token && params.refresh_token) {
			utils.writeTokens(params.auth_token, params.refresh_token);
			window.history.replaceState(null, null, window.location.pathname);
		}
	},
	getUrlParameters: () => {
		const params = {};
		window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
			params[key] = value;
		});
		return params;
	},
	writeTokens: (auth_token, refresh_token) => {
		Cookies.set("auth_token", auth_token);
		Cookies.set("refresh_token", refresh_token);
	},
	getTokens: () => ({
		auth_token: Cookies.get("auth_token"),
		refresh_token: Cookies.get("refresh_token"),
	}),
	deleteTokens: () => {
		Cookies.remove("auth_token");
		Cookies.remove("refresh_token");
	},
	request: async (url, method, data) => {
		const res = await new Promise(async (resolve) => {
			setTimeout(
				() =>
					resolve({
						code: 408,
						message: "Request Timed Out",
					}),
				8000
			);
			const res = await fetch(
				`${
					config.production
						? config.productionEndpoint
						: config.developementEndpoint
				}${url}`,
				{
					headers: {
						"Content-Type": "application/json",
						token: utils.getTokens().auth_token,
					},
					method,
					body: data ? JSON.stringify(data) : null,
				}
			).then((res) => res.json());
			resolve(res);
		});
		return res;
	},
};

export default utils;
