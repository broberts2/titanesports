import React from "react";
import Grid from "@material-ui/core/Grid";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return <Grid {...props}>{props.children}</Grid>;
};
