module.exports = msg => response => ({
  response,
  triggers: {
    0: msg.includes("hello"),
    1: msg.includes("hi"),
    2: msg.includes("hey")
  }
});
