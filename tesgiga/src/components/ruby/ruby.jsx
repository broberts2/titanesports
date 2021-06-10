import React from "react";
import Components from "components/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <div className={classes.root}>
      {props.img ? (
        <img src={props.src} />
      ) : (
        <div className={classes.icon}>
          <Components.FontAwesome icon={props.src} />
        </div>
      )}
    </div>
  );
};
