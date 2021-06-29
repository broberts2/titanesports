module.exports = (exec) => {
	const OBJ = {
		sendKey: async (key) => {
			await OBJ.focus();
			await new Promise((resolve) => {
				exec(`start "" "sendkey.ahk" ${key}`, (error, stderr, stdout) => {
					if (error) {
						socket.emit("error", error);
						resolve(false);
					}
					resolve(true);
				});
			});
		},
		isRunning: async () => {
			const result = await new Promise((resolve) =>
				exec(
					`tasklist /fi "ImageName eq Streamlabs OBS.exe" /fo csv 2>NUL | find /I "Streamlabs OBS.exe">NUL`,
					(error, stderr, stdout) => {
						if (error) {
							resolve(false);
						}
						resolve(true);
					}
				)
			);
			return result;
		},
		focus: async () =>
			await new Promise((resolve) => {
				exec(
					`start "" "C:\\Program Files\\Streamlabs OBS\\Streamlabs OBS.exe"`
				);
				setTimeout(() => resolve(true), 1000);
			}),
	};
	return OBJ;
};
