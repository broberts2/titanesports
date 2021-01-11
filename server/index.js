const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const socket = require("./socket-io/socket-io");
const fs = require("fs");
const db_connector = require("./db_util");
const config = require("./config");
const security = express.Router();
const protected = require("./protected").protected;
db_connector();

app.use(bodyParser.json());

app.use("/static", express.static(path.join(__dirname, "../media")));
app.use(
  "/dragontail",
  express.static(path.join(__dirname, `../dragontail-${config.gameVersion}`))
);

app.use(cors());

app.use("/s", security);
security.use(cors());
security.use(protected);

if (config.production) {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

routes(app, security);

let server = null;
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

server.listen(config.port, () =>
  console.log(
    `--------------------------------------------------------------` +
      `\n\t\tTitan eSports listening on port ${config.port}\n` +
      `--------------------------------------------------------------`
  )
);

socket(require("socket.io")(server));
