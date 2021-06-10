import React from "react";
import Components from "components/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <Components.Typography {...props} className={classes.root}>
      {props.children}
    </Components.Typography>
  );
};
