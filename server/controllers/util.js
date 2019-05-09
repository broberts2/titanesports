const restrict = require("./restrict");
const timeout = require("./timeout");

module.exports = {
  routifyPromise: (level, promiseFn) => {
    return (req, res) => {
      timeout(
        restrict(level, req.user_info.level, promiseFn(req, res))
          .then(result => res.json(JSON.parse(result)))
          .catch(error =>
            res.status(500).json({
              error: error.message
            })
          )
      );
    };
  },
  routifyPromiseStandard: (level, promiseFn) => {
    return (req, res) => {
      timeout(
        restrict(level, req.user_info.level, promiseFn(req, res))
          .then(result => res.json(result))
          .catch(error =>
            res.status(500).json({
              error: error.message
            })
          )
      );
    };
  },
  routifyPromiseNoRestrict: promiseFn => {
    return (req, res) => {
      timeout(
        promiseFn(req, res)
          .then(result => res.json(result))
          .catch(error =>
            res.status(500).json({
              error: error.message
            })
          )
      );
    };
  }
};
