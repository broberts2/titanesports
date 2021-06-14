const Applications = require("../../models/Applications");
const Oracle = require("./Oracle");

module.exports = {
  post: async (req) => {
    const res = await Applications.create({
      JSON: req.body.JSON,
      origin: req.body.origin,
      category: req.body.category,
    });
    await Oracle.OracleUtils.SendMessage({
      channel: "853821461285044224",
      message: `A new form in '${req.body.category}' was submitted.`,
    });
    return res;
  },
  get: async (req) => await Applications.find({ category: req.query.category }),
  delete: async (req) => await Applications.remove({ _id: req.body.id }),
};
