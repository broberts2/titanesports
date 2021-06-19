import React from "react";
import Labels from "labels/index";
import Style from "./style";

const assign = (color) => {
  switch (color) {
    case "red":
      return Labels.backgroundvideos.background2;
    case "blue":
      return Labels.backgroundvideos.background3;
    case "green":
      return Labels.backgroundvideos.background4;
  }
};

export default (props) => {
  const classes = Style(props)();
  return (
    <div className={classes.root}>
      <video
        src={assign(props.color)}
        className={classes.video}
        autoPlay
        muted
        loop
      />
    </div>
  );
};
