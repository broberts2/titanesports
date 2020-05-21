module.exports = msg => response => ({
  response,
  triggers: {
    0: msg.includes("bye"),
    1: msg.includes("goodbye"),
    2: msg.includes("good bye"),
    3: msg.includes("see you later"),
    4: msg.includes("see ya later"),
    5: msg.includes("good night")
  }
});
