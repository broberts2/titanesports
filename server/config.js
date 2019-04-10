module.exports = {
  db:
    process.env.MONGODB_URI ||
    "mongodb+srv://admin:titanesports@titanesports-jhare.mongodb.net/test?retryWrites=true",
  riotURL: "https://na1.api.riotgames.com",
  apiKey: "RGAPI-e37c8eba-f76b-46d0-bed5-12c1f14d1574",
  secret: "megaultrasuperdupertitansecretkey",
  port: 5000
};
