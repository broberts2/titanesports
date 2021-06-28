import React from "react";
import _ from "../_helpercomponent";
import Components from "components/index";

export default {
  elements: {
    blueteam: {
      in: {
        anim: "Grow",
        timeout: 800,
        direction: "right",
        transitionDelay: 200,
      },
      out: {
        anim: "Grow",
        timeout: 100,
        direction: "right",
      },
    },
    redteam: {
      in: {
        anim: "Grow",
        timeout: 800,
        direction: "right",
        transitionDelay: 400,
      },
      out: {
        anim: "Grow",
        timeout: 100,
        direction: "right",
      },
    },
    readybutton: {
      in: {
        anim: "Fade",
        timeout: 800,
        transitionDelay: 800,
      },
      out: {
        anim: "Grow",
        timeout: 100,
        direction: "right",
      },
    },
    vs: {
      in: {
        anim: "Fade",
        timeout: 800,
        transitionDelay: 800,
      },
      out: {
        anim: "Grow",
        timeout: 100,
        direction: "right",
      },
    },
    crown: {
      in: {
        anim: "Fade",
        timeout: 800,
        transitionDelay: 800,
      },
      out: {
        anim: "Grow",
        timeout: 100,
        direction: "right",
      },
    },
    blueready: {
      in: {
        anim: "Fade",
        timeout: 800,
        transitionDelay: 800,
      },
      out: {
        anim: "Grow",
        timeout: 100,
        direction: "right",
      },
    },
    redready: {
      in: {
        anim: "Fade",
        timeout: 800,
        transitionDelay: 800,
      },
      out: {
        anim: "Grow",
        timeout: 100,
        direction: "right",
      },
    },
  },
  Component: _.Component,
};
