module.exports = {
  db:
    process.env.MONGODB_URI ||
    "mongodb+srv://admin:titanesports@titanesports-jhare.mongodb.net/test?retryWrites=true"
};
