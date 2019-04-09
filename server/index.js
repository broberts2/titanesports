const express = require("express");
const app = express();
const config = require("./config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(config.db);
const PORT = process.env.PORT || 5000;
const path = require("path");
const serverConfig = require("./config");
const protectionRoute = require("./controllers/protected").protectionRoute;
const routifyPromise = require("./controllers/util").routifyPromise;
var protectedRoute = express.Router();

const { createUser } = require("./controllers/userHandling");

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:<password>@titanesports-jhare.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.use("/prot", protectedRoute);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/test", (req, res) => res.json("shalom"));
app.post("/api/user", routifyPromise(createUser));

app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
