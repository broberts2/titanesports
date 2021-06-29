const TitanDraft = require("../titandraft/index");
const OBS = require("../controllers/admin/OBS");
const _ = (shake) => (shake ? shake.split("//")[1].split(".")[0] : "OBS");

module.exports = (io, app) => {
	io.on("connection", (socket) => {
		socket.on("join", async (msg) => {
			switch (_(socket.handshake.headers.origin)) {
				case "titandraft":
					return TitanDraft(io, socket, msg.lobby, msg.token);
				case "OBS":
					return OBS(msg, io, socket, app);
			}
		});
	});
};
