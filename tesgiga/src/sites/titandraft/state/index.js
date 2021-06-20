import team from "./team";
import draft from "./draft";

export default {
  draft,
  blueteam: JSON.parse(JSON.stringify(team)),
  redteam: JSON.parse(JSON.stringify(team)),
};
