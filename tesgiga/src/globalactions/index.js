import Utils from "./_utils";

export default (subdomain) => ({
	Utils: {
		loadResources: async (arr) => {
			return await Promise.all(
				arr.map((el) => new Promise((resolve) => el.onload(resolve(el))))
			);
		},
	},
	Requests: {
		getUser: async (loadingVarCb) =>
			await Utils.request(
				`/${subdomain}/Account/getUser`,
				"get",
				null,
				loadingVarCb
			),
	},
});
