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

module.exports = async (cb, res, accessLevel, exact) => {
  let report = typeof cb === "function" ? await cb() : await cb;
  report = sanitize(report);
  res.json({
    totalCount: report.totalCount,
    fileList: report.fileList,
    id: report.id,
    user: report.user,
    users: report.users,
    code: report.code,
    msg: report.msg || report.errmsg,
    token: report.token,
    username: report.u,
    teams: report.teams,
    l: report.l,
    videos: report.videos,
    events: report.events,
    articles: report.articles,
    article: report.article,
    logos: report.logos
  });
};
