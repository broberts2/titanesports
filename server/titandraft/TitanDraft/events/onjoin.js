module.exports = async (util) => {
	try {
		util.document = await util.TitanDraft.findOne({ _id: util.lobby });
		if (util.document) {
			util.socket.join(util.lobby);
			util.socket.emit("validate", {
				draft: util.document,
				access:
					util.token === util.document.bluetoken
						? "blueteam"
						: util.token === util.document.redtoken
						? "redteam"
						: "spectator",
			});
			util.actions.whisper(util);
			util.actions.sendchampiondata(util);
			util.events.banchampion(util);
			util.events.readycheck(util);
			util.actions.sendnextaction(util, "whisper");
			if (util.document.history) {
				util.actions.sendchampiondata(
					util,
					util.document.history[Object.keys(util.document.history).length - 1]
						.data
				);
			}
			//util.actions.startinstance(util);
		} else {
			util.socket.emit("validate", { access: "noexist" });
		}
	} catch (e) {
		console.log(e);
		util.socket.emit("validate", { access: "noexist" });
	}
};
