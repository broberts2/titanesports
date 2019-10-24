import React from "react";
export default {
  gold: {
    1: <img src={require("./img/ranked-positions/Position_Gold-Top.png")} />,
    2: <img src={require("./img/ranked-positions/Position_Gold-Jungle.png")} />,
    3: <img src={require("./img/ranked-positions/Position_Gold-Mid.png")} />,
    4: <img src={require("./img/ranked-positions/Position_Gold-Bot.png")} />,
    5: (
      <img src={require("./img/ranked-positions/Position_Gold-Support.png")} />
    ),
    6: <img src={require("./img/ranked-positions/Position_Gold-Support.png")} />
  },
  platinum: {
    1: <img src={require("./img/ranked-positions/Position_Plat-Top.png")} />,
    2: <img src={require("./img/ranked-positions/Position_Plat-Jungle.png")} />,
    3: <img src={require("./img/ranked-positions/Position_Plat-Mid.png")} />,
    4: <img src={require("./img/ranked-positions/Position_Plat-Bot.png")} />,
    5: (
      <img src={require("./img/ranked-positions/Position_Plat-Support.png")} />
    ),
    6: <img src={require("./img/ranked-positions/Position_Plat-Support.png")} />
  },
  freeAgent: {
    1: <img src={require("./img/Position_Generic-Top.png")} />,
    2: <img src={require("./img/Position_Generic-Jungle.png")} />,
    3: <img src={require("./img/Position_Generic-Mid.png")} />,
    4: <img src={require("./img/Position_Generic-Bot.png")} />,
    5: <img src={require("./img/Position_Generic-Support.png")} />,
    6: <img src={require("./img/Position_Generic-Support.png")} />
  }
};
