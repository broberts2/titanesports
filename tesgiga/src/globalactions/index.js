import Utils from "./_utils";

export default (subdomain) => ({
	Utils: {
		isSignedIn: () =>
			Utils.getTokens().auth_token &&
			Utils.getTokens().auth_token !== "undefined",
		loadResources: async (arr) => {
			return await Promise.all(
				arr.map((el) => new Promise((resolve) => el.onload(resolve(el))))
			);
		},
		discordSignIn: () => window.location.replace(Utils.discordRedirect()),
		discordReturnDirect: () => Utils.discordReturnDirect(),
		signOut: () => {
			Utils.deleteTokens();
			window.location.reload();
		},
	},
	Requests: {
		getMyPermissions: async () =>
			await Utils.request(`/${subdomain}/Oracle/getMyPermissions`, "get", null),
		postApplication: async (body, origin, category) =>
			await Utils.request(
				`/${subdomain}/Applications/postApplication`,
				"post",
				{
					JSON: JSON.stringify(body),
					origin,
					category,
				}
			),
		getApplications: async () =>
			await Utils.request(
				`/${subdomain}/Applications/getApplications`,
				"get",
				null
			),
	},
});
