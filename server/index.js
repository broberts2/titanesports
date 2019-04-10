const express = require("express");
const app = express();
const config = require("./config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(config.db);
const PORT = process.env.PORT || config.port;
const path = require("path");
const protected = require("./controllers/protected").protected;
const routifyPromise = require("./controllers/util").routifyPromise;
const security = express.Router();

const { createUser } = require("./controllers/userHandling");
const ChampionMastery = require("./controllers/riot_api/CHAMPION-MASTERY-V4");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", security);
security.use(protected);

security.get("/test", (req, res) => res.json("shalom"));
security.get(
  "/summoner_total_mastery",
  routifyPromise(ChampionMastery.summonerTotalMastery)
);
security.post("/user", routifyPromise(createUser));

app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
