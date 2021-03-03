const fs = require("fs");
const config = require("../config");
const path = require("path");

const _PATH_ = (item) =>
	require(path.join(
		__dirname,
		`../../dragontail-${config.gameVersion}/${config.gameVersion}/data/en_US/${item}.json`
	));

const CHAMPIONS = _PATH_("champion");
const ITEMS = _PATH_("item");

module.exports = (app, pretext) => {
	app.get(`/${pretext}/getChampionDataById`, async (req, res) => {
		const _ = Object.values(CHAMPIONS.data);
		for (let i = 0; i < _.length; i++) {
			if (req.query.id === _[i].key) {
				res.json(_[i]);
				return;
			}
		}
		res.json("Unable to Find Champion by That ID.");
	});
	app.get(`/${pretext}/getChampionData`, async (req, res) => {
		res.json(CHAMPIONS.data);
	});
	app.get(`/${pretext}/getItemDataById`, async (req, res) => {
		const _ = Object.values(ITEMS.data);
		for (let i = 0; i < _.length; i++) {
			if (req.query.id === _[i].key) {
				res.json(_[i]);
				return;
			}
		}
		res.json("Unable to Find Champion by That ID.");
	});
	app.get(`/${pretext}/getItemData`, async (req, res) => {
		res.json(ITEMS.data);
	});
};
