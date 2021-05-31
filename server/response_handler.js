module.exports = async (cb, req, res) => {
	try {
		const result = await cb(req);
		res.json({
			code: 200,
			result,
		});
	} catch (result) {
		res.json({
			code: 500,
			result,
		});
	}
};