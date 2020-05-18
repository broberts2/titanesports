const Lexicon = require("./_lexicon");

module.exports = msg => {
  console.log(msg.toLowerCase());
  switch (msg.toLowerCase()) {
    case msg.includes("hello") || msg.includes("hi") || msg.includes("hey"):
      return Lexicon.greeting;
    default:
      return Lexicon.default;
  }
};
