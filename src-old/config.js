module.exports = {
  serverPath: process.env.production
    ? "https://titan-esports.org:8000"
    : "http://localhost:8000",
  tPath: process.env.production
    ? "https://titan-esports.org:7001"
    : "http://localhost:7001"
};
