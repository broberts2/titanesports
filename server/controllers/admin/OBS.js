const routes = require("../../routes/admin/OBS");
const { exec } = require("child_process");

module.exports = (msg, io, socket, app) => {
	console.log("OBS socket connected!");
	routes(app, "admin", "OBS", {
		startOBS: async () => {
			console.log("starting OBS");
			socket.emit("startOBS");
			return "success";
		},
		exitOBS: async () => {
			socket.emit("exitOBS");
			return "success";
		},
		queryOBSStatus: async () => {
			socket.emit("queryOBSStatus");
			const result = await new Promise((resolve) =>
				socket.on("queryOBSStatus", (status) => resolve(status))
			);
			return result;
		},
	});
};
