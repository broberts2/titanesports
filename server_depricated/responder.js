module.exports = async (cb, res, accessLevel, exact) => {
  const report = typeof cb === "function" ? await cb() : await cb;
  res.json(report);
};
