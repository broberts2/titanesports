module.exports = async (cb, res, accessLevel, exact) => {
  console.log("Shalom!");
  const report = typeof cb === "function" ? await cb() : await cb;
  res.json(report);
};
