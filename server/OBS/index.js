const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const { exec } = require("child_process");
const config = require("../config");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 50000,
	})
);

app.use(cors());

const server = require("http").createServer(app);

server.listen(config.port + 2, () =>
	console.log(
		`--------------------------------------------------------------` +
			`\n\t\tTitan eSports OBS listening on port ${config.port + 2}\n` +
			`--------------------------------------------------------------`
	)
);

const socket = require("socket.io-client")(config.endpoint);
const Events = require("./events/index")(exec, socket);
(async () => {
	const result = await Events.onJoin();
	socket.emit("join", result);
})();
socket.on("connect_error", (e) => console.log(e));
socket.on("connect", Events.connect);
socket.on("startOBS", Events.startOBS);
socket.on("exitOBS", Events.exitOBS);
socket.on("queryOBSStatus", Events.queryOBSStatus);
