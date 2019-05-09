import ranksByNum from "./ranksByNum";

export default (key, arr) => {
  if (key && key.search) {
    if (key.search.length > 0) {
      return arr.filter(el => {
        if (el.username.toLowerCase().includes(key.search.toLowerCase())) {
          return el;
        }
      });
    } else {
      return arr;
    }
  } else {
    if (key && key.query) {
      switch (key.query) {
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
          return arr.sort(
            (a, b) => (a.memberships[0] < b.memberships[0] ? 1 : -1)
          );
        case key.search && key.search:
          return arr.sort(
            (a, b) => (a.memberships[0] < b.memberships[0] ? 1 : -1)
          );
      }
    }
  }
  return arr;
};
