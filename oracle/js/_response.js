module.exports = {
  bad_request: msg =>
    `'${msg}' is not a valid command. Type ?help for a full list of commands.`,
  access_denied: msg =>
    `You do not have the necessary role(s) to run this command.`
};
