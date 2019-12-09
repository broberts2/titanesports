const Events = require("../models/event");
const config = require("../config");
const fetch = require("node-fetch");
const moment = require("moment");

const parseDate = date => {
  return moment(date)
    .format("MMM Do, YYYY")
    .toString();
};

module.exports = {
  createEvent: async (req, level) => {
    if (!(req.user_info.level > level)) {
      try {
        let events = await Events.create({
          date: parseDate(req.body.date),
          events: req.body.events,
          title: req.body.title,
          icon: req.body.icon
        });
        events.code = 200;
        events.msg = "Event Creation Successful!";
        return events;
      } catch (e) {
        console.log(e);
        return {
          code: 501,
          msg: "Event Creation Failed."
        };
      }
    } else {
      return {
        code: 403,
        msg: "Access Denied."
      };
    }
  },
  getEvents: async req => {
    try {
      const events = await Events.find({});
      return {
        events,
        code: 200,
        msg: "Event Get Successful!"
      };
    } catch (e) {
      return {
        code: 501,
        msg: "Event Get Failed."
      };
    }
  },
  updateEvent: async (req, level) => {
    if (!(req.user_info.level > level)) {
      try {
        const events = await Events.update({ date: req.body.date }, req.body);
        events.code = 200;
        events.msg = "Event Update Successful!";
        return events;
      } catch (e) {
        console.log(e);
        return {
          code: 501,
          msg: "Event Update Failed."
        };
      }
    } else {
      return {
        code: 403,
        msg: "Access Denied."
      };
    }
  },
  removeEvent: async (req, level) => {
    if (!(req.user_info.level > level)) {
      try {
        const events = await Events.remove({ date: req.body.date });
        events.code = 200;
        events.msg = "Event Removal Successful!";
        return events;
      } catch (e) {
        return {
          code: 501,
          msg: "Event Removal Failed."
        };
      }
    } else {
      return {
        code: 403,
        msg: "Access Denied."
      };
    }
  }
};
