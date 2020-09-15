const ROUTES = {};

module.exports = (app) => Object.values(ROUTES).map((el) => el(app));
