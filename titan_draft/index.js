const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const config = require("./config");
const cors = require("cors");
const routes = require("./routes");

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

app.listen(config.port);
