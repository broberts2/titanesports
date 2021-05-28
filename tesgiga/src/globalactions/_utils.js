import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import config from "../config";

const utils = {
	writeTokens: (auth_token, refresh_token) => {
		bake_cookie(auth_token);
		bake_cookie(refresh_token);
	},
	getTokens: () => ({
		auth_token: read_cookie("auth_token"),
		refresh_token: read_cookie("refresh_token"),
	}),
	deleteTokens: () => {
		delete_cookie("auth_token");
		delete_cookie("refresh_token");
	},
	request: async (url, method, data, loadingVarCb) => {
		if (loadingVarCb) loadingVarCb(true);
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
		if (loadingVarCb) loadingVarCb(false);
		return res;
	},
};

export default utils;
