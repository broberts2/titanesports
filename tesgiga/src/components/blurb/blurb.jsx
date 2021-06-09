import React from "react";
import Components from "components/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <div className={classes.root}>
      {props.title ? (
        <Components.Typography className={classes.title}>
          {props.title}
        </Components.Typography>
      ) : null}
      <Components.Typography className={classes.body}>
        {props.children}
      </Components.Typography>
    </div>
  );
};
