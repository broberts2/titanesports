const Oracle = require("./controllers/admin/Oracle");

module.exports = async (req, action, cb) => {
  const token = req.headers.token;
  const canAccess = token
    ? await Oracle.authAction({
        query: {
          token,
          action,
        },
      })
    : null;
  return canAccess ? await cb(req) : "Unauthorized.";
};
