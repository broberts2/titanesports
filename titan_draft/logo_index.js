const config = require("../server/config");
const server = config.production
  ? "https://titan-esports.org:7001"
  : "http://localhost:7001";

module.exports = {
  ["Today the Plan Is Simple"]: {
    0: `${server}/Today_the_Plan_is_Simple.png`,
    1: `${server}/Today_the_Plan_is_Simple.png`,
  },
  ["Rat Pack Gaming"]: {
    0: `${server}/Rat_Pack_Gaming_Logo.png`,
    1: `${server}/Rat_Pack_Gaming_Logo.png`,
  },
  ["Reign New"]: {
    0: `${server}/reignnew.png`,
    1: `${server}/reignnew.png`,
  },
  ["Syndicate E-Sports"]: {
    0: `${server}/SYN.png`,
    1: `${server}/SYN.png`,
  },
  Unknown: {
    0: `${server}/unkown.png`,
    1: `${server}/unkown.png`,
  },
  ["4k Yeah OK"]: {
    0: `${server}/yeahok.png`,
    1: `${server}/yeahok.png`,
  },
  SK2: {
    0: `${server}/SK2.png`,
    1: `${server}/SK2.png`,
  },
  ["Glacial Sherbert"]: {
    0: `${server}/GlacialSherbertLogo.png`,
    1: `${server}/GlacialSherbertLogo.png`,
  },
  ["Lighthouse Ravens"]: {
    0: `${server}/lighthouse_ravens.png`,
    1: `${server}/lighthouse_ravens.png`,
  },
  NFG: {
    0: `${server}/nfg.png`,
    1: `${server}/nfg.png`,
  },
  ["Noble Concern"]: {
    0: `${server}/noble_concern.png`,
    1: `${server}/noble_concern.png`,
  },
  ["Rainbow Kittenz"]: {
    0: `${server}/rainbow_kittenz.png`,
    1: `${server}/rainbow_kittenz.png`,
  },
  ["Rawr"]: {
    0: `${server}/rawr.png`,
    1: `${server}/rawr.png`,
  },
  ["Death By the Thighs"]: {
    0: `${server}/dbth.png`,
    1: `${server}/dbth.png`,
  },
  ["Fried Chicken"]: {
    0: `${server}/fried_chicken.png`,
    1: `${server}/fried_chicken.png`,
  },
  ["Glacial Rising Phoenix"]: {
    0: `${server}/glacial.png`,
    1: `${server}/glacial.png`,
  },
  ["Glacial Equinox"]: {
    0: `${server}/glacial_equ.png`,
    1: `${server}/glacial_equ.png`,
  },
  ["Anonymous Ruby"]: {
    0: `${server}/ruby.png`,
    1: `${server}/ruby.png`,
  },
  ["Kind Young Ninjas"]: {
    0: `${server}/kyn.png`,
    1: `${server}/kyn.png`,
  },
  ["Abusement Park"]: {
    0: `${server}/apark.png`,
    1: `${server}/apark.png`,
  },
  ["Cancer and Friends"]: {
    0: `${server}/caf.png`,
    1: `${server}/caf.png`,
  },
  Chaos: {
    0: `${server}/chaos.png`,
    1: `${server}/chaos.png`,
  },
  ["Deadly Robots"]: {
    0: `${server}/deadly_robots.png`,
    1: `${server}/deadly_robots.png`,
  },
};
