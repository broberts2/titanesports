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
    getApplications: async (category) =>
      await Utils.request(
        `/${subdomain}/Applications/getApplications?category=${category}`,
        "get",
        null
      ),
    postArticle: async (article) =>
      await Utils.request(`/${subdomain}/Article/postArticle`, "post", article),
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
    deleteApplication: async (id) =>
      await Utils.request(
        `/${subdomain}/Applications/deleteApplication`,
        "delete",
        { id }
      ),
  },
});
