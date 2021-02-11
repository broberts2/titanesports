const Oracle = require("./controllers/Oracle");

module.exports = async (req, action, cb) => {
    const canAccess = await Oracle.authAction({
        query: {
            token: req.headers.token,
            action
        }
    });
    return canAccess ? await cb(req) : "Unauthorized.";
}