module.exports = position => {
  switch (position) {
    case "top":
      return 8;
    case "jungle":
      return 12;
    case "middle":
      return 16;
    case "bottom":
      return 20;
    case "support":
      return 24;
    case "sub1":
      return 28;
    case "sub2":
      return 32;
    case "sub3":
      return 36;
    default:
      return false;
  }
};
