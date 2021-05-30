const Article = require("../../controllers/Article");
const Guard = require("../../guard");

module.exports = (app, subdomain, pretext) => {
	app.post(`/${subdomain}/${pretext}/createArticle`, async (req, res) => {
		const result = await Guard(req, "createArticles", Article.createArticle);
		res.json(result);
	});
	app.put(`/${subdomain}/${pretext}/updateArticle`, async (req, res) => {
		const result = await Guard(req, "editArticles", Article.updateArticle);
		res.json(result);
	});
	app.put(`/${subdomain}/${pretext}/publishArticle`, async (req, res) => {
		const result = await Guard(req, "publishArticles", Article.publishArticle);
		res.json(result);
	});
	app.get(`/${subdomain}/${pretext}/getArticles`, async (req, res) => {
		const result = await Article.getArticles(req);
		res.json(result);
	});
	app.delete(`/${subdomain}/${pretext}/deleteArticle`, async (req, res) => {
		const result = await Guard(req, "deleteArticles", Article.deleteArticle);
		res.json(result);
	});
};
