import React from "react";
import Labels from "labels/index";
import Components from "components/index";
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
  const dist = 10;
  const classes = Style(props)();
  return (
    <div className={classes.root}>
      <div
        className={classes.bar}
        style={
          props.skew >= 0
            ? {
                width: `calc(${props.width}/12.5)`,
                marginRight: `${dist}px`,
              }
            : {}
        }
      >
        <video
          src={assign(props.color)}
          className={classes.video}
          autoPlay
          muted
          loop
        />
        <div className={classes.typography}>
          <Components.Typography
            style={{
              display: props.skew >= 0 ? "none" : "",
              textAlign: "center",
              fontSize: "inherit",
            }}
          >
            {props.children}
          </Components.Typography>
        </div>
      </div>
      <div
        className={classes.bar}
        style={
          props.skew < 0
            ? {
                width: `calc(${props.width}/12.5)`,
                marginLeft: `${dist}px`,
              }
            : {}
        }
      >
        <video
          src={assign(props.color)}
          className={classes.video}
          autoPlay
          muted
          loop
        />
        <div className={classes.typography}>
          <Components.Typography
            style={{
              display: props.skew < 0 ? "none" : "",
              textAlign: "center",
              fontSize: "inherit",
            }}
          >
            {props.children}
          </Components.Typography>
        </div>
      </div>
    </div>
  );
};
