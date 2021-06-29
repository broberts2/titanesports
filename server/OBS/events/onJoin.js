const _ = require("../_utils");

module.exports = async (exec, socket) => {
	const _utils = _(exec);
	const isRunning = await _utils.isRunning();
	return {
		isRunning,
	};
};
