import Utils from "./_utils";
import TitanState from "sites/titandraft/state/index";

export default (subdomain) => {
	const actions = {
		Utils: {
			isSignedIn: () =>
				Utils.getTokens().auth_token &&
				Utils.getTokens().auth_token !== "undefined",
			loadResources: async (arr) => {
				return await Promise.all(
					arr.map((el) => new Promise((resolve) => el.onload(resolve(el))))
				);
			},
			getUrlParameters: Utils.getUrlParameters,
			discordSignIn: () => window.location.replace(Utils.discordRedirect()),
			discordReturnDirect: () => Utils.discordReturnDirect(),
			signOut: () => {
				Utils.deleteTokens();
				window.location.reload();
			},
		},
		Requests: {
			getMyPermissions: async () =>
				await Utils.request(`/admin/Oracle/getMyPermissions`, "get", null),
			getAllChannels: async () =>
				await Utils.request(`/admin/Oracle/getAllChannels`, "get", null),
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
			createFlashPoll: async (body) =>
				await Utils.request(
					`/${subdomain}/Oracle/create_flash_poll`,
					"post",
					body
				),
			createTeam: async (body) =>
				await Utils.request(`/${subdomain}/Team/createTeam`, "post", body),
			createDraft: async (body) => {
				TitanState.blueteam = Object.assign(TitanState.blueteam, body.blueteam);
				TitanState.redteam = Object.assign(TitanState.redteam, body.redteam);
				return await Utils.request(
					`/${subdomain}/TitanDraft/createDraft`,
					"post",
					{
						state: TitanState,
					}
				);
			},
			deleteTeam: async (body) =>
				await Utils.request(`/${subdomain}/Team/deleteTeam`, "delete", body),
			videoSubmission: async (body) =>
				await Utils.upload(`/${subdomain}/Oracle/videoSubmission`, null, body),
			updateTeam: async (body) =>
				await Utils.request(`/${subdomain}/Team/updateTeam`, "put", body),
			getTeams: async (query) =>
				await Utils.request(
					`/${subdomain}/Team/getTeams${
						query ? `?query=${JSON.stringify(query)}` : ""
					}`,
					"get"
				),
			omniPost: async (message, img) => {
				return await actions.Requests.postTweet(message, img);
			},
			postTweet: async (tweet, img) =>
				await Utils.request(`/${subdomain}/Twitter/postTweet`, "post", {
					tweet,
					img,
				}),
			verifyBySummonerName: async (query) =>
				await Utils.request(
					`/${subdomain}/RIOT/verifyBySummonerName?name=${query}`,
					"get"
				),
			verifyBySummonerId: async (query) =>
				await Utils.request(
					`/${subdomain}/RIOT/verifyBySummonerId?id=${query}`,
					"get"
				),
			updateUser: async (body) =>
				await Utils.request(`/${subdomain}/Account/updateUser`, "put", body),
			getUsers: async (query) =>
				await Utils.request(
					`/${subdomain}/Oracle/getUsers${
						query ? `?query=${JSON.stringify(query)}` : ""
					}`,
					"get"
				),
			getApplications: async (category) =>
				await Utils.request(
					`/${subdomain}/Applications/getApplications?category=${category}`,
					"get",
					null
				),
			setOBSStreamlabs: async (_) =>
				await Utils.request(
					`/${subdomain}/OBS/${_ ? "startOBS" : "exitOBS"}`,
					"post",
					null
				),
			queryOBSStreamlabs: async () =>
				await Utils.request(`/${subdomain}/OBS/queryOBSStatus`, "get", null),
			postArticle: async (article) =>
				await Utils.request(
					`/${subdomain}/Article/postArticle`,
					"post",
					article
				),
			updateArticle: async (article) =>
				await Utils.request(
					`/${subdomain}/Article/updateArticle`,
					"put",
					article
				),
			publishArticle: async (article) =>
				await Utils.request(
					`/${subdomain}/Article/publishArticle`,
					"put",
					article
				),
			getArticles: async (id) =>
				await Utils.request(
					`/${subdomain}/Article/getArticles${id ? `?id=${id}` : ""}`,
					"get",
					null
				),
			getTeamLogos: async (id) =>
				await Utils.request(`/admin/Oracle/getTeamLogos`, "get", null),
			getUploads: async (id) =>
				await Utils.request(`/admin/Oracle/getUploads`, "get", null),
			deleteArticle: async (id) =>
				await Utils.request(`/${subdomain}/Article/deleteArticle`, "delete", {
					id,
				}),
			deleteApplication: async (id) =>
				await Utils.request(
					`/${subdomain}/Applications/deleteApplication`,
					"delete",
					{ id }
				),
		},
	};
	return actions;
};
