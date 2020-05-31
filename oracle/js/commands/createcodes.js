const fetch = require("node-fetch");
const webserver = require("../../config").webserver;
const titan_key = require("../../config").titan_key;

module.exports = (client, roles) => ({
  exec: async (command) => {
    const res = await fetch(
      `https://titan-esports.org:8000/s/createTournamentCode?team1=${command.args[0]}&team2=${command.args[1]}&weekNum=${command.args[2]}&seasonNum=${command.args[3]}&league=${command.args[4]}&n=${command.args[5]}`,
      {
        method: "GET",
        rejectUnauthorized: false,
        headers: {
          titan_key,
        },
      }
    ).then((_res) => _res.json());
  },
  help:
    "!createcodes - Creates a set of riot api game codes.\n\n```!createcodes <team_1> <team_2> <week_num> <season_num> <league> <series_size>```\nValid inputs:\nTeam 1: <team_name>\nTeam 2: <team_name>\nWeek Num: <number>\nSeason Num: <number>\nLeague: gladiator, olympian\nSeries Size (optional): 1, 2, 3, 4, 5, 6, 7",
  roles: { id: "407684891069906974" },
  status: 0,
});
