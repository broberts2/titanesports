module.exports = (exec, socket) => ({
	onJoin: () => require("./onJoin")(exec, socket),
	startOBS: () => require("./startOBS")(exec, socket),
	exitOBS: () => require("./exitOBS")(exec, socket),
	queryOBSStatus: () => require("./queryOBSStatus")(exec, socket),
});
