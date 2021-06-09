import { Typography } from "@material-ui/core";
import Components from "components/index";
import React from "react";

export default (props) => {
  return (
    <Components.Transitions anim={"Grow"} in={true} mountOnEnter unmountOnExit>
      <Typography {...props}>{props.children}</Typography>
    </Components.Transitions>
  );
};
