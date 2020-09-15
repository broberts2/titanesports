export default {
  THEME: "Dark",
  LOGO: require("../assets/logo-divinity.png"),
  SEASON_LOGO: require("../assets/divinity.png"),
  TEAM_1: {
    CARD_BACK: require("../assets/blue.png"),
    CARD_BORDER: require("../assets/border-blue.png"),
    BAN_BORDER: require("../assets/ban-border-blue.png"),
    BAN_BORDER_LOCK: require("../assets/ban-lock-blue.png"),
    CARD_DELAY: 2,
    BAN_DELAY: 3,
  },
  TEAM_2: {
    CARD_BACK: require("../assets/red.png"),
    CARD_BORDER: require("../assets/border-red.png"),
    BAN_BORDER: require("../assets/ban-border-red.png"),
    BAN_BORDER_LOCK: require("../assets/ban-lock-red.png"),
    CARD_DELAY: 2,
    BAN_DELAY: 3,
  },
  HEADER: {
    SEASON_LOGO_TRANSITION: { animation: "fadeIn", delay: 2.5, duration: 2.75 },
    LEFT_TEAM_TRANSITION: { animation: "fadeInRight", delay: 2.5 },
    RIGHT_TEAM_TRANSITION: { animation: "fadeInLeft", delay: 2.5 },
    CROWN_TRANSITION: { animation: "fadeIn", delay: 2 },
  },
  TIMER: {
    DELAY: 1,
    START_SIDE: "team_1",
    LEFT_TRANSITION: { animation: "fadeInLeft", duration: 1 },
    RIGHT_TRANSITION: { animation: "fadeInRight", duration: 1 },
    LEFT_TRANSITION_OUT: {
      animation: "fadeOutLeft",
      duration: 1,
    },
    RIGHT_TRANSITION_OUT: {
      animation: "fadeOutRight",
      duration: 1,
    },
  },
  BACKGROUND: {
    TEAM1TINT: "#009cff",
    TEAM2TINT: "#ff1800",
  },
  MODAL: {
    SEARCH: {
      FIGHTER: require("../assets/fighter.png"),
      MAGE: require("../assets/mage.png"),
      MARKSMAN: require("../assets/marksman.png"),
      TANK: require("../assets/tank.png"),
      SUPPORT: require("../assets/support.png"),
      ASSASSIN: require("../assets/assassin.png"),
    },
  },
};
