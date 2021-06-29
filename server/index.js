const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const app = express();
const riot = express();
const cors = require("cors");
const routes = require("./routes");
const socket = require("./socket-io/socket-io");
const fs = require("fs");
const { exec } = require("child_process");
const db_connector = require("./db_util");
const config = require("./config");
db_connector();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 50000,
	})
);
riot.use(bodyParser.json());

app.use("/static", express.static(path.join(__dirname, "../static")));
app.use(
	"/dragontail",
	express.static(path.join(__dirname, `../dragontail-${config.gameVersion}`))
);

app.use(cors());
riot.use(cors());

// if (config.production) {
//   app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   });
// }

app.post(`/gitHook`, async (req, res) => {
	// exec(`cd /titanesports/tesgiga; git pull origin master;`, () => {
	//   console.log("Git pull successful.");
	//   exec(`cd /titanesports/tesgiga; npm install;`, () => {
	//     console.log("Npm install successful.");
	//     exec(
	//       `cd /titanesports/tesgiga; rm -rf /var/www/html/build; rm -rf /titanesports/tesgiga/build; NODE_OPTIONS=--max_old_space_size=128 npm run build; mv build /var/www/html; rm -rf build`,
	//       () => {
	//         console.log("Npm build successful.");
	//         res.json("Auto-deploy successful!");
	//       }
	//     );
	//   });
	// });
	res.json("Auto-deploy successful!");
});

let server = null;
let riotCb = (server = require("http").createServer(riot));
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
} else {
	server = require("http").createServer(app);
}

routes(app, riot);

socket(
	require("socket.io")(server, {
		cors: {
			origin: "*",
		},
	}),
	app
);

riotCb.listen(config.port + 1);
server.listen(config.port, () =>
	console.log(
		`--------------------------------------------------------------` +
			`\n\t\tTitan eSports listening on port ${config.port}\n` +
			`--------------------------------------------------------------`
	)
);
