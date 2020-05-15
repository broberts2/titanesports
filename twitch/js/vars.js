let EVENTS = null;

const ACTION = (object, gameData) => {
  EVENTS.push(object);
  switch (object.EventName) {
    case "DragonKill":
      return __dragonkill__(object, gameData);
    case "ChampionKill":
      return __championkill__(object, gameData);
	case "BaronKill":
      return __baronkill__(object, gameData);
	case "HeraldKill":
	  return __baronkill__(object, gameData);
  }
};
