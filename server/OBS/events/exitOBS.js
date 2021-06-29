const _ = require("../_utils");

module.exports = async (exec, socket) => {
	const _utils = _(exec);
	const running = await _utils.isRunning();
	if (running) {
		exec(`taskkill /im "Streamlabs OBS.exe"`, (error, stderr, stdout) => {
			if (error) {
				console.log(stderr);
				socket.emit("error", stderr);
			}
		});
	}
	setTimeout(() => socket.emit("success"), 6000);
};
