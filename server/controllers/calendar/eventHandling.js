const { google } = require("googleapis");
const moment = require("moment-timezone");
const util = require("./util").util;

module.exports = {
  getEvents: async (req, res) => {
    const events = await util(
      auth =>
        new Promise((resolve, reject) => {
          const calendar = google.calendar({ version: "v3", auth });
          calendar.events.list(
            {
              calendarId: "primary",
              maxResults: 100,
              singleEvents: true,
              orderBy: "startTime"
            },
            (err, res) => {
              if (err) return console.log("The API returned an error: " + err);
              let events = res.data.items;
              events = events.map(el => {
                let start = el.start.dateTime.split("T");
                start = start[0] + "T" + start[1].split("-")[0];
                let end = el.end.dateTime.split("T");
                end = end[0] + "T" + end[1].split("-")[0];
                let description = {
                  imgURL: "",
                  description: ""
                };
                try {
                  description = JSON.parse(el.description);
                } catch (e) {
                  console.log(el.summary, e);
                }
                return {
                  title: el.summary,
                  imgURL: description.imgURL,
                  start,
                  end,
                  description: description.text
                };
              });
              resolve(events);
            }
          );
        })
    );
    return events;
  }
};
