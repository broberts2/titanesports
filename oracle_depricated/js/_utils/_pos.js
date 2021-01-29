module.exports = position => {
  switch (position) {
    case "top":
      return 1;
    case "jungle":
      return 2;
    case "middle":
      return 3;
    case "bottom":
      return 4;
    case "support":
      return 5;
    case "sub1":
      return 6;
    case "sub2":
      return 7;
    case "sub3":
      return 8;
    default:
      return false;
  }
};
