import React from "react";
import Button from "@material-ui/core/Button";
import Components from "components/index";
import Style from "./style";

export default (props) => {
  const classes = Style(props)();
  const Bttn = (
    <Button
      {...props}
      className={classes.root}
      onClick={() => (props.onClick ? props.onClick() : null)}
      disabled={props.disabled ? props.disabled : false}
      variant="contained"
      color="primary"
    >
      <Components.Typography>{props.children}</Components.Typography>
    </Button>
  );
  return (
    <Components.Transitions anim={"Grow"} in={true} mountOnEnter unmountOnExit>
      {props.tooltip ? (
        <Components.Tooltip tooltip={props.tooltip}>{Bttn}</Components.Tooltip>
      ) : (
        Bttn
      )}
    </Components.Transitions>
  );
};
