const fetch = require("node-fetch");
const config = require("./config");

module.exports = async (req, action, cb) => {
    const canAccess = await fetch(`${config.endpoint}/Oracle/auth_action?token=${req.headers.token}&action=${action}`).then(res => res.json());
    return canAccess ? await cb(req) : "Unauthorized.";
}