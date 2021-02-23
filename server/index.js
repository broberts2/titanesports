const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const app = express();
const callback = express();
const cors = require("cors");
const routes = require("./routes");
const socket = require("./socket-io/socket-io");
const fs = require("fs");
const db_connector = require("./db_util");
const config = require("./config");
db_connector();

app.use(bodyParser.json());
callback.use(bodyParser.json());

app.use("/static", express.static(path.join(__dirname, "../media")));
app.use(
	"/dragontail",
	express.static(path.join(__dirname, `../dragontail-${config.gameVersion}`))
);

app.use(cors());
callback.use(cors());

// if (config.production) {
//   app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   });
// }

routes(app, callback);

let server = null;
let serverCallback = null;
if (config.production) {
	const key = fs.readFileSync(
		"/etc/letsencrypt/live/titan-esports.org/privkey.pem",
		"utf8"
	);
	const cert = fs.readFileSync(
		"/etc/letsencrypt/live/titan-esports.org/cert.pem",
		"utf8"
	);
	server = require("https").createServer({ key, cert }, app);
	serverCallback = require("https").createServer({ key, cert }, callback);
} else {
	server = require("http").createServer(app);
	serverCallback = require("http").createServer(callback);
}

socket(require("socket.io")(server));

serverCallback.listen(config.production ? 443 : 80);
server.listen(config.port, () =>
	console.log(
		`--------------------------------------------------------------` +
			`\n\t\tTitan eSports listening on port ${
				config.port
			}\n\t\tCallback listening on port ${
				config.production ? 443 : 80
			} with route '/RIOT/callback'\n` +
			`--------------------------------------------------------------`
	)
);
