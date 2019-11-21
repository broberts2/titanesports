const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const config = require("./config");

app.use(express.static(`../dragontail-${config.currentVersion}`));
app.use(express.static("../profile_videos"));
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || config.port);
