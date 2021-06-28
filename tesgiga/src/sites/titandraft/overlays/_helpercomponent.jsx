import React from "react";
import Components from "components/index";

export default {
  Component: (props) => (
    <Components.Transitions
      anim={props.comp[props.dir].anim}
      in={props.dir === "in"}
      timeout={props.comp[props.dir].timeout}
      direction={
        props.comp[props.dir].direction ? props.comp[props.dir].direction : null
      }
      style={{
        transitionDelay: props.comp[props.dir].transitionDelay
          ? props.comp[props.dir].transitionDelay
          : null,
      }}
    >
      <div>{props.children}</div>
    </Components.Transitions>
  ),
};
