const _embed = require("./js/_embed");
const _Colors = require("./js/_colors");
const _Response = require("./js/_response");
const _fun_stuff = require("./js/_utils/_fun_stuff");

const _rolescheck = (ar1, ar2) => {
  if (ar1.length > 0) {
    for (let i = 0; i < ar1.length; i++) {
      for (let j = 0; j < ar2.length; j++) {
        if (ar1[i] === ar2[j]) return true;
      }
    }
    return false;
  }
  return true;
};

const _parse = (msg, client, roles) => {
  if (msg.content.charAt(0) === "!" || msg.content.charAt(0) === "?") {
    const Commands = require("./js/_commands")(client, roles);
    msg._type = msg.content.charAt(0) === "!" ? "exec" : "help";
    let command = msg.content
      .split(" ")
      .shift()
      .slice(1, msg.content.length);
    let description;
    let status;
    if (Commands[`${command}`]) {
      if (_rolescheck(Object.values(Commands[`${command}`].roles), roles)) {
        if (msg._type === "exec") {
          description = Commands[`${command}`].exec(msg);
          status =
            typeof description === "object"
              ? _Colors[2]
              : _Colors[Commands[`${command}`].status];
        } else {
          description = Commands[`${command}`].help;
          status = _Colors[0];
        }
      } else {
        description = _Response.access_denied(command);
        status = _Colors[2];
      }
    } else {
      description = _Response.bad_request(command);
      status = _Colors[2];
    }
    return _embed({
      description,
      status
    });
  } else {
    return _embed({
      description: _fun_stuff(msg.content),
      status: _Colors[0]
    });
  }
};

module.exports = (msg, client, roles) => _parse(msg, client, roles);
