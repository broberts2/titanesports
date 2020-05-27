module.exports = msg => {
  if (msg.content.charAt(0) === "!" || msg.content.charAt(0) === "?") {
    let args = msg.content.replace(/\n/g, "").split(" ");
    const command = args
      .shift()
      .replace("!", "")
      .replace("?", "");
    if (args[0]) args[0] = args[0].replace(/\+/g, " ");
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
