const express = require("express");
const app = express();
const config = require("./config");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || config.port;
const path = require("path");
const http = config.production ? require("https") : require("http");
const fs = require("fs");
const security = express.Router();
const protected = require("./protected").protected;
const cors = require("cors");
const db_connector = require("./db_util");
const routes = require("./routes");
db_connector();

app.use(bodyParser.json());

app.use(cors({ origin: true, credentials: true }));
security.use(cors({ origin: true, credentials: true }));

app.use("/s", security);
security.use(protected);

routes(app, security);

app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"));

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
  server = http.createServer({ key, cert }, app);
} else {
  server = http.createServer(app);
}

server.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
