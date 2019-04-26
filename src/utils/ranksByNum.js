module.exports = (tier, division, lp) => {
  let tierVal = 0;
  let divVal = 0;
  switch (tier) {
    case "IRON":
      tierVal += 0;
      break;
    case "BRONZE":
      tierVal += 10;
      break;
    case "SILVER":
      tierVal += 20;
      break;
    case "GOLD":
      tierVal += 30;
      break;
    case "PLATINUM":
      tierVal += 40;
      break;
    case "DIAMOND":
      tierVal += 50;
      break;
    case "MASTER":
      tierVal += 60;
      break;
    case "GRANDMASTER":
      tierVal += 70;
      break;
    case "CHALLENGER":
      tierVal += 80;
      break;
    default:
      return undefined;
      break;
  }
  switch (division) {
    case "IV":
      divVal += 0;
      break;
    case "III":
      divVal += 1;
      break;
    case "II":
      divVal += 2;
      break;
    case "I":
      divVal += 3;
      break;
  }
  return tierVal + divVal + parseInt(lp) / 100;
};
