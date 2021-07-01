const Team = require("../../models/Team");
const Oracle = require("../admin/Oracle");

// Oracle.createRole({
//   body: {
//     name: "Test Team 1",
//     color: "RED",
//   },
// });

// Oracle.deleteRole({
//   body: {
//     id: "859995069757915166",
//   },
// });

// Oracle.editRole({
//   body: {
// 		id: "859995069757915166",
//     name: "Test Team 4",
//   },
// });

// Oracle.assignRole({
//   body: { userId: "84522855248691200", roleId: "859995069757915166" },
// });

// Oracle.unassignRole({
//   body: { userId: "84522855248691200", roleId: "859995069757915166" },
// });

module.exports = {
  createTeam: async (req) => {
    const roleId = await Oracle.createRole({
      body: {
        name: req.body.name,
        color: req.body.league === "Divinity League" ? "YELLOW" : "RED",
      },
    }).then((role) => role.id);
    req.body.roster.map((userId) =>
      Oracle.assignRole({
        body: { userId, roleId },
      })
    );
    return await Team.create(Object.assign(req.body, { roleId }));
  },
  getTeams: async (req) =>
    await Team.find(
      req.query && req.query.query
        ? typeof req.query.query === "string"
          ? JSON.parse(req.query.query)
          : req.query.query
        : {}
    ),
  updateTeam: async (req) => {
    await Team.updateOne({ _id: req.body._id }, req.body);
  },
  deleteTeam: async (req) => {
    await Team.remove({ _id: req.body._id });
  },
};
