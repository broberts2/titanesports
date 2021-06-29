const config = require("../../config");

module.exports = async (exec, socket) => {
	console.log(`Connected to ${config.endpoint}`);
};
