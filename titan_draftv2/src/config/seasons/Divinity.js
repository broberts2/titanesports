export default {
  THEME: "Dark",
  LOGO: require("../assets/logo-divinity.png"),
  SEASON_LOGO: require("../assets/divinity.png"),
  HEADER: {
    SEASON_LOGO_TRANSITION: { animation: "fadeIn", delay: 2.5, duration: 1.25 },
    LEFT_TEAM_TRANSITION: { animation: "fadeInRight", delay: 0.5 },
    RIGHT_TEAM_TRANSITION: { animation: "fadeInLeft", delay: 0.5 },
    CROWN_TRANSITION: { animation: "fadeIn", delay: 1.25 },
  },
  TIMER: {
    LEFT_TRANSITION: { animation: "fadeInLeft", duration: 1 },
    RIGHT_TRANSITION: { animation: "fadeInRight", duration: 1 },
    LEFT_TRANSITION_OUT: {
      animation: "fadeOutLeft",
      duration: 1.25,
    },
    RIGHT_TRANSITION_OUT: {
      animation: "fadeOutRight",
      duration: 1.25,
    },
  },
  BACKGROUND: {
    TEAM1TINT: "#009cff",
    TEAM2TINT: "#ff1800",
  },
};
