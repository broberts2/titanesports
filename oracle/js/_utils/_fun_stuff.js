const Lexicon = require("./_lexicon");

const _ = msg => fn => lexicon => {
  const obj = fn(msg)(
    lexicon[Math.floor(Math.random() * Object.keys(lexicon).length)]
  );
  for (let key in obj.triggers) {
    if (obj.triggers[key]) {
      return { valid: true, response: obj.response };
    }
  }
  return { valid: false };
};

const Constructs = {
  0: msg => _(msg)(require("./triggers/greetings"))(Lexicon.greetings)
};

module.exports = msg => {
  msg = msg.toLowerCase();
  for (let key in Constructs) {
    const _res = Constructs[key](msg);
    if (_res.valid) {
      return _res.response;
    }
  }
  return Lexicon.default[
    Math.floor(Math.random() * Object.keys(Lexicon.default).length)
  ];
};
