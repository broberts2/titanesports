const config = require("./config");

module.exports = {
  position: (tier, position) => {
    const _tier = () => {
      switch (tier) {
        case "IRON":
          return "Iron";
        case "BRONZE":
          return "Bronze";
        case "SILVER":
          return "Silver";
        case "GOLD":
          return "Gold";
        case "PLATINUM":
          return "Platinum";
        case "DIAMOND":
          return "Diamond";
        case "MASTER":
          return "Master";
        case "GRANDMASTER":
          return "Grandmaster";
        case "CHALLENGER":
          return "Challenger";
        default:
          return "Iron";
      }
    };
    const _position = () => {
      switch (position) {
        case "BOTTOM":
          return "Bot";
        case "JUNGLE":
          return "Jungle";
        case "MIDDLE":
          return "Mid";
        case "SUPPORT":
          return "Support";
        case "TOP":
          return "Top";
        default:
          return "Support";
      }
    };
    return `${config.static_url}/img/positions/Position_${_tier()}-${_position()}.png`;
  }
};
