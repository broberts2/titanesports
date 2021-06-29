const config = require("../../config");

module.exports = async (exec, socket) => {
	socket.emit("shalom");
	console.log(`Connected to ${config.endpoint}`);
};
