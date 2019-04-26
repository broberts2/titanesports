import ranksByNum from "./ranksByNum";

export default (key, arr) => {
  switch (key) {
    case "username":
      return arr.sort((a, b) => (a[key] < b[key] ? -1 : 1));
    case "position":
      return arr.sort((a, b) => (a.titanRole < b.titanRole ? -1 : 1));
    case "soloLp":
      return arr.sort((a, b) => (a[key] < b[key] ? 1 : -1));
    case "tier":
      return arr.sort(
        (a, b) =>
          ranksByNum(a.soloTier, a.soloDivision, a.soloLp) <
          ranksByNum(b.soloTier, b.soloDivision, b.soloLp)
            ? 1
            : -1
      );
    case "membership":
      return arr.sort((a, b) => (a.memberships[0] < b.memberships[0] ? 1 : -1));
  }
};
