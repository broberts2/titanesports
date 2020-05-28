module.exports = {
  bad_request: (msg) =>
    new Error(
      `'${msg}' is not a valid command. Type ?help for a full list of commands.`
    ),
  access_denied: (msg) =>
    new Error(`You do not have the necessary role(s) to run this command.`),
};
