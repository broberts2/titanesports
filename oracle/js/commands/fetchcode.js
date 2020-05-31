const fetch = require("node-fetch");
const webserver = require("../../config").webserver;
const titan_key = require("../../config").titan_key;

module.exports = (client, roles) => ({
  exec: async (command) => {
    if (command.args.length === 1) {
      const res = await fetch(
        `${webserver}/s/getGameStatsByCode?code=${command.args[0]}`,
        {
          method: "GET",
          headers: {
            titan_key,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ).then((_res) => _res.json());
      delete res.data;
      console.log(res);
      return `Code fetch successful!\n\n${res}`;
    } else {
      return new Error(
        "Hmm, I wasn't able to parse your arguments. You should probably get with a staff member for help or use:\n```?createcodes```"
      );
    }
  },
  help:
    "!createcodes - Creates a set of riot api game codes.\n\n```!createcodes <team_1> <team_2> <week_num> <season_num> <league> <series_size>```\nValid inputs:\nTeam 1: <team_name>\nTeam 2: <team_name>\nWeek Num: <number>\nSeason Num: <number>\nLeague: gladiator, olympian\nSeries Size (optional): 1, 2, 3, 4, 5, 6, 7",
  roles: { id: "407684891069906974", id1: "664717783971397642" },
  status: 0,
});
