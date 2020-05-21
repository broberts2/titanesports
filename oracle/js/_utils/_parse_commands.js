module.exports = msg => {
  if (msg.content.charAt(0) === "!" || msg.content.charAt(0) === "?") {
    let args = msg.content.split(" ");
    args[1] = args[1].replace(/\+/g, " ");
    const command = args
      .shift()
      .replace("!", "")
      .replace("?", "");
    return {
      type: msg.content.charAt(0) === "!" ? "exec" : "help",
      command,
      args,
      msg
    };
  } else {
    return {
      type: "message",
      msg
    };
  }
};
