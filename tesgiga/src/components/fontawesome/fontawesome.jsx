import React from "react";
import Style from "./style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import {
  faCoffee,
  faChartPie,
  faDragon,
  faMicrophone,
  faUserFriends,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";

const Icons = {
  faCoffee,
  faChartPie,
  faDragon,
  faMicrophone,
  faUserFriends,
  faScroll,
};

export default (props) => {
  const classes = Style();
  const [element, setElement] = React.useState();
  const contRef = React.useCallback((node) => {
    if (node) {
      window.addEventListener("resize", (event) =>
        setElement(
          <FontAwesomeIcon
            style={{ fontSize: node.getBoundingClientRect().width }}
            icon={Icons[props.icon]}
          />
        )
      );
      setElement(
        <FontAwesomeIcon
          style={{ fontSize: node.getBoundingClientRect().width }}
          icon={Icons[props.icon]}
        />
      );
    }
  }, []);
  return (
    <div className={classes.root} ref={contRef}>
      {element}
    </div>
  );
};
