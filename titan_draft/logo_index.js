const config = require("../server/config");
const server = config.production
  ? "https://titan-esports.org:7001"
  : "http://localhost:7001";

module.exports = {
  admins: {
    0: `${server}/ADMINS.png`,
    1: `${server}/ADMINS-trans.png`
  },
  afg: {
    0: `${server}/AFG.png`,
    1: `${server}/AFG-trans.png`
  },
  baka: {
    0: `${server}/BAKA.png`,
    1: `${server}/BAKA-trans.png`
  },
  baka_pre: {
    0: `${server}/BAKA-PRESCHOOL.png`,
    1: `${server}/BAKA-PRESCHOOL.png`
  },
  csdm: {
    0: `${server}/CSDM.png`,
    1: `${server}/CSDM-trans.png`
  },
  il: {
    0: `${server}/IL.png`,
    1: `${server}/IL-trans.png`
  },
  mm: {
    0: `${server}/MM.png`,
    1: `${server}/MM-trans.png`
  },
  name: {
    0: `${server}/NAME.png`,
    1: `${server}/NAME-trans.png`
  },
  rd: {
    0: `${server}/RD.png`,
    1: `${server}/RD-trans.png`
  },
  rinc: {
    0: `${server}/RINC.png`,
    1: `${server}/RINC-trans.png`
  },
  rk: {
    0: `${server}/RAINBOW-KITTENZ.png`,
    1: `${server}/RAINBOW-KITTENZ.png`
  },
  sk: {
    0: `${server}/SK.png`,
    1: `${server}/SK.png`
  },
  sfb: {
    0: `${server}/SFB.png`,
    1: `${server}/SFB-trans.png`
  },
  ult: {
    0: `${server}/ULT.png`,
    1: `${server}/ULT-trans.png`
  },
  rr: {
    0: `${server}/RR-trans.png`,
    1: `${server}/RR-trans.png`
  },
  syn: {
    0: `${server}/SYN.png`,
    1: `${server}/SYN.png`
  },
  ntf: {
    0: `${server}/NTF-GAMING.png`,
    1: `${server}/NTF-GAMING.png`
  },
  uc: {
    0: `${server}/UNKNOWN-CHALLENGERS.png`,
    1: `${server}/UNKNOWN-CHALLENGERS.png`
  }
  // tk: {
  //   0: `${server}/team_khyroe.png`,
  //   1: `${server}/team_khyroe.png`
  // },
  // tm: {
  //   0: `${server}/team_major.png`,
  //   1: `${server}/team_major.png`
  // },
  // tb: {
  //   0: `${server}/team_braer.png`,
  //   1: `${server}/team_braer.png`
  // },
  // tp: {
  //   0: `${server}/team_phort.png`,
  //   1: `${server}/team_phort.png`
  // }
};
