const _embed = require("./js/_embed");
const _Colors = require("./js/_colors");
const _Response = require("./js/_response");
const _fun_stuff = require("./js/_utils/_fun_stuff");
const _parse_commands = require("./js/_utils/_parse_commands");
const { Gladiator, Olympian } = require("./js/spreadsheet");

const _rolescheck = (ar1, ar2) => {
  if (ar1.length > 0) {
    for (let i = 0; i < ar1.length; i++) {
      for (let j = 0; j < ar2.length; j++) {
        if (ar1[i] === ar2[j]) return ar1[i];
      }
    }
    return false;
  }
  return true;
};

const _parse = async (msg, client, roles) => {
  const command = _parse_commands(msg);
  if (command.type === "exec" || command.type === "help") {
    const Commands = require("./js/_commands")(client, roles);
    let description;
    let status;
    if (Commands[`${command.command}`]) {
      const _rolesCheck = _rolescheck(
        Object.values(Commands[`${command.command}`].roles),
        roles
      );
      if (typeof _rolesCheck) {
        if (command.type === "exec") {
          description = await Commands[`${command.command}`].exec(
            command,
            (() => {
              switch (_rolesCheck) {
                case "562850378727817236":
                  return {
                    document: Gladiator,
                    //director: "84349569869021184"
                    director: "286390645130657792"
                  };
                case "631972855218700301":
                  return {
                    document: Olympian,
                    // director: "234798192795975681"
                    director: "286390645130657792"
                  };
                default:
                  return null;
              }
            })()
          );
          status =
            typeof description === "object"
              ? _Colors[2]
              : _Colors[Commands[`${command.command}`].status];
        } else {
          description = Commands[`${command.command}`].help;
          status = _Colors[0];
        }
      } else {
        description = _Response.access_denied(command.command);
        status = _Colors[2];
      }
    } else {
      description = _Response.bad_request(command.command);
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
