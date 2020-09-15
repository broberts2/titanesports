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
db_connector();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

app.use(cors({ origin: true, credentials: true }));

// if (serverFig.production) {
//   app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   });
// }

routes(app);

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

const io = require("socket.io")(server);

server.listen(config.port, () =>
  console.log(
    `--------------------------------------------------------------` +
      `\n\t\tTitan eSports listening on port ${config.port}\n` +
      `--------------------------------------------------------------`
  )
);

socket(io);
