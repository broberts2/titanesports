module.exports = msg => {
  if (msg.content.charAt(0) === "!" || msg.content.charAt(0) === "?") {
    let args = msg.content.split(" ");
    const command = args
      .shift()
      .replace("!", "")
      .replace("?", "");
    args[0] = args[0].replace(/\+/g, " ");
    console.log(args);
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
