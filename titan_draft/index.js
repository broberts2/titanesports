const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const app = express();
const config = require("./config");
const serverFig = require("../server/config");
const cors = require("cors");
const routes = require("./routes");
const socket = require("./io");
const db_connector = require("./db_util");
db_connector();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "../champion-videos")));
app.use(express.static(path.join(__dirname, "../logos")));
app.use(express.static(path.join(__dirname, "../audio")));
app.use(express.static(`../dragontail-${config.currentVersion}`));

app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

routes(app);

let server = null;
if (serverFig.production) {
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

const io = require("socket.io")(server);

server.listen(config.port);

socket(io);
