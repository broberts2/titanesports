import React from "react";
import { Grow, Slide } from "@material-ui/core";

const TransitionGroup = {
  Grow,
  Slide,
};

export default (props) => {
  if (props.anim) {
    const Component = TransitionGroup[props.anim];
    return <Component {...props}>{props.children}</Component>;
  } else {
    return <div>{props.children}</div>;
  }
};
