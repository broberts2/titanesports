const _validate_ = (str) => {
  for (let i = 0, trigger = false; i < str.length; i++) {
    str.charAt(i) === '"' ? (trigger = !trigger) : null;
    if (!trigger && str.charAt(i) === " ") {
      str = str.substring(0, i) + "~~~!~~~" + str.substring(i + 1);
    }
  }
  return str.replace(/\+/g, " ").replace(/"/g, "").split("~~~!~~~");
};

module.exports = (msg) => {
  if (msg.content.charAt(0) === "!" || msg.content.charAt(0) === "?") {
    let args = _validate_(msg.content);
    const command = args.shift().replace("!", "").replace("?", "");
    return {
      type: msg.content.charAt(0) === "!" ? "exec" : "help",
      command,
      args,
      msg,
    };
  } else {
    return {
      type: "message",
      msg,
    };
  }
};
