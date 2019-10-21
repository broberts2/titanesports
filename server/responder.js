const sanitize = report => {
  switch (report.code) {
    case 11000:
      report.msg = "That user already exists.";
      return report;
    case 11100:
      report.msg = "User not found.";
      return report;
    default:
      return report;
  }
};

module.exports = async (cb, res) => {
  let report = typeof cb === "function" ? await cb() : await cb;
  report = sanitize(report);
  res.json({
    id: report.id,
    user: report.user,
    code: report.code,
    msg: report.msg || report.errmsg,
    token: report.token,
    username: report.u
  });
};
