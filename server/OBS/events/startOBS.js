const _ = require("../_utils");

module.exports = async (exec, socket) => {
	const _utils = _(exec);
	const running = await _utils.isRunning();
	_utils.focus();
	setTimeout(() => socket.emit("success"), 6000);
};
