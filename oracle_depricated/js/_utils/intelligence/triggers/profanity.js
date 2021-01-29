module.exports = msg => response => ({
  response,
  triggers: {
    0: msg.includes("fuck"),
    1: msg.includes("shit")
  }
});
