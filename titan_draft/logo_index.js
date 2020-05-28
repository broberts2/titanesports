const config = require("../server/config");
const server = config.production
  ? "https://titan-esports.org:7001"
  : "http://localhost:7001";

module.exports = {
  ttpis: {
    0: `${server}/Today_the_Plan_is_Simple.png`,
    1: `${server}/Today_the_Plan_is_Simple.png`,
  },
  rpg: {
    0: `${server}/Rat_Pack_Gaming_Logo.png`,
    1: `${server}/Rat_Pack_Gaming_Logo.png`,
  },
  rn: {
    0: `${server}/reignnew.png`,
    1: `${server}/reignnew.png`,
  },
  syn: {
    0: `${server}/SYN.png`,
    1: `${server}/SYN.png`,
  },
  unkown: {
    0: `${server}/unkown.png`,
    1: `${server}/unkown.png`,
  },
  yok: {
    0: `${server}/yeahok.png`,
    1: `${server}/yeahok.png`,
  },
  sk2: {
    0: `${server}/SK2.png`,
    1: `${server}/SK2.png`,
  },
  glacialsherbert: {
    0: `${server}/GlacialSherbertLogo.png`,
    1: `${server}/GlacialSherbertLogo.png`,
  },
  lh: {
    0: `${server}/lighthouse_ravens.png`,
    1: `${server}/lighthouse_ravens.png`,
  },
  nfg: {
    0: `${server}/nfg.png`,
    1: `${server}/nfg.png`,
  },
  nobleconcern: {
    0: `${server}/noble_concern.png`,
    1: `${server}/noble_concern.png`,
  },
  rainbowkittenz: {
    0: `${server}/rainbow_kittenz.png`,
    1: `${server}/rainbow_kittenz.png`,
  },
  rawr: {
    0: `${server}/rawr.png`,
    1: `${server}/rawr.png`,
  },
  dbth: {
    0: `${server}/dbth.png`,
    1: `${server}/dbth.png`,
  },
  friedchicken: {
    0: `${server}/fried_chicken.png`,
    1: `${server}/fried_chicken.png`,
  },
  glacial: {
    0: `${server}/glacial.png`,
    1: `${server}/glacial.png`,
  },
  glacial_equ: {
    0: `${server}/glacial_equ.png`,
    1: `${server}/glacial_equ.png`,
  },
  kyn: {
    0: `${server}/kyn.png`,
    1: `${server}/kyn.png`,
  },
  apark: {
    0: `${server}/apark.png`,
    1: `${server}/apark.png`,
  },
  caf: {
    0: `${server}/caf.png`,
    1: `${server}/caf.png`,
  },
  chaos: {
    0: `${server}/chaos.png`,
    1: `${server}/chaos.png`,
  },
  deadly_robots: {
    0: `${server}/deadly_robots.png`,
    1: `${server}/deadly_robots.png`,
  },
};
