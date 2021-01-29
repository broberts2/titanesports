module.exports = msg => response => ({
  response,
  triggers: {
    0: msg.includes("robot"),
    1: msg.includes("machine")
  }
});
