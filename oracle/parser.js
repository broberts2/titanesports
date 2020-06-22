const _embed = require("./js/_embed");
const _Colors = require("./js/_colors");
const _Response = require("./js/_response");
const _fun_stuff = require("./js/_utils/intelligence/_fun_stuff");
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

const _shortenDescription = (description, status, arr = []) => {
  const mod = 2048;
  description = description.replace(/\n/gm, "\r\n");
  if (description.length > mod) {
    let index = description.length - mod;
    while (description.charAt(index++) !== "\n");
    const _split = description.split(index);
    arr.push(_split[1]);
    return _shortenDescription(_split[0], status, arr);
  } else {
    if (arr.length > 0) {
      return arr
        .filter((el) => el)
        .map((el) =>
          _embed({
            description: el.replace(/\r/g, ""),
            status,
          })
        );
    } else {
      return [
        _embed({
          description: description.replace(/\r/g, ""),
          status,
        }),
      ];
    }
  }
};

const _parse = async (msg, client, roles) => {
  msg.content = msg.content
    .replace("<@!711694390078341171>", "")
    .replace("<@&711712219758592071>", "")
    .trim();
  const command = _parse_commands(msg);
  if (command.type === "exec" || command.type === "help") {
    const Commands = require("./js/_commands")(client, roles);
    let description;
    let status;
    if (Commands[`${command.command}`]) {
      const _rolesCheck = _rolescheck(
        Commands[`${command.command}`].roles.standard.concat(
          Commands[`${command.command}`].roles.special
        ),
        roles
      );
      if (_rolesCheck) {
        if (command.type === "exec") {
          description = await Commands[`${command.command}`].exec(
            command,
            (() => {
              switch (_rolesCheck) {
                case "562850378727817236":
                  return {
                    document: Gladiator,
                    // director: "84349569869021184"
                    director: "286390645130657792",
                  };
                case "631972855218700301":
                  return {
                    document: Olympian,
                    // director: "234798192795975681"
                    director: "286390645130657792",
                  };
                default:
                  return {
                    document:
                      command.args[command.args.length - 1] === "gladiator"
                        ? Gladiator
                        : command.args[command.args.length - 1] === "olympian"
                        ? Olympian
                        : null,
                  };
              }
            })(),
            Commands[`${command.command}`].roles.special
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
    return _shortenDescription(description, status);
  } else {
    return [
      _embed({
        description: _fun_stuff(msg.content),
        status: _Colors[0],
      }),
    ];
  }
};

module.exports = (msg, client, roles) => _parse(msg, client, roles);
